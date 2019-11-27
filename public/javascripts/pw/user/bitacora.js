var user = document.getElementById('userLoged').textContent
var table;

$(document).ready(function () {
    table = $('#dataTable').DataTable();
    table.destroy();
    table = $('#dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5'
        ]
    })
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

function addRow(ticket, data) {
    table = $('#dataTable').DataTable()
    if (data.status != 'A') {
        table.row.add([
            `<a href="ticket/${ticket}">${ticket}</a>`,
            data.dni,
            data.hour,
            data.status == 'P' ? 'Pendiente' : data.status == 'X' ? 'Pausado' : 'Atendido'
        ])
            .draw(true)
    }
}

var query = firebase.database().ref('tickets').child('pw').child(date.getFullYear()).child(month).child(day).child(user)

query.once('value', snapshot => {
    snapshot.forEach(ticketSnapshot => {
        addRow(ticketSnapshot.key, ticketSnapshot.val())
    })
})