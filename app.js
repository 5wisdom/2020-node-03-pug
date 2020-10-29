// 전역변수
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// 전역변수
const memberRouter = require('./routes/member');
const sqlRouter = require('./routes/sql');
const sqlRouter2 = require('./routes/sql2');


//서버구동
app.listen(process.env.PORT, () => {console.log('http://127.0.0.1:3000')});

//PUG등록
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;

//Router
app.use(express.json());
app.use(express.urlencoded({extended: false})); //포스트로 넘어온거 변환

//등록을 해줘야만 외부에서 접근이 가능하다
//static등록은 무조건 절대경로로 써줘야한다
app.use('/', express.static(path.join(__dirname, './public'))); //절대경로로 만듬 ./상대경로로 쓰면 안됨 /부터 표현해야함
app.use('/storage', express.static(path.join(__dirname, './uploads'))); //storage로 들어오면 uploads로 보내줘
// 해커들이 침입하지 못하게 밖에서는 storage로 보이지만 안에서는 uploads 로 들어간다
app.use('/member', memberRouter);
app.use('/sql', sqlRouter);
app.use('/sql2', sqlRouter2);