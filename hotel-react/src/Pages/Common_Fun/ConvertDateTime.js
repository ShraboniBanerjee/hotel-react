import React, { useState, useEffect } from 'react'

function ConvertDateTime(get_date, data) {

  // date convert into format date for example date = 1-1-2023 then it will be converted into 01-01-2023
  // and also convert into year format like = 2023-01-01
  if (data === "time") {

    let time = get_date
    
    if (get_date.includes(".")) {

      time = get_date.split(".")[0]

    }

    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  else {
    let date = new Date(get_date)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (day <= 9) {
      day = '0' + day
    }
    if (month <= 9) {
      month = '0' + month
    }
    let convert
    if (data === "date") {


      convert = `${day}-${month}-${year}`
    }
    if (data === "year") {

      convert = `${year}-${month}-${day}`
    }

    return convert
  }
  
}


export default ConvertDateTime
