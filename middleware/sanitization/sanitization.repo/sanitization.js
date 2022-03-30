const sanitizationHelper = require('../helper/sanitization.helper');

const santizeLogin = (data) => {
    try {
        sanitizationHelper.xssHelper(data);
        return true;
    } catch (error) {
      console.log(error);  
    }
}

const santizeLoginwithOtp = (data) => {
    try {
        sanitizationHelper.xssHelper(data);
        return true;
    } catch (error) {
      console.log(error);  
    }
}

const santizeRemainder = (data) => {
    try {
        sanitizationHelper.xssHelper(data);
        return true;
    } catch (error) {
      console.log(error);  
    }
}



module.exports = {
    santizeLogin,
    santizeLoginwithOtp,
    santizeRemainder
}