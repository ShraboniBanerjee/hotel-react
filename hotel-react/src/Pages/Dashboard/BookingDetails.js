
import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Card from 'react-bootstrap/Card';
import 'reactjs-popup/dist/index.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

class BookingDetails extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
        
         <Row>
            <Col>
       < Card style={{marginTop:'3%'}}>
      <Card.Header style={{fontSize:'20px', fontStyle:'normal', fontFamily:'inter', fontWeight:'500', color:'#252525', backgroundColor:'#ffffff', border:'none', marginTop:'2%'}}>Personal information
      <button style={{marginLeft:'5%', width:'96px', height:'24px', color:'#ffffff', backgroundColor:'#47ADFF', border:'none', borderRadius:'3px', fontSize:'16px', fontWeight:'500', fontStyle:'normal', fontFamily:'inter'}}>
     <img style={{margin:'4px'}} src={require('../../assets/images/editpencil.png')}/>Edit</button>

      </Card.Header>
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
        <Form.Control style={{height:'76px', width:'245px'}} type="text" placeholder="C-5 East Steet , Tower park , L.A " />
      </Form.Group>      
    </Form>

    <Card.Header style={{fontSize:'20px', fontStyle:'normal', fontFamily:'inter', fontWeight:'500', color:'#252525', backgroundColor:'#ffffff', border:'none'}}>Payment Details
     </Card.Header>
     <Card.Header style={{fontSize:'16px', fontStyle:'normal', fontFamily:'inter', fontWeight:'500', color:'#000000', backgroundColor:'#ffffff', border:'none'}}>Source
     </Card.Header>

     <Card.Header style={{backgroundColor:'#FFFFFF', border:'none'}}>
        <button style={{backgroundColor:'#FFFFFF', width:'121px', height:'32px',borderRadius:'3px', fontSize:'16px', color:'#5F5F5F', fontWeight:'500', borderBottom:'1px dashed #47ADFF', borderTop:'none', borderLeft:'none', borderRight:'none', fontFamily:'inter'}}>Online</button>
        <img style={{margin:'4px'}} src={require('../../assets/images/Vector 13.png')}/>
        <img style={{margin:'4px'}} src={require('../../assets/images/Vector 12.png')}/>

        <button style={{backgroundColor:'#47ADFF', width:'121px', height:'32px',borderRadius:'3px', fontSize:'16px', color:'#FFFFFF', fontWeight:'500',border:'none', fontFamily:'inter'}}>Debit Card</button>
     </Card.Header>
     <p></p>
    
     <Form.Group className="mb-3" controlId="name"  style={{width:'242px'}}>
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>First Name</Form.Label>
        <Form.Control type="text" placeholder="Mark" />
      </Form.Group>
     
      
     <Form.Group className="mb-3" controlId="number" style={{width:'242px'}}>
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>Card Number</Form.Label>
        <Form.Control type="number" placeholder=" *** *** *** ***** " />
      </Form.Group>
      
     
      <Row>
        <Col>
        <Form.Group className="mb-3" controlId="year">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>Expire</Form.Label>
        <Form.Control type="year" placeholder="MM/YY" />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="cvv">
        <Form.Label style={{fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#5F5F5F'}}>CVV Number</Form.Label>
        <Form.Control type="number" placeholder="***" />
      </Form.Group>
        </Col>
      </Row>

      <Card.Header style={{backgroundColor:'#FFFFFF', border:'none', fontStyle:'inter', fontSize:'20px', fontWeight:'500',marginTop:'3%', marginBottom:'2%'}}>
        Guest Documents
      </Card.Header>
      <Row>
        <Col>
        <img style={{marginLeft:'3%'}} src={require('../../assets/images/Pan Card.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>Passport</Card.Text>
      </Col>
      <Col>
        <img src={require('../../assets/images/Driving License.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>Driving License</Card.Text>
      </Col>
      <Col>
        <img src={require('../../assets/images/PR Card.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>PR Card</Card.Text>
      </Col>
      <Col>
        <img src={require('../../assets/images/Pan Card.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>Pan Card</Card.Text>
      </Col>
      </Row>

      <Card.Header style={{backgroundColor:'#FFFFFF', border:'none', fontStyle:'inter', fontSize:'20px', fontWeight:'500', marginTop:'3%', marginBottom:'2%'}}>
      Dependency’s Documents
      </Card.Header>
      <Row>
        <Col>
        <img style={{marginLeft:'3%'}} src={require('../../assets/images/Pan Card.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>Passport</Card.Text>
      </Col>
      <Col>
        <img src={require('../../assets/images/Driving License.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>Driving License</Card.Text>
      </Col>
      <Col>
        <img src={require('../../assets/images/PR Card.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>PR Card</Card.Text>
      </Col>
      <Col>
        <img src={require('../../assets/images/Pan Card.png')}/>
        <Card.Text className="text-center" style={{fontWeight:'500', fontSize:'12px', fontStyle:'normal', fontFamily:'inter', marginTop:'2%'}}>Pan Card</Card.Text>
      </Col>
      </Row>

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

      <Card.Footer style={{border:'none', backgroundColor:'#ffffff', borderRadius:'15px', marginBottom:'2%'}}>
       <Card.Text style={{fontWeight:"500", fontSize:'16px', fontStyle:'normal', fontFamily:'inter', color:'#000000'}}>Payable Amount
            <span style={{float:'right', fontSize:'26px', color:'#000000', fontStyle:'normal', fontFamily:'inter'}}>$ 327</span>
        </Card.Text>
       </Card.Footer>
      
    </Card>
   <Link to={"/newPage"}><button style={{ float:'right', width:'300px', height:'40px', color:'#ffffff', backgroundColor:'#1AB64F', border:'none', borderRadius:'5px', fontSize:'20px', fontWeight:'500', fontStyle:'normal', fontFamily:'inter',marginTop:'5%', marginBottom:'2%'}}>Pay Now</button></Link> 
    </Col>
    </Row>
     <p></p>
</>
}  
}

export default adminLayout(BookingDetails);