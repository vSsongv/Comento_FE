const dotenv = require('dotenv');
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
const app = express();


sequelize.sync({force : false})
.then(() => {
    console.log('db connect success');
})
.catch((err) => {
    console.log(err);
})

//passportConfig();
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:8001',
    credentials:true,
}));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave: false,
    saveUninitalized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', pageRouter);
app.use('/user/signup', checkRouter);
app.use('/', userRouter);
app.use('/user/upload', uploadRouter);
app.use('/find', findRouter);
app.use((req, res, next) => {
    console.log('404 에러');
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});

