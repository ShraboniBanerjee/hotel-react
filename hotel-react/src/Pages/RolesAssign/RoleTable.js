import React, { useEffect } from 'react';
import { useState } from 'react';
import adminLayout from "../../hoc/adminLayout";
import Loading from '../../images/Loading';
import Tables from '../Constants/Tables';

const RoleTable = ({url, searchData, setMessage}) => {

      const [loading, setLoading] = useState(false);
      const [users, setUsers] = useState([]);
      const title = {'UserName':["value['user']['username']","text"],'Name':["value['user']['first_name']","text"],"Email":["value['user']['email']","email"],
      "Role":["value['user']['groups'][0]","none"]}
      const trSelect = {"Role":["accountant","manager","receptionist","staff","admin"]}
      const page_permissions = ["delete"]

    //Get Role
    useEffect(() => {
      const getRoleData = async() => {
        setLoading(true)
        if (localStorage.getItem("logintoken")) {
          const property = localStorage.getItem("property")
          const token = (JSON.parse(localStorage.getItem("logintoken")))
          const api = (`${url}permission_pages/${property}/`);
          let data = await fetch(api, {
            method: 'GET',
            headers: {
              'content-type': "application/json",
              'Authorization': "Bearer " + token['token']
            },
          })
          let parsedata = await data.json()
          setUsers(parsedata.employe_data)
          console.log(parsedata.employe_data)
          setLoading(false);
      }
      }
      getRoleData();
    }, [url])

    const buttonType = (button,value) =>{
      if(button === "delete"){
        handleDelete(value.id)
      }
    }
  
    //Assign Role
    const handleRole = (e, username) => {
      const role = (e.target.value)
      const roleData = {option: "send_role", select: "employee", username: username.user.username, role: role}
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
          body: JSON.stringify(roleData)
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

//Select role to assign
return( loading ? <Loading/> :
    <>
<Tables data={users}  input={true} trSelect={trSelect} thSelectFun={handleRole} title={title} buttonType={buttonType}  page={"RoleTable"} permissions={page_permissions} button={{'delete':'none'}} />
  </>
  )
}

export default adminLayout(RoleTable);