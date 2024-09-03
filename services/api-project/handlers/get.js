const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            id: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDb.get(params).promise();
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Item not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve item' }),
        };
    }
};
