// const {nanoid} = require('nanoid');
const CRUDOperationInDynamodb = require('./repo/CRUD.repo');
const { sendOtpEmail } = require('../utils/handleEmails/emailSender');



const userLoginDetails = async (req, res) => {
    // incoming data
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {

        const params = {
            TableName: "butterfly_signup",
            Key: {
                email: req.body.email,
                //  password:req.body.password
            }
        };

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);
        console.log("data from database" + result.Item.password);
        if (result.Item) {
            if (result.Item.password === userPassword) {
                var theRandomNumber = Math.floor(Math.random() * 100000) + 1;
                const sendOtp = sendOtpEmail(userEmail, theRandomNumber);
            }
            else {
                console.log("password invalid");
            }
        }
        //     try {
        //         const param = {
        //             TableName:"butterfly_login",
        //             Item:{
        //                 email:req.body.email,
        //                 otp:theRandomNumber
        //             }
        //         };
        //         await CRUDOperationInDynamodb.createRecordInDynamodb(param)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    } catch (error) {
        console.log(error);
        returnObject({
            message: "please create an account to proceed",
            status: 424
        })
    }
}

module.exports = {
    userLoginDetails
}