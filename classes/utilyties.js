class Util {

    //static serve para tornar o método estático
    static dateFormat(date){
        //serve para retornar a data contatenando tudo
      
        
        return date.getDate() + '/' + (date.getMonth(/* mes começa no index 0, por isso o +1*/)+1) + "/" + date.getFullYear()  + ' Hour: ' + date.getHours() + ':'+ date.getMinutes(); 

    }
}