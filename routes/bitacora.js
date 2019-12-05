const express = require('express')
const router = express.Router()

// Firebase Instance
const admin = require('firebase-admin')

// Funcion para crear ticket
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
  switch (req.session.user.group) {
    case 'baf':
      var ref = admin.database()
        .ref('tickets')
        .child('baf')
        .child(date.getFullYear())
        .child(month)
        .child(day)
        .child(req.session.user.username)
        .child(req.body.txtTicket)
        .set({
          anillamador: req.body.txtAnillamador,
          dni: req.body.txtDni,
          escalado: req.body.txtEscalado ? 'Ticket escalado' : 'N/A',
          ticket: req.body.txtTicket,
          tmo: req.body.txtTmo,
          date: currentDate,
          hour: currentHour,
          coment: req.body.txtComent ? req.body.txtComent : 'N/A'
        })
      break
    case 'pw':
      var ref = admin.database()
        .ref('tickets')
        .child('pw')
        .child(date.getFullYear())
        .child(month)
        .child(day)
        .child(req.session.user.username)
        .child(req.body.txtTicket)
        .set({
          anillamador: req.body.txtBpm,
          dni: req.body.txtDni,
          pir: req.body.txtPir,
          ticket: req.body.txtTicket,
          tmo: req.body.txtTmo,
          coment: txtComentario,
          date: currentDate,
          hour: currentHour
        })
      break
    case 'chat':
      var ref = admin.database()
        .ref('tickets')
        .child('chat')
        .child(date.getFullYear())
        .child(month)
        .child(day)
        .child(req.session.user.username)
        .child(req.body.txtTicket)
        .set({
          ip: req.body.txtIp,
          dni: req.body.txtDni,
          servicio: req.body.txtServ,
          pir: req.body.txtPir,
          req: req.body.txtReq,
          ticket: req.body.txtTicket,
          vt: req.body.txtVt,
          tmo: req.body.txtTmo,
          coment: req.body.txtComentario,
          date: currentDate,
          hour: currentHour
        })
      break
    default:
      req.redirect('/bitacora')
      break
  }
}

// Get url Bitacora
router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        res.render('admin/bitacora', {
          title: 'Bitácora',
          name: req.session.user.username
        })
        break
      case 'supervisor':
        switch (req.session.user.group) {
          case 'baf':
            res.render('baf/supervisor/bitacora', {
              title: 'Bitácora',
              name: req.session.user.username
            })
            break
          case 'chat':
            res.render('chat/supervisor/bitacora', {
              title: 'Bitácora',
              name: req.session.user.username
            })
            break
          case 'pw':
            res.render('pw/supervisor/bitacora', {
              title: 'Bitácora',
              name: req.session.user.username
            })
            break
          default:
            res.redirect('/')
            break
        }
      case 'user':
        switch (req.session.user.group) {
          case 'baf':
            res.render('baf/user/bitacora', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'pw':
            res.render('pw/user/bitacora', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
          case 'chat':
            res.render('chat/user/bitacora', {
              title: 'Bitácora',
              name: req.session.user.username,
              result: req.session.user.username
            })
            break
        }
        break
      default:
        res.redirect('/')
    }
  } else {
    res.redirect('/login');
  }
})

router.post('/', (req, res) => {
  createTicket(req)
  res.redirect('/bitacora')
})

module.exports = router