// // // import React, { useState, useEffect } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import axios from 'axios';
// // // import { useAuth } from './AuthContext';
// // // import styled from 'styled-components';

// // // const CardsContainer = styled.div`
// // //   display: flex;
// // //   flex-wrap: wrap;
// // //   justify-content: space-around;
// // // `;

// // // const Card = styled.div`
// // //   width: 300px;
// // //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// // //   margin: 10px;
// // //   border-radius: 8px;
// // //   overflow: hidden;
// // //   background: white;
// // // `;

// // // const CardImage = styled.div`
// // //   img {
// // //     width: 100%;
// // //     height: 150px;
// // //     object-fit: cover;
// // //   }
// // // `;

// // // const CardContent = styled.div`
// // //   padding: 10px;
// // //   text-align: center;
// // // `;

// // // const Button = styled.button`
// // //   margin: 5px;
// // //   padding: 10px 20px;
// // //   border: none;
// // //   border-radius: 5px;
// // //   color: white;
// // //   cursor: pointer;
// // //   background-color: ${props => props.primary ? 'red' : 'gray'};
// // // `;

// // // const FriendsByCity = () => {
// // //   const { cityName } = useParams();
// // //   const [friends, setFriends] = useState([]);
// // //   const { token } = useAuth();

// // //   useEffect(() => {
// // //     const fetchFriends = async () => {
// // //       try {
// // //         const response = await axios.get(`/friend/friends-by-city/${cityName}`, {
// // //           headers: { Authorization: `Bearer ${token}` }
// // //         });
// // //         if (response.data && Array.isArray(response.data)) {
// // //           setFriends(response.data);
// // //         } else {
// // //           console.error('Unexpected response structure:', response.data);
// // //         }
// // //       } catch (error) {
// // //         console.error(`Failed to fetch friends from ${cityName}:`, error);
// // //       }
// // //     };

// // //     fetchFriends();
// // //   }, [cityName, token]);

// // //   return (
// // //     <div>
// // //       <h1>Friends in {cityName}</h1>
// // //       <CardsContainer>
// // //         {friends.map(friend => (
// // //           <Card key={friend._id}>
// // //             <CardImage>
// // //               <img src={friend.profilePicture || "https://cdn-icons-png.freepik.com/512/147/147144.png"} alt={`${friend.firstName} Avatar`} />
// // //             </CardImage>
// // //             <CardContent>
// // //               <h2>{friend.firstName} {friend.lastName}</h2>
// // //               <p>{friend.jobTitle}</p>
// // //               <p>{friend.email}</p>
// // //               <p>{friend.city}</p>
// // //               <Button primary>More Details</Button>
// // //               <Button>Connect Now</Button>
// // //             </CardContent>
// // //           </Card>
// // //         ))}
// // //       </CardsContainer>
// // //     </div>
// // //   );
// // // };

// // // export default FriendsByCity;


// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import { useAuth } from './AuthContext';
// // import styled from 'styled-components';

// // // Styled components
// // const FriendsContainer = styled.div`
// //     display: flex;
// //     flex-wrap: wrap;
// //     gap: 20px;
// //     justify-content: center;
// //     margin-top: 50px; 
// // `;

// // const FriendCard = styled.div`
// //     border: 1px solid #ccc;
// //     padding: 10px;
// //     width: 250px;
// //     box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// //     background-color: #fff;
// //     border-radius: 10px;
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     text-align: center;
// //     overflow: hidden;
// //     transition: transform 0.3s, box-shadow 0.3s;

// //     &:hover {
// //         transform: translateY(-5px);
// //         box-shadow: 0 4px 10px rgba(0,0,0,0.2);
// //     }
// // `;

// // const FriendImageContainer = styled.div`
// //     width: 100%;
// //     height: 150px;
// //     background-color: #f0f0f0;
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //     position: relative;
// // `;

// // const FriendImage = styled.img`
// //     width: 100px;
// //     height: 100px;
// //     border-radius: 50%;
// //     object-fit: cover;
// //     border: 3px solid white;
// //     position: absolute;
// //     bottom: -50px;
// // `;

// // const FriendInfo = styled.div`
// //     margin-top: 60px;
// //     padding: 10px 20px;
// // `;

// // const FriendName = styled.h3`
// //     margin: 10px 0 5px;
// //     font-size: 18px;
// //     color: #333;
// // `;

// // const FriendRole = styled.p`
// //     margin: 0;
// //     font-size: 14px;
// //     color: #666;
// // `;

// // const MoreDetailsButton = styled.button`
// //     background: none;
// //     color: #ff0000;
// //     border: none;
// //     padding: 5px 0;
// //     cursor: pointer;
// //     font-size: 14px;
// //     text-decoration: underline;
// //     &:hover {
// //         color: #cc0000;
// //     }
// // `;

