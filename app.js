// const io = require('@pm2/io')
const express = require('express');
const history = require('connect-history-api-fallback');


const path = require('path');
const app = express();

app.use('/', history()); // 由js控制路由

// 指向构建后的目录
app.get('/user/logins', function(req, res, next) {
  // res.redirect('/')
  res.send('aaaaaa')
});

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000, () => {
  console.log('app listening on port 3000.');
});
