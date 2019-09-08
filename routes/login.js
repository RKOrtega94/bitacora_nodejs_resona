var express = require('express');
var router = express.Router();
//Firebase
var firebase = require('../firebaseclass');

/* GET login page */
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        req.session.user = firebase.config.auth().currentUser.email;
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    var username = req.body.txtUsername;
    var password = req.body.txtPassword;
        firebase.config.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            res.render('login', {
                codigo: errorCode,
                mensaje: errorMessage
            })
        })
    req.session.user = username;
    res.redirect('/');
});

module.exports = router;