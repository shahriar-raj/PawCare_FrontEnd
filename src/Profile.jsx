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




    // Scroll Functions
    const scrollAmount = 200; // You can adjust this value

    const scrollLeft = () => {
        document.querySelector('.scrollable-row').scrollLeft -= scrollAmount;
    };

    const scrollRight = () => {
        document.querySelector('.scrollable-row').scrollLeft += scrollAmount;
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
                <Button className='Adoption' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/adoption') }}>
                    Adoption
                </Button>
                <Button className='Notification' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/notifications') }}>
                    Notification
                </Button>
                <Button className='About' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/about') }}>
                    About
                </Button>
                          
            </div>
            <div className="container_profile">
                <div className="first-column">
                    <div className='profile-card'>
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
                </div>
                <div className="second-column">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#192928" }}>My Pets</h1>
                    
                    <div className="scrollable-row top-row">
                        {
                            data.map((item) => (
                                <div key={item.PetID} className='pet-card-container'>
                                    <Card className="petCard" style={{ width: "25%" }}>
                                        <Card.Body>
                                            <div className="pet-info-profile">
                                                <Avatar size={100} src={item.URL} className="pet-avatar" style={{marginLeft:"29%", marginTop:'5%'}} />
                                            </div>
                                            <div className="pet-details">
                                                <h1 className="pet-name">{item.Name}</h1>
                                                {item.Breed}<br />
                                                Age: {item.Age} Months
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
                    <div className="scroll-controls">
                            <Button onClick={scrollLeft} className="scroll-btn"><span className='scoll-sign'> &lt; </span> </Button>
                            <Button style={{ width: "20%", height: "100%", backgroundColor: "#192928", color: "#cedfb9", fontFamily: "Baloo Da", fontSize: "x-large" }} onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Pet
                            </Button>
                            <Button onClick={scrollRight} className="scroll-btn"> <span className='scoll-sign'> &gt; </span></Button>
                    
                    </div>
                    <div className="row bottom-row">
                        
                        
                    </div>
                </div>
            </div>
        </div>

    )
}