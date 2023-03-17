const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "master",
    password: process.env.DB_PASSWORD,
    database: "commentodb",
    host: "commentodb.ccaq2rklxlda.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: "+09:00",
    logging: false,
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  },
  production: {
    username: "master",
    password: process.env.DB_PASSWORD,
    database: "comento",
    host: "commentodb.ccaq2rklxlda.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  },
};
