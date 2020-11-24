class Controller {

    constructor(formId){
this.formEl = document.getElementById(formId)


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