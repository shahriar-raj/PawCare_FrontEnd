import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Button, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo, faMapMarkedAlt, faCat, faCalendarAlt, faUsers, faUser, faFilter, faHome, faHotel, faHandHoldingDollar, faPaw, faDog, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Row, Col, Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';

import './Hostel.css'; // Make sure to include the correct path to your CSS file


export function Hostel() {
    const navigate = useNavigate();
    const { Option } = Select;

    const [data, setData] = useState([]);
    const hostels = [
        { HostelID: 'hstl1', Name: 'Cozy Paws', Location: 'Dhaka', Description: 'A cozy place for your pets.'},
        { HostelID: 'hstl2', Name: 'Sunny Retreat', Location: 'Chittagong', Description: 'Bright and airy accommodations.'},
        { HostelID: 'hstl3', Name: 'Mountain Hideout', Location: 'Sylhet', Description: 'Quiet spot in the mountains.'},
        { HostelID: 'hstl4', Name: 'City Lights', Location: 'Khulna', Description: 'Stay in the heart of the city.'},
        { HostelID: 'hstl5', Name: 'Beach Haven', Location: 'Cox\'s Bazar', Description: 'Ocean views and sandy beaches.' },
        { HostelID: 'hstl6', Name: 'Historic Inn', Location: 'Rajshahi', Description: 'Experience rich history and culture.' },
        { HostelID: 'hstl7', Name: 'Jungle Lodge', Location: 'Bandarban', Description: 'Escape to the wilderness.'},
        { HostelID: 'hstl8', Name: 'Riverfront Stay', Location: 'Barisal', Description: 'Relax by the water.'},
        { HostelID: 'hstl9', Name: 'Urban Pod', Location: 'Mymensingh', Description: 'Modern and minimalist urban stay.' },
        { HostelID: 'hstl10', Name: 'Country Charm', Location: 'Rangpur', Description: 'A quaint and cozy country home.'}
        // Add other unique hostels here...
    ];


    const handleLog = () => {
        navigate('/');
    }
    return (
        <div className="hostel-container">
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
                <Button className='Notification' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                    Notifications
                </Button>
                <Button className='Forum' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                    Forum
                </Button>
                <Button className='BookHostel active' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                    Book a Hostel
                </Button>
                <Button className='VetAppointment' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/vetappointment') }}>
                    Vet Appointment
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "1%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div>

            <div className="hostel-search-filters">
                <div className="field-group">
                    <span classname="filter-option-title"><FontAwesomeIcon icon={faMapMarkedAlt} /> Location </span>
                    <Select className="reservation-select" placeholder="Select Location">
                        <Option value="dmd">Dhandmondi</Option>
                        <Option value="mdpur">Mohammadpur</Option>
                        {/* Add more pet types as needed */}
                    </Select>
                </div>
                <div className="field-group">
                    <span classname="filter-option-title"><FontAwesomeIcon icon={faCat} />  Pet Type </span>
                    <Select className="reservation-select" placeholder="Select Pet Type">
                        <Option value="dog">Dog</Option>
                        <Option value="cat">Cat</Option>
                        {/* Add more pet types as needed */}
                    </Select>
                </div>
                <div className="field-group">
                    <span classname="filter-option-title"><FontAwesomeIcon icon={faUsers} /> Guests  </span>
                    <Select className="reservation-select" placeholder="Guest Count">
                        <Option value="1">1 Pet</Option>
                        <Option value="2">2 Pets</Option>
                        {/* Add more options as needed */}
                    </Select>
                </div>

                <div className="field-group">
                    <span classname="filter-option-title"><FontAwesomeIcon icon={faCalendarAlt} /> Check In </span>
                    <DatePicker className="reservation-select" placeholder="Add dates" />
                </div>
                <div className="field-group">
                    <span classname="filter-option-title"><FontAwesomeIcon icon={faCalendarAlt} /> Check Out  </span>
                    <DatePicker className="reservation-select" placeholder="Add Dates" />
                </div>

            </div>



            <div className="hostel-list">
                {/* <h1 className="hostels-heading">Hostels</h1> */}
                <div className="hostel-scrollable-row">
                    {hostels.map((hostel) => (
                        <Card key={hostel.HostelID} className="hostel-card">
                            {/* <Carousel>
                                {hostel.Images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`${hostel.Name} Image`} className="hostel-image" />
                                    </div>
                                ))}
                            </Carousel> */}
                            <div className="card-top-bar">
                                <span className="guest-favorite-badge">Guest favorite</span>
                                <button className="heart-icon-button">❤</button> {/* Replace with actual icon if available */}
                            </div>
                            <div className="card-content">
                                <h2 className="hostel-name">{hostel.Name}</h2>
                                <span className="hostel-location">{hostel.Location}</span>
                                <p className="hostel-description">{hostel.Description}</p>
                                <div className="card-bottom-bar">
                                    <span className="hostel-price">$52 / night</span> {/* Example price, replace with actual data */}
                                    <span className="hostel-rating">★ 4.88</span> {/* Example rating, replace with actual data */}
                                </div>
                                <button className="view-hostel-btn">View Details</button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>









        </div>

    );
}
