import React from "react";
import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './VetAppointmentForm.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// Import your image if necessary - make sure the path is correct
// import image from './assets/cat1.png';

const { Option } = Select;

export function VetAppointmentForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [time, setTime] = useState([]);
    
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    vetID: localStorage.getItem('vetID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/getSpecificVet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                // setData(result.slots);
                let newTimes = []; // Temporary array to hold the new times
                for (let i = result.slots[0].StartTime; i <= result.slots[0].EndTime; i++) {
                    newTimes.push(i); // Add each time to the temporary array
                }

                setTime(newTimes);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

    const onFinish = async (values) => {
        console.log('Received values of form:', values);
        try {
            let obj = {
                userID: localStorage.getItem('userID'),
                vetID: localStorage.getItem('vetID'),
                requestedSlot: values['time'],
                date: values['date'],
                problemDescription: values['description'],
                petName: values['pet'],
            }
            const response = await fetch('http://3.89.30.159:3000/profile/applyForVet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });


            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // props.setData(data);
                navigate('/vetappointment');
                // Handle response here
            }
            else if (response.status === 401) {
                alert("Appointment Failed")
            }
            else {
                // Handle HTTP errors here
                console.error("HTTP Error:", response);
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle network errors here
        }
    };

    return (
        <div className="app-form-container">
            <h1 className="app-header">Registration</h1>
            <Card className="app-card">
                <Form
                    form={form}
                    name="appointment"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                >
                    <Form.Item
                        name="pet"
                        label="Pet's Name"
                        rules={[
                            { required: true, message: "Please input your pet's name!" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Problem Description"
                        rules={[{ required: true, message: "Please input your pet's problem !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: "Please select a date!" }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true, message: "Please select a time!" }]}
                    >
                        <Select
                            placeholder="Select a time"
                            allowClear
                        >
                            {time.map((time1) => (
                                <Option value={time1}>{time1}:00</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} htmlType="submit">
                            Book Appointment
                        </Button>
                    </Form.Item>
                </Form>
                <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} onClick={() => navigate('/vetappointment')}>
                    Back
                </Button>
            </Card>

        </div>
    );
}
