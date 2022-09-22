const Sequelize = require('sequelize');


module.exports = class Auth extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email: {
                type: Sequelize.STRING(50),
                unique : true,
                allowNull: false,
                primaryKey: true
            },
            token: {
                type: Sequelize.STRING(12),
                allowNull: false,
            },
            created: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false, //
            underscored: false, 
            paranoid: false, //deletedAt 추가
            modelName: 'Auth',
            tableName: 'auth',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Auth.belongsTo(db.User, {
            foreignKey: "userid", targetKey: "userid"
        });
    }
};
