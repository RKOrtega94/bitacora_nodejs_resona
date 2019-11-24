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
  var query = firebase.database().ref("tickets").child('chat').child(date.getFullYear()).child(month).child(day).child(user)
  function addRow(data) {
    var table = $('#dataTable').DataTable();
    table.row.add([
      data.ip,
      data.dni,
      data.servicio,
      data.req,
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