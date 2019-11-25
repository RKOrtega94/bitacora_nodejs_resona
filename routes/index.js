const express = require('express')
const router = express.Router();
// Model User
var User = require('../model/user')

// route for home page
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'user':
        switch (req.session.user.group) {
          case 'baf':
            res.render('baf/user/index', {
              title: 'Home',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'pw':
            res.render('pw/user/index', {
              title: 'Home',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'chat':
            res.render('chat/user/index', {
              title: 'Home',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
        }
        break
      case 'supervisor':
        switch (req.session.user.group) {
          case 'baf':
            res.render('baf/supervisor/index', {
              title: 'Home',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'chat':
            res.render('chat/supervisor/index', {
              title: 'Home',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'pw':
            User.findAll({
              raw: true,
              where: {
                group: 'pw'
              }
            }).then(result => {
              res.render('pw/supervisor/index', {
                title: 'Home',
                name: req.session.user.username,
                result: JSON.stringify(result)
              })
            })
            break
        }
        res.render('baf/supervisor/index', {
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
          res.render('admin/index', {
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

module.exports = router;