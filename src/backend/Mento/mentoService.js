const errorResponse = require("../config/errorResponse");
const responseDetail = require("../config/responseDetail");
const { Mentoring, Room, Chat, User } = require("../models");
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
exports.getSpecificQuestion = async function (language) {
  try {
    const result = await Mentoring.findAll({
      raw: true,
      plain: true,
      attributes: ["menteeid", "mentoringid", "title", "date", "language"],
      where: {
        language,
        status: "N",
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};
exports.connectMentoring = async function (mentoringid, mentoid) {
  try {
    await Mentoring.update(
      {
        mentoid,
        status: "I",
      },
      {
        where: {
          mentoringid,
          status: "B",
        },
      }
    );
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.getQuestionList = async function (language, status, userid) {
  try {
    const result = await Mentoring.findAll({
      raw: true,
      attributes: ["mentoringid", "title", "date", "language"],
      where: {
        language,
        status,
        mentoid: userid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};

exports.getAllQuestionList = async function (language, status) {
  try {
    const result = await Mentoring.findAll({
      raw: true,
      attributes: ["mentoringid", "title", "date", "language"],
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
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(responseDetail.DB_ERROR);
  }
};
