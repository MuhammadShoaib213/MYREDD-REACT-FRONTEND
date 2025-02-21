import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';  // Assuming you have an authentication context
import { API_CONFIG } from '../config/api.config';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { token } = useAuth();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_CONFIG.API_URL}/auth/search`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { query }
            });
            setResults(response.data.users);
            console.log(response);
        } catch (error) {
            console.error('Search Error:', error);
            alert('Failed to fetch users');
        }
    };

    const sendFriendRequest = async (recipientId) => {
        try {
            await axios.post(`${API_CONFIG.API_URL}/friend/request`, {
                recipientId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Friend request sent!');
        } catch (error) {
            console.error('Friend Request Error:', error);
            alert('Failed to send friend request');
            console.log(recipientId)
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by email, CNIC, or phone"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map(user => (
                    <li key={user.email}>
                        {user.firstName} {user.lastName} - {user.email}
                        <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;
