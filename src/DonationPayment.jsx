import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Card, Radio, Progress, List, Row, Col } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { Navbar, Nav, Container } from 'react-bootstrap';
// import 'antd/dist/antd.css'; // Make sure to include Ant Design styles
import './DonationPayment.css'; // Ensure this CSS file has the required styles


export function DonationPayment() {



    const handleLog = () => {
        navigate('/');
    }


    const paymentMethods = [
        { name: "VISA", logo: "visa-logo.png" },
        { name: "Mastercard", logo: "mastercard-logo.png" },
        { name: "AMEX", logo: "amex-logo.png" },
        { name: "Apple Pay", logo: "applepay-logo.png" },
        { name: "PayPal", logo: "paypal-logo.png" },
        { name: "Gift Card", logo: "giftcard-logo.png" },
        { name: "IN Card", logo: "incard-logo.png" }
    ];

    const [donationAmount, setDonationAmount] = useState('');
    
    // This would be fetched or calculated from your state or backend
    const totalRaised = 40;
    const goalAmount = 100;

    const onAmountChange = e => {
        setDonationAmount(e.target.value);
    };

    const handleSubmit = () => {
        console.log(donationAmount);
        // Handle the submit action (e.g., send the donationAmount to backend)
    };



    const progressPercent = (totalRaised / goalAmount) * 100;

    // let progressColorClass = '';

    // if (progressPercent > 20) {
    //     progressColorClass = 'yellow-progress';
    // } else if (progressPercent > 75) {
    //     progressColorClass = 'green-progress';
    // }


    const [customMessage, setCustomMessage] = useState('');

    const onMessageChange = e => {
        setCustomMessage(e.target.value);
    };




    return (
        




        <div className="donation-payment-container">
             <div className="profile_header">
                <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button className='logout' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} onClick={handleLog}>
                    Logout
                </Button>
                <Button className='Donation' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    Donation List
                </Button>
            </div>

            
    
            
            <Row style={{margin:'1.5%'}}>
                <Col span={4}>
                </Col>
                <Col span={16}>
                    {/* First Card */}
                            <Card>
                                
                                <h1>🚨URGENT🚨: RESCUE UNDERWAY!</h1>

                                <h3>999 Souls Production's fundraiser for Happy Life Animal Rescue</h3>
                                We're raising money to help ensure that ....
                                <Progress 
                                    percent={progressPercent} 
                                    status="active" 
                                    className="progress-bar"   
                                />

                                <h3>Choose amount</h3>
                                <Radio.Group defaultValue={5} buttonStyle="solid" onChange={onAmountChange}>
                                    <Radio.Button value={10}>$10</Radio.Button>
                                    <Radio.Button value={20}>$20</Radio.Button>
                                    <Radio.Button value={50}>$50</Radio.Button>
                                    <Radio.Button value={75}>$75</Radio.Button>
                                    <Radio.Button value={100}>$100</Radio.Button>
                                    <Radio.Button value={250}>$250</Radio.Button>
                                    <Radio.Button value={500}>$500</Radio.Button>
                                    <Radio.Button value={1000}>$1000</Radio.Button>
                                </Radio.Group>

                                <Form.Item label="Custom Amount ($)" className="custom-amount-input">
                                    <Input placeholder="Other" onChange={onAmountChange} />
                                </Form.Item>


                                <Form.Item label="Leave a message (optional)">
                                    <Input.TextArea
                                        placeholder="Your message to the charity"
                                        onChange={onMessageChange}
                                        value={customMessage}
                                        rows={3}
                                        className="optional-msg-text-box"
                                    />
                                </Form.Item>




                                <Form.Item>
                                    <Checkbox>Allow the charity to contact you?</Checkbox>
                                </Form.Item>

                                <Button 
                                    type="primary" 
                                    onClick={handleSubmit}
                                    className="donate-button"
                                >
                                    Donate {donationAmount ? `$${donationAmount}` : ''}
                                </Button>

                                
                                <span className="muted-text">100% of donations go directly to support the cause</span>
                            </Card>
                </Col>

            </Row>
        </div>
    );
}



         