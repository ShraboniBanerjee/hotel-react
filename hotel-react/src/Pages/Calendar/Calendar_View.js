import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import { Scheduler } from "@aldabil/react-scheduler";
import Loading from '../../images/Loading';

class Calendar_View extends Component {
  constructor(props) {
    super(props);
    let url = this.props.url
    let property = localStorage.getItem("property")
    this.state = {
      url_link: `${url}calendar/${property}/`,
      room_data: [],
      events: [],
      room_type: [],
      default_room_type: '',
      room_number: [],
      default_room_number: '',
      loading: true
    }
  }


  componentDidMount() {
    this.updateRates()


    this.checkToken()
    this.error = (parsedata) => {
      if (parsedata.msg === "error") {
        localStorage.removeItem("logintoken")
        window.location.href = "/login";
      }
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

  updateRates = async () => {


    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/rates/"

    let url = this.state.url_link


    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
    })

    let parse_data = await data.json()
    this.setState({ loading: false })
    this.setState({ room_type: parse_data.roomtype_serial })
    console.log(parse_data.roomtype_serial)
    this.setState({ room_data: parse_data.Bookings_serial })
    this.setState({ default_room_type: parse_data.room_type })
    this.setState({ room_number: parse_data.room_serial })
    this.setState({ default_room_number: parse_data.room_number })
    parse_data.Bookings_serial.forEach((room, i) => {
      this.state.events.push({
        event_id: room.id,
        title: `user ${room.guest.first_name} ${room.guest.last_name} Booked this room`,
        start: new Date(room.startDate),
        end: new Date(room.endDate),
      }
      )
    })

  }

  room_selection = async (event) => {
    this.checkToken()
    
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.url_link
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        "option": "booking",
        "room_number": event.target.value
      }),
    })
    let room_data = await data.json()
    
    this.setState({default_room_number:event.target.value})
    console.log(event.target.value)
    console.log(room_data)
    room_data.Bookings_serial.forEach((room, i) => {
      this.state.events.push({
        event_id: room.id,
        title: `user ${room.guest.user.first_name} ${room.guest.user.first_name} Booked this room`,
        start: new Date(room.startDate),
        end: new Date(room.endDate),
      }
      )
    })
    
  }

  selection = async (e) => {
    this.setState({ loading: true })
    console.log(e.target.value)
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.url_link
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        'option': "room",
        "room_type": e.target.value
      }),
    })
    let room_data = await data.json()
    this.setState({ room_number: room_data.room_serial })
    this.setState({ default_room_number: room_data.room_number })
    this.setState({ loading: false })
    this.setState({default_room_type:e.target.value})
  }

  render() {
    return (<>{this.state.loading ? <Loading /> :
      <div>
       
        <div className="row">
          <div className="col-2">
            <h5 className=''>Select Room Type</h5>
            <div className="select">
              <select onChange={this.selection} aria-label="Default select example">
                {this.state.room_type.map((element) => { return <option selected={element.room_all_type === this.state.default_room_type && element.room_all_type} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
              </select>
            </div>
          </div>
          <div className="col-2">
            <h5 className=''>Room Number</h5>
            <div className="select">
              <select onChange={this.room_selection} aria-label="Default select example">
                {this.state.room_number.map((element) => { return <option selected={element.number === this.state.default_room_number && element.number} value={element.number}>{element.number}</option> })}
              </select>
            </div>
          </div>
        </div>
        <p></p>

        <Scheduler
          view="month"
          events={this.state.events}
        />

      </div>
    }</>
    )
  }
}

export default adminLayout(Calendar_View);