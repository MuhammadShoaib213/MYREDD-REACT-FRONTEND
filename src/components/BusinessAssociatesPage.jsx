// // import React from 'react';
// // import styled from 'styled-components';

// // // Styled components
// // const StyledSidebar = styled.div`
// //   width: 240px;
// //   background-color: #F8F8F8;
// //   height: 100vh;
// //   padding: 20px;

// //   ul {
// //     list-style: none;
// //     padding: 0;
// //     margin: 0;
// //   }

// //   li {
// //     margin-bottom: 10px;
// //     cursor: pointer;
// //     color: #333;
// //   }
// // `;

// // const StyledTopBar = styled.div`
// //   display: flex;
// //   background-color: #FFFFFF;
// //   padding: 10px 20px;
// //   border-bottom: 1px solid #E0E0E0;

// //   button {
// //     margin-right: 20px;
// //     background: none;
// //     border: none;
// //     color: #0073B1;
// //     font-size: 16px;
// //     cursor: pointer;

// //     &:hover {
// //       text-decoration: underline;
// //     }
// //   }
// // `;

// // const StyledMainContent = styled.div`
// //   padding: 20px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   background-color: #FFFFFF;
// // `;

// // const StyledConnectionCard = styled.div`
// //   display: flex;
// //   align-items: center;
// //   background-color: #FFFFFF;
// //   border: 1px solid #E0E0E0;
// //   border-radius: 8px;
// //   padding: 10px;
// //   margin-bottom: 10px;
// //   width: 300px;

// //   .profile-pic {
// //     width: 50px;
// //     height: 50px;
// //     background-color: #CCCCCC;
// //     border-radius: 50%;
// //     margin-right: 10px;
// //   }

// //   .info {
// //     flex: 1;
// //   }

// //   button {
// //     padding: 5px 15px;
// //     background-color: #0073B1;
// //     border: none;
// //     border-radius: 5px;
// //     color: white;
// //     cursor: pointer;
    
// //     &:hover {
// //       background-color: #005691;
// //     }
// //   }
// // `;

// // const StyledRightSidebar = styled.div`
// //   width: 200px;
// //   background-color: #F8F8F8;
// //   padding: 20px;
// //   height: 100vh;
// // `;

// // // React components
// // function Sidebar() {
// //   return (
// //     <StyledSidebar>
// //       <ul>
// //         <li>Connections</li>
// //         <li>Contacts</li>
// //         <li>Following & Followers</li>
// //         {/* Add more items as per your design */}
// //       </ul>
// //     </StyledSidebar>
// //   );
// // }

// // function TopBar() {
// //   return (
// //     <StyledTopBar>
// //       <button>Grow</button>
// //       <button>Catch up</button>
// //     </StyledTopBar>
// //   );
// // }

// // function MainContent() {
// //   const connections = [
// //     { name: "Aaron An", role: "CEO at KT Rwanda Networks" },
// //     { name: "Francis Kweli", role: "--" },
// //     { name: "Munyaneza Abdul", role: "Enhancing well-being of young generation" }
// //   ];

// //   return (
// //     <StyledMainContent>
// //       {connections.map(conn => <ConnectionCard key={conn.name} {...conn} />)}
// //     </StyledMainContent>
// //   );
// // }

// // function ConnectionCard({ name, role }) {
// //   return (
// //     <StyledConnectionCard>
// //       <div className="profile-pic"></div>
// //       <div className="info">
// //         <strong>{name}</strong>
// //         <p>{role}</p>
// //       </div>
// //       <button>Connect</button>
// //     </StyledConnectionCard>
// //   );
// // }

// // function RightSidebar() {
// //   return (
// //     <StyledRightSidebar>
// //       {/* <div>Try for PKR0</div> */}
// //       {/* Additional elements */}
// //     </StyledRightSidebar>
// //   );
// // }

// // function BusinessAssociatesPage() {
// //   return (
// //     <div style={{ display: 'flex' }}>
// //       <Sidebar />
// //       <div style={{ flex: 1 }}>
// //         <TopBar />
// //         <MainContent />
// //       </div>
// //       <RightSidebar />
// //     </div>
// //   );
// // }

// // export default BusinessAssociatesPage;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useAuth } from './AuthContext'; // Adjust import based on your file structure
// import FriendsList from './friends';
// import RightSidebar from './RightSidebar';
// import LeftSidebar from './LeftSidebar';
// import bgImage from '../images/bg.jpg';

// // Styled components
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

// const StyledConnectionCard = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #FFFFFF;
//   border: 1px solid #E0E0E0;
//   border-radius: 8px;
//   padding: 10px;
//   margin-bottom: 10px;
//   width: 300px;

