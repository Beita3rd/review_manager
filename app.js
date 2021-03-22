var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var studyRouter = require('./routes/study');
var reviewRouter = require('./routes/review');

// モデルの読み込み
// var loader = require('./models/sequelize-loader');
// var sequelize = loader.database;
// sequelize.sync().then(() => {
//   console.log('モデルの同期');
// });

var User = require('../models/user');
var StudyContent = require('../models/study-content');
var ReviewContent = require('../models/review-content');
User.sync().then(() => {
  StudyContent.sync();
  ReviewContent.sync();
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(session({ secret: '2a149d2eef498259', resave: false, saveUninitialized: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/study', studyRouter);
app.use('/review', reviewRouter);


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
