const xss = require('xss');

const xssHelper = (data) => {
    for(const val in data){
        const result = xss(data[val]);
        if(result != data[val])
        throw new Error("xss error")
    }
}


module.exports = {
    xssHelper
}