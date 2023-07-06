import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from '../../images/Loading';
import { Link } from 'react-router-dom';
import Tables from '../Constants/Tables';
import AlertDismissible from '../Common_Fun/AlertDismissible';

class Employee extends React.Component {
  constructor(props) {
    super(props);
    let url_link = this.props.url
    let subtitle = this.props.subtitle
    let property = localStorage.getItem("property")
    this.state = {
      id: "",
      name: "",
      subtitle:subtitle,
      email: "",
      number: "",
      role: "",
      url: `${url_link}employees-api/${property}/`,
      employe_data: [],
      loading: false,
      page_load: true,
      title:{'Name':["value['user']['first_name']","text"],'Email':["value['user']['email']","email"],
      'Phone Number':["phoneNumber","number"],'Role':["value['user']['groups']","text"]},
      page_permissions:[]
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

  buttonType = (button,value) =>{

  }

  error(parsedata) {
    if (parsedata.msg === "error") {
      localStorage.removeItem("logintoken")
      window.location.href = "/login";
    }
  }

  updateRates = async () => {
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },

    })
    let room_data = await data.json()
    this.error(room_data)
    this.setState({ loading: false })
    this.setState({ employe_data: room_data.employees })
    this.setState({page_permissions:room_data.page_permissions})
    console.log(room_data.page_permissions)
    if (room_data.msg === 'no') {
      window.location.href = "/login";
    }
    else {
      this.setState({ page_load: false })
    }

  }

  filter = async () => {
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
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        number: this.state.number,
        filterRole: this.state.role,
      }),
    })
    let room_data = await data.json()
    this.setState({ loading: false })
    this.setState({ employe_data: room_data.employees })

  }

  render() {
    return (<>{this.state.page_load ? <Loading /> :
       <div>
        
        <p></p>

        <h3>

        </h3>
        <Tables data={this.state.employe_data} input={true}  title={this.state.title} buttonType={this.buttonType}  page={"Employee"} permissions={this.state.page_permissions} button={{'details':'none'}} />
               {this.state.loading && <Loading />}
      </div>

          }</>)
  }
}
export default adminLayout(Employee);