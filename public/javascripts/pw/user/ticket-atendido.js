var table = $('#dataTable').DataTable()

var date = new Date()
var day = '' + date.getDate();
var month = '' + (date.getMonth() + 1)

if (day.length <= 1) {
    day = '0' + day;
}

if (month.length <= 1) {
    month = '0' + month;
}

var user = document.getElementById('userLoged').textContent

var query = firebase.database().ref('tickets').child('pw').child(date.getFullYear()).child(month).child(day).child(user)

function addRow(data) {
    table.row.add([
        data.date,
        data.hour,
        data.ticket,
        data.dni,
        data.serv == 'DTH' ? 'DTH' : data.serv == 'IF' ? 'Internet Fijo' : data.serv == 'SMA' ? 'SMA' : data.serv == 'TF' ? 'Tlefonía Fija' : 'No defined',
        data.type == 'C' ? 'Consulta' : data.type == 'S' ? 'Soporte' : data.type == 'V' ? 'Venta' : 'No defined',
        data.endAt
    ]).draw(true)
}

query.orderByChild('status').equalTo('A').on('value', snapshot => {
    snapshot.forEach(childSnapshot => {
        addRow(childSnapshot.val())
    })
})