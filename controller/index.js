const controllerRepo = require('./repo/controller.repo');

const butterflyLogin = async(req,res) => {
    try {
        const requestedData = {
            userEmail:req.body.email,
            userPassword:req.body.password
        }
     const result = await controllerRepo.userLogin(requestedData);
     res.status(200).send(result); 
    } catch (error) {
     res.status(500).send(error);   
    }
}
const butterflyLoginwithOtp = async(req,res) => {
    try {
        const requestedData = {
            userEmail:req.body.email,
            userOtp:req.body.otp
        }
     const result = await controllerRepo.userLoginwithOtp(requestedData);
     res.status(200).send(result); 
    } catch (error) {
     res.status(500).send(error);   
    }
}

const butterflyRemainder = async(req,res) => {
    try {
        const requestedData = {
            usernanoid:req.body.usernanoid,
            title:req.body.title,
            content:req.body.content
        }
     const result = await controllerRepo.butterflyAddRemainder(requestedData);
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