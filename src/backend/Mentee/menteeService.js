const Mentoring = require('../models/mentoring');
const errorResponse = require('../config/errorResponse');
const detailResponse = require('../config/responseDetail');
exports.postQuestion = async function(userid,language, title, content){
    try{
        console.log(content);
        await Mentoring.create({
            menteeId: userid,
            language,
            title,
            content
        })
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.getQuestion = async function(menteeId){
    try{
        const question = await Mentoring.findAll({
            where:{
                menteeId
            }
        })
        return question;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.checkTitle = async function(menteeId, title){
    try{
        const result = await Mentoring.findOne({
            where:{
                menteeId,
                title
            }
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.checkContent = async function(menteeId, content){
    try{
        const result = await Mentoring.findOne({
            where:{
                menteeId,
                content
            }
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.getSpecificQuestion = async function(menteeId, mentoringId){
    try{
        const result = await Mentoring.findOne({
            where:{
                menteeId,
                mentoringId
            }
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.modifyQuestion = async function(mentoringId, title, content, language){
    try{
        await Mentoring.update(
            {
                title,
                content,
                language
        },
        {
            where:{
                mentoringId
            }
        })
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.deleteQuestion = async function(mentoringId){
    try{
        await Mentoring.destroy({where: {mentoringId}});
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
}