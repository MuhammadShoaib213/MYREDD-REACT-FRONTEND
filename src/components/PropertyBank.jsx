import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import {
    FiHome,
  } from 'react-icons/fi';
import {  motion } from 'framer-motion';

// Styled components
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); // Creates a dark overlay effect
  height: 100vh;
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
  background-color: ${(props) => props.color};
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

const TableCellClickable = styled(TableCell)`
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    color: #007bff;
    background-color: #e9ecef;
  }
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

const Icon = styled.span`
  margin-bottom: 5px;
  font-size: 30px;
`;

const Label = styled.span`
  font-size: 16px;
  text-align: center;
`;

const NavButton = styled(motion.button)`
  padding: 15px;
  width: 220px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 15px rgba(255, 75, 43, 0.4);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

function PropertyBank() {
  const [properties, setProperties] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const response = await axios.get(
          `http://localhost:5000/api/properties/all?userId=${userId}`
        );
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Process the fetched properties into the propertyData structure
  useEffect(() => {
    const processPropertyData = () => {
      const newPropertyData = {};

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      properties.forEach((property) => {
        // Extract inquiry types that are true
        const inquiryTypes = Object.entries(property.inquiryType || {})
          .filter(([, value]) => value)
          .map(([key]) => key);

        // Extract property types that are true
        const propertyTypes = Object.entries(property.propertyType || {})
          .filter(([, value]) => value)
          .map(([key]) => key);

        // Determine the time frame
        const createdAt = new Date(property.createdAt);
        const propertyMonth = createdAt.getMonth();
        const propertyYear = createdAt.getFullYear();

        let timeFrameIndex;
        if (propertyYear === currentYear && propertyMonth === currentMonth) {
          timeFrameIndex = 0; // This Month
        } else if (propertyYear === currentYear) {
          timeFrameIndex = 1; // This Year
        } else if (propertyYear === currentYear - 1) {
          timeFrameIndex = 2; // Last Year
        } else {
          return; // Skip properties outside of these time frames
        }

        // Update counts in newPropertyData
        inquiryTypes.forEach((inquiryType) => {
          if (!newPropertyData[inquiryType]) {
            newPropertyData[inquiryType] = {};
          }

          propertyTypes.forEach((propType) => {
            if (!newPropertyData[inquiryType][propType]) {
              // Initialize counts array
              newPropertyData[inquiryType][propType] = [0, 0, 0];
            }
            newPropertyData[inquiryType][propType][timeFrameIndex] += 1;
          });
        });
      });

      setPropertyData(newPropertyData);
    };

    if (properties.length > 0) {
      processPropertyData();
    } else {
      setPropertyData({});
    }
  }, [properties]);

  const handleNavigate = (type) => {
    navigate(`/properties/${type}`);
  };

  const handleCellClick = (inquiryType, propertyType) => {
    const encodedInquiryType = encodeURIComponent(inquiryType);
    const encodedPropertyType = encodeURIComponent(propertyType);
    navigate(`/properties/${encodedInquiryType}/${encodedPropertyType}`);
  };

  const formatInquiryType = (type) => {
    // Convert camelCase to "For Sale", "For Purchase", etc.
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  const formatPropertyType = (type) => {
    // Capitalize the first letter and replace camelCase with spaces
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  const getColor = (type) => {
    switch (type) {
      case 'forSale':
        return '#007bff'; // Blue
      case 'forPurchase':
        return '#6f42c1'; // Purple
      case 'forRent':
        return '#28a745'; // Green
      case 'onRent':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Default grey
    }
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
        <Header>Property Bank</Header>
      </HeaderContainer>
      <CategoryContainer>
        {Object.keys(propertyData).length === 0 ? (
          <Header style={{ color: 'white' }}>No properties found.</Header>
        ) : (
          Object.entries(propertyData).map(([type, details], index) => (
            <CategoryBlock key={index}>
              <InquiryHeader color={getColor(type)}>
                {formatInquiryType(type)}
              </InquiryHeader>
              <Table>
                <TableRow>
                  <TableHeader>Property Type</TableHeader>
                  <TableHeader>This Month</TableHeader>
                  <TableHeader>This Year</TableHeader>
                  <TableHeader>Last Year</TableHeader>
                </TableRow>
                {Object.entries(details).map(([propType, counts]) => (
                  <TableRow key={propType}>
                    <TableCellClickable onClick={() => handleCellClick(type, propType)}>
                      {formatPropertyType(propType)}
                    </TableCellClickable>
                    <TableCell>{counts[0]}</TableCell>
                    <TableCell>{counts[1]}</TableCell>
                    <TableCell>{counts[2]}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </CategoryBlock>
          ))
        )}
      </CategoryContainer>
      <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
        <NavButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            left: '20px',
            bottom: '100px', /* Increased bottom margin */
            width: 'auto',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #00b09b, #96c93d)',
            zIndex: 10,
          }}
        >
          <Icon>
            <FiHome />
          </Icon>
          <Label>View All properties</Label>
        </NavButton>
      </Link>
    </PageContainer>
  );
}

export default PropertyBank;
