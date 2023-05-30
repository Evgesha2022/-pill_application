import {addDaysToDate} from "./add_days"

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
export function get_time(today1){
let today = new Date(today1)
var hours = ((today.getHours()/10)<1) ? "0"+today.getHours() : today.getHours();
console.log(today.getHours().length, hours)
var minutes = (today.getMinutes().toString().length===1) ? "0"+today.getMinutes() : today.getMinutes();

var timeWithoutSeconds = hours + ':' + minutes;
return timeWithoutSeconds
}
export function add_tablet_base(id, name,period,  doza,date_start, finish_date, times, condition ){
  let data = get_data()
  //var finish_date = addDaysToDate(date_start, period)
  var tablet = new Object();
        tablet = {
            id: id,
            name:(name.charAt(0).toUpperCase() + name.slice(1)),
            doza:doza,
            start_date: date_start, 
            finish_date:finish_date,
            times: times,
            condition:(condition.charAt(0).toLowerCase() + condition.slice(1).toLowerCase()),
            period:period
        }
        data.tablets.push(tablet)
        console.log(typeof date_start)
        console.log( date_start)
        localStorage.setItem("user", data);
        save_data_user(data)
        //window.location.href = '/';
       // alert("Лекарство добавлено");
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

export function delete_all_pils(name){
  //console.log("index", index)
  let data = get_data()
  var data_tablets = new Array(data.tablets)
  var lowercaseName = name.toLowerCase(); // приводим искомое значение к нижнему регистру
  for (var i = 0; i < data_tablets.length; i++) {
    var lowercaseElement = data_tablets[i].name.toLowerCase(); // приводим текущий элемент массива к нижнему регистру
    if (lowercaseElement === lowercaseName) {
      data_tablets.splice(i, 1)
      console.log("delete_tablet")
      delete_tablets_in_states(data_tablets[i])
      data.tablets=data_tablets
      save_data_user(data)
      return data_tablets[i].id;
    }
  }
  console.log("not_found")
  return 0
}

export function delete_tablet_one_time(name, time){
  //console.log("index", index)
  let data = get_data()
  var data_tablets = new Array(data.tablets)
  var lowercaseName = name.toLowerCase(); // приводим искомое значение к нижнему регистру
  for (var i = 0; i < data_tablets.length; i++) {
    var lowercaseElement = data_tablets[i].name.toLowerCase(); // приводим текущий элемент массива к нижнему регистру
    if (lowercaseElement === lowercaseName) {
      for (var j = 0; j < data_tablets[i].times.length; i++){
        if(data_tablets[i].times[j]===get_time(time)){
          data_tablets[i].times.splice(j, 1)
          console.log("delete_tablet_one_time")
          data.tablets=data_tablets
          save_data_user(data)
          return data_tablets[i].id;
        }
      };
    }
  }
  console.log("not_found")
  return 0
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

export function delete_tablets_in_states(tablet){
  var state_all =get_data_states()
  
  var new_state_all = Object.assign([], state_all);
  let state = find_state(tablet, state_all)
  state_all.find(function(item) {

  var first_cond = item.id === tablet.id;
  console.log(item.id, tablet.id, first_cond )
    if(first_cond){new_state_all.splice(state_all.indexOf(item), 1); console.log("delete")}
  });
  console.log(new_state_all)
  save_data_states(new_state_all)
}

//get_tablets_in_day( new Date())
//console.log(get_data_profile(0))


export function check_finish_date(finish_date ) {

  var currentDate = new Date();
  var inputDate = new Date(finish_date);
  
  // Устанавливаем время сегодняшней даты в 00:00:00
  currentDate.setHours(0, 0, 0, 0);

  // Сравниваем дату со сегодняшней
  if (inputDate >= currentDate) {
    return true;
  } else {
    return false;
  }
}
