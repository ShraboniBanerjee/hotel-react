import React, {useEffect, useState } from "react";
import adminLayout from "../../hoc/adminLayout";
import Loading from "../../images/Loading";
import Tables from "../Constants/Tables";

const Checkin = ({ url }) => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const title = {'Email':['email', 'email'],'Check-In':["checkin_date", 'date'],"Check-Out":["checkout_date", 'date'],
  "Room Number":["room", "number"], "Booking Id": ["booking", "number"], "Status": ["status", "select"]};
  const addTime = {"checkin_date":"checkin_time","checkout_date":"checkout_time"}
  const headingSelect = {"Status": ['Checked-in', "Checked-out"]};
  const trSelect = {"Status": ['Checked-in', "Checked-out"]};

useEffect(() => {
  const getDateData = async() => {
    setLoading(true)
    if (localStorage.getItem("logintoken")) {
      const property = localStorage.getItem("property");
      const token = JSON.parse(localStorage.getItem("logintoken"));
      const api = `${url}checkin_details/${property}`;
      
      await fetch(api, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token["token"],
        },
        body: JSON.stringify({})
      })
        .then((res) => res.json())
        .then((data) => {
          if(data?.data){
            // console.log(data?.data);
            setBookingsData(data?.data);
            setLoading(false);
          }
        });   
    }
  }
  getDateData()
},[url])


const handleRole = async(e, value) => {

  let changeStatus = e.target.value;
  if(changeStatus === "Checked-in"){
    changeStatus = "make_checkin"
  }
  else if(changeStatus === "Checked-out"){
    changeStatus = "make_checkout"
  }

  if (localStorage.getItem("logintoken")) {
    const property = localStorage.getItem("property");
    const token = JSON.parse(localStorage.getItem("logintoken"));
    const api = `${url}desk/${property}/chk/${changeStatus}`;
    await fetch(api, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token["token"],
      },
      body: JSON.stringify({"booking_id": value.booking}),
    })
      .then((res) => res.json())
      .then((data) => {
      
      });
  }
}

  return (
    <div>
{
  loading ? <Loading/> 
  :
  <Tables data={bookingsData} addTime={addTime} input={true} trSelect={trSelect} select_val={headingSelect} thSelectFun={handleRole} title={title}
  page={"Chekin out"} />
}
    </div>
  );
};  

export default adminLayout(Checkin);
