var ref = firebase.firestore()

function addRow(type, data) {
    var table = $('#dataTable').DataTable()
    switch (type) {
        case 'info':
            table.row.add([
                "<p class=\"text-info font-weight-bold\">Información</p>",
                "<p class=\"text-info font-weight-bold\">" + data.message + " </p>"
            ]).draw(true)
            break
        case 'warning':
            table.row.add([
                "<p class=\"text-warning font-weight-bold\">Aviso</p>",
                "<p class=\"text-warning font-weight-bold\">" + data.message + " </p>"
            ]).draw(true)
            break
        case 'error':
            table.row.add([
                "<p class=\"text-danger font-weight-bold\">Alerta</p>",
                "<p class=\"text-danger font-weight-bold\">" + data.message + " </p>"
            ]).draw(true)
            break
    }
}

ref.collection('notify')
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type == "added") {
                var data = change.doc.data()
                var type = data.type
                switch (type) {
                    case 'info':
                        addRow('info', change.doc.data())
                        vNotify.info({
                            text: data.message,
                            title: data.title,
                            fadeInDuration: 1000,
                            fadeOutDuration: 1000,
                            fadeInterval: 50,
                            visibleDuration: 7000,
                            postHoverVisibleDuration: 500,
                            position: "bottomRight", // topLeft, bottomLeft, bottomRight, center
                            sticky: false, // is sticky
                            showClose: true // show close button
                        })
                        break
                    case 'warning':
                        addRow('warning', change.doc.data())
                        vNotify.warning({
                            text: data.message,
                            title: data.title,
                            fadeInDuration: 1000,
                            fadeOutDuration: 1000,
                            fadeInterval: 50,
                            visibleDuration: 7000,
                            postHoverVisibleDuration: 500,
                            position: "bottomRight", // topLeft, bottomLeft, bottomRight, center
                            sticky: false, // is sticky
                            showClose: true // show close button
                        })
                        break
                    case 'error':
                        addRow('error', change.doc.data())
                        vNotify.error({
                            text: data.message,
                            title: data.title,
                            fadeInDuration: 1000,
                            fadeOutDuration: 1000,
                            fadeInterval: 50,
                            visibleDuration: 7000,
                            postHoverVisibleDuration: 500,
                            position: "bottomRight", // topLeft, bottomLeft, bottomRight, center
                            sticky: false, // is sticky
                            showClose: true // show close button
                        })
                        break
                    default:
                        break
                }

            }
        })
    })