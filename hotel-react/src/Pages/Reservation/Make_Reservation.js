import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'moment';
import "../../assets/css/rates.css"
import "../../assets/css/form_x.css"
import '../../assets/css/form_x.css'
import user from '../../assets/images/user.png'
import upload from '../../assets/images/upload.png'
import sign from '../../assets/images/sign.jpg'
import signature from '../../assets/images/signature.png'
import folder from '../../assets/images/folder.png'
import { Link } from 'react-router-dom';
import Loading from '../../images/Loading';



class Make_Reservation extends Component {
  constructor(props) {
    super(props);
    let subtitle = this.props.subtitle
    let urllink = this.props.url
    let property = localStorage.getItem("property")

    this.state = {
      search_url:`${urllink}make-reservation-api/${property}/`,
      message_new : '',
      currentRoomId: 0,
      subtitle:subtitle,
      option: [],
      rooms: [],
      check_in: '',
      check_out: '',
      room_rate: [],
      days: [],
      rates: {},
      pay: [],
      diff: 0,
      select_roomtype: '',
      base_rate_val: '',
      total_day: 0,
      fun_count: 0,
      check_id: [],
      option_show: 'optionA',
      select_total_id: [],
      calculates: {},
      room_values: {},
      all_values: [],
      replace_value: "",
      file_val: "val",
      total_val: {},
      input_condition: "no",
      vals_id: 0,
      hidden_mode: "off",
      child: {},
      adult: {},
      First_name: '',
      last_name: '',
      email: '',
      phone: '',
      phone2: '',
      dob: '',
      gender: 'male',
      taxid: '',
      address: '',
      address2: '',
      city: '',
      country: '',
      state: '',
      doctype: 'driving license',
      zip_code: '',
      doc_number: '',
      doc_issue_date: '',
      doc_issue_country: 'India',
      doc_exp_date: '',
      doc_img: '',
      doc_signature: '',
      img: '',
      enter_username: '',

      user_info: [],
      guest_info: [],
      number_room: 0,
      guest_msg: "",
      user_name: '',
      newemail: '',
      option_backend: 'done',
      show_details: [],
      guest_username: '',
      show_room_no: [],
      len_of_roomno: [],
      room_type_select: [],
      grand_total: 0,
      advance:0,
      return_msg:"",
      todayDate:  new Date().toISOString().slice(0, 10),
      page_load:true,
      page_permission:''
    }
    console.log(this.state.search_url)
  }

  checkToken = () => {
    if (localStorage.getItem("logintoken")) {
      // get token and do anything
      this.setState(JSON.parse(localStorage.getItem("logintoken")))
  
      if(localStorage.getItem("property") === undefined || localStorage.getItem("property") === ""|| localStorage.getItem("property") == "error"){
        localStorage.removeItem("logintoken")
        window.location.href="/login";
    }

    }
  }

  error(parsedata){
    if (parsedata.msg === "error"){
        localStorage.removeItem("logintoken")
        window.location.href="/login";
    }
}

componentDidMount() {
  this.checkToken()

  this.updateRates()
}


updateRates = async () => {
  let a = (JSON.parse(localStorage.getItem("logintoken")))
  let url = this.state.search_url
  this.setState({ loading: true })
  let data = await fetch(url, {
      method: 'GET',
      headers: {
          'content-type': "application/json",
          'Authorization': "Bearer " + a['token']
      },

  })
  let parsedata = await data.json()
  console.log(parsedata)
  if (parsedata.msg !== 'no') {
      this.setState({ page_load: false })
  }
  this.error(parsedata)
  if(parsedata.msg !== 'no'){
    this.setState({page_load:false})
  }
  this.setState({page_permission:parsedata.page_permissions})

}

