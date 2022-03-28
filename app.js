const express = require ('express');
const app = express();
const bodyparser = require('body-parser');

const controller = require('./controller/index');
const validator = require('./middleware/validation');
const sanitizer = require('./middleware/sanitization');


app.use(bodyparser.json());

app.post('/sign-in',sanitizer.sanitizationsignin,validator.validatorsignIn)

const port = process.env.POST || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}...s`);
})