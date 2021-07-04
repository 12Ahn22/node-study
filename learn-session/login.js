const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

const {isLoggedIn} = require('./auth');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// 세션 설정하기
app.use(session({
  secret:'caaaat',
  resave:false,
  saveUninitialized: true,
  store: new FileStore()
}));



// 메인 페이지 라우터
app.get('/' ,(req,res,next)=>{
  // 세션에 어떤 정보가 들어있는지 가져오기
  console.log(req.session); // nickname과 is_logined 정보를 가지고 있다.
  res.sendFile( __dirname +'/public/main.html');
})

// 로그인 페이지 라우터
app.get('/login',(req,res)=>{

  res.sendFile( __dirname +'/public/login.html');
})
// 로그인 로직을 실행하는 라우터
app.post('/login',(req,res)=>{
  // 사용자가 전송한 데이터를 받기
  const userData = {
    email : req.body.email,
    password : req.body.password,
  };
  console.log(userData);
  // DB에서 확인하기
  // 임의로 설정해놓기
  const authData = {
    email:'a@a',
    password:'1234',
    nickname:'ayo',
  }
  // 인증
  if(userData.email === authData.email && userData.password === authData.password){
    // 로그인 성공
    // 세션 데이터를 만든다.
    // 로그인을 했는지, 사용자 닉네임 같은 정보만 세션에 담아둔다.
    req.session.is_logined = true;
    req.session.nickname = authData.nickname;
    // 리다이렉션하기 전에 저장하기
    req.session.save(()=>{
      // res.send('OK');
      res.redirect('/');
    });

 
  }
  else{
    res.send('NO');
  }
})


app.listen(3000,()=>{
  console.log('3000번 포트에서 대기중');
})