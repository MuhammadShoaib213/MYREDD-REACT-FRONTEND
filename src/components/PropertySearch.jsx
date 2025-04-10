/**
 * PropertySearch.jsx
 *
 * This component:
 * 1. Decodes `userId` from a stored JWT token (if present)
 * 2. Iterates up to 5 times, removing one criterion each iteration if no matches
 * 3. Displays matches in a card layout (same design as your referenced code)
 * 4. Includes share logic for WhatsApp/email and spinners
 */

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import html2canvas from 'html2canvas';
// If you installed "jwt-decode", import it as:
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


import {
  FaBed,
  FaCalendarAlt,
  FaArrowsAlt,
  FaDollarSign,
  FaBarcode,
  FaHome,
  FaCity,
} from 'react-icons/fa';

import { API_CONFIG } from '../config/api.config';

// ---------- SAMPLE PROPERTY SUB-TYPE IMAGES (Adjust paths) ----------
import apartmentImg from '../images/apartment.jpg';
import factoryImg from '../images/factory.jpg';
import farmHouseImg from '../images/farmhouse.jpg';
import homeImg from '../images/home.jpg';
import officeImg from '../images/office.jpg';
import shopImg from '../images/shop.jpg';
import villasImg from '../images/villas.jpg';
import warehouseImg from '../images/warehouse.jpg';
import defaultImg from '../images/default.jpg';

// ---------- Helper Functions ----------
function normalizePath(filePath) {
  if (!filePath) return '';
  return filePath.replace(/\\/g, '/');
}

function getFullUrl(filePath) {
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath)) {
    return filePath;
  }
  return `${API_CONFIG.BASE_URL}/${normalizePath(filePath)}`;
}

