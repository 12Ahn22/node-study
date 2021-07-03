const express = require('express');

const app = express();

// 나만의 미들웨어 만들기1
const myLogger = (req,res,next)=>{
  console.log('LOOOOOGED');
  next();
}


// 나만의 미들웨어 만들기2 - req객체의 프로퍼티로 데이터 넘기기
const reqTime = (req,res,next)=>{
  req.reqTime = Date.now();
  next();
}

// 나만의 미들웨어 만들기3 - 옵션을 사용하는 미들웨어
const mw = require('./my-middleware');

// 미들웨어 사용하기
app.use(myLogger);
app.use(reqTime);
app.use(mw({opt1:'hi', opt2:'bye'}));

app.get('/',(req,res)=>{
  let resText = 'Hello World!';
  resText += req.reqTime;
  res.send(resText);
})

app.get('/user',(req,res,next)=>{
  console.log('Requset URL:', req.originalUrl);
  // next('route');
  next(error);
},(req,res,next)=>{
  console.log('Requset Type', req.method);
  res.send('hi');
});
app.get('/user',(req,res)=>{
  res.send('is OK?');
})

// 에러처리 미들웨어
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).send('에러 처리 미들웨어에 도달했습니다..');
})

app.listen(5500);