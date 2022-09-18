const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
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

    static associate(db) {}
};