function parseNumber(val) {
  if (val == null) return 0;
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Returns a nicely capitalized subtype
function getPropertySubType(subType) {
  if (!subType) return 'Unknown';
  return subType.charAt(0).toUpperCase() + subType.slice(1);
}

const propertySubTypeImages = {
  apartment: apartmentImg,
  factory: factoryImg,
  farmhouse: farmHouseImg,
  home: homeImg,
  office: officeImg,
  shop: shopImg,
  villas: villasImg,
  warehouse: warehouseImg,
};

function getImageForPropertySubType(propertySubType) {
  if (!propertySubType) return defaultImg;
  const lower = propertySubType.toLowerCase();
  return propertySubTypeImages[lower] || defaultImg;
}

function getInquiryTypeLabel(inquiryType) {
  if (!inquiryType) return { label: 'INQUIRY', color: '#95A5A6' };
  const lower = inquiryType.toLowerCase();
  if (lower.includes('sale')) return { label: 'FOR SALE', color: '#E74C3C' };
  if (lower.includes('on rent')) return { label: 'ON RENT', color: '#3498DB' };
  if (lower.includes('purchase')) return { label: 'FOR PURCHASE', color: '#9B59B6' };
  if (lower.includes('rent')) return { label: 'FOR RENT', color: '#2ECC71' };
  return { label: 'INQUIRY', color: '#95A5A6' };
}

function getCompleteAddress(property) {
  const parts = [];
  if (property.streetName) parts.push(property.streetName);
  if (property.phaseBlock) parts.push(property.phaseBlock);
  if (property.district) parts.push(property.district);
  if (property.city) parts.push(property.city);
  return parts.join(', ');
}

// Show either property.demand or the budget range
function getPrice(property) {
  if (property.demand != null && property.demand !== '') {
    return `PKR ${parseNumber(property.demand).toLocaleString()}`;
  }
  if (property.budget && (property.budget.min != null || property.budget.max != null)) {
    const min = parseNumber(property.budget.min).toLocaleString();
    const max = parseNumber(property.budget.max).toLocaleString();
    return `PKR ${min} - PKR ${max}`;
  }
  return 'N/A';
}

// ---------- Share Logic ----------
function handleEmailShare(title, url) {
  const subject = `Interesting Property: ${title}`;
  const body = `Check out this property:\n\n${url}`;
  const subjectEncoded = encodeURIComponent(subject);
  const bodyEncoded = encodeURIComponent(body);
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subjectEncoded}&body=${bodyEncoded}`;
  window.open(gmailLink, '_blank');
}

function handleWhatsAppShare(title, url) {
  const text = `Check out this property: ${title}\n\n${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

async function captureCardAsImage(cardElement) {
  const canvas = await html2canvas(cardElement, { useCORS: true });
  return canvas.toDataURL('image/png');
}

async function uploadImage(dataURL) {
  const blob = await (await fetch(dataURL)).blob();
  const formData = new FormData();
  formData.append('file', blob, 'property-card.png');
  const response = await axios.post(`${API_CONFIG.API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.url;
}

// ---------- STYLED COMPONENTS ----------
const SearchWrapper = styled.div`
  margin: 20px 0;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
`;

const Heading = styled.h3`
  margin: 0 0 15px;
  color: #2c3e50;
`;

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const PropertyCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;

  @media (min-width: 768px) {
    height: 200px;
  }
`;

const PropertyInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const PropertyTitle = styled.h3`
  font-size: 1.4em;
  color: #2c3e50;
  margin-bottom: 5px;
  font-weight: 600;
`;

const PropertySubtitle = styled.h4`
  font-size: 1.1em;
  color: #7f8c8d;
  margin-bottom: 10px;
  font-weight: 400;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  font-size: 0.95em;
  color: #34495e;
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

const DetailIcon = styled.span`
  margin-right: 8px;
  color: #3498db;
  display: flex;
  align-items: center;
`;

const Badge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${(props) => props.color || '#3498db'};
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85em;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ShareButtonsContainer = styled.div.attrs({
  className: 'share-buttons',
})`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  align-items: center;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

// ---------- Child Component for Each Card ----------
function PropertyCardItem({ property }) {
  const cardRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);
  const navigate = useNavigate();

  const handleShare = async (event, shareType) => {
    event.stopPropagation();
    if (!cardRef.current) return;

    setIsSharing(true);
    // Hide share buttons so they're not in the screenshot
    const shareButtons = cardRef.current.querySelector('.share-buttons');
    if (shareButtons) {
      shareButtons.style.display = 'none';
    }
    try {
      // 1) Capture the card
      const dataURL = await captureCardAsImage(cardRef.current);
      // 2) Upload the screenshot to get shareable URL
      const imageUrl = await uploadImage(dataURL);
      // 3) Attempt to copy that URL to the clipboard
      try {
        await navigator.clipboard.writeText(imageUrl);
      } catch (clipErr) {
        console.warn('Clipboard write failed:', clipErr);
      }
      // 4) Then open the relevant share link
      const { label } = getInquiryTypeLabel(property.inquiryType);
      const title = `${getPropertySubType(property.propertySubType)} - ${label}`;
      switch (shareType) {
        case 'whatsapp':
          handleWhatsAppShare(title, imageUrl);
          break;
        case 'email':
          handleEmailShare(title, imageUrl);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error during share logic:', error);
    } finally {
      if (shareButtons) shareButtons.style.display = '';
      setIsSharing(false);
    }
  };

  // Card-level navigation: if you want to open a detail page, do it here
  const handleCardClick = (e) => {
    if (
      !e.target.closest('.share-buttons') &&
      !e.target.closest('.status-dropdown') &&
      !e.target.closest('.status-icon')
    ) {
      navigate(`/property/${property._id}`);
    }
  };

  const inquiry = getInquiryTypeLabel(property.inquiryType);
  return (
    <PropertyCard ref={cardRef} onClick={handleCardClick}>
      <Badge color={inquiry.color}>{inquiry.label}</Badge>

      <PropertyImage
        src={
          property.frontPictures && property.frontPictures.length > 0
            ? getFullUrl(property.frontPictures[0])
            : property.propertyPictures && property.propertyPictures.length > 0
            ? getFullUrl(property.propertyPictures[0])
            : getImageForPropertySubType(property.propertySubType)
        }
        alt="Property"
      />
      <PropertyInfo>
        <div>
          <PropertyTitle>
            {`${getPropertySubType(property.propertySubType)} - ${inquiry.label}`}
          </PropertyTitle>
          <PropertySubtitle>{getCompleteAddress(property)}</PropertySubtitle>

          <DetailItem>
            <DetailIcon>
              <FaBarcode />
            </DetailIcon>
            <DetailLabel>Property Code:</DetailLabel>
            {property.propertyCode || 'N/A'}
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaHome />
            </DetailIcon>
            <DetailLabel>Type:</DetailLabel>
            {getPropertySubType(property.propertySubType)}
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaCity />
            </DetailIcon>
            <DetailLabel>City:</DetailLabel>
            {property.city || 'N/A'}
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaArrowsAlt />
            </DetailIcon>
            <DetailLabel>District:</DetailLabel>
            {property.district || 'N/A'}
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaBed />
            </DetailIcon>
            <DetailLabel>Size:</DetailLabel>
            {property.size || 'N/A'}
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <FaBed />
            </DetailIcon>
            <DetailLabel>Size Unit:</DetailLabel>
            {property.sizeUnit || 'N/A'}
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaDollarSign />
            </DetailIcon>
            <DetailLabel>Price:</DetailLabel>
            {getPrice(property)}
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaCalendarAlt />
            </DetailIcon>
            <DetailLabel>Date Added:</DetailLabel>
            {formatDate(property.updatedAt || property.createdAt)}
          </DetailItem>
        </div>

        {/* Share Button Row */}
        <ShareButtonsContainer>
          {isSharing && <Spinner />}
          <ActionButton onClick={(e) => handleShare(e, 'whatsapp')}>WhatsApp</ActionButton>
          <ActionButton onClick={(e) => handleShare(e, 'email')}>Email</ActionButton>
        </ShareButtonsContainer>
      </PropertyInfo>
    </PropertyCard>
  );
}

// ---------- MAIN COMPONENT ----------
export default function PropertySearch({ ad }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [matchingCriteria, setMatchingCriteria] = useState({});

  // Decode user ID from token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded?.userId;
    } catch (error) {
      console.warn('Failed to decode token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!ad) return;

    const userId = getUserIdFromToken();

    const findMatches = async () => {
      setLoading(true);
      setMatches([]);
      setIteration(0);
      setMatchingCriteria({});

      let criteria = {
        userId,
        inquiryType: ad.inquiryType,
        propertyType: ad.propertyType,
        propertySubType: ad.propertySubType,
        city: ad.city,
        area: ad.area,
        budget: ad.budget,
        facilities: ad.facilities,
        floors: ad.floors,
      };

      // Up to 5 iterations, removing one filter each time if no results
      for (let i = 0; i < 5; i++) {
        try {
          const response = await axios.post(
            `${API_CONFIG.API_URL}/properties/searchProperties`,
            criteria
          );
          if (response.data && response.data.length > 0) {
            setMatches(response.data);
            setMatchingCriteria(criteria);
            setLoading(false);
            break;
          }
          // If no matches, remove one criterion
          switch (i) {
            case 0:
              delete criteria.propertySubType;
              break;
            case 1:
              delete criteria.area;
              break;
            case 2:
              delete criteria.facilities;
              break;
            case 3:
              delete criteria.floors;
              break;
            case 4:
              delete criteria.budget;
              break;
            default:
              break;
          }
          setIteration((prev) => prev + 1);
        } catch (error) {
          console.error('Error finding matches:', error);
          setLoading(false);
          break;
        }
      }
      setLoading(false);
    };

    findMatches();
  }, [ad]);

  return (
    <SearchWrapper>
      <Heading></Heading>

      {/* Searching spinner */}
      {loading && <p>Searching for matches...</p>}

      {/* Show results if we have them, otherwise "No matches" */}
      {!loading && matches.length === 0 && (
        <p>No matches found with current criteria.</p>
      )}

      {!loading && matches.length > 0 && (
        <>
          <MatchesGrid>
            {matches.map((property) => (
              <PropertyCardItem key={property._id} property={property} />
            ))}
          </MatchesGrid>
          {/* Show final iteration criteria for debugging */}
          {/* <p style={{ fontStyle: 'italic', marginTop: '15px' }}>
            Matched on final criteria: {JSON.stringify(matchingCriteria)}
          </p> */}
        </>
      )}
    </SearchWrapper>
  );
}
