import React from 'react';

export function About(props) {
    return (
        <div>
            <h1>About</h1>
            Hello World
            props: {props.data.username}
            password: {props.data.password}
        </div>
    )
}