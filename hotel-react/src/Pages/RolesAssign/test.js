import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

const RoleTable = ({url, searchData, setMessage}) => {

      const [users, setUsers] = useState([]);
      

    //Get Role
    useEffect(() => {
        if (localStorage.getItem("logintoken")) {
            const property = localStorage.getItem("property")
            const token = (JSON.parse(localStorage.getItem("logintoken")))
           
             const api = (`${url}permission_pages/${property}/`);
    
            fetch(api, {
              method: 'GET',
              headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + token['token']
              },
            })
            .then(res => res.json())
            .then(data => setUsers(data.employe_data))
            
        }
    }, [url])

  //users.map(u => console.log("USER: ", u.user.username))
  

    //Assign Role
    const handleRole = (e, username) => {
      const role = (e.target.value)
      const data = {option: "send_role", select: "employee", username: username, role: role}
      console.log(data);
      if (localStorage.getItem("logintoken")) {
        const property = localStorage.getItem("property")
        const token = (JSON.parse(localStorage.getItem("logintoken")))
         const api = (`${url}permission_pages/${property}/`);
         fetch(api, {
          method: 'POST',
          headers: {
            'content-type': "application/json",
            'Authorization': "Bearer " + token['token']
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => setMessage(data.msg))
        setTimeout(()=>{
          setMessage("")
        },3000)
    }
    }

    //Delete Role
    const handleDelete = (id) => {
      if (localStorage.getItem("logintoken")) {
        const property = localStorage.getItem("property")
        const token = (JSON.parse(localStorage.getItem("logintoken")))
        const api = (`${url}permission_pages/${property}/${id}/`);
        fetch(api, {
          method: 'DELETE',
          headers: {
            'content-type': "application/json",
            'Authorization': "Bearer " + token['token']
          },
        })
        .then(res => res.json())
        .then(data => setMessage(data.msg))
        setTimeout(()=>{
          setMessage("")
        },3000)
      }
    }

    return (
        <div>
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
{

searchData ?
  searchData.map((user, index) => {
    return(
      <>
    <tr>
    <td key={user?.id}>{index+1}</td>
    <td>{user?.user?.first_name}</td>
    <td>{user?.user?.email}</td>
    <td>
    <Form.Select aria-label="Default select example" className="w-75" onChange={(e) => handleRole(e, (user?.user?.username))}>
      <option>{user?.user?.groups[0]}</option>
      <option value="manager">Manager</option>
      <option value="accountant">Accountant</option>
      <option value="receptionist">Receptionist</option>
      <option value="staff">Staff</option>
    </Form.Select>
    </td>
    <td> {<Button variant='danger' onClick={()=> handleDelete(user?.id)}>Delete</Button>} </td>
  </tr>
      </>
    )
  })

  :
  users.map((user, index) => {
    
    return(
      <>
    <tr>
    <td key={user?.id}>{index+1}</td>
    <td>{user?.user.first_name}</td>
    <td>{user?.user.email}</td>
  
    <td>
      {
        (user?.user?.groups[0] === "admin") ?
      <Form.Select aria-label="Default select example" className="w-75" disabled >
      <option>{user?.user?.groups[0]}</option>
      </Form.Select>
      :
    <Form.Select aria-label="Default select example" className="w-75" onChange={(e) => handleRole(e, (user?.user?.username))}>
      <option>{user?.user?.groups[0]}</option>
      <option value="manager">Manager</option>
      <option value="accountant">Accountant</option>
      <option value="receptionist">Receptionist</option>
      <option value="staff">Staff</option>
    </Form.Select>
      }

    </td>
    <td>{(user?.user?.groups[0] === "admin")? <Button variant='danger' disabled onClick={()=> handleDelete(user?.id)}>Delete</Button> : <Button variant='danger' onClick={()=> handleDelete(user?.id)}>Delete</Button>}</td>
  </tr>
      </>
    )
  })


}
      </tbody>
    </Table>
        </div>
    );
};

export default RoleTable;