const dynamoDbController = require('../../dynamodb');

const userLogin = async(data) => {
    try {
        const response = await dynamoDbController.userLoginDetails(data);
        return response;
    } catch (error) {
        return error;
    }
}
const userLoginwithOtp = async(data) => {
    try {
        const response = await dynamoDbController.loginwithOtp(data);
        return response;
    } catch (error) {
        return error;
    }
}

const butterflyAddRemainder = async(data) => {
    try {
        const response = await dynamoDbController.addRemainder(data);
        return response;
    } catch (error) {
        return error;
    }
}


module.exports = {
    userLogin,
    userLoginwithOtp,
    butterflyAddRemainder
}