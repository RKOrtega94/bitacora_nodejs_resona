const express = require('express')
const router = express.Router();

// route for bitacora mensual page
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'user':
        switch (req.session.user.group) {
          case 'baf':
            res.render('baf/user/bitacora-general', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'chat':
            res.render('chat/user/bitacora-general', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'pw':
            res.render('pw/user/bitacora-general', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          default:
            res.redirect('/')
            break
        }
        break
      default:
        res.redirect('/')
        break
    }
  } else {
    res.redirect('/login')
  }
})

module.exports = router