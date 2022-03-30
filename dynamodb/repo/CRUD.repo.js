const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const createRecordInDynamodb = async (params) => {

    console.log(process.env.AWS_ACCESS_KEY_ID);
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {
        const result = await dynamodb.put(params).promise();
        return true;

    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const getRecordInDynamodb = async (param) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {
        const result = await dynamodb.get(param).promise();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createRecordInDynamodb,
    getRecordInDynamodb
}