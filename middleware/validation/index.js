const validationRepo = require('./validation.repo/validation.js');


const validatorsignIn = (req, res, next) =>{
    try{
        const result = validationRepo.signIn(req.body);
        next();
    }catch(err){
        throw new Error(err);
    }
}
module.exports={
    validatorsignIn
}