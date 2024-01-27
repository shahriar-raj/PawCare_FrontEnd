import React from "react";
import { useState } from 'react'
import { Button, Checkbox, Form, Input, Card } from 'antd';
import './Login.css';
import { useNavigate } from "react-router-dom";
export function Login(props) {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            let obj = {
                email: values['email'],
                password: values['password']
            }
            console.log(obj);
            const response = await fetch('http://44.222.207.156:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });


            if (response.ok) {
                const data = await response.json();
                console.log(data);
                props.setData(data);
                navigate('/profile');
                // Handle response here
            }
            else if (response.status === 401) {
                alert("Incorrect Username or Password")
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
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Card id="logincard">
                <h1 style={{ fontFamily: "Baloo Da" }}>Login</h1>
                <Form
                    name="basic"
                    layout="vertical"
                    size="large"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Email"
                        name="email"
                        style={{ width: 500, borderColor: "#192928" }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        style={{ width: 500, borderColor: "#192928" }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} htmlType="submit" >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}