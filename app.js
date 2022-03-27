const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.get('/api-butterfly', (req, res) => {
    const responseObject = {
        message: "success",
        status: 200
    }
    res.send(responseObject)
});







// const port = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`Listening on port `);
})