// express 패키지 가져오기
const express = require('express');

// express 모듈을 실행해서 app 변수에 할당하기
const app = express();

// app.set('port', 포트)로 서버가 실행될 포트를 설정한다.
app.set('port', process.env.PORT || 3000);

// 미들웨어 사용해보기
app.use((req, res, next) => {
  console.log('모든 요청에서 실행된다.');
  next(); // next를 해야 다음 일을 하기위해 넘어간다.
});

app.get(
  '/',
  (req, res, next) => {
    // 미들웨어를 여러개 넣을 수 있다.
    console.log('GET 요청에서만 실행되는 미들웨어');
    next(); // next를 꼭 써줘야한다.
  },
  (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로..'); // err.message
  }
);
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// app.get('port')를 통해서 위에 set에서 저장한 port 값을 가져올 수 있다.
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
