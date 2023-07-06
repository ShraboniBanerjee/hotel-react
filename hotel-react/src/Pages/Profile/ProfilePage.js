import React from "react";
import "../../assets/css/profile.css"
import userProfileLayout from "../../hoc/userProfileLayout";
import Table from 'react-bootstrap/Table';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        let url_link = this.props.url
        
        this.state = {
            user_id: "",
            user_role: "",
            id: "",
            user_name: "",
            last_name: "",
            name: "",
            email: "",
            number: "",
            role: "",
            user_profile: [],
            url: `${url_link}userprofile/`,
            user_data: [],
            loading: false,
            edit: "true",
            dob: "",
            gender: "",
            address_1: "",
            address_2: "",
            guest_city: "",
            state: "",
            guest_country: "",
            bookings:[]

        }
    }

    checkToken = () => {
        if (localStorage.getItem("logintoken")) {
            // get token and do anything
            this.setState(JSON.parse(localStorage.getItem("logintoken")))
        }
    }

    componentDidMount() {
        this.checkToken()
        this.updateRates()
    }


    updateRates = async () => {
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let data_user = JSON.parse(localStorage.getItem("data"))
        let id = data_user.userid
        let url = `${this.state.url}${id}/`
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
        })
        let user_data = await data.json()
        console.log(user_data)
        this.setState({ user_role: user_data.user_role })
        this.setState({bookings:user_data.guest_bookings})
        this.setState({ user_data: user_data.users_data })
        this.state.user_data.map((user) => {
            this.setState({ user_name: user.user.username })
            this.setState({ name: user.user.first_name })
            this.setState({ email: user.user.email })
            this.setState({ last_name: user.user.last_name })
            this.setState({ number: user.phoneNumber })
            this.setState({ dob: user.guest_dob })

            this.setState({ gender: user.gender })
            this.setState({ address_1: user.address_1 })
            this.setState({ address_2: user.address_2 })
            this.setState({ guest_city: user.guest_dob })
            this.setState({ state: user.guest_dob })
            this.setState({ guest_country: user.guest_dob })
        })

    }
    edit = () => {
        this.setState({ edit: 'false' })
    }

    pdf = async () => { 
        // pdf file
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let data_user = JSON.parse(localStorage.getItem("logintoken"))
        let id = data_user.userid

        let url = `${this.state.url}${id}/`
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: "pdf",
            }),
        })
        let room_data = await data.json()
        let alink = document.createElement('a');
        alink.href = room_data;
        alink.download = 'SamplePDF.pdf';
        alink.click();
    }

    bill_pdf = async () => {
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/roomtype-rates/"
        let data_user = JSON.parse(localStorage.getItem("logintoken"))
        let id = data_user.userid

        let url = `${this.state.url}${id}/`
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: "bill_pdf",
            }),
        })
        let room_data = await data.json()
        let alink = document.createElement('a');
        
        alink.href = room_data;
        alink.download = 'SamplePDF.pdf';
        alink.click(room_data);
    }


    render() {
        return <>
            <div className="profile-form">
                <div className="d-flex">
                    <h6>Personal Info</h6>
                {/* {this.state.edit === "true" &&  <button onClick={this.edit} className="btn-danger" style={{ marginLeft: "20px", width: "50px", height: "30px", borderRadius: "10px" }}>edit</button>} */}
                {this.state.user_role === 'guest' && <button onClick={this.pdf} className="btn-danger" style={{ marginLeft: "20px", width: "50px", height: "30px", borderRadius: "10px" }}>pdf</button>}
                {this.state.user_role === 'guest' && <button onClick={this.bill_pdf} className="btn-danger" style={{ marginLeft: "20px", width: "80px", height: "30px", borderRadius: "10px" }}>bill pdf</button>}
                {this.state.user_role === 'guest' && <button onClick={this.guest_doc_pdf} className="btn-danger" style={{ marginLeft: "20px", width: "80px", height: "30px", borderRadius: "10px" }}>guest doc pdf</button>}
                </div>
                {this.state.user_role !== 'guest' ? (
                    <form>
                        {this.state.user_data.map((user) => {
                            return <>
                                <div className="row" key={user.id}>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                        <div className="input-group mb-3">
                                            <input value={user.user.username} type="text" className="form-control" placeholder="Username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <div className="input-group mb-3">
                                            <input value={user.user.email} type="text" className="form-control" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2">@</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.user.first_name : this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} type="text" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.user.last_name : this.state.last_name} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Contact Number</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.phoneNumber : this.state.number} type="text" className="form-control" placeholder="Contact Number" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-mobile"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3">
                                <button type="submit" className="confirm-btn">Confirm</button>
                                </div>

                                {/* {this.state.edit === "false" && <button type="submit" className="btn btn-default">Submit</button>} */}
                            </>
                        })}
                    </form>
                    
                ) : (<>
                {/* If not guest then */}
                    <form>
                        {this.state.user_data.map((user) => {
                            return <>
                                <div className="row" key={user.id}>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                        <div className="input-group mb-3">
                                            <input value={user.user.username} type="text" className="form-control" placeholder="Username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <div className="input-group mb-3">
                                            <input value={user.user.email} type="text" className="form-control" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2">@</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.user.first_name : this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} type="text" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.user.last_name : this.state.last_name} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Contact Number</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.phoneNumber : this.state.number} type="text" className="form-control" placeholder="Contact Number" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-mobile"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">guest country</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.guest_country : this.state.guest_country} type="text" className="form-control" placeholder="Contact Number" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-mobile"></i></span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">guest_dob</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.guest_dob : this.state.dob} onChange={(e) => { this.setState({ dob: e.target.value }) }} type="date" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">guest gender</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.guest_gender : this.state.gender} onChange={(e) => { this.setState({ gender: e.target.value }) }} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">address 1</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.address_1 : this.state.address_1} onChange={(e) => { this.setState({ address_1: e.target.value }) }} type="text" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">address 2</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.address_2 : this.state.address_2} onChange={(e) => { this.setState({ address_2: e.target.value }) }} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">city</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.guest_city : this.state.guest_city} onChange={(e) => { this.setState({ guest_city: e.target.value }) }} type="text" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">state</label>
                                        <div className="input-group mb-3">
                                            <input value={this.state.edit === "true" ? user.state : this.state.state} onChange={(e) => { this.setState({ state: e.target.value }) }} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                        </div>
                                    </div>
                                </div>

                                {this.state.edit === "false" && <button type="submit" className="btn btn-default">Submit</button>}
                            </>
                        })}
                    </form>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Room no.</th>
                                <th>Reservation Date</th>
                                <th>Check in Date</th>
                                <th>Check out Date</th>
                                <th>room type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bookings.map((booking_data)=>{return <tr key={booking_data.id}>
                                <td>{booking_data.roomNumber.number}</td>
                                <td>{booking_data.dateOfReservation}</td>
                                <td>{booking_data.startDate}</td>
                                <td>{booking_data.endDate}</td>
                                <td>{booking_data.roomType}</td>
                            </tr>
                            })}
                        </tbody>
                    </Table>
                </>)}
            </div>

        </>
    }
}


export default userProfileLayout(ProfilePage);