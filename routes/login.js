var express = require('express');
var router = express.Router();
//Firebase
var firebase = require('../firebaseclass');
var nombre = firebase.name("sin nombre");

/* GET login page */
router.get('/', function(req, res, next){
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.render('login', {
        conteo: req.session.cuenta
    });
});

router.post('/', function(req, res, next){
    var username = req.body.txtUsername;
    var password = req.body.txtPassword;
    if(username == 'rkortega1994@gmail.com' && password == '123456789'){
        req.session.user = username;
        res.redirect('/');
    } else {
        res.render('login', {
            errorMessage: "Usuario o contraseña incorrectos"
        });
    }
});

module.exports = router;