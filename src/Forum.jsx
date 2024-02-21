import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Space, Row, Col, Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import './Forum.css';
import './TwitterCard.css'
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';

const { Option } = Select;

const { Meta } = Card;

export function Forum(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [imageList, setImageList] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [visibleObjectId, setVisibleObjectId] = useState(null);
    let urls = {};
    const handleNavigate = (path) => () => {
        navigate(path);
    };

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

    const handleLog = () => {
        navigate('/');
    }

    const add = async () => {
        try {
            let obj = {
                userID: localStorage.getItem('userID'),
                text: inputValue,
            }
            const response = await fetch('http://3.89.30.159:3000/forum/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const result = await response.json(); // Assuming the response is in JSON format
            console.log(result);
            window.location.reload();
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const sortedPosts = [...data].sort((a, b) => b.PostID - a.PostID);

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
            try {
                let obj = {

                }
                const response = await fetch('http://3.89.30.159:3000/forum', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                console.log(result);
                console.log(result.donationData);
                setData(result.donationData);
                console.log(data);
                for (let i = 0; i < result.donationData.length; i++) {
                    listAll(ref(storage, 'images/' + result.donationData[i].Email + '/')).then((response) => {
                        console.log(response);
                        response.items.forEach((itemRef) => {
                            getDownloadURL(itemRef).then((url) => {
                                urls[result.donationData[i].Email] = url;
                            }).catch((error) => {
                                console.log(error);
                            });
                        });
                    })
                }
                console.log("URLS" + urls);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // Call the fetchData function
        fetchData();
    }, []);

    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    function renderConditionalContent(item) {
        if (item.Type === 1) {
            return (
                <div>
                    <Typography.Paragraph className="twitter-card-content">
                        Amount: {item.TotalAmount}
                    </Typography.Paragraph>
                    <Button type="primary" onClick={handleNavigate('/donation')} > Donate </Button>
                </div>
            );
        } else if (item.Type === 2) {
            return (
                <div>
                    <Typography.Paragraph className="twitter-card-content">
                        Name: {item.Name}
                    </Typography.Paragraph>
                    <Button type="primary" onClick={handleNavigate('/adopt')} > Adopt </Button>
                </div>
            );
        } else if (item.Type === 0) {
            return (
                <div>
                </div>
            );
        }
        // Return null or any default JSX if no condition is met
        return null;
    }

    const toggleDetails = (id) => {
        // Toggle visibility: If the clicked object is already visible, hide it, otherwise show it
        setVisibleObjectId(prevId => prevId === id ? null : id);
    };

    function renderConditionalDescription(item) {
        if (item.Type === 1) {
            return (
                <div>
                    {item.Description}
                </div>
            );
        } else if (item.Type === 2) {
            return (
                <div>
                    I have given a pet for Adoption
                </div>
            );
        } else if (item.Type === 0) {
            return (
                <div>
                    {item.Text}
                </div>
            );
        }
        // Return null or any default JSX if no condition is met
        return null;
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (

        <div className="forum-container">

            <div className="profile_header">
                <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button className='Profile' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "10%" }} onClick={() => { navigate('/profile') }}>
                    My Profile
                </Button>
                <Button className='Donation' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
                    Donate For Pets
                </Button>
                <Button className='Adoption' icon={<FontAwesomeIcon icon={faHome} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/adoption') }}>
                    Adopt a Pet
                </Button>
                <Button className='Notification' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                    Notifications
                </Button>
                <Button className='Forum active' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                    Forum
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "3%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div>

            <Row className="content-grid" wrap={false}>
                <Col span={6} className="left-side">

                    <Row className="section section1">
                        <Card className="user-profile" >

                            <div className="user-content">
                                <Avatar size={80} icon={<UserOutlined />} src={imageList} />
                                <h2>{name}</h2>
                                <p style={{ marginTop: "5%", marginBottom: "7%" }}>{address}</p>
                                <Button className="view-my-profile-btn" type="primary" onClick={() => { navigate('/profile') }}>My Profile</Button>
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
                                    <Avatar size={100} src={imageList} className="user-avatar" />
                                    <div className="forum-card-details">
                                        <Input
                                            className="post-input"
                                            placeholder="What's happening?"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onPressEnter={() => { add() }}
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
                                        <Button type="primary" icon={<SendOutlined />} onClick={() => { add() }} >
                                            Post
                                        </Button>
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={1} className="" />

                    </Row>
                    {sortedPosts.map((item) => (
                        <Row>
                            <Col span={1} className="" />
                            <Col span={21} className="twitter-card1">
                                <Card className="twitter-card1">
                                    <Meta
                                        avatar={<Avatar src={urls[item.Email]} />}
                                        title={
                                            <span className="twitter-card-title">
                                                {item.Username}
                                            </span>
                                        }
                                        description=" "
                                    />
                                    <Typography.Paragraph className="twitter-card-content">
                                        {renderConditionalDescription(item)}
                                        #{(item.Type === 1) ? "Donation" : (item.Type === 2) ? "Adoption" : "Normal"}
                                    </Typography.Paragraph>
                                    <div>
                                        {renderConditionalContent(item)}
                                    </div>
                                    <div className="twitter-card-footer">
                                        <span className="twitter-card-date">{item.AdoptionDate}</span>
                                        <p className="text-button" onClick={() => toggleDetails(item.PostID)} style={{ cursor: 'pointer', color: "#24615d", fontFamily: "Baloo Da", fontSize: "larger" }}>
                                            See Replies
                                        </p>
                                        {visibleObjectId === item.PostID && (
                                            <div>
                                                {item.replies.map((reply) => (
                                                    <div>
                                                        {reply.ReplierUserName} :{reply.ReplyText}
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        )}
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
