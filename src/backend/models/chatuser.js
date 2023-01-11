const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class chatUser extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            chatid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
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