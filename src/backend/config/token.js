const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRED = -3;
const INVALID_TOKEN = -2;

module.exports = {
  sign: async (user, isKeep, expiresIn) => {
    let result = {
      accessToken: jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
          nickname: user.nickname,
          role: user.role,
          isKeep,
          mentos: user.mentos,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn,
          issuer: "Comento",
          subject: "userInfo",
        }
      ),
    };
    if (isKeep) {
      result["refreshToken"] = jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "30d",
          issuer: "Comento",
          subject: "userInfo",
        }
      );
    }
    return result;
  },
  verifyToken: async (token) => {
    if (token) {
      try {
        const validToken = await jwt.verify(token, process.env.ACCESS_SECRET);
        return {
          validToken: validToken,
          result: 1,
        };
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return {
            result: TOKEN_EXPIRED,
          };
        }
        return {
          result: INVALID_TOKEN,
        };
      }
    } else {
      return INVALID_TOKEN;
    }
  },
};
