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


//codigo de submit apagado e colocado dentro do Controller OnSubmit