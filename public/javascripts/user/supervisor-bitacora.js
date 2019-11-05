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
});

function addRow(user, ticket, data) {
    table = $('#dataTable').DataTable();
    if (data.hour) {
        table.row.add([
            user,
            ticket,
            data.anillamador,
            data.dni,
            data.pir,
            data.date,
            data.hour,
            '0:' + data.tmo
        ])
            .draw(true);
    } else {
        table.row.add([
            user,
            ticket,
            data.anillamador,
            data.dni,
            data.pir,
            data.date,
            'Sin Hora',
            '0:' + data.tmo
        ])
            .draw(true);
    }

    setTimeout(function () {
        document.getElementById("loading").remove()
    }, 500);
}

function removeData(user, ticket) {
    var deleteData = firebase.database().ref("tickets").child(user).child(ticket)
    deleteData.remove()
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
                var query = firebase.database().ref('tickets').child(toYear).child(fromMonths).child(fromDays)
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
        // Query database
        //document.getElementById("loading").innerHTML = "<div class=\"spinner-border text-success\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>"
        //query.once('value', snapshot => {
        //    snapshot.forEach(childSnapshot => {
        //        var userResult = childSnapshot.key
        //        var userRef = firebase.database().ref('tickets/' + userResult)
        //        childSnapshot.forEach(ticketSnapshot => {
        //            var date = new Date()
        //            var month = '' + (date.getMonth() + 1)
        //            var year = date.getFullYear()
        //            if (month.length == 1) {
        //                month = '0' + month
        //            }
        //            var data = ticketSnapshot.val()
        //            var ticket = ticketSnapshot.key
        //            var user = userResult
        //            if (data.date) {
        //                var consult = month + '/' + year
        //                var year = data.date.substring(6, 10)
        //                var mes = data.date.substring(3, 5)
        //                var dia = data.date.substring(0, 2)
        //                var newData = query.child(year).child(mes).child(dia).child(user).child(ticket).set(data)
        //                if (consult == data.date.substring(3, 10)) {
        //                    addRow(user, ticket, data)
        //                } else {
        //                    removeData(user, ticket)
        //                }
        //            }
        //        })
        //    })
        //})
    }
}