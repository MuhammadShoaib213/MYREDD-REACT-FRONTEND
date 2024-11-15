// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import { FaBed, FaBath, FaRulerCombined, FaCar, FaTree,FaCalendarAlt , FaRoad,FaCity, FaHome, FaArrowsAlt, FaDollarSign } from 'react-icons/fa';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import {jwtDecode} from 'jwt-decode';
// // // import bgImage from '../images/bg.jpg';


// // // const formatDate = (dateString) => {
// // //   const date = new Date(dateString);
// // //   return date.toLocaleDateString("en-US", {
// // //     year: 'numeric',
// // //     month: 'long',
// // //     day: 'numeric',
// // //     // weekday: 'long'
// // //   });
// // // };



// // // const PageContainer = styled.div`
// // //   background-image: url(${bgImage});
// // //   background-size: cover;
// // //   background-position: center;
// // //   background-blend-mode: overlay;
// // //   background-color: rgba(0, 0, 0, 0.5);
// // //   min-height: 100vh;
// // //   padding: 20px;
// // //   padding-top: 80px;
// // // `;

// // // const PropertiesGrid = styled.div`
// // //     display: flex;
// // //     flex-wrap: wrap;
// // //     gap: 20px;
// // //     justify-content: center;
// // //     margin-top: 50px; 
// // // `;
// // // const Header = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   position: relative;
// // //   width: 100%;
// // //   padding: 20px;
// // //   color: white;
// // //   @media (max-width: 768px) {
// // //     flex-direction: column;
// // //     padding: 10px;
// // //   }
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
// // //   margin: 10px; // Adds spacing around the card
// // //   // background: lightgrey;

// // //   &:hover {
// // //     transform: translateY(-5px);
// // //   }

// // //   @media (min-width: 768px) {
// // //     flex-direction: row; // Use row layout for larger screens
// // //   }
// // // `;

// // // const PropertyImage = styled.img`
// // //   width: 100%;
// // //   height: 200px;
// // //   object-fit: cover;
// // //   border-top-left-radius: 8px; // Round corners for the image
// // //   border-top-right-radius: 8px;
// // //     // padding: 5px; // Increased padding for content

// // //   @media (min-width: 768px) {
// // //     width: 340px;
// // //     height: 100%;
// // //     border-top-right-radius: 0; // Adjust rounding for larger screens
// // //     border-bottom-left-radius: 8px;
// // //   }
// // // `;

// // // const PropertyInfo = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   justify-content: space-between;
// // //   padding: 5px; // Increased padding for content
// // //   background: #fff;
// // //   flex-grow: 1;

// // //   @media (min-width: 768px) {
// // //     border-left: 1px solid #ccc; // Separator appears only on larger screens
// // //   }
// // // `;

// // // // const DetailsButton = styled.button`
// // // //   background-color: red;
// // // //   color: white;
// // // //   border: none;
// // // //   padding: 8px 16px;
// // // //   border-radius: 5px;
// // // //   cursor: pointer;

// // // //   &:hover {
// // // //     background-color: darkred;
// // // //   }
// // // // `;

// // // const DetailsButton = styled(Link)`
// // //   background-color: red;
// // //   color: white;
// // //   display: inline-block;
// // //   padding: 8px 16px;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   text-align: center;
// // //   text-decoration: none; // Remove underline from links

// // //   &:hover {
// // //     background-color: darkred;
// // //   }
// // // `;


// // // // const PageContainer = styled.div`
// // // //   background-image: url(${bgImage});
// // // //   background-size: cover;
// // // //   background-position: center;
// // // //   background-blend-mode: overlay;
// // // //   background-color: rgba(0, 0, 0, 0.5);
// // // //   min-height: 100vh;
// // // //   padding: 20px;
// // // // `;
// // // // // const PropertiesGrid = styled.div`
// // // // //   display: flex;
// // // // //   flex-wrap: wrap;
// // // // //   justify-content: center;
// // // // //   gap: 20px;
// // // // //   padding: 20px;
// // // // // `;

// // // // // const PropertyCard = styled.div`
// // // // //   width: 600px;
// // // // //   height: 350px;  // Increased height for better spacing
// // // // //   border: 1px solid #ccc;
// // // // //   border-radius: 8px;
// // // // //   overflow: hidden;
// // // // //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// // // // //   display: flex;
// // // // //   flex-direction: row;  // Change direction to row
// // // // //   position: relative; 
// // // // //   transition: transform 0.3s ease-in-out;

// // // // //   &:hover {
// // // // //     transform: translateY(-5px);
// // // // //   }
// // // // // `;

// // // // const PropertiesGrid = styled.div`
// // // //   display: grid;
// // // //   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); // Adjusting grid for responsiveness
// // // //   gap: 20px;
// // // //   padding: 20px;
// // // // `;

// // // // const PropertyCard = styled.div`
// // // //   width: 100%; // Takes full width of the grid column
// // // //   max-width: 600px; // Maintains max width on larger screens
// // // //   height: auto; // Height auto for responsive adjustments
// // // //   border: 1px solid #ccc;
// // // //   border-radius: 8px;
// // // //   overflow: hidden;
// // // //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// // // //   display: flex;
// // // //   flex-direction: column; // Better for mobile
// // // //   position: relative;
// // // //   transition: transform 0.3s ease-in-out;

// // // //   &:hover {
// // // //     transform: translateY(-5px);
// // // //   }

// // // //   @media (min-width: 768px) {
// // // //     flex-direction: row; // Use row layout for larger screens
// // // //   }
// // // // `;


// // // // const PropertyInfo = styled.div`
// // // //   display: flex;
// // // //   flex-direction: column;
// // // //   justify-content: space-between;  // Distribute space
// // // //   padding: 10px;
// // // //   background: #fff;
// // // //   flex-grow: 1;
// // // //   border-left: 1px solid #ccc;  // Separator between image and text
// // // // `;

// // // const PropertyTitle = styled.h3`
// // //   font-size: 1.2em;
// // //   color: #333;
// // //   margin: 0;  // Remove margin for tighter spacing
// // // `;

// // // // const PropertyImage = styled.img`
// // // //   width: 340px;  // Fixed width for the image
// // // //   height: 100%;  // Full height of the card
// // // //   object-fit: cover;  // Cover the designated area fully
// // // // `;

// // // // const PropertyImage = styled.img`
// // // //   width: 100%; // Full width on smaller screens
// // // //   height: 200px; // Adjust height to be fixed on smaller screens
// // // //   object-fit: cover;

// // // //   @media (min-width: 768px) {
// // // //     width: 340px; // Fixed width for larger screens
// // // //     height: 100%; // Full height of the card
// // // //   }
// // // // `;

// // // // const PropertyInfo = styled.div`
// // // //   display: flex;
// // // //   flex-direction: column;
// // // //   justify-content: space-between;
// // // //   padding: 10px;
// // // //   background: #fff;
// // // //   flex-grow: 1;

