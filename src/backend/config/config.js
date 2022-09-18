const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development":{
    "username" : "master",
    "password" : process.env.DB_PASSWORD,
    "database" : "commentodb",
    "host" : "commentodb.ccaq2rklxlda.ap-northeast-2.rds.amazonaws.com",
    "dialect" : "mysql"
  },
}