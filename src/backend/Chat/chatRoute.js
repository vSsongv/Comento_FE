const express = require("express");
const router = express.Router();
const chatController = require("./chatController");
const { checkToken } = require("../middlewares/auth");
const { checkRoomAuth } = require("../middlewares/roomAuth");
const { upload } = require("../config/s3");
//TODO: checkRoomAuth 추가
router.get("/chat/:roomid", checkToken, checkRoomAuth, chatController.getRoom);

router.post(
  "/chat/image/:roomid",
  upload.single(["images"]),
  chatController.postImage
);
router.post("/chat/:roomid", chatController.postChat);
// // 새로운 채팅방 생성 api
// router.get('/', async(req, res, next) => {
//     try{
//         const rooms = await Room.find({});
//         res.render('main', {rooms, title: '채팅방 목록'});
//     }catch(error){
//         logger.error(`${error.message}`);
//         throw new errorResponse(detailResponse.DB_ERROR, 500);
//     }
// })

// router.post('/room', async(req, res, next) => {
//     const menteeid = req.user.userid;
//     if(!menteeid) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));

//     const newRoom = await Room.create({menteeid});
//     const { userName, title } = req.body;
//     roomInfo[roomIdx] = { title, users: [userName] };
//     console.log("채팅방 개설 : ", title);
//     res.send({
//         isSuccess: true,
//         code: 200,
//         message: "채팅방 개설 성공",
//         roomId: roomIdx++
//     });
// });

module.exports = router;
