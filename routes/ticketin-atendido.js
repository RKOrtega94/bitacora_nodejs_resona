const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.role == 'user' && req.session.user.group == 'pw') {
            var url = req.originalUrl
            res.render('pw/user/bitacora-general', {
                title: 'Bitácora',
                name: req.session.user.username,
            })
        } else {
            res.redirect('/404')
        }
    } else {
        res.redirect('/login')
    }
})

module.exports = router