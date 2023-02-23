const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRED = -3;
const INVALID_TOKEN = -2;

module.exports = {
  sign: async (user, isKeep, expiresIn) => {
    return jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
          nickname: user.nickname,
          role: user.role,
          isKeep,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn : "1m", // 15분후 만료
          issuer: "friday",
          subject: "userInfo",
        }
      );
  },
  refresh : async () => {
    return jwt.sign(
        {},
        process.env.REFRESH_SECRET,
        {
            expiresIn : "1d", // 1일 후 만료
            issuer: "friday",
        }
    );
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
