const {nanoid} = require('nanoid');
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
            }
        };

        const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);
        if (result.Item) {
            if (result.Item.password === userPassword) {
                var theRandomNumber = Math.floor(Math.random() * 100000) + 1;
                const sendOtp = sendOtpEmail(userEmail, theRandomNumber);
            }
            else {
                console.log("password invalid");
            }
        }
            try {
                const param = {
                    TableName:"butterfly_login",
                    Item:{
                        email:userEmail,
                        otp:theRandomNumber
                    }
                };
                const ans = await CRUDOperationInDynamodb.createRecordInDynamodb(param);
     } 
            catch (error) {
                console.log(error);
            }
        }
     catch (error) {
        console.log(error);
        return {
            message: "please create an account to proceed",
            status: 424
        }
    }
}
const loginwithOtp = async(req,res) => {
    let returnObject;
    const userEmail = req.body.email;
    const userOtp = req.body.otp;
    try {
      const params = {
          TableName:"butterfly_login",
          Key:{
              email:req.body.email
          }
      } ;
      const result = await CRUDOperationInDynamodb.getRecordInDynamodb(params);
      if (result.Item) {
          if (result.Item.otp == userOtp) {
              console.log("success");
              returnObject = {
               message:"User Logged in successfully",
               status:424
              }
          }
      }
    } catch (error) {
     console.log(error);
     returnObject ={
        message:"Invalid User"
    }
     
    }
    return returnObject;
}

const addRemainder = async(req,res) => {
const dateNow = new Date();
const remainderNanoidGeneration = nanoid(8);

    try {
       const params = {
           TableName:"butterfly_remainder",
           Item:{
               title:req.body.title,
               content:req.body.content,
               date: dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear(),
               remaindernanoid:remainderNanoidGeneration
           }
       } 
      const result = await CRUDOperationInDynamodb.createRecordInDynamodb(params);
       if(result){
           return {
               message:"Remainder Added Successfully",
               status:424
            }
       }
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    userLoginDetails,
    loginwithOtp,
    addRemainder
}