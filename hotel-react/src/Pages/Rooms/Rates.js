import React from 'react'
import adminLayout from "../../hoc/adminLayout"
import "../../assets/css/rates.css"
import { Link } from 'react-router-dom';
import imagenew from '../../assets/images/NewEdit.png'
import imagenew1 from '../../assets/images/NewDelete.png'
import 'reactjs-popup/dist/index.css';
import Loading from '../../images/Loading';
import rate_style from "../../assets/css/rates.module.css"
import Multiselect from 'multiselect-react-dropdown';
import AlertDismissible from '../Common_Fun/AlertDismissible';
import Form from 'react-bootstrap/Form';

class Rates extends React.Component {


    constructor(props) {
        super(props);

        const url_link = this.props.url
        let fd = "fd"
        let subtitle = this.props.subtitle
        this.state = {
            ratesdata: [], roomtype: [],
            alldays: [],
            subtitle: subtitle,
            currentRoomId: [],
            id: [],
            msgType: "",
            total: [],
            url: `${url_link}rates/`,
            url_roomtype: `${url_link}roomtype-rates/`,
            delete_id: 0,
            room_rate: [],
            rates: [],
            calculate: 0,
            diff: [],
            newval: [],
            msg: "",
            loading: false,
            property: "",
            roomTypes: [],
            new_rates: {},
            new_dates: [],
            new_entrys: {},
            page_load: true,
            page_permission: '',
            show_checkbox: false,
            modal: 'none',
            expanded: false,
            options: [],
            myroom_type: '',
            accommodation_default: '',
            select_room_id: [],
            all_room_id: [],
            show_confirm: false,


        }
    }


