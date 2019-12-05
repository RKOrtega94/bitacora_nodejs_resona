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

function loadSpinner() {
    var spinner = document.getElementById("loading")
    spinner.innerHTML = "<div class=\"spinner-border text-success\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>"
    spinner.style.display = 'block'
}

function quitSpinner() {
    setTimeout(function () {
        if (document.getElementById("loading")) {
            document.getElementById("loading").style.display = 'none'
        }
    }, 10);
}

$(function () {
    var from = $("#txtStartDate")
        .datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            minDate: '2019-10-01',
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

function addRow(user, ticket, data) {
    loadSpinner()
    table = $('#dataTable').DataTable();
    table.row.add([
        user,
        ticket,
        data.anillamador,
        data.dni,
        data.escalado ? 'Ticket escalado en Omnicanal' : 'N/A',
        data.date,
        data.hour ? data.hour : 'Sin Hora',
        '0:' + data.tmo,
        data.coment ? data.coment : 'Sin comentario'
    ])
        .draw(true);
    quitSpinner()
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
                var query = firebase.database().ref('tickets').child('baf').child(toYear).child(fromMonths).child(fromDays)
                query.once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        var userResult = childSnapshot.key
                        childSnapshot.forEach(ticketSapshot => {
                            var data = ticketSapshot.val()
                            var ticket = ticketSapshot.key
                            addRow(userResult, ticket, data)
                        })
                    })
                })
                fromDay++
            }
            //fromMonth++
        }
    }
}