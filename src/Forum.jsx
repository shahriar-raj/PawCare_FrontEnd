import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo, faFilter, faUser, faCheckCircle, faHome, faHotel, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
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
    const [replyUpdateTrigger, setReplyUpdateTrigger] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState("");
    let urls = {};
    const handleNavigate = (path) => () => {
        navigate(path);
    };
    const [inputReply, setInputReply] = useState('');
    const handleChange = (event) => {
        setInputReply(event.target.value);
    };

    const locationOptions = [
        { value: '', label: 'All' },
        { value: 'BUET', label: 'BUET' },
        { value: 'Dhanmondi', label: 'Dhanmondi' },
        { value: 'Mohammadpur', label: 'Mohammadpur' },
    ];

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
                console.error('Error fetching data:  ', error);
            }
        };
        // Call the fetchData function
        fetchData();
    }, [replyUpdateTrigger]);

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
                    <Button type="primary" onClick={() => { localStorage.setItem('DonationID', item.DonationID); navigate('/donationpayment') }} > Donate </Button>
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

    function dateConverter(date) {
        const dateObj = new Date(date);
        const readable = dateObj.toLocaleString();
        return (
            <div>
                {readable}
            </div>
        );
    }

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

    const addReply = async (item) => {
        setInputReply('');
        setReplyUpdateTrigger(oldTrigger => oldTrigger + 1);
        try {
            let obj = {
                userID: localStorage.getItem('userID'),
                postID: item.PostID,
                text: inputReply,
            }
            const response = await fetch('http://3.89.30.159:3000/forum/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const result = await response.json(); // Assuming the response is in JSON format
            console.log(result);
            // window.location.reload();
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (

        <div className="forum-container">

            <div className="profile_header">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='Profile' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/profile') }}>
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
                {/* <Button className='BookHostel' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/hostel') }}>
                    Book a Hostel
                </Button> */}
                <Button className='VetAppointment' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/vetappointment') }}>
                    Vet Appointment
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "1%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div>

            <Row className="content-grid" wrap={false}>
                <Col span={6} className="left-side">

                    <Row className="section section1">
                        <Card className="user-profile">
                            <div className="user-content" style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar size={85} icon={<UserOutlined />} src={imageList} style={{ marginRight: '5%' }} />
                                <div style={{ flex: 1 }}>
                                    <h2>{name}</h2>
                                    <p style={{ marginTop: "-5%", marginBottom: "3%" }}>{address}</p> {/* Adjusted margins */}
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <Button className="view-my-profile-btn" type="primary" onClick={() => { navigate('/profile') }}>My Profile</Button>
                            </div>
                        </Card>
                    </Row>


                    <Row className="section section2">
                        <div className='select-container'>
                            <h2>Filter</h2>
                            <div className="select-header">Location</div>
                            <Select
                                className="custom-select-placeholder"
                                placeholder="Select Location"
                                options={locationOptions}
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                            >
                            </Select>

                            {/* <div className="select-header">Animals</div>
                            <Select
                                className="custom-select-placeholder"
                                placeholder="Select Animals"
                            // defaultValue={['User Pet']}
                            >
                                {animalOptions}
                            </Select>

                            <div className="select-header">Vaccine</div>
                            <Select
                                className="custom-select-placeholder"
                                placeholder="Select Vaccine"
                            // defaultValue={['User Pet Vaccine']}
                            >
                                {vaccineOptions}
                            </Select> */}
                            
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
                                            className="post-input custom-placeholder"
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
                                        <Button className="post-button" icon={<SendOutlined />} onClick={() => { add() }} >
                                            Post
                                        </Button>
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={1} className="" />

                    </Row>
                    {sortedPosts.map((item) => {
                        if (selectedLocation === item.Address || selectedLocation === '')
                            return (
                                <Row>
                                    <Col span={1} className="" />
                                    <Col span={21} className="twitter-cardholder">


                                        <div className="post-and-replies-container">
                                            <Card className="twitter-card">
                                                <Meta
                                                    avatar={<Avatar src={urls[item.Email]} />}
                                                    title={<span className="twitter-card-title">{item.Username}</span>}
                                                    description=" " // Empty string for layout purposes
                                                />
                                                <Typography.Paragraph className="twitter-card-content">
                                                    {renderConditionalDescription(item)}
                                                    <span style={{ color: "red" }}>#{item.Type === 1 ? "Donation" : item.Type === 2 ? "Adoption" : "Help"}</span>
                                                </Typography.Paragraph>
                                                <div>
                                                    {renderConditionalContent(item)}
                                                </div>
                                                <div className="twitter-card-footer">
                                                    <span className="twitter-card-date">
                                                        <div>
                                                            {dateConverter(item.AdoptionDate)}
                                                        </div>
                                                    </span>
                                                    <p className="text-button" onClick={() => toggleDetails(item.PostID)} style={{ cursor: 'pointer', color: "#24615d", fontFamily: "Baloo Da", fontSize: "larger", marginBottom: "2%" }}>
                                                        {visibleObjectId === item.PostID ? "Hide Replies" : "See Replies" + ` (${item.replies[0].ReplyID === null ? 0 : item.replies.length})`}
                                                    </p>
                                                </div>
                                            </Card>
                                            {visibleObjectId === item.PostID && item.replies[0].ReplyID !== null && (
                                                <div className="replies-container">
                                                    {item.replies.map((reply, index) => (
                                                        <Card key={index} className="reply-card">
                                                            <span className="reply-text">{reply.ReplierUserName}: {reply.ReplyText}</span>
                                                        </Card>
                                                    ))}
                                                </div>
                                            )}
                                            {visibleObjectId === item.PostID && (
                                                <div className="reply-container">
                                                    <form>
                                                        <Input
                                                            type="text"
                                                            id="inputField"
                                                            value={inputReply}
                                                            onChange={handleChange}
                                                            style={{ width: "85%", marginTop: "2%", marginLeft: "5%", marginRight: "2%" }}
                                                        />
                                                        <Button style={{ backgroundColor: "#cedfb9" }}>
                                                            <SendOutlined onClick={() => { addReply(item) }} />
                                                        </Button>
                                                    </form>
                                                </div>
                                            )}
                                        </div>



                                    </Col>
                                    <Col span={1} className="" />
                                </Row>
                            )
                    })};
                </Col>
            </Row>
        </div>

    );
}

export default Forum;