import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import '../../assets/css/reset-password.css';
const lock = require('../../assets/images/lock.png');

const ResetPassword = ({url}) => {

  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async(resetData) => {  
    console.log("resetData", resetData); 
    const api = `${url}resetpassword/`;
   await fetch(api, {
       method: 'POST',
       headers: {
           'content-type': 'application/json'
       },
       body: resetData
      })
      .then(res => res.json())
      .then(result =>  {   
        console.log("result", result); 
        setMessage("Reset password sent to you email!");
      })

      reset();
  };

  return (
    <section className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="reset_password_body">
        
      <div className="reset_password_header">
        <img src={lock} alt="lock" className="img-fluid w-25 my-4" />
      <h1 className="text-center">Forgot Password?</h1>
      <p className="pt-2 pb-3">You can reset your password here</p>
      </div>
      
        <Form className="" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="input-box" controlId="formBasicEmail">
            <Form.Label className="text-dark">Email</Form.Label>
            <Form.Control type="text" className="shadow-none form-input" style={{maxWidth: "320px"}} placeholder="your email" {...register("email")} required />
          </Form.Group>
          <Form.Control type="hidden" value={"resetpassword"} {...register("option")} required />
          <div className="reset_password_footer">
          <button type="submit">Reset</button>
          <p className=''>Remembered Password? go back to<Link className='text-primary fw-bold' to="/login"> Log In</Link></p>
          { message && <p className='alert alert-success'>{message}</p>}
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ResetPassword;
