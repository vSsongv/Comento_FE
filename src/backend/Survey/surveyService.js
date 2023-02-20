const { Survey } = require('../models/index');
const errorResponse = require('../config/errorResponse');
const detailResponse = require('../config/responseDetail');
const { logger } = require("../config/winston");
const {Op} = require('sequelize');

exports.checkSurvey = async function(userid){
    try{
        const result = await Survey.findOne({
            where: {
                userid
            }
        });
        return result;
    }catch(error){
        logger.error(`${error.message}`);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.postSurvey = async function(userid, question1, question2, question3, evalutionText){
    try{
        await Survey.create({
            userid,
            question1,
            question2,
            question3,
            evalutionText
        });
    }catch(error){
        logger.error(`${error.message}`);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};