// // // //   @media (min-width: 768px) {
// // // //     border-left: 1px solid #ccc; // Separator appears only on larger screens
// // // //   }
// // // // `;


// // // // const Badge = styled.span`
// // // //   position: absolute;
// // // //   top: 10px;  // Position at the top of the card
// // // //   right: 10px;  // Position at the right of the card
// // // //   background-color: #007BFF;  // Blue background for consistency
// // // //   color: white;
// // // //   padding: 5px 10px;
// // // //   border-radius: 15px;
// // // //   font-weight: bold;
// // // // `;

// // // const Badge = styled.span`
// // //   position: absolute;
// // //   top: 10px;
// // //   right: 10px;
// // //   background-color: ${(props) => props.color || '#007BFF'};  // Use prop color or default to blue
// // //   color: white;
// // //   padding: 5px 10px;
// // //   border-radius: 15px;
// // //   font-weight: bold;
// // // `;

// // // // const DetailsButton = styled.button`
// // // //   background-color: red;  // Blue background
// // // //   color: white;
// // // //   border: none;
// // // //   padding: 8px 16px;
// // // //   border-radius: 5px;
// // // //   cursor: pointer;
// // // //   &:hover {
// // // //     background-color: darkred;  // Darker on hover
// // // //   }
// // // // `;

// // // const ActionButtonsContainer = styled.div`
// // //   display: flex;
// // //   justify-content: space-around;
// // //   margin-top: 10px; // Adjusted for better spacing
// // // `;

// // // const ActionButton = styled.button`
// // //   background-color: red;  // A shade of green
// // //   color: white;
// // //   border: none;
// // //   padding: 8px 16px;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   font-size: 0.9em;
// // //   margin-right: 8px;  // Adds spacing to the right of each button

// // //   &:hover {
// // //     background-color: darkred;  // Darker green on hover
// // //   }

// // //   &:last-child {
// // //     margin-right: 0;  // Removes margin from the last button to avoid extra space at the end
// // //   }
// // // `;


// // // const PrintButton = styled(ActionButton)`
// // //   background-color: red;  // Red for the print button

// // //   &:hover {
// // //     background-color: darkred;  // Darker red on hover
// // //   }
// // // `;

// // // const SubmitInquiryButton = styled.button`
// // //   background-color: red; // Use the theme's blue color
// // //   color: white;
// // //   border: none;
// // //   padding: 10px 20px;
// // //   border-radius: 5px;
// // //   font-size: 1em;
// // //   cursor: pointer;
// // //   margin-bottom: 20px; // Space from the button to the grid

// // //   &:hover {
// // //     background-color: #8B0000; // Darker shade on hover
// // //   }
// // // `;


// // // const FeaturesIcons = styled.div`
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 10px;
// // //   margin-top: 5px;
// // // `;

// // // const DetailItem = styled.p`
// // //   margin: 5px 0; // Adjust spacing as needed
// // //   font-size: 1em; // Adjust font size as needed
// // // `;

// // // const DetailLabel = styled.span`
// // //   font-weight: bold; // Makes the text bold
// // // `;

// // // const DetailIcon = styled.span`
// // //   margin-right: 8px; // Space between icon and text
// // //   display: inline-flex; // Aligns icon with the text vertically
// // //   align-items: center;
// // // `;

// // // const BackButton = styled.button`
// // //   position: absolute;
// // //   left: 20px;
// // //   top: 50px;
// // //   background-color: #333; // Subtle dark background
// // //   border: 2px solid #ff0000; // Border to match red theme
// // //   color: white;
// // //   font-size: 16px;
// // //   cursor: pointer;
// // //   padding: 15px 20px; // Adjusted padding for better appearance
// // //   border-radius: 10px; // More rounded corners
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for depth
// // //   width: 200px; // Match the width of other buttons
// // //   height: 60px; // Match the height of other buttons
// // //   transition: background-color 0.3s, transform 0.3s; // Smooth transition effects

// // //   &:hover {
// // //     background-color: #ff0000; // Match hover effect with the red theme
// // //     transform: translateY(-2px); // Slight lift on hover
// // //   }

// // //   @media (max-width: 768px) {
// // //     font-size: 14px;
// // //     width: 100%;
// // //     height: auto;
// // //     left: 10px;
// // //   }
// // // `;


// // // const FeatureIcon = ({ feature, IconComponent }) => (
// // //   feature ? <IconComponent size="20" /> : null
// // // );
// // // const PropertyFeatures = ({ features }) => (
// // //   <FeaturesIcons>
// // //     <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
// // //     <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
// // //     <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
// // //   </FeaturesIcons>
// // // );


// // // const handleWhatsAppShare = (title, url) => {
// // //   const text = `Check out this property: ${title}, ${url}`;
// // //   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //   window.open(whatsappUrl, '_blank');
// // // };

// // // const handleEmailShare = (title, url) => {
// // //   const subject = `Interesting Property Alert: ${title}`;
// // //   const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
// // //   const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
// // //   window.open(mailtoUrl, 'https://mail.google.com/'); // Ensure it opens in a new tab or window
// // // };


// // // const handlePrint = () => {
// // //   window.print();
// // // };


// // // const getPropertySubType = (subTypes) => {
// // //   for (const key in subTypes) {
// // //     if (subTypes[key]) {
// // //       return key.charAt(0).toUpperCase() + key.slice(1);  // Capitalize the first letter for display
// // //     }
// // //   }
// // //   return 'Unknown';  // Default case if no subtype is true
// // // };



// // // const getInquiryTypeLabel = (inquiryType) => {
// // //   if (inquiryType.forSale) return { label: 'FOR SALE', color: 'red' };
// // //   if (inquiryType.forRent) return { label: 'FOR RENT', color: 'green' };
// // //   if (inquiryType.onRent) return { label: 'ON RENT', color: 'blue' };
// // //   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: 'dodgerblue' };
// // //   return { label: 'INQUIRY', color: 'grey' }; // Default case
// // // };


// // // const PropertyView = () => {
// // //   const [properties, setProperties] = useState([]);
// // //   const navigate = useNavigate(); 

// // //   useEffect(() => {
// // //     const fetchProperties = async () => {
// // //       try {

// // //         const token = localStorage.getItem('token');
// // //         const decoded = jwtDecode(token);  // Decode the JWT
// // //         const userId = decoded.userId;      // Extract the user ID from the token

// // //         const response = await axios.get(`http://localhost:5000/api/properties/all?userId=${userId}`);
// // //         // const response = await axios.get('http://localhost:5000/api/properties/all');
// // //         setProperties(response.data);
// // //         console.log(response.data);
// // //       } catch (error) {
// // //         console.error('Error fetching properties:', error);
// // //       }
// // //     };

