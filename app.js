const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const controller = require('./controller/index')
const validator = require('./middleware/validation')
const sanitizer = require('./middleware/sanitization')

app.use(bodyParser.json());
app.use(cors());
app.post('/butterfly-login',cors(), sanitizer.sanitizationLogin,validator.validationLogin,controller.butterflyLogin);
app.post('/login-otp',cors(),sanitizer.sanitizationLoginwithOtp,validator.validationLoginwithOtp,controller.butterflyLoginwithOtp);
app.post('/add-remainder',cors(),sanitizer.sanitizationRemainder,validator.validationRemainder,controller.butterflyRemainder);






const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})