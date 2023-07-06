import React from 'react'
import adminLayout from "../../hoc/adminLayout"
import "../../assets/css/rates.css"
import { json, useParams, Link } from 'react-router-dom';
import Loading from '../../images/Loading';
import Multiselect from 'multiselect-react-dropdown';
import ConvertDateTime from '../Common_Fun/ConvertDateTime';
import AlertDismissible from '../Common_Fun/AlertDismissible';
import Form from 'react-bootstrap/Form';

class Base_rate extends React.Component {
    constructor(props) {
        super(props);
        this.props = props

        const url_link = this.props.url
        let property = localStorage.getItem("property")
        this.state = {
            notzero: '',
            url: `${url_link}rates/${property}/`,
            rate_url: `${url_link}roomtype-rates/${property}/`,
            cloesArival: 'no',
            closeDeparture: 'no',
            extraCharge: 'no',
            startdate: null,
            enddate: null,
            sample: [],
            days: [],
            conditionstart: [],
            conditionend: [],
            check_len: [],
            msg: "",
            error_message: '',
            msgType: "",
            roomtypes: [],
            room_rate: [],
            calculate: 0,
            indexcal: [],
            selectfunval: false,
            this_room: [],
            myroom_type: [],
            intervalName: "",
            accommodation_default: '',
            all_values: [],
            status: [],
            todayDate: new Date().toISOString().slice(0, 10),
            page_load: true,
            btn_type: '',
            options: [],
            modal: 'none',
            select_room_id: [],
            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        }
    }


