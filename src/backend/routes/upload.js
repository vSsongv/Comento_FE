const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../config/token');
const file = require('../controller/uploadController');
const checkAuth = require('../middlewares/auth').checkToken;

router.post("/profile", checkAuth, file.upload );

module.exports = router;