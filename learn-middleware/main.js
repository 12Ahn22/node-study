const express = require('express');
const cookie = require('cookie'); // 쿠키 모듈

const app = express();

app.use(express.static(__dirname + '/public'));
// 아래 두개를 안써주면 body에 데이터가 안담김.
app.use(express.json());
app.use(express.urlencoded({extended:false}));



const isLogined = ((req,res,next)=>{
  console.log('isLogg');
  if(req.headers.cookie){
    const cookies = cookie.parse(req.headers.cookie);
    if(cookies.email === 'a@a' && cookies.password === '1234'){
      console.log('true');
    }else{
      console.log('false');
    }
  }
  next();
})

app.use(isLogined);

app.get('/',(req,res)=>{

  res.render('index');
})

app.get('/test',(req,res)=>{

  res.send('test');
})

// 로그인 프로세스 라우터
app.post('/login_process',(req,res)=>{
  // 임의로 아이디 검사하기
  if(req.body.email === 'a@a' 
  && req.body.password === '1234'){
    // 아이디 비밀번호가 맞다
    // 쿠키를 만든다
    res.cookie('email',req.body.email);
    res.cookie('password',req.body.password);
    res.cookie('nikcname','ayo');
  }
  else{
    res.redirect('/');
  }
  res.redirect('/');
})


app.listen(5500);
