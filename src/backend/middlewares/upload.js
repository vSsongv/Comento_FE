const multer = require("multer");
const fs = require("fs");
const path = require("path");
const profileDir = __dirname + "/../../profile";
const mentoringDir = __dirname + "/../../mentoring";
const defaultDir = __dirname + "/../../temp";

if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir);
if (!fs.existsSync(mentoringDir)) fs.mkdirSync(mentoringDir);
if (!fs.existsSync(defaultDir)) fs.mkdirSync(defaultDir);
const FILE_TYPE = ["jpg", "jpeg", "png", "img"];
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const url = req.url;
    if (url.includes("signup")) {
      callback(null, profileDir);
    } else if (url.includes("question")) {
      callback(null, mentoringDir);
    } else {
      callback(null, defaultDir);
    }
  },
  filename: (req, file, cb) => {
    console.log(file, req.url);
    let imageName = file.originalname;
    const url = req.url;
    if (url.includes("signup")) {
      imageName = Date.now() + "_profile_" + imageName;
    } else if (url.includes("question")) {
      imageName = "question_" + imageName;
    }
    cb(null, imageName);
  },
});

//확장자 필터
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];
  if (FILE_TYPE.indexOf(fileType) !== -1) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};

const upload = multer({
  storage: storage, //이미지 업로드
  limits: { filedSize: 5 * 1024 * 1024 }, // 3MB로 설정, //업로드 제한
  fileFilter: fileFilter, //파일 제한
});

module.exports = upload;
