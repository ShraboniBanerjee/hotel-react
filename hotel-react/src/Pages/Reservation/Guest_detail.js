import React, { Component } from 'react'
import "../../assets/css/rates.css"
import "../../assets/css/form_x.css"
import '../../assets/css/form_x.css'
import user from '../../assets/images/user.png'
import upload from '../../assets/images/upload.png'
import sign from '../../assets/images/sign.jpg'
import signature from '../../assets/images/signature.png'
import folder from '../../assets/images/folder.png'


class Guest_detail extends Component {
  constructor(props) {
    super(props);
    let urllink = this.props.url
    let check_in = this.props.check_in
    let check_out = this.props.check_out
    this.state = {
      search_url:urllink,
      message_new : '',
      currentRoomId: 0,
      option: [],
      rooms: [],
      check_in: check_in,
      check_out: check_out,
      room_rate: [],
      days: [],
      rates: {},
      pay: [],
      diff: 0,
      select_roomtype: '',
      base_rate_val: '',
      total_day: 0,
      fun_count: 0,
      check_id: [],
      option_show: 'optionA',
      select_total_id: [],
      calculates: {},
      room_values: {},
      all_values: [],
      replace_value: "",
      file_val: "val",
      total_val: {},
      input_condition: "no",
      vals_id: 0,
      hidden_mode: "off",
      child: {},
      adult: {},
      First_name: '',
      last_name: '',
      email: '',
      phone: '',
      phone2: '',
      dob: '',
      gender: 'male',
      taxid: '',
      address: '',
      address2: '',
      city: '',
      country: '',
      state: '',
      doctype: 'driving license',
      zip_code: '',
      doc_number: '',
      doc_issue_date: '',
      doc_issue_country: 'India',
      doc_exp_date: '',
      doc_img: '',
      doc_signature: '',
      img: '',
      enter_username: '',

      user_info: [],
      guest_info: [],
      number_room: 0,
      guest_msg: "",
      user_name: '',
      newemail: '',
      option_backend: 'done',
      show_details: [],
      guest_username: '',
      show_room_no: [],
      len_of_roomno: [],
      room_type_select: [],
      grand_total: 0,
      advance:0,
      return_msg:"",
      todayDate:  new Date().toISOString().slice(0, 10),
      page_load:true,
      page_permission:'',
      isRoomData: false
    }
  }
  error(parsedata) {
    if (parsedata.msg === "error") {
      localStorage.removeItem("logintoken")
      window.location.href = "/login";
    }
  }

  fill_data = (guest_data) => {

    guest_data.user_info.map((users) => {
      this.setState({ First_name: users.first_name })
      this.setState({ last_name: users.last_name })
      this.setState({ email: users.email })
    })
    guest_data.guest_info.map((guest) => {
      this.setState({ phone: guest.phoneNumber })
      this.setState({ phone2: guest.phoneNumber2 })
      this.setState({ dob: guest.guest_dob })
      this.setState({ gender: guest.guest_gender })
      this.setState({ taxid: guest.taxId })
      this.setState({ address: guest.address_1 })
      this.setState({ address2: guest.address_2 })
      this.setState({ city: guest.guest_city })
      this.setState({ country: guest.guest_country })
      this.setState({ state: guest.state })
      this.setState({ doctype: guest.doctype })
      this.setState({ zip_code: guest.guest_zip_code })
      this.setState({ doc_number: guest.doc_number })
      this.setState({ doc_issue_date: guest.guest_doc_issue_date })
      this.setState({ doc_issue_country: guest.doc_issue_country })
      this.setState({ doc_exp_date: guest.doc_exp_date })
    })
  }

