import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement

const styles = {
    container: {
        padding: '40px',
        margin: '40px auto',
        maxWidth: '800px',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px'
    },
    unauthorized: {
        fontSize: '20px',
        color: 'red',
        marginTop: '20px'
    },
    button: {
        padding: '15px 30px',
        fontSize: '18px',
        margin: '20px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
    },
    timeDisplay: {
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '30px',
    }
};

const AttendanceModule = () => {
    const [user, setUser] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.agencyId) {
                    setUser({
                        userId: decoded.userId,
                        role: decoded.role,
                        agencyId: decoded.agencyId
                    });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }

        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handlePunch = async (type) => {
        if (!user || user.role !== 'agent') {
            alert('Unauthorized action. Only registered agents can punch in or out.');
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
                const url = `/attendance/${type}`;
                try {
                    const { data } = await axios.post(url, {
                        userId: user.userId,
                        agencyId: user.agencyId,
                        location
                    });
                    alert(`Successfully ${type.replace('-', ' ')}ed at ${location}.`);
                } catch (error) {
                    console.error('Failed to update attendance:', error);
                    alert('Failed to update attendance. Please try again.');
                }
            },
            (error) => {
                alert('Error obtaining location. Please ensure location services are enabled.');
            }
        );
    };

    if (!user || !user.agencyId) {
        return <div style={styles.container}>
            <div style={styles.unauthorized}>Unauthorized: No valid agency ID found in token.</div>
        </div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.timeDisplay}>{currentTime}</div>
            <button style={styles.button} onClick={() => handlePunch('punch-in')}>Punch In</button>
            <button style={styles.button} onClick={() => handlePunch('punch-out')}>Punch Out</button>
        </div>
    );
};

export default AttendanceModule;
