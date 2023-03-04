const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const env = process.env.NODE_ENV || "development";

// 라우터 부분
//TODO: next, errorHandler 부분 나중에 일괄 수정해야함.
const refresh = require("./middlewares/refresh");
const userRouter = require("./User/userRoute");
const menteeRouter = require("./Mentee/menteeRoute");
const mentoRouter = require("./Mento/mentoRoute");
const imageRouter = require("./Image/imageRoute");
const surveyRouter = require('./Survey/surveyRoute');
//const chatRouter = require('./Chat/chatRoute');

const chatRouter = require("./Chat/chatRoute");
const errorhandler = require("./config/errorHandler");
const errorResponse = require("./config/errorResponse");
const { basicResponse } = require("./config/response");
const responseDetail = require("./config/responseDetail");
//주석
const app = express();

app.use(cors());

app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("db connect success");
  })
  .catch(console.error);

if (env == "development") {
  port = 8080;
} else {
  port = secret.localPort;
}

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

//라우터는 이사이에 표시
app.get("/refresh", refresh);
app.use("/image", imageRouter);
app.use("/mento", mentoRouter);
app.use("/user", userRouter);
app.use("/mentee", menteeRouter);
app.use("/survey", surveyRouter);
app.use("/", chatRouter);
//

app.use(errorhandler);

app.use((req, res, next) => {
  const error = new errorResponse(basicResponse(responseDetail.NO_ROUTER), 404);
  next(error);
});
// 커밋추가