  search = async () => {

    let check_in = document.getElementById('check_in').value
    let check_out = document.getElementById('check_out').value
    console.log('mycheckin', this.state.option)
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.search_url

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        check_in: check_in,
        check_out: check_out,
        option: 'search'
      }),

    })
    let room_data = await data.json()
    this.error(room_data)
    console.log('gas', room_data)
    check_in = new Date(check_in).toISOString().slice(0, 10)
    check_out = new Date(check_out).toISOString().slice(0, 10)
    this.setState({ check_in: Moment(check_in).format('DD-MM-YYYY') })
    this.setState({ check_out: Moment(check_out).format('DD-MM-YYYY') })
    this.setState({ rooms: room_data.rooms })
    this.setState({ room_rate: room_data.room_rate })
    this.setState({ days: room_data.days })
    this.setState({ pay: room_data.pay })
    this.setState({ diff: room_data.diff })
    this.setState({ total_day: room_data.total_Days })

  }


  edit = (e) => {

    let myid = e.target.value

    console.log(myid)
    if (this.state.input_condition === "yes") {

      this.state.rates[this.state.vals_id] = this.state.all_values 
      

      this.setState({ input_condition: "no" })
    }
    if (myid === this.state.currentRoomId) {
      this.setState({ currentRoomId: "no" })
      return false;
    }
    else {

      this.setState({ currentRoomId: myid })
    }
    let room_rent = e.target.className.split(' ')[0]
    let room_type = e.target.className.split(' ')[1]

    if (this.state.rates[myid][0] === "values") {
      let condition = this.mycondition(room_rent, room_type, myid)

      this.setState({ base_rate_val: condition.conditions })
      this.state.rates[myid] = condition.values_rate
      console.log("ohoval", this.state.rates)
      // this.setState({ rates: condition.values_rate })
    }


  }


  mycondition = (room_rent, room_type, myid) => {

    let values_rate = []
    let conditions = []
    let calculate = 0
    let the_Val = this.state.total_day - 1

    if (this.state.room_rate.length === 0) {
      for (let i = 0; i < the_Val; i++) {
        let c = i + 1
        calculate = c * parseInt(room_rent)
        values_rate.push(parseInt(room_rent))
        this.state.total_val[myid] = calculate

      }
    }

    this.state.room_rate.map((e, index) => { 
      if (e.local_room_type == room_type) {
        this.setState({ select_roomtype: room_type })
        var d = JSON.parse(e.day_rate)
        this.state.pay.forEach((val, i) => {
          if (d[val] !== undefined) {
            values_rate.push(parseInt(d[val]))
            // this.state.rates.push(parseInt(d[val]))
            conditions.push("True")

          }
          else {
            conditions.push("False")
            values_rate.push(parseInt(room_rent))
            // this.state.rates.push(parseInt(room_rent))

          }

          calculate = calculate + values_rate[i]


          this.state.total_val[myid] = calculate
        })

      }
      else {
        for (let i = 0; i < the_Val; i++) {
          let c = i + 1
          calculate = c * parseInt(room_rent)
          values_rate.push(parseInt(room_rent))
          this.state.total_val[myid] = calculate
        }
      }
      //  let key = Object.keys(d)
      //  key.forEach((val)=>console.log(d.ca))
    })

    // this.setState({all_values:values_rate})
    return { conditions, values_rate, calculate }

  }


  myinput = (inputEv, index) => {
    console.log("ratess", this.state.rates)
    let room_no = inputEv.target.name
    const value = inputEv.target.value;
    // this.setState({ rates: (stte) => stte.map((val, i) => (i !== index ? val : value)) });


    this.state.rates[room_no] = (stte) => stte.map((val, i) => (i !== index ? val : value))
    

    let the_Val = this.state.total_day - 1
    let add = 0


    let inputvals = []
    for (let i = 0; i < the_Val; i++) {
      //    // Handle data

      // let thevalues = document.getElementById(`ratesval${i}`).value
      let thevalues = 0


      if (document.getElementById(`myval_${room_no}_${i}`) !== null) {
        thevalues = parseInt(document.getElementById(`myval_${room_no}_${i}`).value)
      }

      else {
        thevalues = 0
      }
      console.log("-->", thevalues)
      if (isNaN(thevalues)) {
        thevalues = 0
      }

      add += thevalues
      inputvals.push(thevalues)
      this.state.total_val[room_no] = add


    }

    
    this.setState({ all_values: inputvals })
    this.setState({ input_condition: "yes" })
    this.setState({ vals_id: room_no })
  }

  checkRoomss = (e) => {

    let room_rent = e.target.className.split(' ')[0]
    let room_type = e.target.className.split(' ')[1]

    let myid = e.target.value

    if (this.state.input_condition === "yes") {

      this.state.rates[this.state.vals_id] = this.state.all_values
      

      this.setState({ input_condition: "no" })
    }


    if (this.state.rates[myid][0] === "values") {
      let condition = this.mycondition(room_rent, room_type, myid)

      this.setState({ base_rate_val: condition.conditions })
      this.state.rates[myid] = condition.values_rate
      // this.setState({ rates: condition.values_rate })
    }
    let child = document.getElementById(`child_${myid}`).value
    let adult = document.getElementById(`adult_${myid}`).value

    // this.mycondition(room_rent,room_type)
    let calculate = this.state.total_val[e.target.value]
    let values_rate = this.state.rates[e.target.value]

    // total amount sum


    let the_vals = []

    let totalCount = 0;
    let roomcheck = document.querySelectorAll("#selectRooms")
    this.setState({ edit_number: "no" })

    if (e.target.checked === true) {

      this.state.room_values[`room_no${e.target.value}`] = values_rate

      // all calculate values
      this.state.calculates[`room_no_${room_type}_${e.target.value}`] = calculate

      this.state.child[`room_no${e.target.value}`] = child

      this.state.adult[`room_no${e.target.value}`] = adult

      this.state.show_room_no.push(parseInt(e.target.value))

      this.setState({ hidden_mode: "on" })

      this.state.room_type_select.push(room_type)
    }
    else {

      // var index = this.state.calculates.indexOf(idd);
      delete this.state.room_values[`room_no${e.target.value}`]
      delete this.state.calculates[`room_no_${room_type}_${e.target.value}`]
      delete this.state.child[`room_no${e.target.value}`]
      delete this.state.adult[`room_no${e.target.value}`]
      let index = this.state.show_room_no.indexOf(parseInt(e.target.value));
      if (index > -1) { // only splice array when item is found
        this.state.show_room_no.splice(index, 1); // 2nd parameter means remove one item only
      }
      let new_index = this.state.room_type_select.indexOf(room_type)
      if (new_index > -1) { // only splice array when item is found
        this.state.room_type_select.splice(index, 1); // 2nd parameter means remove one item only
      }
    }



    let day_count = []
    let counts_day = this.state.total_day - 1
    for (let val = 0; val < counts_day; val++) {
      day_count.push(val)

    }
    let grand_total = 0
    for (let key in this.state.calculates) {
      grand_total += this.state.calculates[key]
    }
    this.setState({ grand_total: grand_total })
    this.setState({ len_of_roomno: day_count })

    let counts = []
    for (let i = 0; i < roomcheck.length; i++) {

      if (roomcheck[i].checked == true) {
        totalCount++;

        the_vals.push(roomcheck[i].value);


        this.setState({ check_id: the_vals })
      }
      else {
        counts.push(i)
      }
      if (counts.length === roomcheck.length) {
        this.setState({ hidden_mode: "off" })
      }

      this.setState({ fun_count: totalCount })


      if (totalCount > 0) {
        document.getElementById("applybutton").style.display = 'block';

      }
      else {

        document.getElementById("applybutton").style.display = 'none';
      }
    }
  }
  loadFile = (event) => {
    var output = document.getElementById('img');
    this.setState({ img: event.target.value })
    output.src = URL.createObjectURL(event.target.files[0]);
    upload = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  check_email = async () => {
    let email = this.state.newemail
    let room_all_values = JSON.stringify(this.state.room_values)
    let calulation = JSON.stringify(this.state.calculates)
    let num_child = JSON.stringify(this.state.child)
    let num_adults = JSON.stringify(this.state.adult)

    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.search_url

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "have_email",
        email: email,
        check_in: this.state.check_in,
        check_out: this.state.check_out,
        room_values: room_all_values,
        num_child: num_child,
        num_adults: num_adults,
      }),

    })
    let guest_data = await data.json()
    this.error(guest_data)
    this.setState({ option_backend: guest_data.option })
    if (guest_data.option === "add_on") {
      this.setState({ option_show: "optionA" })
      this.fill_data(guest_data)
  

    }
    else{
      document.getElementById("addon-tab").click()
    }
    this.setState({ loading: false })
    this.setState({ user_info: guest_data.user_info })
    this.setState({ guest_info: guest_data.guest_info })
    this.setState({ number_room: guest_data.number_room })
    this.setState({ guest_msg: guest_data.msg })
    this.setState({ show_details: guest_data.details })
    this.setState({ guest_username: guest_data.username })
  }
  user_name = async () => {
    let username = this.state.enter_username
    let room_all_values = JSON.stringify(this.state.room_values)
    let calulation = JSON.stringify(this.state.calculates)
    let num_child = JSON.stringify(this.state.child)
    let num_adults = JSON.stringify(this.state.adult)

    console.log("uss", username)
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.search_url

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "user_name",
        user: username,
        check_in: this.state.check_in,
        check_out: this.state.check_out,
        room_values: room_all_values,
        num_child: num_child,
        num_adults: num_adults,

      }),

    })
    let guest_data = await data.json()
    this.error(guest_data)
    this.setState({ loading: false })
    this.setState({ user_info: guest_data.user_info })
    this.setState({ guest_info: guest_data.guest_info })
    this.setState({ number_room: guest_data.number_room })
    this.setState({ guest_msg: guest_data.msg })
    this.setState({ option_backend: guest_data.option })
    this.setState({ show_details: guest_data.details })
    this.setState({ guest_username: guest_data.username })
    if (guest_data.option === "add_on") {
      this.setState({ option_show: "optionA" })
      this.fill_data(guest_data)

    }else{
      
      document.getElementById("addon-tab").click()
    }
    }


  guestSubmit = async (e) => {
    e.preventDefault()
    let room_all_values = JSON.stringify(this.state.room_values)
    let calulation = JSON.stringify(this.state.calculates)
    let num_child = JSON.stringify(this.state.child)
    let num_adults = JSON.stringify(this.state.adult)
    let formData = new FormData();
    let choice = 'guest'
    let emails = this.state.email
    let username = this.state.guest_username

    

    if (this.state.option_backend === "add_on") {
      choice = "update_form"
      emails = this.state.newemail
      username = this.state.enter_username
    }

    formData.append('option', choice)
    formData.append('username', username)
    formData.append('check_in', this.state.check_in)
    formData.append('check_out', this.state.check_out)
    formData.append('first_name ', this.state.First_name)
    formData.append('last_name ', this.state.last_name)
    formData.append('email ', emails)
    formData.append('phone ', this.state.phone)
    formData.append('phone2 ', this.state.phone2)
    formData.append('dob ', this.state.dob)
    formData.append('gender ', this.state.gender)
    formData.append('taxId ', this.state.taxid)
    formData.append('addres_1 ', this.state.address)
    formData.append('addres_2 ', this.state.address2)
    formData.append('city ', this.state.city)
    formData.append('country ', this.state.country)
    formData.append('state ', this.state.state)
    formData.append('doctype ', this.state.doctype)
    formData.append('zip_code ', this.state.zip_code)
    formData.append('doc_number ', this.state.doc_number)
    formData.append('doc_issue_date ', this.state.doc_issue_date)
    formData.append('doc_issue_country ', this.state.doc_issue_country)
    formData.append('doc_exp_date ', this.state.doc_exp_date)
    formData.append('doc_image ', e.target.doc_image.files[0])
    formData.append('signature ', e.target.signature.files[0])
    formData.append('image ', e.target.image.files[0])
    formData.append('room_values', room_all_values)
    formData.append('calulation', calulation)
    formData.append('num_child', num_child)
    formData.append('num_adults', num_adults)


    this.checkToken()
    this.setState({ myroom_type: e.target.value })
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/roomtype-rates/"
    let url = this.state.search_url

    let data = await fetch(url, {
      method: 'POST',
      headers: {

        'Authorization': "Bearer " + a['token']
      },
      body: formData

    })
    let guest_data = await data.json()
    this.error(guest_data)
    this.setState({return_msg:guest_data.msg})
    if(guest_data.msg === 'Guest Account Created Succesfuly' || guest_data.msg === 'Guest Account Updated Succesfuly' ){
      document.getElementById('guests').style.display = "none"
      
    }

    if( guest_data.msg != 'Guest Account Created Succesfuly'){
      this.setState({ message_new: guest_data.msg })
      setTimeout(() => {
        this.setState({message_new:''})
      }, 9000);
    }

    else{
    this.setState({ loading: false })
    this.setState({ user_info: guest_data.user_info })
    this.setState({ guest_info: guest_data.guest_info })
    this.setState({ number_room: guest_data.number_room })
    this.setState({ guest_msg: guest_data.msg })
    this.setState({ guest_username: guest_data.username })
    // let check_in = this.state.check_in
    let check_out = this.state.check_out
     document.getElementById("addon-tab").click()
  }


  }

  fill_data = (guest_data) => {
    
    guest_data.user_info.map((users)=>{
      this.setState({First_name:users.first_name})
    this.setState({last_name:users.last_name})
    this.setState({email:users.email})
    })
    guest_data.guest_info.map((guest) =>{
    
    
    this.setState({phone:guest.phoneNumber})
    this.setState({phone2:guest.phoneNumber2})
    this.setState({ dob: guest.guest_dob })
    this.setState({ gender: guest.guest_gender })
    this.setState({ taxid: guest.taxId })
    this.setState({ address: guest.address_1 })
    this.setState({ address2: guest.address_2 })
    this.setState({ city: guest.guest_city })
    this.setState({ country: guest.guest_country })
    this.setState({ state: guest.state })
    this.setState({ doctype: guest.doctype })
    this.setState({ zip_code: guest.guest_zip_code })
    this.setState({ doc_number: guest.doc_number })
    this.setState({ doc_issue_date: guest.guest_doc_issue_date })
    this.setState({ doc_issue_country: guest.doc_issue_country })
    this.setState({ doc_exp_date: guest.doc_exp_date })
  })
  }


  loadFile_1 = (event) => {
    var output_1 = document.getElementById('img_1');
    upload = URL.createObjectURL(event.target.files[0]);
    output_1.src = URL.createObjectURL(event.target.files[0]);
    this.setState({ doc_signature: event.target.value })
    output_1.onload = function () {
      URL.revokeObjectURL(output_1.src) // free memory
    }
  };

  loadFile_2 = (event) => {
    this.setState({ doc_img: event.target.value })
    if (event.target.value === "") {
      this.setState({ file_val: "full" })
    }
    else {
      this.setState({ file_val: "empty" })
    }
  }

  select = () => {

    let runtime = this.state.check_id.length
    // total amount sum
    let total_ammount = []
    let total

    for (let i = 0; i < runtime; i++) {

      total = document.getElementById(`total_rs${this.state.check_id[i]}`).value
      total_ammount.push(total)
    }

  }

  go_pay = async () => {
    let username = this.state.guest_username
    let calulation = this.state.grand_total
    let room_no = this.state.show_room_no
    let advance = this.state.advance

    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.search_url

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "go_pay",
        user: username,
        check_in: this.state.check_in,
        check_out: this.state.check_out,
        calulation: calulation,
        room_no: room_no,
        advance: advance,

      }),

    })
    let guest_data = await data.json()
    this.error(guest_data)
    if (guest_data.msg != 'ok'){
      this.setState({ message_new: guest_data.msg })
      setTimeout(() => {
        this.setState({message_new:''})
      }, 9000);
    }
    else{
      window.location.reload()
    }
  }

  option_a = () => {
    this.setState({ option_show: 'optionA' })
  }
  option_b = () => {
    this.setState({ option_show: 'optionB' })
  }
  option_c = () => {
    this.setState({ option_show: 'optionC' })
  }
  render() {
    return (<>{this.state.page_load ? <Loading />:
      <div>
        <h6 className="head">{this.state.subtitle} </h6>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li style={{visibility:'hidden'}} className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Availability</button>
          </li>
          <li style={{visibility:'hidden'}} className="nav-item" role="presentation">
            <button className="nav-link" id="guest-tab" data-bs-toggle="tab" data-bs-target="#guests" type="button" role="tab" aria-controls="guest-tab" aria-selected="false">Details</button>
          </li>
          <li style={{visibility:'hidden'}} className="nav-item" role="presentation">
            <button className="nav-link" id="addon-tab" data-bs-toggle="tab" data-bs-target="#hotel" type="button" role="tab" aria-controls="hotel-tab" aria-selected="false">Add-Ons</button>
          </li>
          <li style={{visibility:'hidden'}} className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#booking" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Payment</button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button className="nav-link" id="payment-tab-pane" data-bs-toggle="tab" data-bs-target="#payment-tab-pane" type="button" role="tab" aria-controls="payment-tab-pane" aria-selected="false">Payment</button>
          </li> */}

          {/* new comment 1 */}
        </ul>
        {/* < ------------------------------- Make Reservation------------------------------ > */}

        {/* <----------------------------search-----------------------------------> */}
        <div>
          
        { this.state.message_new != '' && <div className="alert alert-info">{this.state.message_new}</div>}
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
              <h5 className='my-4'>Make Reservation</h5>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Source
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Website</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Phone</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Agent</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Gmail</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <h2></h2>
              <div>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group id="dob">
                      <Form.Label>Check In</Form.Label>
                      <Form.Control min={this.state.todayDate} type="date" id='check_in' name="dob" placeholder="Date of Birth" />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group id="dob">
                      <Form.Label>Check Out</Form.Label>
                      <Form.Control min={this.state.todayDate} type="date" id='check_out' placeholder="Date of Birth" />
                    </Form.Group>
                  </div>

                  <Form.Group as={Col} id="formGridState">
                    <Form.Label>Room Types</Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} id="formGridState">
                    <Form.Label>Allotment Block</Form.Label>
                    <Form.Select defaultValue="Select...">
                      <option>Choose...</option>
                      <option>None of the type...</option>
                    </Form.Select>
                  </Form.Group>



                </div>
              </div>


              <h2>    </h2>

              <Row className="mb-3">
                <Form.Group as={Col} id="formGridCity">
                  <Form.Label>Enter Promo Code</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} id="formGridState">
                  <Form.Label>  2 of 3 Select Plans</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Basic Plan</option>
                    <option>Discount Offer</option>
                  </Form.Select>
                </Form.Group>
              </Row>




              <Button variant="primary" onClick={this.search}>Search</Button>

              <h2 className='my-4'>Traveller Details</h2>


              <div className="row my-4">
                <div className="col-1">Select Room</div>
                <div className="col-1 px-2">Room Type</div>
                <div className="col-1">Types</div>
                <div className="col-2">Check-In Date</div>
                <div className="col-2">Check-Out Date</div>
                <div className="col-1">Price</div>
                <div className="col-1">Room Number</div>
                <div className="col-1">Adult</div>
                <div className="col-1">Child</div>
                <div className="col-1">Edit</div>
              </div>

              {this.state.rooms.map((element, i) => {
                return <>
                  <div className="row my-3">
                    <div className="col-1"><div className="form-check">
                      <input className={`${element.price} ${element.roomType} form-check-input`} onChange={this.checkRoomss} type="checkbox" value={element.number} id="selectRooms" />
                    </div></div>
                    <div className="col-1 px-2">{element.roomType}</div>
                    <div className="col-1">{element.typeroom}</div>
                    <div className="col-2">{this.state.check_in}</div>
                    <div className="col-2">{this.state.check_out}</div>
                    <div className="col-1">{element.price}</div>
                    <div className="col-1">{element.number}</div>
                    <div className="col-1">
                      <select id={`adult_${element.number}`} name="adult_number" >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select></div>
                    <div className="col-1">
                      <select id={`child_${element.number}`} name="child_number">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select></div>

                    {/* NOTE:- please do not change the class name and position if you want to add the class then add after the data like if you want to add col-1 in class  then add it like className = {`img ${element.week_day} ${element.total_days} col-1`} */}


                    {this.state.hidden_mode === "off" && <div className="col-1"><button id={element.number} value={element.number} className={`${element.price} ${element.roomType}`} onClick={this.edit}>Edit</button>
                    </div>}



                  </div>


                  <div className="row  my-3">
                    <div id='' className="accordion-collapse max-w  collapse" style={{ display: this.state.currentRoomId === String(element.number) ? "block" : "none" }}>
                      <div className="col-1">
                        <div className="form-group">
                          <div className="d-flex wid">
                            <p><b>price</b></p>
                            <input type="number" value={this.state.total_val[element.number]} name="totalprice" id={`total_rs${element.number}`} min="0" className="form-control ratein mx-2" aria-describedby="emailHelp" />
                          </div>
                        </div>
                      </div>

                      <div style={{
                        marginTop: "20px",
                        overflowX: "scroll",
                        "display": "flex",
                        maxWidth: "1200px",
                        width: "1200px"
                      }}>
                        {this.state.days.map((e, index) => {
                          { this.state.rates[element.number] === undefined ? this.state.rates[element.number] = ["values"] : <></> }
                          return <>
                            <div className="col-1 mx-3 me-3">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">{e}</label>
                                {this.state.page_permission.includes('edit') ? 
                                <input type="number" id={`myval_${element.number}_${index}`} style={{ pointerEvents: this.state.base_rate_val[index] === "True" ? "none" : "" , }} value={this.state.select_roomtype !== element.roomType ? (this.state.rates[element.number][index]) : (this.state.rates[element.number][index])} name={element.number} onChange={(event) => this.myinput(event, index)} min={0} className="form-control ratein" aria-describedby="emailHelp" />
                                :<input type="number" id={`myval_${element.number}_${index}`} style={{ pointerEvents: this.state.base_rate_val[index] === "True" ? "none" : "" , }} value={this.state.select_roomtype !== element.roomType ? (this.state.rates[element.number][index]) : (this.state.rates[element.number][index])} name={element.number} min={0} className="form-control ratein" aria-describedby="emailHelp" />}
                              </div><br />
                            </div>
                          </>
                        })}

                      </div>
                    </div>
                  </div></>
              })}
              <button name="select" onClick={() => {
                document.getElementById("guest-tab").click();document.getElementById("home-tab-pane").style="display:none"; }} id="applybutton" className="btn btn-success" style={{ display: 'none' }}>Apply</button>



            </div>

            <div>
            </div>
          </div>
        </div>

        {/* <-----------------------------------End search---------------------------------------------------> */}

        {/* <-----------------------------------Guest Details-----------------------------------------------> */}
        
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade " id="guests" role="tabpanel" aria-labelledby="guest-tab" tabIndex="0">
            <h5 className='my-4'>Guest Details fsfasfsa</h5>


            <div className="ma-5 container mt-3">
              <div className="btn-group">
                <button id="btn-a" onClick={this.option_a} className="btn-a1">New User</button>
                <button id="btn-b" onClick={this.option_b}>Already have Account</button>
                <button id="btn-c" onClick={this.option_c} className="btn-b">Already given Info</button>
              </div>
            </div>
            {/* --------------------------start---------------------------------- */}

            {this.state.option_show === "optionA" &&
              <form onSubmit={this.guestSubmit} enctype="multipart/form-data">
                <div className="row option-a mt-5" >
                  <div className="col-3"><img className="img_reserve" src={user} id="img" alt="" /><br />
                    <div className="col mt-3">
                      <label for="id_image" className="upload"><img className="img_1_reserve" src={upload} id="new" alt="" /><span className="leb">Upload Profile</span></label>
                      <input type="file" value={this.state.img} name="image" style={{ display: "none" }} accept="image/*" onChange={this.loadFile} required id="id_image" />
                    </div>
                  </div>

                  <div className="col-6">
                    {this.state.option_backend !== "add_on" ? (<>
                      <div className="row mt-3">
                        <div className="col-2"><label for="fname">First Name</label></div>
                        <div className="col-8"><input onChange={(e) => { this.setState({ First_name: e.target.value }) }} value={this.state.First_name} type="text" className="form_in" id="addres_1" name="first_name" placeholder="enter first name" required /></div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Last Name</label></div>
                        <div className="col-8"><input type="text" onChange={(e) => { this.setState({ last_name: e.target.value }) }} value={this.state.last_name} className="form_in" id="addres_1" name="last_name" placeholder="enter last name" required /></div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="email">Email address</label></div>
                        <div className="col-8"><input type="email" onChange={(e) => { this.setState({ email: e.target.value }) }} value={this.state.email} className="form_in" id="addres_1" name="email" placeholder="name@example.com" required /></div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone</label></div>
                        <div className="col-8"><input className="form_in" onChange={(e) => { this.setState({ phone: e.target.value }) }} value={this.state.phone} type="number" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /></div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone number2</label></div>
                        <div className="col-8"><input className="form_in" onChange={(e) => { this.setState({ phone2: e.target.value }) }} value={this.state.phone2} type="number" id="phone" name="phone2" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /></div>
                      </div>
                    </>) : (<>
                      <div className="row mt-3">
                        <div className="col-2"><label for="fname">First Name</label></div>
                        <div className="col-8">{this.state.First_name}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Last Name</label></div>
                        <div className="col-8">{this.state.last_name}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="email">Email address</label></div>
                        <div className="col-8">{this.state.email}</div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone</label></div>
                        <div className="col-8">{this.state.phone}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone number2</label></div>
                        <div className="col-8">{this.state.phone2}</div>
                      </div>
                    </>)}
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">Date Of Birth</label></div>
                      <div className="col-8"><input type="date" onChange={(e) => { this.setState({ dob: e.target.value }) }} value={this.state.dob} className="form_in" id="dob" name="dob" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="gender">Select Gender</label></div>
                      <div className="col-8">
                        <select name="gender" style={{color:'black'}} onChange={(e) => { this.setState({ gender: e.target.value }) }} value={this.state.gender} className="form_in">
                          <option value="male">male</option>
                          <option value="female">female</option>
                          <option value="transgender">transgender </option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="lname">Tax Id Number</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ taxid: e.target.value }) }} value={this.state.taxid} className="form_in" type="number" id="tax_id" placeholder="Tax Id number" name="taxId" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">Address</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ address: e.target.value }) }} value={this.state.address} type="text" className="form_in" id="addres_1" name="addres_1" placeholder="Address" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">Address2</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ address2: e.target.value }) }} value={this.state.address2} type="text" className="form_in" id="addres_2" name="addres_2" placeholder="Address 2" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">City</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ city: e.target.value }) }} value={this.state.city} type="text" className="form_in" id="city" name="city" placeholder="city" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">Country</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ country: e.target.value }) }} value={this.state.country} type="text" className="form_in" id="country" name="country" placeholder="country" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">State</label></div>
                      <div className="col-8"><input type="text" onChange={(e) => { this.setState({ state: e.target.value }) }} value={this.state.state} className="form_in" id="state" name="state" placeholder="state" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">zip code</label></div>
                      <div className="col-8"><input type="number" onChange={(e) => { this.setState({ zip_code: e.target.value }) }} value={this.state.zip_code} className="form_in" id="zip_code" name="zip_code" placeholder="Zip Code" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">Doc Type</label></div>
                      <div className="col-8">
                        <select style={{color:'black'}} onChange={(e) => { this.setState({ doctype: e.target.value }) }} value={this.state.doctype} name="doctype" className="form_in">
                          <option value="driving license">driving license</option>
                          <option value="passport">passport</option>
                          <option value="identity card">identity card</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_number">Document Number</label></div>
                      <div className="col-8"><input type="number" onChange={(e) => { this.setState({ doc_number: e.target.value }) }} value={this.state.doc_number} className="form_in" id="doc_number" name="doc_number" placeholder="Doc Number" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_num">Doc Issue Date</label></div>
                      <div className="col-8"><input type="date" onChange={(e) => { this.setState({ doc_issue_date: e.target.value }) }} value={this.state.doc_issue_date} className="form_in" id="doc_issue_date" name="doc_issue_date" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_num">Doc Issue Country</label></div><br />
                      <div className="col-8">
                        <select style={{color:'black'}} name="doc_issue_country" onChange={(e) => { this.setState({ doc_issue_country: e.target.value }) }} value={this.state.doc_issue_country} className="form_in minimal">
                          <option value="driving license">India</option>
                          <option value="U.S.">U.S.</option>
                          <option value="identity card">RUSH</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_num">Doc Expire date</label></div>
                      <div className="col-8"><input type="date" onChange={(e) => { this.setState({ doc_exp_date: e.target.value }) }} value={this.state.doc_exp_date} className="form_in" id="doc_exp_date" name="doc_exp_date"  required /></div>
                    </div>

                  </div>

                  <div className="col-3">
                    <img className="img_reserve" src={sign} id="img_1" alt="" /><br />
                    <div className="col mt-3">
                      <label for="id_signature" className="upload"><img className="img_1_reserve" src={signature} id="img" alt="" /><span className="leb">Upload Signature</span></label>
                      <input type="file" value={this.state.doc_signature} style={{ display: "none" }} name="signature" accept="image/*" onChange={this.loadFile_1} required id="id_signature" /></div>
                    <div className="col mt-3">
                      <label for="id_image1" className="upload"><img className="img_1_reserve" src={folder} id="img_2" alt="" /><span className="leb">Upload Docs</span></label>
                      <input type="file" value={this.state.doc_img} style={{ display: "none" }} name="doc_image" className="fl_btn" onChange={this.loadFile_2} required id="id_image1" /></div>

                    {this.state.file_val !== "empty" && <p>no files selected</p>}

                  </div>
                  <button type="submit" name="register_form" className="btn btn-primary">Submit</button>
                </div>

              </form>}

            {this.state.option_show === "optionB" &&

              <div className="container option-b">
                <label className="username mt-4" for="user">Enter the username</label><br />
                <input type="text" value={this.state.enter_username} onChange={(e) => { this.setState({ enter_username: e.target.value }) }} className="form_in mb-4" name="user" id="" /><br />
                <button type="btn" onClick={this.user_name} name="have_form" className="btn btn-blue mb-4">Submit</button>
              </div>
            }

            {this.state.option_show === "optionC" &&

              <div className="container option-c">
                <label className="username mt-4" for="user">Enter Email Address</label><br />
                <input type="text" value={this.state.newemail} onChange={(e) => { this.setState({ newemail: e.target.value }) }} className="form_in mb-4" name="email" id="" /><br />
                <button onClick={this.check_email} type="submit" name="have_information" className="btn btn-blue mb-4">Submit</button>
              </div>
            }


            {/* --------------------------end---------------------------------------- */}


          </div>
        </div>
       
        {/* --------------------------End Guest Details---------------------------------------- */}

        {/* --------------------------payment section---------------------------------------- */}






        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade mx-5 " id="booking" role="tabpanel" aria-labelledby="booking-tab" tabIndex="0">
            <h5 className='my-4'>Booking Information</h5>

            <div className="row  mt-5">

              <div className="col-sm-5">
                <p><b>Check-IN Date</b></p>
                <p><b>Check-Out Date</b></p>
                <p>Total Room</p>
                <p>Total Days</p>
                {this.state.show_room_no.map((e, i) => {
                  return <>
                    <p className='mt-5'><b>Room No</b></p>
                    <p><b>Room Type</b></p>
                    <p>Adult</p>
                    <p>Child</p>
                    <p>Ammount</p>
                    <p>Total</p></>
                })}
                <p className='mt-3'><b>Grand Total</b></p>

              </div>

              <div className="col-sm-7">
                <p><b>{this.state.check_in}</b></p>
                <p><b>{this.state.check_out}</b></p>
                <p>{this.state.show_room_no.length}</p>
                <p>{this.state.total_day - 1}</p>
                {this.state.show_room_no.map((e, i) => {
                  return <>
                    <p className='mt-5'><b>{e}</b></p>
                    <p><b>{this.state.room_type_select[i]}</b></p>
                    <p>{this.state.adult[`room_no${e}`]}</p>
                    <p>{this.state.child[`room_no${e}`]}</p>

                    <div className="d-flex">
                      {this.state.len_of_roomno.map((vals) => {
                        return <>
                          <p className='mx-1'>{this.state.room_values[`room_no${e}`][vals]},</p></>
                      })}</div>
                    <p>{this.state.calculates[`room_no_${this.state.room_type_select[i]}_${e}`]}</p>
                  </>
                })}
                <p className='mt-3'><b>{this.state.grand_total}</b></p>
              </div>
            </div>
            <Form>
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`Saved this information for next time`}
                  />
                </div>
              ))}
            </Form>


            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
              <i class="fa fa-credit-card"></i>creadit Card
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
              <i class="fa fa-bank"></i>Debit Card
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
              <i class="fa fa-cc-stripe"></i>Cash
              </label>
            </div>





            <div className="row mt-3">
              <div className="col-2"><label for="dob">Advance</label></div>
              <div className="col-8"><input onChange={(e) => { this.setState({ advance: e.target.value }) }} value={this.state.advance} type="Number" className="form_in" id="advance" name="advance" placeholder="Advance" required /></div>
            </div>


            <h2>        </h2>
            <Form>
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`Saved my information for next time`}
                  />
                </div>
              ))}
            </Form>
            <Button onClick={this.go_pay} variant="primary">Make Payment</Button>

          </div>

        </div>
        {/* --------------------------end payment section---------------------------------------- */}
        {/* <-----------------------------------Summery-----------------------------------------------> */}
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show " id="hotel" role="tabpanel" aria-labelledby="hotel-tab" tabIndex="0">
            <section className="section about-section gray-bg" id="about">
              <div className="container">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-9">
                    <div className="about-text go-to">
                      {this.state.user_info.map((e) => {
                        return <>
                          <h3 className="dark-color">{e.first_name}</h3><br />
                          <h6 className="theme-color lead">{e.email}</h6></>
                      })}


                      <h6 className="dark-color">Number Of Rooms {this.state.number_room}</h6><br />

                      {this.state.guest_info.map((e) => {
                        return <>
                          <div className="row about-list">
                            <div className="col-md-6">
                              <div className="media d-flex">
                                <label>Birthday</label>
                                <p>{e.guest_dob}</p>
                              </div>
                              <div className="media d-flex">
                                <label>Gender</label>
                                <p>{e.guest_gender}</p>
                              </div>
                              <div className="media d-flex">
                                <label>Residence</label>
                                <p>{e.guest_country}</p>
                              </div>
                              <div className="media d-flex">
                                <label>city</label>
                                <p>{e.guest_city}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="media d-flex">
                                <label>PhoneNumber</label>
                                <p>{e.phoneNumber}</p>
                              </div>
                              <div className="media d-flex">
                                <label>PhoneNumber 2</label>
                                <p>{e.PhoneNumber2}</p>
                              </div>
                              <div className="media d-flex">
                                <label>TaxId</label>
                                <p>{e.taxId}</p>
                              </div>
                              <div className="media d-flex">
                                <label>DOC Type</label>
                                <p>{e.doctype}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="media d-flex">
                                <label>Doc Issue Date</label>
                                <p>{e.guest_doc_issue_date}</p>
                              </div>
                              <div className="media d-flex">
                                <label>Doc Is sue Country</label>
                                <p>{e.doc_issue_country}</p>
                              </div>
                              <div className="media d-flex">
                                <label>zip code</label>
                                <p>{e.guest_zip_code}</p>
                              </div>
                              <div className="media d-flex">
                                <label>Doc Exp Date</label>
                                <p>{e.doc_exp_date}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="media d-flex">
                                <label>Address</label>
                                <p>{e.address_1}</p>
                              </div>
                              <div className="media d-flex">
                                <label>Address 2</label>
                                <p>{e.address_2}</p>
                              </div>

                            </div>
                          </div>

                          <button type='btn' className='btn btn-success' onClick={() => {

                           document.getElementById("profile-tab").click();
                           document.getElementById("hotel").style="display:none"; }
                          }>Go Next</button></>
                      })}
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="about-avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </section>


          </div>
        </div>
        {/* <-----------------------------------End Summery-----------------------------------------------> */}

      </div>

                    }
    </>)

  }
}

export default adminLayout(Make_Reservation);