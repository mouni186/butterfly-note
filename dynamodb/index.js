const { nanoid } = require('nanoid');
const CRUDOperationInDynamodb = require('./repo/CRUD.repo');
const { sendOtpEmail } = require('../utils/handleEmails/emailSender');
const { isArrayEmpty, arrayLength } = require('../utils/genericHelpers/objectHelpers');



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
        const param = {
            TableName: "butterfly_signup",
            Key: {
                usernanoid: data.usernanoid
            }
        };
        const ans = await CRUDOperationInDynamodb.getRecordInDynamodb(param);
        if (ans.Item.email) {
            try {
                const params = {
                    TableName: "butterfly_remainders",
                    Key: {
                        email: ans.Item.email
                    }
                }
                const isPresent = await CRUDOperationInDynamodb.getRecordInDynamodb(params);

                if (isArrayEmpty || arrayLength) {
                    console.log(isPresent.Item.remainder);
                    let existingData = isPresent.Item.remainder;
                    const requestedData = {
                        title: data.title,
                        content: data.content,
                        remaindernanoid: remainderNanoidGeneration,
                        date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear()
                    }
                    existingData.push(requestedData);
                    console.log(existingData);
                    const updatedParam = {
                        TableName: "butterfly_remainders",
                        Key: {
                            email: ans.Item.email
                        },
                        UpadateExpression: "set remainder = :remainder",
                        ExpressionAttributeValues: {
                            ":remainder": existingData
                        },
                        ReturnValues: "UPDATED_NEW"
                    }
                        const response = await CRUDOperationInDynamodb.updateRecordInDynamodb(updatedParam);
                        console.log(response);

                    // const updateParam = {
                    //     TableName: "butterfly_remainders",
                    //     Key: {
                    //         email: ans.Item.email
                    //     },
                    //     UpdateExpression: "set remainder = list_append(remainder, :remainder)",
                    //     ExpressionAttributeValues: {
                    //         ":remainder": [{
                    //             title: data.title,
                    //             content: data.content,
                    //             remaindernanoid: remainderNanoidGeneration,
                    //             date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear()
                    //         }]

                    //     },

                    //     ReturnValues: "UPDATED_NEW"
                    // }
                    // console.log(updateParam);
                    // const response = await CRUDOperationInDynamodb.updateRecordInDynamodb(updateParam);
                    // console.log(response);
                }
            } catch (error) {
                const params = {
                    TableName: "butterfly_remainders",
                    Item: {
                        email: ans.Item.email,
                        remainder: [{
                            remaindernanoid: remainderNanoidGeneration,
                            title: data.title,
                            content: data.content,
                            date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear(),
                        }]
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


        }
    }
    catch (error) {
        console.log(error);
        returnObject = {
            message: "Unable to add remainder.",
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