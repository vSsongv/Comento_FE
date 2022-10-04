const multer = require('multer');
const fs = require('fs');
const imageDir = __dirname + '/../tempimage/';
const CODE = require('../modules/statusCode');

if(!fs.existsSync(imageDir)) { 
    fs.mkdirSync(imageDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        var ext = file.mimetype.split('/')[1]; 
        if(!['png', 'jpg', 'jpeg'].includes(ext)) {
            return cb(new Error('이미지만 올려주세요.'))
        }
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const uploadFunc =  multer({storage : storage}).single('filename');

const file = {
    upload : (req, res ,next) => {
        uploadFunc(req, res, (err) => {
            console.error(err);
            if(err){
                return res.json({ statusCode: CODE.FAIL, msg: "fail uploading file", result: 0 });
            }
            return res.json({
                statusCode: CODE.SUCCESS,
                msg:"upload success",
                result: 1,
                image: res.req.file.path,
                fileName: res.req.file.filename,
            })
        })
    }
};

module.exports = file;