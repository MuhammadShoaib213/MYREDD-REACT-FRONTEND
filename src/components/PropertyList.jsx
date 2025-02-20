// // // // src/components/PropertyList.jsx

// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import {jwtDecode} from 'jwt-decode';
// // // import { FaBed, FaBath, FaRulerCombined, FaCar, FaTree, FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign } from 'react-icons/fa';
// // // import { Link, useNavigate, useParams } from 'react-router-dom';
// // // import bgImage from '../images/bg.jpg';

// // // // Helper Functions
// // // const formatDate = (dateString) => {
// // //   if (!dateString) return 'N/A';
// // //   const date = new Date(dateString);
// // //   return date.toLocaleDateString("en-US", {
// // //     year: 'numeric',
// // //     month: 'long',
// // //     day: 'numeric',
// // //   });
// // // };

// // // const formatInquiryType = (inquiryType) => {
// // //   if (inquiryType.forSale) return 'FOR SALE';
// // //   if (inquiryType.forRent) return 'FOR RENT';
// // //   if (inquiryType.onRent) return 'ON RENT';
// // //   if (inquiryType.forPurchase) return 'FOR PURCHASE';
// // //   return 'INQUIRY';
// // // };

// // // const formatPropertyType = (propertyType) => {
// // //   return Object.keys(propertyType)
// // //     .filter(key => propertyType[key])
// // //     .map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
// // //     .join(', ');
// // // };

// // // const formatPropertySubType = (subType) => {
// // //   return subType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// // // };

// // // // Styled Components (Copied from PropertyView.jsx)
// // // const PageContainer = styled.div`
// // //   background-image: url(${bgImage});
// // //   background-size: cover;
// // //   background-position: center;
// // //   background-blend-mode: overlay;
// // //   background-color: rgba(0, 0, 0, 0.7); /* Creates a dark overlay effect */
// // //   min-height: 100vh; /* Allows content to expand vertically */
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   padding: 20px;
// // //   padding-top: 135px;
// // //   overflow: auto; /* Ensures content can scroll if it exceeds the viewport height */
// // // `;

// // // const HeaderContainer = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   position: relative;
// // //   width: 100%;
// // //   padding: 20px;
  
// // //   @media (max-width: 768px) {
// // //     flex-direction: column;
// // //     padding: 10px;
// // //   }
// // // `;

// // // const Header = styled.h1`
// // //   color: white;
// // //   margin: 0;
// // // `;

// // // const BackButton = styled.button`
// // //   position: absolute;
// // //   left: 20px;
// // //   background-color: #333; /* Subtle dark background */
// // //   border: 2px solid #ff0000; /* Border to match red theme */
// // //   color: white;
// // //   font-size: 16px;
// // //   cursor: pointer;
// // //   padding: 15px 20px; /* Adjusted padding for better appearance */
// // //   border-radius: 10px; /* More rounded corners */
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
// // //   width: 200px; /* Match the width of other buttons */
// // //   height: 60px; /* Match the height of other buttons */
// // //   transition: background-color 0.3s, transform 0.3s; /* Smooth transition effects */

// // //   &:hover {
// // //     background-color: #ff0000; /* Match hover effect with the red theme */
// // //     transform: translateY(-2px); /* Slight lift on hover */
// // //   }

// // //   @media (max-width: 768px) {
// // //     font-size: 14px;
// // //     width: 100%;
// // //     height: auto;
// // //     left: 10px;
// // //   }
// // // `;

// // // const PropertiesGrid = styled.div`
// // //   display: flex;
// // //   flex-wrap: wrap;
// // //   gap: 20px;
// // //   justify-content: center;
// // //   margin-top: 50px; 
// // // `;

// // // const PropertyCard = styled.div`
// // //   width: 100%;
// // //   max-width: 600px;
// // //   border: 1px solid #ccc;
// // //   border-radius: 8px;
// // //   overflow: hidden;
// // //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// // //   display: flex;
// // //   flex-direction: column;
// // //   position: relative;
// // //   transition: transform 0.3s ease-in-out;
// // //   margin: 10px; /* Adds spacing around the card */

// // //   &:hover {
// // //     transform: translateY(-5px);
// // //   }

// // //   @media (min-width: 768px) {
// // //     flex-direction: row; /* Use row layout for larger screens */
// // //   }
// // // `;

// // // const PropertyImage = styled.img`
// // //   width: 100%;
// // //   height: 200px;
// // //   object-fit: cover;
// // //   border-top-left-radius: 8px; /* Round corners for the image */
// // //   border-top-right-radius: 8px;

// // //   @media (min-width: 768px) {
// // //     width: 340px;
// // //     height: 100%;
// // //     border-top-right-radius: 0; /* Adjust rounding for larger screens */
// // //     border-bottom-left-radius: 8px;
// // //   }
// // // `;

// // // const PropertyInfo = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   justify-content: space-between;
// // //   padding: 10px; /* Increased padding for content */
// // //   background: #fff;
// // //   flex-grow: 1;

// // //   @media (min-width: 768px) {
// // //     border-left: 1px solid #ccc; /* Separator appears only on larger screens */
// // //   }
// // // `;

// // // const PropertyTitle = styled.h3`
// // //   font-size: 1.2em;
// // //   color: #333;
// // //   margin: 0;  /* Remove margin for tighter spacing */
// // // `;

// // // const Badge = styled.span`
// // //   position: absolute;
// // //   top: 10px;
// // //   right: 10px;
// // //   background-color: ${(props) => props.color || '#007BFF'};  /* Use prop color or default to blue */
// // //   color: white;
// // //   padding: 5px 10px;
// // //   border-radius: 15px;
// // //   font-weight: bold;
// // // `;

// // // const ActionButtonsContainer = styled.div`
// // //   display: flex;
// // //   justify-content: space-around;
// // //   margin-top: 10px; /* Adjusted for better spacing */
// // // `;

// // // const ActionButton = styled.button`
// // //   background-color: #007BFF;  /* Blue color */
// // //   color: white;
// // //   border: none;
// // //   padding: 8px 16px;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   font-size: 0.9em;
// // //   margin-right: 8px;  /* Adds spacing to the right of each button */

// // //   &:hover {
// // //     background-color: #0056b3;  /* Darker blue on hover */
// // //   }

// // //   &:last-child {
// // //     margin-right: 0;  /* Removes margin from the last button to avoid extra space at the end */
// // //   }
// // // `;

// // // const PrintButton = styled(ActionButton)`
// // //   background-color: #28a745;  /* Green for print button */

// // //   &:hover {
// // //     background-color: #1e7e34;  /* Darker green on hover */
// // //   }
// // // `;

