import {FixTypeError} from "./find_error"

export function addDaysToDate(date, days) {
    var result = new Date(date);
    var result1 = parseInt(days) -1;
    
    result.setDate(result.getDate() + result1);
    
    var newDateString = result.toISOString().split("T")[0];
    return newDateString;
  }
  

export function addDaysToDate_asist(date, days) {
    var result = new Date(date);

    var result1 = parseInt(days);
    result.setDate(result.getDate() + result1);
    
    var newDateString = result.toISOString().split("T")[0];
    return newDateString;
  }
  export function check_start(date1,  time){
    console.log(time)
    console.log(typeof time)
    
var date = new Date(date1);
var currentTime = new Date();
if(time){
  var timeParts= time.split(":")
  console.log("timeParts", timeParts)
  date.setHours(parseInt(timeParts[0], 10));
date.setMinutes(parseInt(timeParts[1], 10));
console.log("date_our" , date)

if (date < currentTime) {
  console.log("меньше")
  
  date.setDate(date.getDate() + 1);
  console.log(date)
  alert("меньше")
  return (date).toISOString().split("T")[0];
} else  {
  console.log("больше")
  alert("больше")
  return (date).toISOString().split("T")[0];
} }
else{ return (date).toISOString().split("T")[0];}

  }