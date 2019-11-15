const express = require('express')
const router = express.Router()

// Get results page
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('baf/user/results', {
      title: 'Bitácora',
      name: req.session.user.username,
      result: req.session.user.username
    })
  } else {
    res.redirect('/login');
  }
})

module.exports = router