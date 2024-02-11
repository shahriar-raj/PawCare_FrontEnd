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
        <div >
            <h1>Donation Success</h1>
            <p>Your transaction ID: {tran_id}</p>
            <Button onClick={()=>{navigate('/donation')}}>Continue</Button>
        </div>
    );
}