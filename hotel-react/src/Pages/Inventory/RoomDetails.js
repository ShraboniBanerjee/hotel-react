import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Loading from '../../images/Loading';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import roomstyle from "../../assets/css/roomdetails.module.css"
import check_mark from '../../assets/images/check_mark.png'
import close from '../../assets/images/close.png'
import i from '../../assets/images/i.png'

class RoomDetails extends Component {
    constructor(props) {
        super(props);
        const url_link = this.props.url
        let property = localStorage.getItem("property")

        this.state = {
            url: `${url_link}room-inventory-api/${property}/`,
            room_data: [],
            get_room: [],
            room_type: [],
            room_status: 'all_rooms',
            search: false,
            select_roomtype: [],
            total_rooms: [],
            booked_room_count: [],
            booked_room: [],
            facility:[],
            loading:false,
            short_roomtype:[],
            short_maxO:[],
            other_facility:[]
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

    componentDidMount() {
        this.checkToken()

        this.updateRates()
    }
    error(parsedata) {
        if (parsedata.msg === "error") {
            localStorage.removeItem("logintoken")
            window.location.href = "/login";
        }
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
        console.log("parsedata",parsedata)
        this.setState({ booked_room: parsedata.booking_data })
        this.setState({ room_data: parsedata.rooms })
        this.setState({ get_room: parsedata.rooms })
        this.setState({ room_type: parsedata.room_type })
        this.setState({ total_rooms: parsedata.total_rooms })
        this.setState({ booked_room_count: parsedata.booked_room_count })
        
        const room_type = {'King':'King','Luxury':'Suite ','Economic':'ECO','Big Size':'Big Size','Dimaond':'Dimaond'}
        const max_occupancy = {'Single':'SGL','Double':'DBL','Triple':'TRPL','Quad':'QD','Queen':'QB','Twin':'TWN'}
        parsedata.facility.map((facility_data)=>{
            facility_data = JSON.parse(facility_data.facilitys_name)
            this.setState({ other_facility:facility_data})
        })
        console.log("---------",parsedata.facility)
        parsedata.rooms.map((room)=>{
            if(room_type[room.roomType] === undefined){
                room_type[room.roomType] = room.roomType
            }
            if(max_occupancy[room.typeroom] === undefined){
                max_occupancy[room.typeroom] = room.typeroom
            }
        })

        this.setState({short_roomtype:room_type})
        this.setState({short_maxO:max_occupancy})
        if (parsedata.msg !== 'no') {
            this.setState({ loading: false })
        }
    }

    roomlist = async (e) => {

        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url
        this.checkToken()
        this.setState({ room_status: "all_rooms" })
        if (e.target.checked) {
            let data = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'Authorization': "Bearer " + a['token']
                },
                body: JSON.stringify({
                    option: "allroom",
                    room_type: "search_roomtype",
                    select_roomtypes: this.state.select_roomtype
                }),
            })
            let room_data = await data.json()
            this.setState({ room_data: room_data.rooms })

        }
        else {
            console.log(this.state.search)
            //this.setState({room_data:this.state.booked_room})
            this.setState({ room_data: this.state.get_room })
            if (this.state.search) {

                this.setState({ room_status: "available_rooms" })
                let data = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': "application/json",
                        'Authorization': "Bearer " + a['token']
                    },
                    body: JSON.stringify({
                        option: "allroom",
                        room_type: "no",
                        select_roomtypes: this.state.select_roomtype

                    }),
                })
                let room_data = await data.json()
                console.log(room_data)
                this.setState({ room_data: room_data.rooms })
                this.setState({ room_status: "available_rooms" })
                this.setState({ get_room: room_data.rooms })
                this.setState({ search: false })
            }
        }

    }

    search_roomtype = async () => {
        this.setState({ search: true })
        const selected_roomtype = []
        this.state.room_type.map((e) => {
            let id = e.room_all_type
            let roomtype_id = document.getElementById(`${id}`)
            if (roomtype_id.checked) {
                selected_roomtype.push(id)
            }

        })
        this.setState({ select_roomtype: selected_roomtype })
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url

        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: "roomtype",
                select_roomtypes: selected_roomtype
            }),
        })
        let room_data = await data.json()
        if (this.state.room_status === "all_rooms") {
            this.setState({ get_room: room_data.rooms })
        }
        this.setState({ room_data: room_data.rooms })
        this.setState({ search: false })
    }

    render() {
        return (<>
            {this.state.loading ? <Loading/> :
            <div>
                <h6 className="head">ROOM OPTIONS AVAILABLE</h6>
                <div className="d-flex" style={{ marginTop: "20px" }}>
                    <h6 >All Rooms</h6>
                    <label style={{ marginLeft: "20px" }} className={roomstyle.switch}>
                        <input onClick={this.roomlist} className={roomstyle.myinput} type="checkbox" />
                        <span className={`${roomstyle.slider} ${roomstyle.round}`}></span>
                    </label><h6 style={{ marginLeft: "20px" }}>Available Rooms</h6>
                </div>
                <p style={{ marginTop: "20px" }}>Enter the room options in order see the result of your choosen type of rooms.
                </p>

                <p></p>

                <Form>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <div className="row">
                            {this.state.room_type.map((room_type) => {return <div key={room_type.id} className="d-flex col-4">
                                      <Form.Check label={`${room_type.room_all_type}`} name="group1" type={type} id={`${room_type.room_all_type}`} /> 
                                    <h6 className='mx-3'>{`${this.state.booked_room_count[room_type.room_all_type]}`} Room Available (Rent : {room_type.room_rate})</h6>
                                </div>})}
                            </div>
                        </div>
                    ))}
                </Form>

                <Button onClick={this.search_roomtype} variant="primary"> Search </Button>

                <p></p>

                <Row>
                    {this.state.room_data.map((room) => {
                        return <Col key={room.number_id} style={{ marginTop: "20px" }}>
                            <Card style={{ width: '18rem' }}>

                                <Card.Img style={{ height: '200px', width: '285px' }} variant="top" src={room.image && room.image.split("?")[0]} />

                                <Card.Body>
                                    <h1>Room Number : {room.number}</h1>
                                    <h1>{this.state.short_roomtype[room.roomType]} {this.state.short_maxO[room.typeroom]} <span><img title={`${room.roomType} room with ${room.typeroom} bed`} src={i} alt="" className={roomstyle.i} /></span> </h1>
                                    <h2>BEST AVAILABLE RATE</h2>
                                    <h6 style={{ color: "red" }}>NON SMOKING</h6>
                                    <h6>Base Occupancy: 2 | Max Occupancy: {room.typeroom} </h6>
                                    <h6>Max Adult: {room.max_adults} | Bed Count: {room.numberOfBeds} </h6>
                                    <div className={roomstyle.facility}>
                                    {room.facilitys !=="" ?
                                    Object.keys(JSON.parse(room.facilitys)).map((f) =>{return <p><img className={roomstyle.check_img} src={JSON.parse(room.facilitys)[f] ==="Yes"?check_mark:close} alt="" />{f}</p>})
                                    :Object.keys(this.state.other_facility).map((f)=>{return <p><img className={roomstyle.check_img} src={this.state.other_facility[f] ==="Yes"?check_mark:close} alt="" />{f}</p>})}
                                    </div>
                                    <p></p>
                                    
                                    <td><Link to={`/Room_view/${room.number_id}`} state={{ movie:"ss" }} type="button" className="btn btn-primary">View</Link>{' '}</td>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
                <p></p>

            </div>}
            </>
        )
    }
}

export default adminLayout(RoomDetails);