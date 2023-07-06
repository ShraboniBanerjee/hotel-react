import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return <nav  className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom ">
            <div className="container-fluid">
                <div className="d-block">
                <h1 style={{fontSize:"28px"}}>{this.props.title}</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <h1 style={{fontSize:"16px",color:"#0747A6"}}>{this.props.name}</h1>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {/*  <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        {/* <li className="nav-item"><a data-bs-toggle="modal" data-bs-target="#add-lead-modal"  className="nav-link highlighted-text" href="#!">Add lead</a></li> 
                        <li className="nav-item dropdown notifications">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bell"></i></a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#!">Admin</a>
                                <a className="dropdown-item" href="#!">Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#!">Sign Out</a>         
                            </div>  
                        </li>
                    </ul> */}

                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        {/* <li className="nav-item"><a data-bs-toggle="modal" data-bs-target="#add-lead-modal"  className="nav-link highlighted-text" href="#!">Add lead</a></li> */}
                        <li className="nav-item dropdown notifications">

                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"black"}}><img src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" alt="" width="32" height="32" className="rounded-circle me-2" /> 
                        Mark Jason</a>
                      {/*      <span className="muted" style={{marginLeft:"30%", fontSize:"15px", color:"grey"}}>Team Lead</span> */}
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#!">Admin</a>
                                <a className="dropdown-item" href="#!">Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#!">Sign Out</a>         
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
            
            {/* <div className="container-fluid">ddddd</div> */}
        </nav>
    }
}

export default Header;