const dynamoDbController = require('../../dynamodb');

const userLogin = async(req,res) => {
    try {
        const response = await dynamoDbController.userLoginDetails(req,res);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}
const userLoginwithOtp = async(req,res) => {
    try {
        const response = await dynamoDbController.loginwithOtp(req,res);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

const butterflyAddRemainder = async(req,res) => {
    try {
        const response = await dynamoDbController.addRemainder(req,res);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}


module.exports = {
    userLogin,
    userLoginwithOtp,
    butterflyAddRemainder
}