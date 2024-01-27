import React from 'react';
import CircleImage from './Components/CircleImage';
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export function Profile(props) {
    return (
        <div className="profilediv">
            <div className='profileImg'>
                <CircleImage src="src/assets/cat.png" alt="Profile Picture" diameter="100px" />
            </div>
            <h1>About</h1>
            Hello World
            props: {props.data.username}
            <br></br>
            password: {props.data.password}
            
        </div>
    )
}