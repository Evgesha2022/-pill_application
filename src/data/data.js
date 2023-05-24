

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
export function get_time(){
  var today = new Date();
var hours = (today.getHours().length<=1) ? "0"+today.getHours() : today.getHours();
console.log( today.getMinutes())
var minutes = (today.getMinutes().toString().length===1) ? "0"+today.getMinutes() : today.getMinutes();
console.log("minutes", minutes)
var timeWithoutSeconds = hours + ':' + minutes;
return timeWithoutSeconds
}
export function get_tablets_in_day(date)
{
  let data = get_data()
  let tablets=data.tablets

  let ans =[]
  tablets.forEach(function(element) {
    var startDate = new Date(element.start_date);
    var endDate = new Date(element.finish_date);
    startDate.setDate(startDate.getDate()-1)
    //console.log(date, startDate,endDate )
    //endDate.setDate(endDate.getDate()+1)
    if(date >= startDate && date <= endDate) {ans.push(element)};
  });
  console.log(ans)
  return ans
}
//get_tablets_in_day( new Date())
//console.log(get_data_profile(0))