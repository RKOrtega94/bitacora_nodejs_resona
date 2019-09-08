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

module.exports = {
    // Initialize FireBase
    config: firebase.initializeApp(firebaseConfig),
    // Get a reference to the database service
    database: firebase.database()
}