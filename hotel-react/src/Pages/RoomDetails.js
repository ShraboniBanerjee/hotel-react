import React, { Component } from 'react'
import adminLayout from "../hoc/adminLayout"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

class RoomDetails extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
    return (
      <div>

         
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
       <th>Uploaded Images No</th>
       <th>Room Status</th>
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
       <td>Available</td>
       <td> <Link to={"/EditRoomDetails"} type="button" className="btn btn-outline-primary">Edit</Link></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>
     <tr>
       <td>2</td>
       <td>QSS Family Suite</td>
       <td>3 Rooms Available</td>
       <td>$113</td>
       <td>500*500</td>
       <td>5</td>
       <td>Unavailable</td>
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
       <td>Available</td>
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
       <td>Booked</td>
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
       <td>Servicing</td>
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
       <td>Available</td>
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
       <td>Unavailable</td>
       <td> <Button variant="outline-primary">Edit</Button></td>
       <td> <Button variant="outline-danger">Delete</Button></td>
     </tr>




   </tbody>
 </Table>
 <p></p>
  <Button type="submit">Submit</Button>


        <p></p>
   <h3 className="head">ROOM OPTIONS AVAILABLE</h3>
   <p>Enter the room options in order see the result of your choosen type of rooms.
   </p>

   <p></p>

   <Form>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
<Form.Check
          
          inline
            label="King"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />

<Form.Check
          
          inline
            label="Queen"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
          />


<Form.Check
          
          inline
            label="Luxury"
            name="group3"
            type={type}
            id={`inline-${type}-3`}
          />

<Form.Check
          
          inline
            label="Pet Friendly"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />

<Form.Check
          
          inline
            label=" Disable Friendly"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />

<Form.Check
          
          inline
            label="Family Suite"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />


</div>
      ))}
</Form>

<Button variant="primary"> Search </Button>

          <p></p>

<Row>
   <Col>
   <Card style={{ width: '18rem' }}>
 
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
 
    <Card.Body>
       <h1>1 KING BED DELUXE WITH WET BAR</h1>
       <h2>BEST AVAILABLE RATE</h2>
       <h6 style={{color: "red"}}>NON SMOKING</h6>
       <h6>Base Occupancy: 2 | Max Occupancy: 2 </h6>
       <h6>Max Adult: 2 | Bed Count: 2 </h6>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
       
<p></p>

<Link to={"/Room_view"} type="button" className="btn btn-success">Add More</Link>

     <p></p>
        <Form>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Hair Dryer"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />

<Form.Check
          
          inline
            label="Coffee Maker"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
          />

<Form.Check
            inline
            label="Iron and Ironing Board"
            name="group3"
            type={type}
            id={`inline-${type}-3`}
          />

<Form.Check
            inline
            label="Microwave and Refrigerator"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />

<Form.Check
            inline
            label="Free Wi-Fi & Breakfast"
            name="group5"
            type={type}
            id={`inline-${type}-5`}
          />

<Form.Check
            inline
            label="Bathroom Private"
            name="group6"
            type={type}
            id={`inline-${type}-6`}
          />

<Form.Check
            inline
            label="Cable Tv"
            name="group7"
            type={type}
            id={`inline-${type}-7`}
          />
           
<Form.Check
            inline
            label="No Pets Allowed"
            name="group8"
            type={type}
            id={`inline-${type}-8`}
          />


        </div>
      ))}
    </Form>

        <Button variant="primary">Submit</Button>
      </Card.Body>
    </Card>
</Col>

<Col>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <Card.Body>
       <h1>1 KING BED HANDICAPPED ROOM</h1>
       <h2>BEST AVAILABLE RATE</h2>
       <h6 style={{color: "red"}}>NON SMOKING</h6>
       <h6>Base Occupancy: 2 | Max Occupancy: 2 </h6>
       <h6>Max Adult: 2 | Bed Count: 2 </h6>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
<p></p>
        <Button variant="success"> Add More</Button>
        <p></p>
        <Form>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Hair Dryer"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />

<Form.Check
          
          inline
            label="Coffee Maker"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
          />

<Form.Check
            inline
            label="Accessible"
            name="group3"
            type={type}
            id={`inline-${type}-3`}
          />

<Form.Check
            inline
            label=" Grab Bar, Low-Height & Sink Raised toilet seat"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />

<Form.Check
            inline
            label="Free Wi-Fi & Breakfast"
            name="group5"
            type={type}
            id={`inline-${type}-5`}
          />

<Form.Check
            inline
            label="Wheelchair accessible"
            name="group6"
            type={type}
            id={`inline-${type}-6`}
          />

<Form.Check
            inline
            label="Free self parking"
            name="group7"
            type={type}
            id={`inline-${type}-7`}
          />

          