    checkToken = () => {
        if (localStorage.getItem("logintoken")) {
            // get token and do anything
            this.setState(JSON.parse(localStorage.getItem("logintoken")))
            this.setState({ message: "User already exists" })
            if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
                localStorage.removeItem("logintoken")
                window.location.href = "/login";
            }
        }
    }
    async componentDidMount() {
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        });
        let parsedata = await data.json()

        this.setState({ accommodation_default: parsedata.accommodation_type })

        this.state.room_rate.push(parsedata.room_types[0]['room_rate'])
        this.setState({ this_room: parsedata.room_types[0]['room_rate'] })
        this.setState({ myroom_type: parsedata.room_types[0]['room_all_type'] })

        this.setState({ roomtypes: parsedata.room_types })
        if (parsedata.msg !== 'no' || parsedata['page_permissions'].includes('send') !== false) {
            this.setState({ page_load: false })
        }
    }
    error(parsedata) {
        if (parsedata.msg === "error") {
            localStorage.removeItem("logintoken")
            window.location.href = "/login";
        }
    }
    changeeve = (event) => {
        this.setState({ notzero: event.target.value })
        if (this.state({ notzero: event.target.value <= 0 })) {
            this.setState({ notzro: "" })
        }

        else {
            this.setState({ notzro: event.target.value })
        }
    }


    extraCharge = (event) => {

        this.setState({ extraCharge: event.target.value })

    }


    confirm_copy = () => {
        this.setState({ show_checkbox: true })
        let all_values = []
        this.state.roomtypes.map((accommodation) => {

            if (accommodation.room_all_type !== this.state.accommodation_default) {
                all_values.push({ name: accommodation.room_all_type, id: accommodation.id })
            }
        })
        this.setState({ options: all_values })
        this.setState({ modal: 'block' })
    }

    handleSubmit = async (option_name) => {
        //e.preventDefault();

        let eventname = this.state.intervalName
        let startdate = document.getElementById('startdate')
        let enddate = document.getElementById('enddate')
        let minlos = document.getElementById('minlos')
        let maxlos = document.getElementById('maxlos')
        let closeDeparture = ''
        let cloesArival = ''
        let extraCharge = ''
        let extra_rs = 0


        if (document.getElementById('closeDeparture1').checked) {
            closeDeparture = document.getElementById('closeDeparture1').value;
        }
        else {
            closeDeparture = 'no'
        }

        if (document.getElementById('cloesArival1').checked) {
            cloesArival = document.getElementById('cloesArival1').value;
        }
        else {
            cloesArival = 'no'

        }

        if (document.getElementById('extraCharge1').checked) {
            extraCharge = true
            extra_rs = document.getElementById('extraamount').value
        }
        else {
            extraCharge = false
            extra_rs = 0
        }

        this.setState({ all_values: [] })
        let days_val = {}

        let start_d = startdate.value
        start_d = new Date(start_d)

        let avialble_dates = []
        for (let i = 0; i < this.state.check_len; i++) {
            if (i === 0) {
                start_d.setDate(start_d.getDate())

            }
            else {
                start_d.setDate(start_d.getDate() + 1)
            }

            let convert = ConvertDateTime(start_d, 'date')

            //let convert = this.format_date(start_d,'date')
            let start_da = `${start_d.getDate()}-${start_d.getMonth() + 1}-${start_d.getFullYear()}`

            this.state.all_values.push(document.getElementById(`ratesval${i}`).value)
            days_val[convert] = document.getElementById(`ratesval${i}`).value

        }

        days_val = JSON.stringify(days_val)

        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url


        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: option_name,
                interval_name: eventname,
                start_date: startdate.value,
                end_date: enddate.value,
                min_los: minlos.value,
                max_los: maxlos.value,
                closed_arrivals: cloesArival,
                closed_departure: closeDeparture,
                week_day: `${this.state.all_values}`,
                day_rate: days_val,
                room_rent: this.state.this_room,
                local_room_type: this.state.myroom_type,
                extra_charge_rs: extra_rs,
                extra_charge: extraCharge,
                total_days: this.state.check_len,
                copy_interval: this.state.select_room_id
            })

        }).then((response) => response.json())
            .then((data) => {

                this.error(data)
                this.setState({ error_message: data.msg })
                if (data.msg === 'data Successfully added') {
                    this.setState({ msgType: "success" })
                    this.setState({ status: 'pass' })
                }
                else {
                    this.setState({ msgType: "danger" })
                    this.setState({ status: 'fail' })
                }
                document.getElementById('myform').reset()
                // Handle data
            })
            .catch((err) => {

            });
        //        window.location.reload()
    }

     


    add_changes = () => {
        this.setState({ modal: 'none' })

        let continue_this = true
    
        let inputs = document.myform.getElementsByTagName("input")
        for (let i = 0; i < inputs.length; i++) {
            // only validate the inputs that have the required attribute
            if (inputs[i].hasAttribute("required")) {
                if (inputs[i].value === "") {
                    this.setState({error_message:"please fill the form"})
                    continue_this = false
                }
              
            }
        }
        if(continue_this){
            console.log("here-x")
            
            this.handleSubmit("copy_data")
        }
    }



    add_changes = () => {
        this.setState({ modal: 'none' })

        let continue_this = true

        let inputs = document.myform.getElementsByTagName("input")
        for (let i = 0; i < inputs.length; i++) {
            // only validate the inputs that have the required attribute
            if (inputs[i].hasAttribute("required")) {
                if (inputs[i].value === "") {
                    this.setState({ msgType: "danger" })
                    this.setState({ error_message: "please fill the form" })
                    continue_this = false
                }
            }
        }
        if (continue_this) {


            this.handleSubmit("copy_data")
        }
    }

    myfun = () => {

        if (this.state.sample.length <= 4) {

            let start_da = this.state.sample.indexOf('start') + 1
            start_da = this.state.sample[start_da]
            let end_da = this.state.sample.indexOf('end') + 1
            end_da = this.state.sample[end_da]
            start_da = new Date(start_da)
            end_da = new Date(end_da)

            if (end_da >= start_da) {

                let mynew = new Date(start_da)
                let myvalue = Math.abs(end_da - start_da)
                let diffDays = myvalue / (1000 * 60 * 60 * 24)
                this.setState({ check_len: diffDays })
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                this.setState({ days: [] })


                let days = []
                for (let i = 0; i < diffDays; i++) {

                    mynew.setDate(mynew.getDate() + 1);
                    days.push(weekdays[mynew.getDay()])

                }
                this.setState({ days: days })
            }
            else {
                this.setState({ msg: "please enter valid" })
            }
        }
    }



    mycondition = () => {


        ////////////////////////

        if (this.state.sample.length <= 4) {
            this.myfun()
        }


    }
    startdate = (e) => {

        if (!this.state.sample.includes('start')) {
            this.state.sample.push('start')
        }
        if (this.state.sample.length <= 4) {
            let position = this.state.sample.indexOf('start') + 1
            if (this.state.sample[position] !== String(e.target.value)) {
                if (this.state.sample[position] !== undefined) {
                    this.state.sample.splice(position, 1, e.target.value)
                }
                else {
                    this.state.sample.push(e.target.value)
                }

            }

        }
        this.mycondition()
        this.calculate()
    }

    enddate = (e) => {

        if (!this.state.sample.includes('end')) {
            this.state.sample.push('end')
        }
        if (this.state.sample.length <= 4) {
            let position = this.state.sample.indexOf('end') + 1
            if (this.state.sample[position] !== String(e.target.value)) {
                if (this.state.sample[position] !== undefined) {
                    this.state.sample.splice(position, 1, e.target.value)
                }
                else {
                    this.state.sample.push(e.target.value)
                }
            }

        }

        this.mycondition()
        this.calculate()
    }

    selectfun = async (e) => {
        this.checkToken()

        this.setState({ selectfunval: true })
        this.setState({ myroom_type: e.target.value })
        this.setState({ accommodation_default: e.target.value })
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        // let url = `https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/roomtype-rates/`
        let url = this.state.rate_url
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                room_type: e.target.value

            })


        }).then((response) => response.json())
            .then((data) => {
                this.error(data)
                if (this.state.room_rate.length >= 1) {
                    this.state.room_rate.pop();
                }

                this.state.room_rate.push(data.room_rent)
                this.setState({ this_room: data.room_rent })
                let start_da = this.state.sample.indexOf('start') + 1
                start_da = this.state.sample[start_da]
                let end_da = this.state.sample.indexOf('end') + 1
                end_da = this.state.sample[start_da]
                if (this.state.sample.length <= 4) {
                    start_da = new Date(start_da)
                    end_da = new Date(end_da)
                    if (end_da >= start_da) {
                        let myvalue = Math.abs(end_da - start_da)
                        let diffDays = myvalue / (1000 * 60 * 60 * 24)
                        let total = diffDays * parseInt(data)
                        this.setState({ calculate: total })
                        this.calculate()
                        // Handle data
                    }
                }
                else {
                    this.setState({ calculate: 0 })
                    this.calculate()
                }

            })
            .catch((err) => {

            });
        this.calculate()
    }

    calculate = () => {
        //////////
        if (this.state.sample.length <= 4) {
            let start_da = this.state.sample.indexOf('start') + 1
            start_da = this.state.sample[start_da]
            let end_da = this.state.sample.indexOf('end') + 1
            end_da = this.state.sample[end_da]


            start_da = new Date(start_da)
            end_da = new Date(end_da)

            if (end_da >= start_da) {
                let myvalue = Math.abs(end_da - start_da)
                // let myvalue = Math.abs(end_da.getTime() - start_da.getTime())
                let diffDays = myvalue / (1000 * 60 * 60 * 24)
                // let diffDays = Math.ceil(myvalue / (1000 * 3600 * 24))


                let add = 0

                for (let i = 0; i <= diffDays; i++) {
                    //        // Handle data

                    // let thevalues = document.getElementById(`ratesval${i}`).value
                    let thevalues = 0

                    if (document.getElementById(`ratesval${i}`) !== null) {
                        thevalues = parseInt(document.getElementById(`ratesval${i}`).value)
                    }
                    else {
                        thevalues = 0
                    }

                    if (isNaN(thevalues)) {
                        thevalues = 0
                    }


                    add += thevalues
                    this.setState({ calculate: add })
                }
            }

        }
    }

    myinput = (inputEv, index) => {

        const value = inputEv.target.value;

        this.setState({ room_rate: (stte) => stte.map((val, i) => (i !== index ? val : value)) });
        this.calculate()

    }

    myroom = (e) => {
        this.setState({ this_room: e.target.value })
    }

    onRemove = (e) => {

        const select_room_id = []
        e.map((room) => {

            if (select_room_id.includes(room.id) === false) {

                select_room_id.push(room.id)
            }
        })
        this.setState({ select_room_id: select_room_id })
    }

    msgFun = () => {
        this.setState({ error_message: "" })
    }

    render() {
        return (<>{this.state.page_load ? <Loading /> :
            <div>
                {this.state.error_message !== '' && <AlertDismissible msgFun={this.msgFun} time={6} type={this.state.msgType} msg={this.state.error_message} />}


                <form name='myform' id='myform' onSubmit={() => this.handleSubmit("save_data")}>

                    {/* model start */}

                    <div className="modal active" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ display: this.state.modal }}>


                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Copy Rates  </h5>
                                    <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ modal: 'none' })}>
                                        <span aria-hidden="true">&times;</span>
                                    </span>
                                </div>
                                <div className="modal-body">
                                    <Multiselect
                                        options={this.state.options} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={(e) => { e.map((room) => { this.state.select_room_id.includes(room.id) === false && this.state.select_room_id.push(room.id) }) }} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type='button' onClick={this.add_changes} className="btn btn-primary">Add changes</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ modal: 'none' })}>Close</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* model end */}

                    <h1 className='head'>{this.state.subtitle}</h1>
                    <div className='row baserate my-5' >
                        <div className="col-2 my-3">
                            <h5 className='mb-3'>Select Room Type</h5>


                            <div className="">
                                <span className='ract'></span>
                                <Form.Select className='newSelect WD' onClick={this.selectfun} onChange={this.selectfun} aria-label="Default select example">
                                    {this.state.roomtypes.map((element) => { return <option selected={element.room_all_type === this.state.accommodation_default && this.state.accommodation_default} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
                                </Form.Select>
                            </div>
                        </div>
                        <div className="col-3 MT">
                            <button onClick={this.confirm_copy} type="button" className="btn AddRate mx-3">Copy Rate</button>
                        </div>
                    </div>
                    <div className="header baseHead" style={{
                        width: "100%"
                    }}>
                        <h2 className="title1 baseTitle"><p className='baseP'>All Rates</p> </h2>
                        <div className="baseHead2">

                            <div className="row mt-5" >
                                <div className="col-4">

                                    <div className="form-group w-75" >
                                        <label htmlFor="exampleInputEmail1">Interval Name</label>
                                        <input type="text" className="form-control mt-3 " value={this.state.intervalName} onChange={(e) => { this.setState(({ intervalName: e.target.value })) }} id="event" aria-describedby="emailHelp" placeholder="Enter event" required />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="form-group w-75">
                                        <label htmlFor="example">Start Date</label>
                                        <input placeholder="Select date" onSelect={(e) => this.startdate(e)} min={this.state.todayDate} onChange={(e) => this.startdate(e)} type="date" id="startdate" className="form-control mt-3 " required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group w-75">
                                        <label htmlFor="example">End Date</label>
                                        <input placeholder="Select date" onSelect={(e) => this.enddate(e)} min={this.state.todayDate} onChange={(e) => this.enddate(e)} type="date" id="enddate" className="form-control mt-3 " required />

                                    </div>
                                </div>
                            </div>

                            <div className="row my-3  mt-4" >

                                <div className="col-4">

                                    <div className="form-group w-75">
                                        <label htmlFor="exampleInputEmail1">Min Los</label>
                                        <input type="number" className="form-control mt-3 " id="minlos" aria-describedby="emailHelp" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group w-75">
                                        <label htmlFor="example">Max Los</label>
                                        <input type="number" className="form-control mt-3 " id="maxlos" aria-describedby="emailHelp" required />

                                    </div>
                                </div>
                                <div className="col-4">

                                    <div className="form-group w-75">
                                        <label htmlFor="exampleInputEmail1">Room rent</label>
                                        <input type="number" onChange={this.myroom} value={this.state.this_room} className="form-control mt-3 " id="minlos" aria-describedby="emailHelp" required />
                                    </div>
                                </div>



                            </div>
                            <div className="row my-3 mt-4" >

                                <div className="col-4">
                                    <div className="form-group w-75">
                                        <label htmlFor="example" >Closed To Departure</label><br />
                                        <div className="mt-3 form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="closeDeparture" id="closeDeparture1" value="yes" required />
                                            <label className="form-check-label" htmlFor="closeDeparture1">yes</label>
                                        </div>
                                        <div className="mt-3 form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="closeDeparture" id="closeDeparture2" value="no" />
                                            <label className="form-check-label" htmlFor="closeDeparture2">no</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group w-75">
                                        <label htmlFor="example">Closed To Arival</label><br />
                                        <div className="mt-3 form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="cloesArival" id="cloesArival1" value="yes" required />
                                            <label className="form-check-label" htmlFor="cloesArival1">yes</label>
                                        </div>
                                        <div className="mt-3 form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="cloesArival" id="cloesArival2" value="no" />
                                            <label className="form-check-label" htmlFor="cloesArival2">no</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group w-75" onChange={this.extraCharge.bind(this)}>
                                        <label htmlFor="example" >Do You Want Extra Charge</label><br />
                                        <div className="mt-3 form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="extraCharge" id="extraCharge1" value="yes" required />
                                            <label className="form-check-label" htmlFor="extraCharge1">yes</label>
                                        </div>
                                        <div className="mt-3 form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="extraCharge" id="extraCharge2" value="no" />
                                            <label className="form-check-label" htmlFor="extraCharge2">no</label>
                                        </div>  <div className="form-check form-check-inline">

                                        </div>
                                    </div>


                                </div>
                                {this.state.extraCharge === 'yes' ? (
                                    <div className="col-3">
                                        <div className="form-group w-75">
                                            <label htmlFor="extrachargeamount">Enter Extra Charge Amount</label>
                                            <input type="number" className="form-control mt-3 " id="extraamount" aria-describedby="emailHelp" required />
                                        </div>
                                    </div>) : (<></>)}
                            </div>
                            <hr />
                            <div className="row my-3" >

                                {this.state.days.length !== 0 ? (
                                    <div style={{
                                        overflowX: "scroll",
                                        "display": "flex",
                                        maxWidth: "1200px",
                                        width: "1200px"
                                    }}>
                                        <div className="col-3 day mb-3 mx-3">
                                            <div className="form-group">
                                                <div className="labelDay">
                                                    <label className='fontDay' htmlFor="exampleInputEmail1">Total</label>
                                                </div>
                                                <input type="number" value={this.state.calculate} min="0" onChange={this.changeeve} className="form-control mb dayRate" disabled="disabled" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        {this.state.days.map((element, index) => {
                                            return <>
                                                <div className="col-3 day mb-3 mx-3 me-3">
                                                    <div className="form-group">
                                                        <div className="labelDay">
                                                            <label className='fontDay' htmlFor="exampleInputEmail1">{element}</label>
                                                        </div>
                                                        <input type="number" onChange={(e) => this.myinput(e, index)} value={this.state.room_rate[0]} min='0' className="form-control dayRate" id={`ratesval${index}`} aria-describedby="emailHelp" />

                                                    </div><br />
                                                </div> </>
                                        })}
                                    </div>) : (<>
                                        <div style={{ maxWidht: '100%', "display": "flex" }}>
                                            <div className="col-3 day mx-3">
                                                <div className="form-group">
                                                    <div className="labelDay">
                                                        <label className='fontDay' htmlFor="exampleInputEmail1">Total</label>
                                                    </div>
                                                    <input type="number" value={this.state.calculate} min="0" onChange={this.changeeve} className="form-control dayRate" disabled="disabled" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                </div>
                                            </div>
                                            {this.state.weekdays.map((day) => {
                                                return <div className="col-3 day mx-3">
                                                    <div className="form-group">
                                                        <div className="labelDay">
                                                            <label className='fontDay' htmlFor="exampleInputEmail1">{day}</label>
                                                        </div>
                                                        <input type="number" value={this.state.room_rate} min="0" onChange={this.changeeve} className="form-control dayRate" disabled="disabled" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                                    </div>
                                                </div>
                                            })}

                                        </div> </>)}


                                <div></div>
                           
                            </div>
                            <input  type="button" onClick={() => { this.handleSubmit("save_data") }} value="Submit" className="btn mb-5 mLeft btn-danger" />
                        </div>
                    </div>
                </form>
            </div>}</>
        )
    }

}

export default adminLayout(Base_rate);