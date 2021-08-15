// index.js와 비교해봅시다.
// express를 불러와주고. 단, var로!
var express = require('express');
// router를 불러와줍니다. index.js에서는 app이었지요.
var router = express.Router();


// goods/list, goods/detail처럼, goods관련하여 여러 path를 만들면 길어지고 보기 안좋음.
// 그래서 router 객체를 사용하여 같은 카테고리를 묶어주면, 작업하는데 편함.
// router객체를 만들면, goods/list와 goods/detail처럼, 앞에 공통된 goods가 붙는것을 삭제하고, 아래처럼 나타낼 수 있음.
router.get('/list', function(req, res, next) {
  res.send('Router 상품 목록 페이지')
});

router.get('/detail', function(req, res, next) {
  res.send('Router 상품 상세 페이지')
});
  
module.exports = router;