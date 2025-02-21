import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

const StyledPageContainer = styled.div`

  flex-direction: row; // Default to row for larger screens
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, .7);
  min-height: 100vh;
  padding: 20px;


  @media (max-width: 768px) {
    flex-direction: column; // Stack vertically on smaller screens
    align-items: center; // Center the content for better mobile presentation
  }
`;

// Styled components
const FriendsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 50px; 
    padding-top: 80px;
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

const Header = styled.header`
  background-color: red;
  color: white;
  width: 76%;
  text-align: center;
  padding: 10px 0;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 100px;
  margin-right: 100px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e74c3c;
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    left: 10px;
    width: 100%;
    text-align: center;
  }
`;

const FriendsByCity = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const { token } = useAuth();
  

  const handleMoreDetails = (id) => {
    navigate(`/FriendDetail/${id}`);
  };


  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`/api/friend/friends-by-city/${cityName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && Array.isArray(response.data)) {
          setFriends(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error(`Failed to fetch friends from ${cityName}:`, error);
      }
    };

    fetchFriends();
  }, [cityName, token]);

  return (
    <StyledPageContainer>
    <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
    <FriendsContainer>
      <Header>Business Associates in {cityName}</Header> {/* Dynamic city name display */}
      {friends.map(friend => (
        <FriendCard key={friend._id}>
          <FriendImageContainer>
            <FriendImage
              src={friend.profilePicture ? `${friend.profilePicture}` : "https://cdn-icons-png.freepik.com/512/147/147144.png"}
              alt={`${friend.firstName} Avatar`}
            />
          </FriendImageContainer>
          <FriendInfo>
            <FriendName>{friend.firstName} {friend.lastName}</FriendName>
            <FriendRole>{friend.userRole}</FriendRole>
            <FriendRole>{friend.email}</FriendRole>
            <FriendRole>{friend.city}</FriendRole>
            <MoreDetailsButton onClick={() => handleMoreDetails(friend._id)}>More Details</MoreDetailsButton>
            <ConnectButton onClick={() => window.open(`https://wa.me/${friend.whatsappNumber}`, '_blank')}>Connect Now</ConnectButton>
          </FriendInfo>
        </FriendCard>
      ))}
    </FriendsContainer>
    </StyledPageContainer>
  );
};

export default FriendsByCity;
