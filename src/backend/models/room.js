const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            chatid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING(50),
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