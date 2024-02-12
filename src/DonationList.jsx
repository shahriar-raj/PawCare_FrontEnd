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
                        <Button style={{ backgroundColor: "#cedfb9", marginLeft: '7%', borderColor: "#192928", marginTop: "10%", fontFamily: "Baloo Da", fontSize: "large"}} className="AFD" onClick={() => { navigate('/donationapply') }}>Apply For Donation</Button>
                        <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginTop: "10%", fontFamily: "Baloo Da", fontSize: "large"}} className="MDA" onClick={() => { navigate('/mydonation') }}>My Donation Applications</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}