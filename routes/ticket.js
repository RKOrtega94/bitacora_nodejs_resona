const express = require('express')
const router = express.Router()

// User
var User = require('../model/user')

// Firebase
const admin = require('firebase-admin')


function addTicket(req, res) {
    var date = new Date;
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1)

    if (day.length <= 1) {
        day = '0' + day;
    }

    if (month.length <= 1) {
        month = '0' + month;
    }

    var currentDate = date.getFullYear() + '-' + month + '-' + day
    var hour = '' + date.getHours()
    var minutes = '' + date.getMinutes()
    if (hour.length <= 1) {
        hour = '0' + hour
    }
    if (minutes.length <= 1) {
        minutes = '0' + minutes
    }
    var currentHour = hour + ':' + minutes
    var ref = admin.database()
        .ref('tickets')
        .child('pw')
        .child(date.getFullYear())
        .child(month)
        .child(day)
        .child(req.body.txtAsesor)
        .child(req.body.txtTicket)
        .set({
            ticket: req.body.txtTicket,
            dni: req.body.txtDni,
            date: currentDate,
            hour: currentHour,
            status: 'P'
        })
    console.log('ref:' + ref)
    res.redirect('/ticket')
}

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.role == 'supervisor' && req.session.user.group == 'pw') {
            User.findAll({
                raw: true,
                where: {
                    group: 'pw',
                    role: 'user'
                }
            }).then(user => {
                res.render('pw/supervisor/ticket', {
                    title: 'Bitácora',
                    name: req.session.user.username,
                    result: JSON.stringify(user)
                })
            })
        } else {
            res.redirect('/404')
        }
    } else {
        res.redirect('/login')
    }
})

router.post('/', (req, res) => {
    addTicket(req, res)
})

module.exports = router