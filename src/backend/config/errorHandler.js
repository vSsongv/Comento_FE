const detailResponse = require("./responseDetail");
const { basicResponse } = require("./response");
const errorResponse = require("./errorResponse");
const { logger } = require("../config/winston");
const errorhandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;
  error.statusCode = err.statusCode || 500;

  // 데이터 베이스 에러라면 EC2 콘솔에 찍히도록!
  if (error.statusCode === 500) {
    logger.error("UNHANDLED ERROR : \n", error);
    console.log("UNHANDLED ERROR : \n", error);
  }

  let data = {
    isSuccess: false,
    code: error.code || 500, //TODO : modify
    message: error.statusCode === 500 ? "INTERNAL_SERVER_ERROR" : error.message,
  };

  if (error.result) data["result"] = error.result;
  res.status(error.statusCode).json(data);
};

module.exports = errorhandler;
