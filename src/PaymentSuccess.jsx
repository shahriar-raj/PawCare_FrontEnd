import React from 'react';
import { useParams } from 'react-router-dom';
import './PaymentSuccess.css';
import { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

export function PaymentSuccess() {
    const { tran_id } = useParams(); // Access route parameter
    const navigate = useNavigate();

    return (
        <div className="SuccessMessage">
            <h1>Donation Successful</h1>
            <h2>Your transaction ID: {tran_id}</h2>
            <Button style={{backgroundColor:"green", color:"white"}} onClick={()=>{navigate('/donation')}}>Continue</Button>
        </div>
    );
}