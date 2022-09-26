const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const TOKEN_EXPIRED = -3;
const INVALID_TOKEN = -2;


module.exports = {
    sign: async(user) => {
        const result = {
        accessToken : jwt.sign({
                type: "JWT",
                userid: user.userid,
                email : user.email,
                nickname: user.nickname,
                image: user.image,
            }, process.env.ACCESS_SECRET,{
            expiresIn: "15m", // 15분후 만료
            issuer: "friday",
            }),
            refreshToken : jwt.sign({
                userid: user.userid,
                email : user.email
            }, process.env.REFRESH_SECRET, {
                expiresIn: "1h", // 24시간후 만료
                issuer: "friday",
            })
    }
    return result;
},  verifyToken : async (token) => {
    if(token){
        try{
            const validToken = await jwt.verify(token,  process.env.ACCESS_SECRET);
            return {
                validToken: validToken,
                result: 1
            }
        } catch(error){
            if(error.name === 'TokenExpiredError'){
                return {
                    result: TOKEN_EXPIRED
                }
            }
            return  {
                result: INVALID_TOKEN
            }
        }
    }else{
        return INVALID_TOKEN;
    }
}
}