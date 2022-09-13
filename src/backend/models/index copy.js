const Sequelize = require("sequelize");
const User = require("./user");
const Mentoring = require("./mentoring");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Mentoring = Mentoring;

User.init(sequelize);
Mentoring.init(sequelize);

User.associate(db);
Mentoring.associate(db);

module.exports = db;
