// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg';

// // Styled components
// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7);
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   padding-top: 135px;
//   overflow: auto;
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   width: 100%;
//   padding: 20px;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const Header = styled.h1`
//   color: white;
//   margin: 0;
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   background-color: #333;
//   border: 2px solid #ff0000;
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   padding: 15px 20px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   width: 200px;
//   height: 60px;
//   transition: background-color 0.3s, transform 0.3s;
//   &:hover {
//     background-color: #ff0000;
//     transform: translateY(-2px);
//   }
//   @media (max-width: 768px) {
//     font-size: 14px;
//     width: 100%;
//     height: auto;
//     left: 10px;
//   }
// `;

// const Table = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 10px;
//   width: 80%;
//   max-width: 960px;
//   background-color: #f8f9fa;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 20px auto;
// `;

// const TableRow = styled.div`
//   display: contents;
// `;

// const TableHeader = styled.div`
//   font-weight: bold;
//   text-align: center;
//   padding: 10px;
//   border-radius: 5px;
//   background-color: ${props => getHeaderColor(props.type)};
//   color: white;
// `;

// const TableCell = styled.div`
//   text-align: center;
//   padding: 5px 10px;
//   background-color: #ddd;
//   border-radius: 5px;
// `;

// // Color mapping function
// const getHeaderColor = (type) => {
//   switch (type) {
//     case 'forSale':
//       return '#007bff'; // Blue
//     case 'forPurchase':
//       return '#6f42c1'; // Green
//     case 'forRent':
//       return '#28a745'; // Yellow
//     case 'onRent':
//       return '#dc3545'; // Red
//     default:
//       return '#6c757d'; // Default grey
//   }
// };

// // Component implementation
// const PropertyBankDetails = () => {
//   const { inquiryType, propertyType } = useParams();
//   const [properties, setProperties] = useState([]);
//   const [propertyData, setPropertyData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const decoded = jwtDecode(token);
//         const userId = decoded.userId;

//         const response = await axios.get('http://195.179.231.102:6003/api/properties/all', { params: { userId: userId } });
//         setProperties(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, [inquiryType, propertyType]);

//   useEffect(() => {
//     const processPropertyData = () => {
//       const newPropertyData = {};
//       const now = new Date();
//       const currentMonth = now.getMonth();
//       const currentYear = now.getFullYear();

//       properties.filter(property => {
//         return (inquiryType ? property.inquiryType[inquiryType] : true) &&
//                (propertyType ? property.propertyType[propertyType] : true);
//       }).forEach(property => {
//         const createdAt = new Date(property.createdAt);
//         const propertyMonth = createdAt.getMonth();
//         const propertyYear = createdAt.getFullYear();
//         const propertySubTypes = Object.entries(property.propertySubType || {}).filter(([, value]) => value).map(([key]) => key);

//         propertySubTypes.forEach(subType => {
//           if (!newPropertyData[subType]) {
//             newPropertyData[subType] = [0, 0, 0]; // [This Month, This Year, Last Year]
//           }
//           if (propertyYear === currentYear) {
//             if (propertyMonth === currentMonth) {
//               newPropertyData[subType][0]++; // This Month
//             }
//             newPropertyData[subType][1]++; // This Year
//           }
//           if (propertyYear === currentYear - 1) {
//             newPropertyData[subType][2]++; // Last Year
//           }
//         });
//       });

//       setPropertyData(newPropertyData);
//     };

//     if (properties.length > 0) {
//       processPropertyData();
//     }
//   }, [properties, inquiryType, propertyType]);

//   if (loading) {
//     return (
//       <PageContainer>
//         <HeaderContainer>
//           <Header>Loading...</Header>
//         </HeaderContainer>
//       </PageContainer>
//     );
//   }

//   return (
//     <PageContainer>
//       <HeaderContainer>
//         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//         <Header>{inquiryType} - {propertyType}</Header>
//       </HeaderContainer>
//       {Object.keys(propertyData).length === 0 ? (
//         <Header>No properties found.</Header>
//       ) : (
//         <Table>
//           <TableRow>
//             <TableHeader type='forSale'>Property Subtype</TableHeader>
//             <TableHeader type='forPurchase'>This Month</TableHeader>
//             <TableHeader type='forRent'>This Year</TableHeader>
//             <TableHeader type='onRent'>Last Year</TableHeader>
//           </TableRow>
//           {Object.entries(propertyData).map(([subType, counts]) => (
//             <TableRow key={subType}>
//               <TableCell>{subType}</TableCell>
//               <TableCell>{counts[0]}</TableCell>
//               <TableCell>{counts[1]}</TableCell>
//               <TableCell>{counts[2]}</TableCell>
//             </TableRow>
//           ))}
//         </Table>
//       )}
//     </PageContainer>
//   );
// };

// export default PropertyBankDetails;


// src/components/PropertyBankDetails.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

