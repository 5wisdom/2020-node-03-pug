const express = require('express');
const router = express.Router();

// mysql -> npm i mysql 설치
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost', 
	user: 'owisdom', //내 데이터베이스 user 써주기
	port: 3306, //기본 포트
	password: '',
	database: 'owisdom'
});

router.get('/create', (req, res, next) => {
  const pug = {title: "도서등록", scriptFile: ""};
  res.render('./book/create.pug', pug); //render-> pug파일 불러옴, pug-> pug파일을 같이보내줘
});

router.post('/save', (req, res, next) => {
  const {title, content, isbn, writer, wdate, price} = req.body;
  const sql = `
  INSERT INTO books SET
  title = '${title}',
  content = '${content}',
  isbn = '${isbn}',
  writer = '${writer}',
  wdate = '${wdate}',
  price = '${price}'
  `;
  console.log(sql);
  //console.log(connection); //connection이 뜨면 접근이 됐다는 뜻
  connection.connect();

  connection.query(sql, (err, result, field) => {
    res.json(result);
   });
  
  connection.end();

  //console.log(req.body);
  
})

module.exports = router;