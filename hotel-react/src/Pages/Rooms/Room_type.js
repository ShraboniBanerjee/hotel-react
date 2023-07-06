import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Loading from '../../images/Loading';
import { Tab } from 'react-bootstrap';
import Tables from '../Constants/Tables';
import AlertDismissible from '../Common_Fun/AlertDismissible';

class Room_type extends Component {
    constructor(props) {
        super(props);

        const url_link = this.props.url
        let property = localStorage.getItem("property")
        let subtitle = this.props.subtitle
        this.state = {
            url: `${url_link}add-rooms-api/${property}/`,
            firstdate: "",
            lastdate: "",
            subtitle: subtitle,
            for_roomtype: '',
            rent: '',
            roomnumber: "",
            msgType:"danger",
            NOBeds: "",
            roomtype: "",
            occupancy: "",
            capacity: "",
            facility_modal: "none",
            price: "",
            backend_roomtype: [],
            backend_occupancy: [],
            room_data: [],
            loading: false,
            loading2: true,
            page_permissions: '',
            room__id: '',
            room__number: '',
            msg: '',
            room_status_list: ['Available', 'UnderMaintenance', 'Outoforder', 'Occupied', 'O/Dirty', 'V/Dirty'],
            room_status: '',
            for_roomtype_price: '',
            add_room: false,
            add_room_name: '',
            add_room_rent: '',
            option: '',
            add_max_adult: '',
            add_max_child: '',
            room_type_key: [],
            title: {
                'Room Type': ["room_all_type", 'none'], 'Price': ["room_rate", 'none'], 'Max Adult': ["max_adult", 'none'], 'Max Child': [
                    "max_child", "none"]
            },
            actionType: '',
            max_adult_num: '',
            max_child_num: '',
            default_price: '',
            specific_data: ''
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

    buttonType = (actionType, values) => {
        console.log("-===+")
        console.log(actionType, values)
        if (actionType === "edit") {
            this.setState({ option: 'edit_roomtype' })
        }
        else {
            this.setState({ option: 'delete_roomtype' })
        }
        console.log(actionType)
        this.setState({ max_adult_num: values.max_adult })
        this.setState({ max_child_num: values.max_child })
        this.setState({ default_price: values.room_rate })
        this.setState({ actionType: actionType })
        this.setState({ specific_data: values.room_all_type })
        this.setState({ facility_modal: 'block' })

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
        console.log("---0000")
        this.setState({ loading2: true })
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

        this.setState({ room_data: parsedata.room_types })
        let all_new = Object.keys(parsedata.room_types[0])
        const index = all_new.indexOf('hotel');
        if (index > -1) { // only splice array when item is found
            all_new.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({ room_type_key: all_new })
        console.log(all_new)
        this.setState({ page_permissions: parsedata.room_type_permissions })
        if (parsedata.msg2 !== 'no') {
            this.setState({ loading2: false })
        }
    }

    addRoom = () => {
        this.setState({ option: "addtype" })
        this.setState({ specific_data: '' })
        this.setState({ max_adult_num: '' })
        this.setState({ max_child_num: '' })
        this.setState({ default_price: '' })
        this.setState({ facility_modal: 'block' })
    }


    setMsg = () =>{
        console.log("-------")
        this.setState({msg:""})
    }

    confirm = async (room_type, option) => {
        this.setState({ facility_modal: 'none' })
        let val
        let max_count
        let max_child_count
        let condition = true
        if (option === "edit_roomtype") {
            val = this.state.default_price
            max_count = this.state.max_adult_num
            max_child_count = this.state.max_child_num
        }
        else if (option === "delete_roomtype") {
            val = 1
            max_count = 1
            max_child_count = 1
        }
        else {
            room_type = room_type.replaceAll(/\s/g, '')
            room_type = room_type.charAt(0).toUpperCase() + room_type.slice(1)
            console.log("-=-=-=", option)
            val = this.state.default_price
            max_count = this.state.max_adult_num
            max_child_count = this.state.max_child_num
        }

        if (val === "" || parseInt(val) === 0) {
            condition = false
            this.setState({ msg: "please enter valid rent" })
        }

        else if (max_count === "" || parseInt(max_count) === 0) {
            condition = false
            this.setState({ msg: "please enter valid number of adult" })
        }

        else if (max_child_count === "" || parseInt(max_child_count) === 0) {
            condition = false
            this.setState({ msg: "please enter valid number of child" })
        }
        console.log("-=-", option,this.state.msg)
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url
        if (condition) {
            let data = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'Authorization': "Bearer " + a['token']
                },
                body: JSON.stringify({
                    option: option, // status add edit or delte 
                    select: "room_type",
                    roomtype: room_type, // room type name
                    room_rate: val,
                    max_adult: max_count,
                    max_child: max_child_count
                }),
            })
            let room_data = await data.json()
            this.error(room_data)
            this.setState({ modal: 'none' })
            if(room_data.msg.includes("successfully")){
                this.setState({msgType:"success"})
                this.updateRates()
            }
            this.setState({ msg: room_data.msg })
        }
    }

    

