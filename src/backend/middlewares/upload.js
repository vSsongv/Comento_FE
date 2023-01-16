const multer = require('multer');
const fs = require('fs');

const errorResponse = require('../config/errorResponse');
const detailResponse = require('../config/responseDetail');
const {basicResponse, resultResponse}  = require('../config/response');

let profileDir = __dirname + "/../../profile";
let mentoringDir = __dirname + "/../../mentoring"
if(!(fs.existsSync(profileDir))) fs.mkdirSync(profileDir);
if(!(fs.existsSync(mentoringDir))) fs.mkdirSync(mentoringDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname == "profile"){
            cb(null, profileDir);
        }else{
            cb(null, mentoringDir);
        }
    },
    filename: (req, file, cb) => {
        let imageName;
        const typeArray = file.mimetype.split("/");
        const fileType = typeArray[1];
        if(file.fieldname == "profile" || 1) imageName = Date.now() +"_profile."+fileType; // ||1은 임시로 두었음. 추후 멘토링에 이미지 업로드할때 아래조건문 수정하면서 개선할 예정
        /*else {
            imageName = req.nickname+ "_mentoring." +file.originalname+ fileType;
        }*/
        cb(null, imageName);
    },
});





//제한
const limits = {
    fieldNameSize: 200, //필드명 사이즈 최대값
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  };
  
  
  //확장자 필터
  const fileFilter = (req, file, callback) => {
    const typeArray = file.mimetype.split("/");
    const fileType = typeArray[1];
    console.log(fileType);
    if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
  };
  
  
  
  
  const upload = multer({
    storage: storage,  //이미지 업로드
    limits: limits,     //업로드 제한
    fileFilter: fileFilter,   //파일 제한
  }); 
  
  
module.exports = upload;