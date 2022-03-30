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




module.exports = {
    sanitizationLogin
}