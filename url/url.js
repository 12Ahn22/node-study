const url = require('url');

const { URL } = url;
// WHATWG 방식
// 생성자 URL을 사용해 url을 만든다.
const myURL = new URL(
  'http://www.gilbut.co.kr/book/booList.asp?sercate1=00100100#anchor'
);
console.log('new URL()', myURL);
console.log('url.format()', url.format(myURL));

// 기존의 방식인데 이제 안쓴다고 나온다..deprecated
const parsedURL = url.parse(
  'http://www.gilbut.co.kr/book/booList.asp?sercate1=00100100#anchor'
);
console.log('url.parse()', parsedURL);
console.log('url.format()', url.format(parsedURL));
