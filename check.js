function get_tablets_in_day(date)
{
  let tablets=[1,2, 3]
  let ans =[]
  tablets.forEach(function(element) {
    var startDate = new Date("2023-05-24");
    //startDate.setDate(startDate.getDate()-2)
    console.log(startDate)
    var endDate = new Date("2023-05-24");
    endDate.setDate(endDate.getDate()+1)
    if(date >= startDate & date <= endDate) {ans.push(element)};
  });
  return ans
}
console.log(get_tablets_in_day( new Date()))