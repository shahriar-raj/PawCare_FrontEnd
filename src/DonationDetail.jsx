import React from "react";
import { useState } from 'react'
import { Card, List, Button, Avatar, Steps, Row, Col } from 'antd';
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons';
import './DonationDetail.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export function DonationDetail(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    let donationDetails = {
        name: "ECE Biral",
        owner: "ECE",
        amount: "5000",
        description:
            "The cat had a minor accident on 27/11/2023. So, we are requesting for donation of 5000 BDT. This will hopefully cover the expenses of the initial treatment and two months' medicines.",
        verified: true,
        images: [
            "path/to/first/image.jpg", // Replace with actual paths
            "path/to/second/image.jpg",
            "path/to/third/image.jpg",
            "path/to/fourth/image.jpg",
        ],
    };

    const description = 'This is a description.';
    const steps = [
        {
            title: 'Finished',
            description,
        },
        {
            title: 'Finished',
            description,
        },
        {
            title: 'In Progress',
            description,
        },
        {
            title: 'Waiting',
            description,
        },
    ];

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
                donationDetails.name = "ECE Biral";
                donationDetails.owner = result.UserName;
                donationDetails.amount = result.TotalAmount;
                donationDetails.description = result.Description;
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
        <div className="donation-detail-top">



            {/*  Donation Details */}


            <div className="donation-detail-container" style={{ backgroundColor: "#CEDFB9", margin: '150px' }}>
                <Card className="donation-detail-card" style={{ color: "#CEDFB9" }}>
                    <div className="card-header">
                        <div className="verified-by-admins">
                            {donationDetails.verified && (
                                <span className="verified" >
                                    <h1 style={{ fontWeight: 100, color: '#CEDFB9' }}>  Donation Details</h1>
                                    <h3 style={{ fontWeight: 50 }}> <CheckCircleFilled /> Verified By Admins</h3>
                                </span>
                            )}
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
                        <List.Item className="detail-item">
                            <strong>Name:</strong> {donationDetails.name}
                        </List.Item>
                        <List.Item className="detail-item" >
                            <strong>Owner/ Donation Requested By:</strong> {donationDetails.owner}
                        </List.Item>
                        <List.Item className="detail-item">
                            <strong>Requested Amount:</strong> ৳ {donationDetails.amount}
                        </List.Item>
                        <List.Item className="detail-item">
                            <strong>Description:</strong> {donationDetails.description}
                        </List.Item>
                        <List.Item>
                            <Row>
                                <Col span={12}>
                                    <h4 className="greenColor">Progress :</h4> <br />
                                    {/* Steps component */}
                                    <Steps direction="vertical" current={1}>
                                        {steps.map((step, index) => (
                                            <Steps.Step key={index} title={step.title} description={step.description} />
                                        ))}
                                    </Steps>
                                </Col>
                                <Col span={12}>
                                    {/* Images */}
                                    <div className="details-images">
                                        <h4 className="greenColor">Images:</h4>
                                        <div className="images-list">
                                            {donationDetails.images.map((image, index) => (
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