const errorResponse = require("../config/errorResponse");
const responseDetail = require("../config/responseDetail");
const { Mentoring, Room, Chat, User } = require("../models");
const Op = require("sequelize").Op;
const { logger } = require("../config/winston");
const userService = require("../User/userService");
const { checkMentoringStatus } = require("../Mentee/menteeService");
exports.checkMentoring = async function (mentoringid) {
  try {
    const result = await Mentoring.findOne({
      raw: true,
      attributes: ["status"],
      where: {
        mentoringid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.connectMentoring = async function (userid, mentoringid) {
  try {
    await Mentoring.update(
      {
        mentoid: userid,
      },
      {
        where: {
          mentoringid,
        },
      }
    );
    await Room.update(
      {
        mentoid: userid,
      },
      {
        where: {
          roomid: mentoringid,
        },
      }
    );
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.getSpecificQuestion = async function (language) {
  try {
    const result = await Mentoring.findAll({
      raw: true,
      attributes: ["menteeid", "mentoringid", "title", "createdAt", "language"],
      where: {
        language,
        status: "N",
      },
    });
    
    for(var i=0; i<result.length; i++)
    {
      const nickname = await userService.getNickname(result[i].menteeid);
      delete result[i].menteeid;
      result[i].nickname = nickname.nickname;
    }
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.getQuestionList = async function (language, status, userid) {
  try {
    /*
    const Result = await Mentoring.findAll({
      where:{
        language,
        status,
        mentoid: userid,
      },
      raw: true,
      include:[
        {
          model: User,
          attributes: ["nickname"],
          
        }
      ],
      attributes: ["menteeid", "mentoringid", "title", "date", "language"],
    });

    console.log("REsult : ", Result);
    */

    const result = await Mentoring.findAll({
      raw: true,
      attributes: ["menteeid", "mentoringid", "title", "createdAt", "language"],
      where: {
        language,
        status,
        mentoid: userid,
      },
    });

    for(var i=0; i<result.length; i++)
    {
      const nickname = await userService.getNickname(result[i].menteeid);
      delete result[i].menteeid;
      result[i].nickname = nickname.nickname;
    }
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.getQuestion = async function (mentoringid) {
  try {
    const result = await Mentoring.findOne({
      raw: true,
      attributes: [
        "menteeid",
        "title",
        "createdAt",
        "language",
        "content",
        "content_image",
      ],
      where: {
        mentoringid,
      },
    });
    const nickname = await userService.getNickname(result.menteeid);
    delete result.menteeid;
    result.nickname = nickname.nickname;

    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.CountQuestionNum = async function (userid) {
  try {
    const before = await Mentoring.findAndCountAll({
      raw: true,
      where: {
        status: "N",
      },
    });

    const ing = await Mentoring.findAndCountAll({
      raw: true,
      where: {
        status: "I",
        mentoid: userid,
      },
    });

    const end = await Mentoring.findAndCountAll({
      raw: true,
      where: {
        status: "F",
        mentoid: userid,
      },
    });
    return {before: before.count, ing: ing.count, end: end.count};
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};