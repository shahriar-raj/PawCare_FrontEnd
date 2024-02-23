import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat,faCalendarAlt ,faUsers,faUser, faFilter, faHome, faHandHoldingDollar, faPaw,faDog, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Row, Col, Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import './AdoptionList.css';
import './AdoptionCard.css'
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';

import './Hostel.css'; // Make sure to include the correct path to your CSS file




export function Hostel() {
    const navigate = useNavigate();
    const { Option } = Select;

    const handleLog = () => {
        navigate('/');
    }
    return (
        <div className="hostel-container">
            <div className="profile_header">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                    <Button className='Profile' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "10%" }} onClick={() => { navigate('/profile') }}>
                        My Profile
                    </Button>
                    <Button className='Donation' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
                        Donate For Pets
                    </Button>
                    <Button className='Adoption active' icon={<FontAwesomeIcon icon={faHome} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/adoption') }}>
                        Adopt a Pet
                    </Button>
                    <Button className='Notification' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                        Notifications
                    </Button>
                    <Button className='Forum' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                        Forum
                    </Button>
                    <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "3%" }} onClick={handleLog}>
                        Logout
                    </Button>
                </div>

                <div className="hostel-search-filters">
                    <div className="field-group"> Pet Type
                        <FontAwesomeIcon icon={faCat} />  
                        <Select defaultValue="Select Pet Type" className="reservation-select">
                            <Option value="dog">Dog</Option>
                            <Option value="cat">Cat</Option>
                            {/* Add more pet types as needed */}
                        </Select>
                    </div>
                    <div className="field-group">
                        <FontAwesomeIcon icon={faUsers} /> Guests
                            <Select defaultValue="2 Pets" className="reservation-select">
                                <Option value="1">1 Pet</Option>
                                <Option value="2">2 Pets</Option>
                                {/* Add more options as needed */}
                            </Select>
                    </div>            

                    <div className="field-group">
                        <FontAwesomeIcon icon={faCalendarAlt} /> Check In
                        <DatePicker placeholder="Check-in" />
                    </div>
                    <div className="field-group">
                        <FontAwesomeIcon icon={faCalendarAlt} /> Check In
                        <DatePicker placeholder="Check-in" />
                    </div>
               
                </div>


                
        </div>
    );
}
