// express 패키지 가져오기
const express = require('express');
// 미들웨어 패키지들
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// 경로를 위한 노드 내장 모듈 path
const path = require('path');
// process.env를 관리하기 위한 패키지
const dotenv = require('dotenv');

// multer
const multer = require('multer');
// multer 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req ,file ,done){
      // req와 file을 가공해서 done 함수로 넘긴다
      // done(에러, 실제 경로나 파일이름);
      done(null,'uploads/'); // 파일이 저장되는 위치
    },
    filename(req ,file ,done){ // 파일이 저장되는 이름
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // 업로드에 대한 제한 사항
  limits:{ fileSize: 5 * 1024 * 1024 },
});

// 파일시스템 모듈
const fs = require('fs');

// 파일 시스템으로 multer를 위한 폴더 만들기
try {
  fs.readdirSync('uploads'); // 디렉터리 읽기
} catch (error) {
  console.log('uploads 폴더가 없어서 폴더를 생성합니다');
  fs.mkdirSync('uploads'); // 없다면 생성하기
}

// dotenv
dotenv.config();

// express 모듈을 실행해서 app 변수에 할당하기
const app = express();
// app.set('port', 포트)로 서버가 실행될 포트를 설정한다.
app.set('port', process.env.PORT || 3000);

// 미들웨어 패키지들 사용해보기
// app.use(morgan('dev')); // 로그를 콘솔에 찍는 미들웨어
// morgan 미들웨어를 미들웨어 패턴을 이용해 분기처리 해보기
app.use((req,res,next)=>{
  if(process.env.NODE_ENV === 'production'){
    morgan('conbined')(req,res,next);
  }else{
    morgan('dev')(req,res,next);
  }
});



// 정적인 파일들을 제공하는 라우터 역할
// localhost:3000/test.js
app.use(express.static('public'));
// localhost:3000/test/test.js
// app.use('/static', express.static('public'));

// body-parser 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser 쿠키를 해석해서 객체로 만든다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// express-session 미들웨어 사용하기
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);

// 미들웨어 사용해보기
app.use((req, res, next) => {
  console.log('모든 요청에서 실행된다.');
  next(); // next를 해야 다음 일을 하기위해 넘어간다.
});

// 미들웨어 간에 데이터 전송하기
app.use(
  (req, res, next) => {
    req.data = '다음 미들웨어에게 주고싶은 데이터';
    next();
  },
  (req, res, next) => {
    console.log('데이터를 받았나요?', req.data); // 위의 미들웨어에서 받은 데이터
    next();
  }
);

app.get(
  '/',
  (req, res, next) => {
    // 미들웨어를 여러개 넣을 수 있다.
    console.log('GET 요청에서만 실행되는 미들웨어');
    next(); // next를 꼭 써줘야한다.
  },
  (req, res) => {
    res.send('hi');
    // throw new Error('에러는 에러 처리 미들웨어로..'); // err.message
  }
);

// upload 관련 라우터
// upload.single은 하나 업로드 받을 때
// upload.array('many') 많은 업로드
app.post('/upload',upload.single('image'),(req,res)=>{
  // req.file에 내가 업로드한 데이터가 들어있다.
  console.log(req.file, req.body);
  res.send('OK');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// app.get('port')를 통해서 위에 set에서 저장한 port 값을 가져올 수 있다.
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
