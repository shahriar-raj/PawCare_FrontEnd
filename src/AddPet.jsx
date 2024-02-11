import React from "react";
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, InputNumber, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddPet.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export function AddPet(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState(null);
    // const [url, setUrl] = useState(null);
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
            uploadImage(obj.Name, obj.Age, obj.UserID);
            // console.log("URl:" + imageList);
            const response = await fetch('http://3.89.30.159:3000/profile/addPet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            
            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('petID', result.PetID);
                localStorage.setItem('petName', obj.Name);
                localStorage.setItem('petAge', obj.Age);
                localStorage.setItem('UserID', obj.UserID);
                props.setData(obj.UserID);
                navigate('/petphoto');
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

    const uploadImage = (name, age, userID) => {
        console.log('Yes');
        if (image == null) return;
        const imageRef = ref(storage, `PetImages/${userID}/${name}${age}/${image.name}`);
        uploadBytes(imageRef, image).then(() => {
            // alert("image Uploaded");
        });
    };

    return (
        <div>

            <h1 className="add-pet-form-header"> Add Pet Form </h1>
            <div className="add-pet-form-container">
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
                        label="Pet's Age (Months)"
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
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Upload Profile Photo">
                        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Item>

                    <Form.Item>
                        <Button className="Add_pet" type="primary" htmlType="submit">
                            Add Pet
                        </Button>
                        <Button className="Back_pet" type="primary" onClick={() => { navigate('/profile') }} id="back-btn">
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
