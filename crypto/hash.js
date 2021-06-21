const crypto = require('crypto');

console.log('base64');
console.log(crypto.createHash('sha512').update('바꿀 문자열').digest('base64'));

console.log('hex');
console.log(crypto.createHash('sha512').update('바꿀 문자열').digest('hex'));

console.log('base64');
console.log(
  crypto.createHash('sha512').update('또 다른 문자열').digest('base64')
);
