const express = require('express')
const router = express.Router()

var User = require('../model/user')

// Module to edit user
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        var userUrl = req.originalUrl
        console.log(userUrl)
        var user = userUrl.substring(11, userUrl.length)
        User.findOne({
          where: {
            id: user
          }
        }).then(User => {
          res.render('admin/edit-user', {
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

router.post('/', (req, res) => {
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

module.exports = router