import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./VetAppointment.css";
import { Button, Divider, Flex, Radio, Avatar, Select } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';


export function VetAppointment(props) {

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
                const response = await fetch('http://3.89.30.159:3000/profile/getAllVets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result.data);
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
                    {/* <Button className='BookHostel' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                        Book a Hostel
                    </Button> */}
                    <Button className='VetAppointment active' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/vetappointment') }}>
                        Vet Appointment
                    </Button>
                    <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "1%" }} onClick={handleLog}>
                        Logout
                    </Button>
                </div>


                <br />
                <p style={{ marginLeft: '25%', color: "#192928", fontFamily: 'Baloo Da', fontSize: '1.5em' }}> Vets' List</p>
                <hr />
                <div className="vetbody">
                    <div className="vetbodyleft">
                        {data.map((vet) => {
                            if (location === '' || vet.Location === location) {
                                return (
                                    <Card className='vet-card' key={vet.ID}>
                                        <Card.Img variant="top" src={vet.URL} width={120}/>
                                        <Card.Body>

                                            <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{vet.Name} </Card.Title>
                                            <Card.Text style={{ display: 'flex' }}>
                                                Expertise : {vet.Expertise}
                                                <br />
                                                From : {vet.StartTime}:00 To: {vet.EndTime}:00
                                                <br />
                                                Location : {vet.Location}
                                            </Card.Text>
                                            <Button className="BA" style={{ fontFamily:'Baloo Da', backgroundColor:"#cedfb9"}} onClick={()=>{
                                                localStorage.setItem('vetID', vet.ID);
                                                navigate('/vetappointmentform');
                                            }} > Book Appointment </Button>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                    <div className="vetbodyright">
                        <Button style={{ backgroundColor: "#cedfb9", marginLeft: '15%', borderColor: "#192928", marginTop: "10%", fontFamily: "Baloo Da", fontSize: "large" }} className="AFDV" onClick={() => { navigate('/rescuerapply') }}>See my Booked Appointments</Button>
                        <div className="select_location">Location</div>
                        <Select
                            className="filter_status_loc1"
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