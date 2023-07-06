import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class EditRoomDetails extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
    return (
      <div>        
    <p></p>
        <h3 className="head"> Edit Room Details</h3>
        <p></p>

        <Form>
      <Form.Group className="mb-3" controlId="Text">
        <Form.Label>Room Name</Form.Label>
        <Form.Control type="text" placeholder="Room Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Text">
        <Form.Label>No of Rooms </Form.Label>
        <Form.Control type="text" placeholder="No of Rooms" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Text">
        <Form.Label>Rates of Rooms</Form.Label>
        <Form.Control type="text" placeholder="Rates of Rooms" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Text">
        <Form.Label>Resolution of Images</Form.Label>
        <Form.Control type="text" placeholder="Resolution of Images / 500*500" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Text">
        <Form.Label>No of Uploaded Images</Form.Label>
        <Form.Control type="text" placeholder="No of Uploaded Images" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Text">
        <Form.Label>Room Status</Form.Label>
        <Form.Control type="text" placeholder="Room Status" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Saved my information" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
<p></p>

            </div>

            )
          }
        }
        
        export default adminLayout(EditRoomDetails);
        