const crypto = require('crypto');

// crypto.randomBytes(문자열 길이, 콜백함수(err,buf) )
// randomBytes 메서드로 64길이바이트의 문자열을 만든다.
// 만든 문자열은 buf에 들어있음
crypto.randomBytes(64, (err, buf) => {
  // 소금 생성
  // 만들어진 64바이트 랜덤 문자열을 base64 방식으로 인코딩하기
  const salt = buf.toString('base64'); // base64 방식으로 인코딩
  console.log('salt :', salt);

  // 해시 함수 실행
  // crypto.pbkdf2(변경할 문자열, 소금, 반복횟수, 출력바이트, 해시알고리즘, 콜백함수(err,key))
  crypto.pbkdf2('변경할 문자열', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('비밀번호 :', key.toString('base64'));
  });
});
