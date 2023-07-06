import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class BookingEngine extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){ return  <>
<Navbar style={{backgroundColor:'blue'}}>
      <Container>
        <Navbar.Brand href="#home">
        <span style={{float:'left'}}> <img style={{width:'124px', height:'50px'}} src={require('../../assets/images/trident-logo.png')}></img> 
        </span>
        </Navbar.Brand>

        <Navbar.Brand>
        <InputGroup>
      <InputGroup.Text  style={{borderColor:'#ffffff', background:'#ffffff'}}><img src={require('../../assets/images/search.png')}></img></InputGroup.Text>
      <Form.Control style={{border:'none'}} placeholder="Search" />
      <InputGroup.Text  style={{borderColor:'#ffffff', background:'#ffffff'}}>
      <DateRangePicker
        initialSettings={{ startDate: '1/1/2023', endDate: '3/1/2024' }}
      >
       
        <img src={require('../../assets/images/date.png')}></img>
      </DateRangePicker>
      
      
      </InputGroup.Text>
      <Form.Control style={{border:'none', width:'20%', borderTopRightRadius:'1px', borderBottomRightRadius:'1px'}} placeholder="Wed, 15 Feb - Thu, 16 Feb" />
<img style={{marginLeft:'-1%'}} src={require('../../assets/images/button.png')}></img>
    
      </InputGroup>
        </Navbar.Brand>

        <Navbar.Brand>
        <Link to={"/GuestPage"}>
         <span style={{float:'right'}}> <img src={require('../../assets/images/checkin.png')}></img>
         </span></Link>
        </Navbar.Brand>
      
        <Navbar.Toggle />
      </Container>
    </Navbar>
    <p></p>
   <Nav style={{marginLeft:'2%', fontFamily:'inter', fontStyle:'normal', fontSize:'24px', fontWeight:'600', fontColor:'#252525'}}>
     Filters </Nav>

    <Row>

      <Col>
      <Card style={{marginLeft:'2%', marginTop:'4%', border:'none'}}>
        <Card.Header style={{background:'none', fontWeight:'500', fontFamily:'inter', fontSize:'20px', color:'#252525', border:'none'}}>Room Type</Card.Header>
           
        <Form style={{fontWeight:'400', fontFamily:'inter', fontSize:'16px', color:'#3D3737', marginLeft:'4%'}}>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Luxury`}
          />

           <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Economic`}
          />

            <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Diamond`}
          />

            <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Normal`}
          />

            <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Suits`}
          />


  <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Big Size`}
          />


  <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`Normal`}
          />


  <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`King`}
          />



        </div>
      ))}
    </Form>

      </Card>
      </Col>

      <Col>
      <Card style={{marginTop:'4%'}}>
        <img src={require('../../assets/images/hotel1.png')}></img>
      </Card>
      </Col>

      <Col>
      <Card style={{marginTop:'4%', marginRight:'2%', border:'none'}}>
        <Card.Header style={{fontSize:'24px', fontWeight:'500', fontStyle:'normal', fontFamily:'inter', fontColor:'#252525', border:'none', background:'none'}}>Luxury Room</Card.Header>
        <Card.Body>
        <Card.Text style={{fontSize:'16px', fontColor:'#5F5F5F', fontWeight:'400', fontFamily:'inter', fontStyle:"normal", opacity:'0.7'}}>These cozy rooms located in the historic Palace Wing are the gateway to a memorable experience. Perfect for meditation, these windowless rooms offer you complete tranquility. Designed for our jet-setting business travelers who require silence.</Card.Text>
        </Card.Body>

        <Card.Footer style={{ fontSize:'10px', fontWeight:'400', fontStyle:'normal', fontFamily:'inter', fontColor:'#000000', border:'none', background:'none'}}>
        <Row>
        <Col><img style={{width:'15px'}} src={require('../../assets/images/ac.png')} /> AC</Col>
        <Col><img style={{width:'15px'}} src={require('../../assets/images/wifi.png')} /> Free Wifi</Col>
        <Col><img style={{width:'15px', fontSize:'12px'}} src={require('../../assets/images/Battery.png')} /> Power Backup</Col>
        <Col> +9 More</Col>
        </Row>
        </Card.Footer>
         
        <Card.Footer style={{ fontSize:'10px', fontWeight:'400', fontStyle:'normal', fontFamily:'inter', fontColor:'#000000', border:'none', background:'none'}}>
        <Row>
        <Col style={{color:'#FF0000', fontSize:'10px', fontWeight:'500', fontStyle:'normal', opacity:'0.7', fontFamily:'inter'}}>Max Occupancy 2 person</Col>
        <Col>
        <Link to={"/ViewDetailsPage"}> <button style={{float:'right', width:'112px', height:'32px', backgroundColor:'#ffffff', borderColor:'#5F5F5F', borderRadius:'5px', color:"#252525", fontStyle:'normal', fontFamily:'inter', fontSize:'16px', fontWeight:'500'}}>View Details</button>
       </Link>
        </Col>

        <Col>
        <Link to={"/bookingPage"}>
  <button style={{ width:'112px', height:'32px', backgroundColor:'#1AB64F', border:'none', borderRadius:'5px', color:"#ffffff", fontStyle:'normal', fontFamily:'inter', fontSize:'16px', fontWeight:'500'}}>Add Room</button>
  </Link></Col>

        </Row>
        </Card.Footer>

      </Card>
      </Col>
    </Row>
   
    <Row>
