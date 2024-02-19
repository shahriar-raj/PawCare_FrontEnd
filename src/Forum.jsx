import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Space, Row, Col, Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import './Forum.css';
import './TwitterCard.css'

const { Option } = Select;

const { Meta } = Card;

export function Forum(props) {
    const navigate = useNavigate();
    // const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [imageList, setImageList] = useState([]);
    const handleNavigate = (path) => () => {
        navigate(path);
    };

    const data = [{ "User": "A", "Type": "Donation", "Title": "Donation Title", "Description": "Donation Description", "Amount": "1000", "Date": "2021-05-11", "Image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
    { "User": "B", "Type": "Adoption", "Title": "Adoptiontion Title", "Description": "Donation Description", "Name": "Tommy", "Date": "2021-05-11", "Image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" }];
    // Generate options for the Select components
    const locationOptions = [];
    for (let i = 10; i < 36; i++) {
        locationOptions.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const animalOptions = ['Dog', 'Cat', 'Bird'].map(animal => <Option key={animal}>{animal}</Option>);
    const diseaseOptions = ['Rabies', 'Leukemia', 'Distemper'].map(disease => <Option key={disease}>{disease}</Option>);
    const vaccineOptions = ['Rabies Vaccine', 'FVRCP', 'Bordetella'].map(vaccine => <Option key={vaccine}>{vaccine}</Option>);

    // Handle file selection
    const handleFileChange = info => {
        // ... (upload logic here)
    };

    useEffect(() => {
        // Function to fetch data from the API


        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format

                // Update state with the result
                setName(result.userDetails.userDetails.Username);
                setAddress(result.userDetails.userDetails.Address);
                listAll(ref(storage, 'images/' + result.userDetails.userDetails.Email + '/')).then((response) => {
                    console.log(response);
                    response.items.forEach((itemRef) => {
                        getDownloadURL(itemRef).then((url) => {
                            setImageList(url);
                            console.log(url);
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    function renderConditionalContent(item) {
        if (item.Type === "Donation") {
            return (
                <div>
                    <Typography.Paragraph className="twitter-card-content">
                        Amount: {item.Amount}
                    </Typography.Paragraph>
                    <Button type="primary" onClick={handleNavigate('/donation')} > Donate </Button>
                </div>
            );
        } else if (item.Type === "Adoption") {
            return (
                <div>
                    <Typography.Paragraph className="twitter-card-content">
                        Name: {item.Name}    
                    </Typography.Paragraph>
                    <Button type="primary" onClick={handleNavigate('/adopt')} > Adopt </Button>
                </div>
            );
        }
        // Return null or any default JSX if no condition is met
        return null;
    }

    return (

        <div className="forum-container">
            <div className="profile_header">

                <div className="navigation-buttons">
                    <span className="forum-title">PawForum</span>
                    <Input
                        className="search-input"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchInputChange}

                        style={{ width: "20%" }}
                    />
                    <Button className='nav-button' icon={<FontAwesomeIcon icon={faHome} />} onClick={handleNavigate('/profile')} />
                    <Button icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} onClick={handleNavigate('/donation')} />
                    <Button icon={<FontAwesomeIcon icon={faHome} />} onClick={handleNavigate('/profile')} />
                    <Button icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} onClick={handleNavigate('/donation')} />
                    {/* <FontAwesomeIcon icon={faPaw} size="2x" className="paw-icon" /> */}
                </div>
            </div>
            <Row className="content-grid" wrap={false}>
                <Col span={6} className="left-side">

                    <Row className="section section1">
                        <Card className="user-profile" >

                            <div className="user-content">
                                <Avatar size={80} icon={<UserOutlined />} src={imageList} />
                                <h2>{name}</h2>
                                <p style={{ marginTop: "5%", marginBottom: "7%" }}>{address}</p>
                            </div>
                        </Card>
                    </Row>


                    <Row className="section section2">
                        <div className='select-container'>
                            <h2>Filter</h2>
                            <div className="select-header">Location</div>
                            <Select
                                placeholder="Select Location"
                                defaultValue={['User Location', 'Dhanmondi']}
                            >
                                {locationOptions}
                            </Select>

                            <div className="select-header">Animals</div>
                            <Select
                                placeholder="Select Animals"
                                defaultValue={['User Pet']}
                            >
                                {animalOptions}
                            </Select>

                            <div className="select-header">Disease</div>
                            <Select
                                placeholder="Select Disease"
                            // defaultValue={['User Pet Disease']}
                            >
                                {diseaseOptions}
                            </Select>

                            <div className="select-header">Vaccine</div>
                            <Select
                                placeholder="Select Vaccine"
                            // defaultValue={['User Pet Vaccine']}
                            >
                                {vaccineOptions}
                            </Select>
                        </div>
                    </Row>
                </Col>

                <Col span={18} className="section section3" >
                    <Row className="" wrap={false}>

                        <Col span={1} className="" />
                        <Col span={22} className="">
                            <Card className="post-update-card">
                                <div className="forum-card-info">
                                    <Avatar size={100} src="./src/assets/cutu.png" className="user-avatar" />
                                    <div className="forum-card-details">
                                        <Input
                                            className="post-input"
                                            placeholder="What's happening?"
                                            onPressEnter={() => {/* Handle the press enter event */ }}
                                        />
                                    </div>
                                    <div className="button-group">
                                        <Upload
                                            name="image"
                                            listType="picture"
                                            showUploadList={false}
                                            beforeUpload={() => false} // Prevent automatic upload
                                            onChange={handleFileChange}
                                            className="upload-button"

                                        >
                                            <Button icon={<FontAwesomeIcon icon={faImage} />} />
                                        </Upload>
                                        <Button type="primary" icon={<SendOutlined />} >
                                            Post
                                        </Button>
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={1} className="" />

                    </Row>

                    {data.map((item) => (
                        <Row>
                            <Col span={1} className="" />
                            <Col span={21} className="twitter-card1">
                                <Card className="twitter-card1">
                                    <Meta
                                        avatar={<Avatar icon={<TwitterOutlined />} />}
                                        title={
                                            <span className="twitter-card-title">
                                                {item.User}
                                            </span>
                                        }
                                        description=" "
                                    />
                                    <Typography.Paragraph className="twitter-card-content">
                                        {item.Description}
                                        &nbsp; #{item.Type}
                                    </Typography.Paragraph>
                                    <div>
                                        {renderConditionalContent(item)}
                                    </div>
                                    <div className="twitter-card-footer">
                                        <span className="twitter-card-date">{item.Date}</span>
                                        {/* <div className="twitter-card-actions">
                                            <FontAwesomeIcon icon={faComment} />
                                            <FontAwesomeIcon icon={faRetweet} />
                                            <FontAwesomeIcon icon={faHeart} />
                                        </div> */}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={1} className="" />
                        </Row>
                    ))};
                </Col>
            </Row>
        </div>

    );
}

export default Forum;
