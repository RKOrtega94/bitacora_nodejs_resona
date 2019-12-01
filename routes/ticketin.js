const express = require('express')
const router = express.Router()

// Firebase
const admin = require('firebase-admin')

function addRequest(req, res, ticket) {
    ticket == 'new' ? ticket = req.body.txtTicket : ticket = ticket

    var date = new Date()
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1)

    if (day.length <= 1) {
        day = '0' + day;
    }

    if (month.length <= 1) {
        month = '0' + month;
    }

    var hour = '' + date.getHours()
    var minutes = '' + date.getMinutes()
    if (hour.length <= 1) {
        hour = '0' + hour
    }
    if (minutes.length <= 1) {
        minutes = '0' + minutes
    }

    var currentHour = hour + ':' + minutes
    var currentDate = date.getFullYear() + '-' + month + '-' + day

    if (req.body.txtTicket) {
        var ref = admin.database()
            .ref('tickets')
            .child('pw')
            .child(date.getFullYear())
            .child(month)
            .child(day)
            .child(req.session.user.username)
            .child(req.body.txtTicket)
            .set({
                ticket: req.body.txtTicket,
                dni: req.body.txtDni,
                date: currentDate,
                hour: currentHour,
                status: 'P'
            })
    }

    var update = admin.database()
        .ref('tickets')
        .child('pw')
        .child(date.getFullYear())
        .child(month)
        .child(day)
        .child(req.session.user.username)
        .child(ticket)
        .update({
            serv: req.body.txtServ,
            type: req.body.txtType,
            contact: req.body.txtContact
        })
    var interaction = admin.database()
        .ref('tickets')
        .child('pw')
        .child(date.getFullYear())
        .child(month)
        .child(day)
        .child(req.session.user.username)
        .child(ticket)
        .push({
            interaction: req.body.txtInteraction,
            process: req.body.txtProcess,
            date: currentDate,
            hour: currentHour,
            coment: req.body.txtComent,
            solution: req.body.txtSolution ? req.body.txtSolution : 'S',
            numRequest: req.body.txtNumReq ? req.body.txtNumReq : 'N/A'
        })
    if (req.body.txtProcess == 'C') {
        update = admin.database()
            .ref('tickets')
            .child('pw')
            .child(date.getFullYear())
            .child(month)
            .child(day)
            .child(req.session.user.username)
            .child(ticket)
            .update({
                status: 'A',
                endAt: currentHour,
                endDate: currentDate
            })
    } else {
        update = admin.database()
            .ref('tickets')
            .child('pw')
            .child(date.getFullYear())
            .child(month)
            .child(day)
            .child(req.session.user.username)
            .child(ticket)
            .update({
                status: 'X',
                endAt: currentHour,
                endDate: currentDate
            })
        if (req.body.txtDate) {
            if (req.body.txtDate != currentDate) {
                var fecha = req.body.txtDate
                var anio = fecha.substring(0, 4)
                var mes = fecha.substring(5, 7)
                var dia = fecha.substring(8, 10)
                var query = admin.database()
                    .ref('tickets')
                    .child('pw')
                    .child(date.getFullYear())
                    .child(month)
                    .child(day)
                    .child(req.session.user.username)
                    .child(ticket)
                query.once('value', snapshot => {
                    var paused = admin.database()
                        .ref('tickets')
                        .child('pw')
                        .child(anio)
                        .child(mes)
                        .child(dia)
                        .child(req.session.user.username)
                        .child(ticket)
                        .set(snapshot.val())
                    paused = admin.database()
                        .ref('tickets')
                        .child('pw')
                        .child(anio)
                        .child(mes)
                        .child(dia)
                        .child(req.session.user.username)
                        .child(ticket)
                        .update({
                            status: 'X'
                        })
                })
                update = admin.database()
                    .ref('tickets')
                    .child('pw')
                    .child(date.getFullYear())
                    .child(month)
                    .child(day)
                    .child(req.session.user.username)
                    .child(ticket)
                    .update({
                        status: 'A'
                    })
            }
        }
    }
    res.redirect('/bitacora')
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