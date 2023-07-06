import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Loading from '../../images/Loading';
import roomstyle from "../../assets/css/roomdetails.module.css"
import { json, useParams, Link } from 'react-router-dom';
import check_mark from '../../assets/images/check_mark.png'
import close from '../../assets/images/close.png'

function withParams(Component) {
  return props => <Component {...props} vs="eee" params={useParams()} />;
}

class Roomview extends Component {
  constructor(props) {
    super(props);
    let { id } = this.props.params;

    let urllink = this.props.url
    let property = localStorage.getItem("property")
    let subtitle = this.props.subtitle
    this.state = {
      slideIndex: 1,
      url: `${urllink}rooms-api/${property}/${id}`,
      firstdate: "",
      lastdate: "",
      subtitle: subtitle,
      images: [],
      roomnumber: "",
      NOBeds: "",
      roomtype: "",
      occupancy: "",
      capacity: "",
      facility_modal: "none",
      price: "",
      backend_roomtype: [],
      backend_occupancy: [],
      room_data: [],
      loading: false,
      width: ''
    }
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
    this.checkToken()

    this.updateRates()


  }

  updateRates = async () => {
    let a = (JSON.parse(localStorage.getItem("logintoken")))
    // let url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/rates/"
    let url = this.state.url
    this.setState({ loading: true })
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': "application/json",
        'Authorization': "Bearer " + a['token']
      },

    })
    let parsedata = await data.json()

    if (parsedata.msg === 'no') {
      window.location.href = "/login";
    }
    else {
      this.setState({ loading: false })
    }
    console.log(parsedata)

    let gallery_img = []
    parsedata.rooms.map((e, i) => {
      for (let val = 1; val <= 10; val++) {
        if (e[`room_image_${val}`] !== null) {
          gallery_img.push(e[`room_image_${val}`].split("?")[0])
        }
      }
    })

    let len = gallery_img.length
    let gallery_widht

    if (len === 1) {
      gallery_widht = "102%"
    }
    if (len === 2) {
      gallery_widht = "104.2%"
    }
    if (len === 3) {
      gallery_widht = "106.2%"
    }
    if (len === 4) {
      gallery_widht = "108.5%"
    }
    if (len === 5) {
      gallery_widht = "110.2%"
    }
    if (len === 6) {
      gallery_widht = "113%"
    }
    if (len === 7) {
      gallery_widht = "115%"
    }
    if (len === 8) {
      gallery_widht = "118%"
    }
    if (len === 9) {
      gallery_widht = "120.5%"
    }
    if (len === 10) {
      gallery_widht = "123%"
    }

    this.setState({ width: gallery_widht })
    gallery_img.map((e) => {
      console.log("DDDD", e)
    })
    this.setState({ images: gallery_img })
    this.setState({ loading: false })
    this.setState({ room_data: parsedata.rooms })
    this.showSlides(this.state.slideIndex)
  }

  showSlides(n) {


    let i;
    let slides = document.getElementsByClassName(`${roomstyle.mySlides}`);
    let dots = document.getElementsByClassName(`${roomstyle.demo}`);



    let captionText = document.getElementById("caption");
    if (n > slides.length) { n = 1; this.setState({ slideIndex: 1 }) }
    if (n < 1) { n = slides.length; this.setState({ slideIndex: slides.length }) }
    this.setState({ slideIndex: n })

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].style.opacity = 0.6;
    }
    if (n == 0) {
      n = slides.length
    }
    slides[n - 1].style.display = "block";
    dots[n - 1].style.opacity = 1;
    captionText.innerHTML = dots[n - 1].alt;
  }

  render() {
    return ( <>
    {this.state.loading ? <Loading/> :<div>

 

        <h6 className="mt-5">Room Facilities  </h6>

        {this.state.room_data.map((room) => {
          return <div className="row mt-5">
            {Object.keys(JSON.parse(room.facilitys)).map((f) => { return <div className="col-3">  <p><img className={roomstyle.check_img} src={JSON.parse(room.facilitys)[f] === "Yes" ? check_mark : close} alt="" />{f}</p></div> })}
          </div>
        })}

        <h3 className="head mt-5">Room - Uploaded Images</h3>
        <div style={{ marginTop: "50px" }} className={roomstyle.container}>
          {this.state.images.map((img, i) => {
            return <div className={`${roomstyle.mySlides}`}>
              <div className={roomstyle.numbertext}>1 / 6</div>
              <img src={img} style={{ height: "200%", width: "100%", verticalAlign: "middle" }} />
            </div>
          })}

          <a className={roomstyle.prev} onClick={() => { this.showSlides(this.state.slideIndex - 1); }}>❮</a>
          <a className={roomstyle.next} onClick={() => { this.showSlides(this.state.slideIndex + 1); }} >❯</a>

          <div className={roomstyle.caption_container}>
            <p id="caption"></p>
          </div>
          <div className={`${roomstyle.row} no-gutters row`}>
            {this.state.images.map((img, i) => {
              return <div className={`${roomstyle.column} no-gutters col`}>
                <img className={`${roomstyle.demo} ${roomstyle.cursor}`} src={img} style={{ maxWidth: `${this.state.width}`, width: `${this.state.width}` }} onClick={() => { this.showSlides(this.state.slideIndex = i + 1) }} alt="The Woods" />
              </div>
            })}
          </div>
        </div>
          
        <h4 className="head mt-5">Default Room Image</h4>
        <div style={{marginLeft:'20px'}} className="container no-gutters">
        {this.state.room_data.map((room) => {return<div className="row no-gutters mt-5">
          <div className="col-6">
            <img className={roomstyle.front_img} style={{maxWidth:'120%',width:'120%'}} src={room.image.split("?")[0]} alt="" />
          </div>
          <div style={{backgroundColor:'black',color:'white'}} className="col-4">
          
          <p style={{marginTop:"20px"}}><b>Room Number: {room.number}</b></p>
          <p><b>Floor Number: {room.floorNumber}</b></p>
          <p><b>Room Type: {room.roomType}</b></p>
          <p><b>Max Occupancy: {room.typeroom}</b></p>
          <p><b>Room Capacity: {room.capacity}</b></p>
          <p><b>Max Adults: {room.max_adults}</b></p>
          <p><b>Room children: {room.max_children}</b></p>
          <p><b>Room Rent: {room.price}</b></p>
          
          </div>
        </div>})}
        </div>
        <p></p>
      </div>
}</>

    )
  }
}

export default withParams(adminLayout(Roomview));
