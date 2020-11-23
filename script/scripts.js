var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

function AddLine(dataUser) {
    console.log(dataUser);
  var tr =  document.createElement("tr"); //cria a tabela

  tr.innerHTML =
  //inserir comanbdos no HTML 
  ` <tr> 
  <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
  <td>${dataUser.name}</td>
  <td>${dataUser.email}</td>
  <td>${dataUser.admin}</td>
  <td>${dataUser.birth}</td>
  <td>
    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
  </td>
</tr>`

document.getElementById('table-user').appendChild(tr); //pegar a table do HTML

    
}
document.getElementById("form-user-create").addEventListener("submit", function (event) {
    event.preventDefault(); //previne o refresh no envio de formulário
    
    fields.forEach(function (field) {  //pega todos os campos e  oara cada um executa um if
        //esse if gender é para caso o campo gender esteja marcado como checked ele puxe os valores dos campos
       
        if (field.name == "gender") {
            if (field.checked) {
                user[field.name] = field.value;
                
            }
            
        } else {

            user[field.name] = field.value;  //pega os valores mesmo sem check

        }
        
    });

var objectUser = new  User(
    user.name, 
    user.gender, 
    user.birth, 
    user.country, 
    user.email, 
    user.password, 
    user.photo, 
    user.admin) //um objeto é uma var que estancia ou representa uma classe
    //o new basicamente pega o Object User e passa os valores dos objetos dentro dela, respeitando
    //a ordem criada dentro da classe

AddLine(objectUser);     //passa os valores do objeto user para o parametro da função
   

});