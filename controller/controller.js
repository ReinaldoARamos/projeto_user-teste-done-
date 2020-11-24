class Controller {

    constructor(formId){
this.formEl = document.getElementById(formId)


    }

    // -- >> OnSubmit executa o código quando algum botão for pressionado(EVent Listener de click*// 
    OnSubmit() {
        this.formEl.addEventListener("submit", /* function  removemos a function pois ela limita o escopo
         entao ela só recebe o evento(que no caso é o submit, e deixa ele pegar o método Get Values
            fora do escopo*/ (event) => {
            event.preventDefault(); //previne o refresh no envio de formulário
            
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
}