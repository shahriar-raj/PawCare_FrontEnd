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
                const response = await fetch('http://44.222.207.156:3000/donation', {
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
                <div className="profileheader">
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
                        {data.map((donation) => (
                            <Card style={{ width: '50%', backgroundColor: "#192928", marginTop: "5%" }} key={donation.DonationID}>
                                <Card.Img variant="top" src={donation.Image} />
                                <Card.Body>
                                    <Card.Title>{donation.Username}</Card.Title>
                                    <Card.Text>
                                        {donation.Description}
                                    </Card.Text>
                                    <Button variant="primary">Donate</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <div className="donationbodyright">

                    </div>
                </div>
            </div>
        </div>
    )
}