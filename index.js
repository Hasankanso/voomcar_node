var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const normalizePort = require('normalize-port');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
   res.send("Hello World. Let's rock it!");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

http.createServer(app).listen(port);
