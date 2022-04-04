const { nanoid } = require('nanoid');
const CRUDOperationInDynamodb = require('./repo/CRUD.repo');
const { sendOtpEmail } = require('../utils/handleEmails/emailSender');
const { isArrayEmpty, arrayLength } = require('../utils/genericHelpers/objectHelpers');


const userSignupDetails = async (data) => {

    let returnObject;

    try {
        const param = {
            TableName: "butterfly_signup",
            Key: {
                email: data.userEmail
            }
        }

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(param);

        if (result.Item) {
            returnObject = {
                message: "You are already signed in",
                status: 504
            }
        }
        else {
            const userNanoid = nanoid(8);
            const params = {
                TableName: "butterfly_signup",
                Item: {
                    email: data.userEmail,
                    name: data.userName,
                    password: data.userPassword,
                    nanoid: userNanoid
                },

            }

            await CRUDOperationInDynamodb.createRecordInDynamodb(params);

            returnObject = {
                message: "User signed in successfully",
                status: 200
            }
        }

    }
    catch (error) {
        console.log("Server side" + error);
    }

    return returnObject;
}

const userLoginDetails = async (data) => {

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
                TableName: "butterfly_otp_login",
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
            TableName: "butterfly_otp_login",
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
    const remainderNanoidGeneration = nanoid(8);
    const dateNow = new Date();
    const requestedData = {
        title: data.title,
        content: data.content,
        date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear(),
        nanoid: remainderNanoidGeneration
    }

    try {
        const params = {
            TableName: "butterfly_signup",
            Key: {
                email: data.email
            }
        }

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);

        if (result.Item) {
            const viewParam = {
                TableName: "butterfly_remainders",
                Key: {
                    email: data.email
                }
            }

            const isPresent = await CRUDOperationInDynamodb.getRecordInDynamodb(viewParam);

            if (isArrayEmpty(isPresent.Item.butterflyRemainder) || arrayLength(isPresent.Item.butterflyRemainder)) {

                var existingData = isPresent.Item.butterflyRemainder;
                existingData.push(requestedData);
                const updateParam = {
                    TableName: "butterfly_remainders",
                    Key: {
                        email: data.email
                    },
                    UpdateExpression: "set butterflyRemainder = :r",
                    ExpressionAttributeValues: {
                        ":r": existingData
                    },
                    ReturnValues: "UPDATED_NEW"
                }

                await CRUDOperationInDynamodb.updateRecordInDynamodb(updateParam);

                returnObject = {
                    message: "Butterfly Remainder updated successfully",
                    status: 200
                }
            }
            else {
                returnObject = {
                    message: "NO email found",
                    status: 424
                }
            }

        }

    } catch (error) {
        console.log(error);
        const param = {
            TableName: "butterfly_remainders",
            Item: {
                email: data.email,
                butterflyRemainder: [{
                    title: data.title,
                    content: data.content,
                    date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear(),
                    nanoid: remainderNanoidGeneration
                }]
            }
        }

        await CRUDOperationInDynamodb.createRecordInDynamodb(param);

        returnObject = {
            message: "Remainder added successfully",
            status: 200
        }
    }

    return returnObject;
}

const addNote = async (data) => {

    let returnObject;
    const noteNanoidGenerator = nanoid(8);
    const requestedData = {
        title: data.title,
        content: data.content,
        notetype: data.notetype,
        notenanoid: noteNanoidGenerator
    }

    try {
        const params = {
            TableName: "butterfly_signup",
            Key: {
                email: data.email
            }
        }

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);

        if (result.Item) {
            const viewParam = {
                TableName: "butterfly_note",
                Key: {
                    email: data.email
                }
            }

            const isExist = await CRUDOperationInDynamodb.getRecordInDynamodb(viewParam);


            if (isArrayEmpty(isExist.Item.note) || arrayLength(isExist.Item.note)) {

                var existingData = isExist.Item.note;
                existingData.push(requestedData)
                const updatedParam = {
                    TableName: "butterfly_note",
                    Key: {
                        email: data.email
                    },
                    UpdateExpression: "set note = :note",
                    ExpressionAttributeValues: {
                        ":note": existingData
                    },
                    ReturnValues: "UPDATED_NEW"
                }

                await CRUDOperationInDynamodb.updateRecordInDynamodb(updatedParam);
            }
            returnObject = {
                message: "Note updated succesfully",
                status: 200
            }

        }
        else {
            returnObject = {
                message: "No email found.",
                status: 424
            }
        }
    } catch (error) {
        console.log(error);
        const param = {
            TableName: "butterfly_note",
            Item: {
                email: data.email,
                note: [{
                    title: data.title,
                    content: data.content,
                    notetype: data.notetype,
                    notenanoid: noteNanoidGenerator
                }]
            }
        }

        await CRUDOperationInDynamodb.createRecordInDynamodb(param);

        returnObject = {
            message: "Butterfly Note Created",
            status: 200
        }

    }

    return returnObject;
}

const readButterflyRemainder = async (data) => {

    try {
        const params = {
            TableName: "butterfly_remainders",
            Key: {
                email: data.email
            },
        }

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);
        console.log(result.Item);
    }
    catch (error) {
        console.log(error);
    }
}

const deleteRequiredRemainder = async (data) => {

    let returnObject;
    const remainderId = data.nanoid;

    try {
        const params = {
            TableName: "butterfly_remainders",
            Key: {
                email: data.email
            },
        }

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);

        if (result.Item) {

            const existingRemainder = result.Item.butterflyRemainder;
            var deleteRemainder = existingRemainder.filter(remainder => remainder.nanoid != remainderId);

            try {
                const updatedParam = {
                    TableName: "butterfly_remainders",
                    Key: {
                        email: data.email
                    },
                    ConditionExpression: "email = :email",
                    UpdateExpression: "set butterflyRemainder = :r",
                    ExpressionAttributeValues: {
                        ":email": data.email,
                        ":r": deleteRemainder
                    },
                    ReturnValues: "ALL_NEW"
                }

                await CRUDOperationInDynamodb.updateRecordInDynamodb(updatedParam);

                returnObject = {
                    message: "Remainder deleted successfully",
                    status: 200
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {

            returnObject = {
                message: "Unable to delete remainder",
                status: 424
            }
        }
    }
    catch (error) {
        console.log(error);
    }

    return returnObject;
}




module.exports = {
    userSignupDetails,
    userLoginDetails,
    loginwithOtp,
    addRemainder,
    addNote,
    readButterflyRemainder,
    deleteRequiredRemainder
}