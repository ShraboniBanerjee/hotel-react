import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from '../../images/Loading';
import ReactToPrint from 'react-to-print';
import Tables from '../Constants/Tables';

class Roomservices extends Component {
    constructor(props){
        super(props);
        let subtitle = this.props.subtitle
        const url_link = this.props.url
        let k = []
        let property = localStorage.getItem("property")
        this.state = {
          type:"",
          name:"",
          create_date:"",
          titleButton:{"print":"none"},
          subtitle:subtitle,
          title:{'Room Number':["value['room']['number']",'number'],'Name':["value['curBooking']['guest']['first_name']",'text'],'Service Type':['servicesType','text'],
          'Created Date':['createdDate','date'],'price':['price','number'],'Assigned Person':['select_emp','text']},
          number:"",  
          price:"",
          url:`${url_link}room-services-api/${property}/`,
          room_service:[],
          totals:[],
          loading:false,
          page_load:true,
          page_permissions:[]
        }
      }
    
      checkToken = () => {
        if (localStorage.getItem("logintoken")) {
          // get token and do anything
          this.setState(JSON.parse(localStorage.getItem("logintoken")))
          if(localStorage.getItem("property") === undefined || localStorage.getItem("property") === ""|| localStorage.getItem("property") == "error"){
            localStorage.removeItem("logintoken")
            window.location.href="/login";
        }
        
        }
        
      }
      buttonType = (button, value) =>{

      }
      componentDidMount() {
        this.checkToken()
    
        this.updateRates()
      }
      error(parsedata){
        if (parsedata.msg === "error"){
            localStorage.removeItem("logintoken")
            window.location.href="/login";
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
        let room_service_data = await data.json()
        console.log(room_service_data)
        this.setState({ room_service: room_service_data.room_services})
        let k 
        room_service_data.room_services.map((e)=>{
          console.log("---",e.createdDate)
          k = e.room
          console.log(k)
          k = k['number']
          console.log(e['room']['number'])
          console.log(k)
        })
        if (room_service_data.msg === 'no') {
          window.location.href = "/login";
      }
      else{
          this.setState({page_load:false})
      }
        this.error(room_service_data)
        this.setState({ loading: false })
        
    
      }

      filter = async() =>{
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
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
            service_type: this.state.type,
            guest_name: this.state.name,
            create_date: this.state.create_date,
            room_num: this.state.number,
            price: this.state.price,
          }),
        })
        let room_service_data = await data.json()
        this.error(room_service_data)
        this.setState({ room_service: room_service_data.room_services})
        this.setState({ page_permissions: room_service_data.page_permissions})
        console.log()
        this.setState({ loading: false })
  

      }
      render() {
        return (<> {this.state.page_load ? <Loading /> :
          <div>
    
            <p></p>
            {/* <ReactToPrint trigger={()=>{return <Button id="print" variant="warning">Print</Button>}}
            content={()=>this.componentRef}
            documentTitle='roomservice'
            pagestyle='print'
            /> */}
            
            <h3>
    
            </h3>

            <Tables data={this.state.room_service} input={true} print={true}  title={this.state.title} buttonType={this.buttonType}  page={"Roomservices"} />

             {this.state.loading && <Loading/>} 
          </div>
      }</>
        )
      }
    }


export default adminLayout(Roomservices);
