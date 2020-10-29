//mysql에 접근하는 객체
//createConnection은 하나만 연결함- 먼저오는사람먼저 처리함 그다음거 연결함 // 이거는 테스트할때 많이씀
//createPool 컨넥션 객체를 가지고 있다가 db연결시 빌려줬다가 다 쓰면 다시 받아옴 보통 10개정도 가지고 있음
const mysql = require('mysql2/promise'); //모듈안에 파일있음 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  waitForConnections: true, //기다렸다 들어오겠다
  connectionLimit: 10, //pool갯수
  queueLimit: 0
});

module.exports = {mysql, pool};

//npm i dotenv 설치
//.env 파일을 만드는데 .은 숨김파일이라는 뜻이다
//.gitignode가 있어서 저절로 숨겨진다