import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faDollarSign,
  faCar,
  faTree,
  faRoad,
  faRulerCombined,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import bgImage from '../images/bg.jpg';

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  padding: 20px;
  padding-top: 80px;
`;

const PropertyAdContainer = styled.div`
  max-width: 800px;
  margin: 150px auto 40px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  border-radius: 20px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  padding: 30px;
  text-align: center;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PropertyImage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const PropertyTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const PropertyDescription = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureItem = styled.div`
  text-align: center;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const FeatureText = styled.p`
  font-size: 16px;
  color: #444;
  margin-top: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled.button`
  background-color: red;
  color: white;
  padding: 15px 40px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: darkred;
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 10px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  left: 20px;
  top: 130px;
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
  height: 60px;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 10; // Bring the button above other elements
  
  &:hover {
    background-color: #ff0000;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;

const PropertyAd = () => {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/propertyAd/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setPropertyDetails(response.data);
        setIsLoggedIn(!!localStorage.getItem('token'));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const inquiryType = propertyDetails?.inquiryType
    ? Object.keys(propertyDetails.inquiryType).find(key => propertyDetails.inquiryType[key])
    : 'N/A';

  const propertyType = propertyDetails?.propertyType
    ? Object.keys(propertyDetails.propertyType).find(key => propertyDetails.propertyType[key])
    : 'N/A';

  const propertySubType = propertyDetails?.propertySubType
    ? Object.keys(propertyDetails.propertySubType).find(key => propertyDetails.propertySubType[key])
    : 'N/A';

  const handleShareOnWhatsApp = () => {
    const url = `https://wa.me/?text=Check out this property: ${window.location.href}`;
    window.open(url, '_blank');
  };

  const handleShareOnEmail = () => {
    const subject = encodeURIComponent('Check out this property');
    const body = encodeURIComponent(`Here are the details of the property: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFindMatch = () => {
    navigate(`/PropertyMatches/${propertyId}`);
  };
  

  const handleNavigation = () => {
    navigate('/PropertyView');
  };

  const totalSize = propertyDetails?.length && propertyDetails?.width
    ? propertyDetails.length * propertyDetails.width
    : 'N/A';

  if (!propertyId) {
    return <p>No property ID provided.</p>;
  }

  return (
    <PageContainer>
      <PropertyAdContainer id="printableArea">
        {isLoggedIn && (
          <NavigationButton onClick={handleNavigation}>
            Property Bank
          </NavigationButton>
        )}
        {propertyDetails ? (
          <>
            <img 
              src={`http://localhost:5000/${propertyDetails.images?.[0] ? propertyDetails.images[0].replace(/\\/g, '/').replace(/ /g, '%20') : 'uploads/bg.jpg'}`} 
              alt="Property Image" 
              style={{ width: '100%', height: 'auto', borderRadius: '20px' }} 
            />
            <PropertyTitle>
              {inquiryType?.charAt(0).toUpperCase() + inquiryType.slice(1)} - {propertyType?.charAt(0).toUpperCase() + propertyType.slice(1)} - {propertySubType?.charAt(0).toUpperCase() + propertySubType.slice(1)} in {propertyDetails.city || 'City'}
            </PropertyTitle>
            <PropertyDescription>
              Located in {propertyDetails.area || 'Area'}, Phase: {propertyDetails.phaseBlock || 'N/A'}.
            </PropertyDescription>
            <FeaturesList>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faBed} /> {propertyDetails.bedrooms ?? 'N/A'} Bedrooms</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faRulerCombined} /> {totalSize} sq ft</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faDollarSign} /> {propertyDetails.budget ? propertyDetails.budget.toLocaleString() : 'N/A'} PKR</FeatureText>
              </FeatureItem>
            </FeaturesList>
            <FeaturesList>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faCar} /> Garage: {propertyDetails.features?.garage ? 'Yes' : 'No'}</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faTree} /> Garden: {propertyDetails.features?.garden ? 'Yes' : 'No'}</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faRoad} /> Main Road: {propertyDetails.features?.mainRoad ? 'Yes' : 'No'}</FeatureText>
              </FeatureItem>
            </FeaturesList>
            <FeaturesList>
              <FeatureItem>
                <FeatureText><FontAwesomeIcon icon={faCalendarAlt} /> Closing Date: {propertyDetails.closingDate ? moment(propertyDetails.closingDate).format('MMM Do YYYY') : 'N/A'}</FeatureText>
              </FeatureItem>
            </FeaturesList>
            {isLoggedIn && (
            <ButtonContainer>
            <ActionButton onClick={handleFindMatch}>Find Match</ActionButton>
            <ActionButton onClick={handleShareOnWhatsApp}>Share on WhatsApp</ActionButton>
          </ButtonContainer>
        )}
          </>
        ) : (
          <p>Loading property details...</p>
        )}
      </PropertyAdContainer>
    </PageContainer>
  );
};

export default PropertyAd;
