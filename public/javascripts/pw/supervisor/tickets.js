var selectUser = document.getElementById('txtAsesor')
var table;

$(document).ready(function () {
  $('#txtAsesor').select2();
});

function addOption(item) {
  var option = document.createElement('option')
  option.text = item.username
  option.value = item.username
  selectUser.add(option)
}

result.forEach(item => {
  addOption(item)
})
var date = new Date;
var day = '' + date.getDate();
var month = '' + (date.getMonth() + 1)

if (day.length <= 1) {
  day = '0' + day;
}

if (month.length <= 1) {
  month = '0' + month;
}

function addRow(asesor, ticket, data) {
  table = $('#dataTable').DataTable()
  table.row.add([
    ticket,
    asesor,
    data.dni,
    data.hour,
    data.endAt ? data.endAt : '',
    data.status == 'P' ? 'Pendiente' : data.status == 'X' ? 'Pausado' : 'Atendido'
  ])
    .draw(true)
}

var query = firebase.database().ref('tickets').child('pw').child(date.getFullYear()).child(month).child(day)

query.once('value', snapshot => {
  snapshot.forEach(userSnapshot => {
    var asesor = userSnapshot.key
    userSnapshot.forEach(ticketSnapshot => {
      var ticket = ticketSnapshot.key
      var data = ticketSnapshot.val()
      addRow(asesor, ticket, data)
    })
  })
})