export const eventService = {
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    getBrandsInfo,
};

async function addEvent(event) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    };

    return fetch(`https://us-central1-bamboo-case-331602.cloudfunctions.net/addDocument`, requestOptions)
        .then(handleResponse)
}

async function getEvents(page) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({page:page})
    };

    return fetch(`https://us-central1-bamboo-case-331602.cloudfunctions.net/getDocument`, requestOptions)
        .then(handleResponse)
}

async function updateEvent(event) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    };

    return fetch(`https://us-central1-bamboo-case-331602.cloudfunctions.net/updateDocument`, requestOptions)
        .then(handleResponse)
}

async function deleteEvent(docId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId:docId })
    };

    return fetch(`https://us-central1-bamboo-case-331602.cloudfunctions.net/deleteDocument`, requestOptions)
        .then(handleResponse)
}


async function getBrandsInfo() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`https://us-central1-bamboo-case-331602.cloudfunctions.net/getBrandsInfo`, requestOptions)
        .then(handleResponse)
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
    });
}