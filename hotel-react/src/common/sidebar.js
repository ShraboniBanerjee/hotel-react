import React, { useEffect } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { json, Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { set } from "react-hook-form";
import SidebarData from "../Pages/Constants/SidebarData";


const Sidebar = (props) => {
    const [userpermissions, setUserpermissions] = useState('')
    const [show_data, setShow_data] = useState('no')
    const [role_permission, setRole_permission] = useState(['not_loaded'])
    const [loader, setLoader] = useState('yes')
    //const [inventory,setInventory] = useState('no')
    const [roles_permission, setRoles_permission] = useState('yes')
    const [sidebarData,setSidebarData] = useState({})
    


    const checkToken = () => {
        if (localStorage.getItem("logintoken")) {
            // get token and do anything
            if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
                localStorage.removeItem("logintoken")
                window.location.href = "/login";
            }
        }
    }

    const update_data = async () => {
        checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let property = localStorage.getItem("property")
          let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/sidebardata/"
       // let url = "http://127.0.0.1:8000/sidebardata/"
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                property: property
            }),
        })
        setLoader('no')
        let user_permissions = await data.json()
        setShow_data(user_permissions.show)
        let permissions = user_permissions.user_permissions
        let user_permission = JSON.parse(permissions)
        //let all_option = [optin_arr,rooms_arr,reservation_arr,reports_arr]
    
        let all_data = {}
            
        let current_url = window.location.protocol + '//' + window.location.host
        const location = window.location.href
        const sidebar_data = {}

        SidebarData.map((data) => {
            
            all_data[`${data.heading}_arr`] = []
            sidebar_data[data.heading] = "no"
            data.subheading.map((subhead_data) => {
                all_data[`${data.heading}_arr`].push(subhead_data)
                if (subhead_data in user_permission) {
                    
                    sidebar_data[data.heading] = "yes"
                    if (subhead_data === 'rooms') {
                        if (!(user_permission[subhead_data].includes('send'))) {
                            console.log("------",user_permission[subhead_data])
                            if (location.includes(`${current_url}/Add_room`)) {
                                navigate('/')
                            }
                        }
                        if (!(user_permission[subhead_data].includes('edit'))) {
                            if (location.includes(`${current_url}/edit_room`)) {
                                navigate('/')
                            }
                        }

                    }
                    if (subhead_data === 'rates') {
                        if (!(user_permission[subhead_data].includes('send'))) {
                            if (location.includes(`${current_url}/base_rates`)) {
                                navigate('/')
                            }
                        }
                    }
                }
                else{
                    if(subhead_data === 'rooms'){
                        if (location.includes(`${current_url}/Room-Availability`) || location.includes(`${current_url}/Amenities`) || location.includes(`${current_url}/Room_view`)){
                            navigate('/')
                        }
                    }
                    else{
                        if (location.includes(`${current_url}/${subhead_data}`)){
                            navigate('/')
                        }   
                    }
                }
               

            })
        
        })

        setSidebarData(sidebar_data)
        
    
        setUserpermissions(user_permission)

    }



    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("logintoken");
        navigate('/login')
    }

    useEffect(() => {

        if (!(localStorage.getItem("logintoken"))) {
            navigate('/login')
        }

        if (loader === 'yes') {

            update_data()

        }
    }, [update_data, role_permission, navigate])


    return (
        <div>
            <div className="border-end sidenav" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom ">
                    <Link to="/">
                        <img alt="Alt content" src={require('./../assets/images/trident-logo.png')} />
                    </Link>
                </div>
                <PerfectScrollbar className="sidebar-items">
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <Link tag="a" className="" to="/">
                                <i className="fa fa-dashboard"></i> Dashboard
                            </Link>
                        </li>
                        {SidebarData.map((options, index) => {
                            return <li className="mb-1">
                                {sidebarData[options.heading] === 'yes' && <>
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target={`#dashboard_${index}`} aria-expanded="false">
                                        {options.heading}
                                    </button>
                                    <div className="collapse" id={`dashboard_${index}`}>
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            {options.title.map((sub_option, count) => {
                                                return <>{sub_option !== 'Room Availability' ?
                                                    userpermissions[options.subheading[count]] && <li><Link to={`/${options.subheading[count]}`} className="rounded">{sub_option}</Link></li>
                                                    : <li><Link to={`/Room-Availability`} className="rounded">{sub_option}</Link></li>
                                                }</>
                                            })}
                                            {/* <li><Link to={'/employee'} className="rounded">Employees</Link></li> */}
                                        </ul>
                                    </div></>}
                            </li>
                        })}

                        {show_data === "yes" &&
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse6" aria-expanded="false">Roles & Permission</button>
                                <div className="collapse" id="dashboard-collapse6">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><Link to={'/permission'} className="rounded">Permission</Link></li>
                                        <li><Link to={'/role_assign'} className="rounded">Manage Roles</Link></li>
                                        {/* {userpermissions['permission'] && <li><Link to={'/permission'} className="rounded">permission</Link></li>} */}
                                    </ul>
                                </div>
                            </li>}
                    </ul>


                </PerfectScrollbar>
                <div className="dropdown fixed-bottom-dropdown">
                    <a href="/" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://via.placeholder.com/50" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <span>Admin</span>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        {/* <li><Link className="dropdown-item" to="/login"><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</Link></li> */}
                        <li><button className="dropdown-item" onClick={handleSignOut} > <i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 