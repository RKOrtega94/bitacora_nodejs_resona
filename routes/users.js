var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('firebase');

router.get('/', function(req, res, next) {
    res.render('users',{
        title: 'Manage users'
    })
})

module.exports = router;