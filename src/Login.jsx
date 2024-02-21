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
            const response = await fetch('http://3.89.30.159:3000/login', {
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
                localStorage.setItem('userID', data.userID);
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
    const handleClick = () => {
        navigate('/register');
        // More complex logic here...
    };


    return (
        <div>
            <div className="loginheader">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
            </div>
            <div className="container_login" style={{ height: "100%" }}>
                <div className="image_col">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FBanner.png?alt=media&token=d866ecf5-1a86-4871-97b0-2c908376b3ebsrc/assets/Banner.png" width={"100%"} />
                </div>
                <div className="login_card">
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
                            <h3 style={{ fontFamily: "Baloo Da", marginBottom: "2%", textAlign: "left", paddingLeft: "10%" }}>Email:</h3>
                            <Form.Item

                                name="email"
                                style={{ paddingLeft: "10%", width: 600, borderColor: "#192928" }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your Email" />
                            </Form.Item>
                            <h3 style={{ fontFamily: "Baloo Da", marginBottom: "2%", textAlign: "left", paddingLeft: "10%" }}>Password:</h3>
                            <Form.Item
                                name="password"
                                style={{ paddingLeft: "10%", width: 600, borderColor: "#192928" }}
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
                    <div style={{ fontFamily: "Baloo Da", color: "Red", marginLeft: "45%" }}>                        Don't Have an Account?
                        <Button style={{ backgroundColor: "#cedfb9", color: "blue", fontFamily: "Baloo Da" }} onClick={handleClick} >
                            Register
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}