

let data = require('./data.json');
//let i = data.length()
export function get_data_tablets(id){
    
    const result = data.parse;
    console.log( result)
    return result
  }
  //export
  export function get_data(){
    var data = JSON.parse(localStorage.getItem('user'))
    const result = data;
    
    return result
  }
  export function save_data_user(obj){
  localStorage.setItem("user", obj);
    return localStorage.getItem('user')
  }
  export function post_data_profile(name, surname,birthday){
    var obj = new Object()
    obj = {id: Math.random().toString(36).substring(7),
        name: name,
        surname: surname,
        birthday: birthday,
        tablets: []}
    var newJsonFileContent = JSON.stringify(obj);
    return newJsonFileContent;
}


//console.log(get_data_profile(0))