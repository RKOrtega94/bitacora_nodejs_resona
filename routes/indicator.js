const express = require('express')
const router = express.Router()

// Models
var User = require('../model/user')

// Get results page
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        User.findAll({
          raw: true
        }).then(users => {
          var result = users
          res.render('admin/indicators', {
            title: 'Indicator',
            name: req.session.user.username,
            result: req.session.user.username,
            users = JSON.stringify(result)
          })
        })
        break
      case 'supervisor':
        User.findAll({
          raw: true
        }).then(users => {
          var result = users
          res.render('supervisor/indicators', {
            title: 'Indicator',
            name: req.session.user.username,
            result: req.session.user.username,
            users = JSON.stringify(result)
          })
        })
        break
      default:
        res.redirect('/')
        break
    }
  } else {
    res.redirect('/login');
  }
})

module.exports = router