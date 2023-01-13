const {Mentoring, Room, Chat} = require('../models')

const errorResponse = require('../config/errorResponse');
const detailResponse = require('../config/responseDetail');
const Op = require('sequelize').Op;

exports.postQuestion = async function(userid,language, title, content){
    try{
        console.log(content);
        await Mentoring.create({
            menteeid: userid,
            language,
            title,
            content
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.createRoom = async function(menteeid){
    try{
        const result = await Room.create({
            raw: true,
            attributes: ['roomid'],
            menteeid
        });
        return result;

    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.createChat = async function(nickname, content){
    try{
        await Chat.create({
            nickname,
            content
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
}
exports.getUnderwayQuestion = async function(menteeid){
    try{
        const question = await Mentoring.findAll({
            attributes:['title', 'content', 'date', 'language'],
            where:{
                menteeid,
                status:'N'
            }
        })
        return question;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};
exports.getFinishedQuestion = async function(menteeid){
    try{
        const question = await Mentoring.findAll({
            attributes:['title', 'content', 'date', 'language'],
            where:{
                menteeid,
                status:'Y'
            }
        })
        return question;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500); 
    }
}
exports.checkTitle = async function(menteeid, title){
    try{
        const result = await Mentoring.findOne({
            where:{
                menteeid,
                title
            }
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.checkContent = async function(menteeid, content){
    try{
        const result = await Mentoring.findOne({
            where:{
                menteeid,
                content
            }
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.getAllQuestion = async function(userid){
    try{
        const result = await Mentoring.findAll({
            raw:true,
            attributes: ['title', 'content', 'createdAt', 'updatedAt', 'language'],
            where:{
                [Op.or]: [{
                    mentoid: userid,
                },{
                    menteeid : userid
                }]
            },
            
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
}
exports.getSpecificQuestion = async function(menteeid, mentoringid){
    try{
        const result = await Mentoring.findOne({
            raw:true,
            attributes:['title', 'content', 'createdAt', 'updatedAt', 'language'],
            where:{
                menteeid,
                mentoringid
            }
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.modifyQuestion = async function(mentoringid, title, content, language){
    try{
        await Mentoring.update(
            {
                title,
                content,
                language
        },
        {
            where:{
                mentoringid
            }
        })
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.modifyChat = async function(userid, roomid, content, title, language){
    try{
        await Chat.update({
            title,
            content,
            language
        },
        {
            where:{
                userid,
                roomid
            }
        }
        )
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.deleteQuestion = async function(mentoringid){
    try{
        await Mentoring.destroy({where: {mentoringid}});
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.deleteChat = async function(userid, chatid){
    try{
        await Chat.destroy({where:{
            userid,
            chatid
        }})
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.deleteRoom = async function(roomid){
    try{
        await Room.destroy({
            where:{
                roomid
            }
        })
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};
