// import React from 'react';
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg';  // Ensure the correct path

// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7);
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
//   padding: 20px;
//   overflow: auto;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   font-size: 2rem;
//   padding: 20px 0;
// `;

// const CategoryContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   width: 100%;
// `;

// const CategoryBlock = styled.div`
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   margin: 20px;
//   padding: 20px;
//   width: 300px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Button = styled.button`
//   background-color: ${props => props.color};
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const DataGroup = styled.div`
//   width: 100%;
// `;

// const DataRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 5px 0;
// `;

// const DataLabel = styled.div`
//   flex: 1;
//   text-align: left;
//   font-weight: bold;
// `;

// const DataValue = styled.div`
//   padding: 5px 10px;
//   border-radius: 5px;
//   width: 100px;
//   text-align: center;
// `;

// const HeaderRow = styled(DataRow)`
//   font-weight: bold;
//   text-decoration: underline;
// `;

// const businessData = [
//   { type: 'For Sale', color: '#4169e1', data: { residential: "Rs 250,000.00", commercial: "Rs 0.00", land: "Rs 0.00" } },
//   { type: 'For Purchase', color: '#6a5acd', data: { residential: "Rs 250,000.00", commercial: "Rs 0.00", land: "Rs 0.00" } },
//   { type: 'On Rent (Tenant)', color: '#4682b4', data: { residential: "Rs 10,000.00", commercial: "Rs 0.00", land: "Rs 0.00" } },
//   { type: 'For Rent (Owner)', color: '#32cd32', data: { residential: "Rs 10,000.00", commercial: "Rs 0.00", land: "Rs 0.00" } }
// ];

// function BusinessVolume() {
//   return (
//     <PageContainer>
//       <Header>
//         <h1>Dashboard</h1>
//         <h1>Business Volume</h1>
//       </Header>
//       <CategoryContainer>
//         {businessData.map((item, index) => (
//           <CategoryBlock key={index}>
//             <Button color={item.color}>{item.type}</Button>
//             <HeaderRow>
//               <DataLabel>Category</DataLabel>
//               <DataLabel>Amount Earned</DataLabel>
//             </HeaderRow>
//             {Object.keys(item.data).map((category) => (
//               <DataRow key={category}>
//                 <DataLabel>{category.charAt(0).toUpperCase() + category.slice(1)}</DataLabel>
//                 <DataValue>{item.data[category]}</DataValue>
//               </DataRow>
//             ))}
//           </CategoryBlock>
//         ))}
//       </CategoryContainer>
//     </PageContainer>
//   );
// }

// export default BusinessVolume;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { Link, useNavigate } from 'react-router-dom';


const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); // This creates a dark overlay effect
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  padding-top: 80px;
  overflow: auto;  // Ensures content can scroll if it exceeds the viewport height
`;

const Header = styled.h1`
  margin-bottom: 20px;
  color: white;
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
  grid-template-columns: 1fr 1fr;
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

function BusinessVolume() {
  const [businessData, setBusinessData] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const response = await axios.get(`http://localhost:5000/api/properties/user/${decoded.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBusinessData(aggregateData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const aggregateData = (data) => {
    const volumes = {
      forSale: { residential: 0, commercial: 0, land: 0 },
      forPurchase: { residential: 0, commercial: 0, land: 0 },
      onRent: { residential: 0, commercial: 0, land: 0 },
      forRent: { residential: 0, commercial: 0, land: 0 }
    };

    data.forEach(item => {
      if (item.status === "Sold") {
        Object.entries(item.inquiryType).forEach(([type, active]) => {
          if (active) {
            Object.keys(item.propertyType).forEach((propType) => {
              if (item.propertyType[propType]) {
                volumes[type][propType] += item.advancePayment || 0; // Sum advance payments if sold
              }
            });
          }
        });
      }
    });
    return volumes;
  };

  const handleNavigate = (type) => {
    navigate('/BusinessVolumeDetail', { state: { inquiryType: type } });
  };

  return (
    <PageContainer>
      <Header>Business Volume</Header>
      <CategoryContainer>
        {Object.entries(businessData).map(([type, details], index) => (
          <CategoryBlock key={index}>
            <InquiryHeader color={getColor(type)}>{type.replace('for', 'For ')}</InquiryHeader>
            <Table>
              {Object.entries(details).map(([category, amount]) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>$ {amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </Table>
            <LearnMoreButton onClick={() => handleNavigate(type)}>Learn More</LearnMoreButton>
          </CategoryBlock>
        ))}
      </CategoryContainer>
    </PageContainer>
  );
}

const getColor = (type) => {
  switch (type) {
    case 'forSale': return '#007bff'; // Blue
    case 'forPurchase': return '#6f42c1'; // Purple
    case 'onRent': return '#28a745'; // Green
    case 'forRent': return '#dc3545'; // Red
    default: return '#6c757d'; // Default grey
  }
};

export default BusinessVolume;
