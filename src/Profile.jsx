import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export function Profile(props) {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [imageList, setImageList] = useState([]);
    const navigate = useNavigate();
    const handleLog = () => {
        navigate('/');
    }
    const add = () => {
        navigate('/addPet');
    }

    useEffect(() => {
        // Function to fetch data from the API
        
        
        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result.userDetails.userPets);
                setName(result.userDetails.userDetails.Username);
                setAddress(result.userDetails.userDetails.Address);
                listAll(ref(storage, 'images/' + result.userDetails.userDetails.Email + '/')).then((response) => {
                    console.log(response);
                    response.items.forEach((itemRef) => {
                        getDownloadURL(itemRef).then((url) => {
                            setImageList(url);
                            console.log(url);
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const deletePet = async (petID) => {
        try {
            console.log(petID);
            let obj = {
                userID: localStorage.getItem('userID'),
                petID: petID
            }
            console.log(obj);
            const response = await fetch('http://3.89.30.159:3000/profile/removePet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const result = await response.json(); // Assuming the response is in JSON format
            window.location.reload();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="profile_header">
                <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button className='logout' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "30%" }} onClick={handleLog}>
                    Logout
                </Button>
                <Button className='Donation' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    Donation
                </Button>
                <Button className='Adoption' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    Adoption
                </Button>
                <Button className='Notification' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/notifications') }}>
                    Notification
                </Button>
                <Button className='About' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    About
                </Button>
                          
            </div>
            <div className="container_profile">
                <div className="first-column">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#192928" }}>Profile</h1>
                    <div className='profileImg'>
                        <CircleImage src={imageList} alt="Profile Picture" diameter="120px" />
                    </div>
                    <h2 className="name">{name}</h2>
                    <h3 className="name">{address}</h3>
                    <Button className="p_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} >
                        Edit Profile
                    </Button>
                </div>
                <div className="second-column">
                    <div className="row top-row">
                        {/* <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#192928" }}>Pets</h1> */}
                        {
                            data.map((item) => (
                                <div key={item.PetID} className='pet-card-container'>
                                    <Card className="petCard" >
                                        <Card.Body>
                                            <div className="pet-info-profile">
                                                <Avatar size={100} src={item.URL} className="pet-avatar" />
                                                <div className="pet-details">
                                                    <h1 className="pet-name">{item.Name}</h1>
                                                    {item.Breed}<br />
                                                    Age: {item.Age} Months
                                                </div>
                                            </div>
                                            <Button className="delete-profile-btn" type="primary" onClick={() => deletePet(item.PetID)}>
                                                <DeleteOutlined />
                                            </Button>
                                            <Button className="view-profile-btn" type="primary" onClick={() => {
                                                localStorage.setItem('petID', item.PetID);
                                                localStorage.setItem('petName', item.Name);
                                                localStorage.setItem('petAge', item.Age);
                                                localStorage.setItem('petBreed', item.Breed);
                                                navigate('/petprofile')
                                            }}>
                                                View Profile
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                    <div className="row bottom-row">
                        <Button type="dashed" style={{ width: "30%", height: "20%", marginTop: "10%", backgroundColor: "#192928", color: "#cedfb9", fontFamily: "Baloo Da", fontSize: "x-large" }} onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Pet
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}