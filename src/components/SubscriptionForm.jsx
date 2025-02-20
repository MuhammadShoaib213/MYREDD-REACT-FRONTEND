import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode without curly braces

const SubscriptionForm = () => {
    const { planTitle } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email },
        });

        if (error) {
            console.log(error);
            alert('Error: ' + error.message);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token); // Decode the token
            const userId = decodedToken.sub; // Assuming 'sub' contains the user ID
            saveSubscriptionDetails(email, planTitle, 'Active', userId); // Include the userId in the details
        }
    };

    // Updated to include userId in the POST request
    const saveSubscriptionDetails = async (email, packageName, subscriptionStatus, userId) => {
        try {
            const response = await fetch(' http://localhost:6003/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, packageName, subscriptionStatus, userId }),
            });
            if (response.ok) {
                console.log('Subscription data saved successfully');
                setShowSuccessMessage(true); // Show success message
            } else {
                throw new Error('Failed to save subscription data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Failed to save subscription details');
        }
    };

    return (
        <div>
            {showSuccessMessage && (
                <div style={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white', padding: '20px', zIndex: 1000, borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <h2>Success!</h2>
                    <p>Your transaction has been successfully processed.</p>
                    <button onClick={() => setShowSuccessMessage(false)}>Close</button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h2>Subscribe to {planTitle}</h2>
                <label>Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>Card details
                    <CardElement />
                </label>
                <button type="submit" disabled={!stripe}>Pay</button>
            </form>
        </div>
    );
};

export default SubscriptionForm;
