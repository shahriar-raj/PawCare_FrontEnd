import React from 'react';
import CircleImage from './Components/CircleImage';

export function Profile(props) {
    return (
        <div>
            <CircleImage src="src/assets/cat.png" alt="Profile Picture" diameter="100px" />
            <h1>About</h1>
            Hello World
            props: {props.data.username}
            <br></br>
            password: {props.data.password}
        </div>
    )
}