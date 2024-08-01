import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import bgImage from '../images/bg.jpg';
import { useAuth } from './AuthContext'; // Adjust the path to your AuthContext


// Styled components
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  background-color: red;
  color: white;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  padding: 10px 0;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  flex-direction: row; // Default to row

  @media (max-width: 768px) {
    flex-direction: column; // Change to column on smaller screens
    align-items: center; // Center align items to handle single column layout
  }
`;

// const ProfileCard = styled.div`
//   flex: 1;
//   background: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   @media (max-width: 768px) {
//     width: 100%; // Full width on small screens
//   }
// `;

const TabsCard = styled.div`
  flex: 2;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%; // Full width on small screens
  }
`;

// // Styled components
// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
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
//   margin-bottom: 20px; // Added space between header and content
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   width: 100%;
//   max-width: 1200px;
// `;

const ProfileCard = styled.div`
  flex: 0 0 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

    @media (max-width: 768px) {
    width: 93%; // Full width on small screens
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  text-align: center;
  width: 100%;
`;

const DetailText = styled.div`
  margin: 5px 0;
  font-size: 16px;
  color: #333;
  position: relative;
`;

const Label = styled.span`
  font-weight: bold;
  color: #666;
`;

// const TabsCard = styled.div`
//   flex: 1;
//   background: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   overflow: hidden;
// `;

const TabsHeader = styled.div`
  background-color: red;
  padding: 20px;
  color: white;
  font-size: 24px;
  text-align: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  background: #f8f8f8;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s;

  &.active {
    border-bottom: 2px solid red;
    font-weight: bold;
  }
`;

const TabContent = styled.div`
  padding: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const InfoItem = styled.div`
  flex: 1 1 45%;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px; // Rounded corners for each info box
  background: #f9f9f9; // Slightly off-white for contrast
`;

const FriendDetail = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const { token } = useAuth(); // Get token from auth context
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchFriendDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/friend/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch friend details');
        }
        const data = await response.json();
        setFriend(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching friend details:', error.message);
      }
    };

    fetchFriendDetail();
  }, [id, token]);

  if (!friend) return <p>Loading...</p>;

  return (
    <PageContainer>
      <Header>Business Associates</Header>
      <ContentContainer>
        <ProfileCard>
          <ProfileImage src={friend.profilePicture ? `http://localhost:5000/${friend.profilePicture}` : 'https://via.placeholder.com/150'} alt={friend.fullName} />
          <ProfileDetails>
            <DetailText><Label>Name:</Label> {friend.firstName} {friend.lastName}</DetailText><Divider />
            <DetailText><Label>Mobile:</Label> {friend.phoneNumber}</DetailText><Divider />
            <DetailText><Label>Date of Birth:</Label> {new Date(friend.dateOfBirth).toLocaleDateString()}</DetailText><Divider />
            <DetailText><Label>Age:</Label> {friend.age} Years</DetailText><Divider />
            <DetailText><Label>Member Since:</Label> {new Date(friend.createdAt).toLocaleDateString()}</DetailText><Divider />
          </ProfileDetails>
        </ProfileCard>
        <TabsCard>
          <TabsHeader>About / Business Info</TabsHeader>
          <Tabs>
            <TabButton className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About</TabButton>
            <TabButton className={activeTab === 'business' ? 'active' : ''} onClick={() => setActiveTab('business')}>Business Info</TabButton>
          </Tabs>
          <TabContent>
            {activeTab === 'about' && (
              <InfoSection>
                <InfoItem><Label>City:</Label> {friend.city}</InfoItem>
                <InfoItem><Label>Mobile Primary:</Label> {friend.phoneNumber}</InfoItem>
                <InfoItem><Label>Mobile Secondary:</Label> {friend.whatsappNumber}</InfoItem>
                <InfoItem><Label>Email:</Label> {friend.email}</InfoItem>
                <InfoItem><Label>Location:</Label> {friend.location}</InfoItem>
              </InfoSection>
            )}
            {activeTab === 'business' && (
              <InfoSection>
                <InfoItem><Label>Business Name:</Label> {friend.businessName}</InfoItem>
                <InfoItem><Label>Business Owner Name:</Label> {friend.businessOwnerName}</InfoItem>
                <InfoItem><Label>Business Working Area:</Label> {friend.businessWorkingArea}</InfoItem>
                <InfoItem><Label>Business NTN:</Label> {friend.businessNTN}</InfoItem>
                <InfoItem><Label>Residential:</Label> {friend.residential}</InfoItem>
                <InfoItem><Label>Commercial:</Label> {friend.commercial}</InfoItem>
                <InfoItem><Label>Land:</Label> {friend.land}</InfoItem>
                <InfoItem><Label>Experience:</Label> {friend.experience} Years</InfoItem>
                <InfoItem><Label>Skills:</Label> {friend.skills.join(', ')}</InfoItem>
              </InfoSection>
            )}
          </TabContent>
        </TabsCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default FriendDetail;
