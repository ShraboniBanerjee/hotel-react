import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

class UserDetails extends Component {
  constructor(props){
      super(props);

      this.state = {}
  }
  render() {
  return (

   <div>
       <h3 className="head">User Profile Details</h3> 
  <Row>
    <Col>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://icon-library.com/images/profile-image-icon/profile-image-icon-5.jpg" />
      <Card.Body>
      <h2>Subscriber Name: Joe Root</h2>
        <Card.Text>
            <li>First Name: Joe</li>
            <li>Last Name: Root</li>
        <li>Email: joe@gmail.com</li>
        <li>Role: Subscriber</li>
        <li>Status: Active</li>
        <li>Last Seen: 2 days ago</li>
        </Card.Text>
        <h2>Location</h2>
        <Card.Text>
        <li>Country: Sweden</li>
            <li>City: Solna</li>
            <li>Region: Stockholm</li>
            </Card.Text>   
            <h2>Personal Info</h2>
        <Card.Text>
        <li>Job Title: Marketing Manager</li>
            <li>Birth Date: September 15, 1992</li>
            <li>Phone Number: 0965426083</li>
            </Card.Text>    
         <Button variant="primary">View Subscription</Button>
      </Card.Body>
    </Card>
</Col>

<Col>
<Card style={{ width: '18rem' }}>
      <Card.Body>    
        <Card.Text>
        <h2>2 Membership</h2>
        <li>Sliver: Active</li>
        <li>Start Date: January 1, 2019</li>
        <li>Expiry Date: January 29, 2023</li>
        <li>Gold: Expired</li>
        <li>Status: Deactive</li>
        <li>Last Seen: 2 days ago</li>
        </Card.Text>
        <h2>1 Subscription</h2>
        <Card.Text>
        <li>#3652 January 1, 2017</li>
            <li>Status: Active</li>
            <li>Silver Plan Subscription</li>
            <li>Start Date: January 1, 2019</li>
        <li>Expiry Date: January 29, 2023</li>
            </Card.Text>   

            <h2>2 Orders</h2>
        <Card.Text>
        <li>#3654 January 21, 2017</li>
            <li>Status: Active</li>
            <li>Silver Plan Subscription</li>
            <li>Start Date: January 1, 2019</li>
        <li>Expiry Date: January 29, 2023</li>
        </Card.Text>

        <h2>1 Product Review</h2>
        <Card.Text>
            <li>Silver Plan Subscription</li>
            <li>Status: Active</li>
            <li>Start Date: January 21, 2018</li>
        <li>Expiry Date: January 29, 2024</li>
        <li> Highly Reccomended</li>
            </Card.Text>    
      </Card.Body>
    </Card>
</Col>


<Col>
<Card style={{ width: '18rem' }}>
      <Card.Body>    

        <h2>Payment Details</h2>
        <Card.Text>
        <li>Level: Subscriber</li>
            <li>Price: $10.00 per Month</li>
            <li>Expiration: October 14, 2023</li>
            </Card.Text>   

            <h2>Personal Payment Info</h2>
        <Card.Text>
        <li>Payment Method: Bank Transfer</li>
            <li>Bank Country/Region: USA</li>
            <li>Bank: JP Morgan Chase</li>
            <li>Account Owner: Joe Root</li>
            <li>Account Type(USA): Checking</li>
            <li>Routing Number: 325070760</li>
            <li>Account Number: 2233333456</li>
            <li>Business Identifier Code: 34</li>
            <li>IBAN: 23</li>
            <li>Currency: USD</li>
            </Card.Text>   

            <h2>Bank Details</h2>
            <Card.Text>
        <li>Account Holder Name: Joe Root</li>
            <li>Account Number: 34542563775</li>
            <li>IFSC Code: UFSC56432</li>
            <li>Bank Name:UFSC Bank </li>
            <li>Email: abc@gmail.com</li>
            <li>Phone Number: 4567899321 </li>
            <li>Bank Location: USA</li>
            <li>Currency: USD</li>
            <li>Status: Active</li>
            </Card.Text>   

      </Card.Body>
    </Card>
</Col>


<Col>
<h2>Subscription Use</h2>
<ProgressBar now={60} />
<p></p>
<h2>User Account Update</h2>
<ProgressBar now={80} />
<p></p>
<h2>User Active Status</h2>
<ProgressBar now={50} />
<p></p>
<h2>User Account Strength</h2>
<ProgressBar now={40} />
<p></p>
<h2>User Daily Usage</h2>
<ProgressBar now={58} />
<p></p>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Start</th>
          <th>Expire</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>22.09.21</td>
          <td>12.3.23</td>
          <td>Active</td>
        </tr>

        <tr>
          <td>2</td>
          <td>22.12.21</td>
          <td>12.1.23</td>
          <td>Deactive</td>
        </tr>

        <tr>
          <td>3</td>
          <td>2.09.21</td>
          <td>22.3.23</td>
          <td>Deactive</td>
        </tr>

        
        <tr>
          <td>4</td>
          <td>30.09.20</td>
          <td>2.1.23</td>
          <td>Active</td>
        </tr>

        <tr>
          <td>5</td>
          <td>23.09.20</td>
          <td>1.1.23</td>
          <td>Active</td>
        </tr>

        <tr>
          <td>6</td>
          <td>30.09.20</td>
          <td>21.1.23</td>
          <td>Deactive</td>
        </tr>

        </tbody>
        </Table>
</Col>

</Row>

</div>
 )
}
}

export default adminLayout(UserDetails);