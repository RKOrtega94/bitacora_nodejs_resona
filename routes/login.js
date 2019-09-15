var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET login page */
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        req.session.user = firebase.auth().currentUser.email;
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    var username = req.body.txtUsername;
    var password = req.body.txtPassword;
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.render('login', {
            codigo: errorCode,
            mensaje: errorMessage
        })
    })
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebase.auth().currentUser) {
            req.session.user = firebaseUser.email;
            res.redirect('/');
        }
    })
});

module.exports = router;