import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import 'reactjs-popup/dist/index.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";


class ReservationPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
 
<Breadcrumb style={{fontFamily:"inter"}}>
    <Breadcrumb.Item href="#">Reservation</Breadcrumb.Item>
    <Breadcrumb.Item href="/activityPage">Activity</Breadcrumb.Item>
    </Breadcrumb>
             <p></p>


             <Card style={{borderRadius:'10px',marginTop:'2%'}}>

      <Card.Header  style={{backgroundColor:"#52A1FF", color:"white", fontFamily:"inter",  height:'56px', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', fontSize:'20px', fontWeight:'500', lineHeight:'35px'}}>RESERVATIONS
      <Link to={"/reservationPage"}><img src={require('../../assets/images/reservationbutton.png')} style={{color:"white", float:"right"}}></img></Link>
      </Card.Header>

   
      <Card.Header style={{backgroundColor:'#ffffff', padding:'1%', border:'none'}}></Card.Header>
      
      <Card.Header style={{backgroundColor:'#EDEFF5', border:'none', marginLeft:'2%', marginRight:'2%'}}>
    
      <Nav variant="pills">
          <Nav.Item>
          <Nav.Link href="/arrivalPage" style={{fontFamily:"inter"}}>Arrivals</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/departurePage" style={{fontFamily:"inter"}}>Departures</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/stayOver" style={{fontFamily:"inter"}}>
              Stay-Overs
            </Nav.Link>
          </Nav.Item>
        </Nav>

      </Card.Header>

    <Card.Body>
    <Navbar>
      <Container>
        <Navbar.Toggle />
      
          <Navbar.Text>
            <Form>
            <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">  <i className="fa fa-fw fa-search"></i> </InputGroup.Text>
              <Form.Control placeholder="Guest Name" />
              </InputGroup>
            </Form>
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
          <Button style={{backgroundColor:"#52A1FF", fontFamily:"inter"}}>  <i className="fa fa-fw fa-calendar"></i> Start / End Date </Button>
            </Navbar.Collapse>
      </Container>
    </Navbar>

        <Card.Text>
        <Table responsive="sm" style={{border:'none'}}>
        <thead style={{backgroundColor:'#EDEFF5'}}>
          <tr>
          <th></th>
            <th>Booking ID</th>
            <th>Guest</th>
            <th>Room</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
          <td>    
            <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
        <Form.Check 
            type={type}
            id={`default-${type}`}
          />
       </div>
      ))}
    </Form>   
    </td>

          <td>C123</td>
            <td>Steve Smith</td>
            <td>Q-252</td>
            <td></td>
          </tr>
         
          <tr>
            
          <td>    
            <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
        <Form.Check 
            type={type}
            id={`default-${type}`}
          />
       </div>
      ))}
    </Form>   
    </td>
          <td>C123</td>
          <td>Steve Smith</td>
            <td>Q-252</td>
     <td></td>
          </tr>

          <tr>
            
          <td>    
            <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
        <Form.Check 
            type={type}
            id={`default-${type}`}
          />
       </div>
      ))}
    </Form>   
    </td>
          <td>C123</td>
          <td>Steve Smith</td>
            <td>Q-252</td>
            <td className="text-center" style={{ fontFamily:"inter", fontSize:"14px", fontWeight:"400"}}>No Action Status</td>
    
          </tr>

          <tr>
            
          <td>    
            <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
        <Form.Check 
            type={type}
            id={`default-${type}`}
          />
       </div>
      ))}
    </Form>   
    </td>
          <td>C123</td>
          <td>Steve Smith</td>
            <td>Q-252</td>
           <td></td>
   </tr>
          <tr>
            
          <td>    
          <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
        <Form.Check 
            type={type}
            id={`default-${type}`}
          />
       </div>
      ))}
    </Form>  
    </td>
    
          <td>C123</td>
          <td>Steve Smith</td>
            <td>Q-252</td>
            <td></td>
          </tr>

        </tbody>
      </Table>
     <Link to={"/ArrivalPage"}> <Button style={{marginTop:'2%',float:"right", background:'#47ADFF', width:'115px', height:'40px', borderRadius:'8px', float:'right', marginTop:'2%'}}>View All</Button></Link>
      </Card.Text>
         </Card.Body>  
    </Card>
   
<p></p>
        
 </>
    }  
}

export default adminLayout(ReservationPage);