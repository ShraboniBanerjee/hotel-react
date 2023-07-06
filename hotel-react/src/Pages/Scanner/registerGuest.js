import React, {useState} from "react";
import adminLayout from "../../hoc/adminLayout";
import { Button, Form, Table } from "react-bootstrap";
import './doc_scanner.css'


function NewGuest({existing}){
  if (existing){
    return (
      null
    )
  }
    return (
        <div>
            <datalist id="genders">
              <option>Volvo</option>
              <option>Saab</option>
              <option>Mercedes</option>
              <option>Audi</option>
            </datalist>

          <div class="row padded">
            <div class="col-sm-4">Date Of Birth <div><input type="date" class="form-control top_pad"></input></div></div>
            <div class="col-sm-3">Select Gender <div><select name="gender" class="form-control top_pad">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
            </select>
            </div></div>
            <div class="col-sm-4">Tax ID Number <div><input type="text" class="form-control top_pad"></input></div></div>
          </div>
          <div class="row padded">
            <div class="col-sm-6">
                <div>
                    Address
                    <input type="text" style={{"height": "80px"}} class="form-control top_pad"></input>
                </div>
                <div class="top_pad">
                    Alternate Address
                    <input type="text" style={{"height": "80px"}} class="form-control top-pad"></input>
                </div>
            </div>
            <div class="col-sm-1"></div>
            <div class="col-sm-4">
              <div>Country<input type="text" class="form-control top_pad"></input></div>
              <div class="top_pad">State<input type="text" class="form-control top_pad"></input></div>
              <div class="top_pad">City<input type="text" class="form-control top_pad"></input></div>
            </div>
          </div>
        </div>
      )
}

export default NewGuest