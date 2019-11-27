var table = $('#dataTable').DataTable()

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

var test = 'test'
var query = firebase.database().ref('tickets').child('pw').child(date.getFullYear()).child(month).child(day).child(user).child(ticket)

var txtTicket = document.getElementById('txtTicket')
var txtDni = document.getElementById('txtDni')
var txtDate = document.getElementById('txtDate')
var txtIn = document.getElementById('txtIn')
var txtServ = document.getElementById('txtServ')
var txtType = document.getElementById('txtType')
var txtContact = document.getElementById('txtContact')

function addRow(key, data) {
    switch (key) {
        case 'contact':
            break
        case 'date':
            break
        case 'dni':
            break
        case 'hour':
            break
        case 'serv':
            break
        case 'status':
            break
        case 'ticket':
            break
        case 'type':
            break
        default:
            table.row.add([
                data.date,
                data.hour,
                data.interaction == 'C' ? 'Contactado' : 'No contactado',
                data.coment
            ]).draw(true)
            break

    }
}

query.once('value', snapshot => {
    var data = snapshot.val()
    txtTicket.value = data.ticket
    txtDni.value = data.dni
    txtDate.value = date.getFullYear() + '-' + month + '-' + day
    txtIn.value = data.date + ' ' + data.hour
    var indexServ = 0
    switch (data.serv) {
        case 'DTH':
            indexServ = 1
            break
        case 'IF':
            indexServ = 2
            break
        case 'SMA':
            indexServ = 3
            break
        case 'TF':
            indexServ = 4
            break
        default:
            indexServ = 0
            break
    }
    txtServ.selectedIndex = indexServ
    var indexType = 0
    switch (data.type) {
        case 'C':
            indexType = 1
            break
        case 'S':
            indexType = 2
            break
        case 'V':
            indexType = 3
            break
        default:
            indexType = 0
            break
    }
    txtType.selectedIndex = indexType
    txtContact.value = data.contact
    snapshot.forEach(data => {
        addRow(data.key, data.val())
    })
})

function processChange() {
    var process = document.getElementById('txtProcess').value

    if (process == 'C') {
        document.getElementById('txtDate').disabled = true
    } else {
        document.getElementById('txtDate').disabled = false
    }
}

$(function () {
    var datePicker = $('#txtDate')
        .datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            minDate: 0,
        })
})