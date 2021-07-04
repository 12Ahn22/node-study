// 쿠키를 테스트하는 http 서버
const http = require('http');
const cookie = require('cookie'); // 쿠키 모듈

http.createServer((req,res)=>{
  let cookies = {};
  if(req.headers.cookie !== undefined){
    cookies = cookie.parse(req.headers.cookie); // 쿠키를 객체로 만들어준다.
  }
  console.log(cookies);
  console.log(cookies.yummy_cookie);
  // 응답하는 메세지에 쿠키를 담아서 넣어야한다.
  res.writeHead(200, {
    'Set-Cookie':[
      'yummy_cookie=choco',
      'tasty_cookie=strawberry',
      `Permanent; Max-Age=${60*60*24*30}`, // Max-Age: 현재 시간 기준으로 얼마나 쿠키를 유지할 지 결정
      'Secure=Secure; Secure;',
      'HttpOnly=HttpOnly; HttpOnly',
      'Path=Path; Path=/cookie', // 원하는 경로에서만 쿠키 사용하기
      'Domain=Domain; Domain=o2.org', // 서브도메인.o2.org에서 살아남는 쿠키
    ], 

  })
  res.end('Cookies!!!')
}).listen(5001);
