const validationHelper = require('../helper/validation.helper.js');


const validateLogin = (data) => {
    const result = validationHelper.validateUserLogin(data);
    console.log('Validation Successfull');
    return true;
}
const validateLoginwithOtp = (data) => {
    const result = validationHelper.validateUserLoginwithOtp(data);
    console.log('Validation Successfull');
    return true;
}
const validateRemainder = (data) => {
    const result = validationHelper.validateAddRemainder(data);
    console.log('Validation Successfull');
    return true;
}


module.exports = {
    validateLogin,
    validateLoginwithOtp,
    validateRemainder
}