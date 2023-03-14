const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRED = -3;
const INVALID_TOKEN = -2;

module.exports = {
  sign: async (user, expiresIn) => {
    let result = {
      accessToken: jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
          role: user.role,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "3h",
          issuer: "Comento",
          subject: "accessToken",
        }
      ),
      refreshToken: jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: expiresIn,
          issuer: "Comento",
          subject: "userInfo",
        }
      ),
    };
    return result;
  },
  signAccessToken: async (user) => {
    let result = {
      accessToken: jwt.sign(
        {
          type: "JWT",
          userid: user.userid,
          role: user.role,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "3h",
          issuer: "Comento",
          subject: "accessToken",
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
