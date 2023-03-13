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
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      readStatus: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        defaultValue: 0,
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
