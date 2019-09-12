var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('firebase');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    res.redirect('/login');
  }
  res.render('index', { 
    title: 'Home',
    name: req.session.user });
});

/* GET error page. */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Express' });
});


module.exports = router;
