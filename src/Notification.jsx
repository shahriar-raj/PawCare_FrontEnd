import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { LeftCircleOutlined } from '@ant-design/icons';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import './AdoptionList.css';
import './AdoptionCard.css'
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';



export function Notification(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleLog = () => {
        navigate('/');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                    UserID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/showNotifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                const sortedNotifications = result.result.sort((a, b) => (a.ReadStatus) - (b.ReadStatus));
                setData(sortedNotifications);
                console.log(result);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }
        , []);

    return (
        <div>
            <div className="profile_header">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='Profile' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/profile') }}>
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
                {/* <Button className='BookHostel' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                    Book a Hostel
                </Button> */}
                <Button className='VetAppointment' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/vetappointment') }}>
                    Vet Appointment
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "1%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div>
            <div className="notifications-post">

                <div className="notifications-header">
                    <h1>Notifications</h1>
                </div>

                <div className="notificationList">
                    {data.map((item) => (
                        <div className="notificationCard" key={item.CommentId}>
                            <Card className={item.ReadStatus === 0 ? 'notificationCardUnread' : 'notificationCardRead'}>
                                <Card.Body>
                                    <Card.Title>{item.ReadStatus === 0 ? 'Unread' : 'Read'}</Card.Title>
                                    <Card.Text>
                                        {item.Comments}
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
