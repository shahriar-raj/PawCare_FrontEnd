import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, DatePicker, Radio, Button, Row, Col, Input, Select, Upload, message, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHandHoldingDollar, faUsers, faPaw } from '@fortawesome/free-solid-svg-icons';
import './Adopt.css';

const { TextArea } = Input;
const { Option } = Select;

export function Adopt() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleNavigate = (path) => () => {
        navigate(path);
    };

    const onFinish = async (values) => {
        try {
            let obj = {
                applierID: localStorage.getItem('userID'),
                petID: localStorage.getItem('PetID'),
                ageStatus: values['ageConfirmation'],
                vaccinationStatus: values['petsVaccinationsUpToDate'],
                sprayedStatus: values['petsSpayedNeutered'],
                petAloneText: values['petWhenAlone'],
                reasons: values['reasonForAdoption']
            }
            console.log(obj);
            const response = await fetch('http://3.89.30.159:3000/adoption/applyForAdoption', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                message.success('Application submitted successfully!');
                navigate('/adoption');
            }
            else if (response.status === 401) {
                message.error('Application submission failed');
            }
            else {
                console.error("HTTP Error:", response);
            }
        } catch (error) {
            console.error("Error:", error);
        }


        // Here you would handle the form submission to the server
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="adopt-container">
            <div className="profile_header">
                <div className="navigation-buttons">
                    <span className="forum-title">Paw Adoption</span>
                    <Button icon={<FontAwesomeIcon icon={faHome} />} onClick={handleNavigate('/home')} />
                    <Button icon={<FontAwesomeIcon icon={faHandHoldingDollar} />} onClick={handleNavigate('/donation')} />
                    <Button icon={<FontAwesomeIcon icon={faUsers} />} onClick={handleNavigate('/community')} />
                    <FontAwesomeIcon icon={faPaw} size="2x" className="paw-icon" />
                </div>
            </div>

            <div className='adoption-form'>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <h1>Adoption Form</h1>
                    <Form.Item
                        name="ageConfirmation"
                        label="Are you 18 years of age or older?"
                        rules={[{ required: true, message: 'Please select an option!' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="typeOfDwelling"
                        label="Type of Dwelling"
                        rules={[{ required: true, message: 'Please select the type of dwelling!' }]}
                    >
                        <Select placeholder="Please Select">
                            <Option value="house">House</Option>
                            <Option value="apartment">Apartment</Option>
                            <Option value="mobileHome">Mobile Home</Option>
                            {/* Add other dwelling types as needed */}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="reasonForAdoption"
                        label="What is your reason for wanting to adopt a pet?"
                    >
                        <Checkbox.Group>
                            <Row >
                                <Col span={8}>
                                    <Checkbox style={{ color: "#cedfb9" }} value="House Pet">Housepet</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox style={{ color: "#cedfb9" }} value="House Patrol">House Patrol</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox style={{ color: "#cedfb9" }} value="Companion">Companion</Checkbox>
                                </Col>
                                {/* Add other reasons as needed */}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                        name="petWhenAlone"
                        label="If adopting a pet, where would the pet be kept when alone?"
                        rules={[{ required: true, message: 'Please fill in this field!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="petsVaccinationsUpToDate"
                        label="Are your present pets up-to-date on their annual vaccines?"
                        rules={[{ required: true, message: 'Please select an option!' }]}
                    >
                        <Radio.Group>
                            <Radio value="1">Yes</Radio>
                            <Radio value="0">No</Radio>
                            <Radio value="2">N/A</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="petsSpayedNeutered"
                        label="Are your present pets spayed or neutered?"
                        rules={[{ required: true, message: 'Please select an option!' }]}
                    >
                        <Radio.Group>
                            <Radio value="1">Yes</Radio>
                            <Radio value="0">No</Radio>
                            <Radio value="2">N/A</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="additionalInfo"
                        label="If there is anything else you think we should know, please note it here."
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    {/* Additional fields based on the provided images should be implemented here */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '40%' }}>
                            Submit Adoption Application
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}

export default Adopt;
