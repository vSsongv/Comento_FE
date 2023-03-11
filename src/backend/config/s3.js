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
      let nickname = req.user
        ? req.user.nickname
        : JSON.parse(req.body.data).nickname;
      const uploadDir = req.body.uploadDir
        ? JSON.parse(req.body.data).uploadDir
        : "etc";
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, `${uploadDir}/${nickname}/` + file.originalname);
    },
  }),
});

const deleteFiles = async function deleteImage(params) {
  await s3.deleteObjects(params).promise();
};
const deleteSingleFile = async function deleteImages(params) {
  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
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
