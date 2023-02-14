class errorResponse extends Error{
    constructor(baseResponse, statusCode){
        super(baseResponse.message);
        this.statusCode = statusCode;
        this.code = baseResponse.code;
        this.isSuccess = baseResponse.isSuccess;
        this.result = baseResponse.result //basicResponse인 경우 result가 없어서 undefined로 들어감
    } 
}

module.exports = errorResponse;