var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('firebase');

const dbRef = firebase.database().ref('users');
var dbRefTickets;

var htmlIndex;

//Add Ticket
function addNewTicket(anillamador, dni, pir, ticket, time, comment, userKey) {
  console.log("tiket: " + ticket)
  //Get ticket key
  console.log('Userkey: ' + userKey);
  dbRef.orderByChild('email').equalTo(userKey).once('value', snapshot => {
    snapshot.forEach((function (child) {
      var newTicketKey = firebase.database().ref().child('users').child(child.key).push().key;
      var postData = {
        tiket: ticket,
        anillamador: anillamador,
        dni: dni,
        pir: pir,
        time: time,
        comment: comment
      }

      var updates = {};

      updates['/users/' + child.key + '/tickets/' + newTicketKey] = postData;

      return firebase.database().ref().update(updates);
    }))
  })
}

//Read Data
function readNewData(user) {
  console.log("Actual user: " + user);
  dbRef.orderByChild('email').equalTo(user).once('value', snapshot => {
    snapshot.forEach(function (child) {
      console.log("UserID: " + child.key);
      dbRefTickets = firebase.database().ref().child('users').child(child.key).child('tickets');
      console.log("Database: " + dbRefTickets);
      return htmlIndex = "<h1>Hola</h1>";
    })
  });
}

/* GET home page. */
router.get('', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  readNewData(firebase.auth().currentUser.email);
  res.render('index', {
    title: 'Home',
    name: firebase.auth().currentUser.email,
    dataTable: htmlIndex
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
