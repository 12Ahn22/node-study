const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.set('trust proxy', 1) // trust first proxy

// 세션 미들웨어 사용하기
app.use(session({
  secret: 'keyboard cat', // 필수 옵션- 공개되면 안된다.
  resave: false,  // 값이 바뀌면 세션에 저장한다.
  saveUninitialized: true, // 세션이 필요하기 전까지는 구동하지 않는다.
  // cookie: { secure: true },
  store: new FileStore(), // 세션 저장 장소를 file Store로 결정한다.
}))

app.get('/',(req,res)=>{
  console.log(req.session);
  if(req.session.num === undefined){
    req.session.num = 1;
  }else{
    req.session.num =  req.session.num + 1;
  }
  res.send(`Views : ${req.session.num}`);
})

app.listen(3000,()=>{
  console.log('3000번 포트에서 대기중');
})