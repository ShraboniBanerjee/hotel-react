import React, { Component } from 'react'
import Guest_detail from './Guest_detail';
import Summery from './Summery';
import BookingDetails from './BookingDetails';
import Payment from './Payment';
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Moment from 'moment';
import "../../assets/css/rates.css"
import "../../assets/css/form_x.css"
import '../../assets/css/form_x.css'
import Loading from '../../images/Loading';



class MakeReservation extends Component {
  constructor(props) {
    super(props);
    let subtitle = this.props.subtitle
    let urllink = this.props.url
    let property = localStorage.getItem("property")

    this.state = {
      search_url: `${urllink}make-reservation-api/${property}/`,
      message_new: '',
      subtitle: subtitle,
      rooms: [],
      check_in: '',
      check_out: '',
      room_rate: [],
      days: [],
      rates: {},
      pay: [],
      diff: 0,
      total_day: 0,
      check_id: [],
      calculates: {},
      room_values: {},
      child: {},
      adult: {},
      summary_msg: '',

      user_info: [],
      guest_info: [],
      number_room: 0,
      user_name: '',
      show_room_no: [],
      len_of_roomno: [],
      room_type_select: [],
      grand_total: 0,
      todayDate: new Date().toISOString().slice(0, 10),
      page_load: true,
      page_permission: '',
      isRoomData: false,
      guest_summery: [],
      user_summery: [],
      show_guest: false,
      isSourceAdd: false,
      year_rate:[],
      room_type:[],
      default_room_type:''
    }

  }