//   .profile-pic {
//     width: 50px;
//     height: 50px;
//     background-color: #CCCCCC;
//     border-radius: 50%;
//     margin-right: 10px;
//   }

//   .info {
//     flex: 1;
//   }

//   button {
//     padding: 5px 15px;
//     background-color: #0073B1;
//     border: none;
//     border-radius: 5px;
//     color: white;
//     cursor: pointer;
    
//     &:hover {
//       background-color: #005691;
//     }
//   }
// `;

// const Badge = styled.span`
//   background-color: red;
//   color: white;
//   padding: 2px 6px;
//   font-size: 12px;
//   border-radius: 50%;
//   margin-left: 10px;
// `;


// // Styled components
// const StyledTopBar = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #FFFFFF;
//   padding: 10px 20px; // Adjusted padding if needed more
//   border-bottom: 3px solid #0073B1;
//   border-radius: 18px 18px 18px 18px; // Add rounded corners to the bottom
//   margin: 0 20px; // Add margin to the left and right sides
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1); // Optional: adding shadow for better visibility
// `;

// const Tab = styled.button`
//   background: none;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   font-size: 16px;
//   color: #0073B1;
//   padding: 10px 20px;
//   margin: 0 10px;
//   border-bottom: 3px solid transparent;
//   transition: all 0.3s ease;

//   &:hover {
//     border-bottom: 3px solid #0073B1;
//   }
// `;

// const ActiveTab = styled(Tab)`
//   font-weight: bold;
//   color: #005691;
//   border-bottom: 3px solid #0073B1;
// `;


// const StyledCatchUpContent = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   border-radius: 15px;
//   align-items: center;
//   background-color: #FFFFFF;
//   width: 80%; // Maintain the width as previously set
//   margin: 20px auto; // Add top margin and keep center alignment
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// `;

// // Adjusting button styling to include spacing
// const button = styled.button`
//   padding: 5px 15px;
//   background-color: #0073B1;
//   border: none;
//   border-radius: 5px;
//   color: white;
//   cursor: pointer;
//   margin: 5px; // Added space between buttons
//   &:hover {
//     background-color: #005691;
//   }
// `;

// // Optionally creating a styled div for no requests message
// const NoRequestsMessage = styled.div`
//   text-align: center;
//   color: #666;
//   font-size: 16px;
//   margin-top: 20px; // Space from the top of the container
// `;



//   // Define TopBar here
//   const TopBar = ({ activeTab, setActiveTab, friendRequestCount }) => (
//     <StyledTopBar>
//       <Tab onClick={() => setActiveTab('main')} style={activeTab === 'main' ? { borderBottom: '3px solid #0073B1' } : null}>
//         Friends
//       </Tab>
//       <Tab onClick={() => setActiveTab('catchUp')} style={activeTab === 'catchUp'  ? { borderBottom: '3px solid #0073B1' } : null}>
//         Catch up
//         {friendRequestCount > 0 && <Badge>{friendRequestCount}</Badge>}
//       </Tab>
//     </StyledTopBar>
//   );
  

// // Connection Card Component with toggle options for response
// const ConnectionCard = ({ id, name, role, showOptions, setShowOptions, onAccept, onDecline }) => {
//   const toggleOptions = () => {
//     setShowOptions(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   return (
//     <StyledConnectionCard>
//       <div className="profile-pic"></div>
//       <div className="info">
//         <strong>{name}</strong>
//         <p>{role}</p>
//       </div>
//       {!showOptions[id] ? (
//         <button onClick={toggleOptions}>Respond</button>
//       ) : (
//         <>
//           <button onClick={() => onAccept(id)}>Accept</button>
//           <button onClick={() => onDecline(id)}>Decline</button>
//         </>
//       )}
//     </StyledConnectionCard>
//   );
// };

// // MainTab Content Component
// const MainTabContent = ({ onSearchSubmit, searchResults, onAddFriend }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = e => setSearchTerm(e.target.value);

//   const handleSubmit = e => {
//     e.preventDefault();
//     onSearchSubmit(searchTerm);
//   };

//   return (
//     <StyledMainContent>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Search by name, email, or phone"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <button type="submit">Search</button>
//       </form>
//       {searchResults.map(user => (
//         <ConnectionCard
//           key={user._id}
//           id={user._id}
//           name={`${user.firstName} ${user.lastName}`}
//           role={user.email}
//           onConnect={() => onAddFriend(user._id)}
//           buttonText="Add Friend"
//         />
//       ))}
//     </StyledMainContent>
//   );
// };

