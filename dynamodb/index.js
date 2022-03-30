const { nanoid } = require('nanoid');
const CRUDOperationInDynamodb = require('./repo/CRUD.repo');
const { sendOtpEmail } = require('../utils/handleEmails/emailSender');



const userLoginDetails = async (data) => {
    // incoming data
    let returnObject;
    const userEmail = data.userEmail;
    const userPassword = data.userPassword;

    try {

        const params = {
            TableName: "butterfly_signup",
            Key: {
                email: userEmail,
            }
        };

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);
       
        if (result.Item) {
            if (result.Item.password === userPassword) {
                var theRandomNumber = Math.floor(Math.random() * 100000) + 1;
                const sendOtp = sendOtpEmail(userEmail, theRandomNumber);
                if (sendOtp) {
                    returnObject = {
                        message: "Otp Sended",
                        status: 200
                    }
                }
            }
            else {
                returnObject = {
                    message: "Unable to send Otp",
                    status: 504
                }
            }
        }
        try {
            const param = {
                TableName: "butterfly_login",
                Item: {
                    email: userEmail,
                    otp: theRandomNumber
                }
            };
            const ans = await CRUDOperationInDynamodb.createRecordInDynamodb(param);
        }
        catch (error) {
            console.log(error);
            returnObject = {
                message: "Incorrect Otp",
                status: 504
            }
        }
    }
    catch (error) {
        console.log(error);
        returnObject = {
            message: "please create an account to proceed",
            status: 424
        }
    }
    return returnObject;
}


const loginwithOtp = async (data) => {


    let returnObject;
    const userEmail = data.userEmail;
    const userOtp = data.userOtp;
    
    try {
        const params = {
            TableName: "butterfly_login",
            Key: {
                email: userEmail
            }
        };
       
        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);

        if (result.Item) {
            if (result.Item.otp.toString() === userOtp.toString()) {
                returnObject = {
                    message: "User Logged in successfully",
                    status: 200
                }
            }
            else {
                returnObject = {
                    message: "Invalid Otp",
                    status: 424
                }
            }
        }
    } 
    catch (error) {
        console.log(error);
        returnObject = {
            message: "Invalid User",
            status: 424
        }

    }
    return returnObject;
}

const addRemainder = async (data) => {

    let returnObject;
    const dateNow = new Date();
    const remainderNanoidGeneration = nanoid(8);

    try {
        
        const params = {
            TableName: "butterfly_remainder",
            Item: {
                title: data.title,
                content: data.content,
                date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear(),
                remaindernanoid: remainderNanoidGeneration
            }
        }
        const result = await CRUDOperationInDynamodb.createRecordInDynamodb(params);
        
        if (result) {
            returnObject = {
                message: "Remainder Added Successfully",
                status: 200
            }
        }
    }
     catch (error) {
        console.log(error);
        returnObject = {
            message: "Remainder Failed",
            status: 424
        }
    }
    return returnObject;
}




module.exports = {
    userLoginDetails,
    loginwithOtp,
    addRemainder
}