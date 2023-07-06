import React, { useState, useEffect } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import adminLayout from "../hoc/adminLayout";
import { useForm } from "react-hook-form";
import '../assets/css/role.css'

const RoleTest = () => {
  const permissionArr = [
    {
      id: 1,
      heading: "Service",
      subheading: ['service']
    },
    {
      id: 2,
      heading: "Options",
      subheading: ['employees', 'checkin']
    },
    {
      id: 3,
      heading: "Rooms",
      subheading: ['rooms', 'bookings', 'room_services', 'arrivals', 'departures', 'rates']
    },
    {
      id: 4,
      heading: "Reservation",
      subheading: ['make_reservation']
    },
    {
      id: 5,
      heading: "Reports",
      subheading: ['payment_report']
    },
  ]
  const dict = {
    'service': [], 'room_services': [], 'employees': [], 'checkin': [], 'rooms': [], 'bookings': [], 'room_services': [],
    'arrivals': [], 'departures': [], 'rates': [], 'make_reservation': [], 'payment_report': []
  }
  const [message, setMessage] = useState('');

  //-------------------------roles get -------------------------------

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      update()
    }
  })


  const update_background = () =>{
    let condition_check = {}
    permissionArr.map((item) => (
      condition_check[item] = false ,
      item.subheading.map((subhead) => {
          
        if (document.getElementById(`${subhead}`) !== null) {
          console.log("JJJJ", item.heading)
        console.log(subhead)
          if (document.getElementById(`${subhead}`).checked === true) {
            condition_check[item] = true    
          } 
          
        }
        if (condition_check[item] === true){
          document.getElementById(`${item.heading}`).style.background = "rgba(0, 230, 64,0.5)"
        }
        else{
          document.getElementById(`${item.heading}`).style.background = "white"
        }
      })
    ))
  }

  const update = async () => {
    const roleName = document.getElementById('roles');

    console.log(":::::::", roleName.value)
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

      if (localStorage.getItem("logintoken")) {

        let property = localStorage.getItem("property")
        const token = (JSON.parse(localStorage.getItem("logintoken")))
        const url = `http://127.0.0.1:8000/permission_pages/${property}/${roleName_val}/`;
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
        console.log("lll", get_permissiondata)
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


  //--------------------------- scripting start------------------------
  const handlePermissionButton = async () => {
    let pageName
    const roleName = document.getElementById('roles');
    const role = roleName.value;

    console.log(dict)
    let condition = Object.keys(dict);
    let objLength = Object.keys(dict).length;
    for (let v = 0; v < objLength; v++) {
      let count = document.getElementById(`${condition[v]}_A`).childElementCount;
      let parant = document.getElementById(`${condition[v]}`);
      if (parant.checked) {
        for (let i = 0; i < count - 1; i++) {
          let a = document.getElementById(`${condition[v]}_${i}`)
          console.log(a)
          if (a.checked) {
            console.log("Checked", a.checked);
            console.log(`${condition[v]}`)
            dict[`${condition[v]}`].push(a.value)
          }
        }
      }
      else {
        delete dict[`${condition[v]}`]
      }
      pageName = JSON.stringify(dict);
    }

    if (localStorage.getItem("data")) {
      const token = (JSON.parse(localStorage.getItem("data")))
      const url = `https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/permission_pages/${role}/`;
      const data = await fetch(url, {
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
      console.log(report_data);
      setMessage(report_data.msg);
    }
  }
  //--------------------------- scripting end ------------------------
  //Mother Accordion
  const [disable, setDisable] = useState(false);
  const parant_check = (e) => {
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
            <label><input type="checkbox" onChange={parant_check} id={item} className="subOption" value="view" /> view</label>
            <label><input type="checkbox" id={item + '_0'} onChange={change} className="subOption" value="edit" /> edit</label>
            <label><input type="checkbox" id={item + '_1'} onChange={change} className="subOption" value="delete" /> delete</label>
            <label><input type="checkbox" id={item + '_2'} onChange={change} className="subOption" value="view" /> send</label>
          </div>
        </div>
      </>
    )
  }
  return (
    <section>
      {message && <p>{message}</p>}
      <div style={{ display: 'grid', placeItems: 'center', paddingBottom: "30px" }}>
        <Form.Select aria-label="Default select example" onChange={update} name="roles" id="roles" className="w-25">
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
            permissionArr.map((item) => (
              <PermissionAccordionMain key={item.id} title={item.heading} subtitle={item.subheading} />
            ))
          }
        </Accordion>
        <div>
          <button onClick={handlePermissionButton} className="btn btn-primary">Add Permission</button>
        </div>
      </div>
    </section>
  );
};
export default adminLayout(RoleTest);