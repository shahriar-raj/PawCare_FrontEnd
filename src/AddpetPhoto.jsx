import React, { useEffect } from "react";
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload, InputNumber, Radio, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddpetPhoto.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export function AddpetPhoto(props) {
    const navigate = useNavigate();
    const [imageList, setImageList] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(true);
    useEffect(() => {
        const fillDB = async () => {
            // console.log("URL:" + url);
            listAll(ref(storage, 'PetImages/' + localStorage.getItem('UserID') + '/' + localStorage.getItem('petName') + localStorage.getItem('petAge') + '/')).then((response) => {
                console.log(response);
                response.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((url) => {
                        setImageList(url);
                        console.log("Hello" + url);
                        localStorage.setItem('Url', url);
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            })
        }
        fillDB();
    }, []);

    const handleOk = async () => {
        const response = await fetch('http://3.89.30.159:3000/profile/picturePet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserID: localStorage.getItem('userID'),
                PetID: localStorage.getItem('petID'),
                URL: localStorage.getItem('Url'),
            }),
        });

        if (response.ok) {
            console.log("Image Uploaded");
            navigate('/profile');
        }
        else {
            console.error("HTTP Error:", response);
        }
    }

    const handleCancel = () => {
        navigate('/profile');
    }

    const successModal = (
        <Modal title="Registration Successful" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
                Ok
            </Button>,
        ]}>
            <div style={{ textAlign: 'center', padding: '24px' }}>
                <div className="tick-mark-container">
                    <div className="tick-mark">✔</div>
                </div>
                <p>Your Pet has been added to your profile successfully</p>
            </div>
        </Modal>
    );

    return (
        <div>
            {successModal}
        </div>
    );
}