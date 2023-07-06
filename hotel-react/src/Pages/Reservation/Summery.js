import React, { Component } from 'react';

class Summery extends Component {
    constructor(props) {
        super(props);  
        this.state = {

        }

    }    
    render() {
        return (
            
            <div>
           
                <section className="section about-section gray-bg" id="about">
            <div className="container">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-lg-9">
                  <div className="about-text go-to">
                    {this.props.guest_detail && this.props.guest_detail.map((e) => {
                      return <>
                        <h3 className="dark-color">{e.first_name}</h3><br />
                        <h6 className="theme-color lead">{e.email}</h6>
                   


                    <h6 className="dark-color">Number Of Rooms {this.props.number_room}</h6><br />

                    
                        <div className="row about-list">
                          <div className="col-md-6">
                            <div className="media d-flex">
                              <label>Birthday</label>
                              <p>{e.guest_dob}</p>
                            </div>
                            <div className="media d-flex">
                              <label>Gender</label>
                              <p>{e.guest_gender}</p>
                            </div>
                            <div className="media d-flex">
                              <label>Residence</label>
                              <p>{e.guest_country}</p>
                            </div>
                            <div className="media d-flex">
                              <label>city</label>
                              <p>{e.guest_city}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="media d-flex">
                              <label>PhoneNumber</label>
                              <p>{e.phoneNumber}</p>
                            </div>
                            <div className="media d-flex">
                              <label>PhoneNumber 2</label>
                              <p>{e.PhoneNumber2}</p>
                            </div>
                            <div className="media d-flex">
                              <label>TaxId</label>
                              <p>{e.taxId}</p>
                            </div>
                            <div className="media d-flex">
                              <label>DOC Type</label>
                              <p>{e.doctype}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="media d-flex">
                              <label>Doc Issue Date</label>
                              <p>{e.guest_doc_issue_date}</p>
                            </div>
                            <div className="media d-flex">
                              <label>Doc Is sue Country</label>
                              <p>{e.doc_issue_country}</p>
                            </div>
                            <div className="media d-flex">
                              <label>zip code</label>
                              <p>{e.guest_zip_code}</p>
                            </div>
                            <div className="media d-flex">
                              <label>Doc Exp Date</label>
                              <p>{e.doc_exp_date}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="media d-flex">
                              <label>Address</label>
                              <p>{e.address_1}</p>
                            </div>
                            <div className="media d-flex">
                              <label>Address 2</label>
                              <p>{e.address_2}</p>
                            </div>

                          </div>
                        </div>

                        <button type='btn' className='btn btn-success' onClick={() => {
                          document.getElementById("profile-tab").click();
                          document.getElementById("hotel").style = "display:none";
                        }
                        }>Go Next</button></>
                    })}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="about-avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
            </div>
        );
    }
}

export default Summery;