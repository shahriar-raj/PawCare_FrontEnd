import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export function Admin(props) {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                }
                const response = await fetch('http://3.89.30.159:3000/admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);


    return (
        <div>
            <div className="admin_header">
                <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button className='logout-admin' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} onClick={handleLog}>
                    Logout
                </Button>
                <Button className='User-admin' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    Users
                </Button>
            </div>
            <div className="container_admin">
                <div className="first-column-admin">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#011425" }}>Admin</h1>
                    <div className='profileImg'>
                        <CircleImage src={imageList} alt="Profile Picture" diameter="120px" />
                    </div>
                    <h2 className="name">{name}</h2>
                    <h3 className="name">{address}</h3>
                    <Button className="p_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} >
                        Notifications
                    </Button>
                </div>
                <div className="second-column-admin">
                    
                </div>
            </div>
        </div>

    )
}