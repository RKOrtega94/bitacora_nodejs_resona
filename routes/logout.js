var express = require('express')
var router = express.Router();

//Firebase
var firebase = require('firebase')

router.get('/', function(req, res, next){
    firebase.auth().signOut().then(function() {
        req.session.user = null;
        res.redirect('/');
      }).catch(function(error) {
        console.error(error);
      });
})

module.exports = router;