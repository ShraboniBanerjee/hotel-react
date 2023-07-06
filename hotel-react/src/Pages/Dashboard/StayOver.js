
import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



class StayOver extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>


{/*<div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
    </div>  */}

<Breadcrumb style={{fontFamily:"inter"}}>
<Breadcrumb.Item href="#" active>Arrival</Breadcrumb.Item>
   <Breadcrumb.Item href="/reservationPage">Reservation</Breadcrumb.Item>
    <Breadcrumb.Item href="/activityPage">Activity</Breadcrumb.Item>
    </Breadcrumb>
   
       <div className="row">
        <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-black o-hidden h-100" style={{ borderRadius:'12px', backgroundColor:'#F5FFF6'}}>  
          <div className="card-body">
              <div className="mr-5" style={{color:"black", fontSize:"16px",fontFamily:"inter", padding:"2%", lineHeight:'19px', fontWeight:'500', color:'#0E0E0E'}}>Arrivals</div>
              <h2 style={{color:"#29973B", fontSize:"24px",fontFamily:"inter", padding:"2%",  lineHeight:'19px', fontWeight:'500'}}>
              126 
              </h2>
            </div>

            <div className="card-body-icon"  style={{color:"#D32F2F", marginLeft:"60%", padding:"4%"}}>
           
            {/*  <i className="fa fa-fw fa-sign-out fa-4x"></i> */}
              <img src={require('../../assets/images/greenicon.png')} style={{width:'60px', height:'54px'}}></img>
            </div>   
        </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-black o-hidden h-100" style={{borderRadius:'12px', backgroundColor:'#FCFCFC'}}>
            <div className="card-body">
              <div className="mr-5" style={{color:"black", fontSize:"16px", fontFamily:"inter", padding:"2%"}}>Departures</div>
              <h2 style={{color:"#D32F2F", fontSize:"24px", padding:"2%", fontFamily:"inter"}}> 126 </h2>
         
            </div>
            <div className="card-body-icon"  style={{color:"#D32F2F", marginLeft:"60%", padding:"4%"}}>
            <img src={require('../../assets/images/redicon.png')} style={{width:'60px', height:'54px'}}></img>
             
              </div>
          </div>
        </div>
        

        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-black  o-hidden h-100" style={{borderRadius:'12px', backgroundColor:'#FCFCFC'}}>
            <div className="card-body">
             
              <div className="mr-5"  style={{color:"black", fontSize:"16px", padding:"2%", fontFamily:"inter"}}>Stay-Overs</div>
              <h2 style={{color:"#7BB6FF", fontSize:"24px", padding:"2%", fontFamily:"inter"}}>126</h2>
            </div>
           
            <div className="card-body-icon"  style={{color:"#7BB6FF", marginLeft:"60%", padding:"4%"}}>
            <img src={require('../../assets/images/blueicon.png')} style={{width:'60px', height:'54px'}}></img>
             
              </div>

          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-black o-hidden h-100" style={{borderRadius:'12px', backgroundColor:'#FCFCFC'}}>
            <div className="card-body">
             
              <div className="mr-5" style={{color:"black", fontSize:"16px", padding:"2%", fontFamily:"inter"}}>Accomodations</div>
              <h2  style={{color:"#FF8A00", fontSize:"24px", padding:"2%", fontFamily:"inter"}}>126 %</h2>
            </div>
            <div className="card-body-icon"  style={{color:"#FF8A00", marginLeft:"60%", padding:"4%"}}>
            <img src={require('../../assets/images/orangeicon.png')} style={{width:'60px', height:'54px'}}></img>
             
              </div>
          </div>
        </div>
</div>
      <p></p>

<Row>
<Col>

