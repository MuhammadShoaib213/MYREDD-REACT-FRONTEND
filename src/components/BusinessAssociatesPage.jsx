
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust import based on your file structure
import FriendsList from './friends';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import bgImage from '../images/bg.jpg';
import {  useNavigate } from 'react-router-dom';




// Adjust the main page container for responsive padding and alignment
const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: row; // Default to row for larger screens
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, .7);
  min-height: 100vh;
  padding: 20px;
  padding-top: 210px;

  @media (max-width: 768px) {
    flex-direction: column; // Stack vertically on smaller screens
    align-items: center; // Center the content for better mobile presentation
  }
`;

// Adjust the sidebar for responsive width and optional hiding
const StyledSidebar = styled.div`
  width: 240px;
  background-color: #F8F8F8;
  height: 100vh;
  padding: 20px;
  overflow-y: auto; // Ensure scrollbar if content is too long

  @media (max-width: 768px) {
    width: 100%; // Full width for smaller screens
    height: auto; // Adjust height to content
    padding: 10px; // Reduce padding on smaller screens
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
    cursor: pointer;
    color: #333;
  }
`;

// Adjust the main content area for responsive presentation
const StyledMainContent = styled.div`
  flex: 1; // Take up all available space
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    width: 100%; // Full width on small screens
    margin-top: 10px; // Add some margin top for spacing
  }
`;

// Styled components
// const StyledPageContainer = styled.div`
//   display: flex;
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, .7);
//   min-height: 100vh;
//   padding: 20px;
// `;

// const StyledSidebar = styled.div`
//   width: 240px;
//   background-color: #F8F8F8;
//   height: 100vh;
//   padding: 20px;

//   ul {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//   }

//   li {
//     margin-bottom: 10px;
//     cursor: pointer;
//     color: #333;
//   }
// `;

// const StyledMainContent = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #FFFFFF;
//   width: 100%;
// `;

const StyledConnectionCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  width: 300px;

  .profile-pic {
    width: 50px;
    height: 50px;
    background-color: #CCCCCC;
    border-radius: 50%;
    margin-right: 10px;
  }

  .info {
    flex: 1;
  }

  button {
    padding: 5px 15px;
    background-color: #0073B1;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    
    &:hover {
      background-color: #005691;
    }
  }
`;

const Badge = styled.span`
  background-color: red;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 50%;
  margin-left: 10px;
`;

const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  padding: 10px 20px; // Adjusted padding if needed more
  border-bottom: 3px solid #0073B1;
  border-radius: 18px 18px 18px 18px; // Add rounded corners to the bottom
  margin: 0 20px; // Add margin to the left and right sides
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); // Optional: adding shadow for better visibility
`;

const Tab = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #0073B1;
  padding: 10px 20px;
  margin: 0 10px;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-bottom: 3px solid #0073B1;
  }
`;

const ActiveTab = styled(Tab)`
  font-weight: bold;
  color: #005691;
  border-bottom: 3px solid #0073B1;
`;

const StyledCatchUpContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  align-items: center;
  background-color: #FFFFFF;
  width: 80%; // Maintain the width as previously set
  margin: 20px auto; // Add top margin and keep center alignment
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const button = styled.button`
  padding: 5px 15px;
  background-color: #0073B1;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 5px; // Added space between buttons
  &:hover {
    background-color: #005691;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  color: white;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const NoRequestsMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 20px; // Space from the top of the container
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


const TopBar = ({ activeTab, setActiveTab, friendRequestCount }) => (
  <StyledTopBar>
    <Tab onClick={() => setActiveTab('main')} style={activeTab === 'main' ? { borderBottom: '3px solid #0073B1' } : null}>
      Associates
    </Tab>
    <Tab onClick={() => setActiveTab('catchUp')} style={activeTab === 'catchUp' ? { borderBottom: '3px solid #0073B1' } : null}>
      Connection Requests
      {friendRequestCount > 0 && <Badge>{friendRequestCount}</Badge>}
    </Tab>
  </StyledTopBar>
);

const ConnectionCard = ({ id, name, role, showOptions, setShowOptions, onAccept, onDecline }) => {
  const toggleOptions = () => {
    setShowOptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <StyledConnectionCard>
      <div className="profile-pic"></div>
      <div className="info">
        <strong>{name}</strong>
        <p>{role}</p>
      </div>
      {!showOptions[id] ? (
        <button onClick={toggleOptions}>Respond</button>
      ) : (
        <>
          <button onClick={() => onAccept(id)}>Accept</button>
          <button onClick={() => onDecline(id)}>Decline</button>
        </>
      )}
    </StyledConnectionCard>
  );
};

const MainTabContent = ({ onSearchSubmit, searchResults, onAddFriend }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = e => setSearchTerm(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <StyledMainContent>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.map(user => (
        <ConnectionCard
          key={user._id}
          id={user._id}
          name={`${user.firstName} ${user.lastName}`}
          role={user.email}
          onConnect={() => onAddFriend(user._id)}
          buttonText="Send Connection Request"
        />
      ))}
    </StyledMainContent>
  );
};