  guestSubmit = async (e) => {
    e.preventDefault()
    let room_all_values = JSON.stringify(this.props.room_values)
    let calculation = JSON.stringify(this.props.calculates)
    let num_child = JSON.stringify(this.props.child)
    let num_adults = JSON.stringify(this.props.adult)
    let formData = new FormData();
    let choice = 'guest'
    let emails = this.state.email
    let username = this.state.guest_username



    if (this.state.option_backend === "add_on") {
      choice = "update_form"
      emails = this.state.newemail
      username = this.state.enter_username
    }

    formData.append('option', choice)
    formData.append('username', username)
    formData.append('check_in', this.props.check_in)
    formData.append('check_out', this.props.check_out)
    formData.append('first_name ', this.state.First_name)
    formData.append('last_name ', this.state.last_name)
    formData.append('email ', emails)
    formData.append('phone ', this.state.phone)
    formData.append('phone2 ', this.state.phone2)
    formData.append('dob ', this.state.dob)
    formData.append('gender ', this.state.gender)
    formData.append('taxId ', this.state.taxid)
    formData.append('addres_1 ', this.state.address)
    formData.append('addres_2 ', this.state.address2)
    formData.append('city ', this.state.city)
    formData.append('country ', this.state.country)
    formData.append('state ', this.state.state)
    formData.append('doctype ', this.state.doctype)
    formData.append('zip_code ', this.state.zip_code)
    formData.append('doc_number ', this.state.doc_number)
    formData.append('doc_issue_date ', this.state.doc_issue_date)
    formData.append('doc_issue_country ', this.state.doc_issue_country)
    formData.append('doc_exp_date ', this.state.doc_exp_date)
    formData.append('doc_image ', e.target.doc_image.files[0])
    formData.append('signature ', e.target.signature.files[0])
    formData.append('image ', e.target.image.files[0])
    formData.append('room_values', room_all_values)
    formData.append('calulation', calculation)
    formData.append('num_child', num_child)
    formData.append('num_adults', num_adults)


  
    this.setState({ myroom_type: e.target.value })
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/roomtype-rates/"
    let url = this.state.search_url
    console.log("-----yha aaya")
    console.log("url: ", url)

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + a['token']
      },
      body: formData

    })
    let guest_data = await data.json()
    
    this.error(guest_data)
    console.log("guest_data", guest_data);
    this.setState({ return_msg: guest_data.msg })
    if (guest_data.msg === 'Guest Account Created Successfully' || guest_data.msg === 'Guest Account Updated Successfully') {
      document.getElementById('guests').style.display = "none"

    }

    if (guest_data.msg != 'Guest Account Created Successfully') {
      this.setState({ message_new: guest_data.msg })
      setTimeout(() => {
        this.setState({ message_new: '' })
      }, 9000);
    }

    else {
      this.props.data(guest_data,username)
      console.log('---',this.state.email)
      this.setState({ loading: false })
      this.setState({ user_info: guest_data.user_info })
      this.setState({ guest_info: guest_data.guest_info })
      this.setState({ number_room: guest_data.number_room })
      this.setState({ guest_msg: guest_data.msg })
      this.setState({ guest_username: guest_data.username })
      // let check_in = this.state.check_in
      let check_out = this.state.check_out
      document.getElementById("addon-tab").click()
    }
  }


  option_a = () => {
    this.setState({ option_show: 'optionA' })
  }

  option_b = () => {
    this.setState({ option_show: 'optionB' })
  }

  loadFile = (event) => {
    var output = document.getElementById('img');
    this.setState({ img: event.target.value })
    output.src = URL.createObjectURL(event.target.files[0]);
    upload = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  loadFile_1 = (event) => {
    var output_1 = document.getElementById('img_1');
    upload = URL.createObjectURL(event.target.files[0]);
    output_1.src = URL.createObjectURL(event.target.files[0]);
    this.setState({ doc_signature: event.target.value })
    output_1.onload = function () {
      URL.revokeObjectURL(output_1.src) // free memory
    }
  };

  loadFile_2 = (event) => {
    this.setState({ doc_img: event.target.value })
    if (event.target.value === "") {
      this.setState({ file_val: "full" })
    }
    else {
      this.setState({ file_val: "empty" })
    }
  }


  user_name = async () => {
    let username = this.state.enter_username
    let room_all_values = JSON.stringify(this.props.room_values)
    let calculation = JSON.stringify(this.props.calculates)
    let num_child = JSON.stringify(this.props.num_child)
    let num_adults = JSON.stringify(this.props.num_adults)

  
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.search_url

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: "have_email",
        email: username,
        check_in: this.props.check_in,
        check_out: this.props.check_out,
        room_values: room_all_values,
        num_child: num_child,
        num_adults: num_adults,

      }),

    })
    let guest_data = await data.json()
    this.error(guest_data)
    console.log(username)
    this.props.data(guest_data,username)
    this.setState({ loading: false })
    this.setState({ user_info: guest_data.user_info })
    this.setState({ guest_info: guest_data.guest_info })
    this.setState({ number_room: guest_data.number_room })
    this.setState({ guest_msg: guest_data.msg })
    this.setState({ option_backend: guest_data.option })
    this.setState({ show_details: guest_data.details })
    this.setState({ guest_username: guest_data.username })
    if (guest_data.option === "add_on") {
      console.log("click nhi ho rha??")
      this.setState({ option_show: "optionA" })
      this.fill_data(guest_data)

    }else{
      document.getElementById("addon-tab").click()
    }
  }

  render() {
    return (
      <div>  
        {this.state.message_new !== '' && <div class="alert alert-warning alert-dismissible fade show" role="alert"><b>{this.state.message_new}</b></div>}
            <div className="ma-5 container mt-3">
              <div className="btn-group d-flex justify-content-center align-items-center">
                <button id="btn-a" onClick={this.option_a} className="btn-a1">New User</button>
                <button id="btn-b" className="btn-b" onClick={this.option_b}>Already have Account</button>
              </div>
            </div>
            {/* --------------------------start---------------------------------- */}

            {this.state.option_show === "optionA" &&
              <form onSubmit={this.guestSubmit} encType="multipart/form-data">
                <div className="row option-a mt-5" >
                  <div className="col-3"><img className="img_reserve" src={user} id="img" alt="" /><br />
                    <div className="col mt-3">
                      <label for="id_image" className="upload"><img className="img_1_reserve" src={upload} id="new" alt="" /><span className="leb">Upload Profile</span></label>
                      <input type="file" value={this.state.img} name="image" style={{ display: "none" }} accept="image/*" onChange={this.loadFile} required id="id_image" />
                    </div>
                  </div>

                  <div className="col-6">
                    {this.state.option_backend !== "add_on" ? (<>
                      <div className="row mt-3">
                        <div className="col-2"><label for="fname" className='required'>First Name</label></div>
                        <div className="col-8"><input onChange={(e) => { this.setState({ First_name: e.target.value }) }} value={this.state.First_name} type="text" className="form_in" id="addres_1" name="first_name" placeholder="enter first name" required /></div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname" className='required'>Last Name</label></div>
                        <div className="col-8"><input type="text" onChange={(e) => { this.setState({ last_name: e.target.value }) }} value={this.state.last_name} className="form_in" id="addres_1" name="last_name" placeholder="enter last name" required /></div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="email" className='required'>Email</label></div>
                        <div className="col-8"><input type="email" onChange={(e) => { this.setState({ email: e.target.value }) }} value={this.state.email} className="form_in" id="addres_1" name="email" placeholder="name@example.com" required /></div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-2"><label for="lname" className='required'>Phone</label></div>
                        <div className="col-8"><input className="form_in" onChange={(e) => { this.setState({ phone: e.target.value }) }} value={this.state.phone} type="number" id="phone" name="phone" placeholder="123-45-678" required /></div>
                      </div>
                      {/* pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" */}
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone number2</label></div>
                        <div className="col-8"><input className="form_in" onChange={(e) => { this.setState({ phone2: e.target.value }) }} value={this.state.phone2} type="number" id="phone" name="phone2" placeholder="123-45-678" /></div>
                      </div>
                    </>) : (<>
                      <div className="row mt-3">
                        <div className="col-2"><label for="fname">First Name!!!!!!!!!</label></div>
                        <div className="col-8">{this.state.First_name}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Last Name !!!!!!</label></div>
                        <div className="col-8">{this.state.last_name}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="email">Email address !!!!!!!!</label></div>
                        <div className="col-8">{this.state.email}</div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone</label></div>
                        <div className="col-8">{this.state.phone}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-2"><label for="lname">Phone number2</label></div>
                        <div className="col-8">{this.state.phone2}</div>
                      </div>
                    </>)}
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob" className='required'>Date Of Birth</label></div>
                      <div className="col-8"><input type="date" onChange={(e) => { this.setState({ dob: e.target.value }) }} value={this.state.dob} className="form_in" id="dob" name="dob" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="gender" className='required'>Select Gender</label></div>
                      <div className="col-8">
                        <select name="gender" style={{ color: 'black' }} onChange={(e) => { this.setState({ gender: e.target.value }) }} value={this.state.gender} className="form_in" required>
                          <option value="male">male</option>
                          <option value="female">female</option>
                          <option value="transgender">transgender </option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="lname" className='required'>Tax Id Number</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ taxid: e.target.value }) }} value={this.state.taxid} className="form_in" type="number" id="tax_id" placeholder="Tax Id number" name="taxId" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob" className='required'>Address</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ address: e.target.value }) }} value={this.state.address} type="text" className="form_in" id="addres_1" name="addres_1" placeholder="Address" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">Address2</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ address2: e.target.value }) }} value={this.state.address2} type="text" className="form_in" id="addres_2" name="addres_2" placeholder="Address 2" /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob" className='required'>City</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ city: e.target.value }) }} value={this.state.city} type="text" className="form_in" id="city" name="city" placeholder="city" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob" className='required'>Country</label></div>
                      <div className="col-8"><input onChange={(e) => { this.setState({ country: e.target.value }) }} value={this.state.country} type="text" className="form_in" id="country" name="country" placeholder="country" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob" className='required'>State</label></div>
                      <div className="col-8"><input type="text" onChange={(e) => { this.setState({ state: e.target.value }) }} value={this.state.state} className="form_in" id="state" name="state" placeholder="state" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob">zip code</label></div>
                      <div className="col-8"><input type="number" onChange={(e) => { this.setState({ zip_code: e.target.value }) }} value={this.state.zip_code} className="form_in" id="zip_code" name="zip_code" placeholder="Zip Code" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="dob" className='required'>Doc Type</label></div>
                      <div className="col-8">
                        <select style={{ color: 'black' }} onChange={(e) => { this.setState({ doctype: e.target.value }) }} value={this.state.doctype} name="doctype" className="form_in" required>
                          <option value="driving license">driving license</option>
                          <option value="passport">passport</option>
                          <option value="identity card">identity card</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_number" className='required'>Document Number</label></div>
                      <div className="col-8"><input type="number" onChange={(e) => { this.setState({ doc_number: e.target.value }) }} value={this.state.doc_number} className="form_in" id="doc_number" name="doc_number" placeholder="Doc Number"  /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_num" className='required'>Doc Issue Date</label></div>
                      <div className="col-8"><input type="date" onChange={(e) => { this.setState({ doc_issue_date: e.target.value }) }} value={this.state.doc_issue_date} className="form_in" id="doc_issue_date" name="doc_issue_date" required /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_num" className='required'>Doc Issue Country</label></div><br />
                      <div className="col-8">
                        <select style={{ color: 'black' }} name="doc_issue_country" onChange={(e) => { this.setState({ doc_issue_country: e.target.value }) }} value={this.state.doc_issue_country} className="form_in minimal" required>
                          <option value="driving license">India</option>
                          <option value="U.S.">U.S.</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-2"><label for="doc_num" className='required'>Doc Expire date</label></div>
                      <div className="col-8"><input type="date" onChange={(e) => { this.setState({ doc_exp_date: e.target.value }) }} value={this.state.doc_exp_date} className="form_in" id="doc_exp_date" name="doc_exp_date" required /></div>
                    </div>
                  </div>

                  <div className="col-3">
                    <img className="img_reserve" src={sign} id="img_1" alt="" /><br />
                    <div className="col mt-3">
                      <label for="id_signature" className="upload"><img className="img_1_reserve" src={signature} id="img" alt="" /><span className="leb">Upload Signature</span></label>
                      <input type="file" value={this.state.doc_signature} style={{ display: "none" }} name="signature" accept="image" onChange={this.loadFile_1} id="id_signature" /></div>
                    <div className="col mt-3">
                      <label for="id_image1" className="upload"><img className="img_1_reserve" src={folder} id="img_2" alt="" /><span className="leb">Upload Docs</span></label>
                      <input type="file" value={this.state.doc_img} style={{ display: "none" }} name="doc_image" className="fl_btn" onChange={this.loadFile_2} required id="id_image1" /></div>

                    {this.state.file_val !== "empty" && <p className='text-center'>no files selected</p>}

                  </div>
                  <div className='py-4 d-flex justify-content-center align-items-center'>
                  <button type="submit" name="register_form" className="btn btn-primary w-50">Submit</button>
                  </div>
                </div>

              </form>}

            {this.state.option_show === "optionB" &&

              <div className="container option-b">
                <label className="username mt-4" for="user">Enter Email Address</label><br />
                <input type="email" value={this.state.enter_username} onChange={(e) => { this.setState({ enter_username: e.target.value }) }} className="form_in mb-4" name="user" id="" required /><br />
                <button type="btn" onClick={this.user_name} name="have_form" className="btn btn-blue mb-4">Submit</button>
              </div>
            }

            {/* --------------------------end---------------------------------------- */}


          </div>
    
    );
  }
}

export default Guest_detail;