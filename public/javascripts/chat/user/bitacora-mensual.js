function cls() {
  setTimeout(function () {
    document.getElementById('txtAnillamador').value = ""
    document.getElementById('txtDni').value = ""
    document.getElementById('txtPir').selectedIndex = 0
    document.getElementById('txtTicket').value = ""
    document.getElementById('txtTmo').value = ""
  }, 5000)
}
//Define variables
var result = [];
// Get reference
var date = new Date()
var day = '' + date.getDate();
var month = '' + (date.getMonth() + 1)

if (day.length <= 1) {
  day = '0' + day;
}

if (month.length <= 1) {
  month = '0' + month;
}
var refToday = date.getFullYear() + '/' + month + '/' + day
var query = firebase.database().ref().child("tickets").child('chat').child(date.getFullYear()).child(date.getMonth() + 1)
function addRow(data) {
  var table = $('#dataTable').DataTable();
  table.row.add([
    data.date,
    data.ip,
    data.dni,
    data.req,
    data.pir,
    data.ticket,
    data.tmo
  ]).draw(true);
}
// Query database
document.getElementById("loading").innerHTML = "<div class=\"spinner-border text-success\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>"
// Query database
query.once('value', snapshot => {
  console.log(snapshot.val())
  snapshot.forEach(childSnapshot => {
    childSnapshot.forEach(userSnapshot => {
      if (userSnapshot.key == user) {
        userSnapshot.forEach(ticketSnapshot => {
          var result = ticketSnapshot.val()
          addRow(result)
          setTimeout(function () {
            if (document.getElementById("loading")) {
              document.getElementById("loading").remove()
            }
          }, 500);
        })
      }
    })
  })
})