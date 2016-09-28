var session = require('express-session');
var express = require('express');

var path = require('path');
global.path=path;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.db=require('./db');

//GLOBAL.db = require('db');
global.hooks={};
var users = require('./routes/users');
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

global.upload = multer({storage: storage})
var app = express();
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'gfisadifgsaduifgasduyfgasdufgsaudf'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
global.appRoot = path.resolve(__dirname);
app.set('view engine', 'jade');
global.fs = require('fs');
global.crypto=require('crypto');
global.jade=require('jade');
global.installedModules={};
global.App=require('./admin/app.js');
global.Hook=global.App.getHook();
global.url=require('url')
var admin = require('./admin/admin');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin/assets')));
app.use(express.static(path.join(__dirname, 'admin')));
app.use(express.static(path.join(__dirname, 'uploads')));
//app.use('/', users);
app.use('/admin', admin);
app.use('/', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.message);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
app.listen(3000, '127.0.0.1');