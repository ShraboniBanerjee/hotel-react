import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';



class Subscription_View extends Component {
  constructor(props){
      super(props);

      this.state = {}

  }
  render() {


  return (
    <div>
    <h3 className="head">Your Subscription Details</h3>      
<p></p>
    <p></p>

  
    <Table striped bordered hover>
      <thead>User Management</thead>
      <thead>
        <tr>
          <th>No</th>
          <th>Users</th>
          <th>Email</th>
          <th>Active/Inactive</th>
          <th>Guest Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Admin@gmail.com</td>
         <td><BootstrapSwitchButton checked={true} onstyle="primary" /></td> 
       <td><Button variant="primary">Guest Details</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Manager@gmail.com</td>
          <td><BootstrapSwitchButton checked={true} onstyle="primary" /></td> 
          <td><Button variant="primary">Guest Details</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry the Bird</td>
          <td>User@gmail.com</td>
          <td><BootstrapSwitchButton checked={true} onstyle="primary" /></td> 
          <td><Button variant="primary">Guest Details</Button></td>
        </tr>
      </tbody>
    </Table>
   <p></p>
    </div>
 )
}

}
export default adminLayout(Subscription_View);