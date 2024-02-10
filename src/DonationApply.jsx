import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Card, Upload, Divider, Space, Tag, Tooltip } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './DonationApply.css'; // Make sure this CSS file contains the required styles
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";

export function DonationApply() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLog = () => {
        navigate('/');
    };

    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    // State for the animal tags
    const [animalTags, setAnimalTags] = useState([]);
    const [animalInputVisible, setAnimalInputVisible] = useState(false);
    const [animalInputValue, setAnimalInputValue] = useState('');
    const [editAnimalInputIndex, setEditAnimalInputIndex] = useState(-1);
    const [editAnimalInputValue, setEditAnimalInputValue] = useState('');
    const animalInputRef = useRef(null);
    const editAnimalInputRef = useRef(null);

    // State for the checkpoints tags
    const [checkpointTags, setCheckpointTags] = useState([]);
    const [checkpointInputVisible, setCheckpointInputVisible] = useState(false);
    const [checkpointInputValue, setCheckpointInputValue] = useState('');
    const [editCheckpointInputIndex, setEditCheckpointInputIndex] = useState(-1);
    const [editCheckpointInputValue, setEditCheckpointInputValue] = useState('');
    const checkpointInputRef = useRef(null);
    const editCheckpointInputRef = useRef(null);

    // Tag handling functions for checkpoint tags
    useEffect(() => {
        if (animalInputVisible) {
            animalInputRef.current?.focus();
        }
    }, [animalInputVisible]);

    useEffect(() => {
        if (checkpointInputVisible) {
            checkpointInputRef.current?.focus();
        }
    }, [checkpointInputVisible]);

    useEffect(() => {
        if (editAnimalInputIndex !== -1) {
            editAnimalInputRef.current?.focus();
        }
    }, [editAnimalInputIndex]);

    useEffect(() => {
        if (editCheckpointInputIndex !== -1) {
            editCheckpointInputRef.current?.focus();
        }
    }, [editCheckpointInputIndex]);

    // Animal tags functions
    const handleAnimalClose = (removedTag) => {
        setAnimalTags(animalTags.filter(tag => tag !== removedTag));
    };

    const handleAnimalEditInputChange = (e) => {
        setEditAnimalInputValue(e.target.value);
    };

    const handleAnimalEditInputConfirm = () => {
        const newTags = [...animalTags];
        newTags[editAnimalInputIndex] = editAnimalInputValue;
        setAnimalTags(newTags);
        setEditAnimalInputIndex(-1);
        setEditAnimalInputValue('');
    };

    // Checkpoint tags functions
    const handleCheckpointClose = (removedTag) => {
        setCheckpointTags(checkpointTags.filter(tag => tag !== removedTag));
    };

    const handleCheckpointEditInputChange = (e) => {
        setEditCheckpointInputValue(e.target.value);
    };

    const handleCheckpointEditInputConfirm = () => {
        const newTags = [...checkpointTags];
        newTags[editCheckpointInputIndex] = editCheckpointInputValue;
        setCheckpointTags(newTags);
        setEditCheckpointInputIndex(-1);
        setEditCheckpointInputValue('');
    };

    const onFinish = async (values) => {
        console.log('Received values of form:', { ...values, animalTags, checkpointTags });
        // Assuming `uploadToCloud` is your function to upload a file
        // This function should return a Promise
        let obj = {
            userID: localStorage.getItem('userID'),
            totalAmount: values['totalAmount'],
            name: values['name'],
            description: values['cause'],
            subPoints: checkpointTags,
        }
        let imageRef = ref(storage, `DonationImages/${values['name']}/${values['cause']}/${image.name}`);
        uploadBytes(imageRef, image).then(() => {
        });
        imageRef = ref(storage, `DonationImages/${values['name']}/${values['cause']}/${image1.name}`);
        uploadBytes(imageRef, image1).then(() => {
        });
        imageRef = ref(storage, `DonationImages/${values['name']}/${values['cause']}/${image2.name}`);
        uploadBytes(imageRef, image2).then(() => {
        });
        const response = await fetch('http://3.89.30.159:3000/donation/application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ obj }),
        });
        if (response.ok) {
            navigate('/donation');
        }
        else {
            console.error("HTTP Error:", response);
        }
        // Here you would handle the submission of the form along with the tags
    };

    return (
        <div className="donation-apply-container">
            <div className="profile_header">
                <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button
                    className="logout"
                    style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "50%" }}
                    onClick={handleLog}
                >
                    Logout
                </Button>
                <Button
                    className="Donation"
                    style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }}
                    onClick={() => { navigate('/donation'); }}
                >
                    Donation
                </Button>
            </div>

            <div className="donation-form-container">
                <h1 className="donation-header">Donation Application</h1>
                <Card className="donation-card">
                    <Form
                        form={form}
                        name="donationApply"
                        onFinish={onFinish}
                        layout="vertical"
                        scrollToFirstError
                        className='donation-form1'
                    >
                        <p style={{ color: "#CEDFB9" }}>Name of the Pet/Animal</p>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <p style={{ color: "#CEDFB9" }}>Cause</p>
                        <Form.Item
                            name="cause"
                            rules={[{ required: true, message: 'Please input the cause!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <p style={{ color: "#CEDFB9" }}>Short Description</p>
                        <Form.Item
                            name="description"
                            rules={[
                                { required: true, message: 'Please input your short description!' },
                                { min: 10, message: 'Short description should be at least 100 characters long.' }
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <p style={{ color: "#CEDFB9" }}>Relevant Tags</p>
                        <Form.Item
                            name="animalTags"

                        >
                            <Space size={[0, 8]} wrap>
                                {animalTags.map((tag, index) => {
                                    if (editAnimalInputIndex === index) {
                                        return (
                                            <Input
                                                ref={editAnimalInputRef}
                                                key={tag}
                                                size="small"
                                                style={{ width: '78px', marginRight: '8px', verticalAlign: 'top' }}
                                                value={editAnimalInputValue}
                                                onChange={handleAnimalEditInputChange}
                                                onBlur={handleAnimalEditInputConfirm}
                                                onPressEnter={handleAnimalEditInputConfirm}
                                            />
                                        );
                                    }

                                    const isLongTag = tag.length > 20;

                                    const tagElem = (
                                        <Tag
                                            className="edit-tag"
                                            key={tag}
                                            closable={index !== 0}
                                            onClose={() => handleAnimalClose(tag)}
                                        >
                                            <span
                                                onDoubleClick={e => {
                                                    if (index !== 0) {
                                                        setEditAnimalInputIndex(index);
                                                        setEditAnimalInputValue(tag);
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                            </span>
                                        </Tag>
                                    );

                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {animalInputVisible && (
                                    <Input
                                        ref={animalInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: '78px', marginRight: '8px', verticalAlign: 'top' }}
                                        value={animalInputValue}
                                        onChange={(e) => setAnimalInputValue(e.target.value)}
                                        onBlur={() => {
                                            if (animalInputValue && !animalTags.includes(animalInputValue)) {
                                                setAnimalTags([...animalTags, animalInputValue]);
                                            }
                                            setAnimalInputVisible(false);
                                            setAnimalInputValue('');
                                        }}
                                        onPressEnter={() => {
                                            if (animalInputValue && !animalTags.includes(animalInputValue)) {
                                                setAnimalTags([...animalTags, animalInputValue]);
                                            }
                                            setAnimalInputVisible(false);
                                            setAnimalInputValue('');
                                        }}
                                    />
                                )}
                                {!animalInputVisible && (
                                    <Tag className="site-tag-plus" onClick={() => setAnimalInputVisible(true)}>
                                        <PlusOutlined /> New Tag
                                    </Tag>
                                )}
                            </Space>
                        </Form.Item>

                        <p style={{ color: "#CEDFB9" }}>Checkpoints</p>
                        <Form.Item
                            name="checkpointTags"
                        >
                            <Space size={[0, 8]} wrap>
                                {checkpointTags.map((tag, index) => {
                                    if (editCheckpointInputIndex === index) {
                                        return (
                                            <Input
                                                ref={editCheckpointInputRef}
                                                key={`edit-${tag}`}
                                                size="small"
                                                style={{ width: '78px', marginRight: '8px', verticalAlign: 'top' }}
                                                value={editCheckpointInputValue}
                                                onChange={handleCheckpointEditInputChange}
                                                onBlur={handleCheckpointEditInputConfirm}
                                                onPressEnter={handleCheckpointEditInputConfirm}
                                            />
                                        );
                                    }

                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            className="edit-tag"
                                            key={tag}
                                            closable={index !== 0}
                                            onClose={() => handleCheckpointClose(tag)}
                                        >
                                            <span
                                                onDoubleClick={(e) => {
                                                    if (index !== 0) {
                                                        setEditCheckpointInputIndex(index);
                                                        setEditCheckpointInputValue(tag);
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                            </span>
                                        </Tag>
                                    );

                                    return isLongTag ? (
                                        <Tooltip title={tag} key={`tooltip-${tag}`}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {checkpointInputVisible && (
                                    <Input
                                        ref={checkpointInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: '78px', marginRight: '8px', verticalAlign: 'top' }}
                                        value={checkpointInputValue}
                                        onChange={(e) => setCheckpointInputValue(e.target.value)}
                                        onBlur={() => {
                                            if (checkpointInputValue && !checkpointTags.includes(checkpointInputValue)) {
                                                setCheckpointTags([...checkpointTags, checkpointInputValue]);
                                            }
                                            setCheckpointInputVisible(false);
                                            setCheckpointInputValue('');
                                        }}
                                        onPressEnter={() => {
                                            if (checkpointInputValue && !checkpointTags.includes(checkpointInputValue)) {
                                                setCheckpointTags([...checkpointTags, checkpointInputValue]);
                                            }
                                            setCheckpointInputVisible(false);
                                            setCheckpointInputValue('');
                                        }}
                                    />
                                )}
                                {!checkpointInputVisible && (
                                    <Tag className="site-tag-plus" onClick={() => setCheckpointInputVisible(true)}>
                                        <PlusOutlined /> New Tag
                                    </Tag>
                                )}
                            </Space>
                        </Form.Item>

                        <p style={{ color: "#CEDFB9" }}>Upload Photos</p>
                        <Form.Item>
                            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <br />
                            <Input type="file" onChange={(e) => setImage1(e.target.files[0])} />
                            <br />
                            <Input type="file" onChange={(e) => setImage2(e.target.files[0])} />
                        </Form.Item>

                        <p style={{ color: "#CEDFB9" }}>Total Amount</p>
                        <Form.Item
                            name="totalAmount"
                            rules={[{ required: true, message: 'Please input the total amount needed!' }]}
                        >
                            <Input prefix="৳" />
                        </Form.Item>

                        <Form.Item>
                            <Button style={{ backgroundColor: "#192928", color: "white" }} htmlType="submit">
                                Apply for Donation
                            </Button>
                        </Form.Item>
                    </Form>

                    <Button
                        style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25" }}
                        onClick={() => navigate('/donation')}
                    >
                        Back
                    </Button>
                </Card>
            </div>
        </div >
    );
}