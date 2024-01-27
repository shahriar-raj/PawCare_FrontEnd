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
                username: values['username'],
                password: values['password']
            }
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
                props.setData(obj);
                navigate('/about');
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
                <h1>Login</h1>
                <Form
                    name="basic"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        style={{ width: 500 }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your Username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        style={{ width: 500 }}
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
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    );
}