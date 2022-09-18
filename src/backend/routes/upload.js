const express = require('express');
const router = express.Router();
const file = require('../controller/uploadController');

router.post("/", file.upload );

module.exports = router;