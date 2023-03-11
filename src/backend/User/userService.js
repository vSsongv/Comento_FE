const { User, Auth } = require("../models/index");

const errorResponse = require("../config/errorResponse");
const detailResponse = require("../config/responseDetail");
const jwt = require("../config/token");
const token = require("../config/token");
const { logger } = require("../config/winston");
const { Op } = require("sequelize");
exports.checkEmail = async function (email) {
  try {
    const result = await User.findOne({
      raw: true,
      where: {
        email,
      },
    });
    return result; //해당 유저가 있으면 user email넘겨줌
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.saveRefreshToken = async function (refreshToken, userid) {
  try {
    await User.update(
      {
        refreshToken,
      },
      {
        where: {
          userid,
        },
      }
    );
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.checkPhone = async function (cellphone) {
  try {
    const result = await User.findOne({
      raw: true,
      attributes: ["userid"],
      where: {
        cellphone,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.checkNickname = async function (nickname) {
  try {
    const result = await User.findOne({
      raw: true,
      attributes: ["userid"],
      where: {
        nickname,
      },
    });
    return result; //해당 유저가 있으면 user nickname 넘겨줌
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.createUser = async function (
  nickname,
  email,
  password,
  image,
  cellphone
) {
  try {
    await User.create({
      nickname,
      email,
      password,
      image,
      cellphone,
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.signin = async function (userInfo, isKeep) {
  try {
    let expiresIn = isKeep ? "3d" : "6h";
    let token = jwt.sign(userInfo, expiresIn);
    return token;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.issueAccessToken = async function (userInfo) {
  try {
    let token = jwt.signAccessToken(userInfo);
    return token;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getUserInfo = async function (userid) {
  try {
    let result = await User.findOne({
      raw: true,
      where: {
        userid,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.getCertNum = async function (email) {
  const ttl = 300000;
  const date = new Date();
  try {
    let result = await Auth.findOne({
      where: {
        email,
        created: {
          [Op.gt]: date - ttl,
        },
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.updateUser = async function (email, password) {
  try {
    await User.update(
      {
        password,
      },
      {
        where: {
          email,
        },
      }
    );
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
exports.updateCertNum = async function (email, token) {
  try {
    await Auth.update(
      {
        token: token,
        created: Date.now(),
      },
      {
        where: {
          email,
        },
      }
    );
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.createCertNum = async function (email, token) {
  try {
    let created = Date.now();
    await Auth.create({
      email: email,
      token: token,
      created: created,
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.deleteCertNum = async function (email) {
  try {
    await Auth.destroy({
      where: {
        email,
      },
    });
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.updateMentoRole = async function (userIdx) {
  try {
    await User.update({
      role: 'A'
    },{
      where:{
          userid: userIdx
      }
    );
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};

exports.getToken = async function (useridx) {
  try {
    const result = await User.findOne({
      attributes: ["refreshToken"],
      where: {
        userid: useridx,
      },
    });
    return result;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new errorResponse(detailResponse.DB_ERROR, 500);
  }
};
