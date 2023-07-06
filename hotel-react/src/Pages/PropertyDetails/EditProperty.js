import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import adminLayout from '../../hoc/adminLayout';
import Loading from '../../images/Loading';


const EditProperty = ({url}) => {

    const [propertyData, setpropertyData] = useState({});
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState();
    const {hotel_name, website_name, address, description} = propertyData;

 //Get property Details from API
    useEffect(() => {
      const getData = async() => {
          setLoading(true);
        if (localStorage.getItem("logintoken")) {
          const property =  localStorage.getItem("property");
          const token = JSON.parse(localStorage.getItem("logintoken"));
          const api = `${url}hotel_description/${property}`;
          await fetch(api, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token["token"],
            },
          })
            .then((res) => res.json())
            .then((data) => {
                setpropertyData(data)
                
            });
            setLoading(false);
        }
      }
      getData();
    }, [url]);

    //Update Property
    const handleEditForm = async(e) => {
        e.preventDefault();
        if (localStorage.getItem("logintoken")) {
            const property = localStorage.getItem("property");
            const token = JSON.parse(localStorage.getItem("logintoken"));
            const api = `${url}hotel_description/${property}`;
            let data = await fetch(api, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
                Authorization: "Bearer " + token["token"],
            },
            body: JSON.stringify(propertyData)
            })
            let hh = await data.json()
            console.log(hh)
            
        }
     
    }


    return (
        <div>
    {
        loading ? <Loading/>
        :

        <>
         <div>{msg && <p className='alert alert-success'>{msg}</p>}</div>
            <Form className='bg-white p-4' onSubmit={handleEditForm} >
        <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text"  className='shadow-none'  value={hotel_name} onChange= {(e) => setpropertyData({hotel_name: e.target.value})}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" className='shadow-none' value={address} onChange= {(e) => setpropertyData({ address: e.target.value})}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWebsite">
            <Form.Label>WebSite</Form.Label>
            <Form.Control type="text" className='shadow-none'  value={website_name} onChange= {(e) => setpropertyData({ website_name: e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" className='shadow-none' value={description} onChange= {(e) => setpropertyData({description: e.target.value})} />
        </Form.Group>

        <Button variant="primary" type="submit">Update</Button>
        <Link className='btn btn-warning fw-bold ms-2' to="/property-details">Back</Link>
            </Form>
        </>

    }
       
        </div>
    );
};

export default adminLayout(EditProperty);