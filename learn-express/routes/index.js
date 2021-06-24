const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/',(req,res)=>{
  res.send('안녕~ 익스프레스');
});

// get과 put 같이 관련있는 코드를 붙여서 쓸 수 있다.
router.route('/hi')
  .get((req,res)=>{
    res.send('GET');
  })
  .post((req,res)=>{
    res.send('POST');
  })

module.exports = router;