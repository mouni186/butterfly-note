const dynamoDbController = require('../../dynamodb');

const userLogin = async(req,res) => {
    try {
        const response = await dynamoDbController.userLoginDetails(req,res);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    userLogin
}