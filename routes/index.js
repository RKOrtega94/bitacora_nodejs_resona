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



/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  dbRef.orderByChild('email').equalTo(firebase.auth().currentUser.email).once('value', snapshot => {
    snapshot.forEach(function (child) {
      var result = child.val();
      console.log("User ID: " + result.id)
      var resultDbRef = admin.database().ref('users').child(result.id).child('tickets');
      console.log("Tikets: " + resultDbRef);
      resultDbRef.once("value", function (snapshot) {
        console.log(snapshot.val())
        res.render('index', {
          title: 'Home',
          name: firebase.auth().currentUser.email,
          result: JSON.stringify(snapshot.val())
        });
      })
    })
  })
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
  res.redirect('/login');
})

/* GET error page. */
router.get('/error', function (req, res, next) {
  res.render('error', { title: 'Express' });
});


module.exports = router;
