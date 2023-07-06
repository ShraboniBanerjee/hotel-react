import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

class Amenities extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
    return (
      <div>
      <h3 className="head">Amenities Available </h3>
      <p></p>
      <Form.Label>1.SELECT DISABLE ACCESSIBILITY OPTIONS</Form.Label>
     
  <Form>
   <Row>
     <Col>
     <Form.Group className="mb-3">
     <h2>Primary Accessibility Type*</h2>
     <Form.Select>
       <option>ACCESSIBILITY EQUIPMENT FOR THE DEAF </option>
       <option>ACCESSIBLE PAYMENT OPTIONS</option>
       <option>ACCESSIBLE PATH OF TRAVEL</option>
       <option>BRAILLE AND RAISE SIGNAGE</option>
       <option>HANDICAP PARKING SPACES</option>
       <option>PROXIMITY TO HEALTH SERVICES</option>
       <option>CONTACT TO HOTEL 24/7</option>   
       </Form.Select>
   </Form.Group>
   </Col>

   <Col>
   <Form.Group className="mb-3">
     <h2>Primary Room/Bed*</h2>
     <Form.Select>
     <option>IN-ROOM ACCESSIBILITY</option>
       <option>ROLL-IN-SHOWER</option>
       <option>ACCESSIBLE BATHROOM </option>  
         <option>ADJUSTABLE BEDS</option>
       <option>GRAB BARS IN BATHROOM</option>
       <option>LOWER HANGING SPACE IN CLOSET</option>
     </Form.Select>
   </Form.Group>
   </Col>

   <Form.Label>2.ROOM STATUS & MAINTAINENCE</Form.Label>
   <Col>
     <Form.Group className="mb-3">
     <h2>Room Status Type*</h2>
     <Form.Select>
       <option>OCC - OCCUPIED</option>
       <option>STAYOVER</option>
       <option>ON CHANGE</option>
       <option>DND - DO NOT DISTURB</option>
       <option>CLEANING IN PROGRESS</option>
       <option>DIRTY</option>
       <option>EARLY CHECK-IN</option>
       <option>LATE CHECK OUT</option>
       <option>DID NOT CHECK OUT (DNCO) </option>
       <option>ON-QUEUE</option>
       <option>VACANT AND READY</option>
       <option>OUT OF ORDER (OOO) </option>
       <option>OUT OF SERVICE (OOS) </option>
       <option>LOCKOUT (LO) </option>
     </Form.Select>
   </Form.Group>
   </Col>
   <Col>
   <Form.Group className="mb-3">
     <h2>Room Maintainence Services*</h2>
     <Form.Select>
       <option>ELECTRICAL PROBLEM</option>
       <option>WATER LEAKING/BATHTUB/SHOWER PROBLEM</option>
       <option>LOCK NOT WORKING</option>
       <option>ROOM MAINTAINENCE</option>
       <option>DOOR/WINDOW PLUMBING</option>
       <option>TOILET BACKED UP</option>
       <option>HOT WATER PROBLEM</option>
       <option>WIFI CONNECTIVITY PROBLEM</option>
     </Form.Select>
   </Form.Group>
   </Col>



<Form.Label>2.ROOM CLEANING SERVICES</Form.Label>
   <Col>
     <Form.Group className="mb-3">
     <h2>Room Cleaning Services Available*</h2>
     <Form.Select>
       <option>SWEEPING</option>
       <option>DUSTING</option>
       <option>DAMP DUSTING</option>
       <option>DUST MOPPING/DRY MOPPING</option>
       <option>MOP SWEEPING</option>
       <option>SPOT MOPPING</option>
       <option>WET MOPPING/DAMP MOPPING</option>
       <option>MANUAL SCRUBBING</option>
       <option>MANUAL POLISHING</option>
       <option>SPOT CLEANING</option>
     </Form.Select>
   </Form.Group>
   </Col>
   <Col>
   <Form.Group className="mb-3">
     <h2>Mechanised Cleaning Services Available*</h2>
     <Form.Select>
       <option>SUCTION CLEANING/VACUUM CLEANING</option>
       <option>SPRAY BUFFING</option>
       <option>POLISHING</option>
       <option>SCRUBBING</option>
       <option>STRIPPING</option>
       <option>LAUNDERING</option>
       <option>DRY CLEANING</option>
     </Form.Select>
   </Form.Group>
   </Col>

</Row>


   <Form.Group className="mb-3">
     <Form.Check type="checkbox" label="Remember this info" />
   </Form.Group>

   <Button type="submit">Submit</Button>
  
   </Form>

<p></p>
<p></p>
   <h3 className="head">Room Naming and Other Options</h3>
   <p>Enter the room name for each individual room options, if you are planning on allowing guests to reserve individual
     accommodations on your booking engine, you may enter description and upload images.
   </p>

<Dropdown>
   <Dropdown.Toggle variant="success" id="dropdown-basic">
     English
   </Dropdown.Toggle>

   <Dropdown.Menu>
     <Dropdown.Item>French</Dropdown.Item>
     <Dropdown.Item>Dutch</Dropdown.Item>
     <Dropdown.Item>Italic</Dropdown.Item>
   </Dropdown.Menu>
   </Dropdown>

<p></p>
<Table striped bordered hover>
   <thead>
     <tr>
       <th></th>
       <th>Room Name</th>
       <th>No of Rooms</th>
       <th>Rates of Rooms</th>
       <th>Resolution of Images</th>
       <th>No of Images Uploaded</th>
       <th>Edit Options</th>
       <th>Delete Options</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>1</td>
       <td>KSS Family Suite</td>
       <td>5 Rooms Available</td>
       <td>$123</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>
     <tr>
       <td>2</td>
       <td>QSS Family Suite</td>
       <td>3 Rooms Available</td>
       <td>$113</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>
     <tr>
       <td>3</td>
       <td>KING</td>
       <td>2 Rooms Available</td>
       <td>$93</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>

     <tr>
       <td>3</td>
       <td>Disable Friendly</td>
       <td>2 Rooms Available</td>
       <td>$93</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>

     <tr>
       <td>3</td>
       <td>Pet Friendly</td>
       <td>2 Rooms Available</td>
       <td>$93</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>

     <tr>
       <td>3</td>
       <td>QUEEN</td>
       <td>2 Rooms Available</td>
       <td>$93</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>

     <tr>
       <td>3</td>
       <td>LUXURY</td>
       <td>2 Rooms Available</td>
       <td>$93</td>
       <td>500*500</td>
       <td>5</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>




   </tbody>
 </Table>
 <p></p>
 <Button type="submit">Submit</Button>

 <p></p>
   </div>
 )
}
}
export default adminLayout(Amenities);
