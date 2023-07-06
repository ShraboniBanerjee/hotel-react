import React, {useState} from "react";
import adminLayout from "../../hoc/adminLayout";
import { Button, Form, Table } from "react-bootstrap";
import './doc_scanner.css'
import "./style.css"
import GuestDetails from "./newGuest";
import Docs from "./Docs";


function Scanner({url}){
    let fields = {
      '_DateOfScan': {"name": "Date Of Scan", "value": ""}, 'FullName' :{"name": "Full Name", "value": ""},
      'FirstName':{"name": "First Name", "value": ""}, 'FirstNameShort':{"name": "First Name Short", "value": ""}, 'LastName':{"name": "Last Name", "value": ""},
      'Gender':{"name": "Gender", "value": ""}, 'BirthDate':{"name": "DOB", "value": ""}, 'IDNumber':{"name": "ID Number", "value": ""},
      'ExpiryDate':{"name": "Expiry Date", "value": ""}, 'IssueDate':{"name": "Issue Date", "value": ""},
      'Restrictions':{"name": "Restrictions", "value": ""},
      'ISO_A3':{"name": "3 Digit ISO code", "value": ""}, 'NationalityISO_A3':{"name": "Nationality", "value": ""},
      'PlaceOfBirth':{"name": "Place Of Birth", "value": ""}, 'CountryName_EN':{"name": "Country Name(Eng.)", "value": ""},
      'Country':{"name": "Country", "value": ""},
      'NationalityShort':{"name": "Nationality Short", "value": ""}, 'Nationality':{"name": "Nationality", "value": ""},
      'Nationality_ENG':{"name": "Nationality Eng.", "value": ""}
    }
    const [guest, setGuest] = useState(fields);
    const [images, setImages] = useState({});
    const image_fields = ['ImageDocumentFront', 'ImageFace']
    const handleStatus = async () => {
        url = "http://127.0.0.1:8000/"
        if (localStorage.getItem("logintoken")) {
          const property = localStorage.getItem("property");
          const token = JSON.parse(localStorage.getItem("logintoken"));
          console.log("property = ", property)
          console.log("token = ", token)
          const api = `${url}fake_scanner/${property}`;
          console.log("api = ", api)
          await fetch(api, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token["token"],
            },
          })
            .then((res) => res.json())
            .then((data) => {console.log("data = ", data); setValues(data)})
        }
        console.log("guest data = ", guest)
      };

      function changeGuest(e){
        console.log(e.target)
        let guest1 = guest
        guest1[e.target.id] = e.target.value
        setGuest(guest1);
      }

      async function postGuest(){
        console.log("guest in post guest  = ", guest)
        console.log("images in post guest = ", images)
        url = "http://127.0.0.1:8000/"
        if (localStorage.getItem("logintoken")) {
          const property = localStorage.getItem("property");
          const token = JSON.parse(localStorage.getItem("logintoken"));
          console.log("property = ", property)
          console.log("token = ", token)
          const api = `${url}fake_scanner/${property}`;
          console.log("api = ", api)
          await fetch(api, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token["token"],
            },
            body: JSON.stringify({"data": guest})
          })
            .then((res) => res.json())
            .then((data) => {console.log("data = ", data); setGuest(data)});
        }
      };

      function setValues(data){
        console.log("guest in set values = ", guest)
        let imageDict = {}
        let tempGuest = guest
        for (let i in data){
          let elem = document.getElementById(i)
          console.log(i, elem)

          if (elem){
            if ((i == "ImageFace") | (i=="ImageDocumentFront")){
              console.log("in block images of scan")
              imageDict[i] = data[i]
              elem.setAttribute("src", "");
            }
            else{
              elem.value = data[i]
              tempGuest[i]['value'] = data[i]
            }
          }
        }
        setGuest(tempGuest);
        setImages(imageDict);
        console.log("images in scan = ", imageDict, images)
      }
      console.log("images = ", images)

      //return (
      //  <div>
      //    <div class="row" style={{backgroundColor: "white", height: "300px"}}>
      //      <div class="col-sm-3">
      //        <img style={{width:"300px", height:"290px", padding:"10px", border: "2px solid"}} class="img-responsive" id="ImageFace" src={`data:image/png;base64, ${images["ImageFace"]}`} alt="" />
      //      </div>
      //      <div class="col-sm-7">
      //        <img style={{width:"600px", height:"290px", padding:"10px", border: "2px solid"}} class="img-responsive" id="ImageDocumentFront" src={`data:image/png;base64, ${images["ImageDocumentFront"]}`} alt="" />
      //      </div>
      //      <div class="col-sm-2" style={{height:"290px", padding:"10px", border: "2px solid"}}>
      //        <button id="get-scanner-id" class="btn-primary" style={{width: "100px", height: "50px", marginTop: "50px", marginLeft: "40px"}} onClick={handleStatus}>Scan</button>
      //        <button id="get-scanner-id" class="btn-primary" style={{width: "100px", height: "50px", marginTop: "50px", marginLeft: "40px"}} onClick={postGuest}>Save</button>
      //      </div>
      //    </div>
      //    <div>
      //      <Table bordered>
      //        <thead>
      //          <tr>
      //            <th style={{"width": "25%"}}>Fields</th>
      //            <th style={{"width": "75%"}} class="text-center">Data</th>
      //          </tr>
      //        </thead>
      //        <tbody>
      //          {Object.keys(fields).map((key, value) => {return(<tr><td>{fields[key]["name"]}</td><td class="text-center"><input type='text' id={key} style={{border: "None", height: "100%", width:"100%", textAlign:"center"}} onChange={changeGuest}/></td></tr>)})}
      //        </tbody>
      //      </Table>
      //    </div>
      //  </div>
      //)
      //return (
      //  <div style={{padding: "10px"}}>
      //    <div style={{paddingBottom: "20px"}}>
      //      <img src={require("./return-thumbnail.png")} style={{display:"inline", height:"30px", width:"30px", backgroundColor: "white"}}></img>
      //      <h2 style={{display: "inline"}} class="left-pad">Guest Details</h2>
      //    </div>
      //    <div class="row">
      //      <div class="col-sm-8">
      //        <div style={{border:"2px solid black", "border-radius": "10px"}}>
      //          <div style={{backgroundColor:"#D3D3E2"}}>
      //            <div style={{"margin-left":"10px", "border-radius": "10px"}}>Enter Your Details</div>
      //          </div>
      //          <GuestDetails existing={false}/>
      //        </div>
      //      </div>
      //    <div class='col-sm-4' style={{maxHeight:"400px", border:"2px solid black", "border-radius": "10px"}}></div>
      //    </div>
      //    <Docs />
      //    <div class="row">
      //      <div><h1 class="top_pad">Signature</h1></div>
      //      <div class="col-sm-10 padded left_pad bordered">
      //        <div class="row">
      //          <div class="col-sm-4">
      //            <img src="" style={{width: "200px", height: "200px"}}></img>
      //          </div>
      //          <div class="col-sm-7">
      //            <div class="padded dotted_bordered">
      //              
      //            </div>
      //          </div>
      //        </div>
      //      </div>
      //    </div>
      //  </div>
      //)

      return (
        <div>
        <div id="total_content" style={{marginLeft: "200px", overflow:"visible"}}>
            <div id="total_form">
                <div id="main_title">Enter Traveler Detail</div>
                <div id="details_box"></div>
                <div id="details_heading">Enter Your Details</div>
                <div id="description">We will use these details to share your booking information</div>
                <div id="info_box"></div>

                <div id="first_name_heading">First Name</div>
                <div id="first_name_box" ></div>
                <div id="first_name_text"></div>

                <div id="last_name_heading">Last Name</div>
                <div id="last_name_box" ></div>
                <div id="last_name_text"></div>

                <div id="email_heading">Email</div>
                <div id="email_box" ></div>
                <div id="email_text"></div>

                <div id="phone_heading">Phone</div>
                <div id="phone_box" ></div>
                <div id="phone_text"></div>

                <div id="dob_heading">DOB</div>
                <div id="dob_box" ></div>
                <div id="dob_text"></div>

                <div id="gender_heading">Select Gender</div>
                <div id="gender_box" ></div>
                <div id="gender_text"></div>

                <div id="tax_id_heading">Tax ID Number</div>
                <div id="tax_id_box" ></div>
                <div id="tax_id_text"></div>

                <div id="address_heading">Address</div>
                <div id="address_box" ></div>
                <div id="address_text"></div>

                <div id="country_heading">Country</div>
                <div id="country_box" ></div>
                <div id="country_text"></div>

                <div id="country_code_heading">Country</div>
                <div id="country_code_box" ></div>
                <div id="country_code_text"></div>

                <div id="city_heading">City</div>
                <div id="city_box"></div>
                <div id="city_text"></div>

                <div id="state_heading">State</div>
                <div id="state_box"></div>
                <div id="state_text">State</div>
                
                <div id="address2_heading">Alternate Address</div>
                <div id="address2_box" ></div>
                <div id="address2_text"></div>

                <div id="reservation_box"></div>
                <div id="room_heading">Luxury</div>
                <div id="room_image"></div>
                <div id="room_line"></div>
                <div id="room_amount">$423</div>
                <duv id="room_amount_text">Payable Amount</duv>

                <div id="all_images"></div>
                <div id="line_between"></div>
                <div id="document_title">Upload Documents</div>

                <p id="doc_text"></p>
                <div id="doc_box"></div>
                <div id="doc_text">For verification please upload digital photo of documents</div>
                <div id="profile_img"></div>
                <div id="uploaded_doc_box"></div>
                <div id="profile_img_box"></div>
                <div id="profile_img_text">Profile Photo</div>

                <div id="uploaded_doc_img"></div>
                <div id="uploaded_doc_text">Document</div>
                <div id="select_file_text">Select File</div>
                <div id="doc_name_text">Name of the Document</div>
                <div id="doc_name_box"></div>
                <div id="doc_upload_box"></div>
                <div id="doc_upload_desc">Upload</div>

                <div id="doc_number_text">Enter Document Number</div>
                <div id="doc_number_box"></div>
                
                    <img src="" id="upload_doc_button"></img>
                <div id="select_file_box"></div>
                
                <div id="sign_selected">Upload</div>
                <div id="sign_title">Upload Signature</div>
                <div id="sign_tab"></div>
                <div id="doc_upload_text">Upload</div>
                <img src="" id="fake_sign"></img>
                
                <div id="sign_header_upload">Upload</div>
                <div id="sign_header_draw">Draw</div>
                <div id="sign_header_type">Type</div>
                <div id="upload_sign_box"></div>
                
                <div id="sign_cancel">Cancel</div>
                <div id="sign_cancel_box"></div>
                <div id="upload_sign_accept_text">Accept</div>
                <div id="upload_sign_accept_box"></div>
                <div id="sign_contract">By signing this document with an electronic signature, I agree that such signature will be as valid as handwritten signatures to the extent allowed by local law.</div>
            </div>
        </div>
        </div>
      )
}

export default adminLayout(Scanner);