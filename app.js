// const io = require('@pm2/io')
const express = require('express');
const history = require('connect-history-api-fallback');



const path = require('path');

const app = express();
const app2=express();

debugger;

app.use('/', history()); // 由js控制路由
app2.use('/', history()); // 由js控制路由

// 指向构建后的目

app.use(express.static(path.join(__dirname, 'dist')));
app2.use(express.static(path.join(__dirname, 'dist')));


app.listen(3000, () => {
  console.log('app listening on port 3000.');
});

app2.listen(3001,()=>{
  debugger;
  console.log('app2 port 3001')
});
