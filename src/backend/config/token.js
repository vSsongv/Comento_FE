const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRED = -3;
const INVALID_TOKEN = -2;

module.exports = {
  sign: async (user, isKeep, expiresIn) => {
    const result = {
      accessToken: jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
          nickname: user.nickname,
          role: user.role,
          mentos: user.mentos,
          isKeep,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn, // 15분후 만료
          issuer: "friday",
          subject: "userInfo",
        }
      ),
    };
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