<Form.Check
            inline
            label="No Pets Allowed"
            name="group8"
            type={type}
            id={`inline-${type}-8`}
          />


        </div>
      ))}
    </Form>
    <Button variant="primary">Submit</Button>
</Card.Body>
    </Card>
</Col>

<Col>
   <Card style={{ width: '18rem' }}>

      <Card.Img variant="top" src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
     <Card.Body>
       <h1>1 KING BED PET FRIENDLY ROOM</h1>
       <h2>BEST AVAILABLE RATE</h2>
       <h6 style={{color: "red"}}>NON SMOKING</h6>
       <h6>Base Occupancy: 2 | Max Occupancy: 2 </h6>
       <h6>Max Adult: 2 | Bed Count: 2 </h6>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
<p></p>
        <Button variant="success"> Add More</Button>
        <p></p>
        <Form>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Hair Dryer"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />

<Form.Check
          
          inline
            label="Coffee Maker"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
          />

<Form.Check
            inline
            label="Iron and Ironing Board"
            name="group3"
            type={type}
            id={`inline-${type}-3`}
          />

<Form.Check
            inline
            label="Microwave and Refrigerator"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />

<Form.Check
            inline
            label="Free Wi-Fi & Breakfast"
            name="group5"
            type={type}
            id={`inline-${type}-5`}
          />

<Form.Check
            inline
            label="Bathroom Private"
            name="group6"
            type={type}
            id={`inline-${type}-6`}
          />

<Form.Check
            inline
            label="Cable Tv Available"
            name="group7"
            type={type}
            id={`inline-${type}-7`}
          />

          
<Form.Check
            inline
            label="Pets Allowed"
            name="group8"
            type={type}
            id={`inline-${type}-8`}
          />


        </div>
      ))}
    </Form>

        <Button variant="primary">Submit</Button>
      </Card.Body>
    </Card>
</Col>

<Col>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
   <Card.Body>
       <h1>2 KING BED PET FRIENDLY ROOM</h1>

       <h2>BEST AVAILABLE RATE</h2>
       <h6 style={{color: "red"}}>NON SMOKING</h6>
       <h6>Base Occupancy: 2 | Max Occupancy: 2 </h6>
       <h6>Max Adult: 2 | Bed Count: 2 </h6>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
<p></p>
        <Button variant="success"> Add More</Button>
        <p></p>
        <Form>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Hair Dryer"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />

<Form.Check
          
          inline
            label="Coffee Maker"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
          />

<Form.Check
            inline
            label="Iron and Ironing Board"
            name="group3"
            type={type}
            id={`inline-${type}-3`}
          />

<Form.Check
            inline
            label="Microwave and Refrigerator"
            name="group4"
            type={type}
            id={`inline-${type}-4`}
          />

<Form.Check
            inline
            label="Free Wi-Fi & Breakfast"
            name="group5"
            type={type}
            id={`inline-${type}-5`}
          />

<Form.Check
            inline
            label="Bathroom Private"
            name="group6"
            type={type}
            id={`inline-${type}-6`}
          />

<Form.Check
            inline
            label="Cable Tv Available"
            name="group7"
            type={type}
            id={`inline-${type}-7`}
          />

          
<Form.Check
            inline
            label="Pets Allowed"
            name="group8"
            type={type}
            id={`inline-${type}-8`}
          />


        </div>
      ))}
    </Form>

        <Button variant="primary">Submit</Button>
      </Card.Body>
    </Card>
</Col>

<p></p>
<Col>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <Card.Body>
       <h1>TSS Family Suite</h1>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
        <Card.Text>
          Family suite with sleep sofa including twin size mattress.
        </Card.Text>
        <Button variant="primary">See Availablity</Button>
      </Card.Body>
    </Card>
</Col>


<Col>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      <Card.Body>
       <h1>QQS Family Suite</h1>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
        <Card.Text>
          Family suite with 2 queens and 1 single bed and kitchenette
        </Card.Text>
        <Button variant="primary">See Availablity</Button>
      </Card.Body>
    </Card>
</Col>

<Col>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
   <Card.Body>
       <h1>KSS Family Suite</h1>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
        <Card.Text>
          Family suite with sleep sofa including king size mattress
        </Card.Text>
        <Button variant="primary">See Availablity</Button>
      </Card.Body>
    </Card>
</Col>

<Col>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
       <Card.Body>
       <h1>QQS Family Suite</h1>
       <h6>Ratings - 4.4/5.0 | <span>14 reviews</span></h6>
        <Card.Text>
          Family suite with 2 queens and 1 single bed and kitchenette
        </Card.Text>
        <Button variant="primary">See Availablity</Button>
      </Card.Body>
    </Card>
</Col>

</Row>
<p></p>

      </div>
    )
  }
}

export default adminLayout(RoomDetails);
