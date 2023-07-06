import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from '../../images/Loading';


class Arrivals extends Component {
  constructor(props) {
    super(props);
    let property = localStorage.getItem("property")
    let subtitle = this.props.subtitle
    const url_link = this.props.url
    this.state = {
      reservation_date: "",
      name: "",
      start_date: "",
      number: "",
      end_date: "",
      url: `${url_link}arrivals-api/${property}/`,
      url1: `${url_link}departures-api/${property}/`,
      employe_data: [],
      totals: [],
      loading: false,
      page_loading:true,
      status:"Arrival",
      status_date:"",
      subtitle:subtitle
    }
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

  componentDidMount() {
    this.checkToken()

    this.updateRates()
  
  }

  updateRates = async () => {
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },

    })
    let room_data = await data.json()
    console.log(room_data,"-------")
    if (room_data.msg !== 'no') {
      console.log(")))))))))")
      this.setState({ page_loading: false })
    }
   
  }

  error(parsedata){
    if (parsedata.msg === "error"){
        localStorage.removeItem("logintoken")
        window.location.href="/login";
    }
}

  datesearch = async () => {
    let option = "arrivaldate"
    this.checkToken()
    let my_url = this.state.url
    if (this.state.status === "Arrival"){
      my_url = this.state.url
    }
    else{
      my_url = this.state.url1
    }
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = my_url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: option,
        date:this.state.status_date
      }),
    })
    let booking_data = await data.json()
    this.error(booking_data)
    this.setState({ loading: false })
    this.setState({ employe_data: booking_data.bookings })
    this.setState({ totals: booking_data.totals })
  }

  filter = async () => {
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "filter",
        reservation_date: this.state.reservation_date,
        name: this.state.name,
        start_date: this.state.start_date,
        number: this.state.number,
        end_date: this.state.end_date,
      }),
    })
    let booking_data = await data.json()
    this.error(booking_data)
    this.setState({ loading: false })
    this.setState({ employe_data: booking_data.bookings })
    this.setState({ totals: booking_data.totals })

  }

  render() {
    return (<>
      {this.state.page_loading ? <Loading/>:
      <div>

        <h6 className="head">{this.props.subtitle}</h6>
       
        {/* <h3 className="head">{this.state.status === "Arrival" ?<>Arivals Page</>:<>Departure Page</>} </h3> */}

        <div className="d-flex">

          <Form.Group controlId="dob">
            <Form.Label>{this.state.status === "Arrival" ?<>Arivals Date</>:<>Departure Date</>}</Form.Label>
            <Form.Control onChange={(e)=>{this.setState({status_date:e.target.value})}} type="date" name="dob" placeholder="Date of Birth" />
          </Form.Group>
          <Button onClick={this.datesearch} variant="primary" style={{ marginLeft: '20px', height: '35px', marginTop: "30px" }}>Search</Button>{' '}
          <div className="mx-5" style={{marginTop:"35px"}}><div className="form-check form-check-inline">
            <input onClick={(e)=>{this.setState({status:e.target.value})}} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Arrival" />
            <label className="form-check-label" htmlFor="inlineRadio1">Arrival</label>
          </div>
            <div className="form-check form-check-inline">
              <input onClick={(e)=>{this.setState({status:e.target.value})}} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Departures" />
              <label className="form-check-label" htmlFor="inlineRadio2">Departures</label>
            </div>
          </div>
        </div>
        <p></p>

        <p></p>

        <h3>

        </h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Room Number
                <Form.Control
                  type="number"
                  id="text"
                  value={this.state.number}
                  onChange={(e) => { this.setState({ number: e.target.value }) }}
                />
              </th>
              <th>Guest Name
                <Form.Control
                  type="text"
                  id="text"
                  value={this.state.className}
                  onChange={(e) => { this.setState({ name: e.target.value }) }}
                />
              </th>
              <th>Date Of Reservation
                <Form.Control
                  type="date"
                  id="date"
                  value={this.state.reservation_date}
                  onChange={(e) => { this.setState({ reservation_date: e.target.value }) }}
                />
              </th>
              <th>Start Day
                <Form.Control
                  type="date"
                  id="text"
                  value={this.state.start_date}
                  onChange={(e) => { this.setState({ start_date: e.target.value }) }}
                />
              </th>
              <th>End Day
                <Form.Control
                  type="date"
                  id="text"
                  value={this.state.end_date}
                  onChange={(e) => { this.setState({ end_date: e.target.value }) }}
                />
              </th>
              <th>Number of Dependees
              </th>
              <th>Total amount
              </th>
              <th><Button onClick={this.filter} variant="warning">Filter</Button>{' '}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employe_data.map((employe) => {
              return <tr key={employe.id}>
                <td>{employe.roomNumber.number}</td>
                <td>{employe.guest.user.first_name} {employe.guest.user.last_name}</td>
                <td>{employe.dateOfReservation}</td>
                <td>{employe.startDate}</td>
                <td>{employe.endDate}</td>
                <td>{employe.roomNumber.price}</td>
                <td>{this.state.totals[employe.id]}</td>
                <td><Button variant="info">Detail</Button>{' '}</td>
              </tr>
            })}

          </tbody>
        </Table>
        {this.state.loading && <Loading />}
        
      </div>
      }
      </>
    )
  }
}


export default adminLayout(Arrivals);
