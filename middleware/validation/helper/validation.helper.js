const joi = require('joi');

const vaditatesignIn= (data) =>{
    const userDetails = {
        "username": data.username,
        "email": data.email,
        "password": data.password
    }
    const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(12).required()
    });
    const result = schema.validate(userDetails);

    if (result.error)
        throw new Error(result.error);
}
module.exports={
    vaditatesignIn
}