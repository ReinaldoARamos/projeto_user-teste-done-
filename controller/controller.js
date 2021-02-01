class UserController {
  constructor(formId, formUpdateId, TableId) {
    //recebe os ids
    this.formEl = document.getElementById(formId);
    this.formUpdateEl = document.getElementById(formUpdateId);
    this.TableEl = document.getElementById(TableId);
    console.log(this.formEl);
    this.OnSubmit(); //colocamos o OnSubmit aqui para ele já ser iniciado
    this.selectAll();
    this.OnEdit();
  }

  OnEdit() {
    document
      .querySelector("#box-user-update .btn-cancel")
      .addEventListener("click", (e) => {
        this.showPanelCreate();
      });
    this.formUpdateEl.addEventListener("submit", (event) => {
      event.preventDefault(); //previne o refresh no envio de formulário

      let btn = this.formUpdateEl.querySelector("[type=submit]");

      btn.disabled = true;
      let values = this.GetValues(this.formUpdateEl); //recebe os valores por parâmetro
      let index = this.formUpdateEl.dataset.trIndex; //esse let index pega a localização de index da row
      let tr = this.TableEl.rows[index]; //essa tr pega o valor retornando pelo index acima
      let userOld = JSON.parse(tr.dataset.user); //o parse torna um obj de fato
      let result = Object.assign({}, userOld, values); //os valores a direita substituem os da esquerad
      //values substitui os valoers que não existem ou que existem em userOld e userOld substitui o vazio

      this.GetPhoto(this.formUpdateEl).then(
        (content) => {
          if (!values.photo) {
            result._photo = userOld._photo;
          } else {
            result._photo = content;
          }
         

        this.getTr(user, tr); //
        
          this.updateCount();

          this.formUpdateEl.reset();
          btn.disabled = false;
          this.showPanelCreate();
        },
        (e) => {
          console.error(e);
        }
      );
    });
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

        let btn = this.formEl.querySelector("[type=submit]");

        btn.disabled = true;

        let values = this.GetValues(this.formEl); //O problema é que o caminho da imagem
        if (!values) return false;

        this.GetPhoto(this.formEl).then(
          (content) => {
            values.photo = content;

            this.insert(values);
            this.AddLine(values); //ele puxa os valores do get values no parametro

            btn.disabled = false;
            this.formEl.reset();
          },
          (e) => {
            console.error(e);
          }
        );
      }
    );
  }

  GetPhoto(formEl) {
    //prommisse para executar função assincrona
    //preparamos o código para 2 situações, o se funcionar ou se falhar
    //no caso o resolve ou reject, bem explicativo
    return new Promise((resolve, reject) => {
      let filereader = new FileReader(); // Colocar o arquivo no let
      let elements = [...formEl.elements].filter((item) => {
        //arrow function para achar um item específico do array
        if (item.name === "photo") {
          return item;
          //essa função verifica os campos e pega o valor do photo e retorna como item
        }
      });
      let file = elements[0].files[0]; //O arquivo do element é uma coleção, colocamos index 0 pra peggar o primeiro elemento
      filereader.onload = () => {
        //Onload é uma função anonima que executa algo após um retorno, nesse caso, o Item

        resolve(filereader.result);
      };
      filereader.onerror = (e) => {
        reject(e); //esse e retorna o evento do erro
      };
      if (file) {
        filereader.readAsDataURL(file); //ele le os dados como um caminho
      } else {
        resolve("dist/img/Kira.png");
      }
    });
  }

  GetValues(
    formEl /*Nesse caso é uma variável passada como parâmetro, e não o let que pega o id*/
  ) {
    let user = {}; //o Let cria uma var no escopo do método
    let isValid = true;

    /*Colocamos o this.formEl entre arrays para transformar em arrays, para assim o for each funcionar */
    [...formEl.elements].forEach(function (field, index) {
      //remoção do this para que o FOrmEl seja apenas uma variável
      if (
        ["name", "password", "email"].indexOf(
          field.name /*Nome do campo que passar pelo ForEAch*/
        ) > -1 &&
        !field.value /*field que conrtem os valores*/
      ) {
        field.parentElement.classList.add("has-error");

        //parentElement - A classe "pai", ou seja, que contém o form dos campos
        //classList - Conjunto de métodos entre eles o Add
        //haserroe é um template de erro do próprio curso, no caso uma classe CSS
        isValid = false; //retorna False para poder parar o envio do formulário
      }

      //pega todos os campos e  oara cada um executa um if
      /*Esse ... é o spread, ele serve para que não precisemos colocar o número exato de elemnentos de um array*/
      //esse if gender é para caso o campo gender esteja marcado como checked ele puxe os valores dos campos
      // o For Each passa por todos os campos do HTML(pos causa do Elements do FormsEl, que retorna os campos)
      //indexados
      if (field.name == "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else if (field.name == "admin") {
        user[field.name] = field.checked;
      } else {
        user[field.name] = field.value; //pega os valores mesmo sem check
      }
    });

    if (!isValid) {
      return false;
      //caso nao seja valido(campo vazio) ele para a execução do form
    }
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

  getUserStorage() {
    let users = [];

    if (localStorage.getItem("users")) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }

  selectAll() {
    let users = this.getUserStorage();
    users.forEach((dataUser) => {
      let user = new User();
      user.loadFromJSON(dataUser);
      this.AddLine(user);
      //O SelectALl pega a coleção do user storage e instancia, em seguida, essa instancia
      //recebe os valores do loadfromJSon(que se iguala a cada atributo do objeto json)
      // e em seguida manda pro addLine, que por sua vez irá mandar os valores recebidos
      //pelo parâmetro até a template string
    });
  }

  insert(data) {
    let users = this.getUserStorage();
    users.push(data);

    // sessionStorage.setItem("users", JSON.stringify(users)); //aqui é onde gera a chave e o valor,
    localStorage.setItem("users", JSON.stringify(users)); //aqui é onde gera a chave e o valor,
    // sendo o primeiro a chave e o segundo o valor
  }
  AddLine(dataUser) {
    let tr = this.getTr(dataUser); //o valor do let é o que aconteceu dentro do método ficou registrado nela

    this.TableEl.appendChild(tr);

    this.updateCount();
  }

  getTr(dataUser, tr = null) {
    if (tr === null) tr = document.createElement("tr"); //passamos tr como parâmetro opcional, para que caso
    //o user clique em editar e ele perceba que já há uma tr registrada, ele não crie
    //isso pq no editar não criamos uma tr, nos pegamos uma existente
    tr.dataset.user /*nome usado pra guardar, tipo uma var*/ = JSON.stringify(
      dataUser
    ); //valores recebidos
    //o JSON seirializa o obj(tranforma em string)

    tr.innerHTML =
      //Colocamos o TableId para ele receber o Id da tabela toda
      //inserir comanbdos no HTML
      `  
      <td><img src="${
        dataUser.photo
      }" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin ? "Yes Yes Yes!" : " No no no"}</td>
      <td>${Util.dateFormat(dataUser.register)}</td>
      <td>
        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
      </td>
    `;
    this.addEventsTR(tr);
    return tr;
  }
  addEventsTR(tr) {
    tr.querySelector(".btn-delete").addEventListener("click", (e) => {
      if (confirm("Deseja realmente deletar este usuário")) {
        tr.remove();
        this.updateCount();
      }
    });

    tr.querySelector(".btn-edit").addEventListener("click", (e) => {
      let json = JSON.parse(tr.dataset.user); //JSON são as propriedades de objetos porém não mais instanciados

      this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex; //seta o dado na tr do index, no caso, sua localização
      for (let name in json) {
        //name é a variável que recebe o nome da propriedade

        let field = this.formUpdateEl.querySelector(
          "[name= " + name.replace("_", "") + "]"
        );
        //aqui ele vai entrar no JSON, ir de propridade em propriedade e recebe os campos que tem um nome
        //igual ao que aparece no JSON, no caso a propriedade
        // o replace pega os _ e troca por nada

        if (field) {
          switch (field.type) {
            case "file":
              continue;

            case "radio":
              field = this.formUpdateEl.querySelector(
                "[name= " +
                  name.replace("_", "") +
                  "][value=" +
                  json[name] +
                  "]"
              );
              field.checked = true;
              break;

            //aqui ele sobreescreve a variável tornando o valor igual ao nome que ele está procurando

            case "checkbox":
              field.checked = json[name]; //os checkeds são convertidos em boolean, então isto vai manter o checked
              //feito igual a true então ele ficará marcado
              break;

            default:
              field.value = json[name];
          }

          //aqui nós afirmamos que o valor que o field vai receber é o do json na propriedade name
        }
      }
      this.formUpdateEl.querySelector(".photo").src = json._photo;

      //aqui nesse função foi criado um eventlistenner do botão de editar que quando é clicado retorna a tr
      //da linha que foi clicada
      this.showPanelUpdate();
      // this.showPanelUpdate();
    });
  }

  showPanelUpdate() {
    document.querySelector("#box-user-create").style.display = "none";
    document.querySelector("#box-user-update").style.display = "block";
  }

  showPanelCreate() {
    document.querySelector("#box-user-create").style.display = "block";
    document.querySelector("#box-user-update").style.display = "none";
  }

  updateCount() {
    //método que serve para contar as linhas
    let numberUsers = 0;
    let numberAdmins = 0;

    [...this.TableEl.children].forEach((tr) => {
      //ele entra dentro do array de tableEl(literalmente o HTML todo)
      //e pega os "filhos", e para cada filho ele aumenta um numero no let user caso seja cadastrado um user
      numberUsers++;
      let user = JSON.parse(tr.dataset.user);
      //o parse aqui converte a string em obj

      if (user._admin /* por padrão é true , o _admin vem do users/getters*/)
        numberAdmins++;
    });
    document.querySelector("#number-users-admin").innerHTML = numberAdmins;
    document.querySelector("#number-users").innerHTML = numberUsers;
  }
  // document.getElementById('table-user').appendChild(tr); //pegar a table do HTML
}
