const A = require('./globalA');

global.message = '안녕하세요'; // global 객체의 message프로퍼티에 '안녕하세요'추가

console.log(A()); // 안녕하세요
