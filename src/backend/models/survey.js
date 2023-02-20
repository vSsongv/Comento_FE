const { Sequelize, DataTypes, INTEGER  } = require('sequelize');
const models = require('../models');

module.exports = function(sequelize){
    const survey = sequelize.define('Survey',{
      surveyidx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evalutionText: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      modelName: "Survey",
      tableName: "survey",
      charset: "utf8",
      collate: "utf8_general_ci",
    })

    return survey;
}


