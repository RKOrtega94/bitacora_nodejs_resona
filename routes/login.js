var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET login page */
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.render('login', {
            title: 'Login'
        });
        
    } else {
        req.session.user = firebase.auth().currentUser.email;
        res.redirect('/');
        next();
    }
});

router.post('/login', function (req, res, next) {
    var username = req.body.txtUsername;
    var password = req.body.txtPassword;
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.render('login', {
            title: 'Login Error',
            codigo: errorCode,
            mensaje: errorMessage
        })
    })
    req.session.user = username;
    res.redirect('/');
    next();
});

module.exports = router;