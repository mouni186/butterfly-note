const validationRepo = require('./validation.repo/validation.js');



const validationLogin = (req,res,next) => {
    try {
        const result = validationRepo.validateLogin(req.body);
        next();
    } catch (error) {
    throw new Error(error);    
    }
}


module.exports = {
    validationLogin
}