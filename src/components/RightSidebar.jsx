import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { isValidPhoneNumber } from 'libphonenumber-js';

// Styled components
const StyledRightSidebar = styled.div`
 width: 300px;
  background-color: #F8F8F8;
  padding: 20px;
  min-height: 60vh;  // Ensures the initial height is 70vh
  height: 50vh;      // Allows the height to grow as needed
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

const InviteForm = styled.form`
  display: flex;
  margin-top: 20px;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  margin-right: -1px;
`;

const InviteButton = styled.button`
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

// New styled component for phone input
const PhoneInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  margin-right: -1px;
`;

const RightSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [inviteMethod, setInviteMethod] = useState('email'); // 'email' or 'sms'
  const [showInviteForm, setShowInviteForm] = useState(false);
  const { token } = useAuth();

  const handleSearch = async (event) => {
    event.preventDefault();
    setShowInviteForm(false);
    try {
      const response = await axios.get(`/api/auth/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: searchTerm },
      });
      if (response.data.users && response.data.users.length > 0) {
        setSearchResults(response.data.users);
      } else {
        setSearchResults([]);
        setShowInviteForm(true);
      }
    } catch (error) {
      console.error('Search Error:', error);
      if (error.response && error.response.status === 404) {
        setShowInviteForm(true);
      }
    }
  };

  const handleFriendRequest = async (userId) => {
    try {
      await axios.post(
        '/api/friend/request',
        { recipientId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Friend request sent!');
      setSearchResults((prevResults) =>
        prevResults.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.error('Friend Request Error:', error);
      alert('Failed to send friend request');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleInvite = async (event) => {
    event.preventDefault();
    try {
      if (inviteMethod === 'email') {
        if (!inviteEmail || !isValidEmail(inviteEmail)) {
          alert('Please enter a valid email address.');
          return;
        }
        await axios.post(
          '/api/auth/invite',
          { email: inviteEmail },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Email invite sent!');
        setInviteEmail('');
      } else if (inviteMethod === 'sms') {
        if (!invitePhone || !isValidPhoneNumber(invitePhone)) {
          alert('Please enter a valid phone number.');
          return;
        }
        await axios.post(
          '/api/auth/invite-sms',
          { phoneNumber: invitePhone },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('SMS invite sent!');
        setInvitePhone('');
      }
      setShowInviteForm(false);
    } catch (error) {
      console.error('Invite Error:', error);
      alert('Failed to send invite');
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
      {searchResults.length > 0 ? (
        searchResults.map((user) => (
          <UserCard key={user._id}>
            <ProfilePic
              src={
                user.profilePicture
                  ? `${user.profilePicture}`
                  : 'https://cdn-icons-png.freepik.com/512/147/147144.png'
              }
              alt={`${user.firstName} Avatar`}
            />
            <UserInfo>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <p>{user.email}</p>
            </UserInfo>
            <FriendButton onClick={() => handleFriendRequest(user._id)}>
              Add Friend
            </FriendButton>
          </UserCard>
        ))
      ) : (
        <>
          {showInviteForm && (
            <>
              <p>No users found. Invite someone to join!</p>
              <div>
                <label>
                  <input
                    type="radio"
                    value="email"
                    checked={inviteMethod === 'email'}
                    onChange={() => setInviteMethod('email')}
                  />
                  Invite via Email
                </label>
                <label>
                  <input
                    type="radio"
                    value="sms"
                    checked={inviteMethod === 'sms'}
                    onChange={() => setInviteMethod('sms')}
                  />
                  Invite via SMS
                </label>
              </div>
              <InviteForm onSubmit={handleInvite}>
                {inviteMethod === 'email' ? (
                  <EmailInput
                    type="email"
                    placeholder="Enter email to invite"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                ) : (
                  <PhoneInput
                    type="tel"
                    placeholder="Enter phone number"
                    value={invitePhone}
                    onChange={(e) => setInvitePhone(e.target.value)}
                  />
                )}
                <InviteButton type="submit">Send Invite</InviteButton>
              </InviteForm>
            </>
          )}
        </>
      )}
    </StyledRightSidebar>
  );
};

export default RightSidebar;
