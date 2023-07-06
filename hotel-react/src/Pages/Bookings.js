import React, { Component } from 'react'
import adminLayout from "../hoc/adminLayout"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from '../images/Loading';
import next from '../assets/images/left_arrow.png'
import previous from '../assets/images/right_arrow.png'
import "../assets/css/bookings.css"
import Tables from './Constants/Tables';



class Bookings extends Component {
  constructor(props) {
    super(props);
    const url_link = this.props.url
    let subtitle = this.props.subtitle
    let property = localStorage.getItem("property")
    
    this.state = {
      reservation_date: "",
      name: "",
      start_date: "",
      number: "",
      end_date: "",
      subtitle : subtitle,
      url: `${url_link}bookings-api/${property}/`,
      employe_data: [],
      totals: [],
      loading: false,
      records: 10,
      page_no: 0,
      total_pages: [],
      show_data: 'yes',
      page_length: 1,
      total_query: 0,
      page_permissions:[],
      filter_option: 'no',
      page_load: true,
      title:{'Room Number':["value['roomNumber']['number']",'number'],'Name':["value['guest']['first_name']",'text'],'Reservation Date':['dateOfReservation','date'],'Start Date':['startDate','date'],'End Date':['endDate','date'],
      'Rent':["value['roomNumber']['price']",'number']}
    }

  }

  buttonType = (button, value) =>{

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

  updateRates = async (page = 0) => {
    this.setState({ filter_option: 'no' })
    let no_of_pages = page
    if (parseInt(page) === 0) {
      no_of_pages = page + 1
    }
    this.setState({ show_data: "no" })
    this.setState({ page_no: no_of_pages })
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = `${this.state.url}?page=${no_of_pages}&records=${this.state.records}`
    let url = this.state.url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },

    })
    let booking_data = await data.json()
  
    this.error(booking_data)
    this.setState({ show_data: "yes" })
    this.setState({ page_permissions:booking_data.page_permissions })
    this.setState({ employe_data: booking_data.bookings_data })
    this.setState({ totals: booking_data.totals })
    console.log("-------",booking_data.bookings_data)
    this.setState({ page_length: booking_data.total_pages })
    let total_pages = booking_data.total_pages
    this.current_page(total_pages, page)
    if (booking_data.msg !== 'no') {
      this.setState({ page_load: false })
    }
    this.setState({ loading: false })
  }

  current_page = (total_pages, page) => {
    let page_no = []
    for (let i = 0; i < total_pages; i++) {
      page_no.push(i + 1)

      let vals = i + 1
      let new_color = document.getElementById(`page_no${vals}`)
      if (parseInt(page) !== 0) {
        if (new_color !== null) {
          if (`page_no${page}` === document.getElementById(`page_no${vals}`).id) {
            new_color.style.color = 'rgb(115, 115, 115)'
          }
          else {
            new_color.style.color = 'rgb(169,169,169)'
          }
        }
      }

    }

    this.setState({ total_pages: page_no })
  }

  goto = (e) => {
    let id = e.target.id
    let pageNO = id.replace('page_no', '')
    if (this.state.filter_option === 'no') {
      this.updateRates(pageNO)
    }
    else {
      this.filter(pageNO)
    }

  }
  previous = () => {
    let pageNO = parseInt(this.state.page_no) - 1
    if (this.state.filter_option === 'no') {
      this.updateRates(pageNO)
    }
    else {
      this.filter(pageNO)
    }

  }

  next = () => {
    let pageNO = parseInt(this.state.page_no) + 1
    if (this.state.filter_option === 'no') {
      this.updateRates(pageNO)
    }
    else {
      this.filter(pageNO)
    }

  }

  records = () => {
    let pageNO = 1
    if (this.state.filter_option === 'no') {
      this.updateRates(pageNO)
    }
    else {
      this.filter(pageNO)
    }
  }

  filter = async (page) => {

    this.setState({ filter_option: 'yes' })

    if (typeof page === 'object') {
      page = parseInt(page.target.value)
    }

    let no_of_pages = page
    if (parseInt(page) === 0) {
      no_of_pages = page + 1
    }
    this.setState({ show_data: "no" })
    this.setState({ page_no: no_of_pages })
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = `${this.state.url}?page=${no_of_pages}&records=${this.state.records}`

    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "filter",
        rez: this.state.reservation_date,
        name: this.state.name,
        fd: this.state.start_date,
        number: this.state.number,
        ed: this.state.end_date,
      }),
      
    })
    let booking_data = await data.json()
    this.error(booking_data)
    this.setState({ loading: false })
    this.setState({ employe_data: booking_data.bookings_data })
    this.setState({ totals: booking_data.totals })
    let total_pages = booking_data.total_pages
    this.current_page(total_pages, page)
    this.setState({ page_length: booking_data.total_pages })
    this.setState({ show_data: "yes" })
  }

  render() {
    return ( <>{this.state.page_load ? <Loading /> :
      <div>
        <Tables data={this.state.employe_data} extra={{'Total':this.state.totals}} input={true}  title={this.state.title} buttonType={this.buttonType}  page={"Bookings"} permissions={this.state.page_permissions} button={{'details':'none'}} />
      </div> }</>

    )
  }
}
export default adminLayout(Bookings);
