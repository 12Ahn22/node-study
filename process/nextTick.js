// 이벤트 루프가 다른 콜백 함수보다 nextTick의 콜백 함수를 우선시 하도록 한다.

setImmediate(() => {
  console.log('imme');
});
process.nextTick(() => {
  console.log('nextTick');
});
setTimeout(() => {
  console.log('timeout');
}, 0);

Promise.resolve().then(() => console.log('promise'));

// nextTick
// promise
// timeout
// imme
