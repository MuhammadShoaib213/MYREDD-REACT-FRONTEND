// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg';

// // ----------------------
// // Styled Components
// // ----------------------

// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   overflow: auto;
//   padding-top: 135px;
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

// const CategoryContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   width: 100%;
// `;

// const CategoryBlock = styled.div`
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 10px;
//   margin: 10px;
//   padding: 20px;
//   width: 280px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const InquiryHeader = styled.h2`
//   background-color: ${props => props.color};
//   color: white;
//   text-align: center;
//   padding: 10px;
//   border-radius: 5px;
//   width: 100%;
// `;

// const Table = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 10px;
//   width: 100%;
//   background-color: #f8f9fa;
//   padding: 10px;
//   border-radius: 5px;
//   margin-top: 10px;
// `;

// const TableRow = styled.div`
//   display: contents;
// `;

// const TableHeader = styled.div`
//   font-weight: bold;
//   text-align: center;
// `;

// const TableCell = styled.div`
//   text-align: center;
//   padding: 5px 10px;
//   background-color: #ddd;
//   border-radius: 5px;
// `;

// const LearnMoreButton = styled.button`
//   margin-top: 10px;
//   padding: 10px 20px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   text-align: center;
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 120px;
//   background-color: #ffffff;
//   border: 2px solid #e74c3c;
//   color: #e74c3c;
//   font-size: 14px;
//   cursor: pointer;
//   padding: 10px 15px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s, color 0.3s, transform 0.3s;
//   z-index: 9999;
//   &:hover {
//     background-color: #e74c3c;
//     color: #ffffff;
//     transform: translateY(-2px);
//   }
//   @media (max-width: 768px) {
//     left: 10px;
//     width: 100%;
//     text-align: center;
//   }
// `;

// // ----------------------
// // Helper Functions
// // ----------------------

// // In the updated data structure, inquiryType and propertyType are simple strings.
// // This function aggregates the counts for each inquiry type and property type over three time periods:
// // [This Month, This Year, Last Year]
// const aggregateData = (data) => {
//   // Initialize counts (keys must match the lowercase versions of inquiryType and propertyType)
//   const counts = {
//     'for sale': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
//     'for purchase': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
//     'for rent': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
//     'on rent': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] }
//   };

//   data.forEach(item => {
//     const inquiryType = item.inquiryType ? item.inquiryType.toLowerCase() : '';
//     const propertyType = item.propertyType ? item.propertyType.toLowerCase() : '';
//     if (counts[inquiryType] && counts[inquiryType][propertyType]) {
//       const dateAdded = new Date(item.dateAdded);
//       const now = new Date();
//       const thisMonth = dateAdded.getMonth() === now.getMonth() && dateAdded.getFullYear() === now.getFullYear();
//       const thisYear = dateAdded.getFullYear() === now.getFullYear();
//       const lastYear = dateAdded.getFullYear() === now.getFullYear() - 1;
//       if (thisMonth) counts[inquiryType][propertyType][0]++;
//       if (thisYear) counts[inquiryType][propertyType][1]++;
//       if (lastYear) counts[inquiryType][propertyType][2]++;
//     }
//   });
//   return counts;
// };

// // Normalize inquiryType string to decide the header color.
// // For example, "for sale" becomes "forsale" then compared.
// const getColor = (type) => {
//   const normalized = type.replace(/\s/g, '').toLowerCase();
//   switch (normalized) {
//     case 'forsale':
//       return '#007bff'; // Blue
//     case 'forpurchase':
//       return '#6f42c1'; // Purple
//     case 'forrent':
//       return '#28a745'; // Green
//     case 'onrent':
//       return '#dc3545'; // Red
//     default:
//       return '#6c757d'; // Grey
//   }
// };

// // ----------------------
// // Main Component: InquiriesStatus
// // ----------------------

// function InquiriesStatus() {
//   const [inquiryData, setInquiryData] = useState({});
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       try {
//         const decoded = jwtDecode(token);
//         const response = await axios.get(
//           `http://195.179.231.102:6003/api/properties/user/${decoded.userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         // Aggregate the data using the updated data structure
//         setInquiryData(aggregateData(response.data));
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [token]);

//   const handleNavigate = (type) => {
//     navigate('/InquiriesStatusDetail', { state: { inquiryType: type } });
//   };

