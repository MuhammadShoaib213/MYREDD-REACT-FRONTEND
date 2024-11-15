// // src/components/PropertyList.jsx

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { FaBed, FaBath, FaRulerCombined, FaCar, FaTree, FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign } from 'react-icons/fa';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import bgImage from '../images/bg.jpg';

// // Helper Functions
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

// const formatInquiryType = (inquiryType) => {
//   if (inquiryType.forSale) return 'FOR SALE';
//   if (inquiryType.forRent) return 'FOR RENT';
//   if (inquiryType.onRent) return 'ON RENT';
//   if (inquiryType.forPurchase) return 'FOR PURCHASE';
//   return 'INQUIRY';
// };

// const formatPropertyType = (propertyType) => {
//   return Object.keys(propertyType)
//     .filter(key => propertyType[key])
//     .map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
//     .join(', ');
// };

// const formatPropertySubType = (subType) => {
//   return subType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// };

// // Styled Components (Copied from PropertyView.jsx)
// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7); /* Creates a dark overlay effect */
//   min-height: 100vh; /* Allows content to expand vertically */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   padding-top: 135px;
//   overflow: auto; /* Ensures content can scroll if it exceeds the viewport height */
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

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   background-color: #333; /* Subtle dark background */
//   border: 2px solid #ff0000; /* Border to match red theme */
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   padding: 15px 20px; /* Adjusted padding for better appearance */
//   border-radius: 10px; /* More rounded corners */
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
//   width: 200px; /* Match the width of other buttons */
//   height: 60px; /* Match the height of other buttons */
//   transition: background-color 0.3s, transform 0.3s; /* Smooth transition effects */

//   &:hover {
//     background-color: #ff0000; /* Match hover effect with the red theme */
//     transform: translateY(-2px); /* Slight lift on hover */
//   }

//   @media (max-width: 768px) {
//     font-size: 14px;
//     width: 100%;
//     height: auto;
//     left: 10px;
//   }
// `;

// const PropertiesGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
//   margin-top: 50px; 
// `;

// const PropertyCard = styled.div`
//   width: 100%;
//   max-width: 600px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   transition: transform 0.3s ease-in-out;
//   margin: 10px; /* Adds spacing around the card */

//   &:hover {
//     transform: translateY(-5px);
//   }

//   @media (min-width: 768px) {
//     flex-direction: row; /* Use row layout for larger screens */
//   }
// `;

// const PropertyImage = styled.img`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-top-left-radius: 8px; /* Round corners for the image */
//   border-top-right-radius: 8px;

//   @media (min-width: 768px) {
//     width: 340px;
//     height: 100%;
//     border-top-right-radius: 0; /* Adjust rounding for larger screens */
//     border-bottom-left-radius: 8px;
//   }
// `;

// const PropertyInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 10px; /* Increased padding for content */
//   background: #fff;
//   flex-grow: 1;

//   @media (min-width: 768px) {
//     border-left: 1px solid #ccc; /* Separator appears only on larger screens */
//   }
// `;

// const PropertyTitle = styled.h3`
//   font-size: 1.2em;
//   color: #333;
//   margin: 0;  /* Remove margin for tighter spacing */
// `;

// const Badge = styled.span`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: ${(props) => props.color || '#007BFF'};  /* Use prop color or default to blue */
//   color: white;
//   padding: 5px 10px;
//   border-radius: 15px;
//   font-weight: bold;
// `;

// const ActionButtonsContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 10px; /* Adjusted for better spacing */
// `;

// const ActionButton = styled.button`
//   background-color: #007BFF;  /* Blue color */
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 0.9em;
//   margin-right: 8px;  /* Adds spacing to the right of each button */

//   &:hover {
//     background-color: #0056b3;  /* Darker blue on hover */
//   }

//   &:last-child {
//     margin-right: 0;  /* Removes margin from the last button to avoid extra space at the end */
//   }
// `;

