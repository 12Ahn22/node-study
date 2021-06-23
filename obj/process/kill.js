let i = 1;
// 1초마다 실행한다.
setInterval(() => {
  if (i === 5) {
    console.log('종료!');
    // 5가 되면 노드 프로그램 종료 exit
    process.exit();
  }
  console.log(i);
  i += 1;
}, 1000);
