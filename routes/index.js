var express = require('express');
var router = express.Router();

//Firebase
var firebase = require('../firebaseclass');
var admin = require('firebase');

function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = admin.database().ref().child('posts').push().key;

  console.log(newPostKey);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;

  return admin.database().ref().update(updates);
}

//writeNewPost(1, 'Robinson', 'picture', 'title', 'body');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    res.redirect('/login');
  }
  res.render('index', { 
    title: 'Home',
    name: req.session.user });
    req.session.user = firebase.config.auth().currentUser.email;
    console.log(req.session.user);
});

/* GET error page. */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Express' });
});


module.exports = router;
