import React from "react";
import adminLayout from "../hoc/adminLayout"
import "./../assets/css/profile.css"
import { NavLink } from "react-router-dom";

const userProfileLayout = (ChildComponent) => {
    class UserProfilePageHoc extends React.Component {
        constructor(props) {
            super(props);
            let url_link = this.props.url

            this.state = {
                user_data: [],
                url: `${url_link}userprofile/`,
                property: [],
                address: '',
                msg:'',
                msg_time:''
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
            this.setState({ user_data: user_data.users_data })
            this.setState({ property: user_data.property })
            console.log("{}{}", user_data.users_data)

        }

        change_property = async() =>{
            let a = (JSON.parse(localStorage.getItem("logintoken")))
            let data_user = JSON.parse(localStorage.getItem("data"))
            let id = data_user.userid
            let url = `${this.state.url}${id}/`
            let property_val = document.getElementById("select_property").value
            let data = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'Authorization': "Bearer " + a['token']
                },
                body: JSON.stringify({
                    option:'change_property',
                    property:property_val,
                  }),
            })
            let user_data = await data.json()
            this.setState({msg_time:"no data"})
            localStorage.setItem("property", user_data.property);
            setTimeout(() => {
            this.setState({msg_time:''})
            }, 9000);
            console.log(",.",user_data.property)
        }

        property = () => {
            let property_val = document.getElementById("select_property").value
            console.log(property_val)
            if (property_val !== undefined) {
                this.state.property.map((e) => {
                    if (parseInt(e.id) === parseInt(property_val)) {
                        this.setState({address:e.address})
                        let msg = `welcome to hotel ${e.hotel_name} address ${e.address}`
                        this.setState({msg:msg})
                    }
                })
            }
        }

        render() {
            return <>
                <div className="container">
                {this.state.msg_time && <p className='alert alert-success fw-bold'>{this.state.msg}</p>}

                    <div className="row profile">
                        <div className="col-md-4">
                            <div className="profile-sidebar p-4">
                                    {/* <!-- SIDEBAR USERPIC --> */}
                                    <div className="profile-userpic d-flex justify-content-center align-items-center">
                                        <img src="https://randomuser.me/api/portraits/men/11.jpg" className="img-fluid d-block" alt="" />
                                    </div>
                                    {/* <!-- END SIDEBAR USERPIC -->

                                    <!-- SIDEBAR USER TITLE --> */}
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                            {this.state.user_data.map((e) => { return <>{e.user.first_name} {e.user.last_name}</> })}
                                        </div>
                                        <div className="profile-usertitle-job">
                                            {this.state.user_data.map((e) => { return <>{e.user.groups} </> })}
                                            Minra
                                        </div>
                                    </div>
                                    {/* <!-- END SIDEBAR USER TITLE -->
                                     <!-- SIDEBAR BUTTONS --> */}
                                    <div className="profile-userbuttons">
                                        <button type="button" className="more-info-btn">More Info</button>
                                        <button type="button" className="message-btn">Message</button>
                                    </div>

                                    <hr className="mt-3"/>

                                    <div>
                                        <div className="bd-example">
                                            <div className="list-group">
                                                <NavLink to="/profile" className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}>Personal Info</NavLink>
                                                <NavLink to="/change-password" className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}>Change Password</NavLink>
                                                <NavLink to="/preferences" className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}>Preferences</NavLink>

                                                <p className="select-property-title">Select Property</p>
                                                <div className="select_property">
                                                <select onChange={this.property}>
                                                    {this.state.property.map((e) => { return <option className="bg-light" value={e.id} key={e.id}>{e.hotel_name}</option> })}
                                                </select>
                                                </div>

                                                <br />
                                                <address>{this.state.address}</address>
                                                <br />
                                                <button type="button" onClick={this.change_property} className="change-property-btn">Change Property</button>
                                            </div>
                                        </div>
                                    </div>

                            </div>

                        </div>
                        <div className="col-md-8">
                            <div className="profile-content">
                                <ChildComponent {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
    }

    return adminLayout(UserProfilePageHoc);
}


export default userProfileLayout;