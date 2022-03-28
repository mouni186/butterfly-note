const validationHelper = require('../helper/validation.helper')

const signIn = (data) =>{
    const result = validationHelper.vaditatesignIn(data)
    console.log('Validation success');
    return true;
}

module.exports={
    signIn
}