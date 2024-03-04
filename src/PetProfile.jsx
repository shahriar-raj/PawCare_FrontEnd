import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Tabs, List, Empty} from 'antd';
import { PlusOutlined, PlusSquareFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './PetProfile.css'; // Make sure to create this CSS file

const { TabPane } = Tabs;

export function PetProfile(props) {
    // Default to the first tab
    const [activeTab, setActiveTab] = useState('1');
    // Mock data for tabs content
    const vaccinationHistory = [
        // ... vaccination history data
    ];

    const [data, setData] = useState([]); // [1]

    // Function to  render add button text based on active tab
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = {
                    petID: localStorage.getItem('petID'),
                }
                const response = await fetch('http://3.89.30.159:3000/profile/viewAllVaccineMessages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const result = await response.json(); // Assuming the response is in JSON format
                console.log(result);
                setData(result.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, []);

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
            <Tabs defaultActiveKey="1" onChange={setActiveTab}>
                <TabPane tab="Vaccination History" key="1">
                    <List
                        dataSource={data}
                        renderItem={item => (
                            <List.Item><span className="item-date">{item.Date.split('T')[0]}</span>  <span className="item-disease">{item.ShortMsg}</span></List.Item>
                        )}
                        locale={{ emptyText: <Empty description="No Vaccination History" /> }}
                    />
                </TabPane>
            </Tabs>
            <Button style={{ backgroundColor: "red", color: "white", fontFamily: "Baloo Da", fontSize: "25", marginLeft: "10%" }} onClick={() => navigate('/profile')}>
                Back
            </Button>
            <Button icon={<PlusSquareFilled style={{ fontSize: '15px' }} />} className="add-button" onClick={() => { navigate('/addvaccine') }}>
                Add Vaccination
            </Button>
        </div>
    );
}
