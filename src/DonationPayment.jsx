import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Card, Radio, Progress, List, Row, Col } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import 'antd/dist/antd.css'; // Make sure to include Ant Design styles
import './DonationPayment.css'; // Ensure this CSS file has the required styles


export function DonationPayment(props) {

    const handleLog = () => {
        navigate('/');
    }

    const [donationAmount, setDonationAmount] = useState('');
    const [totalRaised, setTotalRaised] = useState(20);
    const [goalAmount, setGoalAmount] = useState(100);
    const [donationMessage, setDonationMessage] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    // This would be fetched or calculated from your state or backend
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    donationId: localStorage.getItem('DonationID'),
                }
                console.log(obj);
                const response = await fetch('http://3.89.30.159:3000/donation/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                console.log(result);
                setTotalRaised(result.donation.ReceivedAmount);
                setGoalAmount(result.donation.TotalAmount);
                setDonationMessage(result.donation.Username);
                setDescription(result.donation.Description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    const onAmountChange = e => {
        setDonationAmount(e.target.value);
    };

    const handleSubmit = () => {
        console.log(donationAmount);
        // Handle the submit action (e.g., send the donationAmount to backend)
    };

    const progressPercent = Math.floor((totalRaised / goalAmount) * 100);

    let progressColorClass = '';

    if (progressPercent < 25) {
        progressColorClass = 'red-progress';
    } else if (progressPercent > 75) {
        progressColorClass = 'green-progress';
    }

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

            <Row style={{ margin: '1.5%' }}>
                <Col span={4}>
                </Col>
                <Col span={16}>
                    {/* First Card */}
                    <Card>

                        <h1>{description}</h1>

                        <h3>Donation Requested By<span style={{ color: "red" }}> {donationMessage} </span></h3>

                        <Progress
                            percent={progressPercent}
                            status="active"
                            className={progressColorClass}
                        />

                        <h3>Choose amount</h3>
                        <Radio.Group defaultValue={5} buttonStyle="solid" onChange={onAmountChange}>
                            <Radio.Button value={10}><span style={{ fontSize: '24px' }}>৳</span>10</Radio.Button>
                            <Radio.Button value={20}><span style={{ fontSize: '24px' }}>৳</span>20</Radio.Button>
                            <Radio.Button value={50}><span style={{ fontSize: '24px' }}>৳</span>50</Radio.Button>
                            <Radio.Button value={75}><span style={{ fontSize: '24px' }}>৳</span>75</Radio.Button>
                            <Radio.Button value={100}><span style={{ fontSize: '24px' }}>৳</span>100</Radio.Button>
                            <Radio.Button value={250}><span style={{ fontSize: '24px' }}>৳</span>250</Radio.Button>
                            <Radio.Button value={500}><span style={{ fontSize: '24px' }}>৳</span>500</Radio.Button>
                            <Radio.Button value={1000}><span style={{ fontSize: '24px' }}>৳</span>1000</Radio.Button>
                        </Radio.Group>

                        <Form.Item label="Custom Amount (৳)" className="custom-amount-input">
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
                            Donate {donationAmount ? `৳${donationAmount}` : ''}
                        </Button>

                        <span className="muted-text">100% of donations go directly to support the cause</span>
                    </Card>
                </Col>

            </Row>
        </div>
    );
}



