// Funcion para añadir datos a la tabla
function addRow(id, data) {
  var table = $('#dataTable').DataTable();
  table.row.add([
    data.title,
    data.message,
    data.type,
    data.status,
    "<a id=\"myLink\" title=\"Eliminar\" href=\"javascript:void(0);\" onclick=\"deleteNotify('" + id + "'); return false;\">Eliminar</a>"
  ]).draw(true);
}
// Query database
function queryNotify() {
  var notification = firebase.firestore()
  notification.collection('baf').doc('notify').collection('notify').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addRow(doc.id, doc.data())
    })
  })
}

function deleteNotify(docId) {
  var table = $('#dataTable').DataTable();
  table.clear().draw()
  db.collection('baf').doc('notify').collection('notify').doc(docId).delete().then(function () {
    queryNotify()
    vNotify.success({
      text: 'Notificación eliminada',
      title: 'Información',
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      fadeInterval: 50,
      visibleDuration: 7000,
      postHoverVisibleDuration: 500,
      position: "topRight", // topLeft, bottomLeft, bottomRight, center
      sticky: false, // is sticky
      showClose: true // show close button
    })
  }).catch(function (error) {
    vNotify.error({
      text: 'Ha ocurrido un error',
      title: 'Error',
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      fadeInterval: 50,
      visibleDuration: 7000,
      postHoverVisibleDuration: 500,
      position: "topRight", // topLeft, bottomLeft, bottomRight, center
      sticky: false, // is sticky
      showClose: true // show close button
    })
  })
}

queryNotify()