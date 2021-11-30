const functions = require("firebase-functions");
const fs = require('fs')

const admin = require("firebase-admin");
admin.initializeApp();


exports.addDocument = functions.https.onRequest(async (req, res) => {
    const body = JSON.parse(req.body)
    const writeResult = admin.firestore().collection('eCommerce').add( body );
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
        writeResult.then(()=>{
            res.json({status:200});
        }).catch(()=>{
            res.json({status:400});
        })
    }
});

exports.getDocument = functions.https.onRequest(async (req, res) => {
    let query = admin.firestore().collection('eCommerce');
    let results = [];
    let queryResult;
    queryResult =  query.limit(100).get();
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
        queryResult.then(
            querySnapshot =>{
                querySnapshot.forEach(snap => {
                    results.push({...snap.data(), docId:snap.id})
                });
                res.json({result:results,status:200});
            }
        ).catch(()=>{
            res.json({result:[],status:400});
        });

    }
});

exports.updateDocument = functions.https.onRequest(async (req, res) =>{
    const body = JSON.parse(req.body);
    const  {docId, ...documentObject} = body
    let documentRef = admin.firestore().doc('eCommerce/'+docId);
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'UPDATE');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
        documentRef.update(documentObject).then(() => {
            res.json({status:200});
        }).catch((e)=>{
    
            res.json({status:400});
        })
    }
})

exports.deleteDocument = functions.https.onRequest(async (req,res) => {
    const body = JSON.parse(req.body);
    let documentRef = admin.firestore().doc('eCommerce/'+body.docId);
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'DELETE');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {          
    documentRef.delete().then(() => {
        res.json({status:200});
    }).catch(()=>{
        res.json({status:400});
    });
    }
})


exports.getBrandsInfo = functions.https.onRequest(async (req, res) => {
    var query = { directory: 'outputs/' };
    let bucket = admin.storage().bucket('proyecto-dba-ccn')
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
        try{
            bucket.getFiles(query).then(async(files)=>{
                const result = await files[0].reduce(async (prevfile, currentFile)=>{
                    let data = await currentFile.download().then((content) =>{
                        const lines = content.toString('ascii').split('\n');
                        let info = {};
                        lines.forEach((line)=>{
                            if(line!=''){
                                let [brand, income, total] = line.split('\t');
                                info = {...info, [brand]:{
                                    income: parseFloat(income),
                                    total: parseInt(total)
                                }}
                            }
                        })
                        return info;
                   })
                   return {...prevfile,...data}
                },{})
                res.json({result:result,status:200});
            }).catch((e)=>{
                res.json({status:400});
            })
        }catch(e){
            res.json({status:400});
        }
    }
 });
