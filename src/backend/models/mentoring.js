const Sequelize = require("sequelize");
const express = require("express");
const app = express();
app.set("view engine", "ejs");

module.exports = class Mentoring extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mentoringId: {
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
        mentoId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        menteeId: {
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Mentoring",
        tableName: "mentoring",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // db.Mentoring.belongsTo(db.User, {
    //   foreignKey: "mentoId",
    //   targetKey: "userid",
    //   through: "aaa",
    // });
    // db.Mentoring.belongsTo(db.User, {
    //   foreignKey: "menteeId",
    //   targetKey: "userid",
    //   through: "bbb",
    // });
  }
};
