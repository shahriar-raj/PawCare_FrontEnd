import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter ,faHorse,faCat,faCrow,faMapMarkerAlt ,faDog,faUsers,faComments ,faCheckCircle,faHome, faHandHoldingDollar, faPaw, faImage, faPlayCircle, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined,SendOutlined } from '@ant-design/icons';
import { Row, Col,Card, Avatar, Select, Input, Upload, Typography } from 'antd';
import { TwitterOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import './AdoptionList.css';
import './AdoptionCard.css'

const AdoptionCard = ({ pet }) => {
    return (
        <Card className="adoption-card">
            <img src={pet.image} alt={pet.name} className="pet-image" />
            <div className="pet-details">
                <div className="pet-name">
                    <h3>{pet.name}</h3>
                    <FontAwesomeIcon icon={faCheckCircle} className="verified-icon" />
                </div>

                <span>{pet.breed}</span>
                <span>{pet.age}</span>
                <span>{pet.location}</span> 
             
                <div className="pet-actions" style={{marginTop:'3%'}}>
                    <Button type="primary" className="pet-action-button" style={{marginRight:'3%'}}>Adopt</Button>
                    <Button className="pet-action-button"> Pet Profile</Button>
                </div>
            </div>
        </Card>
    );
};

export function AdoptionList(props) {
    const navigate = useNavigate();
    
    
     // Add your pet data here
     const pets = props.pets || [
        {
          name: 'Kingsley',
          breed: 'Pit Bull Terrier',
          age: 'Adult - Medium',
          location: 'Kwigumpainukamiut, AK',
          image: 'src/assets/cutu.png' // Replace with actual image path
        },
        {
          name: 'Bella',
          breed: 'Labrador Retriever',
          age: 'Young - Large',
          location: 'Juneau, AK',
          image: 'src/assets/cutu.png' // Replace with actual image path
        },
        {
          name: 'Charlie',
          breed: 'Border Collie',
          age: 'Puppy - Small',
          location: 'Fairbanks, AK',
          image: 'src/assets/cutu.png' // Replace with actual image path
        },
        {
            name: 'Kingsley',
            breed: 'Pit Bull Terrier',
            age: 'Adult - Medium',
            location: 'Kwigumpainukamiut, AK',
            image: 'src/assets/cutu.png' // Replace with actual image path
          },
          {
            name: 'Bella',
            breed: 'Labrador Retriever',
            age: 'Young - Large',
            location: 'Juneau, AK',
            image: 'src/assets/cutu.png' // Replace with actual image path
          },
          {
            name: 'Charlie',
            breed: 'Border Collie',
            age: 'Puppy - Small',
            location: 'Fairbanks, AK',
            image: 'src/assets/cutu.png' // Replace with actual image path
          }
      ];


    const handleNavigate = (path) => () => {
        navigate(path);
    };
    
   


    // Handle file selection
    const handleFileChange = info => {
        // ... (upload logic here)
    };

    const [petCount, setPetCount] = useState(9); 
    const [selectedAnimal, setSelectedAnimal] = useState(undefined);
    const [selectedBreed, setSelectedBreed] = useState(undefined);
    const [selectedAge, setSelectedAge] = useState(undefined);
    const [selectedGender, setSelectedGender] = useState(undefined);

    // Example options for each Select
    const animalOptions = [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'horse', label: 'Horse' },
    ];
    const breedOptions =  [
        { value: 'breed1', label: 'Breed1' },
        { value: 'breed2', label: 'Breed2' },
    ];
    const ageOptions = [
        { value: 'puppy', label: 'Puppy/Kitten' },
        { value: 'young', label: 'Young' },
        { value: 'adult', label: 'Adult' },
        { value: 'senior', label: 'Senior' },
    ];
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
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
            <div className="profile_header-adopt">
            <img src="src/assets/logo.png" alt="Logo" width="20%" />
                <Button className='logout' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "30%" }} onClick={handleLog}>
                    Logout
                </Button>
                <Button className='Donation' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    Donation
                </Button>
                <Button className='Adoption' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/profile') }}>
                    Profile
                </Button>
                <Button className='Notification' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/notifications') }}>
                    Notification
                </Button>
                <Button className='About' style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da", marginLeft: "2%" }} onClick={() => { navigate('/donation') }}>
                    About
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
                                    <FontAwesomeIcon icon={faDog} size="2x" style={{ margin: '5%', marginTop : '20%' }} />
                                    <FontAwesomeIcon icon={faCat} size="2x" style={{ margin: '5%', marginTop : '20%' }} />
                                    <FontAwesomeIcon icon={faCrow} size="2x" style={{ margin: '5%', marginTop : '20%' }} />
                                    <FontAwesomeIcon icon={faHorse} size="2x" style={{ margin: '5%', marginTop : '20%' }} />
                                </div>
                                <h2>Pet Count for Adoption: {petCount} </h2>
                            </div>
                        </Card>
                    </Row>       

                    <Row className="section section2">
                        
                            <div className="select-container">
                                
                                <h2><FontAwesomeIcon icon={faFilter} size="1x" style={{ marginRight: '2%'}} />Filter</h2>
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

                                <div className="select-header">Age</div>
                                <Select
                                    className="filter-select-option"
                                    placeholder="Select Age"
                                    options={ageOptions}
                                    value={selectedAge}
                                    onChange={setSelectedAge}
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
                        <Col span={1} className=""/>
                        <Col span={22} className="">
                            <h1 style={{color:'#192928'}}>Adoptable Pets: </h1>
                        </Col>
                        <Col span={1} className=""/>
                    </Row>


                    <Row> </Row>

                    <div className='scrollable-container'>
                        <Row gutter={[16, 16]} wrap={false}>
                            
                            {pets.map((pet, index) => (
                                <Col key={index} span={7} className={`scrollable-adoption-card`}>
                                <AdoptionCard pet={pet} />
                                </Col>
                            ))}
                            
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        
    );
}

export default AdoptionList;
