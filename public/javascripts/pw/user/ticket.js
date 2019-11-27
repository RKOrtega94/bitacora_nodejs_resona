var user = document.getElementById('userLoged').textContent
var date = new Date()
var day = '' + date.getDate();
var month = '' + (date.getMonth() + 1)

if (day.length <= 1) {
    day = '0' + day;
}

if (month.length <= 1) {
    month = '0' + month;
}

var query = firebase.database().ref('tickets').child('pw').child(date.getFullYear()).child(month).child(day).child(user).child(ticket)

query.once('value', snapshot => {
    var data = snapshot.val()
    document.getElementById('txtTicket').value = data.ticket
    document.getElementById('txtDni').value = data.dni
    document.getElementById('txtDate').value = date.getFullYear() + '-' + month + '-' + day
    document.getElementById('txtIn').value = data.date + ' ' + data.hour
})