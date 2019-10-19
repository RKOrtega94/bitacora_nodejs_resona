var db = firebase.firestore()

db.collection('notify')
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type == "added") {
                var data = change.doc.data()
                var type = data.type
                switch (type) {
                    case 'info':
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