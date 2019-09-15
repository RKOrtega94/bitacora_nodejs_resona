var express = require('express');
var router = express.Router();

//Firebase
var admin = require('firebase-admin');
var firebase = require('firebase');

const dbRef = admin.database().ref('users');

var tickets;

//Add Ticket
function addNewTicket(anillamador, dni, pir, ticket, time, comment, userKey) {
  //Get ticket key
  dbRef.orderByChild('email').equalTo(userKey).once('value', snapshot => {
    snapshot.forEach((function (child) {
      var newTicketKey = admin.database().ref().child('users').child(child.key).push().key;
      var postData = {
        ticket: ticket,
        anillamador: anillamador,
        dni: dni,
        pir: pir,
        time: time,
        comment: comment
      }

      var updates = {};

      updates['/users/' + child.key + '/tickets/' + newTicketKey] = postData;

      return admin.database().ref().update(updates);
    }))
  })
}

//Read Data
tickets = function readNewData() {
  dbRef.orderByChild('email').equalTo(firebase.auth().currentUser.email).once('value', snapshot => {
    snapshot.forEach(function (child) {
      var result = child.val();
      return result.tickets
    })
  });
}

/* GET home page. */
router.get('', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  console.log("Hola desde la consola");
  for (i in tickets) {
    console.log("Ticket:" + tickets[i].anillamador)
  }
  res.render('index', {
    title: 'Home',
    name: firebase.auth().currentUser.email,
  });
});

//Post ticket
router.post('/', function (req, res, next) {
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
