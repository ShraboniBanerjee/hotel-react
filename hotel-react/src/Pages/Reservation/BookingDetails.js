import { ContentPasteOffSharp } from '@mui/icons-material';
import { unstable_ClassNameGenerator } from '@mui/material';
import React, { Component } from 'react';


class BookingDetails extends Component {
  constructor(props) {
    super(props);
    let subtitle = this.props.subtitle
    let urllink = this.props.url
    let property = localStorage.getItem("property")

    this.state = {
      search_url: `${urllink}make-reservation-api/${property}/`,
      message_new: '',
      currentRoomId: 0,
      subtitle: subtitle,
      option: [],
      rooms: [],
      room_rate: [],
      days: [],
      rates: {},
      pay: [],
      diff: 0,
      select_roomtype: '',
      base_rate_val: '',
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
      summary_msg: '',
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
      advance: 0,
      return_msg: "",
      todayDate: new Date().toISOString().slice(0, 10),
      page_load: true,
      guest_summery: [],
      user_summery: [],
      show_guest: false
    }

  }
  edit = (e) => {
    let myid = e.target.value
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
      // this.setState({ rates: condition.values_rate })
    }
  }

  checkRoomss = (e) => {

    let room_rent = e.target.className.split(' ')[0]
    let room_type = e.target.className.split(' ')[1]

    let myid = e.target.value
    console.log("///",myid)

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
    let counts_day = this.props.total_day - 1
    for (let val = 0; val < counts_day; val++) {
      day_count.push(val)

    }
    let grand_total = 0
    for (let key in this.state.calculates) {
      grand_total += this.state.calculates[key]
    }
    this.setState({ grand_total: grand_total })
    this.setState({ len_of_roomno: day_count })
    console.log("----",grand_total)
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
    console.log(":::",this.state.room_values)
    this.props.BookingDetails_data(this.state.calculates, this.state.room_values, this.state.child, this.state.adult,this.state.show_room_no,this.state.room_type_select,this.state.len_of_roomno,grand_total)
  }

  myinput = (inputEv, index) => {
    console.log("ratess", this.state.rates)
    let room_no = inputEv.target.name
    const value = inputEv.target.value;
    // this.setState({ rates: (stte) => stte.map((val, i) => (i !== index ? val : value)) });


    this.state.rates[room_no] = (stte) => stte.map((val, i) => (i !== index ? val : value))


    let the_Val = this.props.total_day - 1
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

  mycondition = (room_rent, room_type, myid) => {
    let values_rate = []
    let values_dict = {}
    let conditions = []
    let calculate = 0
    let the_Val = this.props.total_day - 1
    let matrix_vals = {}
    let base_rate = {}
    let matrix_vals_array = []
    let base_rate_array = []

    this.props.year_rate.map((matrix,count) => {
      if(this.props.year_rate.length>=1){
      matrix_vals = JSON.parse(matrix.day_rate)
      }
      else{
        matrix_vals_array.push(JSON.parse(matrix.day_rate))
      }
    })

    this.props.room_rate.map((rate) => {
      if(this.props.room_rate.length >=1){
      base_rate = JSON.parse(rate.day_rate)
      }
      
      else{
        base_rate_array.push(JSON.parse(rate.day_rate))
      }
    })

    if(this.props.year_rate.length<1){
      matrix_vals_array.map((value)=>{
        matrix_vals =  Object.assign({}, matrix_vals, value)
      })
    }

    if(this.props.room_rate.length <1){
      base_rate_array.map((rates)=>{
        base_rate = Object.assign({}, base_rate, rates)
      })
    }

    this.props.pay.forEach((val, i) => {
      
      values_dict[val] = parseInt(room_rent)

      if (matrix_vals !== undefined) {
        if (matrix_vals[val] !== undefined) {
          values_dict[val] = parseInt(matrix_vals[val])

        }
      }


      if (base_rate !== undefined) {
        if (val in base_rate) {
          values_dict[val] = parseInt(base_rate[val])
          conditions.push("True")
        }
      }
      
   
      calculate += values_dict[val] 
      values_rate.push(parseInt(values_dict[val]))
      this.state.total_val[myid] = calculate
    })
   

    // this.setState({all_values:values_rate})
    return { conditions, values_rate, calculate }
  }


  render() {
    return (
      <div>
        {this.props.isRoomData &&
          <>
            <h1 className='mt-5 text-center'>Traveller Details</h1>
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
          </>
        }

        {this.props.rooms.map((element, i) => {
          return <>
            <div className="row my-3">
              <div className="col-1"><div className="form-check">
                <input className={`${element.price} ${element.roomType} form-check-input`} onChange={this.checkRoomss} type="checkbox" value={element.number} id="selectRooms" />
              </div></div>
              <div className="col-1 px-2">{element.roomType}</div>
              <div className="col-1">{element.typeroom}</div>
              <div className="col-2">{this.props.check_in}</div>
              <div className="col-2">{this.props.check_out}</div>
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
                  {this.props.days.map((e, index) => {
                    { this.state.rates[element.number] === undefined ? this.state.rates[element.number] = ["values"] : <></> }
                    return <>
                      <div className="col-1 mx-3 me-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">{e}</label>
                          {this.props.page_permission.includes('edit') ?
                            <input type="number" id={`myval_${element.number}_${index}`} style={{ pointerEvents: this.state.base_rate_val[index] === "True" ? "none" : "", }} value={this.state.select_roomtype !== element.roomType ? (this.state.rates[element.number][index]) : (this.state.rates[element.number][index])} name={element.number} onChange={(event) => this.myinput(event, index)} min={0} className="form-control ratein" aria-describedby="emailHelp" />
                            : <input type="number" id={`myval_${element.number}_${index}`} style={{ pointerEvents: this.state.base_rate_val[index] === "True" ? "none" : "", }} value={this.state.select_roomtype !== element.roomType ? (this.state.rates[element.number][index]) : (this.state.rates[element.number][index])} name={element.number} min={0} className="form-control ratein" aria-describedby="emailHelp" />}
                        </div><br />
                      </div>
                    </>
                  })}

                </div>
              </div>
            </div></>
        })}
        <button name="select" onClick={() => {
          document.getElementById("guest-tab").click(); document.getElementById("home-tab-pane").style = "display:none";
        }} id="applybutton" className="btn btn-success" style={{ display: 'none' }}>Apply</button>

      </div>
    );
  }
}

export default BookingDetails;