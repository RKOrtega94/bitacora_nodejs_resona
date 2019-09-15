var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//FireBase SDK
var admin = require("firebase-admin");
var firebase = require('firebase');

//Configure firebase Admin SDK
var serviceAccount = require('./routes/asistencia-esp8266-firebase-adminsdk-k2ibs-c76553f0be.json');

//Initialize firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://asistencia-esp8266.firebaseio.com/'
});

console.log('Admin database: ' + admin.database().ref())

//Configure Firebase Aapp
var firebaseConfig = {
  apiKey: "AIzaSyB6vST0GD8Dmo4H0AkIcnqz1xk4wvL397Q",
  authDomain: "asistencia-esp8266.firebaseapp.com",
  databaseURL: "https://asistencia-esp8266.firebaseio.com",
  projectId: "asistencia-esp8266",
  storageBucket: "asistencia-esp8266.appspot.com",
  messagingSenderId: "187156215283",
  appId: "1:187156215283:web:ab05d9f668a8cb2f"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

//Session
const session = require('express-session');

//Routers
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notFoundRouter = require('./routes/404');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ESTO ES SECRETO',
  resave: true,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/admin/users', usersRouter);
app.use('/404', notFoundRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).redirect('/404');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
