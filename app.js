const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const controller = require('./controller/index')
const validator = require('./middleware/validation')
const sanitizer = require('./middleware/sanitization')

app.use(bodyParser.json());

app.post('/butterfly-login',cors(), sanitizer.sanitizationLogin,validator.validationLogin);







const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})