<Col>
    <Card style={{marginLeft:'2%', marginTop:'4%', border:'none'}}>

<Card.Header style={{background:'none', fontWeight:'500', fontFamily:'inter', fontSize:'20px', color:'#252525', border:'none'}}>Room Facilities</Card.Header>

<Form style={{fontWeight:'400', fontFamily:'inter', fontSize:'16px', color:'#3D3737', marginLeft:'4%' }}>
{['checkbox'].map((type) => (
  <div key={`default-${type}`} className="mb-3">
    <Form.Check 
      type={type}
      id={`default-${type}`}
      label={`Jacuzzi`}
    />

<Form.Check 
      type={type}
      id={`default-${type}`}
      label={`Sea View`}
    />

     <Form.Check 
      type={type}
      id={`default-${type}`}
      label={`Bath tub`}
    />

  </div>
))}
</Form>

</Card>
</Col>

<Col>
<Card style={{marginTop:'4%'}}>
  <img src={require('../../assets/images/hotel2.png')}></img>
</Card>
</Col>

<Col>
<Card style={{marginTop:'4%', marginRight:'2%', border:'none'}}>
  <Card.Header style={{fontSize:'24px', fontWeight:'500', fontStyle:'normal', fontFamily:'inter', fontColor:'#252525', border:'none', background:'none'}}>Luxury Room</Card.Header>
  <Card.Body>
  <Card.Text style={{fontSize:'16px', fontColor:'#5F5F5F', fontWeight:'400', fontFamily:'inter', fontStyle:"normal", opacity:'0.7'}}>These cozy rooms located in the historic Palace Wing are the gateway to a memorable experience. Perfect for meditation, these windowless rooms offer you complete tranquility. Designed for our jet-setting business travelers who require silence.</Card.Text>
  </Card.Body>

  <Card.Footer style={{ fontSize:'10px', fontWeight:'400', fontStyle:'normal', fontFamily:'inter', fontColor:'#000000', border:'none', background:'none'}}>
  <Row>
  <Col><img style={{width:'15px'}} src={require('../../assets/images/ac.png')} /> AC</Col>
  <Col><img style={{width:'15px'}} src={require('../../assets/images/wifi.png')} /> Free Wifi</Col>
  <Col><img style={{width:'15px', fontSize:'12px'}} src={require('../../assets/images/Battery.png')} /> Power Backup</Col>
  <Col> +9 More</Col>
  </Row>
  </Card.Footer>
   
  <Card.Footer style={{ fontSize:'10px', fontWeight:'400', fontStyle:'normal', fontFamily:'inter', fontColor:'#000000', border:'none', background:'none'}}>
  <Row>
  <Col style={{color:'#FF0000', fontSize:'10px', fontWeight:'500', fontStyle:'normal', opacity:'0.7', fontFamily:'inter'}}>Max Occupancy 2 person</Col>
  <Col>
 
 <Link to={"/ViewDetailsPage"}> <button style={{float:'right', width:'112px', height:'32px', backgroundColor:'#ffffff', borderColor:'#5F5F5F', borderRadius:'5px', color:"#252525", fontStyle:'normal', fontFamily:'inter', fontSize:'16px', fontWeight:'500'}}>View Details</button>
 </Link>
  </Col>

  <Col>
  <Link to={"/bookingPage"}>
  <button style={{ width:'112px', height:'32px', backgroundColor:'#1AB64F', border:'none', borderRadius:'5px', color:"#ffffff", fontStyle:'normal', fontFamily:'inter', fontSize:'16px', fontWeight:'500'}}>Add Room</button>
  </Link>
  </Col>


  </Row>
  </Card.Footer>

</Card>
</Col>
</Row>

<p></p>

 </>
    }  
}

export default(BookingEngine)