// Styled components
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); // Creates a dark overlay effect
  min-height: 100vh; // Allows content to expand vertically
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 135px;
  overflow: auto; // Ensures content can scroll if it exceeds the viewport height
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Header = styled.h1`
  color: white;
  margin: 0;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background-color: #333; // Subtle dark background
  border: 2px solid #ff0000; // Border to match red theme
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px; // Adjusted padding for better appearance
  border-radius: 10px; // More rounded corners
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for depth
  width: 200px; // Match the width of other buttons
  height: 60px; // Match the height of other buttons
  transition: background-color 0.3s, transform 0.3s; // Smooth transition effects

  &:hover {
    background-color: #ff0000; // Match hover effect with the red theme
    transform: translateY(-2px); // Slight lift on hover
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 80%; // You can adjust this percentage to match the table width in PropertyBank
  max-width: 960px; // Optional: max width to prevent it from getting too wide on larger screens
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin: 20px auto; // Centers the table and adds vertical margin
`;

const TableRow = styled.div`
  display: contents;
  cursor: pointer; // Indicates that the row is clickable
  
  &:hover {
    background-color: #e2e6ea; // Light hover effect for better UX
  }
`;

const TableHeader = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => getHeaderColor(props.type)};
  color: white;
`;

const TableCell = styled.div`
  text-align: center;
  padding: 5px 10px;
  background-color: #ddd;
  border-radius: 5px;
`;

// Color mapping function
const getHeaderColor = (type) => {
  switch (type) {
    case 'forSale':
      return '#007bff'; // Blue
    case 'forPurchase':
      return '#28a745'; // Green
    case 'forRent':
      return '#ffc107'; // Yellow
    case 'onRent':
      return '#dc3545'; // Red
    default:
      return '#6c757d'; // Default grey
  }
};

// Component implementation
const PropertyBankDetails = () => {
  const { inquiryType, propertyType } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const response = await axios.get('http://195.179.231.102:6003/api/properties/all', {
          params: { userId: userId },
        });
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [inquiryType, propertyType]);

  // Process and filter properties based on inquiryType and propertyType
  useEffect(() => {
    const processPropertyData = () => {
      const newPropertyData = {};
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      properties
        .filter(property => {
          const matchesInquiry = inquiryType ? property.inquiryType[inquiryType] : true;
          const matchesType = propertyType ? property.propertyType[propertyType] : true;
          return matchesInquiry && matchesType;
        })
        .forEach(property => {
          const createdAt = new Date(property.createdAt);
          const propertyMonth = createdAt.getMonth();
          const propertyYear = createdAt.getFullYear();
          const propertySubTypes = Object.entries(property.propertySubType || {})
            .filter(([, value]) => value)
            .map(([key]) => key);

          propertySubTypes.forEach(subType => {
            if (!newPropertyData[subType]) {
              newPropertyData[subType] = [0, 0, 0]; // [This Month, This Year, Last Year]
            }

            if (propertyYear === currentYear && propertyMonth === currentMonth) {
              newPropertyData[subType][0]++; // This Month
            }
            if (propertyYear === currentYear) {
              newPropertyData[subType][1]++; // This Year
            }
            if (propertyYear === currentYear - 1) {
              newPropertyData[subType][2]++; // Last Year
            }
          });
        });

      setPropertyData(newPropertyData);
    };

    if (properties.length > 0) {
      processPropertyData();
    } else {
      setPropertyData({});
    }
  }, [properties, inquiryType, propertyType]);

  // Handle row click to navigate to PropertyList
  const handleRowClick = (subType) => {
    navigate(`/property-list/${inquiryType}/${propertyType}/${subType}`);
  };

  if (loading) {
    return (
      <PageContainer>
        <HeaderContainer>
          <Header>Loading...</Header>
        </HeaderContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Header>{formatInquiryType(inquiryType)} - {formatPropertyType(propertyType)}</Header>
      </HeaderContainer>
      {Object.keys(propertyData).length === 0 ? (
        <Header>No properties found.</Header>
      ) : (
        <Table>
          <TableRow>
            <TableHeader type='forSale'>Property Subtype</TableHeader>
            <TableHeader type='forPurchase'>This Month</TableHeader>
            <TableHeader type='forRent'>This Year</TableHeader>
            <TableHeader type='onRent'>Last Year</TableHeader>
          </TableRow>
          {Object.entries(propertyData).map(([subType, counts]) => (
            <TableRow key={subType} onClick={() => handleRowClick(subType)}>
              <TableCell>{formatPropertySubType(subType)}</TableCell>
              <TableCell>{counts[0]}</TableCell>
              <TableCell>{counts[1]}</TableCell>
              <TableCell>{counts[2]}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </PageContainer>
  );
};

// Helper functions to format strings
const formatInquiryType = (type) => {
  return type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

const formatPropertyType = (type) => {
  return type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

const formatPropertySubType = (subtype) => {
  return subtype.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

export default PropertyBankDetails;
