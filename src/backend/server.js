const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');
//const webSocket = require('./socket');
//const secret = require('./config/secret');
const env = process.env.NODE_ENV || 'development';

// 라우터 부분

const userRouter = require('./User/userRoute');
const menteeRouter = require('./Mentee/menteeRoute');
const mentoRouter = require('./Mento/mentoRoute');
const chatRouter = require('./Chat/chatRoute');
const surveyRouter = require('./Survey/surveyRoute');


const errorhandler = require("./config/errorHandler");
const errorResponse = require("./config/errorResponse");
const { basicResponse } = require("./config/response");
const responseDetail = require("./config/responseDetail");



const app = express();


const whiteDomain = ["http://localhost:8080", "http://localhost:3000", "http://comento.co.kr"];
// const corOptions = {
//   origin: function (origin, callback) {
//     if (whiteDomain.indexOf(origin) !== -1){
//       callback(null, true);
//     }else{
//       callback(new Error("Not allowed domain"));
//     }
//   }
// };
app.use(cors());

app.set('port', process.env.PORT || 8080);
//app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



db.sequelize.sync().then(() => {
        console.log('db connect success');
}).catch(console.error);

let port;
if (env == "development") {
	port = 8080;
} else {
	port = secret.localPort;
}

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});


//webSocket(server, app);

//webSocket(server, app, sessionMiddleware);

//app.use('/', tempRouter);
//라우터는 이사이에 표시
app.use('/mento', mentoRouter);
app.use('/user', userRouter);
app.use('/mentee', menteeRouter);
app.use('/survey', surveyRouter);
app.use('/', chatRouter);
// app.use('/user/signup', checkRouter);
// app.use('/user/upload', uploadRouter);
// app.use('/find', findRouter);
// app.use('/sms', smsRouter);
// app.use("/answer", require("./routes/answer"));


//
app.use(errorhandler);




app.use((req, res, next) => {
  const error = new errorResponse(basicResponse(responseDetail.NO_ROUTER), 404);
  next(error);

});
