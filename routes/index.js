const express = require('express')
const router = express.Router();
// Model User
var User = require('../model/user')

// route for home page
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'user':
        res.render('user/index', {
          title: 'Home',
          name: req.session.user.username,
          result: req.session.user.username
        });
        break
      case 'supervisor':
        res.render('supervisor/index', {
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