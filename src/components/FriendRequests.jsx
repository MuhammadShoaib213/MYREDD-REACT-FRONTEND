import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';  // Ensure you have a context that provides auth information

const FriendRequests = () => {
    const [requests, setRequests] = useState([]);
    const { token } = useAuth();  // Get the auth token from context

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/friend/requests', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch friend requests:', error);
            alert('Failed to load friend requests');
        }
    };

    const handleUpdateFriendStatus = async (friendId, action) => {
        try {
            const response = await axios.put('http://localhost:5000/api/friend/update', {
                friendsId: friendId,
                action: action
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert(`Request ${action}ed successfully.`);
            fetchFriendRequests();  // Refresh the list after updating
        } catch (error) {
            console.error('Failed to update friend status:', error);
            alert('Failed to update friend status');
        }
    };

    return (
        <div>
            <h2>Incoming Friend Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.requester.firstName} {request.requester.lastName} wants to connect.
                        <button onClick={() => handleUpdateFriendStatus(request._id, 'accept')}>Accept</button>
                        <button onClick={() => handleUpdateFriendStatus(request._id, 'decline')}>Decline</button>
                        <button onClick={() => handleUpdateFriendStatus(request._id, 'block')}>Block</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequests;
