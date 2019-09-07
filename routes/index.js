var express = require('express');
var router = express.Router();

var firebase = require('../firebaseclass');
var nombre = firebase.name("sin nombre");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
                        name: nombre });
});

/* GET error page. */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Express' });
});


module.exports = router;
