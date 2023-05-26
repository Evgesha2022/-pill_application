

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
  //save_data_states(obj_state)
}
export function get_data_tablets(id){
    
    const result = data.parse;
    //console.log( result)
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

var minutes = (today.getMinutes().toString().length===1) ? "0"+today.getMinutes() : today.getMinutes();

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
    if(date >= startDate && date <= endDate) {
      element.times.forEach(function(element1){
        var addtablet=Object.assign([], element);

        addtablet.times=[element1]
        ans.push(addtablet)

      })
      };
  });
  ans.sort(function(a, b){
    var nameA=a.times[0].toLowerCase(), nameB=b.times[0].toLowerCase()
      if (nameA < nameB) {return -1}
      return 0 // Никакой сортировки
    // new Date(===a.times[0])- new Date(b.times[0])
  });
  return ans
}
 export function create_base_states(){
  var obj_state = new Object()
  obj_state =[]
  save_data_states(obj_state)
 }


export function save_data_states(obj)
  {
    var newJsonFileContent = JSON.stringify(obj);
  localStorage.setItem("states", newJsonFileContent);
  
    return localStorage.getItem('states')
  }
export function get_data_states(){

    var data = JSON.parse(localStorage.getItem('states'))
    const result = data;

    return result
}
export function add_new_state(obj){
  let data_states= get_data_states()
  data_states.push(obj)//{id: {time: , data: }, data: {time: } }

}
export function find_state(obj, state_all){
  var today = new Date();
  var foundItem = state_all.find(function(item) {
    var date = new Date(item.data);
    //console.log("id",item.id === obj.id)
    //console.log("date.getTime()", date.toLocaleDateString() );
    //console.log("data.getTime()", data.toLocaleDateString());

    var first_cond = item.id === obj.id && today.toLocaleDateString() === date.toLocaleDateString();
    var second_cond = item.times[0]===obj.times[0]
    
    return first_cond && second_cond;
  });
  //console.log("what found",foundItem )
  let index = state_all.indexOf(foundItem)

  return index;
}
export function delete_state(index, state_all){
  //console.log("index", index)
  state_all.splice(index, 1)
  console.log("delete")
  return state_all
}

export function array_states(tablets){
  var state_all =get_data_states()
  //console.log(state_all)
  var states_pills=new Array(tablets.length).fill(false)
  let i=0
  tablets.forEach(function(element) {
  let state = find_state(element, state_all)

    if (state!==-1) {states_pills[i]=true} 
    i++
  });
  
  return states_pills
}
//get_tablets_in_day( new Date())
//console.log(get_data_profile(0))