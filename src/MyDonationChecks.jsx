import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./MyDonationChecks.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export function MyDonationChecks(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    donationid: localStorage.getItem('DonationID'),
                }
                const response = await fetch('http://3.89.30.159:3000/donation/getDonationSubPoints', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                // Update state with the result
                setData(result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);


    return (
        <div>
            {data.map((donation) => (
                <div>
                    {donation.Reason}
                </div>
            ))}
        </div>
    )
}