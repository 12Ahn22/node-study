// 모듈 명령어를 사용하는 방법
// module.exports로 한번에 대입하는 방법 대신,
// 각각의 변수를 exports 객체에 하니씩 넣어서 모듈화 할 수 있다.
exports.odd = '홀수입니다';
exports.even = '짝수입니다';

console.log(module.exports === exports); // true
