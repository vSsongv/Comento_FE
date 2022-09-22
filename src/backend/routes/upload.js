const express = require('express');
const router = express.Router();
const {verifyToken} = require('./middleware');
const file = require('../controller/uploadController');

router.post("/", verifyToken, file.upload );

module.exports = router;