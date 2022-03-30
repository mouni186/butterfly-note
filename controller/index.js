const controllerRepo = require('./repo/controller.repo');

const butterflyLogin = async(req,res) => {
    try {
     const result = await controllerRepo.userLogin(req,res);
     res.status(200).send(result); 
    } catch (error) {
     res.status(500).send(error);   
    }
}
const butterflyLoginwithOtp = async(req,res) => {
    try {
     const result = await controllerRepo.userLoginwithOtp(req,res);
     res.status(200).send(result); 
    } catch (error) {
     res.status(500).send(error);   
    }
}

const butterflyRemainder = async(req,res) => {
    try {
     const result = await controllerRepo.butterflyAddRemainder(req,res);
     res.status(200).send(result); 
    } catch (error) {
     res.status(500).send(error);   
    }
}



module.exports = {
    butterflyLogin,
    butterflyLoginwithOtp,
    butterflyRemainder
}