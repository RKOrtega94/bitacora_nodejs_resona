// Get reference
var query = firebase.database().ref("tickets/" + user)
var count = 0
var minutes = 0
var seconds = 0
var duration = 0
var tmo = 0
function addRow(data) {
  var table = $('#dataTable').DataTable();
  var date = new Date;
  var month = '' + (date.getMonth() + 1)
  if (month.length <= 1) {
    month = '0' + month;
  }
  today = month + '/' + date.getFullYear()
  if (today == data.date.substr(3, 7)) {
    minutes = minutes + parseInt(data.tmo.substr(0, 2), 10)
    seconds = seconds + parseInt(data.tmo.substr(3, 4), 10)
    duration = (seconds * 1000) + (minutes * 60000)
    count++
    tmo = duration / count
    var mm = parseInt((tmo / (1000 * 60))) < 10 ? '0' + parseInt((tmo / (1000 * 60))) : parseInt((tmo / (1000 * 60)))
    var ss = parseInt((tmo / 1000) % 60) < 10 ? '0' + parseInt((tmo / 1000) % 60) : parseInt((tmo / 1000) % 60)
    var promedioTmo = 'Promedio TMO mensual: ' + mm + ':' + ss
    if ((tmo / 1000) < (269)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 0%</p>"
    } else if ((tmo / 1000) >= (270) && (tmo / 1000) <= (299)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 10%</p>"
    } else if ((tmo / 1000) >= (300) && (tmo / 1000) <= (329)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 20%</p>"
    } else if ((tmo / 1000) >= (330) && (tmo / 1000) <= (359)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 30%</p>"
    } else if ((tmo / 1000) >= (360) && (tmo / 1000) <= (389)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 40%</p>"
    } else if ((tmo / 1000) >= (390) && (tmo / 1000) <= (419)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 50%</p>"
    } else if ((tmo / 1000) >= (420) && (tmo / 1000) <= (449)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 60%</p>"
    } else if ((tmo / 1000) >= (450) && (tmo / 1000) <= (479)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 70%</p>"
    } else if ((tmo / 1000) >= (480) && (tmo / 1000) <= (509)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 80%</p>"
    } else if ((tmo / 1000) >= (510) && (tmo / 1000) <= (539)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-warning strong\">TMO: 90%</p>"
    } else if ((tmo / 1000) >= (540) && (tmo / 1000) <= (569)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-success strong\">TMO: 100%</p>"
    } else if ((tmo / 1000) >= (570) && (tmo / 1000) <= (599)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-warning strong\">TMO: 90%</p>"
    } else if ((tmo / 1000) >= (600) && (tmo / 1000) <= (629)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 80%</p>"
    } else if ((tmo / 1000) >= (630) && (tmo / 1000) <= (659)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 70%</p>"
    } else if ((tmo / 1000) >= (660) && (tmo / 1000) <= (689)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 60%</p>"
    } else if ((tmo / 1000) >= (690) && (tmo / 1000) <= (719)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 50%</p>"
    } else if ((tmo / 1000) >= (720) && (tmo / 1000) <= (749)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 40%</p>"
    } else if ((tmo / 1000) >= (750) && (tmo / 1000) <= (779)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 30%</p>"
    } else if ((tmo / 1000) >= (780) && (tmo / 1000) <= (809)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 20%</p>"
    } else if ((tmo / 1000) >= (810) && (tmo / 1000) <= (839)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 10%</p>"
    } else if ((tmo / 1000) >= (840)) {
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"text-danger strong\">TMO: 0%</p>"
    }
  }
  document.getElementById("promedioTmo").innerHTML = promedioTmo
  table.row.add([
    data.date,
    data.anillamador,
    data.dni,
    data.pir,
    data.ticket,
    data.tmo
  ]).draw(true);
}
document.getElementById("loading").innerHTML = "<div class=\"spinner-border text-success\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>"
// Query database
query.once('value', snapshot => {
  snapshot.forEach(childSnapshot => {
    result = childSnapshot.val()
    addRow(result)
    setTimeout(function () {
      document.getElementById("loading").remove()
    }, 500);
  })
})