import React from "react";
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './RescuerApplication.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const { TextArea } = Input;

export function RescuerApplication() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const onFinish = async (values) => {
        console.log('Received values of form:', values);
        try {
            let obj = {
                userID: localStorage.getItem('userID'),
                adultStatus: values['adult'],
                petOwnStatus: values['petOwner'],
                experience: values['experience'],
            }
            console.log(obj);
            uploadImage();
            const response = await fetch('http://3.89.30.159:3000/profile/rescuerApply', {
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
                navigate('/rescuerpicture');
                // Handle response here
            }
            else if (response.status === 401) {
                alert("Application Failed")
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

    const uploadImage = () => {
        console.log('Yes');
        if (image == null) return;
        const imageRef = ref(storage, `RescueApplyimages/${localStorage.getItem('userID')}/${image.name}`);
        console.log(image);
        uploadBytes(imageRef, image).then(() => {
            console.log('Uploaded Image');
        });
    };

    return (
        <div className="rescuer-form-container">
            <h1 className="rescuer-header">Rescuer Application</h1>
            <Card className="rescuer-card1">
                <Form
                    form={form}
                    name="rescuer"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                >
                    <Form.Item
                        name="adult"
                        label="Are you 18 years of Age or Older?"
                        rules={[{ required: true, message: 'Please select an option!' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="petOwner"
                        label="Do you own any pet?"
                        rules={[{ required: true, message: 'Please select an option!' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="experience"
                        label="Do you have any experience in rescuing animals? If yes, please describe. If no, please explain why you want to become a rescuer."
                        rules={[{ required: true, message: 'Please fill in this field!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Upload Valid Identification Card's Photo">
                        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
                <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25" }} onClick={() => navigate('/rescuerslist')}>
                    Back
                </Button>
            </Card>

        </div>
    );
}

