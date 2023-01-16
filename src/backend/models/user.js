const { Sequelize, DataTypes, INTEGER  } = require('sequelize');
const models = require('../models');
module.exports = function(sequelize){
        const User = sequelize.define('User',{
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            image: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull : false,
            },
            cellphone: {
                type: Sequelize.STRING(15),
                allowNull : false,
            },
            mentos: {
                type: INTEGER,
                allowNull: true,
                defaultValue : 0
            },
            refreshToken: {
                type: Sequelize.STRING(1000),
                allowNull: true
            },
            role: {
                type: Sequelize.CHAR(1),
                allowNull: true,
                defaultValue: 'Q'
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'User',
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
        return User;
}

