import React from "react";
import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddVaccine.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// Import your image if necessary - make sure the path is correct
// import image from './assets/cat1.png';

const { Option } = Select;

export function AddVaccine() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    // Handle changing the dropdown selection
    const handleChange = (value) => {
        setSelectedId(value); // Or handle the change as needed
      };

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    petID: localStorage.getItem('petID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/scheduleVaccine', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                // setData(result.slots)
                setData(result.application);
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
                petID: localStorage.getItem('petID'),
                userID: localStorage.getItem('userID'),
                dose: values['dose'],
                interval: values['interval'],
                vaccineName: selectedId,
            }
            const response = await fetch('http://3.89.30.159:3000/profile/addToVaccineSchedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            console.log(obj);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // props.setData(data);
                navigate('/petprofile');
            }
            else if (response.status === 401) {
                alert("Add Vaccination Failed")
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
        <div className="vac-form-container">
            <h1 className="vac-header">Add Vaccination Schedule</h1>
            <Card className="vac-card">
                <Select
                    showSearch
                    style={{ width: 300}}
                    placeholder="Select an option"
                    optionFilterProp="children"
                    onChange={handleChange}
                >
                    {data.map(item => (
                        <Select.Option key={item.ID} value={item.Name}>{item.Name}</Select.Option>
                    ))}
                </Select>
                <Form
                    form={form}
                    name="vaccination"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                >
                    <Form.Item
                        name="dose"
                        label="Number of Doses"
                        rules={[
                            { required: true, message: "Please input number of doses" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="interval"
                        label="Interval(in months) between doses"
                        rules={[{ required: true, message: "Please input interval" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} htmlType="submit">
                            Add Schedule
                        </Button>
                    </Form.Item>
                </Form>
                <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} onClick={() => navigate('/petprofile')}>
                    Back
                </Button>
            </Card>

        </div>
    );
}
