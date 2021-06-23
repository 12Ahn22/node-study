// 멀티 스레드 방식으로 작업할 수 있게 해준다.
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // 부모일 때 = 메인스레드일 때 = 기존에 동작하던 스레드

  // new Worker를 통해 현재파일(__filename)을 워커스레드에서 실행시킨다.
  const worker = new Worker(__filename);
  // 워커에게 받은 메세지 출력
  worker.on('message', (message) => console.log('from worker', message));
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('ping');
} else {
  // 워커일 떄
  // parentPort.on()은 이벤트 리스너다.
  parentPort.on('message', (value) => {
    console.log('from parent', value); // 부모에게 받은 메세지 출력
    parentPort.postMessage('pong'); // 부모에게 메세지 보내기
    parentPort.close(); // on메서드를 사용했다면 항상 종료해주어야한다.
  });
}
