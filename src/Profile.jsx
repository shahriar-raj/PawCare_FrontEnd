import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Button, Divider, Flex, Radio } from 'antd';


export function Profile(props) {

    return (
        <div>
            <div className="container">
                <div className="profileheader">
                    <img src="src/assets/logo.png" alt="Logo" width="265px" />
                </div>
                <br />
                <div className="first-column">
                    <h1 style={{ textAlign: "center", fontFamily: "Baloo Da", color: "#192928" }}>Profile</h1>
                    <div className='profileImg'>
                        <CircleImage src="src/assets/Vector.png" alt="Profile Picture" diameter="120px" />

                    </div>
                    <h2 className="name">{props.data.userDetails.Username}</h2>
                    <h3 className="name">{props.data.userDetails.Address}</h3>
                    <Button className="p_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} >
                        Notifications
                    </Button>
                    <Button className="p_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} >
                        Messages
                    </Button>
                    <Button className="p_button" style={{ backgroundColor: "#192928", color: "white", fontFamily: "Baloo Da" }} >
                        Edit Profile
                    </Button>
                </div>
                <div className="second-column">
                    <h1>About</h1>
                    Hello World
                    props: {props.data.message}
                </div>
            </div>
        </div>

    )
}