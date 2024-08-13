// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
// import bgImage from '../images/bg.jpg';


// // Styled components
// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh; /* Ensure it covers the whole viewport height */
//   display: flex;
//   justify-content: center;
// //   flex-direction: column;
//   align-items: center;
//   padding: 40px;
//   padding-top: 80px;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 20px;
//   color: white;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const MainContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: white;
//   padding: 40px; // Increased padding
//   border-radius: 20px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   margin-right: 20px;
// `;

// const SidePanel = styled.div`
//   background: #e8e8e8;
//   padding: 40px; // Increased padding
//   border-radius: 20px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   width: 300px; // Specific width
// `;

// const DetailImage = styled.img`
//   width: 250px; // Increased size
//   height: 250px; // Increased size
//   border-radius: 50%;
//   object-fit: cover;
//   margin-bottom: 20px;
// `;

// const DetailText = styled.p`
//   margin: 10px 0; // Increased margin
//   font-size: 20px; // Increased font size
//   color: #333;
// `;

// const Label = styled.span`
//   font-weight: bold;
//   color: #666;
// `;

// const DetailEntry = styled.div`
//   background: white;
//   padding: 15px; // Increased padding
//   margin: 10px 0; // Increased margin
//   font-size: 18px; // Increased font size
// `;

// const CustomerDetail = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);

//   useEffect(() => {
//     const fetchCustomerDetail = async () => {
//       try {
//         const response = await fetch(`http://195.179.231.102:6003/api/customers/detail/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch customer details');
//         }
//         const data = await response.json();
//         setCustomer(data);
//       } catch (error) {
//         console.error('Error fetching customer details:', error.message);
//       }
//     };

//     fetchCustomerDetail();
//   }, [id]);

//   if (!customer) return <p>Loading...</p>;
 
//   return (
//     <PageContainer>
//       <MainContent>
//         <DetailImage src={customer.profilePicture ? `http://195.179.231.102:6003/${customer.profilePicture}` : 'https://via.placeholder.com/200'} alt={customer.fullName} />
//         <DetailText><Label>Name:</Label> {customer.fullName}</DetailText>
//         <DetailText><Label>Mobile:</Label> {customer.officialMobile}</DetailText>
//         <DetailText><Label>WhatsApp:</Label> {customer.whatsappMobile}</DetailText>
//         <DetailText><Label>Member Since:</Label> {new Date(customer.createdAt).toLocaleDateString()}</DetailText>
//         <DetailText><Label>Address:</Label> {customer.currentAddress}</DetailText>
//       </MainContent>
//       <SidePanel>
//         <DetailEntry><Label>Citizen ID:</Label> {customer.cnicNumber}</DetailEntry>
//         <DetailEntry><Label>Living City:</Label> {customer.currentCity}</DetailEntry>
//         <DetailEntry><Label>Profession:</Label> {customer.profession}</DetailEntry>
//         <DetailEntry><Label>Personal Email:</Label> {customer.personalEmail}</DetailEntry>
//         <DetailEntry><Label>Official Email:</Label> {customer.officialEmail}</DetailEntry>
//         <DetailEntry><Label>Age:</Label> {customer.age}</DetailEntry>
//         <DetailEntry><Label>Dependants:</Label> {customer.dependants}</DetailEntry>
//       </SidePanel>
//     </PageContainer>
//   );
// };

// export default CustomerDetail;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import bgImage from '../images/bg.jpg';

// Styled components
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh; /* Ensure it covers the whole viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  padding-top: 180px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (min-width: 769px) {
    flex-direction: row;
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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 40px; // Increased padding
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-right: 20px;
  width: 100%;
  max-width: 400px; // Limiting width

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%; // Ensuring same width as SidePanel
  }
`;

const SidePanel = styled.div`
  background: #e8e8e8;
  padding: 40px; // Increased padding
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px; // Limiting width

  @media (max-width: 768px) {
    width: 100%; // Matching MainContent width
    margin-bottom: 20px; // Optional: Add margin bottom to separate from footer
  }
`;

const DetailImage = styled.img`
  width: 250px; // Increased size
  height: 250px; // Increased size
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const DetailText = styled.p`
  margin: 10px 0; // Increased margin
  font-size: 20px; // Increased font size
  color: #333;
`;

const Label = styled.span`
  font-weight: bold;
  color: #666;
`;

const DetailEntry = styled.div`
  background: white;
  padding: 15px; // Increased padding
  margin: 10px 0; // Increased margin
  font-size: 18px; // Increased font size
`;

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const response = await fetch(`http://195.179.231.102:6003/api/customers/detail/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer details');
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer details:', error.message);
      }
    };

    fetchCustomerDetail();
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <PageContainer>
      <MainContent>
        <DetailImage src={customer.profilePicture ? `http://195.179.231.102:6003/${customer.profilePicture}` : 'https://via.placeholder.com/200'} alt={customer.fullName} />
        <DetailText><Label>Name:</Label> {customer.fullName}</DetailText>
        <DetailText><Label>Mobile:</Label> {customer.officialMobile}</DetailText>
        <DetailText><Label>WhatsApp:</Label> {customer.whatsappMobile}</DetailText>
        <DetailText><Label>Member Since:</Label> {new Date(customer.createdAt).toLocaleDateString()}</DetailText>
        <DetailText><Label>Address:</Label> {customer.currentAddress}</DetailText>
      </MainContent>
      <SidePanel>
        <DetailEntry><Label>Citizen ID:</Label> {customer.cnicNumber}</DetailEntry>
        <DetailEntry><Label>Living City:</Label> {customer.currentCity}</DetailEntry>
        <DetailEntry><Label>Profession:</Label> {customer.profession}</DetailEntry>
        <DetailEntry><Label>Personal Email:</Label> {customer.personalEmail}</DetailEntry>
        <DetailEntry><Label>Official Email:</Label> {customer.officialEmail}</DetailEntry>
        <DetailEntry><Label>Age:</Label> {customer.age}</DetailEntry>
        <DetailEntry><Label>Dependants:</Label> {customer.dependants}</DetailEntry>
      </SidePanel>
    </PageContainer>
  );
};

export default CustomerDetail;
