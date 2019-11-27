const express = require('express')
const router = express.Router()

// Firebase
const admin = require('firebase-admin')

function addRequest(req, res, ticket) {
    var date = new Date()
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1)

    if (day.length <= 1) {
        day = '0' + day;
    }

    if (month.length <= 1) {
        month = '0' + month;
    }
    var query = admin.database().ref('tickets').child('pw').child(date.getFullYear()).child(month).child(day).child(req.session.user.username).child(ticket)
    console.log('ref:' + query)
    res.redirect(req.originalUrl)
}

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.role == 'user' && req.session.user.group == 'pw') {
            var url = req.originalUrl
            var ticket = url.substring(8, url.length)
            res.render('pw/user/ticket', {
                title: 'Bitácora',
                name: req.session.user.username,
                result: ticket
            })
        } else {
            res.redirect('/404')
        }
    } else {
        res.redirect('/login')
    }
})

router.post('/', (req, res) => {
    var url = req.originalUrl
    var ticket = url.substring(8, url.length)
    addRequest(req, res, ticket)
})

module.exports = router