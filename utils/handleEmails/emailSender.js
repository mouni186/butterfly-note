const nodeMailer = require('nodemailer');
require('dotenv').config();

const sendOtpEmail = async(user,theRandomNumber) => {
    const transpoter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.USER_ID,
            pass:process.env.PASS
        },
    })
    // const trigger = async(target) => {
        await transpoter.sendMail({
            from:`"${process.env.NAME}"<${process.env.EMAIL}>`,
            to:user,
            subject:"OTP Generation",
            html:`<b>${theRandomNumber}</b>`
})
//  }
//  user.map(targetUser => trigger(targetUser));
}

module.exports = {
    sendOtpEmail
}