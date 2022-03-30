const validationRepo = require('./validation.repo/validation.js');



const validationLogin = (req,res,next) => {
    try {
        const result = validationRepo.validateLogin(req.body);
        next();
    } catch (error) {
    throw new Error(error);    
    }
}

const validationLoginwithOtp = (req,res,next) => {
    try {
        const result = validationRepo.validateLoginwithOtp(req.body);
        next();
    } catch (error) {
    throw new Error(error);    
    }
}

const validationRemainder = (req,res,next) => {
    try {
        const result = validationRepo.validateRemainder(req.body);
        next();
    } catch (error) {
    throw new Error(error);    
    }
}


module.exports = {
    validationLogin,
    validationLoginwithOtp,
    validationRemainder
}