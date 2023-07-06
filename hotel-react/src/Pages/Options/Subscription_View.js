import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import add_sub from '../../assets/images/add_sub.png'
import Loading from '../../images/Loading';
import { Input } from '@mobiscroll/react-lite';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import i from '../../assets/images/i.png'
import Tables from '../Constants/Tables';
import "../../assets/css/lead-list.css"
import AlertDismissible from '../Common_Fun/AlertDismissible';



class Subscription_View extends Component {
    constructor(props) {
        super(props);
        let url_link = this.props.url
        this.state = {
            url: `${url_link}subscription/`,
            page_load: true,
            guest: [],
            email_list: [],
            send: false,
            email: '',
            newEmail: '',
            guest_status: 'yes',
            subscription_status: 'yes',
            all: false,
            addSub: true,
            subscription_msg:'',
            title:{'User':['first_name','text'],'email':['email','email']}
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

    buttonType =(button,value)=>{

    }

    close = () => {
        this.setState({ email_list: [] })
        this.setState({ newEmail: '' })
        this.setState({ addSub: true })
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
        this.setState({ guest_status: "yes" })
        this.setState({ subscription_status: "yes" })
        this.setState({ page_load: true })
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },

        })
        let parsedata = await data.json()
        this.setState({ guest: parsedata.serializer })
        if (parsedata.msg !== 'no') {

            this.setState({ page_load: false })
        }
    }


    handleDelete = (chipToDelete) => {
        const filteredEmail = this.state.email_list.filter(email => email !== chipToDelete);
        this.setState({ email_list: filteredEmail })
    }

    sendData = (e) => {
        if (e.key === "Enter") {
            this.setState({ newEmail: '' })
            let list = this.state.email_list
            let enter_email = this.state.newEmail.toString().replace(/\s/g, '')
            if (!this.state.email_list.includes(enter_email)) {
                list.push(enter_email)
                this.setState({ email_list: list })
            }
        }
    }

    search = async (option) => {
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let property = localStorage.getItem("property")
        if (option !== "add") {
            email = this.state.email_list
            this.setState({ guest_status: 'no' })
            this.setState({ subscription_status: 'no' })
        }
       
        let url = `${this.state.url}${property}/`
        this.setState({ loading: true })
        let email = this.state.email
        email = email.toString().replace(/^\s+|\s+$/gm, '')

        if (option == "add") {
            email = this.state.email_list
        }

        if (email != "" || this.state.email_list.length > 0) {

            this.setState({ page_load: true })
            let data = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'Authorization': "Bearer " + a['token']
                },
                body: JSON.stringify({
                    option: option,
                    email: email
                }),
            })
            let parsedata = await data.json()

            this.setState({ all: true })

            console.log(parsedata)
            if (option !== "add"){
            this.setState({ guest_status: parsedata.guest_status })
            this.setState({ subscription_status: parsedata.subscription_status })
            this.setState({ guest: parsedata.subscription_info })
            
            }
            else{
                let subscription_msg = ''
                if (parsedata.email_list.length > 0){
                    
                     subscription_msg = `${parsedata.email_list.join()} email not in guest list`
                }
               
                this.setState({newEmail:''})
                this.setState({email_list:[]})
                this.setState({subscription_msg:subscription_msg})
                this.setState({addSub:true})
                setTimeout(() => {
                    this.setState({subscription_msg:''})
                    
                  }, 8000)
            }
            if (parsedata.msg !== 'no') {
                this.setState({ page_load: false })
            }
        }
    }

    msgFun = () =>{
        this.setState({subscription_msg:""})
    }

    render() {
        return (this.state.page_load ? <Loading /> :

            <div>


                {this.state.subscription_msg !== '' && <AlertDismissible msgFun={this.msgFun} time={6} type={"success"} msg={this.state.subscription_msg}/>}
           
                <p></p>

                <p></p>
                <Form>
                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label htmlFor='formBasicEmail'>Search Email Address</Form.Label><br />
                        <Input className='noBorder' value={this.state.email} onChange={(val) => { this.setState({ email: val.target.value }) }} controlId="search" type='email' required />
                        <Button onClick={() => { this.search("search") }} className='mx-3 searchSub'>Search</Button>
                        
                        {this.state.addSub && <Button onClick={() => { this.setState({ addSub: false }) }} className='mx-3 AddSub' >Add Subscriber</Button>}
                    </Form.Group>

                </Form>

                <p></p>
                {!this.state.addSub && <div>
                    <label htmlFor="addEmail">Add new Email</label><br />
                    <input id="addEmail" className='mb-4 mt-2 noBorder' placeholder='enter the email address for add' type="email" value={this.state.newEmail} onChange={(e) => { this.setState({ newEmail: e.target.value }) }} onKeyDown={(e) => { this.sendData(e) }} />

                    <img src={i} className="mx-2" style={{ width: "24px" }} title="click enter after fill the input box for add new Subscriber" alt="info" />
                    {this.state.email_list.length > 0 && <button type="button" onClick={() => { this.search("add") }} className='btn SubAdd'>Add</button>}
                    <button type='button' onClick={() => { this.close() }} className='mx-3 btn SubClose'>Close</button>
                    {/* <button type='button' className='btn btn-success' onClick={()=>{this.sendData()}}>Add Subscriber</button> */}
                    <br />

                    {this.state.email_list.length > 0 && this.state.email_list.map((email) => {
                        return <Chip key={email} label={email} className="mx-1 mb-2 chip" onDelete={() => { this.handleDelete(email) }} />

                    })}

                    <br />

                
                </div>}
                

                <Tables data={this.state.guest} input={true}  title={this.state.title} buttonType={this.buttonType}  page={"Subscription View"}  button={{'Guest Details':'/UserDetails/'}} />

                <p></p>
            </div>
        )
    }
}

export default adminLayout(Subscription_View);