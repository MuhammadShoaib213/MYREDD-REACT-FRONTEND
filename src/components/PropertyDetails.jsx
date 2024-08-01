import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTree, FaCar, FaBuilding } from 'react-icons/fa';
import bgImage from '../images/bg.jpg';


const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  padding: 20px;
`;

const PropertyContainer = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const LeftPanel = styled.div`
  width: 35%;
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const RightPanel = styled.div`
  width: 65%;
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 24px;
  color: red;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabList = styled.div`
  display: flex;
  background-color: #f1f1f1;
`;

const TabButton = styled.button`
  flex-grow: 1;
  padding: 10px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${props => props.isActive ? '#fff' : '#f1f1f1'};
  border-bottom: ${props => props.isActive ? '2px solid blue' : 'none'};

  &:hover {
    background-color: #ddd;
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const DetailSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 5px;
`;

const TabContent = ({ activeTab, property }) => {
  switch (activeTab) {
    case 'overview':
      return (
        <Content>
          <DetailSection>
            <DetailItem><Label>Offering:</Label><Value>Home</Value></DetailItem>
            <DetailItem><Label>Type:</Label><Value>Residential</Value></DetailItem>
            <DetailItem><Label>Size:</Label><Value>{property.area}</Value></DetailItem>
            <DetailItem><Label>Purpose:</Label><Value>{property.purpose}</Value></DetailItem>
            <DetailItem><Label>Owner City:</Label><Value>{property.city}</Value></DetailItem>
            <DetailItem><Label>Owner Name:</Label><Value>{property.userId}</Value></DetailItem>
          </DetailSection>
        </Content>
      );
    case 'location':
      return <Content>Location & Nearby content...</Content>;
    case 'payment':
      return <Content>Payment Details content...</Content>;
    default:
      return <Content>Select a tab</Content>;
  }
};

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <TabsContainer>
      <TabList>
        <TabButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          Overview
        </TabButton>
        <TabButton isActive={activeTab === 'location'} onClick={() => setActiveTab('location')}>
          Location & Nearby
        </TabButton>
        <TabButton isActive={activeTab === 'payment'} onClick={() => setActiveTab('payment')}>
          Payment Details
        </TabButton>
      </TabList>
      <TabContent activeTab={activeTab} property={property} />
    </TabsContainer>
  );
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://195.179.231.102:6003/api/properties/property/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setProperty(response.data);
      } catch (err) {
        setError('Failed to fetch property details');
        console.error(err);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
    <PropertyContainer>
      <LeftPanel>
      <Image 
  src={property.images[0] ? `http://195.179.231.102:6003/${property.images[0]}` : 'http://195.179.231.102:6003/uploads/bg.jpg'} 
  alt={property.title}
/>
        <Title>{property.title || "Home"}</Title>
        <Price>Rs {property.budget || "Price Not Available"}</Price>
        <IconText>
          <Icon><FaMapMarkerAlt /></Icon>
          <span>{property.location}</span>
        </IconText>
        <IconText>
          <Icon><FaPhone /></Icon>
          <span>{property.contact || "No Contact Info"}</span>
        </IconText>
        <IconText>
          <Icon><FaEnvelope /></Icon>
          <span>{property.email || "No Email Provided"}</span>
        </IconText>
      </LeftPanel>
      <RightPanel>
        <PropertyTabs property={property} />
      </RightPanel>
    </PropertyContainer>
    </PageContainer>
  );
};

export default PropertyDetailsPage;