// const CatchUpContent = ({ friendRequests, handleAcceptFriendRequest, handleDeclineFriendRequest }) => {
//     if (friendRequests.length === 0) {
//       return (
//         <StyledCatchUpContent>
//           <NoRequestsMessage>No friend requests available.</NoRequestsMessage>
//         </StyledCatchUpContent>
//       );
//     }
  
//     return (
//       <StyledCatchUpContent>
//         {friendRequests.map(request => (
//           <StyledConnectionCard key={request._id}>
//             <div className="profile-pic"></div>
//             <div className="info">
//               <strong>{request.requester.firstName} {request.requester.lastName}</strong>
//               <p>Wants to connect</p>
//             </div>
//             <button onClick={() => handleAcceptFriendRequest(request._id)}>Accept</button>
//             <button onClick={() => handleDeclineFriendRequest(request._id)}>Decline</button>
//           </StyledConnectionCard>
//         ))}
//       </StyledCatchUpContent>
//     );
//   };


// // Business Associates Page Component
// const BusinessAssociatesPage = () => {
//   const [activeTab, setActiveTab] = useState('main');
//   const [friendRequestCount, setFriendRequestCount] = useState(0);
//   const [friendRequests, setFriendRequests] = useState([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchFriendRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/friend/requests', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setFriendRequests(response.data);
//         setFriendRequestCount(response.data.length);
//       } catch (error) {
//         console.error('Failed to fetch friend requests:', error);
//       }
//     };

//     fetchFriendRequests();
//   }, [token]);

  
//   const handleAcceptFriendRequest = async (requestId) => {
//     try {
//       await axios.put('http://localhost:5000/api/friend/update', { 
//         friendsId: requestId,
//         action: 'accept'
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       // Updating the local state or UI as needed after successful operation
//       setFriendRequests(prev => prev.filter(req => req._id !== requestId));
//       alert('Friend request accepted!');
//     } catch (error) {
//       console.error('Error accepting friend request:', error);
//       alert('Failed to accept friend request');
//     }
//   };
  
//   const handleDeclineFriendRequest = async (requestId) => {
//     try {
//       await axios.put('http://localhost:5000/api/friend/update', { 
//         friendsId: requestId,
//         action: 'decline'
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setFriendRequests(prev => prev.filter(req => req._id !== requestId));
//       alert('Friend request declined!');
//     } catch (error) {
//       console.error('Error declining friend request:', error);
//       alert('Failed to decline friend request');
//     }
//   };
  

//   return (
//     <StyledPageContainer>
//               <LeftSidebar />
//       {/* <div style={{ flex: 1 }}>
//         <TopBar activeTab={activeTab} setActiveTab={setActiveTab} friendRequestCount={friendRequestCount} />
//         {activeTab === 'main' && <MainTabContent onSearchSubmit={handleSearchSubmit} searchResults={searchResults} onAddFriend={handleAddFriend} />}
//         {activeTab === 'catchUp' && <CatchUpContent friendRequests={friendRequests} onAcceptFriendRequest={handleAcceptFriendRequest} onDeclineFriendRequest={handleDeclineFriendRequest} />}
//       </div> */}
//       <div style={{ flex: 1 }}>
//       <TopBar
//   activeTab={activeTab}
//   setActiveTab={setActiveTab}
//   friendRequestCount={friendRequestCount}
//   handleAcceptFriendRequest={handleAcceptFriendRequest}
//   handleDeclineFriendRequest={handleDeclineFriendRequest}
// />
//         {activeTab === 'main' && <FriendsList />}
//         {activeTab === 'catchUp' && <CatchUpContent friendRequests={friendRequests} />}
//       </div>
//       <RightSidebar />
//     </StyledPageContainer>
//   );
// };

// export default BusinessAssociatesPage;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust import based on your file structure
import FriendsList from './friends';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import bgImage from '../images/bg.jpg';



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

const NoRequestsMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 20px; // Space from the top of the container
`;

const TopBar = ({ activeTab, setActiveTab, friendRequestCount }) => (
  <StyledTopBar>
    <Tab onClick={() => setActiveTab('main')} style={activeTab === 'main' ? { borderBottom: '3px solid #0073B1' } : null}>
      Friends
    </Tab>
    <Tab onClick={() => setActiveTab('catchUp')} style={activeTab === 'catchUp' ? { borderBottom: '3px solid #0073B1' } : null}>
      Catch up
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
          buttonText="Add Friend"
        />
      ))}
    </StyledMainContent>
  );
};

const CatchUpContent = ({ friendRequests, handleAcceptFriendRequest, handleDeclineFriendRequest }) => {
  if (friendRequests.length === 0) {
    return (
      <StyledCatchUpContent>
        <NoRequestsMessage>No friend requests available.</NoRequestsMessage>
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
