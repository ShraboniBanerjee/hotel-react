import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Payment from './Payment';

const CheckOutForm = ({grand_total}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [clientSecrect, setClientSecret] = useState('');

    useEffect(() => {
      if (localStorage.getItem("logintoken")) {
      //const property = localStorage.getItem("property");
      const token = (JSON.parse(localStorage.getItem("logintoken")));
      console.log("token", token);
      fetch('https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/payment_intent', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
           'Authorization': "Bearer " + token['token']
        },
         //body: JSON.stringify({"amount": "100"})
        body: ({
          "amount": 5000,
          "currency": "inr"
        })
      })
      .then((res) => res.json())
      .then((data) => {
          console.log("Data: ", (data));
          if(data !== "Didn't work"){
            <Payment payment ={go_pay()}/>
          } 
          //setClientSecret(data)
      })
    }
  }, [])

  // console.log("clientSecrect", clientSecrect);

    const go_pay = (data) =>{
      
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);
        if(card == null){
          return;
        }

  // Use card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });



    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } 
    if(paymentMethod) {
      console.log('[PaymentMethod]', paymentMethod);
      setCardSuccess("Payment Done Successfully!")
    }

    }

    // console.log("cardSuccess: ", cardSuccess);
    // console.log("cardError : ", cardError);

    return (
      <div>
        <b>{cardSuccess || cardError}</b>
        <form onSubmit={handleSubmit} className="w-75 ">
        <div></div>
        <CardElement className='mb-5 border border-primary rounded p-4'
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" className='btn btn-primary' disabled={!stripe}>Make Payment</button>
      </form>
      </div>
    );
};

export default CheckOutForm;