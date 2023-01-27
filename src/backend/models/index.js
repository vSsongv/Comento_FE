const { Sequelize, DataTypes } = require('sequelize');

/*
const ChatUser = require("./chatuser.js");
const Messenger = require("./messenger.js");
const Room = require("./room.js");
*/


const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const Mentoring = require('./mentoring')(sequelize);
const User = require('./user')(sequelize);
const Auth = require('./auth')(sequelize);
const Room = require('./room')(sequelize);
const Chat = require('./chat')(sequelize);


// User : 채팅  => 1:다 

User.hasMany(Chat, {foreignKey: 'userid', sourceKey: 'userid'});
Chat.belongsTo(User, {foreignKey: 'userid', sourceKey: 'userid'});




// 멘토 : 채팅방 => 1:다
Mentoring.hasMany(Room, {foreignKey: 'mentoid', sourceKey:'mentoid'});
Room.belongsTo(Mentoring, {foreignKey: 'mentoid', sourceKey:'mentoid'})

// 멘티 : 채팅방 => 1:다
Mentoring.hasMany(Room, {foreignKey: 'menteeid', sourceKey:'menteeid'});
Room.belongsTo(Mentoring, {foreignKey: 'menteeid', sourceKey:'menteeid'})

Mentoring.hasOne(Room, {foreignKey: 'roomid', sourceKey: 'mentoringid'});
Room.hasOne(Mentoring, {foreignKey: 'mentoringid', sourceKey: 'roomid'});

Room.hasMany(Chat, {foreignKey: 'roomid', sourceKey:'roomid'});
Chat.belongsTo(Room, {foreignKey: 'roomid', sourceKey:'roomid'})

// User: 인증번호 => 1:다
User.hasOne(Auth, {foreignKey: 'email', sourceKey:'email'});
Auth.belongsTo(User, {foreignKey: 'email', sourceKey:'email'});


db.sequelize = sequelize;
db.Auth = Auth;
db.User = User;
db.Chat = Chat;
db.Mentoring= Mentoring;
db.Room = Room;

//ChatUser.init(sequelize);
//Messenger.init(sequelize);
//Room.init(sequelize);



module.exports = db;


