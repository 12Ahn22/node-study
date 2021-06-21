const util = require('util');
const crypto = require('crypto');

// 해당 함수가 deprecated가 되었음을 알려준다.
const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, 'deprecated 되었으니 사용하지마세요');

dontUseMe(1, 2);

// 함수를 프로미스로 변경하는 메서드
const randomBytesPromise = util.promisify(crypto.randomBytes);

randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString('base64'));
  })
  .catch((err) => {
    console.error(err);
  });
