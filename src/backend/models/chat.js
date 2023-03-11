const { Sequelize, DataTypes, INTEGER } = require("sequelize");
const models = require("../models");
module.exports = function (sequelize) {
  const Chat = sequelize.define(
    "Chat",
    {
      roomid: {
        type: Sequelize.INTEGER,
      },
      chatid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      modelName: "Chat",
      tableName: "chat",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Chat;
};
