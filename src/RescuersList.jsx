import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./RescuersList.css";
import { Button, Divider, Flex, Radio, Avatar, Select } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';


export function RescuersList(props) {

    const locationOptions = [
        { value: '', label: 'All' },
        { value: 'BUET', label: 'BUET' },
        { value: 'Mohammadpur', label: 'Mohammadpur' },
        { value: 'Dhanmondi', label: 'Dhanmondi' },
    ];

    const [data, setData] = useState([]);
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleLog = () => {
        navigate('/');
    }

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                }
                const response = await fetch('http://3.89.30.159:3000/profile/viewAllRescuers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result.application);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="rescuer_header">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                    <Button className='Profile1' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "7%" }} onClick={() => { navigate('/profile') }}>
                        My Profile
                    </Button>
                    <Button className='Donation1' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
                        Donate For Pets
                    </Button>
                    <Button className='Adoption1' icon={<FontAwesomeIcon icon={faHome} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/adoption') }}>
                        Adopt a Pet
                    </Button>
                    <Button className='Notification1' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                        Notifications
                    </Button>
                    <Button className='Forum1' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                        Forum
                    </Button>
                    {/* <Button className='BookHostel1' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                        Book a Hostel
                    </Button> */}
                    <Button className='logout1' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "3%" }} onClick={handleLog}>
                        Logout
                    </Button>
                </div>


                <br />
                <p style={{ marginLeft: '25%', color: "#192928", fontFamily: 'Baloo Da', fontSize: '1.5em' }}> Rescuers List</p>
                <hr />
                <div className="rescuerbody">
                    <div className="rescuerbodyleft">
                        {data.map((rescuer) => {
                            if (location === '' || rescuer.Address === location) {
                                return (
                                    <Card className='rescuer-card' key={rescuer.UserID}>
                                        <Card.Img variant="top" src={rescuer.URL} />
                                        <Card.Body>

                                            <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{rescuer.Username} </Card.Title>
                                            <Card.Text style={{ display: 'flex' }}>
                                                Email ID: {rescuer.Email}
                                                <br />
                                                Contact: {rescuer.PhoneNumber}
                                                <br />
                                                Location: {rescuer.Address}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                    <div className="rescuerbodyright">
                        <Button style={{ backgroundColor: "#cedfb9", marginLeft: '25%', borderColor: "#192928", marginTop: "10%", fontFamily: "Baloo Da", fontSize: "large" }} className="AFDR" onClick={() => { navigate('/rescuerapply') }}>Apply To Be A Rescuer</Button>
                        <div className="select_location">Location</div>
                        <Select
                            className="filter_status_loc"
                            placeholder="Select Location"
                            options={locationOptions}
                            value={location}
                            onChange={setLocation}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}