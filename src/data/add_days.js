

export function addDaysToDate(date, days) {
    var result = new Date(date);
    var result1 = parseInt(days) -1;
    result.setDate(result.getDate() + result1);
    
    var newDateString = result.toISOString().split("T")[0];
    return newDateString;
  }
  