//   return (
//     <PageContainer>
//        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//       <HeaderContainer>
//         <Header>Inquiries Status</Header>
//       </HeaderContainer>
//       <CategoryContainer>
//         {Object.entries(inquiryData).map(([type, details], index) => (
//           <CategoryBlock key={index}>
//             <InquiryHeader color={getColor(type)}>
//               {type.replace('for', 'For ')}
//             </InquiryHeader>
//             <Table>
//               <TableRow>
//                 <TableHeader></TableHeader>
//                 <TableHeader>This Month</TableHeader>
//                 <TableHeader>This Year</TableHeader>
//                 <TableHeader>Last Year</TableHeader>
//               </TableRow>
//               {Object.entries(details).map(([subtype, counts]) => (
//                 <TableRow key={subtype}>
//                   <TableCell>
//                     {subtype.charAt(0).toUpperCase() + subtype.slice(1)}
//                   </TableCell>
//                   <TableCell>{counts[0]}</TableCell>
//                   <TableCell>{counts[1]}</TableCell>
//                   <TableCell>{counts[2]}</TableCell>
//                 </TableRow>
//               ))}
//             </Table>
//             <LearnMoreButton onClick={() => handleNavigate(type)}>
//               Learn More
//             </LearnMoreButton>
//           </CategoryBlock>
//         ))}
//       </CategoryContainer>
//     </PageContainer>
//   );
// }

// export default InquiriesStatus;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { API_CONFIG } from '../config/api.config'; // Import your API config

// ----------------------
// Styled Components
// ----------------------

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: auto;
  padding-top: 135px;
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

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const CategoryBlock = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InquiryHeader = styled.h2`
  background-color: ${props => props.color};
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const TableRow = styled.div`
  display: contents;
`;

const TableHeader = styled.div`
  font-weight: bold;
  text-align: center;
`;

const TableCell = styled.div`
  text-align: center;
  padding: 5px 10px;
  background-color: #ddd;
  border-radius: 5px;
`;

const LearnMoreButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
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
  z-index: 9999;
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

// ----------------------
// Helper Functions
// ----------------------

// Aggregates counts for each inquiry type and property type over three time periods: This Month, This Year, Last Year.
const aggregateData = (data) => {
  const counts = {
    'for sale': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
    'for purchase': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
    'for rent': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
    'on rent': { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] }
  };

  data.forEach(item => {
    const inquiryType = item.inquiryType ? item.inquiryType.toLowerCase() : '';
    const propertyType = item.propertyType ? item.propertyType.toLowerCase() : '';
    if (counts[inquiryType] && counts[inquiryType][propertyType]) {
      const dateAdded = new Date(item.dateAdded);
      const now = new Date();
      const thisMonth = dateAdded.getMonth() === now.getMonth() && dateAdded.getFullYear() === now.getFullYear();
      const thisYear = dateAdded.getFullYear() === now.getFullYear();
      const lastYear = dateAdded.getFullYear() === now.getFullYear() - 1;
      if (thisMonth) counts[inquiryType][propertyType][0]++;
      if (thisYear) counts[inquiryType][propertyType][1]++;
      if (lastYear) counts[inquiryType][propertyType][2]++;
    }
  });
  return counts;
};

// Normalizes inquiryType string to decide the header color.
const getColor = (type) => {
  const normalized = type.replace(/\s/g, '').toLowerCase();
  switch (normalized) {
    case 'forsale':
      return '#007bff'; // Blue
    case 'forpurchase':
      return '#6f42c1'; // Purple
    case 'forrent':
      return '#28a745'; // Green
    case 'onrent':
      return '#dc3545'; // Red
    default:
      return '#6c757d'; // Grey
  }
};

// ----------------------
// Main Component: InquiriesStatus
// ----------------------

function InquiriesStatus() {
  const [inquiryData, setInquiryData] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        // Replace the hardcoded URL with API_CONFIG.API_URL from your config
        const response = await axios.get(
          `${API_CONFIG.API_URL}/properties/user/${decoded.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Aggregate the data using the helper function
        setInquiryData(aggregateData(response.data));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleNavigate = (type) => {
    navigate('/InquiriesStatusDetail', { state: { inquiryType: type } });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <HeaderContainer>
        <Header>Inquiries Status</Header>
      </HeaderContainer>
      <CategoryContainer>
        {Object.entries(inquiryData).map(([type, details], index) => (
          <CategoryBlock key={index}>
            <InquiryHeader color={getColor(type)}>
              {type.replace('for', 'For ')}
            </InquiryHeader>
            <Table>
              <TableRow>
                <TableHeader></TableHeader>
                <TableHeader>This Month</TableHeader>
                <TableHeader>This Year</TableHeader>
                <TableHeader>Last Year</TableHeader>
              </TableRow>
              {Object.entries(details).map(([subtype, counts]) => (
                <TableRow key={subtype}>
                  <TableCell>
                    {subtype.charAt(0).toUpperCase() + subtype.slice(1)}
                  </TableCell>
                  <TableCell>{counts[0]}</TableCell>
                  <TableCell>{counts[1]}</TableCell>
                  <TableCell>{counts[2]}</TableCell>
                </TableRow>
              ))}
            </Table>
            <LearnMoreButton onClick={() => handleNavigate(type)}>
              Learn More
            </LearnMoreButton>
          </CategoryBlock>
        ))}
      </CategoryContainer>
    </PageContainer>
  );
}

export default InquiriesStatus;
