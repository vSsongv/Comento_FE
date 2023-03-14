const { nextTick } = require("process");
const { Chat, Room, sequelize } = require("../models");
const Mentoring = require("../models/mentoring");
const { Op, exists } = require("sequelize");
const detailResponse = require("../config/responseDetail");
const errorResponse = require("../config/errorResponse");
const { logger } = require("../config/winston");
exports.checkMentoring = async function (mentoringId) {
  try {
    const result = await Mentoring.findOne({
      raw: true,
      where: {
        mentoringId,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.checkRoomAuth = async function (roomid) {
  try {
    const result = await Room.findOne({
      raw: true,
      attributes: ["mentoid", "menteeid"],
      where: {
        roomid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getChatByRoomId = async function (roomid) {
  try {
    const result = await Chat.findAll({
      raw: true,
      attributes: ["nickname", "message", "chatid", "createdAt", "image"],
      where: {
        roomid,
      },
      order: [["createdAt", "asc"]],
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getMenteeInfo = async function (roomid) {
  try {
    const result = await Room.findOne({
      raw: true,
      attributes: ["menteeid"],
      where: {
        roomid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.getMentoInfo = async function (roomid) {
  try {
    const result = await Room.findOne({
      raw: true,
      attributes: ["mentoid"],
      where: {
        roomid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getChatInfo = async function (roomid, nickname, message) {
  try {
    const result = await Chat.findOne({
      raw: true,
      attributes: ["createdAt", "chatid"],
      where: {
        roomid,
        nickname,
        message,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getImageInfo = async function (roomid, nickname, image) {
  try {
    const result = await Chat.findOne({
      raw: true,
      attributes: ["createdAt", "chatid"],
      where: {
        roomid,
        nickname,
        image,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getRoomNumber = async function (roomid) {
  try {
    //TODO: room status 체크하는 조건 추가
    const result = await Room.findOne({
      raw: true,
      attributes: ["roomid"],
      where: {
        roomid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.postChat = async function (roomid, nickname, message) {
  try {
    await Chat.create({
      roomid: roomid,
      nickname: nickname,
      message: message,
      createdAt: Date.now(),
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.postChatImage = async function (roomid, nickname, image) {
  try {
    await Chat.create({
      roomid: roomid,
      nickname: nickname,
      image: image,
      createdAt: Date.now(),
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getRoom = async function (roomid, userid) {
  try {
    const result = await Room.findAll({
      raw: true,
      attributes: ["nickname", "message", "createdAt"],
      where: {
        roomid,
        userid,
      },
      order: [["createdAt", "DESC"]],
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getChat = async function (mentoringId) {
  try {
    const result = await Chat.findAll({
      attributes: ["message", "created_at"],
      where: {
        mentoringId,
      },
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
