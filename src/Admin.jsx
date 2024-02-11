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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Admin(props) {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [imageList, setImageList] = useState('');
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
                console.log(result);
                setData(result.donationDetails.userDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    const approve = async (donationID) => {
        try {
            let obj = {
                donationID: donationID
            }
            const response = await fetch('http://3.89.30.159:3000/admin/approvingDonations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('Donation Approved');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const reject = async (donationID) => {
        try {
            let obj = {
                donationID: donationID
            }
            const response = await fetch('http://3.89.30.159:3000/admin/rejectDonations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('Donation Rejected');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div>
            <div className="admin_header">
                <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button className='logout-admin' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} >
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
                        <CircleImage src={"https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/AdminImages%2Fphoto_2024-02-12_02-48-31.jpg?alt=media&token=39c345d1-3281-4a89-b759-76283c924f9b"} alt="Profile Picture" diameter="120px" />
                    </div>
                    <h2 className="name">Shahriar Raj</h2>
                    <h3 className="name">Mohammadpur</h3>
                    <Button className="p_button-admin" style={{ backgroundColor: "#011425", color: "white", fontFamily: "Baloo Da" }} >
                        Notifications
                    </Button>
                </div>
                <div className="second-column-admin">
                    {data.map((donation) => (
                        <Card className='donation-card-admin' key={donation.DonationID}>
                            {/* <Card.Img variant="top" src={donation.Image} /> */}
                            <Card.Body>
                                Requested By
                                <Avatar
                                    src="./src/assets/cutu.png"
                                    size={80}
                                    alt="Pet"
                                    style={{ position: 'relative', marginLeft: '60%' }}
                                />
                                <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{donation.Username} </Card.Title>
                                <Card.Text style={{ display: 'flex' }}>
                                    {donation.Description}
                                    <br />
                                    Total Amount: {donation.TotalAmount}
                                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "30%" }} onClick={() => {
                                        localStorage.setItem('DonationID', donation.DonationID);
                                        navigate('/donationdetails');
                                    }}>Details</Button>
                                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "5%" }} onClick={()=>{approve(donation.DonationID)}}>
                                        ✔ Accept
                                    </Button>
                                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "5%" }} onClick={()=>{reject(donation.DonationID)}}>
                                        x Reject
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