// // //     fetchProperties();
// // //   }, []);

// // //   return (

// // //     <PageContainer>

// // // <Header>
// // //       <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
// // //           <h1>Property Bank</h1>
// // //           {/* <Logo>Logo</Logo> */}
// // //         </Header>

// // //          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// // //        <Link to="/CheckCustomer"> 
// // //     <SubmitInquiryButton onClick={() => console.log('Navigate to inquiry form')}>
// // //       Submit An Inquiry
// // //     </SubmitInquiryButton>
// // //     </Link>
// // //   </div>
// // //     <PropertiesGrid>
// // //       {properties.map(property => (
// // //         <PropertyCard key={property._id}>
// // //           {/* <PropertyImage src={property.images[0] ? `http://localhost:5000/uploads/${property.images[0]}` : 'http://localhost:5000/uploads/bg.jpg'} alt={property.title} /> */}
// // //           <PropertyImage 
// // //   src={property.images[0] ? `http://localhost:5000/${property.images[0]}` : 'http://localhost:5000/uploads/bg.jpg'} 
// // //   alt={property.title}
// // // />

// // //           <PropertyInfo>
// // //           <div>
// // //     <br />
// // //     <PropertyTitle>{property.title}</PropertyTitle>
// // //     <br/>
// // //     <DetailItem>
// // //       <DetailIcon><FaHome /></DetailIcon>
// // //       <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
// // //     </DetailItem>
// // //     <DetailItem>
// // //       <DetailIcon><FaCity /></DetailIcon>
// // //       <DetailLabel>City:</DetailLabel> {property.city}
// // //     </DetailItem>
// // //     <DetailItem>
// // //       <DetailIcon><FaArrowsAlt /></DetailIcon>
// // //       <DetailLabel>Area:</DetailLabel> {property.area}
// // //     </DetailItem>
// // //     <DetailItem>
// // //       <DetailIcon><FaBed /></DetailIcon>
// // //       <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms}
// // //     </DetailItem>
// // //     <DetailItem>
// // //       <DetailIcon><FaDollarSign /></DetailIcon>
// // //       <DetailLabel>Price:</DetailLabel> ${property.budget}
// // //     </DetailItem>
// // //     <DetailItem>
// // //       <DetailIcon><FaCalendarAlt /></DetailIcon>
// // //       <DetailLabel>Date Added :</DetailLabel> {formatDate(property.updatedAt)}
// // //     </DetailItem>
// // //     <PropertyFeatures features={property.features} />
// // //     <br/>
// // //   </div>

// // //   <DetailsButton as={Link} to={`/property/${property._id}`}>Details</DetailsButton>
// // //             <ActionButtonsContainer>
// // //               <ActionButton onClick={() => handleWhatsAppShare(property.title, window.location.href)}>Share on WhatsApp</ActionButton>
// // //               <ActionButton onClick={() => handleEmailShare(property.title, window.location.href)}>Share via Email</ActionButton>
// // //               <PrintButton onClick={handlePrint}>Print</PrintButton>
// // //             </ActionButtonsContainer>
// // //           </PropertyInfo>
// // //           {/* <Badge>{getInquiryTypeLabel(property.inquiryType).label}</Badge> */}
// // //           <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
// // //   {getInquiryTypeLabel(property.inquiryType).label}
// // // </Badge>
// // //           <br/>
// // //         </PropertyCard>
// // //       ))}
// // //     </PropertiesGrid>
// // //     </PageContainer>
// // //   );
  
  

  
// // //   };

// // // export default PropertyView;


// // // PropertyView.js

// // // PropertyView.js

// // import React, { useState, useEffect, useMemo } from 'react';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import { 
// //   FaBed, FaBath, FaRulerCombined, FaCar, FaTree,
// //   FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign 
// // } from 'react-icons/fa';
// // import { Link, useNavigate } from 'react-router-dom';
// // import {jwtDecode} from 'jwt-decode'; // Correct import
// // import bgImage from '../images/bg.jpg';

// // // Helper Functions

// // const formatDate = (dateString) => {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString("en-US", {
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric',
// //     // weekday: 'long'
// //   });
// // };

// // const getPropertySubType = (subTypes) => {
// //   for (const key in subTypes) {
// //     if (subTypes[key]) {
// //       return key.charAt(0).toUpperCase() + key.slice(1);  // Capitalize the first letter for display
// //     }
// //   }
// //   return 'Unknown';  // Default case if no subtype is true
// // };

// // const getInquiryTypeLabel = (inquiryType) => {
// //   if (inquiryType.forSale) return { label: 'FOR SALE', color: 'red' };
// //   if (inquiryType.forRent) return { label: 'FOR RENT', color: 'green' };
// //   if (inquiryType.onRent) return { label: 'ON RENT', color: 'blue' };
// //   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: 'dodgerblue' };
// //   return { label: 'INQUIRY', color: 'grey' }; // Default case
// // };

// // const handleWhatsAppShare = (title, url) => {
// //   const text = `Check out this property: ${title}, ${url}`;
// //   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
// //   window.open(whatsappUrl, '_blank');
// // };

// // const handleEmailShare = (title, url) => {
// //   const subject = `Interesting Property Alert: ${title}`;
// //   const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
// //   const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
// //   window.open(mailtoUrl, '_blank'); // Open in a new tab or window
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
// //   background-color: rgba(0, 0, 0, 0.5);
// //   min-height: 100vh;
// //   padding: 20px;
// //   padding-top: 80px;
// // `;

// // const Header = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   position: relative;
// //   width: 100%;
// //   padding: 20px;
// //   color: white;
// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     padding: 10px;
// //   }
// // `;

// // const DetailsButton = styled(Link)`
// //   background-color: red;
// //   color: white;
// //   display: inline-block;
// //   padding: 8px 16px;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   text-align: center;
// //   text-decoration: none; // Remove underline from links

// //   &:hover {
// //     background-color: darkred;
// //   }
// // `;


// // const BackButton = styled.button`
// //   position: absolute;
// //   left: 20px;
// //   top: 50px;
// //   background-color: #333; // Subtle dark background
// //   border: 2px solid #ff0000; // Border to match red theme
// //   color: white;
// //   font-size: 16px;
// //   cursor: pointer;
// //   padding: 15px 20px; // Adjusted padding for better appearance
// //   border-radius: 10px; // More rounded corners
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for depth
// //   width: 200px; // Match the width of other buttons
// //   height: 60px; // Match the height of other buttons
// //   transition: background-color 0.3s, transform 0.3s; // Smooth transition effects

// //   &:hover {
// //     background-color: #ff0000; // Match hover effect with the red theme
// //     transform: translateY(-2px); // Slight lift on hover
// //   }