const CatchUpContent = ({ friendRequests, handleAcceptFriendRequest, handleDeclineFriendRequest }) => {
  if (friendRequests.length === 0) {
    return (
      <StyledCatchUpContent>
        <NoRequestsMessage>No Connection Request available.</NoRequestsMessage>
      </StyledCatchUpContent>
    );
  }

  return (
    <StyledCatchUpContent>
      {friendRequests.map(request => (
        <StyledConnectionCard key={request._id}>
          <div className="profile-pic"></div>
          <div className="info">
            <strong>{request.requester.firstName} {request.requester.lastName}</strong>
            <p>Wants to connect</p>
          </div>
          <button onClick={() => handleAcceptFriendRequest(request._id)}>Accept</button>
          <button onClick={() => handleDeclineFriendRequest(request._id)}>Decline</button>
        </StyledConnectionCard>
      ))}
    </StyledCatchUpContent>
  );
};

const BusinessAssociatesPage = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate(); 

  // useEffect(() => {
  //   const fetchFriendRequests = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/friend/requests', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setFriendRequests(response.data);
  //       setFriendRequestCount(response.data.length);
  //     } catch (error) {
  //       console.error('Failed to fetch friend requests:', error);
  //     }
  //   };

  //   fetchFriendRequests();
  // }, [token]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/friend/requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFriendRequests(response.data);
            setFriendRequestCount(response.data.length);
        } catch (error) {
            console.error('Failed to fetch friend requests:', error);
        }
    };

    fetchFriendRequests();
    const intervalId = setInterval(fetchFriendRequests, 3000); // 30 seconds

    return () => clearInterval(intervalId);
}, [token]);


  const handleAcceptFriendRequest = async (requestId) => {
    try {
      await axios.put('http://localhost:5000/api/friend/update', { 
        friendsId: requestId,
        action: 'accept'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriendRequests(prev => prev.filter(req => req._id !== requestId));
      alert('Friend request accepted!');
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('Failed to accept friend request');
    }
  };

  const handleDeclineFriendRequest = async (requestId) => {
    try {
      await axios.put('http://localhost:5000/api/friend/update', { 
        friendsId: requestId,
        action: 'decline'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriendRequests(prev => prev.filter(req => req._id !== requestId));
      alert('Friend request declined!');
    } catch (error) {
      console.error('Error declining friend request:', error);
      alert('Failed to decline friend request');
    }
  };

  return (
    <StyledPageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <LeftSidebar />
      <div style={{ flex: 1 }}>
        <TopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          friendRequestCount={friendRequestCount}
        />
        {activeTab === 'main' && <FriendsList />}
        {activeTab === 'catchUp' && <CatchUpContent friendRequests={friendRequests} handleAcceptFriendRequest={handleAcceptFriendRequest} handleDeclineFriendRequest={handleDeclineFriendRequest} />}
      </div>
      <br/>
      <RightSidebar />
    </StyledPageContainer>
  );
};

export default BusinessAssociatesPage;