<Card style={{borderRadius:'10px', marginTop:'2%'}}>
      <Card.Header  style={{backgroundColor:"#52A1FF", color:"white", fontFamily:"inter",  height:'56px', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', fontSize:'20px', fontWeight:'500', lineHeight:'35px'}}>RESERVATIONS
      <Link to={"/reservationPage"}><img src={require('../../assets/images/reservationbutton.png')} style={{color:"white", float:"right"}}></img></Link>
      </Card.Header>
      <Card.Header style={{backgroundColor:'#ffffff', padding:'3%', border:'none'}}></Card.Header>
      <Card.Header style={{backgroundColor:'#EDEFF5', border:'none', marginLeft:'2%', marginRight:'2%'}}>

      <Nav variant="pills" defaultActiveKey="/stayOver">
          <Nav.Item>
          <Nav.Link href="/arrivalPage" style={{fontFamily:"inter"}} >Arrivals</Nav.Link>
       
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
      <Breadcrumb style={{fontFamily:"inter"}}>
      <Breadcrumb.Item href="#" active>Today</Breadcrumb.Item>
      <Breadcrumb.Item>Tomorrow</Breadcrumb.Item>
    </Breadcrumb>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>

          <InputGroup hasValidation >
            <Form.Control placeholder="Guest Name" style={{borderTopColor:'#ffffff', borderRightColor:'#ffffff', borderLeftColor:'#ffffff'}} />
            <InputGroup.Text id="inputGroupPrepend" style={{backgroundColor:'#ffffff', borderTopColor:'#ffffff', borderRightColor:'#ffffff', borderLeftColor:'#ffffff'}}>  <i className="fa fa-fw fa-search"></i> </InputGroup.Text>
              </InputGroup>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        <Card.Text>
        <Table responsive="sm" style={{border:'none'}}>
        <thead style={{backgroundColor:'#EDEFF5'}}>
          <tr>
            <th>Booking ID</th>
            <th>Guest</th>
            <th>Room</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>C123</td>
            <td>Mark M</td>
            <td>Q-252</td>

            <td className="text-center">
            
       

            <Popup trigger={<button style={{width:"170px", height:"35px", backgroundColor:"white", borderTop:'none', borderRight:'none', borderLeft:'none'}}>
             Select Status 
            <span style={{float:'right'}}> <img src={require('../../assets/images/dropdown.png')} /> </span>
             </button>}>
                   <Form>
             {['checkbox'].map((type) => (
               <div key={`reverse-${type}`} className="mb-3">
                 <Form.Check
                   reverse
                   label="Stay-Over"
                   name="group1"
                   type={type}
                   id={`reverse-${type}-1`}
                   style={{backgroundColor:'#47ADFF'}}
                 />
                 <Form.Check
                     disabled
                   label="No Status"
                   name="group1"
                   type={type}
                   id={`disabled-${type}`}
                 />
                <Link><button style={{float:"right", color:"white", backgroundColor:"#0066FF", border:'none', fontStyle:'normal', fontColor:'#ffffff', fontWeight:'400', fontSize:'16px', borderRadius:'5px', marginTop:'4%'}}>Continue </button></Link>          
              
               </div>
             ))}
                
           </Form>
           <p></p>
         </Popup> 
                   </td>
</tr>
         
<tr>
          <td>C123</td>
            <td>Mark M</td>
            <td>Q-252</td>

            <td className="text-center">
            
       

     <Popup trigger={<button style={{width:"170px", height:"35px", backgroundColor:"white", borderTop:'none', borderRight:'none', borderLeft:'none'}}>
      Select Status 
     <span style={{float:'right'}}> <img src={require('../../assets/images/dropdown.png')} /> </span>
      </button>}>
            <Form>
      {['checkbox'].map((type) => (
        <div key={`reverse-${type}`} className="mb-3">
          <Form.Check
            reverse
            label="Stay-Over"
            name="group1"
            type={type}
            id={`reverse-${type}-1`}
            style={{backgroundColor:'#47ADFF'}}
          />
          <Form.Check
              disabled
            label="No Status"
            name="group1"
            type={type}
            id={`disabled-${type}`}
          />
         <Link><button style={{float:"right", color:"white", backgroundColor:"#0066FF", border:'none', fontStyle:'normal', fontColor:'#ffffff', fontWeight:'400', fontSize:'16px', borderRadius:'5px', marginTop:'4%'}}>Continue </button></Link>          
       
        </div>
      ))}
         
    </Form>
    <p></p>
  </Popup> 
            </td>
</tr>

<tr>
          <td>C123</td>
            <td>Mark M</td>
            <td>Q-252</td>

            <td className="text-center">
            
       

            <Popup trigger={<button style={{width:"170px", height:"35px", backgroundColor:"white", borderTop:'none', borderRight:'none', borderLeft:'none'}}>
             Select Status 
            <span style={{float:'right'}}> <img src={require('../../assets/images/dropdown.png')} /> </span>
             </button>}>
                   <Form>
             {['checkbox'].map((type) => (
               <div key={`reverse-${type}`} className="mb-3">
                 <Form.Check
                   reverse
                   label="Stay-Over"
                   name="group1"
                   type={type}
                   id={`reverse-${type}-1`}
                   style={{backgroundColor:'#47ADFF'}}
                 />
                 <Form.Check
                     disabled
                   label="No Status"
                   name="group1"
                   type={type}
                   id={`disabled-${type}`}
                 />
                <Link><button style={{float:"right", color:"white", backgroundColor:"#0066FF", border:'none', fontStyle:'normal', fontColor:'#ffffff', fontWeight:'400', fontSize:'16px', borderRadius:'5px', marginTop:'4%'}}>Continue </button></Link>          
              
               </div>
             ))}
                
           </Form>
           <p></p>
         </Popup> 
                   </td>
</tr>

<tr>
          <td>C123</td>
            <td>Mark M</td>
            <td>Q-252</td>

            <td className="text-center">
            
       

            <Popup trigger={<button style={{width:"170px", height:"35px", backgroundColor:"white", borderTop:'none', borderRight:'none', borderLeft:'none'}}>
             Select Status 
            <span style={{float:'right'}}> <img src={require('../../assets/images/dropdown.png')} /> </span>
             </button>}>
                   <Form>
             {['checkbox'].map((type) => (
               <div key={`reverse-${type}`} className="mb-3">
                 <Form.Check
                   reverse
                   label="Stay-Over"
                   name="group1"
                   type={type}
                   id={`reverse-${type}-1`}
                   style={{backgroundColor:'#47ADFF'}}
                 />
                 <Form.Check
                     disabled
                   label="No Status"
                   name="group1"
                   type={type}
                   id={`disabled-${type}`}
                 />
                <Link><button style={{float:"right", color:"white", backgroundColor:"#0066FF", border:'none', fontStyle:'normal', fontColor:'#ffffff', fontWeight:'400', fontSize:'16px', borderRadius:'5px', marginTop:'4%'}}>Continue </button></Link>          
              
               </div>
             ))}
                
           </Form>
           <p></p>
         </Popup> 
                   </td>
</tr>

<tr>
          <td>C123</td>
            <td>Mark M</td>
            <td>Q-252</td>

            <td className="text-center">
            
       

            <Popup trigger={<button style={{width:"170px", height:"35px", backgroundColor:"white", borderTop:'none', borderRight:'none', borderLeft:'none'}}>
             Select Status 
            <span style={{float:'right'}}> <img src={require('../../assets/images/dropdown.png')} /> </span>
             </button>}>
                   <Form>
             {['checkbox'].map((type) => (
               <div key={`reverse-${type}`} className="mb-3">
                 <Form.Check
                   reverse
                   label="Stay-Over"
                   name="group1"
                   type={type}
                   id={`reverse-${type}-1`}
                   style={{backgroundColor:'#47ADFF'}}
                 />
                 <Form.Check
                     disabled
                   label="No Status"
                   name="group1"
                   type={type}
                   id={`disabled-${type}`}
                 />
                <Link><button style={{float:"right", color:"white", backgroundColor:"#0066FF", border:'none', fontStyle:'normal', fontColor:'#ffffff', fontWeight:'400', fontSize:'16px', borderRadius:'5px', marginTop:'4%'}}>Continue </button></Link>          
              
               </div>
             ))}
                
           </Form>
           <p></p>
         </Popup> 
                   </td>
</tr>


<tr>
          <td>C123</td>
            <td>Mark M</td>
            <td>Q-252</td>

            <td className="text-center">
            
       

            <Popup trigger={<button style={{width:"170px", height:"35px", backgroundColor:"white", borderTop:'none', borderRight:'none', borderLeft:'none'}}>
             Select Status 
            <span style={{float:'right'}}> <img src={require('../../assets/images/dropdown.png')} /> </span>
             </button>}>
                   <Form>
             {['checkbox'].map((type) => (
               <div key={`reverse-${type}`} className="mb-3">
                 <Form.Check
                   reverse
                   label="Stay-Over"
                   name="group1"
                   type={type}
                   id={`reverse-${type}-1`}
                   style={{backgroundColor:'#47ADFF'}}
                 />
                 <Form.Check
                     disabled
                   label="No Status"
                   name="group1"
                   type={type}
                   id={`disabled-${type}`}
                 />
                <Link><button style={{float:"right", color:"white", backgroundColor:"#0066FF", border:'none', fontStyle:'normal', fontColor:'#ffffff', fontWeight:'400', fontSize:'16px', borderRadius:'5px', marginTop:'4%'}}>Continue </button></Link>          
              
               </div>
             ))}
                
           </Form>
           <p></p>
         </Popup> 
                   </td>
</tr>

        </tbody>
      </Table>
      <Link to={"/reservationPage"}>  <Button style={{marginTop:'2%', float:"right", background:'#47ADFF', width:'115px', height:'40px', borderRadius:'8px'}}>View All</Button></Link>
      </Card.Text>
         </Card.Body>  
    </Card>
    </Col>

    <Col>
      <Card style={{borderRadius:'10px',marginTop:'2%'}}>
      <Card.Header  style={{backgroundColor:"#52A1FF", color:"white", fontFamily:"inter",  height:'56px', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', fontSize:'20px', fontWeight:'500', lineHeight:'35px'}}>TODAY'S ACTIVITY</Card.Header>
<Card.Header style={{backgroundColor:'#FFFFFF', border:'none'}}>
  <Row>
    <Col>
<Card style={{border:'none'}}>
 <Card.Body>
  <Card.Text style={{color:"#4E98F3", fontFamily:"inter", fontSize:"20px"}}>4</Card.Text>
        <Card.Text style={{fontFamily:"inter",fontSize:"16px"}}>Booked Today</Card.Text>
     </Card.Body>
    </Card>
    </Col>

    <Col>
<Card style={{border:'none'}}>
 <Card.Body>
  <Card.Text style={{color:"#4E98F3", fontFamily:"inter", fontSize:"20px"}}>4</Card.Text>
        <Card.Text style={{fontFamily:"inter",fontSize:"16px"}}>Room Night</Card.Text>
     </Card.Body>
    </Card>
    </Col>

    <Col>
<Card style={{border:'none'}}>
 <Card.Body>
  <Card.Text style={{color:"#4E98F3", fontFamily:"inter", fontSize:"20px"}}>$252.00</Card.Text>
        <Card.Text style={{fontFamily:"inter",fontSize:"16px"}}>Revenue</Card.Text>
     </Card.Body>
    </Card>
    </Col>
  </Row>
</Card.Header>

      <Card.Body>
      <Table responsive="sm" style={{border:'none'}}>
        <thead style={{backgroundColor:'#EDEFF5'}}>
          <tr>
            <th>Guest</th>
            <th>Check-In</th>
            <th>Nights</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>
         
          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>
          
          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>
         
          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

          <tr>
            <td>Mark M</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

        </tbody>
      </Table>

      <Link to={"/activityPage"}><Button style={{marginTop:'2%', float:"right", background:'#47ADFF', width:'115px', height:'40px', borderRadius:'8px'}}>View All</Button>
</Link>
      </Card.Body>
    </Card>
    </Col>
    </Row>

<p></p>
        
 </>
    }  
}

export default adminLayout(StayOver);