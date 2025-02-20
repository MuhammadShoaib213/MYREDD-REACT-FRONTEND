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
  width: 370px;
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

// Updated aggregation function using the new profit formula and date splits.
// Only properties with status "sold" will contribute to profit.
// Profit is computed based on the following logic:
// 1. Determine the base value: use `demand` if available; otherwise use the max value from `budget`.
// 2. If both commission and addedValue are of type "value", sum them.
// 3. If both are of type "percentage", calculate profit as the percentage (sum of both percentages)
//    applied to the base value.
// 4. Profit is aggregated into three buckets: All Time, This Year, and This Month.
const aggregateData = (data) => {
  // Define inquiry types and property categories with split profit columns.
  const volumes = {
    forsale: { 
      residential: { allTime: 0, thisYear: 0, thisMonth: 0 },
      commercial: { allTime: 0, thisYear: 0, thisMonth: 0 },
      land: { allTime: 0, thisYear: 0, thisMonth: 0 }
    },
    forpurchase: { 
      residential: { allTime: 0, thisYear: 0, thisMonth: 0 },
      commercial: { allTime: 0, thisYear: 0, thisMonth: 0 },
      land: { allTime: 0, thisYear: 0, thisMonth: 0 }
    },
    onrent: { 
      residential: { allTime: 0, thisYear: 0, thisMonth: 0 },
      commercial: { allTime: 0, thisYear: 0, thisMonth: 0 },
      land: { allTime: 0, thisYear: 0, thisMonth: 0 }
    },
    forrent: { 
      residential: { allTime: 0, thisYear: 0, thisMonth: 0 },
      commercial: { allTime: 0, thisYear: 0, thisMonth: 0 },
      land: { allTime: 0, thisYear: 0, thisMonth: 0 }
    }
  };

  // Get current date details.
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  data.forEach(item => {
    if (item.status && item.status.toLowerCase() === "sold") {
      // Determine the base value: use demand if available, otherwise check for budget's max value.
      let base = 0;
      if (item.demand && item.demand !== "") {
        base = Number(item.demand);
      } else if (item.budget && item.budget.max) {
        base = Number(item.budget.max);
      }
      
      // Calculate profit based on commission and addedValue.
      let profit = 0;
      if (item.commission && item.addedValue) {
        if (item.commission.type === 'value' && item.addedValue.type === 'value') {
          profit = Number(item.commission.value) + Number(item.addedValue.value);
        } else if (item.commission.type === 'percentage' && item.addedValue.type === 'percentage') {
          profit = base * ((Number(item.commission.value) + Number(item.addedValue.value)) / 100);
        }
      }
      
      // Determine the date of the item.
      const date = new Date(item.dateAdded);
      const year = date.getFullYear();
      const month = date.getMonth();

      // Aggregate profit into all three columns.
      const inquiryKey = item.inquiryType ? normalize(item.inquiryType) : "";
      const propertyKey = item.propertyType ? item.propertyType.toLowerCase() : "";
      if (volumes[inquiryKey] && volumes[inquiryKey][propertyKey] !== undefined) {
        // Always add to All Time.
        volumes[inquiryKey][propertyKey].allTime += profit;
        // Add to This Year if the year matches.
        if (year === currentYear) {
          volumes[inquiryKey][propertyKey].thisYear += profit;
          // Add to This Month if both year and month match.
          if (month === currentMonth) {
            volumes[inquiryKey][propertyKey].thisMonth += profit;
          }
        }
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
          ` http://localhost:6003/api/properties/user/${decoded.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Use the updated aggregation function for profit calculations.
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
              {/* Table header row */}
              <TableRow>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>All Time (PKR)</strong></TableCell>
                <TableCell><strong>This Year (PKR)</strong></TableCell>
                <TableCell><strong>This Month (PKR)</strong></TableCell>
              </TableRow>
              {Object.entries(details).map(([category, stats]) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>
                     {Number(stats?.allTime ?? 0).toLocaleString()}
                  </TableCell>
                  <TableCell>
                     {Number(stats?.thisYear ?? 0).toLocaleString()}
                  </TableCell>
                  <TableCell>
                     {Number(stats?.thisMonth ?? 0).toLocaleString()}
                  </TableCell>
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
