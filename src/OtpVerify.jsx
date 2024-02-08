import React from "react";
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, InputNumber, Radio, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { CloseOutlined} from '@ant-design/icons';
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


    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Now the button that triggers the modal
    const successButton = (
        <Button style={{ backgroundColor: "#19adad", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} onClick={showModal}>
        PopUp Check
        </Button>
    );

    // The modal component
    const successModal = (
        <Modal title="Registration Successful" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
            Continue
        </Button>,
        ]}>
        <div style={{textAlign: 'center', padding: '24px'}}>
            <div className="tick-mark-container">
            <div className="tick-mark">✔</div>
            </div>
            <p>Congratulations you account has been successfully created.</p>
            <p>Thank you for signing up with us</p>
        </div>
        </Modal>
    );




    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

const showErrorModal = () => {
    setIsErrorModalVisible(true);
};

const handleErrorOk = () => {
    setIsErrorModalVisible(false);
};

const handleErrorCancel = () => {
    setIsErrorModalVisible(false);
};

// The button that triggers the error modal
const errorButton = (
    <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} onClick={showErrorModal}>
        Error PopUp Check
    </Button>
);

// The error modal component
const errorModal = (
    <Modal title="Registration Unsuccessful" visible={isErrorModalVisible} onOk={handleErrorOk} onCancel={handleErrorCancel} footer={[
    <Button key="submit" type="primary" onClick={handleErrorOk}>
        Try Again
    </Button>,
    ]}>
    <div style={{textAlign: 'center', padding: '24px'}}>
        <div className="error-mark-container">
        <div className="error-mark">  ✖</div> 
        {/* <CloseOutlined /> */}
        </div>
        <p>Unfortunately, your account could not be created.</p>
        <p>Please try registering again.</p>
    </div>
    </Modal>
);





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

                    
                    {successButton}
                    {successModal}

                    {errorButton}
                    {errorModal}

                </Form.Item>
            </Form>
        </div>
    )
}