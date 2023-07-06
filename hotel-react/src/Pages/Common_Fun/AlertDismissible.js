import React, { useState, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import popup from "../../assets/css/popup.module.css"


function AlertDismissible(props) {
  const [show, setShow] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const alertRef = useRef(null);

  useEffect(() => {
   
    console.log("call")
    if (props.time !== undefined) {
      let time = parseInt(props.time) * 1000
      setTimeout(() => {
        props.msgFun()
        setShowAlert(false)
      }, time);
    }
    else {

      setTimeout(() => {
        props.msgFun()
        setShowAlert(false)
      }, 6000);
    }

    const handleWindowClick = (e) => {
   
      if (alertRef.current && !alertRef.current.contains(e.target)) {
        setShowAlert(false);
        props.msgFun()
      }

    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };



  }, []);

  return (
    showAlert &&
    <>
      <div className="modal active" id="delete_room" tabIndex="-1" role="dialog" aria-labelledby="delete_room" aria-hidden="false" style={{ display: "block" }}>
        <div className="modal-dialog" role="document">
          <div ref={alertRef} style={{ borderRadius: "20px", width: '600px;', textAlign: "center" }} className={`modal-content ${popup[props.type]}`}>
            <div className="modal-body" >
              {props.type === "success" ?
                <img src={require('./../../assets/images/popup1-icon.png')}></img>
                :
                <img src={require('./../../assets/images/popup2-icon.png')}></img>
              }
              <p className='mt-3'><b>{props.msg}</b></p>
              <button onClick={() => { setShowAlert(false) }} type="button" className="btn" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlertDismissible 