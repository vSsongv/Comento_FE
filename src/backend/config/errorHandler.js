const detailResponse = require('./responseDetail');
const {basicResponse} = require('./response');
const errorResponse = require('./errorResponse');

const errorhandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;
    // console.log(error);
    // console.error("error: ", error);

    let data = {
        isSuccess: false,
        code: error.code || 500,
        message: error.message || "Server Error"
    };
    if(error.result) data["result"] = error.result;
    res.status(error.statusCode || 500).json(data);
};

module.exports = errorhandler;