// const PrintButton = styled(ActionButton)`
//   background-color: #28a745;  /* Green for print button */

//   &:hover {
//     background-color: #1e7e34;  /* Darker green on hover */
//   }
// `;

// const DetailsButton = styled(Link)`
//   background-color: #ff0000; /* Red for the details button */
//   color: white;
//   display: inline-block;
//   padding: 8px 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   text-align: center;
//   text-decoration: none; /* Remove underline from links */

//   &:hover {
//     background-color: #cc0000; /* Darker red on hover */
//   }
// `;

// const FeaturesIcons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-top: 5px;
// `;

// const DetailItem = styled.p`
//   margin: 5px 0; /* Adjust spacing as needed */
//   font-size: 1em; /* Adjust font size as needed */
// `;

// const DetailLabel = styled.span`
//   font-weight: bold; /* Makes the text bold */
// `;

// const DetailIcon = styled.span`
//   margin-right: 8px; /* Space between icon and text */
//   display: inline-flex; /* Aligns icon with the text vertically */
//   align-items: center;
// `;

// // Component Implementation
// const PropertyList = () => {
//   const { inquiryType, propertyType, propertySubType } = useParams();
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all properties
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found in localStorage');
//           setLoading(false);
//           return;
//         }
//         const decoded = jwtDecode(token);
//         const userId = decoded.userId;

//         const response = await axios.get('http://195.179.231.102:6003/api/properties/all', {
//           params: { userId: userId },
//         });
//         setProperties(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Filter properties based on all three parameters
//   useEffect(() => {
//     const filterProperties = () => {
//       const filtered = properties.filter(property => {
//         const matchesInquiry = inquiryType ? property.inquiryType[inquiryType] : true;
//         const matchesType = propertyType ? property.propertyType[propertyType] : true;
//         const matchesSubType = propertySubType ? property.propertySubType[propertySubType] : true;
//         return matchesInquiry && matchesType && matchesSubType;
//       });
//       setFilteredProperties(filtered);
//     };

//     if (properties.length > 0) {
//       filterProperties();
//     }
//   }, [properties, inquiryType, propertyType, propertySubType]);

//   // Handle card click to navigate to PropertyDetail
//   const handleCardClick = (propertyId) => {
//     navigate(`/property-detail/${propertyId}`);
//   };

//   if (loading) {
//     return (
//       <PageContainer>
//         <HeaderContainer>
//           <Header>Loading...</Header>
//         </HeaderContainer>
//       </PageContainer>
//     );
//   }

