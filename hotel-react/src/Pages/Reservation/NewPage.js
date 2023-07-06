import React from "react";
import adminLayout from "../../hoc/adminLayout"
import Card from 'react-bootstrap/Card';
import 'reactjs-popup/dist/index.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class NewPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>

        <p style={{color:'#D32F2F', fontSize:'20px', fontStyle:'normal', fontFamily:'inter', fontWeight:'400'}}>
          No user Found ! Please Fill the Form
        </p>

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
        <Form.Control style={{height:'76px', width:'285px'}} type="text" placeholder="Enter your address" />
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
        <Form.Control style={{height:'76px', width:'285px'}} type="text" placeholder="Enter your address" />
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
    <Row>
      <Col>
      <Card style={{borderRadius:'15px'}}>
        <Card.Body>
        <Card.Text style={{fontStyle:'normal', fontFamily:'inter', fontSize:'24px', fontWeight:'500', color:'#252525'}}>Upload Documents</Card.Text>
        <Card.Text  style={{fontStyle:'normal', fontFamily:'inter', fontSize:'16px', fontWeight:'400', color:'#5F5F5F'}}>For verification please upload digital photo of documents</Card.Text>
        <Row>
          <Col>
            <span><img src={require('../../assets/images/profilephoto.png')} /></span>
            <span><img src={require('../../assets/images/passport11.png')} /></span>
     </Col>
        </Row>
        <p></p>
        <Row>
          <Col>
          <span><img src={require('../../assets/images/selectfile.png')} />  </span>
        </Col>
        <Col>
         <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Name of the Document</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group> 
      <Form.Group className="mb-3" controlId="text">
        <Form.Label style={{ fontWeight:'400', fontStyle:'normal', fontFamily:'inter', color:'#252525'}}>Enter Document Number</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group> 
        </Col>
         </Row>
        
      </Card.Body>
      </Card>
      </Col>

        <Col>
      <Card style={{borderRadius:'15px'}}>
        <Card.Body>
        <Card.Text style={{fontStyle:'normal', fontFamily:'inter', fontSize:'24px', fontWeight:'500', color:'#252525'}}>Upload Signature</Card.Text>
         <button style={{borderTop:'none', borderRight:'none', borderLeft:'none', borderColor:'#1AB64F', background:'none', color:'#252525', fontSize:'16px', fontWeight:'400', fontFamily:'inter', fontStyle:'normal'}}>Upload</button>
         <p></p>
            <span><img src={require('../../assets/images/Signature11.png')} /></span>
  

      <Card.Text style={{fontStyle:'normal', fontFamily:'inter', fontSize:'13px', fontWeight:'400', color:'#5F5F5F', marginTop:'0.5%'}}>By signing this document with an  electronic signature, I agree that such signature will be as valid as handwritten signatures to the extent allowed by local law.</Card.Text>
    <Card.Footer style={{background:'none', border:'none'}}>  
      <button style={{float:'left', background:'none', borderColor:'#000000', color:'#5F5F5F', fontStyle:'normal', fontFamily:'inter', borderRadius:'5px', width:'107px', height:'40px', fontSize:'16px', fontWeight:'400', margin:'1px'}}>Cancel</button>
      <button style={{float:'right',background:'#1AB64F', border:'none', margin:'1px', color:'#FFFFFF', fontStyle:'normal', fontFamily:'inter', borderRadius:'5px', width:'146px', height:'40px', fontSize:'16px', fontWeight:'400', margin:'1px'}}>Accept and Sign</button>
      </Card.Footer>
        </Card.Body>
       </Card>
      </Col>
    </Row>

 </>
    } 
}

export default adminLayout(NewPage);