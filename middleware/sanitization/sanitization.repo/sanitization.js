var xss = require("xss");
const sanitizationHelper = require('../helper/sanitization.helper');

const signin =(data) => {
    try{
        sanitizationHelper.xssHelper(data);
        return true;  
    }catch(err){
        console.log(err);
    }
}
module.exports={
    signin
}