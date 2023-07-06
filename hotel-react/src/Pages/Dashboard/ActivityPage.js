import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Chart from "../../../src/components/charts/Chart";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';



class ActivityPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
        
<Breadcrumb style={{fontFamily:"inter"}}>
    <Breadcrumb.Item href="/reservationPage">Reservation</Breadcrumb.Item>
    <Breadcrumb.Item href="#">Activity</Breadcrumb.Item>
    </Breadcrumb>

    <p></p>
 
      <Card style={{borderRadius:'5px'}} >

      <Card.Header style={{backgroundColor:"#52A1FF", color:"white", fontFamily:"inter", borderTopLeftRadius:'5px', borderTopRightRadius:'5px'}}>ACTIVITY
      <Button style={{fontFamily:"inter", float:"right"}}>  <i className="fa fa-fw fa-calendar"></i> Start / End Date
          </Button>
      </Card.Header>
      
<Card.Header style={{backgroundColor:'#FFFFFF'}}>
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
        <thead style={{backgroundColor:"#4E98F3", color:"white", fontFamily:"inter", fontSize:"20px"}}>
          <tr>
            <th>Guest</th>
            <th>Check-In</th>
            <th>Nights</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Steve Smith</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>
         
          <tr>
            <td>Steve Smith</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>

          <tr>
            <td>Steve Smith</td>
            <td>12.30 PM</td>
            <td>4 Nights</td>
            <td>$252</td>         
          </tr>
       
        </tbody>
      </Table>
      </Card.Body>
    </Card>


    <p></p>

        <div className="charts">
          <Chart title="Revenue Graph" aspect={7 / 1} />
        </div>
<p></p>
        
 </>
    }  
}

export default adminLayout(ActivityPage);