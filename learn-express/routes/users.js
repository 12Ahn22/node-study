const express = require('express');
const router = express.Router();

// localhost:3000/user/ 라우터
router.get('/',(req,res)=>{
  res.send('유저 페이지 라우터 입니다!');
});

// 쿼리스트링을 사용하는 패턴
// localhost:3000/user?id=1000
router.get('/test',(req,res)=>{
  const qr = req.query.id;
  return res.send(`쿼리스트링 ${qr}`);
})


// 라우터 매개변수 패턴
// localhost:3000/user/1
router.get('/:id',(req,res)=>{
  const userId = req.params.id; // 
  res.send(userId);
});

module.exports = router;