var selectCategory = document.getElementById('txtItem')
var result = errors
var item = items

function addOption(item) {
  var option = document.createElement("option")
  option.text = item.item
  option.value = item.id
  selectCategory.add(option)
}
function addRow(data) {
  var afectacion = 'ENC'
  if(data.ecac){
    afectacion = ' ECAC '
  }
  if(data.ecan){
    if(afectacion == 'ENC'){
      afectacion = ' ECAN '
    } else {
      afectacion = afectacion + ' ECAN '
    }
  }
  if(data.ecuf){
    if(afectacion == 'ENC'){
      afectacion = ' ECUF '
    } else {
      afectacion = afectacion + ' ECUF '
    }
  }
  var table = $('#dataTable').DataTable();
  table.row.add([
    data.id,
    data["Item_category.item"],
    data.error,
    "-" + data.peso + "<br>" + afectacion,
    data.status,
    data.createdAt,
    data.updatedAt,
    "<a href=\"/user/edit/" + data.id + "\">Editar</a> / <a href=\"/user/delete/" + data.id + "\">Eliminar</a>"
  ]).draw(true)
};
item.forEach(item => {
  addOption(item)
})
result.forEach(res => {
  addRow(res)
})