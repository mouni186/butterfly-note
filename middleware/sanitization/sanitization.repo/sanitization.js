const sanitizationHelper = require('../helper/sanitization.helper');

const santizeLogin = (data) => {
    try {
        sanitizationHelper.xssHelper(data);
        return true;
    } catch (error) {
      console.log(error);  
    }
}



module.exports = {
    santizeLogin
}