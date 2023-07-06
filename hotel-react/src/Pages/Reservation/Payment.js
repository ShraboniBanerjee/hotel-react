import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PaymentStripe from './PaymentStripe';

class Payment extends Component {
  constructor(props) {
    super(props);
    let url_link = this.props.url_link
  

    this.state = {
      search_url: url_link,
      message_new: '',
      currentRoomId: 0,
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
      advance: 0,
      return_msg: "",
      todayDate: new Date().toISOString().slice(0, 10),
      page_load: true,
      page_permission: '',
      isRoomData: false,
      guest_summery: [],
      user_summery: [],
      show_guest: false,
      isShowPaymentBox:false,
      cashMode:'off'
    }
  }

    payment_load = (payMode=null) =>{
      if(payMode !==null){
        this.go_pay()
      }
    }
  
    go_pay = async () => {
    let username = this.props.user_name
    let calulation = this.props.grand_total
    let room_no = this.props.room_values
    console.log("??", room_no)
    let advance = this.state.advance

    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.search_url
    console.log(this.props.email)
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "go_pay",
        email: this.props.email,
        check_in: this.state.check_in,
        check_out: this.state.check_out,
        calulation: calulation,
        room_no: room_no,
        advance: advance,
        show_room_no:this.props.show_room_no
      }),

    })
    let guest_data = await data.json()
    this.error(guest_data)
    if (guest_data.msg != 'ok') {
      this.props.payment_data(guest_data.msg)
    }
    else {
      window.location.reload()
    }
  }

  
  

  error(parsedata) {
    if (parsedata.msg === "error") {
      localStorage.removeItem("logintoken")
      window.location.href = "/login";
    }
  }

   

  render() {
    return (
      <div>
        <div>
          <h5 className='my-4'>Booking Information</h5>

          <div className="row  mt-5">

            <div className="col-sm-5">
              <p><b>Check-IN Date</b></p>
              <p><b>Check-Out Date</b></p>
              <p>Total Room</p>
              <p>Total Days</p>
              {this.props.show_room_no.map((e, i) => {
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
              <p><b>{this.props.check_in}</b></p>
              <p><b>{this.props.check_out}</b></p>
              <p>{this.props.show_room_no.length}</p>
              <p>{this.props.total_day - 1}</p>

              {this.props.show_room_no.map((e, i) => {
                return <>

                  <p className='mt-5'><b>{e}</b></p>
                  <p><b>{this.props.room_type_select[i]}</b></p>
                  <p>{this.props.adult[`room_no${e}`]}</p>
                  <p>{this.props.child[`room_no${e}`]}</p>

                  <div className="d-flex">
                    {this.props.len_of_roomno.map((vals) => {
                      return <>
                        <p className='mx-1'>{this.props.room_values[`room_no${e}`][vals]},</p></>
                    })}</div>
                  {this.props.calculates[`room_no_${this.props.room_type_select[i]}_${e}`] !== undefined && <p>{this.props.calculates[`room_no_${this.props.room_type_select[i]}_${e}`]}</p>}
                </>
              })}
              <p className='mt-3'><b>{this.props.grand_total}</b></p>
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
            <input className="form-check-input" onChange={() => this.setState({isShowPaymentBox: true})} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
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
            <input className="form-check-input" onChange={(e)=>{this.setState({cashMode:e.target.value})}} type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              <i class="fa fa-cc-stripe"></i>Cash
         </label>
          </div>

          <div className="row pt-3 pb-5">
            <div className="col-2"><label for="dob">Advance</label></div>
            <div className="col-8"><input onChange={(e) => { this.setState({ advance: e.target.value }) }} value={this.state.advance} type="Number" className="form_in" id="advance" name="advance" placeholder="Advance" required /></div>
          </div>

          {this.state.cashMode ==="on" && <button type="submit" className='btn btn-primary' onClick={()=>{this.go_pay()}}>Make Payment</button>}

          {/* {this.state.isShowPaymentBox && <PaymentStripe grand_total={this.state.grand_total}/>} */}
          {this.state.isShowPaymentBox && <PaymentStripe payment={this.payment_load()}  cashMode={this.state.cashMode}  grand_total={this.state.grand_total}/>}

          {/* <Button onClick={this.go_pay} variant="primary">Make Payment</Button> */}
          </div>
            </div>
        );
    }
}

export default Payment;