    render() {
        return (<>
            {this.state.loading2 ? <Loading /> :
                <div>
           
                        {this.state.msg !== '' &&  <AlertDismissible time={6} msgFun={this.setMsg} type={this.state.msgType} msg={this.state.msg} />}
               
                    {this.state.page_permissions.includes('send') && this.state.add_room === false && <button onClick={() => { this.addRoom() }} className="btn mb-4 btn-primary">Add</button>}

                    <Tables input={false} title={this.state.title} buttonType={this.buttonType} page={"Room_type"} permissions={this.state.page_permissions} button={{ 'edit': 'none', 'delete': 'none' }} keys={this.state.room_type_key} data={this.state.room_data} />


                </div>
            }
            <div className="modal  active " id="delete_room" tabIndex="-1" role="dialog" aria-labelledby="delete_room" aria-hidden="false" style={{ display: this.state.facility_modal }}>
                <form action="" method="POST" className="my-5">

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="delete_faciltiy">{this.state.option === 'edit_roomtype' ? <>Edit</> : this.state.option === 'addtype' ? <>Add</> : <> Delete</>} Accommodation</h5>
                                <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ facility_modal: 'none' })}>
                                    <span aria-hidden="true">&times;</span>
                                </span>
                            </div>
                            <div className="modal-body">
                                {this.state.option === 'delete_roomtype' ? <>do you want to delete Room type</> :
                                    <div className='container'>
                                        {this.state.option === "edit_roomtype" ? <b>{this.state.specific_data}</b> :
                                            <><label className='mt-2' htmlFor='roomType'>Room Type</label> <br />
                                                <input type="text" id="roomType" value={this.state.specific_data} onChange={(e) => { this.setState({ specific_data: e.target.value }) }} /></>} <br />
                                        <label className='mt-2' htmlFor='price'>Price</label> <br />
                                        <input type="number" id="price" value={this.state.default_price} onChange={(e) => { this.setState({ default_price: e.target.value }) }} /> <br />
                                        <label className='mt-2' htmlFor='adult'>Max Adult</label> <br />
                                        <input type="number" id="adult" value={this.state.max_adult_num} onChange={(e) => { this.setState({ max_adult_num: e.target.value }) }} /> <br />
                                        <label className='mt-2' htmlFor="child">Max Child</label> <br />
                                        <input type="number" id="child" value={this.state.max_child_num} onChange={(e) => { this.setState({ max_child_num: e.target.value }) }} /> <br />
                                    </div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => this.confirm(this.state.specific_data, this.state.option)} className="btn btn-primary">Confirm</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ facility_modal: 'none' })}>Close</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </>
        )
    }
}
export default adminLayout(Room_type);