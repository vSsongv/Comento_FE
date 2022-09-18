const express = require('express');
const router = express.Router();
const check = require('../controller/checkController');

router.get('/idcheck', check.id);

router.get('/phonecheck', check.phone);

router.get('/nickcheck', check.nickname);

module.exports = router;