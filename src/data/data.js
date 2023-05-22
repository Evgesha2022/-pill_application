

let data = require('../data.json');
//let i = data.length()
export function create_base_user(){
  var obj = new Object()

  obj = {id: Math.random().toString(36).substring(7),
      name: "",
      surname: "",
      birthday: "",
      tablets: []}
      document.location.reload();//так как локальное хранилище неизвестно что-то изменилось пока не перезапустить
  save_data_user(obj)
}
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
  export function save_data_user(obj)
  {
    var newJsonFileContent = JSON.stringify(obj);
  localStorage.setItem("user", newJsonFileContent);

    return localStorage.getItem('user')
  }
  export function post_data_profile(name, surname,birthday){

    var obj =     get_data()
    obj.name= name
    obj.surname=surname
    obj.birthday=birthday
    save_data_user(obj)
}


//console.log(get_data_profile(0))