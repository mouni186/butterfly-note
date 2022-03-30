const sanitizationRepo = require('./sanitization.repo/sanitization.js');


const sanitizationLogin = (req,res,next) => {
    try {
        const result = sanitizationRepo.santizeLogin(req.nody);
        if(result){
            console.log('Sanitization Success');
            next();
        }
    } catch (error) {
        throw new Error(error);
    }
}

const sanitizationLoginwithOtp = (req,res,next) => {
    try {
        const result = sanitizationRepo.santizeLoginwithOtp(req.body);
        if(result){
            console.log('sanitization Success');
            next();
        }
    } catch (error) {
        throw new Error(error);
    }
}

const sanitizationRemainder = (req,res,next) => {
    try {
        const result = sanitizationRepo.santizeRemainder(req.body);
        if(result){
            console.log('sanitization Success');
            next();
        }
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    sanitizationLogin,
    sanitizationLoginwithOtp,
    sanitizationRemainder
}