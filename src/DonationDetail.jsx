import React from "react";
import { useState } from 'react'
import { Card, List, Button, Avatar, Steps, Row, Col } from 'antd';
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons';
import './DonationDetail.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export function DonationDetail(props) {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [donationDetails, setDonationDetails] = useState('');
    const [donationAmount, setDonationAmount] = useState(0);
    const description = 'This is a description.';
    const [steps, setSteps] = useState([]);
    const donationimages = [
        "path/to/image1.jpg",
        "path/to/image2.jpg",
        "path/to/image3.jpg",
        "path/to/image4.jpg",
    ]

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    donationId: localStorage.getItem('DonationID'),
                }
                const response = await fetch('http://44.222.207.156:3000/donation/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                // Update state with the result
                setData(result.donation.Username);
                setDonationDetails(result.donation.Description);
                setDonationAmount(result.donation.TotalAmount);
                setSteps(result.subSteps);
                console.log(steps);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    return (
        // <div></div>
        <div className="donation-detail-top">



            {/*  Donation Details */}


            <div className="donation-detail-container" style={{ backgroundColor: "#CEDFB9" }}>
                <Card className="donation-detail-card" style={{ color: "#CEDFB9" }}>
                    <div className="card-header">
                        <div className="verified-by-admins">
                            <span className="verified" >
                                <h1 style={{ fontWeight: 100, color: '#CEDFB9' }}>  Donation Details</h1>
                                <h3 style={{ fontWeight: 50 }}> <CheckCircleFilled /> Verified By Admins</h3>
                            </span>
                        </div>
                        <div className="back-button">
                            <Button className="go-back-btn">
                                <LeftOutlined /> Go Back
                            </Button>
                        </div>
                        <div className="details-header">
                            <h2>Details</h2>
                        </div>
                    </div>


                    <List>
                        <List.Item className="detail-item" >
                            <strong>Owner/ Donation Requested By:</strong> {data}
                        </List.Item>
                        <List.Item className="detail-item">
                            <strong>Requested Amount:</strong> ৳ {donationAmount}
                        </List.Item>
                        <List.Item className="detail-item">
                            <strong>Description:</strong> {donationDetails}
                        </List.Item>
                        <List.Item>
                            <Row>
                                <Col span={12}>
                                    <h4 className="greenColor">Progress :</h4> <br />
                                    {steps.map((step) => (
                                        <div key={step.SubStepNumber} style={{ fontFamily: "Baloo Da", fontSize: "large" }} >
                                            {step.Checked
                                                ? <p style={{ color: "green" }}><CheckOutlined />{step.Reason}</p>
                                                : <p style={{ color: "red" }}><CloseOutlined />{step.Reason}</p>
                                            }
                                        </div>
                                    ))}
                                </Col>
                                <Col span={12}>
                                    {/* Images */}
                                    <div className="details-images">
                                        <h4 className="greenColor">Images:</h4>
                                        <div className="images-list">
                                            {donationimages.map((image, index) => (
                                                <Avatar
                                                    key={index}
                                                    shape="square"
                                                    size={100}
                                                    src={image} // Replace src with the actual image path or URL
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </List.Item>
                    </List>

                    <div className="donate-button">
                        <Button block type="primary" size="large" style={{ marginTop: '10px' }}>
                            Donate
                        </Button>
                    </div>
                </Card>
            </div>
        </div>

    );
}