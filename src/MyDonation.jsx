import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./MyDonation.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export function MyDonation(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/donation/allMyDonationPosts', {
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
            <p style={{ marginLeft: '25%', color: "#192928", fontFamily: 'Baloo Da', fontSize: '1.5em' }}> My Donation Request List</p>
            <hr />
            <div className="mydonationbody">
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
                                    navigate('/checkpoints');
                                }}>Update Checkpoints</Button>

                            </Card.Text>

                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}