//   return (
//     <PageContainer>
//       <HeaderContainer>
//         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//         <Header>
//           {formatInquiryType({ [inquiryType]: true })} - {formatPropertyType({ [propertyType]: true })} - {formatPropertySubType(propertySubType)}
//         </Header>
//       </HeaderContainer>
//       {filteredProperties.length === 0 ? (
//         <Header>No properties found.</Header>
//       ) : (
//         <PropertiesGrid>
//           {filteredProperties.map(property => (
//             <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
//               <PropertyImage 
//                 src={property.images && property.images.length > 0 ? `http://195.179.231.102:6003/${property.images[0]}` : 'http://195.179.231.102:6003/uploads/bg.jpg'} 
//                 alt={property.title || 'Property Image'}
//               />
//               <PropertyInfo>
//                 <div>
//                   <PropertyTitle>{property.title || 'No Title'}</PropertyTitle>
//                   <DetailItem>
//                     <DetailIcon><FaHome /></DetailIcon>
//                     <DetailLabel>Type:</DetailLabel> {formatPropertySubType(getPropertySubType(property.propertySubType))}
//                   </DetailItem>
//                   <DetailItem>
//                     <DetailIcon><FaCity /></DetailIcon>
//                     <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
//                   </DetailItem>
//                   <DetailItem>
//                     <DetailIcon><FaArrowsAlt /></DetailIcon>
//                     <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
//                   </DetailItem>
//                   <DetailItem>
//                     <DetailIcon><FaBed /></DetailIcon>
//                     <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms !== undefined ? property.bedrooms : 'N/A'}
//                   </DetailItem>
//                   <DetailItem>
//                     <DetailIcon><FaDollarSign /></DetailIcon>
//                     <DetailLabel>Price:</DetailLabel> ${property.price ? property.price.toLocaleString() : 'N/A'}
//                   </DetailItem>
//                   <DetailItem>
//                     <DetailIcon><FaCalendarAlt /></DetailIcon>
//                     <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
//                   </DetailItem>
//                   <PropertyFeatures features={property.features} />
//                 </div>
//                 <DetailsButton to={`/property/${property._id}`} onClick={(e) => e.stopPropagation()}>
//                   Details
//                 </DetailsButton>
//                 <ActionButtonsContainer>
//                   <ActionButton onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(property.title, window.location.href); }}>
//                     Share on WhatsApp
//                   </ActionButton>
//                   <ActionButton onClick={(e) => { e.stopPropagation(); handleEmailShare(property.title, window.location.href); }}>
//                     Share via Email
//                   </ActionButton>
//                   <PrintButton onClick={(e) => { e.stopPropagation(); handlePrint(); }}>
//                     Print
//                   </PrintButton>
//                 </ActionButtonsContainer>
//               </PropertyInfo>
//               <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
//                 {getInquiryTypeLabel(property.inquiryType).label}
//               </Badge>
//             </PropertyCard>
//           ))}
//         </PropertiesGrid>
//       )}
//     </PageContainer>
//   );
// };

// // Additional Helper Components and Functions
// const getPropertySubType = (subTypes) => {
//   if (!subTypes) return 'Unknown';
//   for (const key in subTypes) {
//     if (subTypes[key]) {
//       return key;
//     }
//   }
//   return 'Unknown'; // Default case if no subtype is true
// };

// const getInquiryTypeLabel = (inquiryType) => {
//   if (!inquiryType) return { label: 'INQUIRY', color: '#6c757d' };
//   if (inquiryType.forSale) return { label: 'FOR SALE', color: '#ff0000' };
//   if (inquiryType.forRent) return { label: 'FOR RENT', color: '#28a745' };
//   if (inquiryType.onRent) return { label: 'ON RENT', color: '#007bff' };
//   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#6f42c1' };
//   return { label: 'INQUIRY', color: '#6c757d' }; // Default case
// };

// const PropertyFeatures = ({ features }) => (
//   <FeaturesIcons>
//     <FeatureIcon feature={features?.garage} IconComponent={FaCar} title="Garage" />
//     <FeatureIcon feature={features?.garden} IconComponent={FaTree} title="Garden" />
//     <FeatureIcon feature={features?.mainRoad} IconComponent={FaRoad} title="Main Road" />
//   </FeaturesIcons>
// );

// const FeatureIcon = ({ feature, IconComponent, title }) => (
//   feature ? <IconComponent size="20" title={title} /> : null
// );

// // Share and Print Handlers
// const handleWhatsAppShare = (title, url) => {
//   const text = `Check out this property: ${title}, ${url}`;
//   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
//   window.open(whatsappUrl, '_blank');
// };

// const handleEmailShare = (title, url) => {
//   const subject = `Interesting Property Alert: ${title}`;
//   const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
//   const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
//   window.open(mailtoUrl, '_blank'); // Opens in a new tab or window
// };

// const handlePrint = () => {
//   window.print();
// };

// export default PropertyList;


// src/components/PropertyList.jsx

