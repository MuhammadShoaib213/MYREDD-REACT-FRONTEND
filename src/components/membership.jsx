
import {jwtDecode} from 'jwt-decode'; // Corrected import statement for jwt-decode
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        margin: '20px',
    },
    plan: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        width: '300px',
        textAlign: 'center',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        textAlign: 'left',
    },
    listItem: {
        textAlign: 'left',
        paddingBottom: '5px',
    }
};

const Membership = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role.toLowerCase()); // Convert role to lowercase
                console.log('Decoded role:', decoded.role);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const handleSubscribe = (planTitle) => {
        // Navigate to the subscription form
        Navigate(`/subscribe/${planTitle}`);
    };


    const plans = {
        agent: [
            { title: "Agent Basic Plan", features: ["Limited Property Bank", "Customer Database", "Geolocation Integration" ] },
            { title: "Agent Premium Plan", features: ["Unlimited Property Bank", "Customer Database", "Geolocation Integration","Ticket Sharing", "Chat"  ] }
        ],
        agency: [
            { title: "Agency Basic Plan", features: ["Add Agents","Manage Agents", "Limited Property Bank", "Customer Database", "Geolocation Integration" ] },
            { title: "Agency Premium Plan", features: ["Add Agents","Manage Agents","Unlimited Property Bank", "Customer Database", "Geolocation Integration","Ticket Sharing", "Chat"  ] }
        ]
    };

    if (!userRole) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (!plans[userRole]) {
        return <div style={{ color: 'red' }}>Invalid role or no plans available for this role.</div>;
    }

    return (
        <div style={styles.container}>
            {plans[userRole].map((plan, index) => (
                <div key={index} style={styles.plan}>
                    <div style={styles.title}>{plan.title}</div>
                    <ul style={styles.list}>
                        {plan.features.map((feature, index) => (
                            <li key={index} style={styles.listItem}>{feature}</li>
                        ))}
                    </ul>
                    <button onClick={() => handleSubscribe(plan.title)}>Subscribe</button>
                </div>
            ))}
        </div>
    );
};

export default Membership;