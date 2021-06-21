const crypto = require('crypto');

// key와 iv 길이 짧으면 실행 안됨.
const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklnmopqrstuvwxzy123456';
const iv = '1234567890123456'; // 초기화 벡터

// createCipheriv(알고리즘,키,iv)
const cipher = crypto.createCipheriv(algorithm, key, iv);
// update(문자열,인코딩, 출력 인코딩)
// 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣는다.
let result = cipher.update('치즈태비고양이', 'utf-8', 'base64');
// final(출력 인코딩)
result += cipher.final('base64');
console.log('암호화 :', result);

// 복호화 하기
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf-8');
result2 += decipher.final('utf-8');
console.log('복호화 :', result2);
