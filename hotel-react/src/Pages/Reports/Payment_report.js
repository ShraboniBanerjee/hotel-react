import React, { Component } from 'react'
import adminLayout from "../../hoc/adminLayout"
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Chart } from "react-google-charts";
import Loading from '../../images/Loading';
import Button from 'react-bootstrap/Button';


class Payment_report extends Component {
    constructor(props) {
        super(props);

        const url_link = this.props.url
        let subtitle = this.props.subtitle
        let property = localStorage.getItem("property")
        this.state = {

            start_date: "",
            url: `${url_link}bookings-api/${property}/`,
            end_date: "",
            graph_data: [],
            option: {
                hAxis: { title: "Date Of Reservation" },
                vAxis: { title: "Ammount" }
            },
            loading: false,
            show: "no",
            page_load: true,
            subtitle:subtitle

        }
    }


    checkToken = () => {
        if (localStorage.getItem("logintoken")) {
            // get token and do anything
            this.setState(JSON.parse(localStorage.getItem("logintoken")))
        }
        if (localStorage.getItem("property") === undefined || localStorage.getItem("property") === "" || localStorage.getItem("property") == "error") {
            localStorage.removeItem("logintoken")
            window.location.href = "/login";
        }
    }

    componentDidMount() {
        this.checkToken()

        this.graph_data()
    }
    error(parsedata) {
        if (parsedata.msg === "error") {
            localStorage.removeItem("logintoken")
            window.location.href = "/login";
        }
    }
    graph_data = async () => {
        this.checkToken()
        console.log("------------==-")
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: "get_report",
            }),
        })
        let report_data = await data.json()
        
        
        this.error(report_data)
        this.setState({ loading: false })
        this.setState({ graph_data: report_data.payment_data })
        this.setState({ show: "yess" })
        console.log(report_data.payment_data)
        if (report_data !== 'no') {
            console.log(report_data)
            this.setState({ page_load: false })
        }
    }


    search = async () => {
        this.setState({ show: "no" })
        this.checkToken()
        let a = (JSON.parse(localStorage.getItem("logintoken")))
        let url = this.state.url
        this.setState({ loading: true })
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': "Bearer " + a['token']
            },
            body: JSON.stringify({
                option: "report",
                start_date: this.state.start_date,
                end_date: this.state.end_date
            }),
        })
        let report_data = await data.json()
        this.error(report_data)
        this.setState({ show: "yess" })
        this.setState({ loading: false })
        this.setState({ graph_data: report_data.payment_data })
        console.log(report_data.payment_data)
    }

    render() {

        return (<>{this.state.page_load ? <Loading /> :
            <div>
                <div className="row">

                    <div>

                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group id="dob">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control onChange={(e) => { this.setState({ start_date: e.target.value }) }} min={this.state.todayDate} type="date" id='check_in' name="dob" placeholder="Date of Birth" />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group id="dob">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control onChange={(e) => { this.setState({ end_date: e.target.value }) }} min={this.state.todayDate} type="date" id='check_out' placeholder="Date of Birth" />
                                </Form.Group>
                            </div>

                            <Form.Group as={Col} id="formGridState">
                                <Form.Label>Payment Types</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>
                                        Credit Card
                                    </option>
                                    <option>

                                        Debit Card
                                    </option>
                                </Form.Select>
                            </Form.Group>



                        </div>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <Form.Group className="mb-3" id="formGridState">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select defaultValue="Select...">
                                        <option>Choose...</option>
                                        <option>None of the type...</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>     Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        Send Report to this email Address
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div className="col-md-4 mt-4"><Button variant="primary">send</Button></div>


                        </div>

                    </div>



                    <Button style={{ marginTop: "20px" }} variant="primary" onClick={this.search}>Search</Button>

                </div>

                <h2 className='mt-3'>Graph Analytics of Payments</h2>
                {this.state.loading && <Loading />}
                {this.state.show !== 'no' &&
                    <p className='mt-3'><Chart
                        chartType="LineChart"
                        data={this.state.graph_data}
                        width="100%"
                        options={this.state.option}
                        height="400px"
                        legendToggle
                    /></p>
                }
                <p></p>

                <h2 className='mt-3'> Payment Details </h2>


                <Form>
                    {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label={`Saved my information for next time`}
                            />
                        </div>
                    ))}
                </Form>

                <p></p>
            </div>}</>
        )
    }
}

export default adminLayout(Payment_report);
