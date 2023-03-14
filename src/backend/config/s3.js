const secret = require("./secret");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS_config_region = secret.awsConfigRegion;
const accessKey = secret.imageAccessKey;
const secretKey = secret.imageSecretAccessKey;
const bucket = secret.bucket;
const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: AWS_config_region,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅,
    acl: "public-read",
    key: (req, file, cb) => {
      let uploadDir;
      if (req.url.includes("user")) uploadDir = "profile";
      else if (req.url.includes("question"))
        uploadDir = "mentoring/" + req.user.userid;
      else if (req.url.includes("chat"))
        uploadDir = "chat/" + req.params.roomid;
      else uploadDir = "etc";
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, `${uploadDir}/` + file.originalname);
    },
  }),
});

const deleteFiles = async function deleteImage(params) {
  await s3.deleteObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

const deleteSingleFile = async function deleteImages(params) {
  try {
    await s3.deleteObjects(params, function (error, data) {
      if (error) {
        console.log("asdasd");
        console.log("err: ", error, error.stack);
      } else {
        console.log(data, " 정상 삭제 되었습니다.");
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { s3, upload, deleteFiles, deleteSingleFile };