// // const ConnectButton = styled.button`
// //     background-color: red;
// //     color: white;
// //     border: none;
// //     padding: 10px 20px;
// //     cursor: pointer;
// //     width: 100%;
// //     border-radius: 20px;
// //     margin-top: 15px;
// //     &:hover {
// //         background-color: darkred;
// //     }
// // `;



// // const FriendsByCity = () => {
// //   const { cityName } = useParams();
// //   const [friend, setFriend] = useState([]);
// //   const { token } = useAuth();

// //   useEffect(() => {
// //     const fetchFriends = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/api/friend/friends-by-city/${cityName}`, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         if (response.data && Array.isArray(response.data)) {
// //           setFriend(response.data);
// //         } else {
// //           console.error('Unexpected response structure:', response.data);
// //         }
// //       } catch (error) {
// //         console.error(`Failed to fetch friends from ${cityName}:`, error);
// //       }
// //     };

// //     fetchFriends();
// //   }, [cityName, token]);

// //   return (
// //     <FriendsContainer>
// //       {friend.map(friend => (
// //         <FriendCard key={friend.id}>
// //           <FriendImageContainer>
// //           <FriendImage
// //   src={friend.profilePicture ? `http://localhost:5000/${friend.profilePicture}` : "https://cdn-icons-png.freepik.com/512/147/147144.png"}
// //   alt={`${friend.firstName} Avatar`}
// // />
// //           </FriendImageContainer>
// //           <FriendInfo>
// //             <FriendName>{friend.firstName} {friend.lastName}</FriendName>
// //             <FriendRole>{friend.userRole}</FriendRole>
// //             <FriendRole>{friend.email}</FriendRole>
// //             <FriendRole>{friend.city}</FriendRole>
// //             <MoreDetailsButton onClick={() => alert(`Details for ${friend._id}`)}>More Details</MoreDetailsButton>
// //             <ConnectButton onClick={() => window.open(`https://wa.me/${friend.whatsappNumber}`, '_blank')}>Connect Now</ConnectButton>
// //           </FriendInfo>
// //         </FriendCard>
// //       ))}
// //     </FriendsContainer>
// //   );
// // };

// // export default FriendsByCity;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import styled from 'styled-components';

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

// const Header = styled.header`
//   background-color: red;
//   color: white;
//   width: 100%;
//   max-width: 1200px;
//   text-align: center;
//   padding: 10px 0;
//   font-size: 24px;
//   border-radius: 10px;
//   margin-bottom: 20px;
// `;

// const FriendsByCity = () => {
//   const { cityName } = useParams();
//   const navigate = useNavigate();
//   const [friends, setFriends] = useState([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/friend/friends-by-city/${cityName}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (response.data && Array.isArray(response.data)) {
//           setFriends(response.data);
//         } else {
//           console.error('Unexpected response structure:', response.data);
//         }
//       } catch (error) {
//         console.error(`Failed to fetch friends from ${cityName}:`, error);
//       }
//     };

//     fetchFriends();
//   }, [cityName, token]);

//   const handleMoreDetails = (id) => {
//     navigate(`/FriendDetail/${id}`);
//   };

//   return (
//     <FriendsContainer>
//     <Header>Business Associates in {cityName}</Header>
//       {friends.map(friend => (
//         <FriendCard key={friend._id}>
//           <FriendImageContainer>
//             <FriendImage
//               src={friend.profilePicture ? `http://localhost:5000/${friend.profilePicture}` : "https://cdn-icons-png.freepik.com/512/147/147144.png"}
//               alt={`${friend.firstName} Avatar`}
//             />
//           </FriendImageContainer>
//           <FriendInfo>
//             <FriendName>{friend.firstName} {friend.lastName}</FriendName>
//             <FriendRole>{friend.userRole}</FriendRole>
//             <FriendRole>{friend.email}</FriendRole>
//             <FriendRole>{friend.city}</FriendRole>
//             <MoreDetailsButton onClick={() => handleMoreDetails(friend._id)}>More Details</MoreDetailsButton>
//             <ConnectButton onClick={() => window.open(`https://wa.me/${friend.whatsappNumber}`, '_blank')}>Connect Now</ConnectButton>
//           </FriendInfo>
//         </FriendCard>
//       ))}
//     </FriendsContainer>
//   );
// };

// export default FriendsByCity;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styled from 'styled-components';

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

const Header = styled.header`
  background-color: red;
  color: white;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 100px;
  margin-right: 100px;
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
        const response = await axios.get(`http://localhost:5000/api/friend/friends-by-city/${cityName}`, {
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
    <FriendsContainer>
      <Header>Business Associates in {cityName}</Header> {/* Dynamic city name display */}
      {friends.map(friend => (
        <FriendCard key={friend._id}>
          <FriendImageContainer>
            <FriendImage
              src={friend.profilePicture ? `http://localhost:5000/${friend.profilePicture}` : "https://cdn-icons-png.freepik.com/512/147/147144.png"}
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
  );
};

export default FriendsByCity;
