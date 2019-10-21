const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const errorHandler = require('errorhandler')
var createError = require('http-errors')
var User = require('./model/user')
var IndicatorForUser = require('./model/indicatorsforuser')
var Indicator = require('./model/indicador')
var morgan = require('morgan')
const crypto = require('crypto')
const Sequelize = require('sequelize');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://lvozwwbiihhhqp:eba0866a9c3682a970309066ec1fb9ef10b0138492efc73a4e56841d279e3239@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d26go21gq41h86?ssl=true')

//Relations
User.hasMany(IndicatorForUser)
IndicatorForUser.belongsTo(User)
Indicator.hasMany(IndicatorForUser)
IndicatorForUser.belongsTo(Indicator)

//FireBase SDK
var admin = require("firebase-admin")

//Configure firebase Admin SDK
var serviceAccount = require('./resonatel-firebase-adminsdk-u3w30-250d2c4241.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://resonatel.firebaseio.com"
});

// invoke an instance of express application.
var app = express();

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// //Configure our app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: false
  }
}))

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})

// Import modules
var index = require('./routes/index')
var user = require('./routes/users')
var edituser = require('./routes/edit-user')
var logout = require('./routes/logout')
var bitacora = require('./routes/bitacora')
var info = require('./routes/info')
var results = require('./routes/result')
var notFound = require('./routes/404')

// Route modules
app.use('/', index)
app.use('/users', user)
app.use('/user/edit/*', edituser)
app.use('/logout', logout)
app.use('/bitacora', bitacora)
app.use('/info', info)
app.use('/results', results)
app.use('/404', notFound)

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/');
  } else {
    next();
  }
}

// route for user Login
app.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login', {
      title: 'Login'
    });
  })
  .post((req, res) => {
    var username = req.body.txtUsername,
      password = req.body.txtPassword;

    User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        res.render('login', {
          title: 'Login',
          message: 'Username or password wrong!'
        });
      } else if (!user.validPassword(password)) {
        res.render('login', {
          title: 'Login',
          message: 'Username or password wrong!'
        });
      } else {
        user.validPassword(password)
        req.session.user = user.dataValues;
        res.redirect('/');
      }
    })
  })

app.get('/bitacora/general', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'user':
        res.render('user-bitacora-general', {
          title: 'Bitácora',
          name: req.session.user.username,
          result: req.session.user.username
        });
        break
      case 'admin':
        res.render('admin-bitacora', {
          title: 'Bitácora',
          name: req.session.user.username
        });
        break
    }
  } else {
    res.redirect('/login');
  }
})

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).redirect('/404')
})
module.exports = app;