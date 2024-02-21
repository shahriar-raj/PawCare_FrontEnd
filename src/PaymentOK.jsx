import React from 'react';
import { useParams } from 'react-router-dom';
import './PaymentOK.css'; // Ensure this file path is correct
import { Steps, Button } from 'antd';
import { useNavigate } from "react-router-dom";

// const { tran_id } = useParams(); // Access route parameter
// const navigate = useNavigate();

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

export function PaymentOK() {
    const navigate = useNavigate();
    
    return (
        <div className='payment-success-page'>
            <div className="payment-success-container">
                <div className="payment-success-card">
                    <h1>Payment Successful</h1>
                    {/* <h2>Your transaction ID: {tran_id}</h2> */}
                    <p> Transaction successful with proper processing. Thank you for choosing us...</p>
                    <div className="payment-success-steps">
                        <Steps current={4} items={steps} />
                    </div>
                    <div className="payment-success-actions">
                        <Button className="success-btn" onClick={() => navigate('/profile')}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
