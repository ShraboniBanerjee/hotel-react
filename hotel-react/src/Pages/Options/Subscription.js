import React, { useEffect, useState } from 'react'
import TermsAndConditions from '../Common_Fun/TermsAndConditions'
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../images/Loading';
import CountDown from '../Common_Fun/CountDown';


function withParams(Component) {
    return props => <Component {...props} vs="eee" params={useParams()} />;
}


function Subscription(props) {
    const [showCondition, setShowcondition] = useState(false)
    const [guestData, setGuestData] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [FinalMsg,setFinalMsg] = useState(false)
    const [msg,setMsg] = useState('')
    const [userWant,setUserWant] = useState('')

    useEffect(() => {
        getFun()
    }, [])

    const getFun = async () => {
        let { id } = props.params;
        let url_link = `${props.url}user_subscription/${id}/`
        let data = await fetch(url_link, {
            method: 'GET',
            headers: {
                'content-type': "application/json",
            },
        })

        let getData = await data.json()
        setGuestData(getData.guest)
        console.log(getData)
        setUserWant(getData.user_want)
        if (getData.msg === 'access') {
            setLoading(false)
        }
        else {
            navigate('/login')
        }
    }

    const answer = async (answer) => {
        setLoading(true)
        if (answer === "accept") {
            let { id } = props.params;
            let url_link = `${props.url}user_subscription/${id}/`
            let data = await fetch(url_link, {
                method: 'PUT',
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    'email': guestData.email,
                    'user_want': userWant
                })
            })
            
            let getData = await data.json()
            setMsg(getData.msg)
            setFinalMsg(true)
            setLoading(false)
            setTimeout(() => {
                navigate('/login');
              }, 6000)
        }
        else{
            navigate('/login')
        }
    }

    return (
        loading ? <Loading /> :
            <div>
            {FinalMsg ? <div>{msg}</div>:
                <div className="container">
                    {!showCondition &&
                        <center style={{ marginTop: "100px" }}>
                            <h3> Welcome, {guestData.first_name} {guestData.last_name}</h3>
                            {userWant === "subscription" ? 
                            <div>
                            <h3> Please Click on continue Button for Subscribe us with email </h3>
                            {/* <CountDown hours={0} minutes={1} />, */}
                            <h3>{guestData.email}</h3>
                            <button onClick={() => { setShowcondition(true) }} className='btn btn-success'>continue</button>
                            </div>:
                            <div>
                            <h3> Click on continue Button for Unsubscribe us with email </h3>
                            {/* <CountDown hours={0} minutes={1} />, */}
                            <h3>{guestData.email}</h3>
                            <button onClick={() => { answer("accept") }} className='btn btn-success mt-3 mx-3'>continue</button>
                            <button onClick={() => { answer("decline") }} className='mt-3 btn btn-danger'>close</button>
                            </div>
                            }
                        </center>}
                    {showCondition &&
                        <TermsAndConditions guest={guestData} response={answer} type={'Subscribe'} />
                    }
                </div>}
            </div>
    )
}

export default withParams(Subscription)
