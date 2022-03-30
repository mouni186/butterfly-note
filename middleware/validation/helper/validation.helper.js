const joi = require('joi');

const validateUserLogin = (data) => {
    const userDetail = {
        "email":data.email,
        "password":data.password
    }
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(3).required()
    });
    const result = schema.validate(userDetail);

    if(result.error)
    throw new Error(result.error)
}

module.exports = {
    validateUserLogin
}