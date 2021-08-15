// index.js와 비교해봅시다.
// express를 불러와주고. 단, var로!
var express = require('express');
// router를 불러와줍니다. index.js에서는 app이었지요.
var router = express.Router();


router.get('/login', (req, res) => {
    res.send('로그인 페이지')
  })
  
router.get('/register', (req, res) => {
    res.send('회원가입 페이지')
  })

module.exports = router;