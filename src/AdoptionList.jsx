import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel,faUser, faFilter, faHorse, faCat, faCrow, faMapMarkerAlt, faDog, faUsers, faComments, faCheckCircle, faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Row, Col, Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import './AdoptionList.css';
import './AdoptionCard.css'
import { LogoutOutlined, HeartOutlined, HomeOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';


const AdoptionCard = ({ pet }) => {
    const navigate = useNavigate();
    return (
        <Card className="adoption-card">
            <img src={pet.URL} alt={pet.Name} width={"250px"} height={"250px"} className="pet-image" />
            <div className="pet-details">
                <div className="pet-name">
                    <h3>{pet.Name}</h3>
                    {/* <FontAwesomeIcon icon={faCheckCircle} className="verified-icon" /> */}
                </div>

                <span className='pet-breed-info'>Breed : {pet.Breed}</span>
                <span className='pet-age-info'>Age : {pet.Age} Months</span>
                <span className='pet-addr'>{pet.Address}</span>

                <div className="pet-actions" style={{ marginTop: '3%' }}>
                    {/* Button type primary is overload in DonationList.css */}
                    <Button className="pet-action-button" style={{ marginRight: '3%' }} onClick={() =>{navigate('/adopt') }}>Adopt</Button>
                    <Button className="pet-action-button"> Pet Profile</Button>
                </div>
            </div>
        </Card>
    );
};

export function AdoptionList(props) {
    const navigate = useNavigate();
    const [pets, setPet] = useState([]);

    // Add your pet data here
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                let obj = {
                    userID: localStorage.getItem('userID'),
                }
                const response = await fetch('http://3.89.30.159:3000/adoption', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json();
                setPet(result);
                setPetCount(result.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);



    const handleNavigate = (path) => () => {
        navigate(path);
    };




    // Handle file selection
    const handleFileChange = info => {
        // ... (upload logic here)
    };

    const [petCount, setPetCount] = useState(0);
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [selectedBreed, setSelectedBreed] = useState("");
    const [selectedGender, setSelectedGender] = useState("");

    // Example options for each Select
    const animalOptions = [
        { value: '', label: 'All' },
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'Others', label: 'Others' },
    ];
    const breedOptions = [
        { value: '', label: 'All' },
        { value: 'German Shephard', label: 'German Shephard' },
        { value: 'Husky', label: 'Husky' },
    ];

    const genderOptions = [
        { value: '', label: 'All' },
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
    ];


    // Functions for Select component filtering and sorting
    const OptionFilter = (input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase());
    const OptionSort = (optionA, optionB) =>
        optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase());

    const handleLog = () => {
        navigate('/');
    }
    return (

        <div className="adoption-list-container">

            <div className="profile_header">
                <img src="https://firebasestorage.googleapis.com/v0/b/pawcare-7b021.appspot.com/o/images%2FLogo.png?alt=media&token=30124db9-f40a-4ed7-9c8c-a72df3e51132" alt="Logo" width="20%" />
                <Button className='Profile' icon={<FontAwesomeIcon icon={faUser} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "7%" }} onClick={() => { navigate('/profile') }}>
                    My Profile
                </Button>
                <Button className='Donation' icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/donation') }}>
                    Donate For Pets
                </Button>
                <Button className='Adoption active' icon={<FontAwesomeIcon icon={faHome} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/adoption') }}>
                    Adopt a Pet
                </Button>
                <Button className='Notification' icon={<BellOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/notifications') }}>
                    Notifications
                </Button>
                <Button className='Forum' icon={<MessageOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/forum') }}>
                    Forum
                </Button>
                <Button className='BookHostel' icon={<FontAwesomeIcon icon={faHotel} />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "0%" }} onClick={() => { navigate('/') }}>
                    Book a Hostel
                </Button>
                <Button className='logout' icon={<LogoutOutlined />} style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "3%" }} onClick={handleLog}>
                    Logout
                </Button>
            </div>

            <Row className="adoption-content-grid" wrap={false}>
                <Col span={6}>

                    <Row className="section section1">
                        <Card className='adoption-details-1'>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" style={{ marginRight: '5%' }} />
                                    <Select
                                        showSearch
                                        className="select-location"
                                        placeholder="Enter Location"
                                        optionFilterProp="children"
                                        filterOption={OptionFilter}
                                        filterSort={OptionSort}
                                        options={[
                                            { value: '1', label: 'Not Identified' },
                                            { value: '2', label: 'Closed' },
                                            { value: '3', label: 'Communicated' },
                                            { value: '4', label: 'Identified' },
                                            { value: '5', label: 'Resolved' },
                                            { value: '6', label: 'Cancelled' },
                                        ]}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <FontAwesomeIcon icon={faDog} size="2x" style={{ margin: '5%', marginTop: '20%' }} />
                                    <FontAwesomeIcon icon={faCat} size="2x" style={{ margin: '5%', marginTop: '20%' }} />
                                    <FontAwesomeIcon icon={faCrow} size="2x" style={{ margin: '5%', marginTop: '20%' }} />
                                    <FontAwesomeIcon icon={faHorse} size="2x" style={{ margin: '5%', marginTop: '20%' }} />
                                </div>
                                {/* <h2>Pet Count for Adoption: {petCount} </h2> */}
                            </div>
                        </Card>
                    </Row>

                    <Row className="section section2">

                        <div className="select-container">

                            <h2><FontAwesomeIcon icon={faFilter} size="1x" style={{ marginRight: '2%' }} />Filter</h2>
                            <div className="select-header">Animal</div>
                            <Select
                                className="filter-select-option"
                                placeholder="Select Animal"
                                filterOption={OptionFilter}
                                filterSort={OptionSort}
                                options={animalOptions}
                                value={selectedAnimal}
                                onChange={setSelectedAnimal}
                            />

                            <div className="select-header">Breed</div>
                            <Select
                                className="filter-select-option"
                                placeholder="Select Breed"
                                filterOption={OptionFilter}
                                filterSort={OptionSort}
                                options={breedOptions} // Assuming you dynamically determine this based on selectedAnimal
                                value={selectedBreed}
                                onChange={setSelectedBreed}
                            />

                            <div className="select-header">Gender</div>
                            <Select
                                className="filter-select-option"
                                placeholder="Select Gender"
                                options={genderOptions}
                                value={selectedGender}
                                onChange={setSelectedGender}
                            />
                        </div>

                    </Row>
                </Col>


                <Col span={18} className="section section3" >

                    <Row className="" wrap={false}>
                        <Col span={1} className="" />
                        <Col span={22} className="">
                            <h1 style={{ color: '#192928' }}>Adoptable Pets: </h1>
                        </Col>
                        <Col span={1} className="" />
                    </Row>


                    <Row> </Row>

                    <div className='scrollable-container'>
                        <Row gutter={[16, 16]} justify="start">
                            {pets.map((pet, index) => {
                                if (pet.Breed === selectedBreed || selectedBreed === "") {
                                    if (pet.Type === selectedAnimal || selectedAnimal === "") {
                                        if (pet.Gender === selectedGender || selectedGender === "") {
                                            return (
                                                <Col key={index} span={7} className={`scrollable-adoption-card`}>
                                                    <AdoptionCard pet={pet} />
                                                </Col>
                                            );
                                        }
                                    }
                                }
                            })}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>

    );
}

export default AdoptionList;