    baserate = () => {
        document.getElementById('rate').style.display = 'none';
    };


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
        let property = localStorage.getItem("property")
        let url = `${this.state.url}${property}/`
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        })
        let parsedata = await data.json()
        if (parsedata.msg !== 'no') {
            this.setState({ page_load: false })
        }
        this.error(parsedata)
        this.setState({ myroom_type: parsedata.accommodation_type })
        this.setState({ accommodation_default: parsedata.accommodation_type })
        this.setState({ page_permission: parsedata['page_permissions'] })
        this.setState({ loading: false })
        this.setState({ ratesdata: parsedata.rates_data })
        this.setState({ roomTypes: parsedata.room_types })
    }

    close = () => {
        this.setState({ modal: 'none' })
        this.setState({ show_checkbox: false })
        this.setState({ show_confirm: false })

    }

    selectfun = async (e) => {
        this.checkToken()

        let property = localStorage.getItem("property")


        let a = (JSON.parse(localStorage.getItem("logintoken")))

        let url = `${this.state.url_roomtype}${property}/`


        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                room_type: e.target.value

            }),
        })
        let room_data = await data.json()
        this.error(room_data)
        this.setState({ loading: false })
        this.setState({ ratesdata: room_data.rates })
    }


    handleEdit = async (id) => {
        let vals = this.state.new_dates
        console.log(vals)
        console.log(this.state.new_rates)
        // new_entrys
        for (let i = 0; i < this.state.diff; i++) {

            // let thevalues = document.getElementById(`ratesval${i}`).value
            let thevalues = parseInt(document.getElementById(`myval${i}`).value)

            this.state.new_rates[vals[i]] = thevalues
            console.log("[", vals[i])
        }
        console.log(this.state.new_rates)
        let vals_update = JSON.stringify(this.state.new_rates)
        let property = localStorage.getItem("property")
        let a = (JSON.parse(localStorage.getItem("logintoken")))

        let url = `${this.state.url}${property}/${id}/`
        let data = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                week_day: `${vals_update}`
            })
        });
        data = await data.json()
        this.error(data)
        this.setState({ msg: data.msg })
        if (data.msg.includes("updated")) {
            this.setState({ msgType: "success" })
        }
        else {
            this.setState({ msgType: "danger" })
        }



    }
    getdays = async (rates, id) => {

        let theday = rates.split('_')[1]

        let k = JSON.parse(theday)
        let keys = []
        for (let ke in k) {
            keys.push(ke)
        }
        console.log("--", k)
        this.setState({ new_rates: k })

        let diff_day = parseInt(rates.split('_')[2])
        this.setState({ diff: diff_day })

        // this.state.ratesdata.map((e =>{ console.log(typeof JSON.parse("[" + e.week_day + "]") )}))

        let myid = id
        if (myid === this.state.currentRoomId) {

            this.setState({ currentRoomId: "no" })
            return false;
        }
        else {

            this.setState({ currentRoomId: myid })
        }


        this.state.id.push(myid)
        // if (!this.state.id.includes(myid)){
        this.checkToken()

        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let property = localStorage.getItem("property")
        let url = `${this.state.url}${property}/${myid}/`
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        });
        let parsedata = await data.json()
        this.error(parsedata)
        let some_day = parsedata.new_days
        console.log("--=", some_day)
        this.setState({ new_dates: some_day })
        let new_vals = []
        for (let i = 0; i < parsedata.days.length; i++) {
            new_vals.push(parseInt(k[keys[i]]))
        }

        this.setState({ rates: new_vals })


        this.setState({ total: parsedata.total })
        this.setState({ alldays: parsedata.days })


        // console.log(this.state.alldays[0].room_rent)

        // }
    }

    delete_it = async () => {
        document.getElementById("myModal").style.display = "none"
        let myid = this.state.delete_id
        this.checkToken()

        let a = (JSON.parse(localStorage.getItem("logintoken")))
        // let url = `https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/rates/${myid}`
        let property = localStorage.getItem("property")
        let url = `${this.state.url}${property}/${myid}/`
        let data = await fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        });
        this.error(data)
        this.updateRates();
    }

    delete_this = (e) => {

        document.getElementById("myModal").style.display = "block";
        let myid = e.target.id
        this.setState({ delete_id: myid })
    }

    myinput = (inputEv, index) => {

        const value = inputEv.target.value;


        this.setState({ rates: (stte) => stte.map((val, i) => (i !== index ? val : value)) });

        let add = 0
        document.getElementById(`myval${index}`).value = value;

        for (let i = 0; i <= this.state.diff; i++) {
            //        // Handle data

            // let thevalues = document.getElementById(`ratesval${i}`).value
            let thevalues = 0

            if (document.getElementById(`myval${i}`) !== null) {
                thevalues = parseInt(document.getElementById(`myval${i}`).value)

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

    confirm_copy = () => {
        this.setState({ show_checkbox: true })
        let all_values = []
        this.state.roomTypes.map((accommodation) => {

            if (accommodation.room_all_type !== this.state.myroom_type) {
                all_values.push({ name: accommodation.room_all_type, id: accommodation.id })
            }
        })
        this.setState({ options: all_values })
    }

    select_check = () => {
        const room_dict = []
        const all_id = document.querySelectorAll('.copy')
        let all_id_len = all_id.length
        for (let i = 0; i < all_id_len; i++) {
            let room_id = document.getElementById(`${all_id[i].id}`)
            if (room_id.checked === true) {

                let element_id = room_id.id.replace("room_id_", '')
                room_dict.push(element_id)
            }

            if (room_dict.length > 0) {

                this.setState({ show_confirm: true })
            }
            else (
                this.setState({ show_confirm: false })
            )
        }
        this.setState({ all_room_id: room_dict })
    }

    select_option = () => {
        let checkList = document.getElementById('list1');
        if (!this.state.expanded) {
            checkList.style.display = "block";
            this.setState({ expanded: true })
        } else {
            checkList.style.display = "none";
            this.setState({ expanded: false })
        }


    }




    copy_this = async () => {
        this.checkToken()

        this.setState({ modal: 'none' })
        this.setState({ show_confirm: false })
        this.setState({ show_checkbox: false })


        let property = localStorage.getItem("property")

        let a = (JSON.parse(localStorage.getItem("logintoken")))

        let url = `${this.state.url}${property}/`


        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: "copy_data",
                all_room: this.state.all_room_id,
                copy_interval: this.state.select_room_id,
                interval_name: false
            }),
        })
        let room_data = await data.json()
        this.setState({ msg: room_data.msg })

        if (room_data.msg.includes("successfully")) {
            this.setState({ msgType: "success" })
        }
        else {
            this.setState({ msgType: "danger" })
        }
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

    setMsg = () => {
        this.setState({ msg: "" })
    }

    render() {
        return (<> {this.state.page_load ? <Loading /> : <> <div>

            {/* model start */}

            <div className="modal active" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ display: this.state.modal }}>
                <form action="" method="POST" className="my-5">

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header modelHead">
                                <h5 className="modal-title" id="exampleModalLabel">Copy Rates  </h5>
                                <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ modal: 'none' })}>
                                    <span aria-hidden="true">&times;</span>
                                </span>
                            </div>
                            <div className="modal-body">
                                <Multiselect
                                    className="multiselect"
                                    options={this.state.options} // Options to display in the dropdown
                                    selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={(e) => { e.map((room) => { this.state.select_room_id.includes(room.id) === false && this.state.select_room_id.push(room.id) }) }} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.copy_this} type="button" className="btn btn-primary">Add changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }}>close</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            {/* model end */}


            {this.state.msg !== '' && <AlertDismissible msgFun={this.setMsg} time={6} type={this.state.msgType} msg={this.state.msg} />}


            <div className="rate" id='rate' style={this.ratefun}>

                <div className="d-flex">
                    {this.state.page_permission.includes('send') === true &&
                        <div className="mx-4">
                            <Link tag="button" type="button" onClick={this.baserate} className="btn AddRate" to="/base_rates">Add Rate</Link>
                        </div>
                    }

                    <div className="mx-3">
                        <button onClick={this.confirm_copy} type="button" className="btn AddRate">Copy Rate</button>
                    </div>

                    {this.state.show_checkbox === false &&
                        <>
                            <div className="">
                                <h5 style={{fontSize:"20px",color:"#3D3737"}} className='mx-5'>Select Room Type</h5>
                            </div>
                             {this.state.msg ==="" && <div className="">
                            
                                <div className=''>
                                <span className='ract'></span>
                                    <Form.Select className='newSelect' onClick={this.selectfun} onChange={this.selectfun} aria-label="Default select example">

                                        {this.state.roomTypes.map((element) => { return <option selected={element.room_all_type === this.state.accommodation_default && this.state.accommodation_default} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}

                                    </Form.Select>
                                </div>
                            </div>}
                        </>}
                </div>


                <div className="accordion k col-12 my-3" id="accordionExample">

                    <div className=" col-12 k">
                        <h2 className="ss k " id="headingOne">
                            <button className="accordion-button accordion-Change k" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Room Types and Rates
                            </button>
                        </h2>

                    </div>
                </div>
            </div>




            <div id="collapseOne" className="accordion-collapse collapse show d" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {this.state.loading && <Loading />}
                    {!this.state.loading && <div className="row d1">

                        <div className="col-1">Name</div>
                        <div className="col-1 wd marg">Start Date</div>
                        <div className="col-1 wd">End Date</div>
                        <div className="col-1">Min Los</div>
                        <div className="col-1">Max Los</div>
                        <div className="col-1">closed arrivals</div>
                        <div className="col-1">closed departure</div>
                        <div className="col-1">Extra Charge</div>
                        <div className="col-1">Days Of Week</div>
                        <div className="col-1">Room Rent</div>
                        <div className="col-1">Edit/Delete</div>
                    </div>}
                    <div id="accordionExample">


                        {this.state.ratesdata.map((element) => {
                            return <>

                                <div className="row d1 my-3">
                                    <div className="col-1">{this.state.show_checkbox && <input onClick={this.select_check} className="copy form-check-input" type="checkbox" value="" id={`room_id_${element.id}`} />}{element.interval_name}</div>
                                    <div className="col-1 wd marg">{element.start_date}</div>
                                    <div className="col-1 wd">{element.end_date}</div>
                                    <div className="col-1">{element.min_los}</div>
                                    <div className="col-1">{element.max_los}</div>
                                    <div className="col-1">{element.closed_arrivals}</div>
                                    <div className="col-1">{element.closed_departure}</div>
                                    <div className="col-1">{element.extra_charge_rs}</div>
                                    <div className="col-1">{element.total_days}</div>
                                    <div className="col-1">{element.room_rent}</div>

                                    {/* NOTE:- please do not change the class name and position if you want to add the class then add after the data like if you want to add col-1 in class  then add it like className = {`img ${element.week_day} ${element.total_days} col-1`} */}

                                    <div className="col-1"><img className={`img`} src={imagenew} id={`${element.id}`} name={`${element.room_rent}`} onClick={() => { this.getdays(`a_${element.day_rate}_${element.total_days}`, `${element.id}`) }} alt="" />
                                        {this.state.page_permission.includes('delete') &&
                                            <img className='img' id={element.id} onClick={this.delete_this} src={imagenew1} alt="" />}</div>
                                    <hr />
                                </div>

                                <div id={`${element.interval_name}`} className="accordion-collapse max-w  collapse" aria-labelledby={`${element.interval_name}`} data-bs-parent={`${element.interval_name}`} style={{ display: this.state.currentRoomId === String(element.id) ? "block" : "none" }}>
                                    <div className="accordion-body row d-flex max-w">
                                        <div className="row  my-3">

                                            <div className="col-2 mx-3">
                                              
                                                <div className="form-group">
                                                    <p><b>Price</b></p>
                                                    <p className='Cal'><b className='mx-2 mt-2'>{this.state.calculate}</b></p>
                                                </div>
                                                
                                            </div>
                                            {this.state.page_permission.includes('edit') && <div className="col-2"> <button  onClick={() => this.handleEdit(element.id)} className='btn EditConfirm'>confirm</button></div>} 

                                            <div style={{
                                                overflowX: "scroll",
                                                "display": "flex",
                                                maxWidth: "1200px",
                                                width: "1200px"

                                            }}>
                                                {this.state.alldays.map((e, index) => {
                                                    return <>
                                                        <div className="col-1 day mb-2 mx-3 me-3">
                                                            <div className="form-group">
                                                                <div className="labelDay">
                                                                <label className='fontDay' htmlFor="exampleInputEmail1">{e}</label>
                                                                </div>
                                                                <input name='edit_rate' type="number" style={{ pointerEvents: this.state.page_permission.includes('edit') ? 'auto' : 'none' }} onChange={(event) => this.myinput(event, index)} value={this.state.rates[index]} min="0" className="form-control dayRate" id={`myval${index}`} aria-describedby="emailHelp" />
                                                                {/* <input type="number" onChange={(event) => this.myinput(event, index)} value={this.state.room_rate[index]} min="0"  className="form-control ratein" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}
                                                            </div><br />
                                                        </div>
                                                    </>
                                                })}

                                            </div>
                                            
                                        </div></div>
                                </div></>
                        })}
                        {this.state.show_confirm && <button onClick={() => { this.setState({ modal: 'block' }) }} style={{ borderRadius: '20px' }} className="btn btn-success">confirm</button>}
                    </div>
                </div>
            </div>

        </div>
            <div id="myModal" className="modal">


                <div className="modal-content">
                    <span onClick={() => document.getElementById("myModal").style.display = "none"} className="close">&times;</span>
                    <p>do you want to delete this id</p>
                    <input type='button' value='confirm' onClick={this.delete_it} className='popup-btn' />
                </div>

            </div> </>}

        </>)
    }
}

export default adminLayout(Rates);