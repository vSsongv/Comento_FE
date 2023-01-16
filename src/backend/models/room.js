const { Sequelize, DataTypes, INTEGER  } = require('sequelize');
const models = require('../models');
module.exports = function(sequelize){
        const Room = sequelize.define('Room',{
            roomid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            mentoid: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            menteeid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Room',
            tableName: 'room',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
        return Room;
}

