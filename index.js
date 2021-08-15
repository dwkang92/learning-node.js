// npm init -y : -y를 함으로서 익명으로 파일을 만들 수 있음.
// express 를 생성. express 란 무엇인가?
const express = require('express')
// app이란 것도 받아온다.
const app = express()
// port번호는 3000번.
// express로 localhost:3000이라는 홈페이지를 개설하였다.
const port = 3000

// goods.js와 index.js를 이어주는 역할.
// goodRouter라는 변수를 설정하고, routes폴더의 goods.js파일을 require() 해주고,
// app은 아래 /goods라고 작성된 코드를 goodsRouter안에다가 넣어 사용한다.
const goodsRouter = require('./routes/goods');
const userRouter = require('./routes/user');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));

app.use('/goods', goodsRouter)
app.use('/user', userRouter)

// Express - Middleware
// 어떠한 route를 통해서 값이 들어올 때, 값들을 먼저 선처리 한다거나, 아니면 이 값이 유효한지 미리 체크해서 분기처리하고싶거나
// 하지만 개별 router마다 일일이 심어놓기엔 관리도 어렵고 번거로움.
// 그걸 하나의 코드로 작성하여 위 작업을 수행하게 하는 것이 Middleware 이다.
// 결론: 우리가 route로 받기 전까지, 데이터를 가공하는 용도로 사용하기도 하고, static처럼 정적인 사진과같은 자료를 다음처리로 넘기지 않고 바로 response해주는 역할.

// Express - Template Engine
app.use((req, res, next) => {
    console.log(req);
    next();
  });
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  
  app.get('/test', (req, res) => {
    let name = req.query.name;
    res.render('test', {name});
  })

  app.get('/home', (req, res) => {
      res.render('index');
  })

const mongoose = require('mongoose');
  app.get('/mongodb', async (req, res) => {
    await mongoose.connect('mongodb://localhost/voyage', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });

    const {Schema} = mongoose;
    const goodsSchema = new Schema({
        goodsId: {
            type: Number,
            required: true,
            unique: true, 
        },
        name: {
            type: String,
            required: ture,
            unique: ture,
        },
        thumbnailUrl: {
            type: String
        },
        category: {
            type: String
        },
        price: {
            type: Number
        }
    }) 

    let Goods = mongoose.model("Goods", goodsSchema)

    await Goods.create({
        goodsId: 1,
        name: "맛있는 저녁",
    })

		res.send('ok');
})

  app.get('/', (req, res, next) => {
    res.send('Welcome Home');
  });
// express - routing
// routing: 웹 페이지를 띄워주는 것. 같은 url이라도 /(path)에 따라 다른 홤녀을 보여주고 있으며, routing은 이렇게 각각의 Path에 맞게 화면을 그려주는것.
// 아래 처럼 내용을 적으면, HELlo world가 출력되어진다.
// 어떤 Path로 들어올것인지 라우터를 늘려나갈 것이며, 설정되지 않은 Path는 출력되어지지 않음.
// http method: 어떤거를 어떤행위 어떠한 요청을 하는지에 대하여 적는 것.
// i.e. get, post, delete, put.

// app.get('/goods/list', (req, res) => {
//     res.send('상품 목록 페이지')
//   })
  
//   app.get('/goods/detail', (req, res) => {
//     res.send('상품 상세 페이지')
//   })
  
//   app.get('/user/login', (req, res) => {
//     res.send('로그인 페이지')
//   })
  
//   app.get('/user/register', (req, res) => {
//     res.send('회원가입 페이지')
//   })

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

