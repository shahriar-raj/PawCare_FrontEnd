import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";
import { Button, Divider, Flex, Radio, Avatar, Input } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { faHotel, faUser, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Wishlist(props) {
    const [data, setData] = useState([]);
    const [inputReply, setInputReply] = useState('');
    const [inputReply1, setInputReply1] = useState('');
    const [replyUpdateTrigger, setReplyUpdateTrigger] = useState(0);
    const navigate = useNavigate();

    const addReply = async () => {
        setInputReply('');
        setInputReply1('');
        setReplyUpdateTrigger(oldTrigger => oldTrigger + 1);
        try {
            let obj = {
                userID: localStorage.getItem('userID'),
                petType: inputReply,
                breed: inputReply1,
            }
            const response = await fetch('http://3.89.30.159:3000/profile/addwishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const result = await response.json(); // Assuming the response is in JSON format
            console.log(result);
            // window.location.reload();
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChange = (event) => {
        setInputReply(event.target.value);
    };

    const handleChange1 = (event) => {
        setInputReply1(event.target.value);
    };

    useEffect(() => {
        // Function to fetch data from the API


        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setData(result.result);
                console.log(result.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [replyUpdateTrigger]);

    return (
        <div>
            <div className="container_wishlist">
                <h1 className="wishlist-header">Wishlist</h1>
                <div>
                    {data.map((item) => (
                        <div key={item.ID}>
                            <Card className="wishlistCard">
                                <Card.Body>
                                    <Card.Title>Type: {item.PetType}</Card.Title>
                                    <Card.Text>
                                        Breed: {item.Breed}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <span style={{ color: "black" }}> Add To wishlist </span>
                <div className="add-container">
                    <form>
                        <span style={{ color: "black" }}> PetType:</span>
                        <Input
                            type="text"
                            id="inputField"
                            value={inputReply}
                            onChange={handleChange}
                            style={{ width: "85%", marginTop: "2%", marginLeft: "5%", marginRight: "2%" }}
                        />
                        <br />
                        <span style={{ color: "black" }}> Breed:</span>
                        <Input
                            type="text"
                            id="inputField1"
                            value={inputReply1}
                            onChange={handleChange1}
                            style={{ width: "85%", marginTop: "2%", marginLeft: "5%", marginRight: "2%" }}
                        />
                        <Button style={{ backgroundColor: "#cedfb9" }}>
                            <SendOutlined onClick={() => { addReply() }} />
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    )
}