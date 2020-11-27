class UserController {

    constructor(formId, TableId){ //recebe os ids
this.formEl = document.getElementById(formId)
this.TableEl = document.getElementById(TableId);

this.OnSubmit(); //colocamos o OnSubmit aqui para ele já ser iniciado

    }

    // -- >> OnSubmit executa o código quando algum botão for pressionado(EVent Listener de click*// 
    OnSubmit() {
        this.formEl.addEventListener("submit", /* function  removemos a function pois ela limita o escopo
         entao ela só recebe o evento(que no caso é o submit, e deixa ele pegar o método Get Values
            //Nao precisamos chamar o evento no Html Pois há um Event listener Submit, ou seja, quando o JS
            //"ouvir" o submit ele automitcamente chama este método, não é possível chamar direto pois ele está
            //fora do escopo global, se limitando apenas no escopo do contructor User Controller.
            fora do escopo*/ (event) => {
            event.preventDefault(); //previne o refresh no envio de formulário

            this.AddLine(this.GetValues());
            
            this.GetValues();
          
        });


    }

    GetValues(){

        let user = {}; //o Let cria uma var no escopo do método

        this.formEl.elements.forEach(function (field, index) {  //pega todos os campos e  oara cada um executa um if
            //esse if gender é para caso o campo gender esteja marcado como checked ele puxe os valores dos campos
           // o For Each passa por todos os campos do HTML(pos causa do Elements do FormsEl, que retorna os campos)
           //indexados
            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                    
                }
                
            } else {
    
                user[field.name] = field.value;  //pega os valores mesmo sem check
    
            }
            
        });
    
    return  new  User(
        user.name, 
        user.gender, 
        user.birth, 
        user.country, 
        user.email, 
        user.password, 
        user.photo, 
        user.admin)

        //essa função foi criada para passar por todos os fields e pegar os valores


    }

    AddLine(dataUser) {
      
  
    
      this.TableEl.innerHTML = //Colocamos o TableId para ele receber o Id da tabela toda
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
    
    // document.getElementById('table-user').appendChild(tr); //pegar a table do HTML
    
        
    }
    
}