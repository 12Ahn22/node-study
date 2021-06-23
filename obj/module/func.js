// var.js 모듈 불러오기
// es5
const { odd, even } = require('./var');

// es6
// import { odd, even } from './var';

function checkOddOrEven(num) {
  if (num % 2) {
    // 나누어 떨어지지 않아서 1이 남으면 홀수
    return odd;
  }
  return even; // 나누어 떨어져서 0이되면 짝수
}

module.exports = checkOddOrEven;
// export default checkOddOrEven;
