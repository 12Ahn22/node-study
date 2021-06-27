// 모듈 불러오기
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// dotenv 사용하기
require('dotenv').config();

// ORM 불러오기
const {sequelize} = require('./models/index'); // db.sequlize 객체

// 라우터 가져오기
const indexRouter = require('./routes/index');

// 어플리케이션 생성
const app = express(); // 내가 만든 app

// 포트 설정
app.set('port',process.env.PORT || '3001');
// 뷰 엔진 설정하기
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// cors
app.use(cors());

// 라우터 설정하기
app.use('/',indexRouter);

// 데이터베이스 연동와 자동 연동하기
sequelize.sync({force : false}) // force가 true라면 매번 테이블을 새로 생성한다.
  .then(()=>{
    console.log('데이터베이스 연결 성공');
})
  .catch((error)=>{
    console.log(`데이터베이스 연결 실패 ${error}`);
})

// 에러 처리 미들웨어
app.use((err, req, res, next)=>{
  console.error(err);
  res.status(500).send('에러 처리 미들웨어');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

module.exports = app;