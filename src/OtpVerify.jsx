import React from "react";
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, InputNumber, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import './OtpVerify.css';
import Timer from './Timer';

export function OtpVerify(props) {
    const [form] = Form.useForm();
    let obj;
    const onFinish = async (values) => {
        try {
            obj = {
                email: localStorage.getItem('email'),
                otp: values['otp']
            }
            console.log(obj);
        } catch (error) {
            console.error("Error:", error);
            // Handle network errors here
        }
        const response = await fetch('http://3.89.30.159:3000/register/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        if (response.ok) {
            console.log("OTP Verified");
        }
        else {
            console.error("HTTP Error:", response);
        }
    };
    return (
        <div>
            <h1 style={{ color: "#192928", fontFamily: "Baloo Da" }} align="center">
                Enter the OTP sent to your email address
            </h1>
            <Timer initialSeconds={300} />
            <Form
                form={form}
                name="otpfm"
                layout="vertical"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="otp"
                    className="otpform"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="otpbutton">
                    <Button htmlType="submit" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", fontSize: "20" }} >
                        Verify
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}