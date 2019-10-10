// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
// Get reference
var query = firebase.database().ref("tickets/" + user)
var count = 0
var minutes = 0
var seconds = 0
var duration = 0
var tmo = 0
function tmoChart(cumplimiento, restante) {
  // Pie Chart Example
  var ctx = document.getElementById("tmoChart")
  var noneData = config = {
    type: 'doughnut',
    data: {
      labels: ["Cumplimiento", "Faltante"],
      datasets: [{
        data: [0, 0],
        backgroundColor: ['#4e73df', '#F44336'],
        hoverBackgroundColor: ['#2e59d9', '#D32F2F'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  }
  var myPieChart = new Chart(ctx, noneData)
  var config = {
    type: 'doughnut',
    data: {
      labels: ["Cumplimiento", "Faltante"],
      datasets: [{
        data: [cumplimiento, restante],
        backgroundColor: ['#4caf50', '#F44336'],
        hoverBackgroundColor: ['#087f23', '#D32F2F'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  }
  myPieChart = new Chart(ctx, config)
}
function addRow(data) {
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
    var porcentaje = parseInt(mm) * 60 + parseFloat('0.' + ss) * 60
    if (porcentaje >= (451) && porcentaje <= (495)) {
      tmoChart(100, 0)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">100%</p>"
    } else if (porcentaje >= (406) && porcentaje <= (450)) {
      tmoChart(80, 20)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">80%</p>"
    } else if (porcentaje >= (496) && porcentaje <= (540)) {
      tmoChart(80, 20)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">80%</p>"
    } else if (porcentaje >= (586)) {
      tmoChart(0, 100)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">0%</p>"
    } else if (porcentaje >= 0 && porcentaje <= (360)) {
      tmoChart(0, 100)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">0%</p>"
    } else if (porcentaje >= (361) && porcentaje <= (405)) {
      tmoChart(60, 40)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">60%</p>"
    } else if (porcentaje >= (541) && porcentaje <= (585)) {
      tmoChart(60, 40)
      document.getElementById('cumplimientoTmo').innerHTML = "<p class=\"font-weight-bold text-success text-center\">60%</p>"
    }
  }
}
// Query database
query.once('value', snapshot => {
  snapshot.forEach(childSnapshot => {
    result = childSnapshot.val()
    addRow(result)
  })
})