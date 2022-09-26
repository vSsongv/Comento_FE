const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const passport = require('passport');

const { sequelize } = require('./models/index');

const pageRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const checkRouter = require('./routes/check')
const uploadRouter = require('./routes/upload');
const findRouter = require('./routes/findpassword');
const smsRouter = require('./routes/sms');

const app = express();

const whiteDomain = ["http://localhost:8080", "http://localhost:3000", "http://comento.co.kr"];
const corOptions = {
  origin: function (origin, callback) {
    if (whiteDomain.indexOf(origin) !== -1){
      callback(null, true);
    }else{
      callback(new Error("Not allowed domain"));
    }
  }
}
app.use(cors(corOptions));
//passportConfig();
app.set('port', process.env.PORT || 8080);

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitalized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/', userRouter);
app.use('/user', pageRouter);
app.use('/user/signup', checkRouter);
app.use('/user/upload', uploadRouter);
app.use('/find', findRouter);
app.use('/sms', smsRouter);


app.use("/answer", require("./routes/answer"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
