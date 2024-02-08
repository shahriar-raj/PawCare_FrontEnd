import React from "react";
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Registration.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";

// Import your image if necessary - make sure the path is correct
// import image from './assets/cat1.png';

const { Option } = Select;

export function Registration() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Received values of form:', values);
    try {
      let obj = {
        username: values['name'],
        email: values['email'],
        password: values['password'],
        role: "User",
        address: values['address'],
      }
      console.log(obj);
      localStorage.setItem('email',obj.email); 
      const response = await fetch('http://3.89.30.159:3000/register', {
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
        navigate('/otp_verification');
        // Handle response here
      }
      else if (response.status === 401) {
        alert("Registration Failed")
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
    <div className="registration-form-container">
      <h1 className="registration-header">Registration</h1>
      <Card className="registration-card">
        <Form
          form={form}
          name="registration"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'The input is not a valid email!' },
              { required: true, message: 'Please input your email!' }
            ]}
          >
            <Input />
          </Form.Item>



          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters.' }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore="+880" style={{ width: '100%' }} />
          </Form.Item>

          {/* <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Select a gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="profilePicture"
            label="Upload Profile Picture"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload name="logo" listType="picture" customRequest={dummyRequest}>
              <Button icon={<UploadOutlined />}>Click to upload (optional)</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item>
            <Button style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} onClick={() => navigate('/')}>
          Back
        </Button>
      </Card>

    </div>
  );
}
