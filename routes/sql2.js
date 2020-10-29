//meterial theme 설치하면 테마가 너무 귀여워짐!
const express = require('express');
const router = express.Router();
const {pool} = require('../modules/mysql-conn');

router.get('/create', (req, res, next) => {


  const pug = {title: "도서등록", scriptFile: ""};
  res.render('./book/create2.pug', pug); //render-> pug파일 불러옴, pug-> pug파일을 같이보내줘
});



router.post('/save', async (req, res, next) => {
  const connect = await pool.getConnection(); //getConnection은 10개중에 하나를 빌려오는 것

  const {title, content, isbn, writer, wdate, price} = req.body;
  const values = [title, content, isbn, writer, wdate, price];
  const sql = `INSERT INTO books SET title = ?, content = ?, isbn = ?, writer = ?, wdate = ?, price = ?`;

  const result = await connect.query(sql,values);

  if(result[0].serverStatus == 2){
    const sql2 = `SELECT * FROM books ORDER BY id DESC`;
    const result2 = await connect.query(sql2);
    res.redirect('/sql2/list');
  }
  else{
    res.json({err: "데이터 저장에 실패하였습니다."});
  }

  connect.release();

});



//await를 쓰려면 async를 위에 써야함
router.get('/list', async (req, res, next) => {
  const connect = await pool.getConnection(); //getConnection은 10개중에 하나를 빌려오는 것
  const result = await connect.query('SELECT * FROM books ORDER BY id DESC');
  connect.release();
  res.render('./book/list.pug', {title: "도서목록", scriptFile: "", lists: result[0]});
});

module.exports = router;