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
  background-color: rgba(0, 0, 0, 0.7);
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
  grid-template-columns: repeat(3, 1fr);
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

// Aggregate data by inquiry type and property type (with two counters per property type: inquiries and deals).
// In the updated data structure, inquiryType and propertyType are strings.
const aggregateData = (data) => {
  // Define our expected keys using lowercase strings.
  const counts = {
    "for sale": { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
    "for purchase": { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
    "on rent": { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
    "for rent": { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
  };

  data.forEach(item => {
    if (item.inquiryType && item.propertyType) {
      const inquiry = item.inquiryType.toLowerCase();
      const propType = item.propertyType.toLowerCase();
      if (counts[inquiry] && counts[inquiry][propType] !== undefined) {
        // Increment inquiry count.
        counts[inquiry][propType][0]++;
        // Increment deal count if the item's status is "Sold"
        if (item.status && item.status.toLowerCase() === "sold") {
          counts[inquiry][propType][1]++;
        }
      }
    }
  });
  return counts;
};

// Normalize inquiry type to determine header color.
// Remove spaces and convert to lowercase.
const getColor = (type) => {
  const normalized = type.replace(/\s/g, '').toLowerCase();
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
// Main Component: InquiriesVsDeals
// ----------------------

function InquiriesVsDeals() {
  const [inquiryData, setInquiryData] = useState({});
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
        // Use the updated aggregation logic
        setInquiryData(aggregateData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleNavigate = (type) => {
    navigate('/InquiryDealDetail', { state: { inquiryType: type } });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Inquiries vs Deal Done</Header>
      <CategoryContainer>
        {Object.entries(inquiryData).map(([type, details], index) => (
          <CategoryBlock key={index}>
            <InquiryHeader color={getColor(type)}>
              {type.replace('for', 'For ')}
            </InquiryHeader>
            <Table>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Inquiry</TableCell>
                <TableCell>Done Deal</TableCell>
              </TableRow>
              {Object.entries(details).map(([category, counts]) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>{counts[0]}</TableCell>
                  <TableCell>{counts[1]}</TableCell>
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

export default InquiriesVsDeals;
