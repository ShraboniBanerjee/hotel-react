import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import plus from '../../assets/images/plus.png'
import minus from '../../assets/images/minus.png'
import edit from '../../assets/images/room_type_edit.png'
import Loading from '../../images/Loading';
import roomstyle from "../../assets/css/roomdetails.module.css"
import { json, useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import room_view from '../../assets/images/room_view.png'
import { Block, NetworkWifiRounded } from '@mui/icons-material';
import RoomDetails from '../Inventory/RoomDetails';
import gallery from '../../assets/images/gallery.png'
import AlertDismissible from '../Common_Fun/AlertDismissible';

function withParams(Component) {
  return props => <Component {...props} vs="eee" params={useParams()} />;
}


class Add_room extends Component {

  fileObj = [];
  fileArray = [];

  constructor(props) {

    super(props);
    let { id } = this.props.params;
    console.log("--===--", id)

    let subtitle = this.props.subtitle
    const url = new URL(window.location.href);
    console.log(url)
    const Id = url.searchParams.get("id");
    console.log(Id, "F__", this.props)
    let urllink = this.props.url
    let property = localStorage.getItem("property")
    this.state = {
      modal: 'none',
      roomtype_choice: "none",
      roomtype_option: "none",
      edit_id: id,
      room_status:["Available","UnderMaintenance","Outoforder","Occupied","O/Dirty","V/Dirty"],
      url: `${urllink}add-rooms-api/${property}/`,
      edit_url: `${urllink}rooms-api/${property}/${id}/`,
      backend_roomtype: [],
      backend_occupancy: [],
      for_roomtype: "",
      option: "",
      msgType:"danger",
      subtitle: subtitle,
      room_no: "",
      capacity: "",
      floor_no: "",
      room_type: "",
      nob: "",
      Occupancy: "",
      price: 0,
      msg: "",
      for_roomtype_price: 0,
      loading: false,
      room_type_permission: '',
      add_permission: '',
      page_load: true,
      current_img: true,
      images: [],
      unique_id: 0,
      myfile: {},
      file: [],
      room_view: '',
      facility: [],
      add_more: false,
      add_more_val: '',
      facility_modal: 'none',
      room_type_select: '',
      current_status:"",
      empty_room_type:false 
    }
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)


  }

  checkToken = () => {
    if (localStorage.getItem("logintoken")) {
      // get token and do anything
      this.setState(JSON.parse(localStorage.getItem("logintoken")))

      if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
        localStorage.removeItem("logintoken")
        window.location.href = "/login";
      }

    }
  }

  componentDidMount() {
    this.updateRates()


    this.checkToken()
    this.error = (parsedata) => {
      if (parsedata.msg === "error") {
        localStorage.removeItem("logintoken")
        window.location.href = "/login";
      }
    }
  }

  updateRates = async () => {
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    this.setState({page_load:true})
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/rates/"
    let url
    if (this.state.edit_id !== undefined) {
      url = this.state.edit_url
    }
    else {
      url = this.state.url
    }
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
    })
    let parsedata = await data.json()
    console.log("---=", parsedata)
    this.setState({ add_permission: parsedata.page_permissions })
    if (this.state.edit_id === undefined) {
      if (parsedata.page_permissions.includes('send') === false) {
        this.setState({ add_permission: "room_no" })
      }
      if (parsedata.page_permissions.includes('send') !== false || parsedata.page_permissions !== "room_no" || parsedata.room_type_permission !== "room_type_no") {
        this.setState({ page_load: false })
      }
    } else {
      if (parsedata.page_permissions.includes('edit') === false) {
        this.setState({ add_permission: "room_no" }) 
      }
      if (parsedata.page_permissions.includes('edit') !== false || parsedata.page_permissions !== "room_no" || parsedata.room_type_permission !== "room_type_no") {
        this.setState({ page_load: false })

      }
    }
    let facility_key = []
    let room_facilitys
    let key
    this.error(parsedata)
    this.setState({ loading: false })
    let facilitys_data
    if (this.state.edit_id === undefined) {
      this.setState({ room_type_permission: parsedata.room_type_permissions })
      this.setState({ backend_occupancy: parsedata.MaxOccupancy })
      this.setState({ backend_roomtype: parsedata.room_types })
      facilitys_data = parsedata.facilitys_data
      facilitys_data.map((e) => {
        room_facilitys = JSON.parse(e.facilitys_name)
        key = Object.keys(room_facilitys)
        facility_key.push(key)

      })
    }

    else {
      let new_file = []
      this.setState({ backend_occupancy: parsedata.max_occupancy })
      this.setState({ backend_roomtype: parsedata.room_type })
      parsedata.rooms.map((e) => {
        facilitys_data = e.facilitys
        this.setState({ room_no: e.number })
        this.setState({ capacity: e.capacity })
        this.setState({ nob: e.numberOfBeds })
        this.setState({ room_type_select: e.roomType })
        this.setState({ floor_no: e.floorNumber })
        this.setState({ Occupancy: e.typeroom })
        this.setState({ price: e.price })
        this.setState({current_status:e.roomStatus})

        let output_1 = document.getElementById('img_1');
        output_1.src = e.image.split("?")[0]
        for (let num = 0; num < 10; num++) {
          console.log(e[`room_image_${num + 1}`], `room_image_${num + 1}`)
          if (e[`room_image_${num + 1}`] !== null) {
            let new_img = e[`room_image_${num + 1}`].split("?")[0]
            new_file.push(new_img)
            let kkk = `mybackend_data?${new_img}`.split('?')[0]
            console.log(kkk)
          }
        }
        // new_file.push(`${e.room_image_}${i}`)
      })
      this.setState({ file: new_file })
      room_facilitys = JSON.parse(facilitys_data)
      key = Object.keys(room_facilitys)
      facility_key.push(key)

      this.setState({ file: new_file })

    }
    this.setState({ facility: room_facilitys })
    for (let i = 0; i <= key.length; i++) {
      let facilitys_data = document.getElementById(`${key[i]}`)
      if (facilitys_data !== undefined) {
        if (room_facilitys[key[i]] === 'Yes') {
          facilitys_data.checked = true
        }
        else {
          facilitys_data.checked = false
        }
      }
    }
  }

  add_more = (e) => {
    e.preventDefault()
    this.setState({ add_more: true })
    let add_more_val = this.state.add_more_val
    add_more_val = add_more_val.replaceAll(/\s/g, '')
    if (add_more_val.length > 0) {
      this.short_data()
    }
  }

  short_data = () => {
    let add_more = this.state.add_more_val
    add_more = add_more.replace(/^\s+|\s+$/gm, '')
    this.state.facility[add_more] = "Yes"
    let key
    key = Object.keys(this.state.facility)
    for (let i = 0; i <= key.length; i++) {
      let facilitys_data = document.getElementById(`${key[i]}`)
      if (facilitys_data !== undefined || facilitys_data !== null) {
        if (this.state.facility[key[i]] === 'Yes') {
          facilitys_data.checked = true
        }
        else {
          facilitys_data.checked = false
        }
      }
    }
    this.setState({ add_more_val: '' })
  }

  data_enter = (e) => {
    this.setState({ add_more: true })
    let add_more_val = this.state.add_more_val
    add_more_val = add_more_val.replaceAll(/\s/g, '')
    if (add_more_val.length > 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.short_data()
      }
    }

  }

  upload_image = async () => {
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = `${this.state.url}/2`
    let data = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': "Bearer " + a['token']
      },
      body: ({
        room_image_1: Document.getElementById('0')

      }),
    })
  }


  roomType_price = (e) => {
    let id = e.target.id
    let roomType_val = e.target.value
    if (roomType_val === "notselect") {
      if (id === "for_roomtype") {
        this.setState({ for_roomtype_price: 0 })
      }
      else {
        this.setState({ price: 0 })
      }
    }
    else {
      this.state.backend_roomtype.map((element) => {
        if (roomType_val === element.room_all_type) {
          if (id === "for_roomtype") {
            this.setState({ for_roomtype_price: element.room_rate })
          }
          else {
            this.setState({ price: element.room_rate })
          }
        }
      })
    }
  }



  types = async () => {
    this.checkToken()
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    let url = this.state.url
    let for_roomtype = document.getElementById("for_roomtype").value
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },
      body: JSON.stringify({
        option: this.state.option,
        select: "room_type",
        roomtype: for_roomtype,
        room_rate: this.state.for_roomtype_price
      }),
    })
    let room_data = await data.json()
    this.error(room_data)
    this.setState({ modal: 'none' })
    console.log("-----",room_data.msg)
    this.setState({ msg: room_data.msg })
    this.updateRates()
    setTimeout(() => {
      this.setState({ msg: '' })
    }, 1000)
  }




  add_room = async (e) => {

    e.preventDefault()
    let formData = new FormData();
    this.checkToken()
    let floor_no

    let res_img = []
    let data_send = true
    this.state.file.map(async (e, i) => {
      let img_id = document.getElementById(`room_img_${i}`)
      if (typeof (this.state.file[i]) !== "string") {
        let realWidth = img_id.naturalWidth;
        let realHeight = img_id.naturalHeight;
        if (1920 > parseInt(realWidth) && 1080 > parseInt(realHeight)) {
          res_img.push(i + 1)
          data_send = false
          console.log(realWidth, "X", realHeight)
        }
        if (2160 < parseInt(realWidth) && 3840 < parseInt(realHeight)) {
          console.log(realWidth, "X", realHeight)
          res_img.push(i + 1)
          data_send = false
        }

      }
    })
    
    if (res_img.length > 0) {
      console.log(res_img.length)
      console.log("00000----")
      let new_msg = `invalid size, please upload the image with 1080px or less then 4k , reupload these images img number ${res_img.toString()} `
      this.setState({ msg: new_msg })
    }

    if (this.state.edit_id === undefined) {
      floor_no = document.getElementById("floor_no").value
    }
    else {
      floor_no = this.state.floor_no
    }

    let room_type = document.getElementById("room_type").value
    let Occupancy = document.getElementById("Occupancy").value
    let room_status = document.getElementById("room_status").value 

    let msg

    if (this.state.edit_id === undefined) {

      if (this.state.room_view == '' || this.state.room_view === null) {
        data_send = false
        msg = 'please upload the room view image first'
        this.setState({ msg: msg })
      }
    }
    else {
      if (!this.state.current_img) {
        data_send = false
        msg = 'please upload the room view image first'
        this.setState({ msg: msg })
        let output_1 = document.getElementById('img_1')
        let realWidth = output_1.naturalWidth;
        let realHeight = output_1.naturalHeight;
        if (1920 > parseInt(realWidth) && 1080 > parseInt(realHeight)) {
          data_send = false
          msg = 'invalid size, please upload the image with 1080px or less then 4k , reupload the main image'
          this.setState({ msg: msg })
        }
        if (2160 < parseInt(realWidth) && 3840 < parseInt(realHeight)) {
          console.log(realWidth, "X", realHeight)
          data_send = false
        }
      }
    }


    if (this.state.file.length < 5 || this.state.file.length > 10) {
      data_send = false
      console.log("=----=", this.state.file.length)
      msg = 'please upload less than 10 and more then 5 images in image gallery'
      this.setState({ msg: msg })
    }


    setTimeout(() => {
      this.setState({ msg: '' })
    }, 9000);

    if (room_type === "notselect") {
      this.setState({ msg: "select roomtype before add the room" })
      setTimeout(() => {
        this.setState({ msg: '' })
      }, 6000);
    }
    else {
      if (data_send === true) {
        let facility = JSON.stringify(this.state.facility)
        formData.append('option', 'add_room')
        formData.append('select', 'add_room')
        formData.append('room_number', this.state.room_no)
        formData.append('floorNumber', floor_no)
        formData.append('capacity', this.state.capacity)
        formData.append('beds', this.state.nob)
        formData.append('roomType', room_type)
        formData.append('typeroom', Occupancy)
        formData.append('price', this.state.price)
        formData.append('roomStatus',room_status)
        if (this.state.edit_id === undefined) {
          formData.append('image', this.state.room_view)
        }
        else {
          if (!this.state.current_img) {
            formData.append('image', this.state.room_view)
          }
        }
     
        formData.append('numberOfBeds', 4)
        formData.append('facilitys', facility)

        this.state.file.map(async (e, i) => {
          let fd = this.state.file[i]
          console.log("img",i,typeof (this.state.file[i]))
          let img_id = document.getElementById(`room_img_${i}`)
          if (typeof (this.state.file[i]) !== "string") {
            formData.append(`room_image_${i+1}`, fd)
          }
        })

        let total_file = this.state.file.length
        console.log("yha aarha")
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url
        if (this.state.edit_id === undefined) {
          url = this.state.url
        }
        else {
          url = this.state.edit_url
        }
        console.log("--------===")
        let data = await fetch(url, {
          method: this.state.edit_id === undefined ? 'POST' : 'PUT',
          headers: {

            'Authorization': "Bearer " + a['token']
          },
          body: formData
        })
        let room_data = await data.json()
        console.log(room_data)
        if (this.state.edit_id === undefined && room_data.msg.includes("added successfully")){
        this.setState({ room_no: "" })
        this.setState({ capacity: "" })
        this.setState({ nob: "" })
        this.setState({ price: "" })
        this.setState({empty_room_type:true})
        } 
        if (room_data.msg === 'data edit successfully') {
          this.setState({msgType:"success"})
          this.setState({msg:room_data.msg})
          document.getElementById("room_id").click();
        }
        this.error(room_data) 
        console.log(room_data.msg)
        if(room_data.msg.includes("added successfully")){ 
        this.setState({msgType:"success"})
        this.setState({file:[]})
        this.setState({msg:room_data.msg})
        this.updateRates()
       // document.getElementById("room_add").click();
 
        }
        this.setState({ msg: room_data.msg })
      }
    }
  }

  msgFun =()=>{
    this.setState({msg:""})
  }

  addroom_type = () => {
    this.setState({ for_roomtype: "" })
    this.setState({ modal: 'block' })
    this.setState({ roomtype_choice: "add" })
    this.setState({ roomtype_option: "room_type" })
    this.setState({ option: "addtype" })
  }

  editroom_type = () => {
    console.log("hy")
    this.setState({ for_roomtype: "" })
    this.setState({ modal: 'block' })
    this.setState({ roomtype_choice: "edit" })
    this.setState({ roomtype_option: "room_type" })
    this.setState({ option: "edit_roomtype" })
  }

  delroom_type = () => {
    this.setState({ for_roomtype: "" })
    this.setState({ modal: 'block' })
    this.setState({ roomtype_choice: "delete" })
    this.setState({ roomtype_option: "room_type" })
    this.setState({ option: "delete_roomtype" })
  }

  addmax_occupancy = () => {
    this.setState({ for_roomtype: "" })
    this.setState({ modal: 'block' })
    this.setState({ roomtype_choice: "add" })
    this.setState({ roomtype_option: "max_occupancy" })
    this.setState({ option: "add_Max_Occupancy" })
  }

  delmax_occupancy = () => {
    this.setState({ for_roomtype: "" })
    this.setState({ modal: 'block' })
    this.setState({ roomtype_choice: "delete" })
    this.setState({ roomtype_option: "max_occupancy" })
    this.setState({ option: "delete_Max_Occupancy" })
  }

  uploadMultipleFiles(e) {
    console.log(typeof (this.state.file))
    let fileArrayx = [];

    fileArrayx = this.state.file;


    // this.fileObj = new Set(this.fileObj);

    let msg = ''
    for (let i = 0; i < e.target.files.length; i++) {

      let url = e.target.files[i]
      const file = e.target.files[i]
      const size = file.size;

      let realWidth = e.target.files[i].clientWidth;
      let realHeight = e.target.files[i].clientHeight;

     

      // else {
      //   msg = ` A ${this.returnFileSize(size)} file has been uploaded successfully.`
      // }
      setTimeout(() => {
        this.setState({ msg: '' })
      }, 6000)

      this.setState({ msg: msg })
      fileArrayx.push(url)
    }
    this.setState({ file: fileArrayx })

    // if (this.fileArrayx.length > 0) {
    //   document.getElementById('room_img').style.display = ""
    // }
    this.setState({ file: fileArrayx })
  }

  returnFileSize(number) {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(2) + 'KB';
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(2) + 'MB';
    }
  }

  uploadFiles(e) {
    e.preventDefault()
    console.log(this.state.file)
  }


  uploadimg = (event) => {
    this.setState({ room_view: event.target.files[0] })

    var output_1 = document.getElementById('img_1');
    //upload = URL.createObjectURL(event.target.files[0]);
    output_1.src = URL.createObjectURL(event.target.files[0]);
    // this.setState({ doc_signature: event.target.value })
    output_1.onload = function () {
      URL.revokeObjectURL(output_1.src) // free memory
    }

  };

  del_img = () => {
    this.setState({ room_view: '' })
    this.setState({ current_img: false })
    let output_1 = document.getElementById('img_1');
    output_1.src = room_view
  }

  confirm_delete = (e) => {
    e.preventDefault()
    Object.keys(this.state.facility).map((f) => {
      let id = document.getElementById(`del_${f}`)
      if (id.checked) {
        delete this.state.facility[f]
      }
    })
    this.setState({ facility_modal: 'none' })
  }

  search = () => {
    let val = document.getElementById("myInput").value
    let facility_arr = Object.keys(this.state.facility)
    let search_val = facility_arr.filter((el) => el.toLowerCase().includes(val.toLowerCase()));
    Object.keys(this.state.facility).map((f) => {
      let hidden_list = document.getElementById(`del_for_${f}`)
      let new_val = hidden_list.id.replace('del_for_', '')
      console.log("====", new_val)
      if (!search_val.includes(new_val)) {
        console.log(new_val)
        hidden_list.style.display = "none"
      }
      else {
        hidden_list.style.display = ""
      }
    })
  }


  render() {

    return (<>{this.state.page_load ? <Loading /> :

      <div>
        <h6>Room Management >> <Link to={`/room`} style={{color:'blue'}}>Room Details</Link> >> {this.state.edit_id === undefined ? <>Add Room</>:<>Edit Room</>}</h6>
        <Link to={`/room`} id="room_id" style={{ visibility: "hidden" }} type="button" className="btn btn-primary">Add Rooms</Link>
        <Link to={`/Add_room`} id="room_add" style={{ visibility: "hidden" }} type="button" className="btn btn-primary">Add Rooms</Link>
        <div className="modal  active " id="m_roomtype" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ display: this.state.modal }}>
          <form action="" method="POST" className="my-5">

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{this.state.roomtype_choice === "add" ? <>Add</> : this.state.roomtype_choice === "edit" ? <>Edit</> : <>Delete</>} {this.state.roomtype_option === "room_type" ? <>Room Type</> : <>Max Occupancy</>} </h5>
                  <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ modal: 'none' })}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
                <div className="modal-body">
                  {this.state.roomtype_option === "room_type" ?
                    this.state.roomtype_choice === "add" ? (
                      <div className="form-group">
                        <label for="item-quantity"><b>Room Type:</b></label>
                        <input style={{ marginTop: '5px' }} value={this.state.for_roomtype} onChange={(e) => { this.setState({ for_roomtype: e.target.value }) }} type="text" className="form-control border border-secondary" id="for_roomtype" name="addtype" />
                        <label style={{ marginTop: '10px' }} for="item-quantity"><b>price:</b></label><br />
                        <input style={{ marginTop: '5px' }} value={this.state.for_roomtype_price} onChange={(e) => { this.setState({ for_roomtype_price: e.target.value }) }} type="number" className="form-control border border-secondary" />
                      </div>
                    ) : this.state.roomtype_choice === "edit" ?
                      (
                        <div className="form-group">
                          <label for="item-quantity"><b>Room Type:</b></label>
                          <Form.Select id="for_roomtype" onChange={this.roomType_price} style={{ width: "300px", marginTop: '10px' }}>
                            <option value="notselect">-----</option>
                            {this.state.backend_roomtype.map((element) => { return <option key={element.id} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
                          </Form.Select>
                          {/* <input style={{ marginTop: '5px' }} value={this.state.for_roomtype} onChange={(e) => { this.setState({ for_roomtype: e.target.value }) }} type="text" className="form-control border border-secondary" id="for_roomtype" name="addtype" /> */}
                          <label style={{ marginTop: '10px' }} for="item-quantity"><b>price:</b></label><br />
                          <input style={{ marginTop: '5px' }} value={this.state.for_roomtype_price} onChange={(e) => { this.setState({ for_roomtype_price: e.target.value }) }} type="number" className="form-control border border-secondary" />
                        </div>
                      ) :
                      (<Form.Select id="for_roomtype" onChange={(e) => { this.setState({ for_roomtype: e.target.value }) }}>
                        {this.state.backend_roomtype.map((element) => { return <option value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
                      </Form.Select>)
                    :
                    this.state.roomtype_choice === "add" ? (
                      <div className="form-group">
                        <label for="item-quantity"><b>Max Occupancy:</b></label>
                        <input type="text" value={this.state.for_roomtype} onChange={(e) => { this.setState({ for_roomtype: e.target.value }) }} className="form-control border border-secondary" id="for_roomtype" name="addtype" />
                      </div>
                    ) : (<Form.Select id="for_roomtype" onChange={(e) => { this.setState({ for_roomtype: e.target.value }) }}>
                      {this.state.backend_occupancy.map((element) => { return <option value={`${element.occupancy}`}>{element.occupancy}</option> })}
                    </Form.Select>)}

                </div>
                <div className="modal-footer">
                  <button onClick={this.types} type="button" className="btn btn-primary">Add changes</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ modal: 'none' })}>Close</button>
                </div>
              </div>
            </div>
          </form>

        </div>


        <h1 className='head'>{this.state.subtitle}</h1>

        {this.state.msg !== '' && <AlertDismissible msgFun={this.msgFun} time={6} type={this.state.msgType} msg={this.state.msg}/>}

        <h2>Enter Details</h2>
        <p></p>

        <Form onSubmit={this.add_room} id="myform">

          {this.state.add_permission !== "room_no" && <>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Room No</Form.Label>
                  {this.state.edit_id === undefined ? <Form.Control value={this.state.room_no} onChange={(e) => { this.setState({ room_no: e.target.value }) }} type="number" placeholder="Enter Room No" required /> : <h4>{this.state.room_no}</h4>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control value={this.state.capacity} onChange={(e) => { this.setState({ capacity: e.target.value }) }} type="number" placeholder="Capacity" required />
                </Form.Group>
              </Col>
            </Row>

            <Row>

              <Col>

                <Form.Group className="mb-3">
                  <Form.Label>Floor No</Form.Label>
                  {this.state.edit_id === undefined ? <Form.Select id="floor_no" name='floor_no'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select> : <h4>{this.state.floor_no}</h4>}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label style={{ marginLeft: "50px" }}>Room Type</Form.Label>
                  <div className="row">
                    <div className="col-1">
                      {this.state.room_type_permission.includes('send') &&
                        <img onClick={this.addroom_type} title='add new room type' style={{ width: "30px", marginTop: "3px" }} src={plus} alt="" />}
                    </div>

                    <div style={{ marginLeft: "-10px" }} className="col-8">
                      <Form.Select id='room_type' onChange={this.roomType_price} style={{ width: "420px" }}>
                        <option selected={this.state.empty_room_type ? "selected":""} value="notselect">-----</option>
                        {this.state.backend_roomtype.map((element) => { return <option key={element.id} selected={element.room_all_type === this.state.room_type_select ? "selected" : ""} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
                      </Form.Select>
                    </div>
                    <div className="col-1">
                      {this.state.room_type_permission.includes('edit') && <img title='edit room type' onClick={this.editroom_type} style={{ width: "30px" }} src={edit} alt="" />}
                    </div>
                    <div className="col-1">
                      {this.state.room_type_permission.includes('delete') && <img title='delete room type' onClick={this.delroom_type} style={{ width: "30px" }} src={minus} alt="" />}
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Beds</Form.Label>
                  <Form.Control value={this.state.nob} onChange={(e) => { this.setState({ nob: e.target.value }) }} type="number" placeholder="No of Beds" required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label style={{ marginLeft: "50px" }}>Max Occupancy</Form.Label>
                  <div className="row">
                    <div className="col-1">
                      <img onClick={this.addmax_occupancy} style={{ width: "30px" }} title='add new max occupancy' src={plus} alt="" />
                    </div>
                    <div style={{ marginLeft: "-10px" }} className="col-8">
                      <Form.Select id="Occupancy" onChange={(e) => { this.setState({ Occupancy: e.target.value }) }} style={{ width: "420px" }}>
                        {this.state.backend_occupancy.map((element) => { return <option selected={element.occupancy === this.state.Occupancy ? "selected" : ""} value={`${element.occupancy}`}>{element.occupancy}</option> })}
                      </Form.Select>
                    </div>
                    <div className="col-1">
                      <img title='delete max occupancy' onClick={this.delmax_occupancy} style={{ width: "30px" }} src={minus} alt="" />
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>

                <Form.Group className="mb-3">
                  <Form.Label>Room Status</Form.Label>
                  <Form.Select id="room_status" name='floor_no'>
                    {this.state.room_status.map((e)=>{return <option selected={e === this.state.current_status ? "selected" : ""} value={e}>{e}</option>})}
                    </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mt-4">
                  <div className="d-flex">
                    <Form.Label>Price</Form.Label>
                    <h5 style={{ marginLeft: '10px' }}>{this.state.price}</h5>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div className="row">
              <div className="col-3">
                <img className={roomstyle.img_reserve} src={room_view} id="img_1" alt="" /><br />
                <div className="d-flex col mt-3">
                  <label for="id_signature" className={roomstyle.upload}><span className={roomstyle.leb}>Upload</span></label>
                  <label for="" onClick={this.del_img} className={roomstyle.delete}><span className={roomstyle.leb}>Delete</span></label>
                  <input type="file" value={this.state.doc_signature} style={{ display: "none" }} name="signature" accept="image/*" onChange={this.uploadimg} id="id_signature" /></div>
              </div>
              <div className="col-9"><h4>Room facilitys</h4>
                <div className={`row mt-3 ${roomstyle.facility}`} style={{ width: "100%", maxHeight: "200", maxWidth: "500" }}>

                  {Object.keys(this.state.facility).map((f) => {
                    return <div className="col-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id={f} />
                        <label className="form-check-label" for={f}>
                          {f}
                        </label>
                      </div>
                    </div>
                  })}
                  {this.state.add_more && <input title='click enter after fill for add new facility' onChange={(e) => { this.setState({ add_more_val: e.target.value }) }} value={this.state.add_more_val} type="text" onKeyDown={this.data_enter} />}
                  <div className="d-flex">
                    <button className={roomstyle.add_more_f} onClick={this.add_more}>Add More</button>
                    <button className={roomstyle.confirm_f} onClick={() => { this.setState({ add_more: false }) }}>Confirm</button>
                    <button className={roomstyle.delete_f} onClick={() => { this.setState({ facility_modal: 'block' }) }}>Delete</button>
                  </div>
                </div>

              </div>
            </div>
            <div id="room_img" className="row form-group multi-preview">
              {
                (this.state.file || []).map((url, index) => (
                  <>
                    <div className="col-3" style={{ marginTop: "100px" }}>
                      <span className={roomstyle.close} onClick={() => { let n = this.state.file; n.splice(index, 1); this.setState({ file: n }) }}>
                        x
                      </span>
                      <img id={`room_img_${index}`} src={typeof (url) !== "string" ? URL.createObjectURL(url) : url} style={{ width: "200px" }} alt="..." />
                      {/* <img id={`room_img_${index}`} src={ URL.createObjectURL(url)} style={{ width: "200px" }} alt="..." />  */}
                    </div>
                    <br></br>
                  </>

                ))
              } </div>
            <br />
            <div className="form-group">
              <label for="uploadMultipleFiles" className={roomstyle.facility_upload}><img className="img_1_reserve" src={gallery} id="img_2" alt="" /><span className="leb">Upload Images Gallery</span></label>
              <input type="file" style={{ overflow: "hidden", display: "none" }} id='uploadMultipleFiles' className="form-control" onChange={this.uploadMultipleFiles} multiple />
            </div>
            <br />

            <Button style={{ marginBottom: '20px' }} type="submit" variant="success">{this.state.edit_id === undefined ? <>Add Room</>:<>Edit Room</>}</Button>{' '} <br /> </>}

          {this.state.add_permission === "room_no" && <>

            <Form.Label style={{ marginLeft: "100px" }}>Room Type</Form.Label>
            <div className="row">
              <div className="col-1">
                {this.state.room_type_permission.includes('send') &&
                  <img onClick={this.addroom_type} style={{ width: "30px", marginTop: "3px" }} src={plus} alt="" />}
              </div>

              <div style={{ marginLeft: "-10px" }} className="col-4">
                <Form.Select id='room_type' onChange={this.roomType_price} style={{ width: "420px" }}>
                  <option value="notselect">-----</option>
                  {this.state.backend_roomtype.map((element) => { return <option key={element.id} value={`${element.room_all_type}`}>{element.room_all_type}</option> })}
                </Form.Select>
              </div>
              <div className="col-1">
                {this.state.room_type_permission.includes('edit') && <img onClick={this.editroom_type} style={{ width: "30px", marginRight: "-20px" }} src={edit} alt="" />}
              </div>
              <div className="col-1">
                {this.state.room_type_permission.includes('delete') && <img onClick={this.delroom_type} style={{ width: "30px" }} src={minus} alt="" />}
              </div>
            </div>
          </>}

        </Form>
        <div className="modal  active " id="delete_faciltiy" tabIndex="-1" role="dialog" aria-labelledby="delete_faciltiy" aria-hidden="false" style={{ display: this.state.facility_modal }}>
          <form action="" method="POST" className="my-5">

            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="delete_faciltiy">Delete Facility</h5>
                  <span type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ facility_modal: 'none' })}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
                <div className="modal-body">
                  <input type="text" id="myInput" onKeyUp={this.search} placeholder="Search for facility.." title="Type in a facility" />
                  <div id="del_facility" className={`row ${roomstyle.facility}`}>
                    {Object.keys(this.state.facility).map((f) => {
                      return <div id={`del_for_${f}`} className="col-6">
                        <div className="form-check">
                          <input className="del_check form-check-input" type="checkbox" value="" id={`del_${f}`} />
                          <label className="del_check form-check-label" for={`del_${f}`}>
                            {f}
                          </label>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={this.confirm_delete} className="btn btn-primary">Delete</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ facility_modal: 'none' })}>Close</button>
                </div>
              </div>
            </div>
          </form>
        </div>


      </div>}</>
    )
  }
}

export default withParams(adminLayout(Add_room)); 