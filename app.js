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

// create a sequelize instance with our local postgres database information.
const dbSequelize = Sequelize;
const dbsequelize = sequelize;

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

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/');
  } else {
    next();
  }
}

function createTicket(req) {
  var date = new Date;
  var day = '' + date.getDate();
  var month = '' + (date.getMonth() + 1)

  if (day.length <= 1) {
    day = '0' + day;
  }

  if (month.length <= 1) {
    month = '0' + month;
  }

  var currentDate = day + '/' + month + '/' + date.getFullYear()
  var hour = '' + date.getHours()
  var minutes = '' + date.getMinutes()
  if (hour.length <= 1) {
    hour = '0' + hour
  }
  if (minutes.length <= 1) {
    minutes = '0' + minutes
  }
  var currentHour = hour + ':' + minutes
  var ref = admin.database()
    .ref('tickets')
    .child(req.session.user.username)
    .child(req.body.txtTicket)
    .set({
      anillamador: req.body.txtAnillamador,
      dni: req.body.txtDni,
      pir: req.body.txtPir,
      ticket: req.body.txtTicket,
      tmo: req.body.txtTmo,
      date: currentDate,
      hour: currentHour
    })
}

// route for user signup
app.route('/signup')
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
  })
  .post((req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        req.session.user = user.dataValues;
        res.redirect('/dashboard');
      })
      .catch(error => {
        res.redirect('/signup');
      });
  });


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

app.route('/users')
  .get((req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      switch (req.session.user.role) {
        case 'admin':
          User.findAll({
            raw: true
          }).then(users => {
            var result = users
            res.render('admin-users', {
              title: 'Home',
              name: req.session.user.username,
              result: JSON.stringify(result),
            })
          })
          break
        default:
          res.redirect('/')
          break
      }
    } else {
      res.redirect('/login')
    }
  })
  .post((req, res) => {
    User.create({
      username: req.body.txtUsername,
      email: req.body.txtEmail,
      password: req.body.txtDni,
      role: req.body.txtRole
    }).then(User => {
      res.redirect('/users')
    }).catch(err => {
      User.findAll({
        raw: true
      }).then(users => {
        var result = users
        res.render('admin-users', {
          title: 'Home',
          name: req.session.user.username,
          result: JSON.stringify(result),
          msg: err
        })
      })
    })
  })

// route for user's dashboard
app.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'user':
        res.render('user-index', {
          title: 'Home',
          name: req.session.user.username,
          result: req.session.user.username
        });
        break
      case 'supervisor':
        res.render('supervisor-index', {
          title: 'Home',
          name: req.session.user.username,
          result: req.session.user.username
        });
        break
      case 'admin':
        User.findAll({
          raw: true
        }).then(users => {
          var result = users
          res.render('admin-index', {
            title: 'Home',
            name: req.session.user.username,
            result: JSON.stringify(result),
          })
        })
        break
      case 'disabled':
        res.redirect('/login');
        break
      default:
        res.redirect('/login');
        break
    }

  } else {
    res.redirect('/login');
  }
})

// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
})


app.route('/bitacora')
  .get((req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      switch (req.session.user.role) {
        case 'user':
          res.render('user-bitacora', {
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
        default:
          res.redirect('/')
      }
    } else {
      res.redirect('/login');
    }
  })
  .post((req, res) => {
    createTicket(req)
    res.redirect('/bitacora')
  })

app.route('/user/edit/*')
  .get((req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      switch (req.session.user.role) {
        case 'admin':
          var userUrl = req.url
          var user = userUrl.substring(11, userUrl.length)
          User.findOne({
            where: {
              username: user
            }
          }).then(User => {
            res.render('admin-edit-user', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: JSON.stringify(User)
            });
          })
          break
        default:
          res.redirect('/')
      }
    } else {
      res.redirect('/login')
    }
  })
  .post((req, res) => {
    var user = req.body.txtUsername
    console.log(user)
    User.findOne({
      where: {
        username: user
      }
    }).then(User => {
      User.update({
        username: req.body.txtUser,
        email: req.body.txtEmail,
        password: req.body.txtPassword,
        role: req.body.txtRole
      }, {
        where: {
          id: User.id
        }
      }).then(() => {
        res.redirect('/users')
      }).catch(error => {
        var userUrl = req.url
        var user = userUrl.substring(11, userUrl.length)
        User.findOne({
          where: {
            username: user
          }
        }).then(User => {
          res.render('admin-edit-user', {
            title: 'Usuarios',
            name: req.session.user.username,
            msg: error
          });
        })
      })
    })
  })

app.route('/info')
  .get((req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      switch (req.session.user.role) {
        case 'admin':
          res.render('supervisor-notify', {
            title: 'Notificaciones',
            name: req.session.user.username
          })
          break
        case 'supervisor':
          res.render('supervisor-notify', {
            title: 'Notificaciones',
            name: req.session.user.username
          })
          break
      }
    } else {
      res.redirect('/login')
    }
  })
  .post((req, res) => {
    let db = admin.firestore()
    let doc = db.collection('notify').doc()
    let setDoc = doc.set({
      'title': req.body.txtTitle,
      'message': req.body.txtMessage,
      'type': req.body.txtType,
      'status': 'A'
    })
    if (setDoc){
      res.redirect('/info')
    } else {
      res.redirect('/')
    }
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

app.get('/results', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('user-results', {
      title: 'Bitácora',
      name: req.session.user.username,
      result: req.session.user.username
    })
  } else {
    res.redirect('/login');
  }
})

app.get('/404', (req, res) => {
  res.render('404', {
    title: 'Page not found'
  })
})


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).redirect('/404')
})
module.exports = app;