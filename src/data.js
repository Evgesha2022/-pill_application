

let data = require('./data.json');
let i = data.length()
export function get_data_tablets(id){
    
    const result = data.parse;
    console.log( result)
    return result
  }
  //export
  export function get_data_profile(id){
  
    const result = data[id];

    return result
  }
  export function post_data_profile(name, surname){
    var obj = new Object()
    obj[i+1] = {id: 859,
        name: name,
        surname: surname,
        tablets: []}

    data.push(obj);

    var newJsonFileContent = JSON.stringify(data);
    return newJsonFileContent;
}
//console.log(get_data_profile(0))
console.log(post_data_profile('Рита', "Вавикова"))