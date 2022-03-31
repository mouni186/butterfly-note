const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const controller = require('./controller/index')
const validator = require('./middleware/validation')
const sanitizer = require('./middleware/sanitization')





app.use(bodyParser.json());
app.use(cors());

const butterflyLoginMiddleware = [sanitizer.sanitizationLogin,validator.validationLogin];
const butterflyLoginwithOtpMiddleware = [sanitizer.sanitizationLoginwithOtp,validator.validationLoginwithOtp];
const butterflyRemainderMiddleware = [sanitizer.sanitizationRemainder,validator.validationRemainder];

app.post('/butterfly-login',butterflyLoginMiddleware, controller.butterflyLogin);
app.post('/login-otp',butterflyLoginwithOtpMiddleware,controller.butterflyLoginwithOtp);
app.post('/add-remainder',butterflyRemainderMiddleware,controller.butterflyRemainder);






const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})