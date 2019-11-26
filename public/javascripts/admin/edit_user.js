document.getElementById("txtUsername").setAttribute('value', user.username)
document.getElementById("txtEmail").setAttribute('value', user.email)
var index = 0;
document.getElementById('editUserForm').action = '/user/edit/' + user.username
switch (user.role) {
    case 'user':
        index = 1
        break
    case 'supervisor':
        index = 2
        break
    case 'admin':
        index = 3
        break
    case 'disabled':
        index = 4
        break
    default:
        index = 0
        break
}
console.log(user.group)
document.getElementById("txtRole").selectedIndex = index
function changePassword() {
    document.getElementById("changePassword").innerHTML = "<input id=\"txtPassword\" type=\"password\" name=\"txtPassword\" placeholder=\"Nueva contraseña\" required=\"true\" class=\"form-control\">"
}
$(document).ready(function () {
    document.getElementById("changePassword").innerHTML = "<a id=\"myLink\" title=\"Click to do something\" href=\"#\" onclick=\"changePassword();return false;\">Cambiar contraseña</a>"
})