import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Vet.css";
import { Button, Divider, Flex, Radio, Avatar, message } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Vet(props) {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [imageList, setImageList] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                    vetID: localStorage.getItem('VetID'),
                }
                const response = await fetch('http://3.89.30.159:3000/vet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                console.log(result);
                setData(result);
                setData1(result.vetRequests);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    const reject = async (ReqID) => {
        try {
            let obj = {
                requestID: ReqID
            }
            const response = await fetch('http://3.89.30.159:3000/vet/rejectRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                message.info('Appointment Cancelled');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div>
            <div className="vet_header">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='logout-vet' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} onClick={() => { navigate('/') }}>
                    Logout
                </Button>
            </div>
            <div className="container_vet">
                <div className="first-column-vet">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#011425" }}>Vet</h1>
                    <div className='profileImg'>
                        <CircleImage src={data.vetURL} alt="Profile Picture" diameter="120px" />
                    </div>
                    <h2 className="name">{data.vetName}</h2>
                </div>
                <div className="second-column-vet">
                    {data1.map((requests) => (
                        <Card className='app-card-vet' key={requests.ReqID}>
                            {/* <Card.Img variant="top" src={donation.Image} /> */}
                            <Card.Body>
                                <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{requests.Date.split('T')[0]} </Card.Title>
                                <Card.Text style={{ display: 'flex' }}>
                                    {requests.ProblemDescription}
                                    <br />
                                    Time: {requests.RequestedSlot}:00
                                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "5%" }} onClick={() => { reject(requests.ReqID) }}>
                                        x Cancel
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}