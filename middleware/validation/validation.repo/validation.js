const validationHelper = require('../helper/validation.helper.js');


const validateLogin = (data) => {
    const result = validationHelper.validateUserLogin(data);
    console.log('Validation Successfull');
    return true;
}


module.exports = {
    validateLogin
}