// //   @media (max-width: 768px) {
// //     font-size: 14px;
// //     width: 100%;
// //     height: auto;
// //     left: 10px;
// //   }
// // `;

// // const SubmitInquiryButton = styled.button`
// //   background-color: red; // Use the theme's red color
// //   color: white;
// //   border: none;
// //   padding: 10px 20px;
// //   border-radius: 5px;
// //   font-size: 1em;
// //   cursor: pointer;
// //   margin-bottom: 20px; // Space from the button to the grid

// //   &:hover {
// //     background-color: #8B0000; // Darker shade on hover
// //   }
// // `;

// // const SearchContainer = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 15px;
// //   justify-content: center;
// //   margin: 20px 0;
// //   background: rgba(255, 255, 255, 0.8);
// //   padding: 15px;
// //   border-radius: 10px;
  
// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     align-items: center;
// //   }
// // `;

// // const SearchInput = styled.input`
// //   padding: 10px;
// //   width: 200px;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// // `;

// // const Select = styled.select`
// //   padding: 10px;
// //   width: 200px;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// // `;

// // const SearchButton = styled.button`
// //   padding: 10px 20px;
// //   background-color: red;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
  
// //   &:hover {
// //     background-color: darkred;
// //   }
// // `;

// // const ResetButton = styled.button`
// //   padding: 10px 20px;
// //   background-color: #ccc;
// //   color: #333;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
  
// //   &:hover {
// //     background-color: #bbb;
// //   }
// // `;

// // const PropertiesGrid = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 20px;
// //   justify-content: center;
// //   margin-top: 50px; 
// // `;

// // const PropertyCard = styled.div`
// //   width: 100%;
// //   max-width: 600px;
// //   border: 1px solid #ccc;
// //   border-radius: 8px;
// //   overflow: hidden;
// //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// //   display: flex;
// //   flex-direction: column;
// //   position: relative;
// //   transition: transform 0.3s ease-in-out;
// //   margin: 10px; // Adds spacing around the card

// //   &:hover {
// //     transform: translateY(-5px);
// //   }

// //   @media (min-width: 768px) {
// //     flex-direction: row; // Use row layout for larger screens
// //   }
// // `;

// // const PropertyImage = styled.img`
// //   width: 100%;
// //   height: 200px;
// //   object-fit: cover;
// //   border-top-left-radius: 8px; // Round corners for the image
// //   border-top-right-radius: 8px;

// //   @media (min-width: 768px) {
// //     width: 340px;
// //     height: 100%;
// //     border-top-right-radius: 0; // Adjust rounding for larger screens
// //     border-bottom-left-radius: 8px;
// //   }
// // `;

// // const PropertyInfo = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: space-between;
// //   padding: 15px; // Increased padding for content
// //   background: #fff;
// //   flex-grow: 1;

// //   @media (min-width: 768px) {
// //     border-left: 1px solid #ccc; // Separator appears only on larger screens
// //   }
// // `;

// // const PropertyTitle = styled.h3`
// //   font-size: 1.5em;
// //   color: #333;
// //   margin: 0;  // Remove margin for tighter spacing
// // `;

// // const DetailItem = styled.p`
// //   margin: 5px 0; // Adjust spacing as needed
// //   font-size: 1em; // Adjust font size as needed
// //   display: flex;
// //   align-items: center;
// // `;

// // const DetailLabel = styled.span`
// //   font-weight: bold; // Makes the text bold
// //   margin-right: 8px; // Space between label and value
// // `;

// // const DetailIcon = styled.span`
// //   margin-right: 8px; // Space between icon and text
// //   display: inline-flex; // Aligns icon with the text vertically
// //   align-items: center;
// // `;

// // const Badge = styled.span`
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   background-color: ${(props) => props.color || '#007BFF'};  // Use prop color or default to blue
// //   color: white;
// //   padding: 5px 10px;
// //   border-radius: 15px;
// //   font-weight: bold;
// // `;

// // const ActionButtonsContainer = styled.div`
// //   display: flex;
// //   justify-content: space-around;
// //   margin-top: 10px; // Adjusted for better spacing
// // `;

// // const ActionButton = styled.button`
// //   background-color: red;  // Red color
// //   color: white;
// //   border: none;
// //   padding: 8px 16px;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   font-size: 0.9em;
// //   margin-right: 8px;  // Adds spacing to the right of each button

// //   &:hover {
// //     background-color: darkred;  // Darker red on hover
// //   }

// //   &:last-child {
// //     margin-right: 0;  // Removes margin from the last button to avoid extra space at the end
// //   }
// // `;

// // const PrintButton = styled(ActionButton)`
// //   background-color: red;  // Red for the print button

// //   &:hover {
// //     background-color: darkred;  // Darker red on hover
// //   }
// // `;

// // // Features Icons

// // const FeaturesIcons = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   margin-top: 5px;
// // `;

// // const FeatureIcon = ({ feature, IconComponent, title }) => (
// //   feature ? <span title={title}><IconComponent size="20" /></span> : null
// // );

// // const PropertyFeatures = ({ features }) => (
// //   <FeaturesIcons>
// //     <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
// //     <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
// //     <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
// //   </FeaturesIcons>
// // );

// // // Main Component

// // const PropertyView = () => {
// //   const [properties, setProperties] = useState([]);
// //   const [filteredProperties, setFilteredProperties] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedCity, setSelectedCity] = useState('');
// //   const [selectedArea, setSelectedArea] = useState('');
// //   const navigate = useNavigate(); 

// //   useEffect(() => {
// //     const fetchProperties = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           console.error('No token found');
// //           return;
// //         }

// //         const decoded = jwtDecode(token);  // Decode the JWT
// //         const userId = decoded.userId;      // Extract the user ID from the token

// //         const response = await axios.get(`http://localhost:5000/api/properties/all?userId=${userId}`);
        
// //         // Sort the properties by updatedAt in descending order
// //         const sortedProperties = [...response.data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        
// //         setProperties(sortedProperties);
// //         setFilteredProperties(sortedProperties); // Initialize filteredProperties
// //         console.log(sortedProperties);
// //       } catch (error) {
// //         console.error('Error fetching properties:', error);
// //       }
// //     };

// //     fetchProperties();
// //   }, []);

// //   // Extract unique cities and areas
// //   const uniqueCities = useMemo(() => {
// //     return Array.from(new Set(properties.map(prop => prop.city))).sort();
// //   }, [properties]);

// //   const uniqueAreas = useMemo(() => {
// //     return Array.from(new Set(properties.map(prop => prop.area))).sort();
// //   }, [properties]);

// //   // Handle Search and Filters
// //   const handleSearch = () => {
// //     let filtered = [...properties];
    
// //     // Filter by search term
// //     if (searchTerm.trim() !== '') {
// //       filtered = filtered.filter(property =>
// //         (property.title || '').toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
    
