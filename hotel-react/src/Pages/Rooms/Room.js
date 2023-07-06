import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Loading from '../../images/Loading';
import Tables from '../Constants/Tables';


class Room extends Component {
  constructor(props) {
    super(props);
   
    const url_link = this.props.url
    let property = localStorage.getItem("property")
    let subtitle = this.props.subtitle
    this.state = {
      url: `${url_link}rooms-api/${property}/`,
      firstdate: "",
      lastdate: "",
      subtitle:subtitle,
      roomnumber: "",
      NOBeds: "",
      roomtype: "",
      occupancy: "",
      capacity: "",
      facility_modal:"none",
      price: "",
      backend_roomtype: [],
      backend_occupancy: [],
      room_data: [],
      loading:false,
      loading2 : true,
      page_permissions:'',
      room__id:'',
      room__number:'',
      msg:'',
      room_status_list:['Available','UnderMaintenance','Outoforder','Occupied','O/Dirty','V/Dirty'],
      room_status:'',
      title:{'Room Number':['number','number'],'Capacity':['capacity','number'],'Number Of Beds':['numberOfBeds','number'],
      'Room Type':['roomType','select'],'Max Occupancy':['typeroom','select'],'Price':['price','number'],'Room Status':['roomStatus','select']},
      select_val:[]
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
  error(parsedata){
    if (parsedata.msg === "error"){
        localStorage.removeItem("logintoken")
        window.location.href="/login";
    }
}
  
delete_it = async (e) => {
  this.checkToken()
  this.setState({ facility_modal: 'none' })
  let a = (JSON.parse(localStorage.getItem("logintoken")))
  let url = `${this.state.url}${e}/`
  let data = await fetch(url, {
      method: 'DELETE',
      headers: {
          'content-type': "application/json",
          'Authorization': "Bearer " + a['token']
      },

  });
  this.error(data)
  let room_data = await data.json()
  this.setState({msg:room_data.msg})
  setTimeout(() => {
    this.setState({ msg: '' })
  }, 6000);
  this.updateRates();
}
 
  updateRates = async () => {
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/rates/"
    let url = this.state.url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },

    })
    let parsedata = await data.json()
    this.error(parsedata)
    
    console.log(parsedata)
    this.setState({page_permissions:parsedata.page_permissions})
    
    this.setState({ backend_occupancy: parsedata.max_occupancy })
    this.setState({ backend_roomtype: parsedata.room_type })
    this.setState({ room_data: parsedata.rooms })
    let roomType = []
    let max_occupancy = []
    parsedata.room_type.map((RoomType)=>{
      roomType.push(RoomType.room_all_type)
    })
    
    parsedata.max_occupancy.map((MaxOccupancy)=>{
      max_occupancy.push(MaxOccupancy.occupancy)
    })

  
    console.log(parsedata.room_type['room_all_type'])
    let selectValues = {'Room Type':roomType,'Max Occupancy':max_occupancy,
    "Room Status":this.state.room_status_list
  }

    this.setState({select_val:selectValues})

    console.log("---",parsedata.rooms)
    if(parsedata.msg === 'no'){
      window.location.href = "/login";
    }
    else{
      this.setState({loading2:false})
    }
    this.setState({ loading: false })
  }

  buttonType = (button, value) =>{

    this.setState({ facility_modal: 'block' })
    this.setState({room__number:value.number})
    this.setState({room__id:value.number_id})
  
  }

  datefilter = async () => {
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/roomtype-rates/"
    let url = this.state.url

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "dateFilter",
        firstdate: this.state.firstdate,
        lastdate: this.state.lastdate
      }),
    })
    let room_data = await data.json()
    this.error(room_data)
    this.setState({ room_data: room_data.rooms })

  }
  

  roomfilter = async () => {

    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/roomtype-rates/"
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
        number: this.state.roomnumber,
        capacity: this.state.capacity,
        nob: this.state.NOBeds,
        type: this.state.roomtype,
        rtype: this.state.occupancy,
        price: this.state.price,
        firstdate: this.state.firstdate,
        lastdate: this.state.lastdate,
        roomStatus:this.state.room_status
      }),
    })
    let room_data = await data.json()
    this.error(room_data)
    this.setState({ loading: false })
    this.setState({ room_data: room_data.rooms })
  }

  render() {
    return (<>
      { this.state.loading2 ? <Loading/> : 

      <div>
        {this.state.msg !== '' && <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{this.state.msg}</strong> </div>}

        <p></p>
        {this.state.page_permissions.includes('send') && <Link to={`/Add_room`} state={{ movie:"ss" }} type="button" className="btn btn-primary">Add Rooms</Link>}


        <div className="row mt-3">
          <div className="col-md-4">
            <Form.Group controlId="dob">
              <Form.Label>First Date</Form.Label>
              <Form.Control value={this.state.firstdate} onChange={(e) => { this.setState({ firstdate: e.target.value }) }} type="date" name="dob" placeholder="Date of Birth" />
            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group controlId="dob">
              <Form.Label>Last Date</Form.Label>
              <Form.Control value={this.state.lastdate} onChange={(e) => { this.setState({ lastdate: e.target.value }) }} type="date" name="dob" placeholder="Date of Birth" />
            </Form.Group>
          </div>
          <div className="col-md-4 mt-4">
            <Button onClick={this.datefilter} variant="primary">filter</Button>{' '}
          </div>
        </div>

        <p></p>

        <p></p>


        <Tables data={this.state.room_data} input={true} select_val={this.state.select_val} title={this.state.title} buttonType={this.buttonType}  page={"Room"} permissions={this.state.page_permissions} button={{'view':'/Room_view/','edit':'/edit_room/','delete':'none'}} />
        
        {this.state.loading && <Loading/>}
        {/* <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}

      </div>
  }
  <div className="modal  active " id="delete_room" tabIndex="-1" role="dialog" aria-labelledby="delete_room" aria-hidden="false" style={{ display: this.state.facility_modal }}>
          <form action="" method="POST" className="my-5">

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="delete_faciltiy">Delete Room</h5>
                  <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ facility_modal: 'none' })}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
                <div className="modal-body">
              Do you want to delete room number {this.state.room__number}
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() =>this.delete_it(this.state.room__id)}  className="btn btn-primary">Delete</button>
                  <button type="button"  className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ facility_modal: 'none' })}>Close</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        

      </>
    )
  }
}

export default adminLayout(Room);