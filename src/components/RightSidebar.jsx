import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Styled components
const StyledRightSidebar = styled.div`
 width: 300px;
  background-color: #F8F8F8;
  padding: 20px;
  min-height: 60vh;  // Ensures the initial height is 70vh
  height: auto;      // Allows the height to grow as needed
  max-height: 100vh; // Optional: sets a maximum height
  overflow-y: auto;
  border-radius: 10px;
  padding-top: 80px;
`;

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  margin-right: -1px;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: red;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  &:hover {
    background-color: darkred;
  }
`;

const UserCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center; /* Center text and content */
`;

// const ProfilePic = styled.div`
//   width: 60px;
//   height: 60px;
//   background-color: #CCCCCC;
//   border-radius: 50%;
//   background-size: cover;
//   margin: 0 auto 10px; /* Center the profile picture and add margin below */
// `;

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 10px;
`;

const UserInfo = styled.div`
  margin-bottom: 10px;
`;

const FriendButton = styled.button`
  padding: 8px 15px;
  background-color: red;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: darkred;
  }
`;
const SidebarHeading = styled.h2`
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

// RightSidebar Component
const RightSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useAuth();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: searchTerm }
      });
      setSearchResults(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error('Search Error:', error);
      alert('Failed to fetch search results');
    }
  };

  const handleFriendRequest = async (userId) => {
    try {
      await axios.post('http://localhost:5000/api/friend/request', { recipientId: userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Friend request sent!');
      setSearchResults(prevResults => prevResults.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Friend Request Error:', error);
      alert('Failed to send friend request');
    }
  };

  return (
    <StyledRightSidebar>
      <SidebarHeading>Add Friends</SidebarHeading>
      <SearchForm onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
      {searchResults.map(user => (
        <UserCard key={user._id}>
          <ProfilePic
              src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : "https://cdn-icons-png.freepik.com/512/147/147144.png"}
              alt={`${user.firstName} Avatar`}
            />
          <UserInfo>
            <strong>{user.firstName} {user.lastName}</strong>
            <p>{user.email}</p>
          </UserInfo>
          <FriendButton onClick={() => handleFriendRequest(user._id)}>Add Friend</FriendButton>
        </UserCard>
      ))}
    </StyledRightSidebar>
  );
};

export default RightSidebar;
