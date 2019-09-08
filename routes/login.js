var express = require('express');
var router = express.Router();
//Firebase
var firebase = require('../firebaseclass');
var nombre = firebase.name("sin nombre");

/* GET login page */
router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/', function(req, res, next){
    var username = req.body.txtUsername;
    var password = req.body.txtPassword;
    if(username == 'rkortega1994@gmail.com' && password == '123456789'){
        res.redirect('/');
    } else {
        console.log('error');
    }
});

module.exports = router;