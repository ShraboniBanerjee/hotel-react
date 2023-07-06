import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51MJh15A4DcRuO9tw1F1ZDOWnIJQVLeySPmCSeRayxgTId9kaR91gjjaicqmYE2iYR81SU2mprZnlsp9C4fgMu5OA00KqOT39tg');

const Payment = (props) => {

    useEffect(()=>{
        console.log("----====", props)
        if(props.cashMode==="on"){
            console.log("----====", props)
        //    props.payment(true)
        }
        
    },[])


    return (
        <div>
            
<Elements stripe={stripePromise}>
    <CheckOutForm grand_total={props.grand_total}/>
</Elements>
        </div>
    );
};

export default Payment;