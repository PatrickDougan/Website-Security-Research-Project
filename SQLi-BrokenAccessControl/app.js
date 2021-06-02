var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var searchRouter = require('./routes/search');
var resultsRouter = require('./routes/results');
var usersRouter = require('./routes/users');
var sqliRouter = require('./routes/sqli');
var sensdataRouter = require('./routes/sensdata');
var xssRouter = require('./routes/xss');
var secmisconfigRouter = require('./routes/secmisconfig');
var bacRouter = require('./routes/bac');
var componentRouter = require('./routes/component');
var referencesRouter = require('./routes/references');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/results', resultsRouter);
app.use('/sqli', sqliRouter);
app.use('/sensdata', sensdataRouter);
app.use('/xss', xssRouter);
app.use('/secmisconfig', secmisconfigRouter);
app.use('/bac', bacRouter);
app.use('/component', componentRouter);
app.use('/references', referencesRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;