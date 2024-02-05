import React from "react";
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, InputNumber, Radio } from 'antd';
import { useNavigate } from "react-router-dom";

export function OtpVerify(props) {
    return (
        <div>
            <h1 >
                Give OTP
            </h1>
            {/* <Form
                form={Form}
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

            </Form> */}
        </div>
    )
}