  checkToken = () => {
    if (localStorage.getItem("logintoken")) {
      // get token and do anything
      this.setState(JSON.parse(localStorage.getItem("logintoken")))

      if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
        localStorage.removeItem("logintoken")
        window.location.href = "/login";
      }
    }
  }

  Guest_detail_data = (data) => {
    this.setState({ guest_summery: data.guest_info })
    this.setState({ user_summery: data.user_info })
    this.setState({ number_room: data.number_room })
    this.setState({ user_name: data.username })
    this.setState({ summary_msg: data.msg })

    this.setState({ show_guest: true })
    console.log(data)
  }

  error(parsedata) {
    if (parsedata.msg === "error") {
      localStorage.removeItem("logintoken")
      window.location.href = "/login";
    }
  }

  BookingDetails_data = (calculates, room_values, child, adult, show_room_no, room_type_select, len_of_roomno, grand_total) => {

    this.setState({ calculates: calculates })
    this.setState({ room_values: room_values })
    this.setState({ child: child })
    this.setState({ adult: adult })
    this.setState({ show_room_no: show_room_no })
    this.setState({ room_type_select: room_type_select })
    this.setState({ len_of_roomno: len_of_roomno })
    console.log(grand_total)
    this.setState({ grand_total: grand_total })
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
    this.setState({ room_type: parsedata.room_type })
    this.setState({ default_room_type: parsedata.default_room_type })
    console.log(parsedata)
    if (parsedata.msg !== 'no') {
      this.setState({ page_load: false })
    }
    this.error(parsedata)
    if (parsedata.msg !== 'no') {
      this.setState({ page_load: false })
    }
    this.setState({ page_permission: parsedata.page_permissions })

  }

  search = async () => {
    let check_in = document.getElementById('check_in').value
    let check_out = document.getElementById('check_out').value
    let room_type = document.getElementById("select_room_type").value
    this.setState({ reserve_check_in: check_in })
    this.setState({ reserve_check_out: check_out })
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
        option: 'search',
        room_type: room_type
      }),

    })
    let room_data = await data.json();
    console.log("room_data", room_data);
    this.error(room_data)
    check_in = new Date(check_in).toISOString().slice(0, 10)
    check_out = new Date(check_out).toISOString().slice(0, 10)
    this.setState({ check_in: Moment(check_in).format('DD-MM-YYYY') })
    this.setState({ check_out: Moment(check_out).format('DD-MM-YYYY') })
    this.setState({ rooms: room_data.rooms })
    this.setState({ isRoomData: true })
    this.setState({ room_rate: room_data.room_rate })
    this.setState({ days: room_data.days })
    this.setState({ pay: room_data.pay })
    this.setState({ diff: room_data.diff })
    this.setState({ total_day: room_data.total_Days })
    this.setState({year_rate:room_data.year_rate_serial})
  }

  payment_data = (msg) => {
    console.log("-->--", msg)
    this.setState({ message_new: msg })
    setTimeout(() => {
      this.setState({ message_new: '' })
    }, 9000);
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

  addSource = async () => {
    let source = document.getElementById('source').value
    console.log(source);

    let logintoken = (JSON.parse(localStorage.getItem("logintoken")));
    let url = this.state.search_url;

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + logintoken['token']
      },
      body: JSON.stringify({
        source: source
      }),
    })
    const sourceData = await data.json();
    console.log(sourceData);
  }




  render() {
    return (<>{this.state.page_load ? <Loading /> :
      <div>
        <ul style={{height: "10px"}} className="nav nav-tabs" id="myTab" role="tablist">
          <li style={{ visibility: 'hidden' }} className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Availability</button>
          </li>
          <li style={{ visibility: 'hidden' }} className="nav-item" role="presentation">
            <button className="nav-link" id="guest-tab" data-bs-toggle="tab" data-bs-target="#guests" type="button" role="tab" aria-controls="guest-tab" aria-selected="false">Details</button>
          </li>
          <li style={{ visibility: 'hidden' }} className="nav-item" role="presentation">
            <button className="nav-link" id="addon-tab" data-bs-toggle="tab" data-bs-target="#hotel" type="button" role="tab" aria-controls="hotel-tab" aria-selected="false">Add-Ons</button>
          </li>
          <li style={{ visibility: 'hidden' }} className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#booking" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Payment</button>
          </li>

          {/* new comment 1 */}
        </ul>

        {/* <---------------------------->>>>> Check-in search start <<<<<-----------------------------------> */}
        <div>

          {this.state.message_new != '' && <div className="alert alert-info">{this.state.message_new}</div>}
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">

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
                    <Form.Select id="select_room_type">
                      {this.state.room_type.map((room) => {
                        return <option key={room.id} value={room.room_all_type} selected={room.room_all_type === this.state.default_room_type}>{room.room_all_type}</option>
                      })}

                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <div className="container mt-3">
                <div className="row">

                  <div className="col-md-3">
                    <Form.Group id="formGridPromo" className=''>
                      <Form.Label>Enter Promo Code</Form.Label>
                      <Form.Control type="text" placeholder="code" className='' />
                    </Form.Group>
                  </div>

                  <div className="col-md-3">
                    <Form.Group id="formGridState">
                      <Form.Label>Source</Form.Label>
                      <Form.Select aria-label="Default select example" className="">
                        <option value="manager">Walk-in</option>
                        <option value="accountant">Telephone</option>
                        <option value="receptionist">Call center</option>
                        <option value="staff">OTA</option>
                        <option value="staff">Booking.com</option>
                        <option value="staff">Agoda.com</option>
                        <option value="staff">Expedia.com</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-1 mt-3"><Button onClick={() => (this.setState({ isSourceAdd: true }))} variant="primary" className="mt-3 fw-bold" title='Add Source'>+</Button></div>

                  {this.state.isSourceAdd &&
                    <div className="col-md-3 mt-2">
                      <Form.Group id="formGridPromo" className='d-flex justify-content-center align-items-center gap-2'>
                        <Form.Control type="text" id="source" placeholder="add source" className='w-75 mt-4' />
                        <Button variant="primary" onClick={this.addSource} className="mt-4">Add</Button>
                      </Form.Group>
                    </div>}

                </div>
              </div>
              <Button variant="primary" onClick={this.search} className="mt-3">Search</Button>

              {/* <---------------------------->>>>> Check-in search end <<<<<-----------------------------------> */}

              <BookingDetails BookingDetails_data={this.BookingDetails_data} page_permission={this.state.page_permission} total_day={this.state.total_day} room_rate={this.state.room_rate} year_rate={this.state.year_rate} days={this.state.days} check_in={this.state.check_in} check_out={this.state.check_out} rooms={this.state.rooms} isRoomData={this.state.isRoomData} pay={this.state.pay} />
            </div>
          </div>
          <div>
          </div>
        </div>
      
  
      {/* <-----------------------------------End search---------------------------------------------------> */}

      {/* <-----------------------------------Guest Details-----------------------------------------------> */}
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade " id="guests" role="tabpanel" aria-labelledby="guest-tab" tabIndex="0">
          <Guest_detail calculates={this.state.calculates} data={this.Guest_detail_data} room_values={this.state.room_values} num_child={this.state.child} num_adults={this.state.adult} check_in={this.state.check_in} check_out={this.state.check_out} url={this.state.search_url} />
        </div>
      </div>

      {/* --------------------------End Guest Details---------------------------------------- */}

      {/* --------------------------payment section---------------------------------------- */}
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade mx-5 " id="booking" role="tabpanel" aria-labelledby="booking-tab" tabIndex="0">
          <Payment calculates={this.state.calculates} room_type_select={this.state.room_type_select} check_in={this.state.check_in} email={this.state.email} check_out={this.state.check_out} payment_data={this.payment_data} adult={this.state.adult} child={this.state.adult} room_values={this.state.room_values} len_of_roomno={this.state.len_of_roomno} total_day={this.state.total_day} show_room_no={this.state.show_room_no} url_link={this.state.search_url} grand_total={this.state.grand_total} user_name={this.state.user_name} msg={this.state.summary_msg} />
        </div>

      </div>
      {/* --------------------------end payment section---------------------------------------- */}
      {/* <-----------------------------------Summery-----------------------------------------------> */}
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show " id="hotel" role="tabpanel" aria-labelledby="hotel-tab" tabIndex="0">
          {this.state.show_guest &&
            <>
              <Summery number_room={this.state.number_room} user_detail={this.state.user_summery} guest_detail={this.state.guest_summery} />
            </>
          }
        </div>
      </div>
      {/* <-----------------------------------End Summery-----------------------------------------------> */}

      </div>

  }
    </>)

  }
}

export default adminLayout(MakeReservation);