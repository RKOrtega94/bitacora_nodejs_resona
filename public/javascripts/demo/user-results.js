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
    if ((tmo / 1000) < (269)) {
      tmoChart(0, 100)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 0%</p>"
    } else if ((tmo / 1000) >= (270) && (tmo / 1000) <= (299)) {
      tmoChart(10, 90)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 10%</p>"
    } else if ((tmo / 1000) >= (300) && (tmo / 1000) <= (329)) {
      tmoChart(20, 80)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 20%</p>"
    } else if ((tmo / 1000) >= (330) && (tmo / 1000) <= (359)) {
      tmoChart(30, 70)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 30%</p>"
    } else if ((tmo / 1000) >= (360) && (tmo / 1000) <= (389)) {
      tmoChart(40, 60)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 40%</p>"
    } else if ((tmo / 1000) >= (390) && (tmo / 1000) <= (419)) {
      tmoChart(50, 50)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 50%</p>"
    } else if ((tmo / 1000) >= (420) && (tmo / 1000) <= (449)) {
      tmoChart(60, 40)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 60%</p>"
    } else if ((tmo / 1000) >= (450) && (tmo / 1000) <= (479)) {
      tmoChart(70, 30)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 70%</p>"
    } else if ((tmo / 1000) >= (480) && (tmo / 1000) <= (509)) {
      tmoChart(80, 20)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 80%</p>"
    } else if ((tmo / 1000) >= (510) && (tmo / 1000) <= (539)) {
      tmoChart(90, 10)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-warning strong\">TMO: 90%</p>"
    } else if ((tmo / 1000) >= (540) && (tmo / 1000) <= (569)) {
      tmoChart(100, 0)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-success strong\">TMO: 100%</p>"
    } else if ((tmo / 1000) >= (570) && (tmo / 1000) <= (599)) {
      tmoChart(90, 10)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-warning strong\">TMO: 90%</p>"
    } else if ((tmo / 1000) >= (600) && (tmo / 1000) <= (629)) {
      tmoChart(80, 20)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 80%</p>"
    } else if ((tmo / 1000) >= (630) && (tmo / 1000) <= (659)) {
      tmoChart(70, 30)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 70%</p>"
    } else if ((tmo / 1000) >= (660) && (tmo / 1000) <= (689)) {
      tmoChart(60, 40)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 60%</p>"
    } else if ((tmo / 1000) >= (690) && (tmo / 1000) <= (719)) {
      tmoChart(50, 50)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 50%</p>"
    } else if ((tmo / 1000) >= (720) && (tmo / 1000) <= (749)) {
      tmoChart(40, 60)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 40%</p>"
    } else if ((tmo / 1000) >= (750) && (tmo / 1000) <= (779)) {
      tmoChart(30, 70)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 30%</p>"
    } else if ((tmo / 1000) >= (780) && (tmo / 1000) <= (809)) {
      tmoChart(20, 80)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 20%</p>"
    } else if ((tmo / 1000) >= (810) && (tmo / 1000) <= (839)) {
      tmoChart(10, 90)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 10%</p>"
    } else if ((tmo / 1000) >= (840)) {
      tmoChart(0, 100)
      document.getElementById("cumplimientoTmo").innerHTML = "<p class=\"font-weight-bold text-center text-danger strong\">TMO: 0%</p>"
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