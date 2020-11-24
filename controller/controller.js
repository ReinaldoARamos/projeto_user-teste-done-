class Controller {

    constructor(formId){
this.formEl = document.getElementById(formId)


    }

    GetValues(){

        this.formEl

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
        user.admin)

        //essa função foi criada para passar por todos os fields e pegar os valores


    }
}