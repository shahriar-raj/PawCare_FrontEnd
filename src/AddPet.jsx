import React from "react";
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, InputNumber, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddPet.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";

export function AddPet(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Received values of form:', values);
        try {
            let obj = {
                UserID: localStorage.getItem('userID'),
                Name: values['name'],
                Type: values['type'],
                Breed: values['breed'],
                Age: values['age'],
                Gender: values['gender'],
                AdoptionStatus: "Adopted",
            }
            console.log(obj);
            const response = await fetch('http://44.222.207.156:3000/addPet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                console.log(data);
                props.setData(obj.UserID);
                navigate('/profile');
            }
            else if (response.status === 401) {
                alert("Registration Failed")
            }
            else {
                // Handle HTTP errors here
                console.error("HTTP Error:", response);
            }
        }
        catch (error) {
            console.error("Error:", error);
            // Handle network errors here
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="add-pet-form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                modifier: 'public',
            }}
        >
            <Form.Item
                name="name"
                label="Pet's Name"
                rules={[{ required: true, message: "Please input your pet's name!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="type"
                label="Pet's Type"
                rules={[{ required: true, message: "Please select your pet's type!" }]}
            >
                <Select placeholder="Select a type">
                    <Select.Option value="dog">Dog</Select.Option>
                    <Select.Option value="cat">Cat</Select.Option>
                    <Select.Option value="bird">Bird</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="breed"
                label="Pet's Breed"
                rules={[{ required: true, message: "Please input your pet's breed!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="age"
                label="Pet's Age (Years)"
                rules={[{ required: true, message: "Please input your pet's age!" }]}
            >
                <InputNumber min={0} max={100} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Pet's Gender"
                rules={[{ required: true, message: "Please select your pet's gender!" }]}
            >
                <Radio.Group>
                    <Radio value="M">M</Radio>
                    <Radio value="F">F</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Pet
                </Button>
            </Form.Item>
        </Form>
    );
}