// // // const DetailsButton = styled(Link)`
// // //   background-color: #ff0000; /* Red for the details button */
// // //   color: white;
// // //   display: inline-block;
// // //   padding: 8px 16px;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   text-align: center;
// // //   text-decoration: none; /* Remove underline from links */

// // //   &:hover {
// // //     background-color: #cc0000; /* Darker red on hover */
// // //   }
// // // `;

// // // const FeaturesIcons = styled.div`
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 10px;
// // //   margin-top: 5px;
// // // `;

// // // const DetailItem = styled.p`
// // //   margin: 5px 0; /* Adjust spacing as needed */
// // //   font-size: 1em; /* Adjust font size as needed */
// // // `;

// // // const DetailLabel = styled.span`
// // //   font-weight: bold; /* Makes the text bold */
// // // `;

// // // const DetailIcon = styled.span`
// // //   margin-right: 8px; /* Space between icon and text */
// // //   display: inline-flex; /* Aligns icon with the text vertically */
// // //   align-items: center;
// // // `;

// // // // Component Implementation
// // // const PropertyList = () => {
// // //   const { inquiryType, propertyType, propertySubType } = useParams();
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState([]);
// // //   const [filteredProperties, setFilteredProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // Fetch all properties
// // //   useEffect(() => {
// // //     const fetchProperties = async () => {
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) {
// // //           console.error('No token found in localStorage');
// // //           setLoading(false);
// // //           return;
// // //         }
// // //         const decoded = jwtDecode(token);
// // //         const userId = decoded.userId;

// // //         const response = await axios.get('api/properties/all', {
// // //           params: { userId: userId },
// // //         });
// // //         setProperties(response.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error('Error fetching properties:', error);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchProperties();
// // //   }, []);

// // //   // Filter properties based on all three parameters
// // //   useEffect(() => {
// // //     const filterProperties = () => {
// // //       const filtered = properties.filter(property => {
// // //         const matchesInquiry = inquiryType ? property.inquiryType[inquiryType] : true;
// // //         const matchesType = propertyType ? property.propertyType[propertyType] : true;
// // //         const matchesSubType = propertySubType ? property.propertySubType[propertySubType] : true;
// // //         return matchesInquiry && matchesType && matchesSubType;
// // //       });
// // //       setFilteredProperties(filtered);
// // //     };

// // //     if (properties.length > 0) {
// // //       filterProperties();
// // //     }
// // //   }, [properties, inquiryType, propertyType, propertySubType]);

// // //   // Handle card click to navigate to PropertyDetail
// // //   const handleCardClick = (propertyId) => {
// // //     navigate(`/property-detail/${propertyId}`);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <PageContainer>
// // //         <HeaderContainer>
// // //           <Header>Loading...</Header>
// // //         </HeaderContainer>
// // //       </PageContainer>
// // //     );
// // //   }

// // //   return (
// // //     <PageContainer>
// // //       <HeaderContainer>
// // //         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
// // //         <Header>
// // //           {formatInquiryType({ [inquiryType]: true })} - {formatPropertyType({ [propertyType]: true })} - {formatPropertySubType(propertySubType)}
// // //         </Header>
// // //       </HeaderContainer>
// // //       {filteredProperties.length === 0 ? (
// // //         <Header>No properties found.</Header>
// // //       ) : (
// // //         <PropertiesGrid>
// // //           {filteredProperties.map(property => (
// // //             <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
// // //               <PropertyImage 
// // //                 src={property.images && property.images.length > 0 ? `${property.images[0]}` : 'uploads/bg.jpg'} 
// // //                 alt={property.title || 'Property Image'}
// // //               />
// // //               <PropertyInfo>
// // //                 <div>
// // //                   <PropertyTitle>{property.title || 'No Title'}</PropertyTitle>
// // //                   <DetailItem>
// // //                     <DetailIcon><FaHome /></DetailIcon>
// // //                     <DetailLabel>Type:</DetailLabel> {formatPropertySubType(getPropertySubType(property.propertySubType))}
// // //                   </DetailItem>
// // //                   <DetailItem>
// // //                     <DetailIcon><FaCity /></DetailIcon>
// // //                     <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
// // //                   </DetailItem>
// // //                   <DetailItem>
// // //                     <DetailIcon><FaArrowsAlt /></DetailIcon>
// // //                     <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
// // //                   </DetailItem>
// // //                   <DetailItem>
// // //                     <DetailIcon><FaBed /></DetailIcon>
// // //                     <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms !== undefined ? property.bedrooms : 'N/A'}
// // //                   </DetailItem>
// // //                   <DetailItem>
// // //                     <DetailIcon><FaDollarSign /></DetailIcon>
// // //                     <DetailLabel>Price:</DetailLabel> ${property.price ? property.price.toLocaleString() : 'N/A'}
// // //                   </DetailItem>
// // //                   <DetailItem>
// // //                     <DetailIcon><FaCalendarAlt /></DetailIcon>
// // //                     <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
// // //                   </DetailItem>
// // //                   <PropertyFeatures features={property.features} />
// // //                 </div>
// // //                 <DetailsButton to={`/property/${property._id}`} onClick={(e) => e.stopPropagation()}>
// // //                   Details
// // //                 </DetailsButton>
// // //                 <ActionButtonsContainer>
// // //                   <ActionButton onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(property.title, window.location.href); }}>
// // //                     Share on WhatsApp
// // //                   </ActionButton>
// // //                   <ActionButton onClick={(e) => { e.stopPropagation(); handleEmailShare(property.title, window.location.href); }}>
// // //                     Share via Email
// // //                   </ActionButton>
// // //                   <PrintButton onClick={(e) => { e.stopPropagation(); handlePrint(); }}>
// // //                     Print
// // //                   </PrintButton>
// // //                 </ActionButtonsContainer>
// // //               </PropertyInfo>
// // //               <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
// // //                 {getInquiryTypeLabel(property.inquiryType).label}
// // //               </Badge>
// // //             </PropertyCard>
// // //           ))}
// // //         </PropertiesGrid>
// // //       )}
// // //     </PageContainer>
// // //   );
// // // };

// // // // Additional Helper Components and Functions
// // // const getPropertySubType = (subTypes) => {
// // //   if (!subTypes) return 'Unknown';
// // //   for (const key in subTypes) {
// // //     if (subTypes[key]) {
// // //       return key;
// // //     }
// // //   }
// // //   return 'Unknown'; // Default case if no subtype is true
// // // };

// // // const getInquiryTypeLabel = (inquiryType) => {
// // //   if (!inquiryType) return { label: 'INQUIRY', color: '#6c757d' };
// // //   if (inquiryType.forSale) return { label: 'FOR SALE', color: '#ff0000' };
// // //   if (inquiryType.forRent) return { label: 'FOR RENT', color: '#28a745' };
// // //   if (inquiryType.onRent) return { label: 'ON RENT', color: '#007bff' };
// // //   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#6f42c1' };
// // //   return { label: 'INQUIRY', color: '#6c757d' }; // Default case
// // // };

// // // const PropertyFeatures = ({ features }) => (
// // //   <FeaturesIcons>
// // //     <FeatureIcon feature={features?.garage} IconComponent={FaCar} title="Garage" />
// // //     <FeatureIcon feature={features?.garden} IconComponent={FaTree} title="Garden" />
// // //     <FeatureIcon feature={features?.mainRoad} IconComponent={FaRoad} title="Main Road" />
// // //   </FeaturesIcons>
// // // );

// // // const FeatureIcon = ({ feature, IconComponent, title }) => (
// // //   feature ? <IconComponent size="20" title={title} /> : null
// // // );

// // // // Share and Print Handlers
// // // const handleWhatsAppShare = (title, url) => {
// // //   const text = `Check out this property: ${title}, ${url}`;
// // //   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //   window.open(whatsappUrl, '_blank');
// // // };

// // // const handleEmailShare = (title, url) => {
// // //   const subject = `Interesting Property Alert: ${title}`;
// // //   const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
// // //   const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
// // //   window.open(mailtoUrl, '_blank'); // Opens in a new tab or window
// // // };

// // // const handlePrint = () => {
// // //   window.print();
// // // };

// // // export default PropertyList;


// // // src/components/PropertyList.jsx

// // import React, { useState, useEffect, useMemo } from 'react';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import {jwtDecode} from 'jwt-decode'; // Corrected import
// // import { 
// //   FaBed, FaCar, FaTree,
// //   FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign 
// // } from 'react-icons/fa';
// // import { Link, useNavigate, useParams } from 'react-router-dom';
// // import bgImage from '../images/bg.jpg';

// // // Helper Functions

// // const formatDate = (dateString) => {
// //   if (!dateString) return 'N/A';
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString("en-US", {
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric',
// //   });
// // };

// // const formatInquiryType = (inquiryType) => {
// //   if (!inquiryType) return 'INQUIRY';
// //   if (inquiryType.forSale) return 'FOR SALE';
// //   if (inquiryType.forRent) return 'FOR RENT';
// //   if (inquiryType.onRent) return 'ON RENT';
// //   if (inquiryType.forPurchase) return 'FOR PURCHASE';
// //   return 'INQUIRY';
// // };

// // const formatPropertyType = (propertyType) => {
// //   if (!propertyType) return 'Unknown';
// //   return Object.keys(propertyType)
// //     .filter(key => propertyType[key])
// //     .map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
// //     .join(', ');
// // };

// // const formatPropertySubType = (subType) => {
// //   if (!subType) return 'Unknown';
// //   return subType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// // };

// // const getPropertySubType = (subTypes) => {
// //   if (!subTypes) return 'Unknown';
// //   for (const key in subTypes) {
// //     if (subTypes[key]) {
// //       return key.charAt(0).toUpperCase() + key.slice(1);
// //     }
// //   }
// //   return 'Unknown'; // Default case if no subtype is true
// // };

// // const getInquiryTypeLabel = (inquiryType) => {
// //   if (!inquiryType) return { label: 'INQUIRY', color: '#6c757d' };
// //   if (inquiryType.forSale) return { label: 'FOR SALE', color: '#ff0000' };
// //   if (inquiryType.forRent) return { label: 'FOR RENT', color: '#28a745' };
// //   if (inquiryType.onRent) return { label: 'ON RENT', color: '#007bff' };
// //   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#6f42c1' };
// //   return { label: 'INQUIRY', color: '#6c757d' }; // Default case
// // };

// // // Share and Print Handlers

// // const handleWhatsAppShare = (title, url) => {
// //   const text = `Check out this property: ${title}, ${url}`;
// //   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
// //   window.open(whatsappUrl, '_blank');
// // };

// // const handleEmailShare = (title, url) => {
// //   const subject = `Interesting Property Alert: ${title}`;
// //   const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
// //   const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
// //   window.open(mailtoUrl, '_blank'); // Opens in a new tab or window
// // };

// // const handlePrint = () => {
// //   window.print();
// // };

// // // Styled Components

// // const PageContainer = styled.div`
// //   background-image: url(${bgImage});
// //   background-size: cover;
// //   background-position: center;
// //   background-blend-mode: overlay;
// //   background-color: rgba(255, 255, 255, 0.95);
// //   min-height: 100vh;
// //   padding: 20px;
// //   padding-top: 80px;
// //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // `;

// // const HeaderContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   position: relative;
// //   width: 100%;
// //   padding: 20px;
// //   color: #2C3E50;

// //   h1 {
// //     font-size: 2em;
// //     margin: 0;
// //     font-weight: 700;
// //     text-align: center;
// //   }

// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     padding: 10px;
// //   }
// // `;

// // const BackButton = styled.button`
// //   position: absolute;
// //   left: 20px;
// //   top: 50px;
// //   background-color: #FFFFFF;
// //   border: 2px solid #E74C3C;
// //   color: #E74C3C;
// //   font-size: 14px;
// //   cursor: pointer;
// //   padding: 10px 15px;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   transition: background-color 0.3s, color 0.3s, transform 0.3s;

// //   &:hover {
// //     background-color: #E74C3C;
// //     color: #FFFFFF;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     left: 10px;
// //     width: 100%;
// //     text-align: center;
// //   }
// // `;

// // const PropertiesGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(3, 1fr); // Three columns
// //   gap: 30px;
// //   padding: 20px;

// //   @media (max-width: 1024px) {
// //     grid-template-columns: repeat(2, 1fr); // Two columns on medium screens
// //   }

// //   @media (max-width: 600px) {
// //     grid-template-columns: 1fr; // One column on small screens
// //   }
// // `;

// // const PropertyCard = styled.div`
// //   background: #FFFFFF;
// //   border-radius: 10px;
// //   overflow: hidden;
// //   box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
// //   transition: transform 0.3s, box-shadow 0.3s;
// //   display: flex;
// //   flex-direction: column;
// //   position: relative;
// //   height: 100%;

// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
// //   }
// // `;

// // const PropertyImage = styled.img`
// //   width: 100%;
// //   height: 180px;
// //   object-fit: cover;

// //   @media (min-width: 768px) {
// //     height: 200px;
// //   }
// // `;

// // const PropertyInfo = styled.div`
// //   padding: 20px;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: space-between;
// // `;

// // const PropertyTitle = styled.h3`
// //   font-size: 1.4em;
// //   color: #2C3E50;
// //   margin-bottom: 10px;
// //   font-weight: 600;
// // `;

// // const DetailItem = styled.p`
// //   margin: 5px 0;
// //   font-size: 0.95em;
// //   color: #34495E;
// //   display: flex;
// //   align-items: center;
// // `;

// // const DetailLabel = styled.span`
// //   font-weight: 600;
// //   margin-right: 8px;
// // `;

// // const DetailIcon = styled.span`
// //   margin-right: 8px;
// //   color: #3498DB;
// //   display: flex;
// //   align-items: center;
// // `;

// // const Badge = styled.span`
// //   position: absolute;
// //   top: 15px;
// //   right: 15px;
// //   background-color: ${(props) => props.color || '#3498DB'};
// //   color: white;
// //   padding: 8px 12px;
// //   border-radius: 20px;
// //   font-weight: 600;
// //   font-size: 0.85em;
// //   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
// // `;

// // const ActionButtonsContainer = styled.div`
// //   display: flex;
// //   gap: 10px;
// //   margin-top: 15px;
// // `;

// // const ActionButton = styled.button`
// //   flex: 1;
// //   padding: 10px;
// //   background-color: #E74C3C;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   font-size: 0.9em;
// //   transition: background-color 0.3s, transform 0.3s;

// //   &:hover {
// //     background-color: darkred;
// //     transform: translateY(-2px);
// //   }
// // `;

// // const PrintButton = styled(ActionButton)`
// //   background-color: #2ECC71;

// //   &:hover {
// //     background-color: #27AE60;
// //   }
// // `;

// // const DetailsButton = styled(Link)`
// //   background-color: #ff0000;
// //   color: white;
// //   display: inline-block;
// //   padding: 8px 16px;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   text-align: center;
// //   text-decoration: none;
// //   margin-top: 10px;

// //   &:hover {
// //     background-color: #cc0000;
// //   }
// // `;

// // const FeaturesIcons = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   margin-top: 10px;
// // `;

// // // Feature Icon Component
// // const FeatureIcon = ({ feature, IconComponent, title }) => (
// //   feature ? <IconComponent size="20" title={title} /> : null
// // );

// // // Property Features Component
// // const PropertyFeatures = ({ features }) => (
// //   <FeaturesIcons>
// //     <FeatureIcon feature={features?.garage} IconComponent={FaCar} title="Garage" />
// //     <FeatureIcon feature={features?.garden} IconComponent={FaTree} title="Garden" />
// //     <FeatureIcon feature={features?.mainRoad} IconComponent={FaRoad} title="Main Road" />
// //   </FeaturesIcons>
// // );

// // // Main Component

// // const PropertyList = () => {
// //   const { inquiryType, propertyType, propertySubType } = useParams();
// //   const navigate = useNavigate();
// //   const [properties, setProperties] = useState([]);
// //   const [filteredProperties, setFilteredProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch all properties
// //   useEffect(() => {
// //     const fetchProperties = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           console.error('No token found in localStorage');
// //           setError('Authentication token not found. Please log in.');
// //           setLoading(false);
// //           return;
// //         }
// //         const decoded = jwtDecode(token);
// //         const userId = decoded.userId;

// //         const response = await axios.get('api/properties/all', {
// //           params: { userId: userId },
// //         });

// //         // Validate response data
// //         if (!Array.isArray(response.data)) {
// //           throw new Error('Invalid data format received from API.');
// //         }

// //         setProperties(response.data);
// //         setFilteredProperties(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching properties:', error);
// //         setError('Failed to load properties. Please try again later.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchProperties();
// //   }, []);

// //   // Filter properties based on URL parameters
// //   useEffect(() => {
// //     const filterProperties = () => {
// //       const filtered = properties.filter(property => {
// //         const matchesInquiry = inquiryType ? property.inquiryType[inquiryType] : true;
// //         const matchesType = propertyType ? property.propertyType[propertyType] : true;
// //         const matchesSubType = propertySubType ? property.propertySubType[propertySubType] : true;
// //         return matchesInquiry && matchesType && matchesSubType;
// //       });
// //       setFilteredProperties(filtered);
// //     };

// //     if (properties.length > 0) {
// //       filterProperties();
// //     }
// //   }, [properties, inquiryType, propertyType, propertySubType]);

// //   // Handle card click to navigate to PropertyDetail
// //   const handleCardClick = (propertyId) => {
// //     navigate(`/property/${propertyId}`);
// //   };

// //   return (
// //     <PageContainer>
// //       <HeaderContainer>
// //         <BackButton onClick={() => navigate(-1)} aria-label="Go Back">← Back</BackButton>
// //         <h1>
// //           {inquiryType ? formatInquiryType(inquiryType) : 'All Inquiries'} - 
// //           {propertyType ? ` ${formatPropertyType({ [propertyType]: true })}` : ' All Types'} - 
// //           {propertySubType ? ` ${formatPropertySubType(propertySubType)}` : ' All Subtypes'}
// //         </h1>
// //       </HeaderContainer>

// //       {/* Loading Indicator */}
// //       {loading && (
// //         <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>Loading properties...</p>
// //       )}

// //       {/* Error Message */}
// //       {error && (
// //         <p style={{ color: '#E74C3C', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
// //       )}

// //       {/* Properties Grid */}
// //       {!loading && !error && (
// //         filteredProperties.length === 0 ? (
// //           <HeaderContainer>
// //             <h1>No properties found.</h1>
// //           </HeaderContainer>
// //         ) : (
// //           <PropertiesGrid>
// //             {filteredProperties.map(property => (
// //               <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
// //                 <PropertyImage 
// //                   src={property.images && property.images.length > 0 
// //                     ? `${property.images[0]}` 
// //                     : 'uploads/bg.jpg'} 
// //                   alt={property.title || 'Property Image'}
// //                 />

// //                 <PropertyInfo>
// //                   <div>
// //                     <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
// //                     <DetailItem>
// //                       <DetailIcon><FaHome /></DetailIcon>
// //                       <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
// //                     </DetailItem>
// //                     <DetailItem>
// //                       <DetailIcon><FaCity /></DetailIcon>
// //                       <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
// //                     </DetailItem>
// //                     <DetailItem>
// //                       <DetailIcon><FaArrowsAlt /></DetailIcon>
// //                       <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
// //                     </DetailItem>
// //                     <DetailItem>
// //                       <DetailIcon><FaBed /></DetailIcon>
// //                       <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms !== undefined ? property.bedrooms : 'N/A'}
// //                     </DetailItem>
// //                     <DetailItem>
// //                       <DetailIcon><FaDollarSign /></DetailIcon>
// //                       <DetailLabel>Price:</DetailLabel> ${property.price ? property.price.toLocaleString() : 'N/A'}
// //                     </DetailItem>
// //                     <DetailItem>
// //                       <DetailIcon><FaCalendarAlt /></DetailIcon>
// //                       <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
// //                     </DetailItem>
// //                     <PropertyFeatures features={property.features} />
// //                   </div>

// //                   <ActionButtonsContainer>
// //                     <ActionButton 
// //                       onClick={(e) => { 
// //                         e.stopPropagation(); 
// //                         handleWhatsAppShare(property.title || 'No Title', window.location.href); 
// //                       }}
// //                       aria-label="Share on WhatsApp"
// //                     >
// //                       WhatsApp
// //                     </ActionButton>
// //                     <ActionButton 
// //                       onClick={(e) => { 
// //                         e.stopPropagation(); 
// //                         handleEmailShare(property.title || 'No Title', window.location.href); 
// //                       }}
// //                       aria-label="Share via Email"
// //                     >
// //                       Email
// //                     </ActionButton>
// //                     <PrintButton 
// //                       onClick={(e) => { 
// //                         e.stopPropagation(); 
// //                         handlePrint(); 
// //                       }}
// //                       aria-label="Print Property Details"
// //                     >
// //                       Print
// //                     </PrintButton>
// //                   </ActionButtonsContainer>
// //                 </PropertyInfo>

// //                 <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
// //                   {getInquiryTypeLabel(property.inquiryType).label}
// //                 </Badge>
// //               </PropertyCard>
// //             ))}
// //           </PropertiesGrid>
// //         )
// //       )}
// //     </PageContainer>
// //   );
// // };

// // export default PropertyList;


// // src/components/PropertyList.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { 
//   FaBed, FaCar, FaTree,
//   FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign 
// } from 'react-icons/fa';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import bgImage from '../images/bg.jpg';

// // --- Helper Functions ---

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
//   if (!inquiryType) return 'INQUIRY';
//   const lower = inquiryType.toLowerCase();
//   if (lower === 'for sale') return 'FOR SALE';
//   if (lower === 'for rent') return 'FOR RENT';
//   if (lower === 'on rent') return 'ON RENT';
//   if (lower === 'for purchase') return 'FOR PURCHASE';
//   return inquiryType.toUpperCase();
// };

// const formatPropertyType = (propertyType) => {
//   if (!propertyType) return 'Unknown';
//   if (typeof propertyType === 'string') {
//     return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
//   }
//   // Fallback if propertyType is an object
//   return Object.keys(propertyType)
//     .filter(key => propertyType[key])
//     .map(key => key.charAt(0).toUpperCase() + key.slice(1))
//     .join(', ');
// };

// const formatPropertySubType = (subType) => {
//   if (!subType) return 'Unknown';
//   if (typeof subType === 'string') {
//     return subType.charAt(0).toUpperCase() + subType.slice(1);
//   }
//   // If subType is an object, join all keys with truthy values.
//   return Object.keys(subType)
//     .filter(key => subType[key])
//     .map(key => key.charAt(0).toUpperCase() + key.slice(1))
//     .join(', ');
// };

// const getPropertySubType = (subTypes) => {
//   if (!subTypes) return 'Unknown';
//   if (typeof subTypes === 'string') return subTypes.charAt(0).toUpperCase() + subTypes.slice(1);
//   for (const key in subTypes) {
//     if (subTypes[key]) {
//       return key.charAt(0).toUpperCase() + key.slice(1);
//     }
//   }
//   return 'Unknown';
// };

// const getInquiryTypeLabel = (inquiryType) => {
//   if (!inquiryType) return { label: 'INQUIRY', color: '#6c757d' };
//   const lower = inquiryType.toLowerCase();
//   if (lower === 'for sale') return { label: 'FOR SALE', color: '#ff0000' };
//   if (lower === 'for rent') return { label: 'FOR RENT', color: '#28a745' };
//   if (lower === 'on rent') return { label: 'ON RENT', color: '#007bff' };
//   if (lower === 'for purchase') return { label: 'FOR PURCHASE', color: '#6f42c1' };
//   return { label: inquiryType.toUpperCase(), color: '#6c757d' };
// };

// const handleWhatsAppShare = (title, url) => {
//   const text = `Check out this property: ${title}, ${url}`;
//   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
//   window.open(whatsappUrl, '_blank');
// };

// const handleEmailShare = (title, url) => {
//   const subject = `Interesting Property Alert: ${title}`;
//   const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
//   const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
//   window.open(mailtoUrl, '_blank');
// };

// const handlePrint = () => {
//   window.print();
// };

// // --- Styled Components ---

// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(255, 255, 255, 0.95);
//   min-height: 100vh;
//   padding: 20px;
//   padding-top: 80px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   width: 100%;
//   padding: 20px;
//   color: #2C3E50;

//   h1 {
//     font-size: 2em;
//     margin: 0;
//     font-weight: 700;
//     text-align: center;
//   }

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 50px;
//   background-color: #FFFFFF;
//   border: 2px solid #E74C3C;
//   color: #E74C3C;
//   font-size: 14px;
//   cursor: pointer;
//   padding: 10px 15px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s, color 0.3s, transform 0.3s;

//   &:hover {
//     background-color: #E74C3C;
//     color: #FFFFFF;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     left: 10px;
//     width: 100%;
//     text-align: center;
//   }
// `;

// const PropertiesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr); /* Three columns */
//   gap: 30px;
//   padding: 20px;

//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr); /* Two columns on medium screens */
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr; /* One column on small screens */
//   }
// `;

// const PropertyCard = styled.div`
//   background: #FFFFFF;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s, box-shadow 0.3s;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   height: 100%;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
//   }
// `;

// const PropertyImage = styled.img`
//   width: 100%;
//   height: 180px;
//   object-fit: cover;

//   @media (min-width: 768px) {
//     height: 200px;
//   }
// `;

// const PropertyInfo = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const PropertyTitle = styled.h3`
//   font-size: 1.4em;
//   color: #2C3E50;
//   margin-bottom: 10px;
//   font-weight: 600;
// `;

// const DetailItem = styled.p`
//   margin: 5px 0;
//   font-size: 0.95em;
//   color: #34495E;
//   display: flex;
//   align-items: center;
// `;

// const DetailLabel = styled.span`
//   font-weight: 600;
//   margin-right: 8px;
// `;

// const DetailIcon = styled.span`
//   margin-right: 8px;
//   color: #3498DB;
//   display: flex;
//   align-items: center;
// `;

// const Badge = styled.span`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background-color: ${(props) => props.color || '#3498DB'};
//   color: white;
//   padding: 8px 12px;
//   border-radius: 20px;
//   font-weight: 600;
//   font-size: 0.85em;
//   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
// `;

// const ActionButtonsContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 15px;
// `;

// const ActionButton = styled.button`
//   flex: 1;
//   padding: 10px;
//   background-color: #E74C3C;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 0.9em;
//   transition: background-color 0.3s, transform 0.3s;

//   &:hover {
//     background-color: darkred;
//     transform: translateY(-2px);
//   }
// `;

// const PrintButton = styled(ActionButton)`
//   background-color: #2ECC71;

//   &:hover {
//     background-color: #27AE60;
//   }
// `;

// const DetailsButton = styled(Link)`
//   background-color: #ff0000;
//   color: white;
//   display: inline-block;
//   padding: 8px 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   text-align: center;
//   text-decoration: none;
//   margin-top: 10px;

//   &:hover {
//     background-color: #cc0000;
//   }
// `;

// const FeaturesIcons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-top: 10px;
// `;

// // Feature Icon Component
// const FeatureIcon = ({ feature, IconComponent, title }) => (
//   feature ? <IconComponent size="20" title={title} /> : null
// );

// // Property Features Component
// const PropertyFeatures = ({ features }) => (
//   <FeaturesIcons>
//     <FeatureIcon feature={features?.garage} IconComponent={FaCar} title="Garage" />
//     <FeatureIcon feature={features?.garden} IconComponent={FaTree} title="Garden" />
//     <FeatureIcon feature={features?.mainRoad} IconComponent={FaRoad} title="Main Road" />
//   </FeaturesIcons>
// );

// // --- Main Component ---
// const PropertyList = () => {
//   const { inquiryType, propertyType, propertySubType } = useParams();
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all properties
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found in localStorage');
//           setError('Authentication token not found. Please log in.');
//           setLoading(false);
//           return;
//         }
//         const decoded = jwtDecode(token);
//         const userId = decoded.userId;

//         const response = await axios.get('api/properties/all', {
//           params: { userId },
//         });

//         if (!Array.isArray(response.data)) {
//           throw new Error('Invalid data format received from API.');
//         }

//         setProperties(response.data);
//         setFilteredProperties(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setError('Failed to load properties. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Filter properties based on URL parameters using string comparisons
//   useEffect(() => {
//     const filterProperties = () => {
//       const filtered = properties.filter(property => {
//         // Compare inquiryType as strings (case-insensitive)
//         const matchesInquiry = inquiryType
//           ? property.inquiryType &&
//             property.inquiryType.toLowerCase() === inquiryType.toLowerCase()
//           : true;

//         // Compare propertyType as strings (case-insensitive)
//         const matchesType = propertyType
//           ? property.propertyType &&
//             property.propertyType.toLowerCase() === propertyType.toLowerCase()
//           : true;

//         // For propertySubType, check whether it’s a string or an object
//         let matchesSubType = true;
//         if (propertySubType) {
//           if (typeof property.propertySubType === 'string') {
//             matchesSubType =
//               property.propertySubType.toLowerCase() === propertySubType.toLowerCase();
//           } else if (
//             typeof property.propertySubType === 'object' &&
//             property.propertySubType !== null
//           ) {
//             matchesSubType = Boolean(property.propertySubType[propertySubType]);
//           } else {
//             matchesSubType = false;
//           }
//         }
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
//     navigate(`/property/${propertyId}`);
//   };

//   return (
//     <PageContainer>
//       <HeaderContainer>
//         <BackButton onClick={() => navigate(-1)} aria-label="Go Back">← Back</BackButton>
//         <h1>
//           {inquiryType ? formatInquiryType(inquiryType) : 'All Inquiries'} -{' '}
//           {propertyType ? formatPropertyType(propertyType) : 'All Types'} -{' '}
//           {propertySubType ? formatPropertySubType(propertySubType) : 'All Subtypes'}
//         </h1>
//       </HeaderContainer>

//       {/* Loading Indicator */}
//       {loading && (
//         <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>
//           Loading properties...
//         </p>
//       )}

//       {/* Error Message */}
//       {error && (
//         <p style={{ color: '#E74C3C', textAlign: 'center', fontSize: '1.2em' }}>
//           {error}
//         </p>
//       )}

//       {/* Properties Grid */}
//       {!loading && !error && (
//         filteredProperties.length === 0 ? (
//           <HeaderContainer>
//             <h1>No properties found.</h1>
//           </HeaderContainer>
//         ) : (
//           <PropertiesGrid>
//             {filteredProperties.map(property => (
//               <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
//                 <PropertyImage 
//                   src={
//                     property.images && property.images.length > 0 
//                       ? `${property.images[0]}` 
//                       : 'uploads/bg.jpg'
//                   } 
//                   alt={property.title || 'Property Image'}
//                 />

//                 <PropertyInfo>
//                   <div>
//                     <PropertyTitle>
//                       {property.title || 'No Title Available'}
//                     </PropertyTitle>
//                     <DetailItem>
//                       <DetailIcon><FaHome /></DetailIcon>
//                       <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaCity /></DetailIcon>
//                       <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaArrowsAlt /></DetailIcon>
//                       <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaBed /></DetailIcon>
//                       <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms !== undefined ? property.bedrooms : 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaDollarSign /></DetailIcon>
//                       <DetailLabel>Price:</DetailLabel> ${property.price ? property.price.toLocaleString() : 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaCalendarAlt /></DetailIcon>
//                       <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
//                     </DetailItem>
//                     <PropertyFeatures features={property.features} />
//                   </div>

//                   <ActionButtonsContainer>
//                     <ActionButton 
//                       onClick={(e) => { 
//                         e.stopPropagation(); 
//                         handleWhatsAppShare(property.title || 'No Title', window.location.href); 
//                       }}
//                       aria-label="Share on WhatsApp"
//                     >
//                       WhatsApp
//                     </ActionButton>
//                     <ActionButton 
//                       onClick={(e) => { 
//                         e.stopPropagation(); 
//                         handleEmailShare(property.title || 'No Title', window.location.href); 
//                       }}
//                       aria-label="Share via Email"
//                     >
//                       Email
//                     </ActionButton>
//                     <PrintButton 
//                       onClick={(e) => { 
//                         e.stopPropagation(); 
//                         handlePrint(); 
//                       }}
//                       aria-label="Print Property Details"
//                     >
//                       Print
//                     </PrintButton>
//                   </ActionButtonsContainer>
//                 </PropertyInfo>

//                 <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
//                   {getInquiryTypeLabel(property.inquiryType).label}
//                 </Badge>
//               </PropertyCard>
//             ))}
//           </PropertiesGrid>
//         )
//       )}
//     </PageContainer>
//   );
// };

// export default PropertyList;


// src/components/PropertyList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  FaBed,
  FaCar,
  FaTree,
  FaCalendarAlt,
  FaRoad,
  FaCity,
  FaHome,
  FaArrowsAlt,
  FaDollarSign,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaBarcode,
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import bgImage from '../images/bg.jpg';

// Import Images Corresponding to Each Property Subtype
import apartmentImg from '../images/apartment.jpg';
import factoryImg from '../images/factory.jpg';
import farmHouseImg from '../images/farmhouse.jpg';
import homeImg from '../images/home.jpg';
import officeImg from '../images/office.jpg';
import shopImg from '../images/shop.jpg';
import villasImg from '../images/villas.jpg';
import warehouseImg from '../images/warehouse.jpg';
import defaultImg from '../images/default.jpg'; // Fallback image

// --- Helper Functions --- //

// Parse numbers that may be wrapped in an object (e.g. { $numberInt: "2" })
const parseNumber = (val) => {
  if (val && typeof val === 'object' && val.$numberInt) {
    return parseInt(val.$numberInt, 10);
  }
  return val;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Returns a capitalized property subtype if it's a string or the first truthy key in an object.
const getPropertySubType = (subType) => {
  if (typeof subType === 'string') {
    return subType.charAt(0).toUpperCase() + subType.slice(1);
  }
  if (typeof subType === 'object' && subType !== null) {
    for (const key in subType) {
      if (subType[key]) {
        return key.charAt(0).toUpperCase() + key.slice(1);
      }
    }
  }
  return 'Unknown';
};

// Mapping Subtypes to Images
const propertySubTypeImages = {
  apartment: apartmentImg,
  factory: factoryImg,
  farmHouse: farmHouseImg,
  home: homeImg,
  office: officeImg,
  shop: shopImg,
  villas: villasImg,
  warehouse: warehouseImg,
};

// Returns the appropriate image based on propertySubType
const getImageForPropertySubType = (propertySubType) => {
  if (typeof propertySubType === 'object') {
    for (const key in propertySubType) {
      if (propertySubType[key]) {
        return propertySubTypeImages[key] || defaultImg;
      }
    }
  }
  return propertySubTypeImages[propertySubType] || defaultImg;
};

// Formats the budget object into a price range string
const formatBudget = (budget) => {
  if (budget && typeof budget === 'object') {
    const min = parseNumber(budget.min);
    const max = parseNumber(budget.max);
    return `PKR ${min} - PKR ${max}`;
  }
  return `PKR ${budget || 'N/A'}`;
};

// Use demand if available, otherwise use budget
const getPrice = (property) => {
  if (property.demand != null && property.demand !== "") {
    return `PKR ${parseNumber(property.demand)}`;
  } else {
    return formatBudget(property.budget);
  }
};

const getInquiryTypeLabel = (inquiryType) => {
  if (typeof inquiryType === 'object' && inquiryType !== null) {
    if (inquiryType.forSale) return { label: 'FOR SALE', color: '#E74C3C' };
    if (inquiryType.forRent) return { label: 'FOR RENT', color: '#2ECC71' };
    if (inquiryType.onRent) return { label: 'ON RENT', color: '#3498DB' };
    if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#9B59B6' };
  } else if (typeof inquiryType === 'string') {
    const type = inquiryType.toLowerCase();
    if (type.includes('sale')) return { label: 'FOR SALE', color: '#E74C3C' };
    if (type.includes('rent')) return { label: 'FOR RENT', color: '#2ECC71' };
    if (type.includes('purchase')) return { label: 'FOR PURCHASE', color: '#9B59B6' };
  }
  return { label: 'INQUIRY', color: '#95A5A6' };
};

// Build complete address from available fields
const getCompleteAddress = (property) => {
  const addressParts = [];
  if (property.streetName) addressParts.push(property.streetName);
  if (property.phaseBlock) addressParts.push(property.phaseBlock);
  if (property.district) addressParts.push(property.district);
  if (property.city) addressParts.push(property.city);
  return addressParts.join(', ');
};

const handleWhatsAppShare = (title, url) => {
  const text = `Check out this property: ${title}, ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
};

const handleEmailShare = (title, url) => {
  const subject = `Interesting Property Alert: ${title}`;
  const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(mailtoUrl, '_blank');
};

const handlePrint = () => {
  window.print();
};

// --- Styled Components --- //

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

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  color: #2c3e50;

  h1 {
    font-size: 2em;
    margin: 0;
    font-weight: 700;
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

const SubmitInquiryButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: 20px 0;
  background: #ffffff;
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  padding: 12px 15px;
  width: 250px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  width: 200px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1em;
  background-color: #ffffff;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 12px 25px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResetButton = styled.button`
  padding: 12px 25px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
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

const PrintButton = styled(ActionButton)`
  background-color: #2ecc71;

  &:hover {
    background-color: #27ae60;
  }
`;

const FacilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const FacilityBadge = styled.span`
  background-color: #ecf0f1;
  color: #2c3e50;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
`;

const PropertyFacilities = ({ facilities = [] }) => {
  return (
    <FacilitiesContainer>
      {facilities.map((facility, index) =>
        facility.value === "Y" ? (
          <FacilityBadge key={index}>{facility.name}</FacilityBadge>
        ) : null
      )}
    </FacilitiesContainer>
  );
};

// --- Status Update Elements --- //

const STATUS_OPTIONS = ['New', 'active', 'pending', 'sold'];

const STATUS_ICONS = {
  New: <FaCheckCircle color="blue" title="New" />,
  active: <FaCheckCircle color="green" title="Active" />,
  pending: <FaHourglassHalf color="orange" title="Pending" />,
  sold: <FaTimesCircle color="red" title="Sold" />,
};

const StatusContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const StatusIcon = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusDropdown = styled.select`
  position: absolute;
  top: 55px;
  left: 15px;
  font-size: 1em;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// --- Main Component --- //

const PropertyList = () => {
  // Retrieve URL parameters for filtering based on inquiry, type and subtype.
  const { inquiryType, propertyType, propertySubType } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  // Additional search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from the API using the same endpoint as before with URL params.
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setError('Authentication token not found. Please log in.');
          setLoading(false);
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        // Using the API endpoint from previous version:
        const response = await axios.get('api/properties/all', {
          params: { userId },
        });
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format received from API.');
        }
        // Sort properties by updatedAt (latest first)
        const sortedProperties = [...response.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setProperties(sortedProperties);
        setFilteredProperties(sortedProperties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Build unique cities and areas from properties for the search dropdowns.
  const uniqueCities = useMemo(() => {
    return Array.from(new Set(properties.map((prop) => prop.city))).sort();
  }, [properties]);

  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(properties.map((prop) => prop.district))).sort();
  }, [properties]);

  // Combine URL-based filtering (inquiryType, propertyType, propertySubType)
  // with search filters (searchTerm, selectedCity, selectedArea)
  const handleSearch = () => {
    let filtered = [...properties];

    // URL parameter filtering:
    if (inquiryType) {
      filtered = filtered.filter(property =>
        property.inquiryType &&
        property.inquiryType.toLowerCase() === inquiryType.toLowerCase()
      );
    }
    if (propertyType) {
      filtered = filtered.filter(property =>
        property.propertyType &&
        property.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }
    if (propertySubType) {
      filtered = filtered.filter(property => {
        if (typeof property.propertySubType === 'string') {
          return property.propertySubType.toLowerCase() === propertySubType.toLowerCase();
        } else if (typeof property.propertySubType === 'object' && property.propertySubType !== null) {
          return Boolean(property.propertySubType[propertySubType]);
        } else {
          return false;
        }
      });
    }

    // Additional search filters:
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((property) =>
        (property.title || property.streetName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCity !== '') {
      filtered = filtered.filter((property) => property.city === selectedCity);
    }
    if (selectedArea !== '') {
      filtered = filtered.filter((property) => property.district === selectedArea);
    }
    setFilteredProperties(filtered);
  };

  // Re-run search when any of the dependencies change.
  useEffect(() => {
    handleSearch();
  }, [properties, inquiryType, propertyType, propertySubType, searchTerm, selectedCity, selectedArea]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedArea('');
    setFilteredProperties(properties);
  };

  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const updatePropertyStatus = (propertyId, newStatus) => {
    setFilteredProperties((prevProperties) =>
      prevProperties.map((prop) =>
        prop._id === propertyId ? { ...prop, status: newStatus } : prop
      )
    );
    setProperties((prevProperties) =>
      prevProperties.map((prop) =>
        prop._id === propertyId ? { ...prop, status: newStatus } : prop
      )
    );
  };

  // --- Property Card Component (Same as in PropertyView) --- //

  const PropertyCardComponent = ({ property, handleCardClick, updatePropertyStatus }) => {
    const [status, setStatus] = useState(property.status || 'New');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const handleStatusClick = (e) => {
      e.stopPropagation();
      setShowStatusDropdown(!showStatusDropdown);
    };

    const handleStatusChange = async (e) => {
      const newStatus = e.target.value;
      const previousStatus = status;
      setStatus(newStatus);
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        await axios.patch(
          `api/properties/updateStatus/${property._id}`,
          { status: newStatus },
          { headers }
        );
        alert('Status updated successfully!');
        updatePropertyStatus(property._id, newStatus);
        setShowStatusDropdown(false);
      } catch (error) {
        setStatus(previousStatus);
        alert(
          `Failed to update status: ${
            error.response ? error.response.data.message : error.message
          }`
        );
        console.error('Failed to update status:', error);
      }
    };

    // Hide dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          showStatusDropdown &&
          !event.target.closest('.status-dropdown') &&
          !event.target.closest('.status-icon')
        ) {
          setShowStatusDropdown(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [showStatusDropdown]);

    // Determine bedroom count from property.floors if property.bedrooms is not available
    const bedroomCount =
      property.bedrooms ||
      (property.floors &&
        property.floors.length > 0 &&
        property.floors[0].features &&
        parseNumber(property.floors[0].features["Bedroom"])) ||
      'N/A';

    return (
      <PropertyCard onClick={() => handleCardClick(property._id)}>
        <StatusContainer>
          <StatusIcon className="status-icon" onClick={handleStatusClick}>
            {STATUS_ICONS[status] || STATUS_ICONS['New']}
          </StatusIcon>
          {showStatusDropdown && (
            <StatusDropdown
              className="status-dropdown"
              value={status}
              onChange={handleStatusChange}
              onClick={(e) => e.stopPropagation()}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </StatusDropdown>
          )}
        </StatusContainer>

        <PropertyImage
          src={
            property.frontPictures && property.frontPictures.length > 0
              ? `${property.frontPictures[0]}`
              : property.propertyPictures && property.propertyPictures.length > 0
              ? `${property.propertyPictures[0]}`
              : getImageForPropertySubType(property.propertySubType)
          }
          alt={property.title || property.streetName || 'Property Image'}
        />

        <PropertyInfo>
          <div>
            <PropertyTitle>
              {`${getPropertySubType(property.propertySubType)} - ${getInquiryTypeLabel(property.inquiryType).label}`}
            </PropertyTitle>
            <PropertySubtitle>
              {getCompleteAddress(property)}
            </PropertySubtitle>
            <DetailItem>
              <DetailIcon>
                <FaBarcode />
              </DetailIcon>
              <DetailLabel>Property Code:</DetailLabel> {property.propertyCode || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaHome />
              </DetailIcon>
              <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaCity />
              </DetailIcon>
              <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaArrowsAlt />
              </DetailIcon>
              <DetailLabel>District:</DetailLabel> {property.district || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaArrowsAlt />
              </DetailIcon>
              <DetailLabel>Phase Block:</DetailLabel> {property.phaseBlock || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaBed />
              </DetailIcon>
              <DetailLabel>Bedrooms:</DetailLabel> {bedroomCount}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaDollarSign />
              </DetailIcon>
              <DetailLabel>Price:</DetailLabel> {getPrice(property)}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaCalendarAlt />
              </DetailIcon>
              <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
            </DetailItem>
            <PropertyFacilities facilities={property.facilities} />
          </div>

          <ActionButtonsContainer>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                handleWhatsAppShare(property.title || property.streetName || 'No Title', window.location.href);
              }}
            >
              WhatsApp
            </ActionButton>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                handleEmailShare(property.title || property.streetName || 'No Title', window.location.href);
              }}
            >
              Email
            </ActionButton>
            <PrintButton
              onClick={(e) => {
                e.stopPropagation();
                handlePrint();
              }}
            >
              Print
            </PrintButton>
          </ActionButtonsContainer>
        </PropertyInfo>

        <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
          {getInquiryTypeLabel(property.inquiryType).label}
        </Badge>
      </PropertyCard>
    );
  };

  return (
    <PageContainer>
      <Header>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <h1>Property Bank</h1>
      </Header>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
          <SubmitInquiryButton>Submit An Inquiry</SubmitInquiryButton>
        </Link>
      </div>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search Properties by Title"
        />
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          aria-label="Filter by City"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        <Select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          aria-label="Filter by District"
        >
          <option value="">All Districts</option>
          {uniqueAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Select>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </SearchContainer>

      {loading && (
        <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
          Loading properties...
        </p>
      )}
      {error && (
        <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '1.2em' }}>
          {error}
        </p>
      )}
      {!loading && !error && (
        <PropertiesGrid>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCardComponent
                key={property._id}
                property={property}
                handleCardClick={handleCardClick}
                updatePropertyStatus={updatePropertyStatus}
              />
            ))
          ) : (
            <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
              No properties match your search criteria.
            </p>
          )}
        </PropertiesGrid>
      )}
    </PageContainer>
  );
};

export default PropertyList;
