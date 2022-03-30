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

const validateUserLoginwithOtp = (data) => {
    const userDetail = {
        "email":data.email,
        "otp":data.otp
    }
    const schema = joi.object({
        email:joi.string().email().required(),
        otp:joi.number().min(3).required()
    });
    const result = schema.validate(userDetail);

    if(result.error)
    throw new Error(result.error)
}

const validateAddRemainder = (data) => {
    const userDetail = {
        "title":data.title,
        "content":data.content
    }
    const schema = joi.object({
        title:joi.string().min(6).required(),
        content:joi.string().required()
    });
    const result = schema.validate(userDetail);

    if(result.error)
    throw new Error(result.error)
}


module.exports = {
    validateUserLogin,
    validateUserLoginwithOtp,
    validateAddRemainder
}