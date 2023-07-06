import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class adminuser extends Component {
  constructor(props){
      super(props);

      this.state = {}

  }
  render() {


  return (

    <div>
    <h3 className="head">Admin User Roles</h3>      
<p></p>

    <p></p>

  
    <Table striped bordered hover>
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
export default adminLayout(adminuser);