import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { 
  FaBed, FaCar, FaTree,
  FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign 
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import bgImage from '../images/bg.jpg';

// Helper Functions

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatInquiryType = (inquiryType) => {
  if (!inquiryType) return 'INQUIRY';
  if (inquiryType.forSale) return 'FOR SALE';
  if (inquiryType.forRent) return 'FOR RENT';
  if (inquiryType.onRent) return 'ON RENT';
  if (inquiryType.forPurchase) return 'FOR PURCHASE';
  return 'INQUIRY';
};

const formatPropertyType = (propertyType) => {
  if (!propertyType) return 'Unknown';
  return Object.keys(propertyType)
    .filter(key => propertyType[key])
    .map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
    .join(', ');
};

const formatPropertySubType = (subType) => {
  if (!subType) return 'Unknown';
  return subType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const getPropertySubType = (subTypes) => {
  if (!subTypes) return 'Unknown';
  for (const key in subTypes) {
    if (subTypes[key]) {
      return key.charAt(0).toUpperCase() + key.slice(1);
    }
  }
  return 'Unknown'; // Default case if no subtype is true
};

const getInquiryTypeLabel = (inquiryType) => {
  if (!inquiryType) return { label: 'INQUIRY', color: '#6c757d' };
  if (inquiryType.forSale) return { label: 'FOR SALE', color: '#ff0000' };
  if (inquiryType.forRent) return { label: 'FOR RENT', color: '#28a745' };
  if (inquiryType.onRent) return { label: 'ON RENT', color: '#007bff' };
  if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#6f42c1' };
  return { label: 'INQUIRY', color: '#6c757d' }; // Default case
};

// Share and Print Handlers

const handleWhatsAppShare = (title, url) => {
  const text = `Check out this property: ${title}, ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
};

const handleEmailShare = (title, url) => {
  const subject = `Interesting Property Alert: ${title}`;
  const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(mailtoUrl, '_blank'); // Opens in a new tab or window
};

const handlePrint = () => {
  window.print();
};

// Styled Components

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(255, 255, 255, 0.95);
  min-height: 100vh;
  padding: 20px;
  padding-top: 80px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  color: #2C3E50;

  h1 {
    font-size: 2em;
    margin: 0;
    font-weight: 700;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 50px;
  background-color: #FFFFFF;
  border: 2px solid #E74C3C;
  color: #E74C3C;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #E74C3C;
    color: #FFFFFF;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    left: 10px;
    width: 100%;
    text-align: center;
  }
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Three columns
  gap: 30px;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // Two columns on medium screens
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; // One column on small screens
  }
`;

const PropertyCard = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

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
`;

const PropertyTitle = styled.h3`
  font-size: 1.4em;
  color: #2C3E50;
  margin-bottom: 10px;
  font-weight: 600;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  font-size: 0.95em;
  color: #34495E;
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

const DetailIcon = styled.span`
  margin-right: 8px;
  color: #3498DB;
  display: flex;
  align-items: center;
`;

const Badge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${(props) => props.color || '#3498DB'};
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85em;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #E74C3C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: darkred;
    transform: translateY(-2px);
  }
`;

const PrintButton = styled(ActionButton)`
  background-color: #2ECC71;

  &:hover {
    background-color: #27AE60;
  }
`;

const DetailsButton = styled(Link)`
  background-color: #ff0000;
  color: white;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;

const FeaturesIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

// Feature Icon Component
const FeatureIcon = ({ feature, IconComponent, title }) => (
  feature ? <IconComponent size="20" title={title} /> : null
);

// Property Features Component
const PropertyFeatures = ({ features }) => (
  <FeaturesIcons>
    <FeatureIcon feature={features?.garage} IconComponent={FaCar} title="Garage" />
    <FeatureIcon feature={features?.garden} IconComponent={FaTree} title="Garden" />
    <FeatureIcon feature={features?.mainRoad} IconComponent={FaRoad} title="Main Road" />
  </FeaturesIcons>
);

// Main Component

const PropertyList = () => {
  const { inquiryType, propertyType, propertySubType } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setError('Authentication token not found. Please log in.');
          setLoading(false);
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const response = await axios.get('http://195.179.231.102:6003/api/properties/all', {
          params: { userId: userId },
        });

        // Validate response data
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format received from API.');
        }

        setProperties(response.data);
        setFilteredProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on URL parameters
  useEffect(() => {
    const filterProperties = () => {
      const filtered = properties.filter(property => {
        const matchesInquiry = inquiryType ? property.inquiryType[inquiryType] : true;
        const matchesType = propertyType ? property.propertyType[propertyType] : true;
        const matchesSubType = propertySubType ? property.propertySubType[propertySubType] : true;
        return matchesInquiry && matchesType && matchesSubType;
      });
      setFilteredProperties(filtered);
    };

    if (properties.length > 0) {
      filterProperties();
    }
  }, [properties, inquiryType, propertyType, propertySubType]);

  // Handle card click to navigate to PropertyDetail
  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <BackButton onClick={() => navigate(-1)} aria-label="Go Back">← Back</BackButton>
        <h1>
          {inquiryType ? formatInquiryType(inquiryType) : 'All Inquiries'} - 
          {propertyType ? ` ${formatPropertyType({ [propertyType]: true })}` : ' All Types'} - 
          {propertySubType ? ` ${formatPropertySubType(propertySubType)}` : ' All Subtypes'}
        </h1>
      </HeaderContainer>

      {/* Loading Indicator */}
      {loading && (
        <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>Loading properties...</p>
      )}

      {/* Error Message */}
      {error && (
        <p style={{ color: '#E74C3C', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
      )}

      {/* Properties Grid */}
      {!loading && !error && (
        filteredProperties.length === 0 ? (
          <HeaderContainer>
            <h1>No properties found.</h1>
          </HeaderContainer>
        ) : (
          <PropertiesGrid>
            {filteredProperties.map(property => (
              <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
                <PropertyImage 
                  src={property.images && property.images.length > 0 
                    ? `http://195.179.231.102:6003/${property.images[0]}` 
                    : 'http://195.179.231.102:6003/uploads/bg.jpg'} 
                  alt={property.title || 'Property Image'}
                />

                <PropertyInfo>
                  <div>
                    <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
                    <DetailItem>
                      <DetailIcon><FaHome /></DetailIcon>
                      <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
                    </DetailItem>
                    <DetailItem>
                      <DetailIcon><FaCity /></DetailIcon>
                      <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
                    </DetailItem>
                    <DetailItem>
                      <DetailIcon><FaArrowsAlt /></DetailIcon>
                      <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
                    </DetailItem>
                    <DetailItem>
                      <DetailIcon><FaBed /></DetailIcon>
                      <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms !== undefined ? property.bedrooms : 'N/A'}
                    </DetailItem>
                    <DetailItem>
                      <DetailIcon><FaDollarSign /></DetailIcon>
                      <DetailLabel>Price:</DetailLabel> ${property.price ? property.price.toLocaleString() : 'N/A'}
                    </DetailItem>
                    <DetailItem>
                      <DetailIcon><FaCalendarAlt /></DetailIcon>
                      <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
                    </DetailItem>
                    <PropertyFeatures features={property.features} />
                  </div>

                  <ActionButtonsContainer>
                    <ActionButton 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleWhatsAppShare(property.title || 'No Title', window.location.href); 
                      }}
                      aria-label="Share on WhatsApp"
                    >
                      WhatsApp
                    </ActionButton>
                    <ActionButton 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleEmailShare(property.title || 'No Title', window.location.href); 
                      }}
                      aria-label="Share via Email"
                    >
                      Email
                    </ActionButton>
                    <PrintButton 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handlePrint(); 
                      }}
                      aria-label="Print Property Details"
                    >
                      Print
                    </PrintButton>
                  </ActionButtonsContainer>
                </PropertyInfo>

                <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
                  {getInquiryTypeLabel(property.inquiryType).label}
                </Badge>
              </PropertyCard>
            ))}
          </PropertiesGrid>
        )
      )}
    </PageContainer>
  );
};

export default PropertyList;
