import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./DonationList.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';


export function DonationList(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleLog = () => {
        navigate('/');
    }

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/donation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result);
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
                <Button className='Donation active' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
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
                <Button className='VetAppointment' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/vetappointment') }}>
                    Vet Appointment
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "1%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div>


                <br />
                <p style={{ marginLeft: '25%', color: "#192928", fontFamily: 'Baloo Da', fontSize: '1.5em' }}> Donation Request List</p>
                <hr />
                <div className="donationbody">
                    <div className="donationbodyleft">
                        {data.map((donation) => (
                            <Card className='donation-card' key={donation.DonationID}>
                                {/* <Card.Img variant="top" src={donation.Image} /> */}
                                <Card.Body>
                                    Requested By
                                    <Avatar
                                        src="./src/assets/cutu.png"
                                        size={80}
                                        alt="Pet"
                                        style={{ position: 'relative', marginLeft: '60%' }}
                                    />
                                    <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{donation.Username} </Card.Title>
                                    <Card.Text style={{ display: 'flex' }}>

                                        {donation.Description}
                                        <br />
                                        Received Amount: {donation.ReceivedAmount}
                                        <br />
                                        Total Amount: {donation.TotalAmount}

                                        <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "50%" }} onClick={() => {
                                            localStorage.setItem('DonationID', donation.DonationID);
                                            navigate('/donationdetails');
                                        }}>Details</Button>
                                        <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "5%" }} onClick={() => {
                                            localStorage.setItem('DonationID', donation.DonationID);
                                            navigate('/donationpayment');
                                        }}>Donate</Button>

                                    </Card.Text>


                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <div className="donationbodyright">
                        <Button style={{ backgroundColor: "#cedfb9", marginLeft: '7%', borderColor: "#192928", marginTop: "10%", fontFamily: "Baloo Da", fontSize: "large" }} className="AFD" onClick={() => { navigate('/donationapply') }}>Apply For Donation</Button>
                        <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginTop: "10%", fontFamily: "Baloo Da", fontSize: "large" }} className="MDA" onClick={() => { navigate('/mydonation') }}>My Donation Applications</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}