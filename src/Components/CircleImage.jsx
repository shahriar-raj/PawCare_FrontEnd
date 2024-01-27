import React from 'react';

const CircleImage = ({ src, alt, diameter }) => {
    const style = {
        width: diameter, // Width of the circle
        height: diameter, // Height of the circle
        borderRadius: '50%', // Make the container circular
        overflow: 'hidden', // Ensure the image doesn't overflow the container
        display: 'flex', // Center the image horizontally
        justifyContent: 'center', // Center the image horizontally
        alignItems: 'center', // Center the image vertically
        objectFit: 'cover', // Ensure the image covers the container without stretching
        backgroundColor: 'white' // Set a background color in case the image is missing or slow to load
    };

    return (
        <div style={style}>
            <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};

export default CircleImage;