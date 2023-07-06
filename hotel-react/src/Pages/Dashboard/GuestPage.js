
import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Card from 'react-bootstrap/Card';
import 'reactjs-popup/dist/index.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

class GuestPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
        <p style={{fontSize:'20px', fontStyle:'normal', fontFamily:'inter', fontWeight:'400'}}>
          <span style={{padding:'1%'}}><img src={require('../../assets/images/Group 83.png')} /></span>
          Guest Details</p>

<Nav variant="pills" defaultActiveKey="/guestPage">
<Nav.Item>
  <Nav.Link href="/guestPage">ExistingUser</Nav.Link>
</Nav.Item>


  <Nav.Item>
  <Nav.Link href="/newPage">New User</Nav.Link>
</Nav.Item>

</Nav>

        <Row>
            <Col>
       < Card style={{marginTop:'3%', borderRadius:'15px'}}>
      <Card.Header style={{fontSize:'20px', fontStyle:'normal', fontFamily:'inter', fontWeight:'400', color:'#000000', backgroundColor:'#f4f5f9', borderTopRightRadius:'15px', borderTopLeftRadius:'15px'}}>Enter Your Details</Card.Header>
      <Card.Body>
     
        <Card.Text style={{fontSize:'20px', fontSize:'inter', fontStyle:'normal', fontWeight:'400', color:'#000000'}}>
        We will use these details to share your booking information
        </Card.Text>
      
        <Form>
            <Row>
                <Col>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>First Name</Form.Label>
        <Form.Control type="text" placeholder="Mark" />
      </Form.Group>
      </Col>

      <Col>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Jason" />
      </Form.Group>
      </Col>
      </Row>

      <Row>
                <Col>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Email</Form.Label>
        <Form.Control type="email" placeholder="abc@gmail.com" />
      </Form.Group>
      </Col>

      <Col>
      <Form.Group className="mb-3" controlId="number">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Country</Form.Label>
        <Form.Control type="text" placeholder="India (+91)" />
      </Form.Group>
      </Col>

      <Col>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="+91 123 456 78 91" />
      </Form.Group>
      </Col>

      </Row>


      <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Address <span style={{color:'#d32f2f'}}>*</span></Form.Label>
        <Form.Control style={{height:'76px', width:'285px'}} type="text" placeholder="C-5 East Steet , Tower park , L.A " />
      </Form.Group>      
    </Form>

      </Card.Body>
    </Card>
    </Col>

    <Col>
       <Card style={{marginTop:'3%',height:'397px', borderRadius:'15px'}}>
     
      <Card.Body>
      <Card.Text style={{fontWeight:"500", fontSize:'24px', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Luxury Room
      <span style={{float:'right'}}><img style={{width:'90px'}} src={require('../../assets/images/hotelimg.png')} /></span>
      </Card.Text>
        <Card.Text  style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>1 Night</Card.Text>
        <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}><img src={require('../../assets/images/calendarbooking.png')} /> Wed, 15 Feb - Thu, 16 feb</Card.Text>
        <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}><img src={require('../../assets/images/edit.png')} /> 1 Room , 2 Guest</Card.Text>
        <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>Room Price for 1 Night X 2 Guest
            <span style={{float:'right', fontFamily:'inter', fontSize:'16px', fontStyle:'normal', color:'#000000'}}>$ 365</span>
        </Card.Text>
        <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>Advance Received 
            <span style={{float:'right', fontFamily:'inter', fontSize:'16px', fontStyle:'normal', color:'#000000'}}>$ 52</span>
        </Card.Text>
        <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>Taxes and Fees
            <span style={{float:'right', fontFamily:'inter', fontSize:'16px', fontStyle:'normal', color:'#000000'}}>$ 14</span>
        </Card.Text>
      
      </Card.Body>

      <Card.Footer style={{border:'none', backgroundColor:'#ffffff'}}>
       <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#000000'}}>Payable Amount
            <span style={{float:'right', fontSize:'26px', color:'#000000', fontStyle:'normal', fontFamily:'inter'}}>$ 327</span>
        </Card.Text>
       </Card.Footer>
    </Card>
    </Col>

    </Row>
    <p></p>
    <button style={{float:'right', width:'260px', height:'56px', color:'#ffffff', backgroundColor:'#1AB64F', border:'none', borderRadius:'5px', fontSize:'20px', fontWeight:'500', fontStyle:'normal', fontFamily:'inter', marginTop:'3%', marginBottom:'2%'}}>Continue</button>
<p></p>
</>
}  
}

export default adminLayout(GuestPage);