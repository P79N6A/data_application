var express = require('express');
var ConnectCas = require('connect-cas2');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('session-memory-store')(session);
var createError = require('http-errors');
var request = require('request');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'dist')));
var ejs = require('ejs');
ejs.delimiter = '$';
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname));
app.set('view engine', 'html');

app.use(cookieParser())
//cas url 和认证service
app.use(session({
  name: 'NSESSIONID',
  secret: 'Hello I am a long long long secret',
  store: new MemoryStore()
}));

var config = require(path.join(__dirname, './config.json'));
var casClient = new ConnectCas({
  debug: true,
  //忽略权限认证地址
  ignore: [
    "/dev"
  ],
  match: ["/cas-"],
  //NODE服务地址
  servicePrefix: config.production.appUrl,
  //CAS服务端地址
  serverPath: config.production.ssoUrl,
  paths: {
    validate: '/cas/validate',
    serviceValidate: '/sso/serviceValidate',
    proxy: '',
    login: '/sso/login',
    logout: '/sso/logout',
    proxyCallback: ''
  },
  redirect: false,
  gateway: false,
  renew: false,
  slo: true,
  cache: {
    enable: false,
    ttl: 5 * 60 * 1000,
    filter: []
  },
  fromAjax: {
    header: 'x-client-ajax',
    status: 418
  }
});

app.use(casClient.core());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//应用登录退出调用接口
app.get('/logout', casClient.logout());

app.use('*', function (req, res, next) {
  let config = require(path.join(__dirname, './config.json'));
  const usercode = req.session.usercode, username = req.session.username
  console.log('user`````````````````````````````', usercode, username)

  if (!usercode || !username) {
    res.cookie('usercode', usercode);
    const url = `${config.production.apiOrigin}/users/${usercode}`
    console.log('request---------------------------', url)

    request(url, function (error, response, body) {
      console.log("+++++++++", response.statusCode)
      if (!error && response.statusCode == 200) {
        var data = body
        res.cookie('username', escape(JSON.parse(data).user_name));
        console.log('escape(JSON.parse(data).user_name)', escape(JSON.parse(data).user_name))
        res.render('index', {
          config: config
        });
      } else {
        res.send("登录失败")
      }
    })
  } else {
    res.render('index', {
      config: config
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('err---------------------------------', err)
  // render the error page
  res.status(err.status || 500);
  res.send('<p>something blew up</p>');
});

module.exports = app;
