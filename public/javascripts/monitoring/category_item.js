var selectCategory = document.getElementById('txtCategory')
var result = item
var cat = category

function addOption(cat) {
  var option = document.createElement("option")
  option.text = cat.category
  option.value = cat.id
  selectCategory.add(option)
}
function addRow(data) {
  var table = $('#dataTable').DataTable();
  table.row.add([
    data.id,
    data["Category.category"],
    data.item,
    data.status,
    data.createdAt,
    data.updatedAt,
    "<a href=\"/user/edit/" + data.id + "\">Editar</a> / <a href=\"/user/delete/" + data.id + "\">Eliminar</a>"
  ]).draw(true)
};
cat.forEach(cat => {
  addOption(cat)
})
result.forEach(res => {
  addRow(res)
})