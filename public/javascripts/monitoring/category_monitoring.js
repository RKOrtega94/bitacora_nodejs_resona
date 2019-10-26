function addRow(data) {
  var table = $('#dataTable').DataTable();
  table.row.add([
    data.id,
    data.category,
    data.createdAt,
    data.updatedAt,
    data.status,
    "<a href=\"/user/edit/" + data.id + "\">Editar</a> / <a href=\"/user/delete/" + data.id + "\">Eliminar</a>"
  ]).draw(true)
};
result.forEach(category => {
  addRow(category)
});