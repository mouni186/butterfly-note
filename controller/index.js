const controllerRepo = require('./repo/controller.repo');

const butterflyLogin = async(req,res) => {
    try {
     const result = await controllerRepo.userLogin(req,res);
     res.status(200).send(result); 
    } catch (error) {
     res.status(500).send(error);   
    }
}



module.exports = {
    butterflyLogin
}