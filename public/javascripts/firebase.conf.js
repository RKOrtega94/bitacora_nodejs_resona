//Define variables
var user = document.getElementById('userLoged').textContent
var result = [];
//Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyBe7C2-8lUMP1KWPJ_-lkvKzu0ytl5fAME",
    authDomain: "resonatel.firebaseapp.com",
    databaseURL: "https://resonatel.firebaseio.com",
    projectId: "resonatel",
    storageBucket: "resonatel.appspot.com",
    messagingSenderId: "710009860039",
    appId: "1:710009860039:web:54d43ee0d8b8a4733ab3e2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);