const functions = require("firebase-functions");
const fs = require('fs')

const admin = require("firebase-admin");
admin.initializeApp();


exports.addDocument = functions.https.onRequest(async (req, res) => {
    const body = JSON.parse(req.body)
    const writeResult = admin.firestore().collection('eCommerce').add( body );

    writeResult.then(()=>{
        res.json({status:200});
    }).catch(()=>{
        res.json({status:400});
    })
});

exports.getDocument = functions.https.onRequest(async (req, res) => {
   const body = JSON.parse(req.body)
   let query = admin.firestore().collection('eCommerce')
   let results = []
   let queryResult;

    if(body.page==1){
        queryResult =  query.orderBy('eventType').limit(10).get();

    }else{
        const index = ((body.page-1)*10)+1
        queryResult =  query.orderBy('eventType').startAfter(index).limit(10).get();
    }
    queryResult.then(
        querySnapshot =>{
            querySnapshot.forEach(snap => {
                results.push(snap.data())
            });
            res.json({result:results,status:200});
        }
    ).catch(()=>{
        res.json({result:[],status:400});
    });
});

exports.updateDocument = functions.https.onRequest(async (req, res) =>{
    const body = JSON.parse(req.body);
    let documentRef = admin.firestore().doc('eCommerce/'+body.docId);

    documentRef.update({[body.key]: body.value}).then(() => {
        res.json({status:200});
    }).catch((e)=>{
        console.log(e)
        res.json({status:400});
    })
})

exports.deleteDocument = functions.https.onRequest(async (req,res) => {
    const body = JSON.parse(req.body);
    let documentRef = admin.firestore().doc('eCommerce/'+body.docId);

    documentRef.delete().then(() => {
        res.json({status:200});
    }).catch(()=>{
        res.json({status:400});
    });
})


exports.getBrandsInfo = functions.https.onRequest(async (req, res) => {
    var query = {
        directory: 'outputs/'
    };
 
    let bucket = admin.storage().bucket('proyecto-dba-ccn')
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

 });