var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('firebase');

const dbRef = firebase.database().ref('users');

//Add Ticket
function addNewTicket(anillamador, dni, pir, ticket, time, comment, userKey) {
  console.log("tiket: " + ticket)
  //Get ticket key
  console.log('Userkey: ' + userKey);
  dbRef.orderByChild('email').equalTo(userKey).once('value', snapshot => {
    snapshot.forEach((function (child) {
      console.log("UserID: " + child.key);
      var newTicketKey = firebase.database().ref().child('users').child(child.key).push().key;
      console.log('url: ' + newTicketKey);
      var postData = {
        tiket: ticket,
        anillamador: anillamador,
        dni: dni,
        pir: pir,
        time: time,
        comment: comment
      }

      var updates = {};

      updates['/users/' + child.key + '/' + newTicketKey] = postData;

      return firebase.database().ref().update(updates);
    }))
  })
}

/* GET home page. */
router.get('', function (req, res, next) {
  console.log("current user: " + req.session.user)
  if (!req.session.user) {
    res.redirect('/login');
  }
  res.render('index', {
    title: 'Home',
    name: firebase.auth().currentUser.email
  });
});

//Post ticket
router.post('/', function (req, res, next) {
  console.log('UserID request: ' + req.session.user);
  addNewTicket(
    req.body.txtAnillamador,
    req.body.txtDni,
    req.body.txtPir,
    req.body.txtTicket,
    req.body.txtTmo,
    req.body.txtComment,
    req.session.user
  )
  res.redirect('/');
})

/* GET error page. */
router.get('/error', function (req, res, next) {
  res.render('error', { title: 'Express' });
});


module.exports = router;
