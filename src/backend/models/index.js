const Sequelize = require("sequelize");
const User = require("./user");
const Auth = require("./auth");
const Mentoring = require("./mentoring");
const ChatUser = require("./chatuser.js");
const Messenger = require("./messenger.js");
const Room = require("./room.js");

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

db.ChatUser = ChatUser;
db.Messenger = Messenger;
db.Room = Room;
db.User = User;
db.Auth = Auth;
db.Mentoring = Mentoring;

//ChatUser.init(sequelize);
//Messenger.init(sequelize);
//Room.init(sequelize);
User.init(sequelize);
Auth.init(sequelize);
Mentoring.init(sequelize);

//ChatUser.associate(db);
//Messenger.associate(db);
//Room.associate(db);
User.associate(db);
Auth.associate(db);
Mentoring.associate(db);

module.exports = db;


