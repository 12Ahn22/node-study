const { URL } = require('url'); // WHATWG 방식으로 url을 생성하는 생성자

// URL 생성자로 url 생성
const myURL = new URL(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
);

console.log('searchParams:', myURL.searchParams); // 전체 모든 parameter
// key에 해당하는 모든 값을 가져온다
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
// 키에 해당하는 첫번째 값만 가져온다
console.log('searchParams.get():', myURL.searchParams.get('limit'));
// 해당 키가 존재하는지 여부를 boolean 타입으로 반환
console.log('searchParams.has():', myURL.searchParams.has('page'));

// 키들을 반환한다. iterator 객체로 가져온다.
console.log('searchParams.keys():', myURL.searchParams.keys());
// 값들을 iterator 객체로 가져온다
console.log('searchParams.values():', myURL.searchParams.values());

// append는 (키,값)을 추가한다.
myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log('searchParams.getAll():', myURL.searchParams.getAll('filter'));
myURL.searchParams.append('filter', 'es6');
console.log('searchParams.getAll():', myURL.searchParams.getAll('filter'));
// delete는 해당 키를 삭제한다.
myURL.searchParams.delete('filter');
console.log('searchParams.getAll():', myURL.searchParams.getAll('filter'));

// 조작한 searchParams 객체를 다시 문자열로 만든다.
console.log('searchParams.toString()', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
