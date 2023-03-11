const errorResponse = require("../config/errorResponse");
const responseDetail = require("../config/responseDetail");
const { Mentoring, Room, Chat } = require("../models");
const Op = require("sequelize").Op;
const { logger } = require("../config/winston");
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
exports.getSpecificQuestion = async function (language, userid) {
  try {
    console.log(userid);
    const result = await Mentoring.findAll({
      raw: true,
      attributes: ["menteeid","title", "date", "language"],
      where: {
        language,
        status : "N",
        menteeid: {
          [Op.ne]: userid,
        },
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

exports.getQuestionList = async function(language, status){
  try {
    const result = await Mentoring.findAll({
      raw: true,
      attributes: ["menteeid","title", "date", "language"],
      where: {
        language,
        status,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.getQuestion = async function(mentoringid){
  try {
    const result = await Mentoring.findOne({
      raw: true,
      attributes: ["title", "createdAt", "language", "content", "content_image"],
      where: {
        mentoringid
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};