// //     // Filter by selected city
// //     if (selectedCity !== '') {
// //       filtered = filtered.filter(property => property.city === selectedCity);
// //     }
    
// //     // Filter by selected area
// //     if (selectedArea !== '') {
// //       filtered = filtered.filter(property => property.area === selectedArea);
// //     }
    
// //     setFilteredProperties(filtered);
// //   };

// //   // Handle Reset Filters
// //   const handleReset = () => {
// //     setSearchTerm('');
// //     setSelectedCity('');
// //     setSelectedArea('');
// //     setFilteredProperties(properties);
// //   };

// //   // Effect to handle filtering when search or filters change
// //   useEffect(() => {
// //     handleSearch();
// //   }, [searchTerm, selectedCity, selectedArea, properties]);

// //   return (
// //     <PageContainer>
// //       <Header>
// //         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
// //         <h1>Property Bank</h1>
// //         {/* <Logo>Logo</Logo> */}
// //       </Header>

// //       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// //         <Link to="/CheckCustomer"> 
// //           <SubmitInquiryButton>
// //             Submit An Inquiry
// //           </SubmitInquiryButton>
// //         </Link>
// //       </div>
      
// //       {/* Search and Filter Controls */}
// //       <SearchContainer>
// //         <SearchInput
// //           type="text"
// //           placeholder="Search by title..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
        
// //         <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
// //           <option value="">All Cities</option>
// //           {uniqueCities.map(city => (
// //             <option key={city} value={city}>{city}</option>
// //           ))}
// //         </Select>
        
// //         <Select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
// //           <option value="">All Areas</option>
// //           {uniqueAreas.map(area => (
// //             <option key={area} value={area}>{area}</option>
// //           ))}
// //         </Select>
        
// //         <SearchButton onClick={handleSearch}>Search</SearchButton>
// //         <ResetButton onClick={handleReset}>Reset</ResetButton>
// //       </SearchContainer>
      
// //       <PropertiesGrid>
// //         {filteredProperties.length > 0 ? (
// //           filteredProperties.map(property => (
// //             <PropertyCard key={property._id}>
// //               <PropertyImage 
// //                 src={property.images[0] 
// //                   ? `http://localhost:5000/${property.images[0]}` 
// //                   : 'http://localhost:5000/uploads/bg.jpg'} 
// //                 alt={property.title || 'Property Image'}
// //               />

// //               <PropertyInfo>
// //                 <div>
// //                   <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
// //                   <DetailItem>
// //                     <DetailIcon><FaHome /></DetailIcon>
// //                     <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
// //                   </DetailItem>
// //                   <DetailItem>
// //                     <DetailIcon><FaCity /></DetailIcon>
// //                     <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
// //                   </DetailItem>
// //                   <DetailItem>
// //                     <DetailIcon><FaArrowsAlt /></DetailIcon>
// //                     <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
// //                   </DetailItem>
// //                   <DetailItem>
// //                     <DetailIcon><FaBed /></DetailIcon>
// //                     <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms || 'N/A'}
// //                   </DetailItem>
// //                   <DetailItem>
// //                     <DetailIcon><FaDollarSign /></DetailIcon>
// //                     <DetailLabel>Price:</DetailLabel> ${property.budget || 'N/A'}
// //                   </DetailItem>
// //                   <DetailItem>
// //                     <DetailIcon><FaCalendarAlt /></DetailIcon>
// //                     <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
// //                   </DetailItem>
// //                   <PropertyFeatures features={property.features} />
// //                 </div>

// //                 <DetailsButton as={Link} to={`/property/${property._id}`}>Details</DetailsButton>
// //                 <ActionButtonsContainer>
// //                   <ActionButton onClick={() => handleWhatsAppShare(property.title || 'No Title', window.location.href)}>Share on WhatsApp</ActionButton>
// //                   <ActionButton onClick={() => handleEmailShare(property.title || 'No Title', window.location.href)}>Share via Email</ActionButton>
// //                   <PrintButton onClick={handlePrint}>Print</PrintButton>
// //                 </ActionButtonsContainer>
// //               </PropertyInfo>

// //               <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
// //                 {getInquiryTypeLabel(property.inquiryType).label}
// //               </Badge>
// //             </PropertyCard>
// //           ))
// //         ) : (
// //           <p style={{ color: 'white', textAlign: 'center' }}>No properties match your search criteria.</p>
// //         )}
// //       </PropertiesGrid>
// //     </PageContainer>
// //   );
// // };

// // export default PropertyView;


// // PropertyView.js


// import React, { useState, useEffect, useMemo } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { 
//   FaBed, FaCar, FaTree,
//   FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign 
// } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import bgImage from '../images/bg.jpg';

// // Helper Functions

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

// const getPropertySubType = (subTypes) => {
//   for (const key in subTypes) {
//     if (subTypes[key]) {
//       return key.charAt(0).toUpperCase() + key.slice(1);
//     }
//   }
//   return 'Unknown';
// };

// const getInquiryTypeLabel = (inquiryType) => {
//   if (inquiryType.forSale) return { label: 'FOR SALE', color: '#E74C3C' };
//   if (inquiryType.forRent) return { label: 'FOR RENT', color: '#2ECC71' };
//   if (inquiryType.onRent) return { label: 'ON RENT', color: '#3498DB' };
//   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#9B59B6' };
//   return { label: 'INQUIRY', color: '#95A5A6' };
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

// // Styled Components

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

// const Header = styled.div`
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

// const SubmitInquiryButton = styled.button`
//   background-color: #3498DB;
//   color: white;
//   border: none;
//   padding: 12px 25px;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #2980B9;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 15px;
//   justify-content: center;
//   margin: 20px 0;
//   background: #FFFFFF;
//   padding: 20px 25px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 12px 15px;
//   width: 250px;
//   border: 1px solid #BDC3C7;
//   border-radius: 5px;
//   font-size: 1em;
//   transition: border-color 0.3s;

//   &:focus {
//     border-color: #3498DB;
//     outline: none;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Select = styled.select`
//   padding: 12px 15px;
//   width: 200px;
//   border: 1px solid #BDC3C7;
//   border-radius: 5px;
//   font-size: 1em;
//   background-color: #FFFFFF;
//   transition: border-color 0.3s;

//   &:focus {
//     border-color: #3498DB;
//     outline: none;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchButton = styled.button`
//   padding: 12px 25px;
//   background-color: #2ECC71;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #27AE60;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const ResetButton = styled.button`
//   padding: 12px 25px;
//   background-color: #E74C3C;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #C0392B;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const PropertiesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 30px;
//   padding: 20px;
  
//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
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
//   background-color: #3498DB;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 0.9em;
//   transition: background-color 0.3s, transform 0.3s;

//   &:hover {
//     background-color: #2980B9;
//     transform: translateY(-2px);
//   }
// `;

