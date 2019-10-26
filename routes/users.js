const express = require('express')
const router = express.Router();
// Model User
var User = require('../model/user')

router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        User.findAll({
          raw: true
        }).then(users => {
          var result = users
          res.render('admin/users', {
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


router.post('/', (req, res) => {
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
      res.render('admin/users', {
        title: 'Home',
        name: req.session.user.username,
        result: JSON.stringify(result),
        msg: err
      })
    })
  })
})

module.exports = router;