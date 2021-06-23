// express 패키지 가져오기
const express = require('express');

// express 모듈을 실행해서 app 변수에 할당하기
const app = express();

// app.set('port', 포트)로 서버가 실행될 포트를 설정한다.
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

// app.get('port')를 통해서 위에 set에서 저장한 port 값을 가져올 수 있다.
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