// const PrintButton = styled(ActionButton)`
//   background-color: #2ECC71;

//   &:hover {
//     background-color: #27AE60;
//   }
// `;

// // Features Icons

// const FeaturesIcons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-top: 10px;
// `;

// const FeatureIcon = ({ feature, IconComponent, title }) => (
//   feature ? <span title={title} style={{ color: '#7F8C8D' }}><IconComponent size="18" /></span> : null
// );

// const PropertyFeatures = ({ features }) => (
//   <FeaturesIcons>
//     <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
//     <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
//     <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
//   </FeaturesIcons>
// );

// // Main Component

// const PropertyView = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedArea, setSelectedArea] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           setError('Authentication token not found. Please log in.');
//           setLoading(false);
//           return;
//         }

//         const decoded = jwtDecode(token);
//         const userId = decoded.userId;

//         const response = await axios.get(`http://localhost:5000/api/properties/all?userId=${userId}`);
        
//         // Check if response.data is an array
//         if (!Array.isArray(response.data)) {
//           throw new Error('Invalid data format received from API.');
//         }

//         // Sort properties by updatedAt in descending order
//         const sortedProperties = [...response.data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        
//         setProperties(sortedProperties);
//         setFilteredProperties(sortedProperties);
//         setLoading(false);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setError('Failed to load properties. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Extract unique cities and areas
//   const uniqueCities = useMemo(() => {
//     return Array.from(new Set(properties.map(prop => prop.city))).sort();
//   }, [properties]);

//   const uniqueAreas = useMemo(() => {
//     return Array.from(new Set(properties.map(prop => prop.area))).sort();
//   }, [properties]);

//   // Handle Search and Filters
//   const handleSearch = () => {
//     let filtered = [...properties];
    
