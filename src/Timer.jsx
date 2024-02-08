import React, { useState, useEffect } from 'react';

function Timer({ initialSeconds }) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => {
                if (seconds <= 1) {
                    clearInterval(interval); // Stop the interval
                    return 0; // Set seconds to 0 and stop decrementing
                }
                return seconds - 1;
            });
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ color: "#ff0000", fontFamily: "Baloo Da", marginLeft: "40%", marginBottom: "2%" }} >
            <h2>
                Time Remaining: {seconds} seconds
            </h2>
        </div>
    );
}

export default Timer;