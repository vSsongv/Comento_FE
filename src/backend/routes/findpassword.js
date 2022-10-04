const express = require("express");
const router = express.Router();
const find = require("../controller/findController");

router.post("/password", find.password);

module.exports = router;