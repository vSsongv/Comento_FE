const {User, Auth} = require('../models/index');

const errorResponse = require('../config/errorResponse');
const detailResponse = require('../config/responseDetail');
const jwt = require("../config/token");
const token = require('../config/token');
const {Op} = require('sequelize');
exports.checkEmail = async function(email){
    try{
        const result = await User.findOne({
            where: {
                email
            }
        });
        return result; //해당 유저가 있으면 user email넘겨줌
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};


exports.checkPhone = async function(cellphone){
    try{
        const result = await User.findOne({
            where: {
                cellphone
            }
        });
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};
exports.checkNickname = async function(nickname){
    try{
        const result = await User.findOne({
            attributes: ['nickname'],
            where: {
                nickname
            }
        });
        return result; //해당 유저가 있으면 user nickname 넘겨줌
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};


exports.createUser = async function(nickname, email, password, image, cellphone){
    try{
        await User.create({
            nickname, 
            email,
            password,
            image,
            cellphone
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.signin = async function(userInfo, loginFlag){
    try{
        let expiresIn;
        if(loginFlag) expiresIn = "7d";
        else expiresIn = "6h"   
        let token = jwt.sign(userInfo, loginFlag, expiresIn);
        return token;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.getCertNum = async function(email){
    const ttl = 300000;
    const date = new Date();
    try{
        let result = await Auth.findOne({
            where: {
                email,
                created:{
                    [Op.gt] : date - ttl
                }
            }
        });
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.updateUser = async function(email, password){
    try{
        await User.update({
            password
        },{
            where: {
                email
            }
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};
exports.updateCertNum = async function(email, token){
    try{
        await Auth.update(
            {
                token: token,
                created: Date.now()
            },{
            where: {
                email
            }
            }
        )
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.createCertNum = async function(email, token, userid){
    try{
        await Auth.create({
                token,
                email,
                userid,
                created: Date.now()
        })
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.deleteCertNum = async function (email){
    try{
        await Auth.destroy({
            where:{
                email
            }
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
}