import React, { Component } from 'react'
import adminLayout from "../hoc/adminLayout"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

class Accommodation extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
    return (
      <div>
         <h3 className="head">Link Accommodation </h3>
         <p></p>
         <Form.Label>1.SELECT PRIMARY ACCOMMODATION</Form.Label>
        
     <Form>
      <Row>
        <Col>
        <Form.Group className="mb-3">
        <h2>Primary Accommodation Type*</h2>
        <Form.Select>
          <option>QUEEN ROOM</option>
          <option>KING ROOM</option>
          <option>DELUXE ROOM</option>
        </Form.Select>
      </Form.Group>
      </Col>
      <Col>
      <Form.Group className="mb-3">
        <h2>Primary Room/Bed*</h2>
        <Form.Select>
          <option>KING</option>
          <option>QUEEN</option>
          <option>NOTHING SELECTED</option>
        </Form.Select>
      </Form.Group>
      </Col>

      <Form.Label>2.LINK SECONDARY ACCOMMODATION</Form.Label>
      <Col>
        <Form.Group className="mb-3">
        <h2>Accommodation Type*</h2>
        <Form.Select>
          <option>SUITE WITH HOT TUB</option>
          <option>KING ROOM</option>
          <option>DELUXE ROOM</option>
        </Form.Select>
      </Form.Group>
      </Col>
      <Col>
      <Form.Group className="mb-3">
        <h2>Select Room/Bed(s) to link to primary*</h2>
        <Form.Select>
          <option>KING</option>
          <option>QUEEN</option>
          <option>NOTHING SELECTED</option>
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
      <h3 className="head">Images</h3>
      <p>Click "Upload Image" button, browse your local computer and hit save to upload 
        the photo to our system. 
      </p>

<Form>

<Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Featured Image</Form.Label>
        <Form.Control type="file" multiple />
</Form.Group>
<p></p>
<Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Additional accommodation photos</Form.Label>
        <Form.Control type="file" multiple />
</Form.Group>
<Button type="submit">Submit</Button>
</Form>

<p></p>
<p></p>
      <h3 className="head">(OPTIONAL) Accommodation Naming and Organization</h3>
      <p>Enter the room name for each individual accomodation, if you are planning on allowing guests to reserve individual
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
          <th>Accommodation Name</th>
          <th>Description</th>
          <th>Images</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>KING</td>
          <td>4 Beds Available</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>QUEEN</td>
          <td>3 Beds Available</td>
          <td>5</td>
        </tr>
        <tr>
          <td>3</td>
          <td>LUXURY</td>
          <td>2 Beds Available</td>
          <td>5</td>
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

export default adminLayout(Accommodation);