//     // Filter by search term
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(property =>
//         (property.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Filter by selected city
//     if (selectedCity !== '') {
//       filtered = filtered.filter(property => property.city === selectedCity);
//     }
    
//     // Filter by selected area
//     if (selectedArea !== '') {
//       filtered = filtered.filter(property => property.area === selectedArea);
//     }
    
//     setFilteredProperties(filtered);
//   };

//   // Handle Reset Filters
//   const handleReset = () => {
//     setSearchTerm('');
//     setSelectedCity('');
//     setSelectedArea('');
//     setFilteredProperties(properties);
//   };

//   const handleCardClick = (propertyId) => {
//     navigate(`/property/${propertyId}`);
//   };

//   // Effect to handle filtering when search or filters change
//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, selectedCity, selectedArea, properties]);

//   return (
//     <PageContainer>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//         <h1>Property Bank</h1>
//       </Header>

//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}> 
//           <SubmitInquiryButton>
//             Submit An Inquiry
//           </SubmitInquiryButton>
//         </Link>
//       </div>
      
//       {/* Search and Filter Controls */}
//       <SearchContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           aria-label="Search Properties by Title"
//         />
        
//         <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} aria-label="Filter by City">
//           <option value="">All Cities</option>
//           {uniqueCities.map(city => (
//             <option key={city} value={city}>{city}</option>
//           ))}
//         </Select>
        
//         <Select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} aria-label="Filter by Area">
//           <option value="">All Areas</option>
//           {uniqueAreas.map(area => (
//             <option key={area} value={area}>{area}</option>
//           ))}
//         </Select>
        
//         <SearchButton onClick={handleSearch}>Search</SearchButton>
//         <ResetButton onClick={handleReset}>Reset</ResetButton>
//       </SearchContainer>
      
//       {/* Loading Indicator */}
//       {loading && (
//         <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>Loading properties...</p>
//       )}

//       {/* Error Message */}
//       {error && (
//         <p style={{ color: '#E74C3C', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
//       )}

//       {/* Properties Grid */}
//       {!loading && !error && (
//         <PropertiesGrid>
//           {filteredProperties.length > 0 ? (
//             filteredProperties.map(property => (
//               <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
//                 <PropertyImage 
//                   src={property.images && property.images.length > 0 
//                     ? `http://localhost:5000/${property.images[0]}` 
//                     : 'http://localhost:5000/uploads/bg.jpg'} 
//                   alt={property.title || 'Property Image'}
//                 />

//                 <PropertyInfo>
//                   <div>
//                     <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
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
//                       <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms || 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaDollarSign /></DetailIcon>
//                       <DetailLabel>Price:</DetailLabel> ${property.budget || 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaCalendarAlt /></DetailIcon>
//                       <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
//                     </DetailItem>
//                     <PropertyFeatures features={property.features} />
//                   </div>

//                   <ActionButtonsContainer>
//                     <ActionButton onClick={() => handleWhatsAppShare(property.title || 'No Title', window.location.href)}>WhatsApp</ActionButton>
//                     <ActionButton onClick={() => handleEmailShare(property.title || 'No Title', window.location.href)}>Email</ActionButton>
//                     <PrintButton onClick={handlePrint}>Print</PrintButton>
//                   </ActionButtonsContainer>
//                 </PropertyInfo>

//                 <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
//                   {getInquiryTypeLabel(property.inquiryType).label}
//                 </Badge>
//               </PropertyCard>
//             ))
//           ) : (
//             <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>No properties match your search criteria.</p>
//           )}
//         </PropertiesGrid>
//       )}
//     </PageContainer>
//   );
// };

// export default PropertyView;



// import React, { useState, useEffect, useMemo } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { 
//   FaBed, FaCar, FaTree,
//   FaCalendarAlt, FaRoad, FaCity, FaHome, FaArrowsAlt, FaDollarSign 
// } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode'; // Corrected import
// import bgImage from '../images/bg.jpg';

// // Import Images Corresponding to Each Property Subtype
// import apartmentImg from '../images/apartment.jpg';
// import factoryImg from '../images/factory.jpg';
// import farmHouseImg from '../images/farmhouse.jpg';
// import homeImg from '../images/home.jpg';
// import officeImg from '../images/office.jpg';
// import shopImg from '../images/shop.jpg';
// import villasImg from '../images/villas.jpg';
// import warehouseImg from '../images/warehouse.jpg';
// import defaultImg from '../images/default.jpg'; // Fallback image

// // Helper Functions

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

// const getPropertySubType = (subTypes) => {
//   for (const key in subTypes) {
//     if (subTypes[key]) {
//       return key.charAt(0).toUpperCase() + key.slice(1);
//     }
//   }
//   return 'Unknown';
// };

// // Mapping Subtypes to Images
// const propertySubTypeImages = {
//   apartment: apartmentImg,
//   factory: factoryImg,
//   farmHouse: farmHouseImg,
//   home: homeImg,
//   office: officeImg,
//   shop: shopImg,
//   villas: villasImg,
//   warehouse: warehouseImg,
// };

// // Function to Get Image Based on Subtype
// const getImageForPropertySubType = (propertySubType) => {
//   for (const key in propertySubType) {
//     if (propertySubType[key]) {
//       return propertySubTypeImages[key] || defaultImg;
//     }
//   }
//   return defaultImg; // Return a default image if no subtype matches
// };

// const getInquiryTypeLabel = (inquiryType) => {
//   if (inquiryType.forSale) return { label: 'FOR SALE', color: '#E74C3C' };
//   if (inquiryType.forRent) return { label: 'FOR RENT', color: '#2ECC71' };
//   if (inquiryType.onRent) return { label: 'ON RENT', color: '#3498DB' };
//   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#9B59B6' };
//   return { label: 'INQUIRY', color: '#95A5A6' };
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

// // Styled Components

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

// const Header = styled.div`
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

// const SubmitInquiryButton = styled.button`
//   background-color: #3498DB;
//   color: white;
//   border: none;
//   padding: 12px 25px;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #2980B9;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 15px;
//   justify-content: center;
//   margin: 20px 0;
//   background: #FFFFFF;
//   padding: 20px 25px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 12px 15px;
//   width: 250px;
//   border: 1px solid #BDC3C7;
//   border-radius: 5px;
//   font-size: 1em;
//   transition: border-color 0.3s;

//   &:focus {
//     border-color: #3498DB;
//     outline: none;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Select = styled.select`
//   padding: 12px 15px;
//   width: 200px;
//   border: 1px solid #BDC3C7;
//   border-radius: 5px;
//   font-size: 1em;
//   background-color: #FFFFFF;
//   transition: border-color 0.3s;

//   &:focus {
//     border-color: #3498DB;
//     outline: none;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchButton = styled.button`
//   padding: 12px 25px;
//   background-color: #2ECC71;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #27AE60;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const ResetButton = styled.button`
//   padding: 12px 25px;
//   background-color: #E74C3C;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #C0392B;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const PropertiesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 30px;
//   padding: 20px;
  
//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
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
//   cursor: pointer; /* Added cursor pointer */

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
//   background-color: #3498DB;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 0.9em;
//   transition: background-color 0.3s, transform 0.3s;

//   &:hover {
//     background-color: #2980B9;
//     transform: translateY(-2px);
//   }
// `;

// const PrintButton = styled(ActionButton)`
//   background-color: #2ECC71;

//   &:hover {
//     background-color: #27AE60;
//   }
// `;

// // Features Icons

// const FeaturesIcons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-top: 10px;
// `;

// const FeatureIcon = ({ feature, IconComponent, title }) => (
//   feature ? <span title={title} style={{ color: '#7F8C8D' }}><IconComponent size="18" /></span> : null
// );

// const PropertyFeatures = ({ features }) => (
//   <FeaturesIcons>
//     <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
//     <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
//     <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
//   </FeaturesIcons>
// );

// // Main Component

// const PropertyView = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedArea, setSelectedArea] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           setError('Authentication token not found. Please log in.');
//           setLoading(false);
//           return;
//         }

//         const decoded = jwtDecode(token);
//         const userId = decoded.userId;

//         const response = await axios.get(`http://localhost:5000/api/properties/all?userId=${userId}`);
        
//         // Check if response.data is an array
//         if (!Array.isArray(response.data)) {
//           throw new Error('Invalid data format received from API.');
//         }

//         // Sort properties by updatedAt in descending order
//         const sortedProperties = [...response.data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        
//         setProperties(sortedProperties);
//         setFilteredProperties(sortedProperties);
//         setLoading(false);
//         console.log(sortedProperties);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         setError('Failed to load properties. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Extract unique cities and areas
//   const uniqueCities = useMemo(() => {
//     return Array.from(new Set(properties.map(prop => prop.city))).sort();
//   }, [properties]);

//   const uniqueAreas = useMemo(() => {
//     return Array.from(new Set(properties.map(prop => prop.area))).sort();
//   }, [properties]);

//   // Handle Search and Filters
//   const handleSearch = () => {
//     let filtered = [...properties];
    
//     // Filter by search term
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(property =>
//         (property.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Filter by selected city
//     if (selectedCity !== '') {
//       filtered = filtered.filter(property => property.city === selectedCity);
//     }
    
//     // Filter by selected area
//     if (selectedArea !== '') {
//       filtered = filtered.filter(property => property.area === selectedArea);
//     }
    
//     setFilteredProperties(filtered);
//   };

//   // Handle Reset Filters
//   const handleReset = () => {
//     setSearchTerm('');
//     setSelectedCity('');
//     setSelectedArea('');
//     setFilteredProperties(properties);
//   };

//   const handleCardClick = (propertyId) => {
//     navigate(`/property/${propertyId}`);
//   };

//   // Effect to handle filtering when search or filters change
//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, selectedCity, selectedArea, properties]);

//   return (
//     <PageContainer>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//         <h1>Property Bank</h1>
//       </Header>

//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}> 
//           <SubmitInquiryButton>
//             Submit An Inquiry
//           </SubmitInquiryButton>
//         </Link>
//       </div>
      
//       {/* Search and Filter Controls */}
//       <SearchContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           aria-label="Search Properties by Title"
//         />
        
//         <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} aria-label="Filter by City">
//           <option value="">All Cities</option>
//           {uniqueCities.map(city => (
//             <option key={city} value={city}>{city}</option>
//           ))}
//         </Select>
        
//         <Select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} aria-label="Filter by Area">
//           <option value="">All Areas</option>
//           {uniqueAreas.map(area => (
//             <option key={area} value={area}>{area}</option>
//           ))}
//         </Select>
        
//         <SearchButton onClick={handleSearch}>Search</SearchButton>
//         <ResetButton onClick={handleReset}>Reset</ResetButton>
//       </SearchContainer>
      
//       {/* Loading Indicator */}
//       {loading && (
//         <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>Loading properties...</p>
//       )}

//       {/* Error Message */}
//       {error && (
//         <p style={{ color: '#E74C3C', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
//       )}

//       {/* Properties Grid */}
//       {!loading && !error && (
//         <PropertiesGrid>
//           {filteredProperties.length > 0 ? (
//             filteredProperties.map(property => (
//               <PropertyCard key={property._id} onClick={() => handleCardClick(property._id)}>
//                 <PropertyImage 
//                   src={property.images && property.images.length > 0 
//                     ? `http://localhost:5000/${property.images[0]}` 
//                     : getImageForPropertySubType(property.propertySubType)} 
//                   alt={property.title || 'Property Image'}
//                 />

//                 <PropertyInfo>
//                   <div>
//                     <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
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
//                       <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms || 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaDollarSign /></DetailIcon>
//                       <DetailLabel>Price:</DetailLabel> ${property.budget || 'N/A'}
//                     </DetailItem>
//                     <DetailItem>
//                       <DetailIcon><FaCalendarAlt /></DetailIcon>
//                       <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
//                     </DetailItem>
//                     <PropertyFeatures features={property.features} />
//                   </div>

//                   <ActionButtonsContainer>
//                     <ActionButton onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(property.title || 'No Title', window.location.href); }}>WhatsApp</ActionButton>
//                     <ActionButton onClick={(e) => { e.stopPropagation(); handleEmailShare(property.title || 'No Title', window.location.href); }}>Email</ActionButton>
//                     <PrintButton onClick={(e) => { e.stopPropagation(); handlePrint(); }}>Print</PrintButton>
//                   </ActionButtonsContainer>
//                 </PropertyInfo>

//                 <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
//                   {getInquiryTypeLabel(property.inquiryType).label}
//                 </Badge>
//               </PropertyCard>
//             ))
//           ) : (
//             <p style={{ color: '#2C3E50', textAlign: 'center', fontSize: '1.2em' }}>No properties match your search criteria.</p>
//           )}
//         </PropertiesGrid>
//       )}
//     </PageContainer>
//   );
// };

// export default PropertyView;


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
  FaBarcode, // Import an icon for property code
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Corrected import
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

// Helper Functions

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getPropertySubType = (subTypes) => {
  for (const key in subTypes) {
    if (subTypes[key]) {
      return key.charAt(0).toUpperCase() + key.slice(1);
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

// Function to Get Image Based on Subtype
const getImageForPropertySubType = (propertySubType) => {
  for (const key in propertySubType) {
    if (propertySubType[key]) {
      return propertySubTypeImages[key] || defaultImg;
    }
  }
  return defaultImg; // Return a default image if no subtype matches
};

const getInquiryTypeLabel = (inquiryType) => {
  if (inquiryType.forSale) return { label: 'FOR SALE', color: '#E74C3C' };
  if (inquiryType.forRent) return { label: 'FOR RENT', color: '#2ECC71' };
  if (inquiryType.onRent) return { label: 'ON RENT', color: '#3498DB' };
  if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#9B59B6' };
  return { label: 'INQUIRY', color: '#95A5A6' };
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
  margin-bottom: 10px;
  font-weight: 600;
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

// Features Icons

const FeaturesIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const FeatureIcon = ({ feature, IconComponent, title }) => (
  feature ? (
    <span title={title} style={{ color: '#7f8c8d' }}>
      <IconComponent size="18" />
    </span>
  ) : null
);

const PropertyFeatures = ({ features }) => (
  <FeaturesIcons>
    <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
    <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
    <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
  </FeaturesIcons>
);

// Status Icons and Dropdown

const STATUS_OPTIONS = ['active', 'pending', 'sold'];

const STATUS_ICONS = {
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
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2); /* Add a shadow for depth */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusDropdown = styled.select`
  position: absolute;
  top: 55px; /* Adjusted to account for the new icon size and padding */
  left: 15px;
  font-size: 1em;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Main Component

const PropertyView = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        const response = await axios.get(`http://localhost:5000/api/properties/all?userId=${userId}`);

        // Check if response.data is an array
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format received from API.');
        }

        // Sort properties by updatedAt in descending order
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

  // Extract unique cities and areas
  const uniqueCities = useMemo(() => {
    return Array.from(new Set(properties.map((prop) => prop.city))).sort();
  }, [properties]);

  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(properties.map((prop) => prop.area))).sort();
  }, [properties]);

  // Handle Search and Filters
  const handleSearch = () => {
    let filtered = [...properties];

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((property) =>
        (property.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected city
    if (selectedCity !== '') {
      filtered = filtered.filter((property) => property.city === selectedCity);
    }

    // Filter by selected area
    if (selectedArea !== '') {
      filtered = filtered.filter((property) => property.area === selectedArea);
    }

    setFilteredProperties(filtered);
  };

  // Handle Reset Filters
  const handleReset = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedArea('');
    setFilteredProperties(properties);
  };

  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // Effect to handle filtering when search or filters change
  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCity, selectedArea, properties]);

  const updatePropertyStatus = (propertyId, newStatus) => {
    // Update filteredProperties
    setFilteredProperties((prevProperties) =>
      prevProperties.map((prop) =>
        prop._id === propertyId ? { ...prop, status: newStatus } : prop
      )
    );
    // Update the main properties state
    setProperties((prevProperties) =>
      prevProperties.map((prop) =>
        prop._id === propertyId ? { ...prop, status: newStatus } : prop
      )
    );
  };

  const PropertyCardComponent = ({ property, handleCardClick, updatePropertyStatus }) => {
    const [status, setStatus] = useState(property.status || 'active');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const handleStatusClick = (e) => {
      e.stopPropagation(); // Prevent the card's onClick event
      setShowStatusDropdown(!showStatusDropdown);
    };

    const handleStatusChange = async (e) => {
      const newStatus = e.target.value;
      const previousStatus = status;
      setStatus(newStatus);

      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.patch(
          `http://localhost:5000/api/properties/updateStatus/${property._id}`,
          { status: newStatus },
          { headers }
        );
        alert('Status updated successfully!');
        console.log(response.data);
        // Update the status in the parent component's state
        updatePropertyStatus(property._id, newStatus);
        setShowStatusDropdown(false); // Close the dropdown
      } catch (error) {
        setStatus(previousStatus); // Revert to previous status
        alert(
          `Failed to update status: ${
            error.response ? error.response.data.message : error.message
          }`
        );
        console.error('Failed to update status:', error);
      }
    };

    // Close dropdown when clicking outside
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

    return (
      <PropertyCard onClick={() => handleCardClick(property._id)}>
        {/* Status Icon and Dropdown */}
        <StatusContainer>
          <StatusIcon className="status-icon" onClick={handleStatusClick}>
            {STATUS_ICONS[status]}
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
            property.images && property.images.length > 0
              ? `http://localhost:5000/${property.images[0]}`
              : getImageForPropertySubType(property.propertySubType)
          }
          alt={property.title || 'Property Image'}
        />

        <PropertyInfo>
          <div>
            <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
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
              <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaBed />
              </DetailIcon>
              <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaDollarSign />
              </DetailIcon>
              <DetailLabel>Price:</DetailLabel> ${property.budget || 'N/A'}
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FaCalendarAlt />
              </DetailIcon>
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
            >
              WhatsApp
            </ActionButton>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                handleEmailShare(property.title || 'No Title', window.location.href);
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

      {/* Search and Filter Controls */}
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
          aria-label="Filter by Area"
        >
          <option value="">All Areas</option>
          {uniqueAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Select>

        <SearchButton onClick={handleSearch}>Search</SearchButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </SearchContainer>

      {/* Loading Indicator */}
      {loading && (
        <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
          Loading properties...
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
      )}

      {/* Properties Grid */}
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

export default PropertyView;
