const s3 = require("../config/s3");
const secret = require("../config/secret");
const bucket = secret.bucket;

exports.deleteFile = function (data) {
  const params = {
    bucket: bucket,
    Key: `${data.uploadDir}/${data.fileName}`,
  };
  s3.deleteObject(params, function (err) {
    if (err) return false;
    return true;
  });
};
