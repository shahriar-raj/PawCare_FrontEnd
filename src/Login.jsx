import React from "react";
import { useState } from 'react'
import { Button, Checkbox, Form, Input, Card } from 'antd';
import './Login.css'
export function Login() {
    const onFinish = (values) => {
        console.log('Success:', values['username']);
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
                    style={{
                        maxWidth: 800,
                    }}
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        style={{ width: 400 }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
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