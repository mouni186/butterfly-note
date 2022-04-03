const dynamoDbController = require('../../dynamodb');

const userSignup = async(data) => {
    try {
        const response = await dynamoDbController.userSignupDetails(data);
        return response;
    } catch (error) {
        return error;
    }
}





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
const addButterflyNote = async(data) => {
    try {
        const response = await dynamoDbController.addNote(data);
        return response;
    } catch (error) {
        return error;
    }
}


module.exports = {
    userSignup,
    userLogin,
    userLoginwithOtp,
    butterflyAddRemainder,
    addButterflyNote
}