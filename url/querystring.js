const url = require('url');
const qs = require('querystring');

const parsedURL = url.parse(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
);
const query = qs.parse(parsedURL.query); // url의 qurey부분(search)을 자바스크립트 객체로 분해
console.log('qs.parse()', query);
// 분해된 query 객체를 문자열로 다시 조립
console.log('qs.stringfy()', qs.stringify(query));
