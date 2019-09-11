var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('firebase');

//Get user page
router.get('/', function(req, res, next) {
    if(!req.session.user){
        res.redirect('/login');
      }
    res.render('users',{
        title: 'Manage users',
        name: req.session.user  
    })
})

module.exports = router;