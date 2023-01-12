const { Sequelize, DataTypes, INTEGER  } = require('sequelize');
const models = require('../models');

module.exports = function(sequelize){
    const mentoring = sequelize.define('Mentoring',{
      mentoringid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
      },
      language: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mentoid: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      menteeid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      content_image: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      status:{
        type: Sequelize.CHAR(1),
        allowNull: true,
        defaultValue: 'N' // N이면 멘토링 시작 전, I이면 멘토링중, F이면 멘토링 끝
      }
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      modelName: "Mentoring",
      tableName: "mentoring",
      charset: "utf8",
      collate: "utf8_general_ci",
    })

    return mentoring;
}


