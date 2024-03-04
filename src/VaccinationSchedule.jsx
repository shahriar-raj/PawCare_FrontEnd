import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./VaccinationSchedule.css";
import { Button, Divider, Flex, Radio, Avatar, Select, message } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';


export function VaccinationSchedule(props) {
    const [myState, setMyState] = useState(0); 
    const [data, setData] = useState([]);
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleLog = () => {
        navigate('/');
    }

    const addDose = async (id) => {
        try {
            let obj = {
                appointmentID: id
            }
            const response = await fetch('http://3.89.30.159:3000/profile/incrementDose', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const result = await response.json(); // Assuming the response is in JSON format
            console.log(result);
            // Update state with the result
            if (response.status === 200) {
                setMyState(myState + 1);
                message.success('Dose added successfully');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/viewAllScheduledVaccines', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, [myState]);

    return (
        <div>
            <div className="container">

                <p style={{ marginLeft: '10%', color: "#192928", fontFamily: 'Baloo Da', fontSize: '1.5em' }}> <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25", marginRight: "20%" }} onClick={() => navigate('/profile')}>
                    Back
                </Button>Scheduled Vaccines</p>
                <hr />
                <div className="schedbody">
                    <div className="schedbodyleft">
                        {data.map((vaccine) => (
                            <Card className='sched-card' key={vaccine.ID}>
                                <Card.Body>
                                    <Card.Title style={{ fontFamily: 'Baloo Da', fontSize: '2.0em' }}>{vaccine.PetName} </Card.Title>
                                    <Card.Text style={{ display: 'flex' }}>
                                        Vaccine: {vaccine.VaccineName}
                                        <br />
                                        Total Dose: {vaccine.Dose}
                                        <br />
                                        Completed Dose: {vaccine.CompletedDose}
                                    </Card.Text>
                                    <Button className="VS" style={{ fontFamily: 'Baloo Da', backgroundColor: "#cedfb9" }} onClick={() => { addDose(vaccine.ID) }}>
                                        Vaccinate
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <div className="schedbodyright">
                    </div>
                </div>
            </div>
        </div >
    )
}