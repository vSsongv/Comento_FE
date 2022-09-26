const express = require('express');
const router = express.Router();
const { user, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../modules/token');
const checkAuth = require('../middlewares/auth').checkToken;
router.get('/', checkAuth, async (req, res, next) => {
    try{
        if(req.user){
            const user = await User.findOne({
                where: {id : req.user.email}
            });

            const UserWithoutPw = await User.findOne({
                where: { id : user.email},
                attributes: {
                    exclude: ['password'],
                },
            });
            res.status(200).json(UserWithoutPw);
        } else{
            res.status(200).json(null);
        }
    } catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;