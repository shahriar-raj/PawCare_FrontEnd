import React, { useState } from 'react';
import { Avatar, Button, Card, Tabs, List } from 'antd';
import { PlusOutlined, PlusSquareFilled } from '@ant-design/icons';
import './PetProfile.css'; // Make sure to create this CSS file

const { TabPane } = Tabs;

export function PetProfile(props) {
    const [activeTab, setActiveTab] = useState('1'); // Default to the first tab

    // Mock data for tabs content
    const diseaseHistory = [
        { date: '2023, Nov', disease: 'Canine influenza / Dog Flu' },
        { date: '2023, Nov', disease: 'Canine influenza / Dog Flu' },
        { date: '2023, Nov', disease: 'Canine influenza / Dog Flu' },
        // ... other disease history
    ];
    const allergyHistory = [
        // ... allergy history data
    ];
    const vaccinationHistory = [
        // ... vaccination history data
    ];

    // Function to render add button text based on active tab
    const renderAddButtonText = () => {
        switch (activeTab) {
            case '1': return 'Add Disease';
            case '2': return 'Add Allergy';
            case '3': return 'Add Vaccination';
            default: return '';
        }
    };

    return (
        <div className="pet-profile-container">
            <h1 className="header">Pet Profile</h1>
            <hr className="divider" />
            <div className="pet-info">
                <Avatar size={100} src="./src/assets/cutu.png" className="pet-avatar" />
                <div className="pet-details">
                    <h1 className="pet-name">{localStorage.getItem('petName')}</h1>
                    <p className="pet-breed">{localStorage.getItem('petBreed')}</p>
                    <p className="pet-age">Age: {localStorage.getItem('petAge')}</p>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={setActiveTab}>
                <TabPane tab="Disease History" key="1">
                    <List
                        dataSource={diseaseHistory}
                        renderItem={item => (
                            <List.Item><span className="item-date">{item.date}</span>  <span className="item-disease">{item.disease}</span></List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="Allergy History" key="2">
                    {/* Render allergy history */}
                </TabPane>
                <TabPane tab="Vaccination History" key="3">
                    {/* Render vaccination history */}
                </TabPane>
            </Tabs>
            <Button icon={<PlusSquareFilled style={{ fontSize: '15px' }} />} className="add-button">
                {renderAddButtonText()}
            </Button>
        </div>
    );
}
