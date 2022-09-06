const sms = require('../controller/smsController');
const express = require('express');
const router = express.Router();

router.post('/send', sms.send);

router.post('/verify', sms.verify);

module.exports = router;