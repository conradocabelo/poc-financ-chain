const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            id: event.pathParameters.id,
        },
        UpdateExpression: 'SET nome = :nome, descricao = :descricao, valorEsperado = :valorEsperado, valorMinimo = :valorMinimo',
        ExpressionAttributeValues: {
            ':nome': data.nome,
            ':descricao': data.descricao,
            ':valorEsperado': data.valorEsperado,
            ':valorMinimo': data.valorMinimo
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDb.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update item' }),
        };
    }
};
