const controllerRepo = require('./repo/controller.repo');


const butterflySignup = async(req,res) => {
    try {
        const signupData = {
            userEmail:req.body.email,
            userName:req.body.name,
            userPassword:req.body.password
        }
        const result = await controllerRepo.userSignup(signupData);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}





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

const butterflyNote = async(req,res) => {
    try {
        const butterflyNoteData = {
            email:req.body.email,
            title:req.body.title,
            content:req.body.content,
            notetype:req.body.notetype
        }
        const result = await controllerRepo.addButterflyNote(butterflyNoteData);
        res.status(200).send(result);
    } catch (error) {
     res.status(500).send(error);   
    }
}



const butterflyRemainder = async(req,res) => {
    try {
        const requestedData = {
            email:req.body.email,
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
    butterflyRemainder,
    butterflySignup,
    butterflyNote
}