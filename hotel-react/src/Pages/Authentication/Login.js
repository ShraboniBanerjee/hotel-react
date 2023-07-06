import React from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react'
import '../../assets/css/login.css';

const Login = (props) => {
    const url = props.url
    const [errMsg, setErrMsg] = useState("")
    const [propertyData, setPropertyData] = useState([])
    const [address, setAddress] = useState("")
    const [getrequest, setGetrequest] = useState("yes")
    const navigate = useNavigate();
    const [addproperty,setAddproperty] = useState("")
    const { setValue,register, handleSubmit, reset } = useForm();

    const updateRates = async () => {
        const url = `${props.url}userLogin/`
            let data = await fetch(url, {
                method: 'GET',
                headers: {
                    'content-type': "application/json",
                },
            })
            let parsedata = await data.json()
            let property_data = parsedata.property
            setPropertyData(property_data)
            
    }

    const address_val = () =>{
       let property_val = document.getElementById("select_property").value
        if (property_val !==undefined){
            propertyData.map((e) => { 
                setValue("property",property_val)
                if (parseInt(e.id) === parseInt(property_val)){
                    setAddress(e.address)
                    setGetrequest("no")
                } })
        }
    }

    useEffect(async () => {

        // Update the document title using the browser API
        if (getrequest === "yes") {
            updateRates()
            address_val()
        }
    });


    const onSubmit = async (loginData) => {
        const api = `${url}userLogin/`;
        fetch(api, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginData,
                )
        })
            .then(res => res.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem("logintoken", JSON.stringify({ token: result.token.access }))
                    localStorage.setItem("data",JSON.stringify({ userid: result.userid }))
                    localStorage.setItem("property", result.property);

                    navigate('/');
                }
                else {
                    setErrMsg("username or password invalid")
                }
            })
        reset();
        
    }
    useEffect(() => {
        if (localStorage.getItem("logintoken")) {
            navigate('/');
        }
    }, [navigate])


    return (
        <section className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center login_body'>
            <div className='login_header'>
            <h1 className='text-center'>Login</h1>
                <p className='text-center'>Not a Member? <Link className='link_text' to="/register">Register</Link> </p>
            </div>
            <Form className='bg-white p-4 login_form' onSubmit={handleSubmit(onSubmit)}>
                <div className="select_property">
                <p>Select Property</p>
                <select id="select_property" onChange={address_val}>
                {propertyData.map((e) => {return <option className='bg-light d-block' value={e.id} key={e.id}>{e.hotel_name}</option>})}
                </select> 
                </div>

                <Form.Group className="pb-4" controlId="formBasicEmail">
                    <Form.Label className='text-dark mb-2'>User Name</Form.Label>
                    <Form.Control type="text" className='shadow-none form-input' placeholder="your username" {...register('username')} required />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Label className='text-dark mb-2'>Password</Form.Label>
                    <Form.Control type="password" className='shadow-none form-input' placeholder="your password" {...register('password')} required />
                </Form.Group>

                <div className="form_footer">
                <button type="submit">Login</button>
                <p className='pt-4'>Forgot Password? <Link className=' text-primary fw-bold' to="/reset-password">Reset Here</Link></p>
                {errMsg && <p className='alert alert-danger fw-bold'>{errMsg}</p>}
                </div>
            </Form>
        </section>
    );
};

export default Login;