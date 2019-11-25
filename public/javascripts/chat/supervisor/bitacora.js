var table;
$(document).ready(function () {
    table = $('#dataTable').DataTable();
    table.destroy();
    table = $('#dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5'
        ]
    });
});

$(function () {
    var from = $("#txtStartDate")
        .datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            minDate: '2019-11-23',
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
});

function addRow(user, ticket, data) {
    table = $('#dataTable').DataTable();
    table.row.add([
        data.date,
        data.hour,
        ticket,
        user,
        data.ip,
        data.dni,
        data.req,
        data.pir,
        '0:' + data.tmo,
        data.coment,
        data.vt
    ])
        .draw(true);
}

function search() {
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
                var query = firebase.database().ref('tickets').child('chat').child(toYear).child(fromMonths).child(fromDays)
                table.clear()
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