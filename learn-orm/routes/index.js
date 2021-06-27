const express = require('express');
// 라우터 객체 생성
const router = express.Router(); 

// GET localhost:3000/ 라우터
router.get('/', (req,res)=>{
  res.send('라우터입니다.');
})



module.exports = router;