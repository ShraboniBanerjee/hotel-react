import React, { useState, useEffect } from 'react';
import adminLayout from "../../hoc/adminLayout"
// make sure you include the timeline stylesheet or the timeline will not be styled
import '../../assets/css/app.css'
import rate_style from "../../assets/css/rates.module.css"
import Loading from '../../images/Loading';
import prev from '../../assets/images/prev.png'
import next from '../../assets/images/next.png'
import add_file from '../../assets/images/add_file.png'
import room_type_edit from '../../assets/images/room_type_edit.png'
import trash from '../../assets/images/trash.png'
import { Link, useNavigate } from 'react-router-dom';
import AlertDismissible from '../Common_Fun/AlertDismissible';

function Availability_Matrix(props) {
  const [getrequest, setGetrequest] = useState("yes")
  const [roomtype, setRoomtype] = useState({})
  const [all_day, setAll_day] = useState([])
  const [input, setInput] = useState('')
  const [alloted, setAlloted] = useState('')
  const [min_Los, setMin_Los] = useState('')
  const [max_Los, setMax_Los] = useState('')
  const [default_room_type, setDefault_room_type] = useState([])
  const [room_price, setRoom_price] = useState('')
  const [loading, setLoading] = useState(true)
  const [disable, setDisable] = useState(true)
  const [date_check, setDate_check] = useState([])
  const [available_dates, setAvailable_dates] = useState([])
  const [rates_data, setRates_data] = useState([])
  const [model, setModel] = useState('none')
  const [edit_select, setEdit_select] = useState('')
  const [edit_off, setEdit_off] = useState(true)
  const [show_date, setShow_date] = useState(false)
  const [full_mode, setFull_mode] = useState("low_size")
  const [backend_date, setBackend_date] = useState('')
  const [confirm_date, setConfirm_date] = useState('')
  const [date_array, setDate_array] = useState([])
  const [add_rate_con, setAdd_rate_con] = useState(false)
  const [weekday, setWeekday] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
  const [week_value, setWeek_value] = useState()
  const [delete_this, setDelete_this] = useState(false)
  const [addrate, setAddrate] = useState(true)
  const [color_change, setColor_change] = useState([])
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('danger')
  const [permission, setPermission] = useState([])
  const navigate = useNavigate();
  const checkToken = () => {
    if (localStorage.getItem("logintoken")) {
      // get token and do anything
      if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
        localStorage.removeItem("logintoken")
        window.location.href = "/login";
      }
    }
  }

  const add_rate = () => {
    setAddrate(false)
    setFull_mode('full_size')
    setShow_date(true)
    setDisable(true)

    let data = year_data(room_price, rates_data, backend_date, available_dates, "add")
    setMin_Los(data.max_los)
    setMax_Los(data.min_los)
    setInput(data.rent)

    setAlloted(data.alloted_all)
    Object.keys(data.rent).map((rate_key) => {
      let Accommodation_key = document.getElementById(`Accommodation_${rate_key}`)
      let closed_arrival_key = document.getElementById(`Arrival_${rate_key}`)
      let closed_departure_key = document.getElementById(`Departure_${rate_key}`)
      if (Accommodation_key !== null) {
        Accommodation_key.checked = false
        closed_departure_key.checked = false
        closed_arrival_key.checked = false
      }
    })
    setAlloted(available_dates)
  }

  let property = localStorage.getItem("property")
  const updateRates = async () => {
    setGetrequest('no')
    checkToken()
    const token = (JSON.parse(localStorage.getItem("logintoken")))
    const url = `${props.url}matrix_rates/${property}/`
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + token['token']
      },
    })
    let parsedata = await data.json()
    console.log(parsedata)
    setPermission(parsedata.page_permissions)
    setRoomtype(parsedata.room_types)
    setDefault_room_type(parsedata.room_types[0].room_all_type)

    setInput(parsedata.room_types[0].room_rate)
    setAvailable_dates(parsedata.available_dates)
    setAlloted(parsedata.available_dates)
    setRoom_price(parsedata.room_types[0].room_rate)
    setRates_data(parsedata.rates_data)
    setLoading(false)
    setBackend_date(parsedata.today)
    let return_data = year_data(parsedata.room_types[0].room_rate, parsedata.rates_data, parsedata.today, parsedata.available_dates)
    setMin_Los(return_data.min_los)
    setMax_Los(return_data.max_los)
    setInput(return_data.rent)
    setConfirm_date(parsedata.today)
    let get_data = get_condition("disable_data", parsedata.rates_data)
    let price_array = Object.keys(get_data.get_price)
    checkbox_condition(price_array, get_data)

    // edit_select_fun("disable_data", parsedata.rates_data, parsedata.available_dates, parsedata.room_types[0].room_rate)

  }

  const backend_data = (date) => {
    return date
  }

  function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365;
  }

  const year_data = (room_rent, room_data, today, alloted_all, add_con = null) => {
    var date = new Date(today);

    var current_month = date.getMonth();
    var current_year = date.getFullYear();
    var current_date = date.getDate();


    const dString = `${current_date}.${current_month}.${current_year}`;
    const days = daysInYear(current_year);

    let [day, month, year] = dString.split('.');

    const month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



    // month - 1 as month in the Date constructor is zero indexed
    const now = new Date(year, month, day);
    let year_dates = []
    let new_year = { "Room_type": [], "Room_name": [], "Amount Alloted for sale": [], "Remaining Inventory": [], "Min Los": [], "Max Los": [], "Accommodation Blocked": [], "Closed To Arrival": [], "Closed to Departure": [], "dates_val": [], "month_&_year": [] }
    let loopDay = now;
    let rent = {}

    let month_con
    let year_con
    let date_con
    let values
    let min_los = {}
    let max_los = {}



    for (let i = 0; i <= days; i++) {


      if (i === 0) {
        loopDay.setDate(loopDay.getDate());

      }
      else {
        loopDay.setDate(loopDay.getDate() + 1);
      }

      month_con = loopDay.getMonth() + 1
      year_con = loopDay.getFullYear()
      date_con = loopDay.getDate()


      if (date_con <= 9) {
        date_con = "0" + date_con
      }
      if (month_con <= 9) {
        month_con = "0" + month_con
      }


      let date_format = `${date_con}-${month_con}-${year_con}`

      values = {}

      let get_data = get_condition("get_data", room_data)

      let price_array = Object.keys(get_data.get_price)

      if (price_array.includes(date_format)) {
        rent[date_format] = parseInt(get_data.get_price[date_format])
        min_los[date_format] = get_data.get_min_los[date_format]
        max_los[date_format] = get_data.get_max_los[date_format]
        alloted_all[date_format] = get_data.alloted_amount[date_format]
      }
      else {
        rent[date_format] = room_rent
        min_los[date_format] = 0
        max_los[date_format] = 0
      }

      if (add_con !== null) {

        rent[date_format] = room_rent
        min_los[date_format] = 0
        max_los[date_format] = 0
      }

      values[date_format] = 200

      setDate_array(date_format)

      new_year["Room_name"].push(values)
      new_year["dates_val"].push(date_format)

      let full_year = loopDay.getFullYear()
      let convert_str = loopDay.toDateString()

      let name = month_name[loopDay.getMonth()];

      var ret = convert_str.replace(full_year, '');
      let year_date = ret.replace(name, '')
      let year_dataA = year_date.replace('  ', ' ')
      let year_dataB = year_dataA.replace(' ', '/')

      year_dates.push(year_date)


      new_year["Room_type"].push(year_date)
      //  new_year["Room_name"].push(`Room_${i}`)



      let year_and_month = `${name}/${year_con}`

      new_year["month_&_year"].push(year_and_month)
      new_year["Amount Alloted for sale"].push(5)
      new_year["Remaining Inventory"].push(i)
      new_year["Min Los"].push(`Min_${i}`)
      new_year["Max Los"].push(`Max_${i}`)
      new_year["Accommodation Blocked"].push(`Accommodation_${date_format}`)
      new_year["Closed To Arrival"].push(`Arrival_${date_format}`)
      new_year["Closed to Departure"].push(`Departure_${date_format}`)
    }

    let ke = Object.keys(new_year).length

    setAll_day(new_year)
    let return_data = { "rent": rent, "min_los": min_los, "max_los": max_los, con: "yes", "alloted_all": alloted_all }
    return return_data

  }

  useEffect(async () => {

    // Update the document title using the browser API
    if (getrequest === "yes") {
      updateRates()
    }
  },);

  function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return new Date(format);
  }
  const selectfun = async (e) => {
    checkToken()

    let property = localStorage.getItem("property")


    const token = (JSON.parse(localStorage.getItem("logintoken")))
    const url = `${props.url}matrix_rates/${property}/`
    setLoading(true)
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + token['token']
      },
      body: JSON.stringify({
        option: "show_room_type",
        room_type: e.target.value
      }),
    })
    let parsedata = await data.json()

    setBackend_date(parsedata.today)
    setAvailable_dates(parsedata.available_dates)
    let return_data = year_data(parsedata.room_rent, parsedata.rates_data, parsedata.today, parsedata.available_dates)
    setMin_Los(return_data.min_los)
    setMax_Los(return_data.max_los)
    setInput(return_data.rent)
    setDefault_room_type(e.target.value)
    setAlloted(return_data.alloted_all)
    let get_data = get_condition("disable_data", parsedata.rates_data)
    let price_array = Object.keys(get_data.get_price)
    checkbox_condition(price_array, get_data)
    setLoading(false)
  }


  const date = (get_start_date = null, get_end_date = null) => {



    let continue_condition = true

    let start_date
    let end_date

    if (get_start_date === "no" || get_start_date === "no") {
      start_date = document.getElementById('startdate').value
      end_date = document.getElementById('enddate').value

    }
    else {
      start_date = get_start_date
      end_date = get_end_date
    }



    if (start_date === '' || end_date === '') {
      continue_condition = false
    }

    if (edit_off === false) {
      continue_condition = false

    }

    if (continue_condition) {

      let year_day = new Date(start_date)
      var current_year = year_day.getFullYear();
      const days = daysInYear(current_year);
      let start_date_gap = new Date(start_date)
      let end_date_gap = new Date(end_date)

      start_date_gap = dateFormat(start_date_gap, "MM-dd-yyyy")
      end_date_gap = dateFormat(end_date_gap, "MM-dd-yyyy")
      const diffTime = Math.abs(end_date_gap - start_date_gap);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (start_date_gap < end_date_gap) {

        if (diffDays <= days) {

          let dates_val = {}

          let new_date = start_date_gap + 1
          new_date = new Date(start_date_gap)
          let all_dates = []

          let continue_weekday = false
          let check_week
          let set_according_day = []


          weekday.map((day, i) => {
            check_week = document.getElementById(`week_${i}`)
            if (check_week !== null) {
              if (check_week.checked) {
                continue_weekday = true
                set_according_day.push(i)

              }
            }
          })

          let select_date_format = []
          for (let day = 0; day <= diffDays; day++) {

            if (day === 0) {
              new_date.setDate(new_date.getDate());

            }
            else {
              new_date.setDate(new_date.getDate() + 1);
            }

            console.log(new_date.getDay())



            var con_month = new_date.getMonth() + 1;
            var con_year = new_date.getFullYear();
            var con_date = new_date.getDate();

            if (con_date <= 9) {
              con_date = "0" + con_date
            }
            if (con_month <= 9) {
              con_month = "0" + con_month
            }

            let date_format = `${con_date}-${con_month}-${con_year}`
            dates_val[date_format] = room_price
            all_dates.push(date_format)



            if (continue_weekday) {
              if (set_according_day.includes(new_date.getDay())) {
                input[date_format] = week_value
                select_date_format.push(date_format)
              }
            }

          }
          console.log(select_date_format)
          setColor_change(select_date_format)
          setDate_check(all_dates)
          setDisable(false)

        }
      }

    }
  }

  //   const [employeeData, setEmployeeData] = React.useState(new_data)

  const onChange = (e, employeeId) => {
    const { name, value } = e.target

    // const editData = employeeData.map((item) =>
    //   item.employeeId === employeeId && name ? { ...item, [name]: value } : item
    // )

    // setEmployeeData(editData)
  }

  const update_and_submit = () => {
    let available_dates = date_check
    let Accommodation_Blocked_check = {}
    let Arrival_check = {}
    let Departure_check = {}
    available_dates.map((e) => {
      let Accommodation_Blocked = document.getElementById(`Accommodation_${e}`)
      let Arrival = document.getElementById(`Arrival_${e}`)
      let Departure = document.getElementById(`Departure_${e}`)

      if (Accommodation_Blocked !== null) {
        if (Accommodation_Blocked.checked === true) {
          Accommodation_Blocked_check[Accommodation_Blocked.id] = "true"
        }
        else {
          Accommodation_Blocked_check[Accommodation_Blocked.id] = "false"
        }

        if (Arrival.checked === true) {
          Arrival_check[Arrival.id] = "true"
        }
        else {
          Arrival_check[Arrival.id] = "false"
        }

        if (Departure.checked === true) {
          Departure_check[Departure.id] = "true"
        }
        else {
          Departure_check[Departure.id] = "false"
        }
      }
    })

    let all_input_key = Object.keys(input)
    all_input_key.map((input_key) => {
      if (available_dates.includes(input_key) === false) {
        delete input[input_key]
        delete min_Los[input_key]
        delete max_Los[input_key]
        delete alloted[input_key]
      }
    })


    let day_rate = JSON.stringify(input)
    let amount_alloted = JSON.stringify(alloted)
    let min_los = JSON.stringify(min_Los)
    let max_los = JSON.stringify(max_Los)

    let start_date
    let end_date
    if (document.getElementById('startdate') === null) {
      start_date = 0
      end_date = 0
    } else {
      start_date = document.getElementById('startdate').value
      end_date = document.getElementById('enddate').value
    }
    let closed_departure = JSON.stringify(Departure_check)
    let closed_arrivals = JSON.stringify(Arrival_check)
    let accommodation_blocked = JSON.stringify(Accommodation_Blocked_check)
    let room_rent = room_price
    let local_room_type = default_room_type
    let total_days = available_dates.length

    let values = {
      option: "save_data",
      "start_date": start_date,
      "end_date": end_date,
      "min_los": min_los,
      "copy_interval": "false",
      "max_los": max_los,
      "closed_arrivals": closed_arrivals,
      "closed_departure": closed_departure,
      "day_rate": day_rate,
      "room_rent": room_rent,
      "local_room_type": local_room_type,
      "extra_charge_rs": 0,
      "extra_charge": false,
      "total_days": total_days,
      "amount_alloted": amount_alloted,
      "accommodation_blocked": accommodation_blocked
    }

    return values
  }

  const submit = async () => {


    checkToken()

    let property = localStorage.getItem("property")

    let rate_data = update_and_submit()

    const token = (JSON.parse(localStorage.getItem("logintoken")))
    const url = `${props.url}matrix_rates/${property}/`

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + token['token']
      },
      body: JSON.stringify(rate_data),
    })

    let room_data = await data.json()
    setMsg(room_data.msg)
    if (room_data.msg === "data Successfully added") {
      setMsgType('success')
    }
  }

  const update = async () => {
    let value = update_and_submit()
    delete value["start_date"]
    delete value["end_date"]
    delete value["option"]
    delete value["copy_interval"]


    checkToken()

    let property = localStorage.getItem("property")

    const token = (JSON.parse(localStorage.getItem("logintoken")))
    const url = `${props.url}matrix_rates/${property}/${edit_select}/`

    let data = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + token['token']
      },
      body: JSON.stringify(value),
    })

    let room_data = await data.json()
    setMsg('data update successfully')
    setMsgType('success')
    setTimeout(() => {
      // window.location.reload(true)
      navigate(0);
    }, 6000)


  }

  const format_date = (get_date, data) => {

    let date = new Date(get_date)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (day < 9) {
      day = '0' + day
    }
    if (month < 9) {
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

  const get_condition = (msg, rate_data) => {

    let get_price = {}
    let get_price_key
    let alloted_amount = {}
    let get_min_los = {}
    let get_max_los = {}
    let get_accommodation = {}
    let get_closed_departure = {}
    let get_closed_arrivals = {}
    let start_date_data
    let end_date_data
    let filter_data
    //  setEdit_select
    if (msg === "show_data") {
      filter_data = rates_data.filter(my_id => my_id.id === edit_select)
    }
    else {
      filter_data = rate_data
    }

    let get_price_array = []
    let alloted_amount_array = []
    let get_min_los_array = []
    let get_max_los_array = []
    let get_accommodation_array = []
    let get_closed_departure_array = []
    let get_closed_arrivals_array = []



    filter_data.map((data, i) => {
      start_date_data = data.start_date
      end_date_data = data.end_date
      if (msg === "show_data") {
        get_price = JSON.parse(data.day_rate)
        alloted_amount = JSON.parse(data.amount_alloted)
        get_min_los = JSON.parse(data.min_los)
        get_max_los = JSON.parse(data.max_los)
        get_accommodation = JSON.parse(data.accommodation_blocked)
        get_closed_departure = JSON.parse(data.closed_departure)
        get_closed_arrivals = JSON.parse(data.closed_arrivals)
      }
      else {
        get_price_array.push(JSON.parse(data.day_rate))
        alloted_amount_array.push(JSON.parse(data.amount_alloted))
        get_min_los_array.push(JSON.parse(data.min_los))
        get_max_los_array.push(JSON.parse(data.max_los))
        get_accommodation_array.push(JSON.parse(data.accommodation_blocked))
        get_closed_departure_array.push(JSON.parse(data.closed_departure))
        get_closed_arrivals_array.push(JSON.parse(data.closed_arrivals))
      }
    })


    if (msg !== "show_data") {
      get_price_array.map((price_data, count) => {
        get_price = Object.assign({}, get_price, price_data);
        alloted_amount = Object.assign({}, alloted_amount, alloted_amount_array[count]);
        get_min_los = Object.assign({}, get_min_los, get_min_los_array[count]);
        get_max_los = Object.assign({}, get_max_los, get_max_los_array[count]);
        get_accommodation = Object.assign({}, get_accommodation, get_accommodation_array[count]);
        get_closed_departure = Object.assign({}, get_closed_departure, get_closed_departure_array[count]);
        get_closed_arrivals = Object.assign({}, get_closed_arrivals, get_closed_arrivals_array[count]);
      })
    }

    let all_get = {
      "get_price": get_price, "alloted_amount": alloted_amount,
      "get_min_los": get_min_los, "get_max_los": get_max_los,
      "get_accommodation": get_accommodation, "get_closed_departure": get_closed_departure,
      "get_closed_arrivals": get_closed_arrivals, "start_date_data": start_date_data,
      "end_date_data": end_date_data, "filter_data": filter_data
    }

    return all_get

  }

  const edit_select_fun = (msg, rate_data = null, alloted_all = null, room_type_rate = null) => {

    if (msg === "show_data") {
      setModel('none')
      setEdit_off(false)
    }
    // let return_data = year_data(room_price, rates_data, backend_date)

    let all_get = get_condition("show_data", rate_data)

    if (msg === "show_data") {

      if (document.getElementById('startdate') !== null) {
        document.getElementById('startdate').value = format_date(all_get.start_date_data, 'year')
        document.getElementById('enddate').value = format_date(all_get.end_date_data, 'year')
        console.log(document.getElementById('enddate').value, ":::")
      }
      console.log(document.getElementById('enddate'), ":::")
    }


    let get_price_key = Object.keys(all_get.get_price)
    let input_keys = Object.keys(input)
    let rent_data = input
    let min_los_data = min_Los
    let max_los_data = max_Los
    let alloted_data
    if (msg === "show_data") {
      alloted_data = alloted
    }
    else {
      alloted_data = alloted_all
    }
    input_keys.map((key) => {

      let Accommodation_key = document.getElementById(`Accommodation_${key}`)
      let closed_arrival_key = document.getElementById(`Arrival_${key}`)
      let closed_departure_key = document.getElementById(`Departure_${key}`)

      if (Accommodation_key !== null) {
        Accommodation_key.checked = false
        closed_departure_key.checked = false
        closed_arrival_key.checked = false
      }
    })

    console.log("---", msg)

    if (msg !== "show_data") {

      input_keys.map((show_datas) => {
        let sss = new Date(show_datas)
        console.log("033", sss)
        rent_data[show_datas] = room_type_rate
      })
    }

    checkbox_condition(get_price_key, all_get,)

    setMin_Los(min_los_data)
    setMax_Los(max_los_data)
    setInput(rent_data)
    setAlloted(alloted_data)
    console.log(msg)
    if (msg === "show_data") {
      console.log("---", all_get.start_date_data)
      date(all_get.start_date_data, all_get.end_date_data)
    }
  }


  const checkbox_condition = (get_price_key, all_get) => {

    get_price_key.map((get_data) => {
      let Accommodation_id = document.getElementById(`Accommodation_${get_data}`)
      let closed_arrival_id = document.getElementById(`Arrival_${get_data}`)
      let closed_departure_id = document.getElementById(`Departure_${get_data}`)



      if (Accommodation_id !== null) {
        if (all_get.get_accommodation[`Accommodation_${get_data}`] === "true") {

          Accommodation_id.checked = true
        }
        else {
          Accommodation_id.checked = false
        }
        if (all_get.get_closed_departure[`Departure_${get_data}`] === "true") {
          closed_departure_id.checked = true

        }
        else {
          closed_departure_id.checked = false
        }
        if (all_get.get_closed_arrivals[`Arrival_${get_data}`] === "true") {
          closed_arrival_id.checked = true
        }
        else {
          closed_arrival_id.checked = false
        }

      }



    })

  }


  function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);

    return date;
  }

  const next_prev = async (send_type) => {

    checkToken()
    console.log(confirm_date)
    let property = localStorage.getItem("property")
    let date = new Date(backend_date)
    let new_date = confirm_date

    let format = format_date(date, 'year')

    const token = (JSON.parse(localStorage.getItem("logintoken")))
    const url = `${props.url}matrix_rates/${property}/`
    setLoading(true)
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + token['token']
      },
      body: JSON.stringify({
        backend_date: format,
        option: "next_prev",
        goto: send_type,
        room_type: default_room_type

      }),
    })
    let parsedata = await data.json()

    let kskk = new Date(parsedata.today)

    console.log(new_date, kskk)

    let start_date_gap = dateFormat(kskk, "MM-dd-yyyy")
    let end_date_gap = dateFormat(confirm_date, "MM-dd-yyyy")
    const diffTime = Math.abs(end_date_gap - start_date_gap);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(diffDays)

    if (start_date_gap >= end_date_gap) {
      setEdit_off(true)
      console.log(start_date_gap, "----==", end_date_gap)
    }
    else {
      setEdit_off(false)
    }
    setBackend_date(parsedata.today)
    setAvailable_dates(parsedata.available_dates)
    let return_data = year_data(parsedata.room_types[0].room_rate, parsedata.rates_data, parsedata.today, parsedata.available_dates)
    setMin_Los(return_data.min_los)
    setMax_Los(return_data.max_los)
    setInput(return_data.rent)
    setAlloted(return_data.alloted_all)
    let get_data = get_condition("disable_data", parsedata.rates_data)
    let price_array = Object.keys(get_data.get_price)
    checkbox_condition(price_array, get_data)
    setLoading(false)
  }

  const delete_it = () => {
    setDelete_this(true)
    setModel('block')
  }

  const delete_id = async () => {
    setModel('none')
    checkToken()

    let property = localStorage.getItem("property")

    const token = (JSON.parse(localStorage.getItem("logintoken")))
    const url = `${props.url}matrix_rates/${property}/${edit_select}/`

    let data = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + token['token']
      },
    })
  }

  const edit_it = () => {
    setFull_mode('ultra_low')
    setDelete_this(false)
    setModel('block')
  }

  const msgFun =()=>{
    setMsg('')
  }

  return (<>

    {msg !== '' && <AlertDismissible msgFun={msgFun} time={6} type={msgType} msg={msg} />}
    {loading ? <Loading /> : <div className={`${full_mode === "low_size" ? rate_style.border_title : full_mode === "full_size" ? rate_style.border_title1 : rate_style.border_title2}`}>

      {/* model start */}




      <div className="modal active" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ display: model }}>
        <form action="" method="POST" className="my-5">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{delete_this ? <>Delete</> : <>Edit</>} Matrix Rates </h5>
                <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { setModel('none'); setFull_mode('low_size') }}>
                  <span aria-hidden="true">&times;</span>
                </span>
              </div>
              <div className="modal-body">
                <h2>Please Select the date for {delete_this ? <>Delete Rate</> : <>Edit Rate</>}</h2>
                {model !== "none" && rates_data.map((e) => {
                  return <div className="form-check">
                    <input onClick={() => { setEdit_select(e.id) }} className="form-check-input" type="radio" name="date_select" id={`edit_${e.id}`} />
                    <label className="form-check-label" htmlFor={`edit_${e.id}`}>
                      from {format_date(e.start_date, "date")} to {format_date(e.end_date, "date")}
                    </label>
                  </div>
                })}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => { delete_this ? delete_id() : edit_select_fun("show_data") }} className="btn btn-primary">{delete_this ? <>Delete Rate</> : <>Edit Rate</>}</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { setModel('none'); setFull_mode('low_size') }}>close</button>
              </div>
            </div>
          </div>
        </form>

      </div>

      {/* model end */}


      {edit_off &&

        <div>
          <div className={` ${rate_style.border_set}`}>
            <div className={`row mb-3`}>
              {show_date && <>
                <div className="col-2">
                  <div className="form-group">
                    <label htmlFor="example">Start Date</label>
                    <input style={{ color: "white" }} placeholder="Select date" onChange={() => { date("no", "no") }} type="date" id="startdate" className="form-control ratein" required />
                  </div>
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <label htmlFor="example">End Date</label>
                    <input style={{ color: "white" }} placeholder="Select date" onChange={() => { date("no", "no") }} type="date" id="enddate" className="form-control ratein" required />
                  </div>
                </div></>}
              <div className="col-2">
                <h5 className=''>Select Room Type</h5>
                <div className="select">
                  <select onChange={selectfun} aria-label="Default select example">
                    {roomtype.map((element) => { return <option selected={element.room_all_type === default_room_type && element.room_all_type} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
                  </select>
                </div>
              </div>
              {permission.includes('send') &&
                <>
                  {addrate &&
                    <div className="col-2 mt-4">
                      <label className={` ${rate_style.button_sub} `} htmlFor="add_rate">Add rate <img className={`${rate_style.add_file}`} src={add_file} alt="" /></label>
                      <input style={{ display: "none" }} onClick={() => { add_rate() }} type="button" id="add_rate" />
                      {/* <button type='button'  >Add rate</button> */}
                    </div>
                  }             </>
              }
              {permission.includes('edit') &&
                <div className="col-2 mt-4">
                  <label className={` ${rate_style.button_sub} `} htmlFor="edit_rate">Edit rate <img className={`${rate_style.add_file}`} src={room_type_edit} alt="" /></label>
                  <input style={{ display: "none" }} onClick={() => { edit_it() }} type="button" id="edit_rate" />

                  {/* <button type='button' className={`btn ${rate_style.button_sub} btn-danger`} onClick={() => { setModel('block') }}>Edit</button> */}
                </div>
              }
              {permission.includes('delete') &&
                <div className="col-2 mt-4">
                  <label className={` ${rate_style.button_sub} `} htmlFor="delete_rate">Delete <img className={`${rate_style.add_file}`} src={trash} alt="" /></label>
                  <input style={{ display: "none" }} onClick={() => { delete_it() }} type="button" id="delete_rate" />

                  {/* <button type='button' className={`btn ${rate_style.button_sub} btn-danger`} onClick={() => { setModel('block') }}>Edit</button> */}
                </div>
              }



            </div>

            {show_date && <div className="row">
              {weekday.map((day, i) => {
                return <div className="col-1 mx-2">
                  <div style={{ marginLeft: "20px" }} className="form-check">
                    <input className="form-check-input" type="checkbox" value={day} id={`week_${i}`} />
                    <label class="form-check-label" for={`week_${i}`}>
                      {day}
                    </label>
                  </div>
                </div>
              })}
              <div className="col mx-4">
                <input type="number" className={`${rate_style.input_day}`} onChange={(e) => { setWeek_value(e.target.value) }} value={week_value} id='weekday' />
              </div>
            </div>}
          </div>
        </div>}




      <div style={{ maxWidth: `${full_mode === "low_size" ? '1240px' : full_mode === "full_size" ? '1225px' : '1240px'}`, width: `${full_mode === "low_size" ? '1240px' : full_mode === "full_size" ? '1225px' : '1240px'}`, height: "550px", overflowX: "scroll" }}>
        {Object.keys(all_day).map((th, count) => {
          return <div style={{ display: 'block', background: model === "none" ? (count === 0 ? "#1e90ff" : "rgb(244,245,249)") : count === 0 ? "rgb(18,86,153)" : "rgb(146,147,149)" }}>
            <div className='row'>

              {(th !== "month_&_year" && th !== "dates_val") && <div className="d-flex" style={{ position: "relative;" }}>
                <div style={{ width: "100px !important", display: "block" }} >
                  <div className={`${count == 0 ? rate_style.fixed2 : count == 8 ? rate_style.fixed3 : rate_style.fixed}`} style={{ width: "200px", background: (model === "none" ? (count === 0 ? "#1e90ff" : "rgb(244,245,249)") : (count === 0 ? "#125699" : "rgb(88,88,89)")) }}><b>{th === "Room_name" ? default_room_type : (th !== "month_&_year" && th !== "dates_val") && th}</b></div>
                </div>
                <div style={{ marginLeft: "240px" }} className="d-flex">
                  {all_day[th].map((day, i) => {
                    return <>
                      <div className={`w-75 p-3  ${th === "Room_type" && rate_style.bold} ${th !== "Room_type" && (color_change.includes(all_day["dates_val"][i]) && rate_style.color_change)}  `}>
                        <div style={{ width: "60px", textAlign: "center" }}>
                          {(th === "Room_type") ? <>{parseInt(i + 1) % 7 === 0 && <b>{all_day["month_&_year"][i]}</b>} <br /><b>{all_day["Room_type"][i]}</b> </> :
                            (th === "Room_name") ? <> <input className={`${rate_style.input}`} type="number" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} value={input[all_day["dates_val"][i]]} id={all_day["dates_val"][i]} onChange={(e) => { setInput({ ...input, [e.target.id]: e.target.value }) }} />  </> :
                              (th === "Amount Alloted for sale") ? <input className={`${rate_style.input}`} type="number" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} value={alloted[all_day["dates_val"][i]]} id={all_day["dates_val"][i]} onChange={(e) => { setAlloted({ ...alloted, [e.target.id]: e.target.value }) }} /> :
                                (th === "Remaining Inventory") ? available_dates[all_day["dates_val"][i]] :
                                  (th === "Min Los") ? <input className={`${rate_style.input}`} type="number" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} value={min_Los[all_day["dates_val"][i]]} id={all_day["dates_val"][i]} onChange={(e) => { setMin_Los({ ...min_Los, [e.target.id]: e.target.value }) }} /> :
                                    (th === "Max Los") ? <input className={`${rate_style.input}`} type="number" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} value={max_Los[all_day["dates_val"][i]]} id={all_day["dates_val"][i]} onChange={(e) => { setMax_Los({ ...max_Los, [e.target.id]: e.target.value }) }} /> :
                                      (th === "Accommodation Blocked") ?
                                        <div style={{ marginLeft: "20px" }} className="form-check">
                                          <input className="form-check-input" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} type="checkbox" value="" id={`${all_day["Accommodation Blocked"][i]}`} />
                                        </div> :
                                        (th === "Closed To Arrival") ?
                                          <div style={{ marginLeft: "20px" }} className="form-check">
                                            <input className="form-check-input" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} type="checkbox" value="" id={`${all_day["Closed To Arrival"][i]}`} />
                                          </div> :
                                          (th === "Closed to Departure") ?
                                            <div style={{ marginLeft: "20px" }} className="form-check">
                                              <input className="form-check-input" disabled={disable ? "disable" : !date_check.includes(all_day["dates_val"][i]) && "disable"} type="checkbox" value="" id={`${all_day["Closed to Departure"][i]}`} />
                                            </div> :
                                            <></>
                          }
                        </div>
                      </div>
                    </>
                  })}
                </div>
              </div>}
            </div>
          </div>
        })}
      </div>

      <div className={`row ${rate_style.bottom}`}>
        <div className="col">
          <label className={`${rate_style.pre_btn}`} htmlFor="prev"><img className='mx-2' src={prev} alt="" />Previous year</label>
          <input type="button" style={{ display: "none" }} id="prev" onClick={() => { next_prev("prev") }} />
          {/* <button onClick={()=>{next_prev("prev")}}  type='button'>prev</button> */}
        </div>
        <div className="col">
          {disable === false && <button type="button" onClick={edit_off ? submit : update} className={`${rate_style.button_update}`}>{edit_off ? <>submit</> : <>update</>}</button>}
        </div>
        <div className="col">
          <label className={`${rate_style.next_btn}`} htmlFor="next">Next year<img className='mx-2' src={next} alt="" /></label>
          <input type="button" style={{ display: "none" }} id="next" onClick={() => { next_prev("next") }} />
          {/* <button onClick={()=>{next_prev("next")}} type='button'>next</button> */}
        </div>
      </div>

      {/* <div>
<button onClick={myfun}>my button</button>
</div>
{roomtype.map((e,i)=>{return <> 
<Timeline style={{textAlign:"center"}}
      groups={[{id:e.id,title: `${e.room_all_type}`},{id:`min_${i}`, title: `Min los`},{id:`max_${i}`, title:'Max los'},{id:`accommodation_${i}` ,title:'Accommodation Blocked'},{id:`CTA_${i}`,title: `Closed to Arrival`},{id:`CTD_${i}`, title: `Closed to Departure`}]}
      items={[{group:e.id,start_time:moment(),end_time:moment().add(1, 'day'), id:i,title: `${e.room_all_type}`},{group:`min_${i}`,start_time:moment(),end_time:moment().add(1, 'day'),id:`min_${i}`, title: `Min los`},{id:`max_${i}`, title:'Max los'},{id:`accommodation_${i}` ,title:'Accommodation Blocked'},{id:`CTA_${i}`,title: `Closed to Arrival`},{id:`CTD_${i}`, title: `Closed to Departure`}]}
      defaultTimeStart={startOfWeek}
      defaultTimeEnd={endOfWeek}
      canResize={"both"}
                stackItems
                onItemSelect={handleItemClick}
              //  onItemDeselect={() => dispatch(setCurrentTenant(null))}
                minZoom={24 * 60 * 60 * 1000} // min zoom is 24 hours.
                dragSnap={24 * 60 * 60 * 1000} // snap is at 24 hours.
                canMove={true}
                itemHeightRatio={0.75}
        //        onItemMove={handleItemMove}
        //        onItemResize={handleItemResize}
                timeSteps={{
                 
                  month: 1,
                  year: 1,
                  day:1,
                }}
    >
      <TimelineHeaders
      unit="day"
      labelFormat="DDD  ">
         <CustomHeader height={50} headerData={{someData: 'data'}} unit="month">
      {({
        headerContext: { intervals },
        getRootProps,
        getIntervalProps,
        showPeriod,
        data,
      }) => {
        return (
          
          <div {...getRootProps()}>
            
            {intervals.map(interval => {
        
              return (
                
                <center >   
                     
                    {interval.startTime.format('YYYY MMM')}
                  
                  </center>
              )
            })}
          </div>
        )
      }}
    </CustomHeader>
      <DateHeader  unit="day"
   labelFormat="ddd/DD"
      style={{ height: 100 }}
     
      intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
        return <div {...getIntervalProps()} onClick={handleItemClick}>
          {intervalContext.intervalText}
      
        </div>
      }}/>
    
  </TimelineHeaders>
    </Timeline></>})} */}
    </div>}
  </>
  );
}

export default adminLayout(Availability_Matrix);


