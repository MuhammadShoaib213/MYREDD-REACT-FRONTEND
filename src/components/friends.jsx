// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// // Styled components
// const FriendsContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     gap: 20px;
//     justify-content: center;
//     margin-top: 50px; 
// `;

// const FriendCard = styled.div`
//     border: 1px solid #ccc;
//     padding: 10px;
//     width: 250px;
//     box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//     background-color: #fff;
//     border-radius: 10px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     text-align: center;
//     overflow: hidden;
//     transition: transform 0.3s, box-shadow 0.3s;

//     &:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 4px 10px rgba(0,0,0,0.2);
//     }
// `;

// const FriendImageContainer = styled.div`
//     width: 100%;
//     height: 150px;
//     background-color: #f0f0f0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;
// `;

// const FriendImage = styled.img`
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 3px solid white;
//     position: absolute;
//     bottom: -50px;
// `;

// const FriendInfo = styled.div`
//     margin-top: 60px;
//     padding: 10px 20px;
// `;

// const FriendName = styled.h3`
//     margin: 10px 0 5px;
//     font-size: 18px;
//     color: #333;
// `;

// const FriendRole = styled.p`
//     margin: 0;
//     font-size: 14px;
//     color: #666;
// `;

// const MoreDetailsButton = styled.button`
//     background: none;
//     color: #ff0000;
//     border: none;
//     padding: 5px 0;
//     cursor: pointer;
//     font-size: 14px;
//     text-decoration: underline;
//     &:hover {
//         color: #cc0000;
//     }
// `;

// const ConnectButton = styled.button`
//     background-color: red;
//     color: white;
//     border: none;
//     padding: 10px 20px;
//     cursor: pointer;
//     width: 100%;
//     border-radius: 20px;
//     margin-top: 15px;
//     &:hover {
//         background-color: darkred;
//     }
// `;

// const NoFriendsMessage = styled.div`
//     background-color: white;
//     border-radius: 10px;
//     padding: 20px;
//     margin-top: 50px;
//     text-align: center;
//     width: 100%; // Adjust width as needed
//     box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// `;

// const FriendsList = () => {
//     const [friends, setFriends] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             const decoded = jwtDecode(token);
//             const userId = decoded.userId;

//             axios.get(`/friend/list?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } })
//                 .then(response => {
//                     if (Array.isArray(response.data)) {
//                         const fetchedFriends = response.data.filter(friend => friend._id !== userId);
//                         setFriends(fetchedFriends);
//                         console.log(fetchedFriends);
//                     } else {
//                         console.error('Unexpected data structure:', response.data);
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching friends:', error);
//                 });
//         }
//     }, []);

    // const handleMoreDetails = (id) => {
    //     navigate(`/FriendDetail/${id}`);
    // };

//     return (
//         <FriendsContainer>
//             {friends.map(friend => (
                // <FriendCard key={friend.id}>
                //     <FriendImageContainer>
                //         <FriendImage src={friend.profilePicture || "https://cdn-icons-png.freepik.com/512/147/147144.png"} alt={`${friend.firstName} Avatar`} />
                //     </FriendImageContainer>
                //     <FriendInfo>
                //         <FriendName>{friend.firstName} {friend.lastName}</FriendName>
                //         <FriendRole>{friend.userRole}</FriendRole>
                //         <FriendRole>{friend.email}</FriendRole>
                //         <FriendRole>{friend.city}</FriendRole>
                //         <MoreDetailsButton onClick={() => handleMoreDetails(friend._id)}>More Details</MoreDetailsButton>
                //         <ConnectButton onClick={() => window.open(`https://wa.me/${friend.whatsappNumber}`, '_blank')}>Connect Now</ConnectButton>
                //     </FriendInfo>
                // </FriendCard>
//             ))}
//         </FriendsContainer>
//     );
// };

// export default FriendsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components
const FriendsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 50px; 
`;

const FriendCard = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    width: 250px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
`;

const FriendImageContainer = styled.div`
    width: 100%;
    height: 150px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const FriendImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    position: absolute;
    bottom: -50px;
`;

const FriendInfo = styled.div`
    margin-top: 60px;
    padding: 10px 20px;
`;

const FriendName = styled.h3`
    margin: 10px 0 5px;
    font-size: 18px;
    color: #333;
`;

const FriendRole = styled.p`
    margin: 0;
    font-size: 14px;
    color: #666;
`;

const MoreDetailsButton = styled.button`
    background: none;
    color: #ff0000;
    border: none;
    padding: 5px 0;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    &:hover {
        color: #cc0000;
    }
`;

const ConnectButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    border-radius: 20px;
    margin-top: 15px;
    &:hover {
        background-color: darkred;
    }
`;

// New styled component for the no friends message
const NoFriendsMessage = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin-top: 50px;
    text-align: center;
    width: 70%; // Adjust width as needed
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            axios.get(`/friend/list?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    if (Array.isArray(response.data)) {
                        const fetchedFriends = response.data.filter(friend => friend._id !== userId);
                        setFriends(fetchedFriends);
                        console.log(fetchedFriends);
                    } else {
                        console.error('Unexpected data structure:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching friends:', error);
                });
        }
    }, []);

    const handleMoreDetails = (id) => {
        navigate(`/FriendDetail/${id}`);
    };

    return (
        <FriendsContainer>
            {friends.length > 0 ? (
                friends.map(friend => (
                    <FriendCard key={friend._id}>
                        <FriendImageContainer>
                            {/* <FriendImage src={friend.profilePicture || "https://cdn-icons-png.freepik.com/512/147/147144.png"} alt={`${friend.firstName} Avatar`} /> */}
                            <FriendImage src={friend.profilePicture ? `http://195.179.231.102:6003/${friend.profilePicture}` : 'https://via.placeholder.com/200'} alt={friend.firstName}  />
                        </FriendImageContainer>
                        <FriendInfo>
                            <FriendName>{friend.firstName} {friend.lastName}</FriendName>
                            <FriendRole>{friend.userRole}</FriendRole>
                            <FriendRole>{friend.email}</FriendRole>
                            <FriendRole>{friend.city}</FriendRole>
                            <MoreDetailsButton onClick={() => handleMoreDetails(friend._id)}>More Details</MoreDetailsButton>
                            <ConnectButton onClick={() => window.open(`https://wa.me/${friend.whatsappNumber}`, '_blank')}>WhatsApp Message</ConnectButton>
                        </FriendInfo>
                    </FriendCard>
                ))
            ) : (
                <NoFriendsMessage>No friends available. Please check back later.</NoFriendsMessage>
            )}
        </FriendsContainer>
    );
};

export default FriendsList;
