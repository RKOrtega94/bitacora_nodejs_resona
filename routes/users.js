var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('firebase');
//DB reference
const dbRef = firebase.database().ref('users');

//Add user
function addNewUser(firstname, lastname, dni, email) {
    //Get a key for new post
    var newUserKey = firebase.database().ref().child('users').push().key;

    var postData = {
        id: newUserKey,
        firstname: firstname,
        lastname: lastname,
        dni: dni,
        email: email
    }
    var updates = {};

    updates['/users/' + newUserKey] = postData;

    firebase.auth().createUserWithEmailAndPassword(email, dni)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        }).then(
            firebase.database().ref().update(updates)
        );
}

function getUsersData(){
    console.log(dbRef)
}

//Get user page
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    getUsersData();
    res.render('users', {
        title: 'Manage users',
        name: req.session.user,
        data: ""
    })
})

//Post user data
router.post('/', function (req, res, next) {
    addNewUser(
        req.body.txtFirstname,
        req.body.txtLastname,
        req.body.txtDni,
        req.body.txtEmail
    )
    res.redirect('/admin/users');
})

module.exports = router;