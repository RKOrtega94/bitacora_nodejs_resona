//FireBase SDK
var firebase = require("firebase");

//Configure FireBase
var firebaseConfig = {
  apiKey: "AIzaSyB6vST0GD8Dmo4H0AkIcnqz1xk4wvL397Q",
  authDomain: "asistencia-esp8266.firebaseapp.com",
  databaseURL: "https://asistencia-esp8266.firebaseio.com",
  projectId: "asistencia-esp8266",
  storageBucket: "asistencia-esp8266.appspot.com",
  messagingSenderId: "187156215283",
  appId: "1:187156215283:web:ab05d9f668a8cb2f"
};

// Initialize FireBase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database(); 

var name = "Robinosn Ortega";

module.exports = {
    db: function (ref) {
        console.log("text: " + ref);
    },
    name: function(nombre) {
        name = nombre;
        return name;
    }
}