import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./RescuersApplications.css";
import { Button, Divider, Flex, Radio, Avatar, Select } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function RescuersApplications(props) {

    const statusOptions = [
        { value: '', label: 'All' },
        { value: 0, label: 'Rejected' },
        { value: 1, label: 'Accepted' },
        { value: 2, label: 'Pending' },
    ];

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                }
                const response = await fetch('http://3.89.30.159:3000/admin/showRescuerList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                console.log(result);
                setData(result.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    function renderStatus(application) {
        if (application.ApprovalStatus === 2) {
            return (
                <div>
                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginBottom: "3%" }} onClick={() => { approve(application.UserID) }}>
                        ✔ Accept
                    </Button>
                    <Button style={{ backgroundColor: "#cedfb9", borderColor: "#192928", marginLeft: "5%", marginBottom: "3%" }} onClick={() => { reject(application.UserID) }}>
                        x Reject
                    </Button>
                </div>
            )
        }
        else if (application.ApprovalStatus === 1) {
            return (
                <div>
                    <span style={{ color: "green", fontFamily: "Baloo Da", fontSize: "large" }}>✔ Accepted</span>
                </div>
            )
        }
        else if (application.ApprovalStatus === 0) {
            return (
                <div>
                    <span style={{ color: "red", fontFamily: "Baloo Da", fontSize: "large" }}>x Rejected</span>
                </div>
            )
        }
    }

    const approve = async (UserID) => {
        try {
            let obj = {
                userID: UserID,
            }
            const response = await fetch('http://3.89.30.159:3000/admin/approveRescuers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('Application Approved');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const reject = async (UserID) => {
        try {
            let obj = {
                userID: UserID,
            }
            const response = await fetch('http://3.89.30.159:3000/admin/rejectRescuers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                alert('Application Rejected');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div>
            <div className="rescue_application_header">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='logout-admin' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }} onClick={() => { navigate('/') }}>
                    Logout
                </Button>
                <Button className='User-admin' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/users') }}>
                    Users
                </Button>
                <Button className='DonationRequests' style={{ backgroundColor: "#1f4959", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/admin') }} >
                    Donation Requests
                </Button>
            </div>
            <div className="container_res_app">
                <div className="first-column-res_app">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#011425" }}>Admin</h1>
                    <div className='profileImg'>
                        <CircleImage src={"https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/AdminImages%2F342748762_6123844901032672_6967190747107568055_ncz.jpg?alt=media&token=6763ddc7-8a4e-4805-910e-cc0f1c0df9b6"} alt="Profile Picture" diameter="120px" />
                    </div>
                    <h2 className="name">Shahriar Raj</h2>
                    <h3 className="name">Mohammadpur</h3>
                    <Button className="p_button-res_app" style={{ backgroundColor: "#011425", color: "white", fontFamily: "Baloo Da" }} >
                        Notifications
                    </Button>
                    <div className="select_status">Status</div>
                    <Select
                        className="filter_status_res_app"
                        placeholder="Select Status"
                        options={statusOptions}
                        value={status}
                        onChange={setStatus}
                    />
                </div>
                <div className="second-column-res_app">
                    {data.map((application) => {
                        if (status === "" || application.ApprovalStatus === status) {
                            console.log(application.ApprovalStatus);
                            return (
                                <Card className='res_app_admin' key={application.ID}>
                                    <Card.Img variant="top" src={application.URL} width={100} />
                                    <Card.Body>
                                        Application By : {application.Name}
                                        {/* <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{application.Username} </Card.Title> */}
                                        <Card.Text style={{ display: 'flex' }}>
                                            Above 18 years: {application.AdultStatus === 1 ? "Yes" : "No"}
                                            <br />
                                            Does the person own a pet: {application.PetOwnStatus === 1 ? "Yes" : "No"}
                                            <br />
                                            Experience: {application.Experience}
                                        </Card.Text>
                                        {renderStatus(application)}
                                    </Card.Body>
                                </Card>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}