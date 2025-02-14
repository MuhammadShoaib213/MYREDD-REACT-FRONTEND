import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

// ----------------------
// Styled Components
// ----------------------

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay effect */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 135px;
  overflow: auto;
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

// ----------------------
// Helper Functions
// ----------------------

// Normalize a string: lowercase and remove spaces.
const normalize = (str) => str.toLowerCase().replace(/\s/g, '');

// Updated aggregation function using the new data structure.
// We assume item.inquiryType and item.propertyType are strings.
const aggregateData = (data) => {
  // Define volumes using normalized keys.
  const volumes = {
    forsale: { residential: 0, commercial: 0, land: 0 },
    forpurchase: { residential: 0, commercial: 0, land: 0 },
    onrent: { residential: 0, commercial: 0, land: 0 },
    forrent: { residential: 0, commercial: 0, land: 0 }
  };

  data.forEach(item => {
    if (item.status && item.status.toLowerCase() === "sold") {
      const inquiryKey = item.inquiryType ? normalize(item.inquiryType) : "";
      const propertyKey = item.propertyType ? item.propertyType.toLowerCase() : "";
      if (volumes[inquiryKey] && volumes[inquiryKey][propertyKey] !== undefined) {
        const payment = Number(item.advancePayment) || 0;
        volumes[inquiryKey][propertyKey] += payment;
      }
    }
  });
  return volumes;
};

// Updated getColor to handle normalized keys.
const getColor = (type) => {
  const normalized = normalize(type);
  switch (normalized) {
    case 'forsale':
      return '#007bff'; // Blue
    case 'forpurchase':
      return '#6f42c1'; // Purple
    case 'onrent':
      return '#28a745'; // Green
    case 'forrent':
      return '#dc3545'; // Red
    default:
      return '#6c757d'; // Grey
  }
};

// ----------------------
// Main Component: BusinessVolume
// ----------------------

function BusinessVolume() {
  const [businessData, setBusinessData] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const response = await axios.get(
          `http://195.179.231.102:6003/api/properties/user/${decoded.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBusinessData(aggregateData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleNavigate = (type) => {
    navigate('/BusinessVolumeDetail', { state: { inquiryType: type } });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Business Volume</Header>
      <CategoryContainer>
        {Object.entries(businessData).map(([type, details], index) => (
          <CategoryBlock key={index}>
            <InquiryHeader color={getColor(type)}>
              {type.replace(/^for/, 'For ')}
            </InquiryHeader>
            <Table>
              {Object.entries(details).map(([category, amount]) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>PKR {amount.toLocaleString()}</TableCell>
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

export default BusinessVolume;
