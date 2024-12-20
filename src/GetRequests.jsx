import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./GetRequests.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { LeftCircleOutlined } from '@ant-design/icons';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { render } from 'react-dom';

export function GetRequests(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleLog = () => {
        navigate('/');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/getMessages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                console.log(result);
                setData(result.result);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }
        , []);

    function renderButtons(item) {
        if (item.AcceptStatus === 2) {
            return (
                <div>
                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginBottom: "1%" }} onClick={() => {approve(item.RequestID) }}>
                        ✔ Accept
                    </Button>
                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "5%", marginBottom: "1%" }} onClick={() => { reject(item.RequestID) }}>
                        x Reject
                    </Button>
                </div>
            )
        }
        else if (item.AcceptStatus === 1) {
            return (
                <div>
                    <span style={{ color: "green", fontFamily: "Baloo Da", fontSize: "large" }}>✔ Accepted</span>
                </div>
            )
        }
        else if (item.AcceptStatus === 0) {
            return (
                <div>
                    <span style={{ color: "red", fontFamily: "Baloo Da", fontSize: "large" }}>x Rejected</span>
                </div>
            )
        }
    }

    const approve = async (ReqID) => {
        try {
            let obj = {
                requestID: ReqID,
            }
            const response = await fetch('http://3.89.30.159:3000/profile/acceptAdoptionMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('Adoption Approved');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const reject = async (ReqID) => {
        try {
            let obj = {
                requestID: ReqID,
            }
            const response = await fetch('http://3.89.30.159:3000/profile/rejectAdoptionMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('Adoption Rejected');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            {/* <div className="profile_header">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='Profile' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "7%" }} onClick={() => { navigate('/profile') }}>
                    My Profile
                </Button>
                <Button className='Donation' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
                    Donate For Pets
                </Button>
                <Button className='Adoption' icon={<FontAwesomeIcon icon={faHome} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/adoption') }}>
                    Adopt a Pet
                </Button>
                <Button className='Notification active' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                    Notifications
                </Button>
                <Button className='Forum' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                    Forum
                </Button>
                <Button className='BookHostel' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                    Book a Hostel
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "3%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div> */}
            <div className="messages-post">

                <div className="messages-header">
                    <h1>Messages</h1>
                </div>

                <div className="messageList">
                    {data.map((item) => (
                        <div className="messageCard">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.Username}</Card.Title>
                                    <Card.Text>
                                        Pet Name: {item.Name}
                                        <br />
                                        Are you an adult ?: {item.AgeStatus === 1 ? "Yes" : "No"}
                                        <br />
                                        Are your pets vaccinated?: {item.VaccinationStatus === 1 ? "Yes" : "No"}
                                        <br />
                                        Where will the pet stay when Alone? : {item.PetAloneText}
                                        <br />
                                        <br/>
                                        {renderButtons(item)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
