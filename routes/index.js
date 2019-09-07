var express = require('express');
var router = express.Router();

//Firebase SDK
var firebase = require("firebase");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET error page. */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Express' });
});


module.exports = router;
