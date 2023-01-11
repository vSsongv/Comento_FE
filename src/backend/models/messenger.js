const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Messenger extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            messageid :{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            chatid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            message: {
                type: Sequelize.STRING(1000),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

};