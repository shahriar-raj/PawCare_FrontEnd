import React, { useState } from 'react';
import { Avatar, Button, Card, Tabs, List } from 'antd';
import { PlusOutlined, PlusSquareFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './PetProfile.css'; // Make sure to create this CSS file


export function PetProfile(props) {
    // Default to the first tab

    // Mock data for tabs content
    const vaccinationHistory = [
        // ... vaccination history data
    ];

    // Function to  render add button text based on active tab
    const navigate = useNavigate();

    return (
        <div className="pet-profile-container">
            <h1 className="header">Pet Profile</h1>
            <hr className="divider" />
            <div className="pet-info">
                <Avatar size={100} src={localStorage.getItem('petURL')} className="pet-avatar" />
                <div className="pet-details">
                    <h1 className="pet-name">{localStorage.getItem('petName')}</h1>
                    {localStorage.getItem('petBreed')}
                    <br />
                    Age: {localStorage.getItem('petAge')}
                </div>
            </div>
            <List
            // dataSource={diseaseHistory}
            // renderItem={item => (
            //     <List.Item><span className="item-date">{item.date}</span>  <span className="item-disease">{item.disease}</span></List.Item>
            // )}
            />
            <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25", marginLeft:"10%" }} onClick={() => navigate('/profile')}>
                Back
            </Button>
            <Button icon={<PlusSquareFilled style={{ fontSize: '15px' }} />} className="add-button" onClick={() => { navigate('/addvaccine') }}>
                Add Vaccination
            </Button>
        </div>
    );
}
