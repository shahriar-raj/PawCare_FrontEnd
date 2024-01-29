import React from "react";
import { useState } from 'react'
import { Card, List, Button, Avatar, Steps, Row, Col } from 'antd';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons';
import './DonationDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export function DonationDetail(props) {
    
    const donationDetails = {
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
            "path/to/fifth/image.jpg",
            
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





    return (
        <div className="donation-detail-top">
           
                
                
                {/*  Donation Details */}


                <div className="donation-details-container"  style={{ backgroundColor: "#192928" }}>
                    <Card className="detail-card" style={{ color: "#CEDFB9" }}>
                        <div className="card-header">
                            <div className="verified-by-admins">
                                {donationDetails.verified && (
                                    <span className="verified" >
                                        <h3 style={{paddingLeft:"30%"}}> <CheckCircleFilled /> Verified By Admins</h3> 
                                    </span>
                                )}
                            </div>
                            <div className="back-button">
                                    <LeftOutlined /> {/* This icon could be a link back to the previous page */}
                            </div>
                            <div className="details-header">
                                    <h2>Details</h2>
                            </div>
                        </div>

                
                        <List>
                            <List.Item className="detail-item" style={{ color: "#CEDFB9" }}>
                                <strong>Name:</strong> {donationDetails.name}
                            </List.Item>
                            <List.Item>
                                <strong>Owner/ Donation Requested By:</strong> {donationDetails.owner}
                            </List.Item>
                            <List.Item>
                                <strong>Requested Amount:</strong> ৳ {donationDetails.amount}
                            </List.Item>
                            <List.Item>
                                <strong>Description:</strong> {donationDetails.description}
                            </List.Item>
                            <List.Item>
                                    <Row>
                                        <Col span={12}>
                                            <h4>Progress :</h4> <br/>
                                            {/* Steps component */}
                                            <Steps direction="vertical" current={1}>
                                                {steps.map((step, index) => (
                                                    <Steps key={index} title={step.title} description={step.description} />
                                                ))}
                                            </Steps>
                                        </Col>
                                        <Col span={12}>
                                            {/* Images */}
                                            <div className="details-images">
                                                <h4>Images:</h4>
                                                <div className="images-list">
                                                    {donationDetails.images.map((image, index) => (
                                                        <Avatar
                                                            key={index}
                                                            shape="square"
                                                            size={64}
                                                            src={image} // Replace src with the actual image path or URL
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </List.Item>
                        </List>
                        
                        {/* <div className="donate-button">
                            <Button type="primary" size="large">
                                Donate
                            </Button>
                        </div> */}
                    </Card>
                </div>
            </div>
       
    );
}