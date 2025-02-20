import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

// --- Styled Components --- //

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay effect */
  min-height: 100vh; /* Allows content to expand vertically */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 135px;
  overflow: auto; /* Enables scrolling if needed */
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
  top: 5px;
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

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 80%;
  max-width: 960px;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin: 20px auto;
`;

const TableRow = styled.div`
  display: contents;
  cursor: pointer;
  
  &:hover {
    background-color: #e2e6ea;
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

// --- Color Mapping Function --- //

const getHeaderColor = (type) => {
  const lower = type.toLowerCase();
  switch (lower) {
    case 'forsale':
    case 'for sale':
      return '#007bff'; // Blue
    case 'forpurchase':
    case 'for purchase':
      return '#28a745'; // Green
    case 'forrent':
    case 'for rent':
      return '#ffc107'; // Yellow
    case 'onrent':
    case 'on rent':
      return '#dc3545'; // Red
    default:
      return '#6c757d'; // Grey
  }
};

// --- Helper Function to Extract Created Date --- //

const getCreatedDate = (property) => {
  if (property.createdAt && property.createdAt.$date) {
    if (property.createdAt.$date.$numberLong) {
      return new Date(parseInt(property.createdAt.$date.$numberLong, 10));
    } else {
      return new Date(property.createdAt.$date);
    }
  }
  return new Date(property.createdAt);
};

// --- Main Component --- //

const PropertyBankDetails = () => {
  const { inquiryType, propertyType } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const response = await axios.get(' http://localhost:6003/api/properties/all', {
          params: { userId },
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
          // Use string equality for filtering (case-insensitive)
          const matchesInquiry = inquiryType
            ? property.inquiryType.toLowerCase() === inquiryType.toLowerCase()
            : true;
          const matchesType = propertyType
            ? property.propertyType.toLowerCase() === propertyType.toLowerCase()
            : true;
          return matchesInquiry && matchesType;
        })
        .forEach(property => {
          const createdAt = getCreatedDate(property);
          const propertyMonth = createdAt.getMonth();
          const propertyYear = createdAt.getFullYear();

          // Handle propertySubType as either an object or a string.
          let propertySubTypes = [];
          if (typeof property.propertySubType === 'object' && property.propertySubType !== null) {
            propertySubTypes = Object.entries(property.propertySubType)
              .filter(([, value]) => value)
              .map(([key]) => key);
          } else if (typeof property.propertySubType === 'string') {
            propertySubTypes = [property.propertySubType];
          }

          propertySubTypes.forEach(subType => {
            if (!newPropertyData[subType]) {
              newPropertyData[subType] = [0, 0, 0]; // [This Month, This Year, Last Year]
            }
            if (propertyYear === currentYear && propertyMonth === currentMonth) {
              newPropertyData[subType][0]++;
            }
            if (propertyYear === currentYear) {
              newPropertyData[subType][1]++;
            }
            if (propertyYear === currentYear - 1) {
              newPropertyData[subType][2]++;
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

  // Handle row click to navigate to a detailed property list view
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
        <Header>
          {formatInquiryType(inquiryType)} - {formatPropertyType(propertyType)}
        </Header>
      </HeaderContainer>
      {Object.keys(propertyData).length === 0 ? (
        <Header>No properties found.</Header>
      ) : (
        <Table>
          <TableRow>
            <TableHeader type="forSale">Property Subtype</TableHeader>
            <TableHeader type="forPurchase">This Month</TableHeader>
            <TableHeader type="forRent">This Year</TableHeader>
            <TableHeader type="onRent">Last Year</TableHeader>
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

// --- Helper Functions to Format Strings --- //

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
