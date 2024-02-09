import React from "react";
import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Card, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Registration.css'; // Make sure to include the correct path to your CSS file
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export function ShowImage(props) {
    const [imageList, setImageList] = useState([]);
    useEffect(() => {
        // Function to fetch data from the API
        listAll(ref(storage, 'images/')).then((response) => {
            console.log(response);
            response.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                    setImageList((imageList) => [...imageList, url]);
                }).catch((error) => {
                    console.log(error);
                });
            });
        })
    }, []);

    return (
        <div>
            <div>
                <h1>Images</h1>
            </div>
            <div>
                {imageList.map((image) => (
                    <img src={image} alt="image" width="200px" height="200px" />
                ))}
            </div>
        </div>
    );
}