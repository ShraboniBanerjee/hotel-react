import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      checked:false
    }
  }
  render() {
    return (

      <div>

        {this.state.type === "Subscribe" &&

          <div style={{marginTop:"50px"}}>
            <h3 className="head">Terms & Conditions</h3>
            <p></p>
            <h2>Your Agreement</h2>

            <p></p>
            <Form>

              <Form.Text className="text-muted">
                The Terms & Conditions agreement is the most important legal agreement a SaaS business needs: it's the legally binding agreement between the SaaS company and the customers accessing and using the app on a regular basis.

                You can think of the Terms and Conditions as a legal contract that the SaaS business and its customers are signing together: the terms and rules as set in the agreement will govern the access of the service provided by the business.

                Here's why you'll want a Terms and Conditions agreement if you're developing a SaaS app:

                <li>Rules around payments, subscriptions, cancellations and refunds</li>
                <li>Rules around content that users create or post through the account even if it's private (user generated content)</li>
                <li>Rules around termination of accounts (i.e. abusive accounts)</li>
                <li>And much more</li>

                <li>Rules around payments, subscriptions, cancellations and refunds</li>
                <li>Rules around content that users create or post through the account even if it's private (user generated content)</li>
                <li>Rules around termination of accounts (i.e. abusive accounts)</li>
                <li>And much more</li>

                <li>Rules around payments, subscriptions, cancellations and refunds</li>
                <li>Rules around content that users create or post through the account even if it's private (user generated content)</li>
                <li>Rules around termination of accounts (i.e. abusive accounts)</li>
                <li>And much more</li>

                <li>Rules around payments, subscriptions, cancellations and refunds</li>
                <li>Rules around content that users create or post through the account even if it's private (user generated content)</li>
                <li>Rules around termination of accounts (i.e. abusive accounts)</li>
                <li>And much more</li>

                <li>Rules around payments, subscriptions, cancellations and refunds</li>

              </Form.Text>

              <p></p>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onChange={(e)=>{this.setState({checked:e.target.checked})}} type="checkbox" label="I accept and agree to the terms & conditions" />
              </Form.Group>
            </Form>

            <p></p>
            {this.state.checked && <Button className='mx-3' onClick={()=>{this.props.response('accept')}} variant="success">Continue</Button>}
            <Button onClick={()=>{this.props.response('decline')}} variant="danger">Decline</Button>
            <p></p>

          </div>}
      </div>
    )
  }
}

export default TermsAndConditions;