
import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Card from 'react-bootstrap/Card';
import 'reactjs-popup/dist/index.css';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
class OtpPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
        <div class="col d-flex justify-content-center">
    <Card style={{backgroundColor:'#DAEFFF', height:'300px', width:'400px'}}>
      <Card.Body>
        <Card.Text>
        <Card.Subtitle className="mb-2" style={{marginLeft:'13%', fontStyle:'inter', fontSize:'20px', fontWeight:'800', color:'#0747A6', marginTop:'12%'}}>Please Enter Mobile Number</Card.Subtitle>
        <Form>
         <Form.Control style={{marginTop:'15%'}} type="email" placeholder="Enter your mobile number" />
         </Form>
        </Card.Text>
        <div class="col d-flex justify-content-center">
      <Link to={"/guestPage"}>  <button style={{marginTop:'12%', width:'148px', height:'32px', backgroundColor:'#47ADFF', color:'#fff', borderRadius:'5px', fontsize:'16px', fontWeight:'400', fontStyle:'inter', border:'none'}}>Continue</button></Link>
         </div>
      </Card.Body>
    </Card>
    </div>
</>
}  
}

export default adminLayout(OtpPage);