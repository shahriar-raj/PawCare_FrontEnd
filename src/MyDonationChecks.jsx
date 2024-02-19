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

    const toggleChecked = (id) => {
        const updatedSubpoints = data.map(subpoint => {
            if (subpoint.SubPointNumber === id) {
                return { ...subpoint, Checked: !subpoint.Checked };
            }
            return subpoint;
        });

        setData(updatedSubpoints);
    };

    const updateCheckpoints = async() =>{
        let obj ={
            subPoints: data,
        }
        const response = await fetch('http://3.89.30.159:3000/donation/updateDonationSubPoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        if(response.status === 200){
            navigate('/mydonation');
        }
        else{
            console.log("Error updating checkpoints");
        }
    }

    return (
        <div >
            <Card className='Checkpoints'>
                <Card.Body>
                    <Card.Title><h2>Donation Checkpoints</h2></Card.Title>
                    {data.map((subpoint) => (
                        <div key={subpoint.SubPointNumber} className="mb-2">
                            <input
                                type="checkbox"
                                checked={subpoint.Checked}
                                onChange={() => toggleChecked(subpoint.SubPointNumber)}
                                className="me-2"
                            />
                            {subpoint.Reason}
                        </div>
                    ))}
                </Card.Body>
                <Card.Footer>
                    <Button type="primary" onClick={()=>{updateCheckpoints}} style={{marginLeft:"20%", marginTop:"5%"}}>Submit</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}