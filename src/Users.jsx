import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./DonationList.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './Users.css';

export function Users() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                }
                const response = await fetch('http://3.89.30.159:3000/admin/showAllMembers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                setData(result.users);
                console.log(result);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }
        , []);

    const banUser = async (userID) => {
        try {
            let obj = {
                userID: userID
            }
            const response = await fetch('http://3.89.30.159:3000/admin/banMembers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('User Banned');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error banning user:', error);
        }
    }

    return (
        <div>
            <div className="container-users">
                <div className="admin_header">
                    <img src="src/assets/logo.png" alt="Logo" width="20%" />
                    <Button className='logout' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} onClick={() => { navigate('/') }}>
                        Logout
                    </Button>
                    <Button className='DonationRequests' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/admin') }} >
                        Donation Requests
                    </Button>
                </div>
                <div className="userbody">
                    <h1 style={{ marginLeft: '25%', color: "#011425", fontFamily: 'Baloo Da', fontSize: '1.5em' }}> Users List</h1>
                    {data.map((user) => (
                        <Card className='user-card' key={user.UserID}>
                            <Card.Body>
                                <Card.Title>{user.Username}</Card.Title>
                                <Card.Text>
                                         Email: {user.Email} <Button style={{marginLeft:"20%", color:"white", backgroundColor:"#9b0000", fontFamily:"Baloo Da", fontSize:"large"}} onClick={()=>{banUser(user.UserID)}}>Ban</Button>
                                         <br />
                                         Phone: {user.phone}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}   