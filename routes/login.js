var express = require('express');
var router = express.Router();
//Firebase
var firebase = require('../firebaseclass');

/* GET login page */
router.get('/', function (req, res, next) {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.render('login', {
        conteo: req.session.cuenta
    });
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
    if(firebase.config.auth().currentUser){
        req.session.user = req.session.user ? req.session.user = firebase.config.auth().currentUser.email : firebase.config.auth().currentUser.email;
    }
    res.redirect('/');
});

module.exports = router;