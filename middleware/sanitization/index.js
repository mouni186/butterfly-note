const sanitizationRepo = require('./sanitization.repo/sanitization.js');

const sanitizationsignin = (req,res,next) =>{
    try{
        const result = sanitizationRepo.signin(req.body);
        console.log(result);

        if(result){
            console.log("sanitization success");
            next();
        }
    }catch(err){
        throw new Error(err);
    }
}

module.exports={
    sanitizationsignin
}