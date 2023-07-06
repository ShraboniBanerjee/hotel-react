import React, { useState, useEffect } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import adminLayout from "../../hoc/adminLayout";
import SidebarData from '../Constants/SidebarData';
import { useNavigate } from "react-router-dom";
import AlertDismissible from '../Common_Fun/AlertDismissible';

const PermissionAssignAndEdit = ({ url }) => {
  const apiBaseUrl = url;
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [modal,setModal] = useState('none')
  const [model_type,setModel_type] = useState('')

  const dict = {}

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      SidebarData.map((option_data)=>{
        option_data.subheading.map((sub_option)=>{
            dict[sub_option] = []
        })
      })
      getData()
    }
  })
  
const msgFun =() =>{
  setMessage('')
}
  
  //Update accordion background color based on view checked
  const update_background = () => {
    let condition_check = {}
    SidebarData.map((item) => (
    
      condition_check[item] = false,
      item.subheading.map((subhead) => {
        if (document.getElementById(`${subhead}`) !== null) {
          if (document.getElementById(`${subhead}`).checked === true) {
            condition_check[item] = true
          }
        }
        if (condition_check[item] === true) {
          document.getElementById(`${item.heading}`).style.background = "#A6D4FF"
        }
        else {
          document.getElementById(`${item.heading}`).style.background = "white"
        }
      })
    ))
  }

  
  //------------------------>>>>>>> GET Permission Data <<<<<<<-----------------------
  const getData = async () => {
    const roleName = document.getElementById('roles');
    if (roleName !== undefined) {
      const roleName_val = roleName.value
      for (let page in dict) {
        let mypage = document.getElementById(page)
       
        mypage.checked = false
        if (!mypage.checked) {
          document.getElementById(`${page}_0`).checked = false
          document.getElementById(`${page}_1`).checked = false
          document.getElementById(`${page}_2`).checked = false
          document.getElementById(`${page}_0`).disabled = true
          document.getElementById(`${page}_1`).disabled = true
          document.getElementById(`${page}_2`).disabled = true
        }
      }
      //--------->>> GET API <<<----------
      if (localStorage.getItem("logintoken")) {
        let property = localStorage.getItem("property")
        const token = (JSON.parse(localStorage.getItem("logintoken")))
        const url = `${apiBaseUrl}permission_pages/${property}/${roleName_val}/`;
        const data = await fetch(url, {
          method: 'GET',
          headers: {
            'content-type': "application/json",
            'Authorization': "Bearer " + token['token']
          },
        })
        const permission_data = await data.json();
        let data_key = 0
        for (let key in permission_data.user_permissions) {
          data_key = key
        }
        const get_permissiondata = JSON.parse(permission_data.user_permissions[data_key].authentication)
        for (let key in get_permissiondata) {
          let page_permission = get_permissiondata[key]
          if (document.getElementById(`${key}_0`) !== null) {
            document.getElementById(`${key}`).checked = true
            if (document.getElementById(`${key}`).checked == true) {
              let edit = document.getElementById(`${key}_0`)
              let data_delete = document.getElementById(`${key}_1`)
              let send = document.getElementById(`${key}_2`)
              edit.disabled = false
              data_delete.disabled = false
              send.disabled = false
              if (page_permission.includes("edit")) {
                edit.checked = true
              
              }
              if (page_permission.includes("delete")) {
                data_delete.checked = true
              }
              if (page_permission.includes("send")) {
                send.checked = true
              }
            }
          }
        }
      }
    }
    update_background()
  }

  //------------------------>>>>>>> UPDATE Permission Data <<<<<<<-----------------------
  const handlePermissionButton = async () => {
    let pageName
    const roleName = document.getElementById('roles');
    const role = roleName.value;

    let condition = Object.keys(dict);
    let objLength = Object.keys(dict).length;
    for (let v = 0; v < objLength; v++) {
      let count = document.getElementById(`${condition[v]}_A`).childElementCount;
      let parant = document.getElementById(`${condition[v]}`);
      if (parant.checked) {
        for (let i = 0; i < count-1 ; i++) {
          console.log(`${condition[v]}_${i}`)
          let a = document.getElementById(`${condition[v]}_${i}`)
        
        if(a !== null){
          if (a.checked) {
            dict[`${condition[v]}`].push(a.value)
          }
        }
        }
      }
      else {
        delete dict[`${condition[v]}`]
      }
   //   console.log("pageName:", pageName);
      pageName = JSON.stringify(dict);
      
    }

    //--------->>> Update API <<<----------
    if (localStorage.getItem("logintoken")) {
      let property = localStorage.getItem("property")
      const token = (JSON.parse(localStorage.getItem("logintoken")))
      const api = `${apiBaseUrl}permission_pages/${property}/${role}/`;
      const data = await fetch(api, {
        method: 'PUT',
        headers: {
          'content-type': "application/json",
          'Authorization': "Bearer " + token['token']
        },
        body: JSON.stringify({
          permmsion_page: `${pageName}`,
        }),
      })
      const report_data = await data.json();
      setMessage(report_data.msg);
      setTimeout(() => {
        setMessage("");
        navigate(0);
      }, 3000);

    }
  }


  //view checkbox handler
  const view_check = (e) => {
    update_background()
    let id = e.target.id
    if (document.getElementById(`${id}`).checked === true) {
      document.getElementById(`${id}_0`).disabled = false
      document.getElementById(`${id}_1`).disabled = false
      document.getElementById(`${id}_2`).disabled = false
    }
    else {
      document.getElementById(`${id}_0`).disabled = true
      document.getElementById(`${id}_1`).disabled = true
      document.getElementById(`${id}_2`).disabled = true
      document.getElementById(`${id}_0`).checked = false
      document.getElementById(`${id}_1`).checked = false
      document.getElementById(`${id}_2`).checked = false
    }
  }

  const change = (e) => {
    let id = e.target.id
    const condition_check = document.getElementById(`${id}`)
    if (condition_check.checked === false) {
      condition_check.checked = false
    }
    else {
      condition_check.checked = true
    }

  }

  const SelectRole = ({ roleName }) => (
    <option value={roleName}>{roleName}</option>
  )
  const PermissionAccordionMain = ({ title, subtitle }) => {
    return (
      <>
        {/* Mother Accordion*/}
        <Accordion >
          <Accordion.Item eventKey="0">
            <Accordion.Button id={title}>{title}</Accordion.Button>
            <Accordion.Body >
              {
                subtitle.map((item) => {
                  return <>
                    <PermissionAccordionChild item={item} />
                  </>
                })
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* Mother Accordion*/}
      </>
    )
  }
  //Child Accordion
  const PermissionAccordionChild = ({ item }) => {
    if (document.getElementById(`${item}`) !== null) {
      if (document.getElementById(`${item}`).checked === false) {
        document.getElementById(`${item}_0`).checked = false
        document.getElementById(`${item}_1`).checked = false
        document.getElementById(`${item}_2`).checked = false
      }
    }

    return (
      <>
        <div className='d-flex justify-content-center align-items-center gap-4'>
          <div>
            <b>{item}</b>
          </div>
          <div id={item + '_A'} className='d-flex justify-content-center align-items-center gap-2 p-2'>
            <label><input type="checkbox" onChange={view_check} id={item} className="subOption mycheckbox" value="view" /> view</label>
            <label><input type="checkbox" id={item + '_0'} onChange={change} className="subOption" value="edit" /> edit</label>
            <label><input type="checkbox" id={item + '_1'} onChange={change} className="subOption" value="delete" /> delete</label>
            <label><input type="checkbox" id={item + '_2'} onChange={change} className="subOption" value="send" /> send</label>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <section>
        
        {message && <AlertDismissible msgFun={msgFun} time={6} type={"success"} msg={message}/>}
        <div style={{ display: 'grid', placeItems: 'center', paddingBottom: "30px" }}>
          <Form.Select aria-label="Default select example" onChange={getData} name="roles" id="roles" className="w-25">
            <SelectRole roleName="admin" />
            <SelectRole roleName="manager" />
            <SelectRole roleName="property owners" />
            <SelectRole roleName="accountant" />
            <SelectRole roleName="receptionist" />
            <SelectRole roleName="staff" />
            <SelectRole roleName="guest" />
          </Form.Select>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
          <Accordion className="w-100">
            {
              SidebarData.map((item) => (
                <PermissionAccordionMain key={item.id} title={item.heading} subtitle={item.subheading} />
              ))
            }
          </Accordion>
          <div>
            {/* <input type="button" onClick={model_select('option')} value="Add Option" className='btn btn-primary mx-2' /> */}
            <button onClick={handlePermissionButton} style={{background: "#47ADFF", color: "#FFF"}} className="btn px-5">Add Permission</button>
            {/* <input type="button" onClick={model_select('sub_option')} value="Add Sub-Option" className='btn btn-primary' /> */}
          </div>
        </div>
      </section>
      
    </>
  );

};
export default adminLayout(PermissionAssignAndEdit);
