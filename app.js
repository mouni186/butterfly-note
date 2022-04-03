const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const controller = require('./controller/index')
const validator = require('./middleware/validation')
const sanitizer = require('./middleware/sanitization')





app.use(bodyParser.json());
app.use(cors());

const butterflySignupMiddleware = [sanitizer.saniitizationSignup,validator.validationSignup];
const butterflyLoginMiddleware = [sanitizer.sanitizationLogin,validator.validationLogin];
const butterflyLoginwithOtpMiddleware = [sanitizer.sanitizationLoginwithOtp,validator.validationLoginwithOtp];
const butterflyRemainderMiddleware = [sanitizer.sanitizationRemainder,validator.validationRemainder];


app.post('/butterfly-signup',controller.butterflySignup);
app.post('/butterfly-login',butterflyLoginMiddleware, controller.butterflyLogin);
app.post('/login-otp',butterflyLoginwithOtpMiddleware,controller.butterflyLoginwithOtp);
app.post('/add-butterfly-note',controller.butterflyNote);
app.post('/add-remainder',controller.butterflyRemainder);






const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})