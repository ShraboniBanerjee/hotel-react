import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

class ViewDetailsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){ return  <>
<Navbar style={{backgroundColor:'blue'}}>
      <Container>
        <Navbar.Brand href="#home"><img style={{width:'120px', height:'50px'}} src={require('../../assets/images/trident-logo.png')}></img>  </Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
    <p></p>
    <p style={{fontSize:'20px', fontStyle:'normal', fontFamily:'inter', fontWeight:'400'}}>
          <span style={{padding:'1%'}}><img src={require('../../assets/images/Group 83.png')} /></span>
          Guest Details</p>
          <p></p>
    <Row>
            <Col>
       < Card style={{marginTop:'3%', borderRadius:'15px', marginLeft:'2%'}}>
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

       <Row>
                <Col>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Date of Birth</Form.Label>
        <Form.Control type="text" placeholder="DD-MM-YYYY" />
      </Form.Group>
      </Col>

      <Col>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Select Gender</Form.Label>
        <Form.Control type="text" placeholder="Male" />
      </Form.Group>
      </Col>

      <Col>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Tax ID Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Number here" />
      </Form.Group>
      </Col>

      </Row>

      <Row>

       <Col>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Address 1<span style={{color:'#d32f2f'}}>*</span></Form.Label>
        <Form.Control style={{height:'76px', width:'240px'}} type="text" placeholder="Enter your address" />
      </Form.Group>  
</Col>

<Col>
 <Form.Group className="mb-3" controlId="text" style={{float:"right"}}>
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>State<span style={{color:'#d32f2f'}}>*</span></Form.Label>
        <Form.Control type="text" placeholder="Your State " />
      </Form.Group> 
</Col>
      </Row>

<Row>
  <Col>
  <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Address 2<span style={{color:'#d32f2f'}}>*</span></Form.Label>
        <Form.Control style={{height:'76px', width:'240px'}} type="text" placeholder="Enter your address" />
      </Form.Group>   
  </Col>

  <Col>
 <Form.Group className="mb-3" controlId="text" style={{float:"right"}}>
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>City<span style={{color:'#d32f2f'}}>*</span></Form.Label>
        <Form.Control type="text" placeholder="Your City " />
      </Form.Group> 
</Col>
</Row>
          

    </Form>

      </Card.Body>
    </Card>
    </Col>

    <Col>
       <Card style={{marginTop:'3%',height:'397px', borderRadius:'15px', marginRight:'3%'}}>
     
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
    <Link to={"/newPage"}>  <button style={{float:'right', width:'260px', height:'56px', color:'#ffffff', backgroundColor:'#1AB64F', border:'none', borderRadius:'5px', fontSize:'20px', fontWeight:'500', fontStyle:'normal', fontFamily:'inter', marginTop:'3%', marginBottom:'2%', marginRight:'3%'}}>Continue</button></Link>
<p></p>

 </>
    }  
}

export default(ViewDetailsPage)