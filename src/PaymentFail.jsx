import React from 'react';
import { useParams } from 'react-router-dom';
import './PaymentFail.css'; // Ensure this file path is correct
import { Steps, Button } from 'antd';
import { useNavigate } from "react-router-dom";

const steps = [
    {
        title: 'SSL Commerz',
        description : 'Connected'
    },
    {
        title: 'Transfering Funds',
        description : 'Via Payment-Gateway'
    },
    {
        title: 'Confirmation',
        description : 'for Succesful Payment'
    },
];

export function PaymentFail() {
    const navigate = useNavigate();
    
    return (
        <div className='payment-fail-page'>
            <div className="payment-fail-container">
                <div className="payment-fail-card">
                    <h1>Payment Unsuccessful</h1>
                    <p> Transaction failed due to a processing error. Please verify your details and retry...</p>
                    <div className="payment-fail-steps">
                        <Steps current={1} status="error" items={steps} />
                    </div>
                    <div className="payment-fail-actions">
                        <Button className="fail-btn" onClick={() => navigate('/donationpayment')}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
