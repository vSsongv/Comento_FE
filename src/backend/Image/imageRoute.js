const express = require("express");
const router = express.Router();
const imageController = require("./imageController");
const { checkToken } = require("../middlewares/auth");
const { upload } = require("../config/s3");

router.post(
  "/upload",
  checkToken,
  upload.array(["images"]),
  imageController.upload
);
router.post("/delete", checkToken, imageController.delete);

module.exports = router;
