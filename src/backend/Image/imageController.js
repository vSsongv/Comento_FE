const { basicResponse, resultResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const { deleteFile } = require("../config/s3");

exports.upload = function (req, res) {
  const files = req.files;
  const uploadDir = req.body.uploadDir;
  let fileList = [];
  if (!files || files == undefined)
    return res.status(400).send(basicResponse(detailResponse.UPLOADFILE_EMPTY));
  files.forEach((obj) => {
    let file = {
      fileName: obj.key,
      fileUrl: obj.location,
      uploadDir: uploadDir,
    };
    fileList.push(file);
  });
  return res.send(
    resultResponse(detailResponse.IMAGE_UPLOAD_SUCCESS, fileList)
  );
};

exports.delete = function (req, res) {
  const data = req.body;
  const result = deleteFile(data);
  if (!result)
    return res.status(500).send(basicResponse(detailResponse.DB_ERROR));
  return res.status(200).send(basicResponse(detailResponse.DELETE_SUCCESS));
};
