class UserController {
  constructor(formId, TableId) {
    //recebe os ids
    this.formEl = document.getElementById(formId);
    this.TableEl = document.getElementById(TableId);

    this.OnSubmit(); //colocamos o OnSubmit aqui para ele já ser iniciado
  }

  // -- >> OnSubmit executa o código quando algum botão for pressionado(EVent Listener de click*//
  OnSubmit() {
    this.formEl.addEventListener(
      "submit",
      /* function  removemos a function pois ela limita o escopo
         entao ela só recebe o evento(que no caso é o submit, e deixa ele pegar o método Get Values
            //Nao precisamos chamar o evento no Html Pois há um Event listener Submit, ou seja, quando o JS
            //"ouvir" o submit ele automitcamente chama este método, não é possível chamar direto pois ele está
            //fora do escopo global, se limitando apenas no escopo do contructor User Controller.
            fora do escopo*/ (
        event
      ) => {
        event.preventDefault(); //previne o refresh no envio de formulário

        let values = this.GetValues(); //O problema é que o caminho da imagem
        this.GetPhoto().then(
          function (content) {
            values.photo = content;
            this.AddLine(values); //ele puxa os valores do get values no parametro
          },
          function (e) {
            console.error();
          }
         

        );
        

        
       
      }
    );
  }

  GetPhoto() {
  //prommisse para executar função assincrona
  //preparamos o código para 2 situações, o se funcionar ou se falhar
  //no caso o resolve ou reject, bem explicativo
    return promisse(function(resolve, reject){
      let filereader = new FileReader(); // Colocar o arquivo no let
      let elements = [...this.formEl.elements].filter(item=> { //arrow function para achar um item específico do array
          if (item.name === 'photo') {
              return item;
              //essa função verifica os campos e pega o valor do photo e retorna como item
              
          }
  
      })
      let file = elements[0].files[0] //O arquivo do element é uma coleção, colocamos index 0 pra peggar o primeiro elemento
      filereader.onload = () => { //Onload é uma função anonima que executa algo após um retorno, nesse caso, o Item
        
        resolve(filereader.result);
      }
      filereader.onerror((e) => {
        
        reject(e); //esse e retorna o evento do erro
      })  
      filereader.readAsDataURL(file); //ele le os dados como um caminho

    })

    
  };

  GetValues() {
    let user = {}; //o Let cria uma var no escopo do método

    /*Colocamos o this.formEl entre arrays para transformar em arrays, para assim o for each funcionar */
    [...this.formEl.elements].forEach(function (field, index) {
      //pega todos os campos e  oara cada um executa um if
      /*Esse ... é o spread, ele serve para que não precisemos colocar o número exato de elemnentos de um array*/
      //esse if gender é para caso o campo gender esteja marcado como checked ele puxe os valores dos campos
      // o For Each passa por todos os campos do HTML(pos causa do Elements do FormsEl, que retorna os campos)
      //indexados
      if (field.name == "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else {
        user[field.name] = field.value; //pega os valores mesmo sem check
      }
    });

    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );

    //essa função foi criada para passar por todos os fields e pegar os valores
  }

  AddLine(dataUser) {
    this.TableEl.innerHTML =
      //Colocamos o TableId para ele receber o Id da tabela toda
      //inserir comanbdos no HTML
      ` <tr> 
      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
    </tr>`;

    // document.getElementById('table-user').appendChild(tr); //pegar a table do HTML
  }
}
