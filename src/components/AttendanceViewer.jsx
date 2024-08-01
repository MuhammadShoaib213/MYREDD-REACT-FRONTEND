import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const styles = {
    container: {
        padding: '20px',
        margin: 'auto',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        margin: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'left',
    },
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#444',
    },
    item: {
        marginBottom: '5px',
        color: '#666',
    },
    error: {
        color: 'red',
        fontSize: '16px',
        marginTop: '10px'
    }
};

const AttendanceViewer = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendanceData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please login.');
                return;
            }

            try {
                const decoded = jwtDecode(token);
                if (!decoded.userId || decoded.role !== 'agency') {
                    console.log('Token data:', decoded);
                    setError('Unauthorized or invalid agency credentials.');
                    return;
                }

                const response = await axios.get(`/attendance/agency/${decoded.userId}`);
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setError('Failed to fetch attendance data. Please try again later.');
            }
        };

        fetchAttendanceData();
    }, []);

    if (error) {
        return <div style={styles.container}><div style={styles.error}>{error}</div></div>;
    }

    return (
        <div style={styles.container}>
            <h1>Attendance Records</h1>
            {attendanceData.length > 0 ? (
                attendanceData.map((item, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.header}>Agent ID: {item.userId._id}</div>
                        <p style={styles.item}>Punch In: {new Date(item.punchIn).toLocaleString()}</p>
                        <p style={styles.item}>Punch Out: {new Date(item.punchOut).toLocaleString()}</p>
                        <p style={styles.item}>Location: {item.location}</p>
                        <p style={styles.item}>Status: {item.status || 'N/A'}</p>
                    </div>
                ))
            ) : (
                <p>No attendance records found.</p>
            )}
        </div>
    );
};

export default AttendanceViewer;
