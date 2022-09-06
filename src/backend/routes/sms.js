const sms = require('../controller/snsController');
const express = require('express');
const router = express.Router();

router.post('/send', sms.send);

router.post('/verify', sms.verify);

module.exports = router;