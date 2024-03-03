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
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { faHotel, faUser, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
    const handleNavigate = (path) => () => {
        navigate(path);
    };

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

    const adoptpet = async (petID) => {
        try {
            console.log(petID);
            let obj = {
                petID: petID,
                userID: localStorage.getItem('userID')
            }
            console.log(obj);
            const response = await fetch('http://3.89.30.159:3000/profile/giveAdoption', {
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
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='Profile active' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "7%" }} onClick={() => { navigate('/profile') }}>
                    My Profile
                </Button>
                <Button className='Donation' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
                    Donate For Pets
                </Button>
                <Button className='Adoption' icon={<FontAwesomeIcon icon={faHome} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/adoption') }}>
                    Adopt a Pet
                </Button>
                <Button className='Notification' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                    Notifications
                </Button>
                <Button className='Forum' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                    Forum
                </Button>
                <Button className='BookHostel' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                    Book a Hostel
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "3%" }} onClick={handleLog}>
                    Logout
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
                        <Button className="m_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} onClick={() => navigate('/getmessages')}>
                            Messages
                        </Button>
                        <Button className="r_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} onClick={() => navigate('/rescuerapply')}>
                            Rescuers List
                        </Button>
                    </div>
                </div>
                <div className="second-column">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#192928" }}>My Pets</h1>

                    <div className="scrollable-row">
                        {
                            data.map((item) => (
                                <div key={item.PetID} className='pet-card-container'>
                                    <Card className="petCard" style={{ width: "25%" }}>
                                        <Card.Body>
                                            <div className="pet-info-profile">
                                                <Avatar size={100} src={item.URL} className="pet-avatar" style={{ marginLeft: "29%", marginTop: '5%' }} />
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
                                            {
                                                item.AdoptionStatus === 1 ? <div className="adoption-status">
                                                    <Button className="adopt-btn" type="primary" onClick={() => adoptpet(item.PetID, item.UserID)} >
                                                        Give for Adoption
                                                    </Button>
                                                </div> : <div className='up-adopt'>
                                                    Up for Adoption
                                                </div>

                                            }
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))

                        }

                    </div>
                    <div className="scroll-controls">
                        <Button style={{
                            paddingBottom: "1%", paddingTop: "1%", textAlign: 'center',
                            width: "20%", height: "8vh", backgroundColor: "#192928",
                            color: "#cedfb9", fontFamily: "Baloo Da", fontSize: "x-large"
                        }}
                            onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Pet
                        </Button>
                    </div>

                </div>
            </div>
        </div>

    )
}