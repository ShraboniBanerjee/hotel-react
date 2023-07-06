import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Table from 'react-bootstrap/Table';
import { Chip } from '@mui/material';
import i from '../../assets/images/i.png'

class AddSubscriber extends Component {

    constructor(props) {

        super(props);
        let url_link = this.props.url
        this.state = {
            email: '',
            email_list: [],
            page_load: true,
            send: false,
            url:`${url_link}subscription/`
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

        // this.updateRates()
    }
    error(parsedata) {
        if (parsedata.msg === "error") {
            localStorage.removeItem("logintoken")
            window.location.href = "/login";
        }
    }


    updateRates = async () => {
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/rates/"
        let url = this.state.url
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        })
        let parsedata = await data.json()
    }

    send = async () => {
        console.log("send")
    }

    sendData = (e) => {
        if (e.key === "Enter") {
            this.setState({ newEmail: '' })
            let list = this.state.email_list
            let enter_email = this.state.newEmail.toString().replace(/\s/g,'')
            if (!this.state.email_list.includes(enter_email)) {
                list.push(enter_email)
                this.setState({ email_list: list })
            }
        }
    }
    
    search = async () => {
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let property = localStorage.getItem("property")
        let url = `${this.state.url}${property}/`
        this.setState({ loading: true })
      
        
       
           
            this.setState({page_load:true})
            let data = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'Authorization': "Bearer " + a['token']
                },
                body: JSON.stringify({
                    option: 'search',
        
                }),
            })
            let parsedata = await data.json()
        
    }

    handleDelete = (chipToDelete) => {
        const filteredEmail = this.state.email_list.filter(email => email !== chipToDelete);
        this.setState({ email_list: filteredEmail })
    }


    render() {
        return (
            <div>
                <h3 className="head">Add Subscribers</h3>
                <p></p>
                <div>
                <label htmlFor="addEmail">Add new Email</label><br />
                <input id="addEmail" className='mb-4' placeholder='enter the email address for add' type="email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} onKeyDown={(e) => { this.sendData(e) }} />
                <img src={i} className="mx-2" style={{ width: "24px" }} title="click enter after fill the input box for add new Subscriber" alt="info" />

                {/* <button type='button' className='btn btn-success' onClick={()=>{this.sendData()}}>Add Subscriber</button> */}
                <br />


                {this.state.email_list.map((email) => {
                    return <Chip key={email} label={email} color='success' onDelete={() => { this.handleDelete(email) }} />

                })}

                <br />

                {this.state.email_list.length > 0 && <button type="button"  onClick={() => { this.send() }} className='mb-3 mt-3 btn btn-success'>Add</button>}

                </div>
                <Table className='mt-3' striped bordered hover>
                    <thead>User Details</thead>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Admin@gmail.com</td>
                            <td>Mark Jwain</td>
                            <td>08/12/21</td>
                            <td>@ItsMark</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Admin@gmail.com</td>
                            <td>Jacob Jwain</td>
                            <td>01/12/22</td>
                            <td>@ItsJacob</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>User@gmail.com</td>
                            <td>Larry the Bird</td>
                            <td>28/10/21</td>
                            <td>@ItsLarry</td>
                        </tr>
                    </tbody>
                </Table>
                <p></p>
            </div>
        )
    }

}
export default adminLayout(AddSubscriber);