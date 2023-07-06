import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../assets/css/register.css';

const Registration = (props) => {
    const link = props.url
    const [accept, setAccept] = useState(false);
    const [message, setMessage] = useState("");
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const url = `${link}userRegister/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result =>  {    
            setMessage(result?.msg);
        })

        reset();
        setAccept(!(accept))
    }

    return (
        <div className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
        <div className="register_header">
        <h1 className='text-center pt-3'>Register</h1>
         <p className='text-center'>Already Member? <Link className=' text-primary fw-bold' to="/login">Log In</Link></p>
        { message && <p className='alert alert-success'>{message}</p>}
        </div>
        <div className="bg-white register_form" >
        <Form className='form_control' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label className='text-dark'>First Name</Form.Label>
                <Form.Control  type="text" className='shadow-none form-input' placeholder="your first name" {...register('fname')} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label className='text-dark'>Last Name</Form.Label>
                <Form.Control  type="text" className='shadow-none form-input' placeholder="your last name" {...register('lname')} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-dark'>Email address</Form.Label>
                <Form.Control type="email" className='shadow-none form-input' placeholder="your email" {...register('email')} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label className='text-dark'>Phone Number</Form.Label>
                <Form.Control type="number" className='shadow-none form-input' placeholder="your phone number" {...register('phone')} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
                <Form.Label className='text-dark'>Date of Birth</Form.Label>
                <Form.Control type="date" className='shadow-none form-input' placeholder="your date of birth" {...register('dob')} required />
            </Form.Group>

        <div className="register_footer">
            <Form.Group className="mb-3 d-flex justify-content-center align-items-center gap-1" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" onClick={() => setAccept(!(accept))} className='shadow-none'/> <span>Accept Terms & Conditions</span>
            </Form.Group>
            <div style={{marginRight: "70px"}}>
            <button className= {!(accept) ? "btn btn-danger px-5" : "btn btn-primary px-5"}  type="submit" disabled={!accept} >Register</button>
            </div>
        </div>
           
        </Form>
        </div>
       
    </div>
    );
};

export default Registration;