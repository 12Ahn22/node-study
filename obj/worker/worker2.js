const { worker } = require('cluster');
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

// 부모일 때 = 현재 실행중인 스레드일 때
if (isMainThread) {
  const threads = new Set(); // set은 중복불가 배열 자료구조 였나?

  // 워커를 생성할 때, workerData로 데이터도 함께 보낼 수 있다.
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );
  for (let worker of threads) {
    // 워커에게 돌려받은 값을 출력
    worker.on('message', (message) => console.log('from worker', message));
    // 워커의 작업이 끝나면 exit -> 워커를 삭제하고
    // 삭제를 전부 해서, threads의 size가 0이되면
    // 작업의 종료를 알린다.
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log('job done');
      }
    });
  }
} else {
  // worker들은 부모로부터 workerData를 받는다.
  const data = workerData;
  // 받은 data에 + 100을 해서 돌려준다.
  parentPort.postMessage(data.start + 100);
}
