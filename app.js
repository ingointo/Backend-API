var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser')
var logger = require('morgan');
const db = require('./config/db')
const session = require('express-session')

//db connection error or not
db.on('error', function(err){
  console.log(err);
});

db.once('open', function(){
  console.log("Connected to mongodb");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'Medi-kit', cookie: { maxAge: 6000000 }}))



app.use('/users', usersRouter);
app.use((req, res, next)=>{
  if (!req.session.username) {
      res.json('Yuu Must Logged In again')
  } else {
      next();
  }
})
app.use('/', indexRouter); 

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
  res.json(res.locals.error);
});

module.exports = app;
