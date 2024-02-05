import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./DonationList.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export function DonationList(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
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
                <div className="donation_header">
                    <img src="src/assets/logo.png" alt="Logo" width="265px" />
                    <Button className='logout' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} onClick={() => { navigate('/') }}>
                        Logout
                    </Button>
                    <Button className='Donation' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/profile') }} >
                        Profile
                    </Button>
                </div>
                <br />
                <div className="donationbody">
                    <div className="donationbodyleft">
                        <p style={{ marginLeft: '30%', color: "#192928", fontFamily : 'Baloo Da', fontSize : '1.5em'}}> Donation Request List</p>
                        <hr/>
                        {data.map((donation) => (
                            <Card className='donation-card' key={donation.DonationID}>
                                {/* <Card.Img variant="top" src={donation.Image} /> */}
                                <Card.Body>
                                    <span style={{color: '#CEDFB9'}}>Requested By</span>
                                    <Card.Title style={{fontFamily : 'Baloo Da', fontSize : '2.0em'}}>{donation.Username} </Card.Title>
                                        <Card.Text style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            
                                                <strong>{donation.Description}</strong>
                                                Received Amount: {donation.ReceivedAmount}
                                                Total Amount: {donation.TotalAmount}
                                            
                                            
                                                <Avatar 
                                                    src="./src/assets/cutu.png" 
                                                    size={120} 
                                                    alt="Pet" 
                                                    style={{ position: 'relative', marginBottom: '50px' }} 
                                                />
                                            

                                            
                                                <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928"}} onClick={() => {
                                                    localStorage.setItem('DonationID', donation.DonationID);
                                                    navigate('/donationdetails');
                                                }}>Details</Button>
                                                <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928" }}>Donate</Button>
                                            
                                        </Card.Text>


                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <div className="donationbodyright">

                    </div>
                </div>
            </div>
        </div >
    )
}