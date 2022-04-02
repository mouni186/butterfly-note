const _ = require('lodash');


const isArrayEmpty  = (data) => {
return _.isEmpty(data)
}

const arrayLength = (data) => {
    return _.size(data);
}


module.exports = {
isArrayEmpty,
arrayLength
}