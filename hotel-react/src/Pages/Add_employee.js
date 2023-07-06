import React, { Component } from 'react'
import adminLayout from "../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class Add_employee extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
    return (
      <div>
      <h3 className="head">Add Employee {this.state.hj} </h3>

        <p></p>
        <h2>Enter Details</h2>
        <p></p>        
    <Form>
      <Row>
        <Col>
        <Form.Label>User ID</Form.Label>
          <Form.Control placeholder="User ID" />
        </Col>
        <Col>
        <Form.Label>Mobile</Form.Label>
          <Form.Control placeholder="Phn No" />
        </Col>
      </Row>

<p></p>
      <Row>
        <Col>
        <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Name" />
        </Col>
        <Col>
        <Form.Label>Salary</Form.Label>
          <Form.Control placeholder="Salary" />
        </Col>
      </Row>

      <p></p>

      <Row>
        <Col>
        <Form.Label>Email</Form.Label>
          <Form.Control type="Email" placeholder="Email" />
        </Col>
        <Col>
        <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="******" />
        </Col>
      </Row>

<p></p>
       <Form.Group className="xs" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

<p></p>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Saved my info" />
      </Form.Group>
      <p></p>
<Col>
      <Form.Check type="radio" label="Manager" />
      <Form.Check type="radio" label="Receptionist" />
      <Form.Check type="radio" label="Staff" />
</Col>
<p></p>
<Button variant="success">Submit</Button>{' '}
      <Button variant="danger">Cancel</Button>{' '}
</Form>
<p></p>
        </div>
    )
  }
}

export default adminLayout(Add_employee);
