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
      console.log(file);
      let nickname = req.user
        ? req.user.nickname
        : JSON.parse(req.body.data).nickname;
      const uploadDir = req.body.uploadDir
        ? JSON.parse(req.body.data).uploadDir
        : "etc";
      cb(null, `${uploadDir}/${nickname}/` + file.originalname);
    },
  }),
});

const deleteFile = async function deleteImage(params) {
  await s3.deleteObjects(params).promise();
};

module.exports = { s3, upload, deleteFile };
