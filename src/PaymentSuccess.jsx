import React from 'react';
import { useParams } from 'react-router-dom';
import './PaymentSuccess.css';
import { useEffect } from 'react';

export function PaymentSuccess() {
    const { tran_id } = useParams(); // Access route parameter
    // useEffect(() => {
    //     // Function to fetch data from the API
    //     const fetchData = async () => {
    //         try {
    //             console.log(tran_id);
    //             const response = await fetch('http://3.89.30.159:3000/donation/donationSuccess/:tran_id', {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const result = await response.json(); // Assuming the response is in JSON format
    //             console.log(result);
    //         }
    //         catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     // Call the fetchData function
    //     fetchData();
    // }
    //     , []);

    return (
        <div >
            <h1>Donation Success</h1>
            <p>Your transaction ID: {tran_id}</p>
        </div>
    );
}