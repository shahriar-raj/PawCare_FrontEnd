import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Row, Col, Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import './Forum.css';
import './TwitterCard.css'

const { Option } = Select;

const { Meta } = Card;

export function Forum(props) {
    const navigate = useNavigate();


    const handleNavigate = (path) => () => {
        navigate(path);
    };

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

    return (

        <div className="forum-container">
            <div className="profile_header">
                <div className="navigation-buttons">
                    <span className="forum-title">PawForum</span>
                    <Button icon={<FontAwesomeIcon icon={faHome} />} onClick={handleNavigate('/profile')} />
                    <Button icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} onClick={handleNavigate('/donation')} />
                    <FontAwesomeIcon icon={faPaw} size="2x" className="paw-icon" />
                </div>
            </div>
            <Row className="content-grid" wrap={false}>
                <Col span={6} className="left-side">

                    <Row className="section section1">
                        <Card className="user-profile">
                            <div className="user-background">
                                <img src="/path-to-background-image.jpg" alt="Background" />
                            </div>
                            <div className="user-content">
                                <Avatar size={64} icon={<UserOutlined />} src="/path-to-avatar.jpg" />
                                <h3>Sarah Perez</h3>
                                <p>@sarahintampa</p>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <div className="user-statistic">
                                            <p>Tweets</p>
                                            <p>29.7K</p>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="user-statistic">
                                            <p>Following</p>
                                            <p>8,489</p>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="user-statistic">
                                            <p>Followers</p>
                                            <p>59.8K</p>
                                        </div>
                                    </Col>
                                </Row>
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
                    <Row>

                    </Row>

                    <Row>
                        <Col span={1} className="" />
                        <Col span={10} className="twitter-card1">
                            <Card className="twitter-card1">
                                <Meta
                                    avatar={<Avatar icon={<TwitterOutlined />} />}
                                    title={
                                        <span className="twitter-card-title">
                                            Lorem <FontAwesomeIcon icon={faCheckCircle} className="twitter-card-check" />
                                        </span>
                                    }
                                    description="@ipsum"
                                />
                                <Typography.Paragraph className="twitter-card-content">
                                    Lorem ipsum dolor sit amet. Aut tenetur molestiae provident Quis es maxima. #TwitterPost
                                </Typography.Paragraph>
                                <div className="twitter-card-footer">
                                    <span className="twitter-card-date">11 May 2021</span>
                                    <div className="twitter-card-actions">
                                        <FontAwesomeIcon icon={faComment} />
                                        <FontAwesomeIcon icon={faRetweet} />
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={10} className="twitter-card2">
                            <Card className="twitter-card2">
                                <Meta
                                    avatar={<Avatar icon={<TwitterOutlined />} />}
                                    title={
                                        <span className="twitter-card-title">
                                            Lorem <FontAwesomeIcon icon={faCheckCircle} className="twitter-card-check" />
                                        </span>
                                    }
                                    description="@ipsum"
                                />
                                <Typography.Paragraph className="twitter-card-content">
                                    Lorem ipsum dolor sit amet. Aut tenetur molestiae provident Quis es maxima. #TwitterPost
                                </Typography.Paragraph>
                                <div className="twitter-card-footer">
                                    <span className="twitter-card-date">11 May 2021</span>
                                    <div className="twitter-card-actions">
                                        <FontAwesomeIcon icon={faComment} />
                                        <FontAwesomeIcon icon={faRetweet} />
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={1} className="" />
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default Forum;
