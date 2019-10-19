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
var query = firebase.database().ref("tickets/" + user)
var count = 0
var minutes = 0
var seconds = 0
var duration = 0
var tmo = 0
function addRow(data) {
  var table = $('#dataTable').DataTable();
  minutes = minutes + parseInt(data.tmo.substr(0, 2), 10)
  seconds = seconds + parseInt(data.tmo.substr(3, 4), 10)
  duration = (seconds * 1000) + (minutes * 60000)
  count++
  tmo = duration / count
  var mm = parseInt((tmo / (1000 * 60))) < 10 ? '0' + parseInt((tmo / (1000 * 60))) : parseInt((tmo / (1000 * 60)))
  var ss = parseInt((tmo / 1000) % 60) < 10 ? '0' + parseInt((tmo / 1000) % 60) : parseInt((tmo / 1000) % 60)
  var promedioTmo = 'Promedio TMO: ' + mm + ':' + ss
  var porcentaje = parseInt(mm) * 60 + parseFloat('0.' + ss) * 60
  if (porcentaje >= (451) && porcentaje <= (495)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-success strong\">TMO: 100%</p>"
  } else if (porcentaje >= (406) && porcentaje <= (450)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-warning strong\">TMO: 80%</p>"
  } else if (porcentaje >= (496) && porcentaje <= (540)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-warning strong\">TMO: 80%</p>"
  } else if (porcentaje >= (586)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 0%</p>"
  } else if (porcentaje >= 0 && porcentaje <= (360)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 0%</p>"
  } else if (porcentaje >= (361) && porcentaje <= (405)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-secondary strong\">TMO: 60%</p>"
  } else if (porcentaje >= (541) && porcentaje <= (585)) {
    document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-secondary strong\">TMO: 60%</p>"
  }
  document.getElementById("promedioTmo").innerHTML = promedioTmo
  table.row.add([
    data.anillamador,
    data.dni,
    data.pir,
    data.ticket,
    data.tmo
  ]).draw(true);
}
// Query database
query.once('value', snapshot => {
  snapshot.forEach(childSnapshot => {
    result = childSnapshot.val()
    var date = new Date;
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1)
    if (day.length <= 1) {
      day = '0' + day;
    }
    if (month.length <= 1) {
      month = '0' + month;
    }
    today = day + '/' + month + '/' + date.getFullYear()
    if (result.date == today) {
      addRow(result)
    }
  })
})