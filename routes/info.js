const express = require('express')
const router = express.Router()

//FireBase SDK
//FireBase SDK
var admin = require("firebase-admin")


router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        res.render('admin/notify', {
          title: 'Notificaciones',
          name: req.session.user.username
        })
        break
      case 'supervisor':
        res.render('baf/supervisor/notify', {
          title: 'Notificaciones',
          name: req.session.user.username
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
  switch (req.session.user.group) {
    case 'baf':
      let db = admin.firestore()
      let doc = db.collection('baf').doc('notify').collection('notify').doc()
      let setDoc = doc.set({
        'title': req.body.txtTitle,
        'message': req.body.txtMessage,
        'type': req.body.txtType,
        'status': 'A'
      })
      if (setDoc) {
        res.redirect('/info')
      } else {
        res.render('supervisor-notify', {
          title: 'Notificaciones',
          name: req.session.user.username,
          msg: 'Ha ocurrido un error'
        })
      }
      break
  }
})

module.exports = router