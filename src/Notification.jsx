import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import { Button, Divider, Flex, Radio, Avatar } from 'antd';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from "./firebase";
import { LeftCircleOutlined } from '@ant-design/icons';

export function Notification(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                    UserID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/showNotifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                const sortedNotifications = result.result.sort((a, b) => (a.ReadStatus) - (b.ReadStatus));
                setData(sortedNotifications);
                console.log(result);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }
        , []);  

    return (
        <div>
            <div className="notifications-post">
                
                <div className="notifications-header">
                    <h1>Notifications</h1>
                </div>
                
                <div className="notificationList">
                    {data.map((item) => (
                        <div className="notificationCard" key={item.CommentId}>
                            <Card className={item.ReadStatus === 0 ? 'notificationCardUnread' : 'notificationCardRead'}>
                                <Card.Body>
                                    <Card.Title>{item.ReadStatus === 0 ? 'Unread' : 'Read'}</Card.Title>
                                    <Card.Text>
                                        {item.Comments}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
 }
