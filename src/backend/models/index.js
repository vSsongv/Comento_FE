const Sequelize = require('sequelize');
const User = require('./user');
const Auth = require('./auth');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Auth = Auth;
User.init(sequelize);
Auth.init(sequelize);

module.exports = db;