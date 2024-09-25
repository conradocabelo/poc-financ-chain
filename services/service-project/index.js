const createItem = require('./handlers/createItem');
const getItem    = require('./handlers/getItem');
const updateItem = require('./handlers/updateItem');
const deleteItem = require('./handlers/deleteItem');

exports.handler = async (event) => {
    const method = event.httpMethod;

    if (method === 'POST') {
        return createItem(event);
    } else if (method === 'GET' && event.pathParameters) {
        return getItem(event);
    } else if (method === 'PUT' && event.pathParameters) {
        return updateItem(event);
    } else if (method === 'DELETE' && event.pathParameters) {
        return deleteItem(event);
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
};