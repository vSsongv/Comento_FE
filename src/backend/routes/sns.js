const sns = require('../controller/snsController');
const express = require('express');
const router = express.Router();

router.post('/send', sns.send);

router.post('/verify', sns.verify);

module.exports = router;