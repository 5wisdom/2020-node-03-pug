const express = require('express');
const router = express.Router();

// mysql -> npm i mysql 설치
const mysql = require('mysql');
const connection = mysql.createConnection({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

router.get('/create', (req, res, next) => {
  const pug = {title: "도서등록", scriptFile: ""};
  res.render('./book/create.pug', pug); //render-> pug파일 불러옴, pug-> pug파일을 같이보내줘
});

// router.post('/save', (req, res, next) => {
//   const {title, content, isbn, writer, wdate, price} = req.body;
//   const sql = `
//   INSERT INTO books SET
//   title = '${title}',
//   content = '${content}',
//   isbn = '${isbn}',
//   writer = '${writer}',
//   wdate = '${wdate}',
//   price = '${price}'
//   `;
//     //console.log(sql);
//   //console.log(connection); //connection이 뜨면 접근이 됐다는 뜻
//   connection.connect();

//   connection.query(sql, (err, result, field) => {
//     res.json(result);
//    });
  
//   connection.end();


//위의 공식 더 고급지게 변경하기
router.post('/save', (req, res, next) => {
  const {title, content, isbn, writer, wdate, price} = req.body;
  const sql = `INSERT INTO books SET title = ?, content = ?, isbn = ?, writer = ?, wdate = ?, price = ?`;
  const values = [title, content, isbn, writer, wdate, price];
  //console.log(sql);
  //console.log(connection); //connection이 뜨면 접근이 됐다는 뜻
  connection.connect();
  connection.query(sql, values, (err, result) => {
    if(result.serverStatus === 2) {
      const sql2 = `SELECT * FROM books ORDER BY id DESC`;
      connection.query(sql2, (err, result) => {
        res.json(result);
        connection.end();
      });
    }
    else connection.end();
  });
});

module.exports = router;