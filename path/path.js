const path = require('path');

const string = __filename;

console.log('path.sep', path.sep); // 경로의 구분자
console.log('path.delimiter', path.delimiter); // 환경변수의 구분자
console.log('================================================');
console.log('path.dirname()', path.dirname(string)); // 파일이 위치한 폴더 경로
console.log('path.extname()', path.extname(string)); // 파일의 확장자명
console.log('path.basename()', path.basename(string)); // 파일의 이름.확장자명
console.log('================================================');
console.log('path.parse()', path.parse(string)); // 파일 경로를 root, dir, ext, name으로 분리
console.log(
  // path.parse를 한 경로를 합쳐준다.
  'path.format():',
  path.format({
    dir: 'C:\\users\\ayo', // \\를 두번 쓰는 이유는 특수문자라 두번 써야 하나로 나온다.
    name: 'path',
    etx: '.js',
  })
);
console.log('path.normalize()', path.normalize('C://ayo\\\\name\\path.js')); // // \\ 등 잘못된걸 정상적으로 변환해준다.
console.log('path.isAbsolute()', path.isAbsolute('./home')); // 절대 경로인지 상대 경로인지 bool
// 경로 찾아가는 방법을 알려준다.
console.log('path.relative()', path.relative('C:\\users', 'C:\\'));
// 여러 인수를 넣으면 하나의 경로로 합친다.
console.log('path.join', path.join(__dirname, '..', '/users'));
// join과 비슷하다. 단, /를 만나면 절대경로로 인식해 앞에 선 경로를 무시
console.log('path.resolve()', path.resolve(__dirname, '..', 'users'));
