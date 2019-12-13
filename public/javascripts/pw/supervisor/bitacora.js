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

$(function () {
    var from = $("#txtStartDate")
        .datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            minDate: '2019-11-27',
            maxDate: 0
        })
        .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $("#txtEndDate").datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            maxDate: 0
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        var dateFormat = "yy-mm-dd";
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
})

function addRow(ticket, interaction, userResult) {
    table.row.add([
        ticket.date + ' ' + ticket.hour,
        userResult,
        ticket.ticket,
        ticket.dni,
        ticket.contact,
        ticket.serv == 'DTH' ? 'DTH' : ticket.serv == 'IF' ? 'Internet Fijo' : ticket.serv == 'SMA' ? 'SMA' : ticket.serv == 'TF' ? 'Tlefonía Fija' : 'No defined',
        ticket.type == 'C' ? 'Consulta' : ticket.type == 'S' ? 'Soporte' : ticket.type == 'V' ? 'Venta' : 'No defined',
        ticket.status == 'A' ? 'Atendido' : ticket.status == 'X' ? 'Pausado' : ticket.status == 'P' ? 'Pendiente' : 'No defined',
        ticket.endDate ? (ticket.endDate + ticket.endAt ? ticket.endAt : '') : ticket.endAt ? ticket.endAt : '',
        interaction.date + ' ' + interaction.hour,
        interaction.interaction == 'C' ? 'Contactado' : interaction.interaction == 'X' ? 'No contesta' : 'No defined',
        interaction.process == 'C' ? 'Cerrado' : interaction.process == 'X' ? 'Pausado' : 'No defined',
        interaction.solution == 'S' ? 'Solucionado' : interaction.solution == 'E' ? 'Escalado' : interaction.solution == 'V' ? 'Visita Técnica' : 'No defined',
        interaction.numRequest ? interaction.numRequest : 'No defined'
    ]).draw(true)
}

function search() {
    table.clear()
    var userId = document.getElementById('txtUser')
    var fromDate = document.getElementById('txtStartDate')
    var toDate = document.getElementById('txtEndDate')
    fromDate.classList.remove('border-danger')
    toDate.classList.remove('border-danger')
    if (fromDate.value == '' || toDate.value == '') {
        fromDate.classList.add('border-danger')
        toDate.classList.add('border-danger')
    } else {
        document.getElementById("loading").innerHTML = "<div class=\"spinner-border text-success\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>"
        if (userId.value == 0) {
            var fromYear = fromDate.value.substring(0, 4)
            var toYear = toDate.value.substring(0, 4)
            var fromMonth = parseInt(fromDate.value.substring(5, 7))
            var toMonth = parseInt(toDate.value.substring(5, 7))
            var fromDay = parseInt(fromDate.value.substring(8, 10))
            var toDay = parseInt(toDate.value.substring(8, 10))
        }
        var months = toMonth - fromMonth
        var fromMonths = ''
        var days = toDay - fromDay
        var fromDays = ''
        for (var m = 0; m <= months; m++) {
            fromMonths = '' + fromMonth
            if (fromMonths.length <= 1) {
                fromMonths = '0' + fromMonth
            }

            for (var d = 0; d <= days; d++) {
                fromDays = '' + fromDay
                if (fromDays.length <= 1) {
                    fromDays = '0' + fromDays
                }
                var query = firebase.database().ref('tickets').child('pw').child(toYear).child(fromMonths).child(fromDays)
                query.once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        var userResult = childSnapshot.key
                        childSnapshot.forEach(ticketSapshot => {
                            var ticket = ticketSapshot.val()
                            ticketSapshot.forEach(dataSnapshot => {
                                var interactions = dataSnapshot.val()
                                switch (dataSnapshot.key) {
                                    case 'contact':
                                        break
                                    case 'date':
                                        break
                                    case 'dni':
                                        break
                                    case 'endAt':
                                        break
                                    case 'endDate':
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
                                        addRow(ticket, interactions, userResult)
                                        break
                                }
                                setTimeout(function () {
                                    if (document.getElementById("loading")) {
                                        document.getElementById("loading").remove()
                                    }
                                }, 500);
                            })
                        })
                    })
                })
                fromDay++
            }
            //fromMonth++
        }
    }
}