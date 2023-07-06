import React, { useState, useEffect } from 'react'
import adminLayout from "../../hoc/adminLayout"
import { json, useNavigate, useParams, Link } from 'react-router-dom';
import Loading from '../../images/Loading';
import Table from 'react-bootstrap/Table';
import guest_profile from '../../assets/images/guest_profile.png'
import ConvertDateTime from '../Common_Fun/ConvertDateTime';
import Tables from '../Constants/Tables';

function withParams(Component) {
    return props => <Component {...props} vs="eee" params={useParams()} />;
}

function UserDetails(props) {
    let navigate = useNavigate()
    let { id } = props.params;

    console.log(id)
    let url_link = props.url
    let url = `${url_link}subscription/`

    const [page_load, setPage_load] = useState(true)
    const [guest, setGuest] = useState([])
    const [msg, setMsg] = useState('yes')
    const [bookings, setBookings] = useState([])
    const [bookings_msg, setBookings_msg] = useState(true)
    const title = {'Room No':["value['roomNumber']['number']"],'Room Type':['roomType','select'],'Start Date':['startDate','date'],
    'End Date':["endDate","date"],"Reservation":["dateOfReservation","date"],"Booking Time":["timeOfBooking","none"],"Received Payment":['amountReceived',"none"]}
    const [selectVal,setSelectVal] = useState([])


    const checkToken = () => {
        if (localStorage.getItem("logintoken")) {
            // get token and do anything
            if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
                localStorage.removeItem("logintoken")
                window.location.href = "/login";
            }
        }
    }

    useEffect(async () => {

        // Update the document title using the browser API

        checkToken()

        updateRates()

    }, []);



    function error(parsedata) {
        if (parsedata.msg === "error") {
            localStorage.removeItem("logintoken")
            window.location.href = "/login";
        }
    }

    const updateRates = async () => {
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let property = localStorage.getItem("property")
        let new_url = `${url}${property}/${id}/`



        setPage_load(true)
        let data = await fetch(new_url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        })
        let parsedata = await data.json()
        setBookings(parsedata.booking_serial)
        setGuest(parsedata.serializer)

        let roomTypes = []
        parsedata.roomType_serial.map((roomVal)=>{
            roomTypes.push(roomVal.room_all_type)
        })

        let select = {'Room Type':roomTypes}

        setSelectVal(select)

        if (parsedata.msg === "no data") {
            setMsg('no')
            navigate('/SubscriptionView')
        }
        if (parsedata.booking_msg === 'no') {
            setBookings_msg(false)
        }
        if (parsedata.msg !== 'no') {
            setPage_load(false)
        }
    }

    
    

    return (
        page_load ? <Loading /> :
            <div>
                {msg === "yes" ? <div>
                    <h3 className="head">User Profile Details</h3>
                    <section className="vh-50" style={{ backgroundColor: "#f4f5f7" }}>
                        <div className="container py-5 h-50">
                            <div>
                                <div>
                                    <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                        <div className="row g-0">
                                            <div className="col-md-4 gradient-custom text-center "
                                                style={{ borderTopLeftRadius: ".5rem;", borderBottomLeftRadius: ".5rem" }}>
                                                <img src={guest.image ? guest.image.split("?")[0] : guest_profile} alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                                <h5>{guest.first_name} {guest.last_name}</h5>
                                                <p className="text-muted">{guest.email}</p>

                                                <i className="far fa-edit mb-5"></i>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body p-4">
                                                    <h6>Personal Information</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>DOB</h6>
                                                            <p className="text-muted">{guest.guest_dob}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Phone</h6>
                                                            <p className="text-muted">{guest.phoneNumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Gender</h6>
                                                            <p className="text-muted">{guest.guest_gender}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>subscription status</h6>
                                                            <p className="text-muted">{guest.subscription ? <>subscribed</> : <>unsubscribed</>}</p>
                                                        </div>
                                                    </div>
                                                    <h6>Address</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>address</h6>
                                                            <p className="text-muted">{guest.address_1}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>city</h6>
                                                            <p className="text-muted">{guest.guest_city}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>state</h6>
                                                            <p className="text-muted">{guest.state}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>country</h6>
                                                            <p className="text-muted">{guest.guest_country}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                        <div className="row g-0">

                                           
                                        <Tables data={bookings} input={true} select_val={selectVal} title={title}  page={"UserDetails"} />

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>
                </div> : <h5> there is no guest exists</h5>}
            </div>
    )
}


export default withParams(adminLayout(UserDetails));