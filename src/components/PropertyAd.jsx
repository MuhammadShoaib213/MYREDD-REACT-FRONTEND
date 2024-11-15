// // // import React, { useEffect, useState } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import moment from 'moment';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import {
// // //   faBed,
// // //   faDollarSign,
// // //   faCar,
// // //   faTree,
// // //   faRoad,
// // //   faRulerCombined,
// // //   faCalendarAlt,
// // // } from '@fortawesome/free-solid-svg-icons';
// // // import bgImage from '../images/bg.jpg';



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

// // // const PropertyAdContainer = styled.div`
// // //   max-width: 800px;
// // //   margin: 150px auto 40px;
// // //   background: linear-gradient(135deg, #ffffff, #f0f0f0);
// // //   border-radius: 20px;
// // //   box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
// // //   padding: 30px;
// // //   text-align: center;
// // //   font-family: 'Roboto', sans-serif;

// // //   @media (max-width: 768px) {
// // //     padding: 20px;
// // //   }
// // // `;

// // // const PropertyImage = styled.div`
// // //   width: 100%;
// // //   height: 400px;
// // //   background-size: cover;
// // //   background-position: center;
// // //   border-radius: 20px;
// // //   margin-bottom: 20px;
// // //   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
// // //   transition: all 0.3s ease;

// // //   &:hover {
// // //     transform: scale(1.05);
// // //   }

// // //   @media (max-width: 768px) {
// // //     height: 250px;
// // //   }
// // // `;

// // // const PropertyTitle = styled.h1`
// // //   font-size: 32px;
// // //   font-weight: 700;
// // //   color: #333;
// // //   margin-bottom: 10px;

// // //   @media (max-width: 768px) {
// // //     font-size: 24px;
// // //   }
// // // `;

// // // const PropertyDescription = styled.p`
// // //   font-size: 18px;
// // //   color: #555;
// // //   margin-bottom: 30px;
// // //   font-style: italic;

// // //   @media (max-width: 768px) {
// // //     font-size: 16px;
// // //   }
// // // `;

// // // const FeaturesList = styled.div`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   padding: 20px 0;

// // //   @media (max-width: 768px) {
// // //     flex-direction: column;
// // //     align-items: center;
// // //   }
// // // `;

// // // const FeatureItem = styled.div`
// // //   text-align: center;
// // //   width: 30%;

// // //   @media (max-width: 768px) {
// // //     width: 100%;
// // //     margin-bottom: 10px;
// // //   }
// // // `;

// // // const FeatureText = styled.p`
// // //   font-size: 16px;
// // //   color: #444;
// // //   margin-top: 5px;
// // //   font-weight: 500;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;

// // //   svg {
// // //     margin-right: 8px;
// // //   }

// // //   @media (max-width: 768px) {
// // //     font-size: 14px;
// // //   }
// // // `;

// // // const ButtonContainer = styled.div`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   margin-top: 30px;

// // //   @media (max-width: 768px) {
// // //     flex-direction: column;
// // //     align-items: center;
// // //   }
// // // `;

// // // const ActionButton = styled.button`
// // //   background-color: red;
// // //   color: white;
// // //   padding: 15px 40px;
// // //   font-size: 16px;
// // //   border: none;
// // //   border-radius: 10px;
// // //   cursor: pointer;
// // //   transition: all 0.3s ease;

// // //   &:hover {
// // //     background-color: darkred;
// // //     transform: translateY(-3px);
// // //     box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3);
// // //   }

// // //   @media (max-width: 768px) {
// // //     width: 80%;
// // //     margin-bottom: 10px;
// // //   }
// // // `;

// // // const NavigationButton = styled.button`
// // //   position: absolute;
// // //   left: 20px;
// // //   top: 130px;
// // //   background-color: #333;
// // //   border: 2px solid #ff0000;
// // //   color: white;
// // //   font-size: 14px;
// // //   cursor: pointer;
// // //   padding: 15px 20px;
// // //   border-radius: 10px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // //   width: 240px;
// // //   height: 60px;
// // //   transition: background-color 0.3s, transform 0.3s;
// // //   z-index: 10; // Bring the button above other elements
  
// // //   &:hover {
// // //     background-color: #ff0000;
// // //     transform: translateY(-2px);
// // //   }

// // //   @media (max-width: 768px) {
// // //     font-size: 14px;
// // //     width: 100%;
// // //     height: auto;
// // //     left: 10px;
// // //   }
// // // `;

// // // const BusinessInfo = styled.div`
// // //   position: absolute;
// // //   bottom: 20px;
// // //   right: 20px;
// // //   background-color: rgba(255, 255, 255, 0.9);
// // //   padding: 15px;
// // //   border-radius: 10px;
// // //   text-align: left;
// // //   max-width: 250px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

// // //   h2 {
// // //     font-size: 18px;
// // //     margin-bottom: 5px;
// // //     color: #333;
// // //   }

// // //   p {
// // //     font-size: 14px;
// // //     color: #555;
// // //     margin: 2px 0;
// // //   }

// // //   img {
// // //     width: 80px;
// // //     margin-bottom: 10px;
// // //     border-radius: 50%;
// // //   }

// // //   @media (max-width: 768px) {
// // //     position: static;
// // //     margin-top: 20px;
// // //     width: 100%;
// // //     text-align: center;

// // //     img {
// // //       margin: 0 auto 10px;
// // //     }
// // //   }
// // // `;



// // // const PropertyAd = () => {
// // //   const { id: propertyId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [propertyDetails, setPropertyDetails] = useState(null);
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// // //   useEffect(() => {
// // //     const fetchPropertyDetails = async () => {
// // //       try {
// // //         const response = await axios.get(`http://localhost:5000/api/properties/propertyAd/${propertyId}`, {
// // //           headers: {
// // //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });
// // //         setPropertyDetails(response.data);
// // //         setIsLoggedIn(!!localStorage.getItem('token'));
// // //       } catch (err) {
// // //         console.error(err);
// // //       }
// // //     };

// // //     fetchPropertyDetails();
// // //   }, [propertyId]);

// // //   const inquiryType = propertyDetails?.inquiryType
// // //     ? Object.keys(propertyDetails.inquiryType).find(key => propertyDetails.inquiryType[key])
// // //     : 'N/A';

// // //   const propertyType = propertyDetails?.propertyType
// // //     ? Object.keys(propertyDetails.propertyType).find(key => propertyDetails.propertyType[key])
// // //     : 'N/A';

// // //   const propertySubType = propertyDetails?.propertySubType
// // //     ? Object.keys(propertyDetails.propertySubType).find(key => propertyDetails.propertySubType[key])
// // //     : 'N/A';

// // //   const handleShareOnWhatsApp = () => {
// // //     const url = `https://wa.me/?text=Check out this property: ${window.location.href}`;
// // //     window.open(url, '_blank');
// // //   };

// // //   const handleShareOnEmail = () => {
// // //     const subject = encodeURIComponent('Check out this property');
// // //     const body = encodeURIComponent(`Here are the details of the property: ${window.location.href}`);
// // //     window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
// // //   };

// // //   const handlePrint = () => {
// // //     window.print();
// // //   };

// // //   const handleFindMatch = () => {
// // //     navigate(`/PropertyMatches/${propertyId}`);
// // //   };
  

// // //   const handleNavigation = () => {
// // //     navigate('/PropertyView');
// // //   };

// // //   const totalSize = propertyDetails?.length && propertyDetails?.width
// // //     ? propertyDetails.length * propertyDetails.width
// // //     : 'N/A';

// // //   if (!propertyId) {
// // //     return <p>No property ID provided.</p>;
// // //   }

// // //   return (
// // //     <PageContainer>
// // //       <PropertyAdContainer id="printableArea">
// // //         {isLoggedIn && (
// // //           <NavigationButton onClick={handleNavigation}>
// // //             Property Bank
// // //           </NavigationButton>
// // //         )}
// // //         {propertyDetails ? (
// // //           <>
// // //             <img 
// // //               src={`http://localhost:5000/${propertyDetails.images?.[0] ? propertyDetails.images[0].replace(/\\/g, '/').replace(/ /g, '%20') : 'uploads/bg.jpg'}`} 
// // //               alt="Property Image" 
// // //               style={{ width: '100%', height: 'auto', borderRadius: '20px' }} 
// // //             />
// // //             <PropertyTitle>
// // //               {inquiryType?.charAt(0).toUpperCase() + inquiryType.slice(1)} - {propertyType?.charAt(0).toUpperCase() + propertyType.slice(1)} - {propertySubType?.charAt(0).toUpperCase() + propertySubType.slice(1)} in {propertyDetails.city || 'City'}
// // //             </PropertyTitle>
// // //             <PropertyDescription>
// // //               Located in {propertyDetails.area || 'Area'}, Phase: {propertyDetails.phaseBlock || 'N/A'}.
// // //             </PropertyDescription>
// // //             <FeaturesList>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faBed} /> {propertyDetails.bedrooms ?? 'N/A'} Bedrooms</FeatureText>
// // //               </FeatureItem>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faRulerCombined} /> {totalSize} sq ft</FeatureText>
// // //               </FeatureItem>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faDollarSign} /> {propertyDetails.budget ? propertyDetails.budget.toLocaleString() : 'N/A'} PKR</FeatureText>
// // //               </FeatureItem>
// // //             </FeaturesList>
// // //             <FeaturesList>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faCar} /> Garage: {propertyDetails.features?.garage ? 'Yes' : 'No'}</FeatureText>
// // //               </FeatureItem>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faTree} /> Garden: {propertyDetails.features?.garden ? 'Yes' : 'No'}</FeatureText>
// // //               </FeatureItem>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faRoad} /> Main Road: {propertyDetails.features?.mainRoad ? 'Yes' : 'No'}</FeatureText>
// // //               </FeatureItem>
// // //             </FeaturesList>
// // //             <FeaturesList>
// // //               <FeatureItem>
// // //                 <FeatureText><FontAwesomeIcon icon={faCalendarAlt} /> Closing Date: {propertyDetails.closingDate ? moment(propertyDetails.closingDate).format('MMM Do YYYY') : 'N/A'}</FeatureText>
// // //               </FeatureItem>
// // //             </FeaturesList>
// // //             {isLoggedIn && (
// // //             <ButtonContainer>
// // //             <ActionButton onClick={handleFindMatch}>Find Match</ActionButton>
// // //             <ActionButton onClick={handleShareOnWhatsApp}>Share on WhatsApp</ActionButton>
// // //           </ButtonContainer>
// // //         )}
// // //         <BusinessInfo>
// // //   <img src="path_to_logo_image" alt="Company Logo" />
// // //   <h2>Your Company Name</h2>
// // //   <p>Address: 123 Main Street, City, Country</p>
// // //   <p>Phone: +123 456 7890</p>
// // //   <p>Email: info@company.com</p>
// // //   <p>Website: <a href="https://www.company.com">www.company.com</a></p>
// // // </BusinessInfo>

// // //           </>
// // //         ) : (
// // //           <p>Loading property details...</p>
// // //         )}
// // //       </PropertyAdContainer>
// // //     </PageContainer>
// // //   );
// // // };

// // // export default PropertyAd;


// // // PropertyAd.jsx

// // import React, { useEffect, useState, useMemo } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import styled, { keyframes } from 'styled-components';
// // import axios from 'axios';
// // import moment from 'moment';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import {
// //   faBed,
// //   faBath,
// //   faCar,
// //   faTree,
// //   faRoad,
// //   faRulerCombined,
// //   faCalendarAlt,
// // } from '@fortawesome/free-solid-svg-icons';
// // import bgImage from '../images/bg.jpg'; // Ensure this path is correct
// // import profileImage from '../images/bg.jpg'; // Add your profile image path

// // // Styled Components

// // const PageContainer = styled.div`
// //   background-color: #f5f5f5;
// //   min-height: 100vh;
// //   font-family: 'Roboto', sans-serif;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   padding: 20px;
// // `;

// // const PropertyAdContainer = styled.div`
// //   position: relative;
// //   max-width: 800px; /* Decreased from 1200px */
// //   background-color: #fff;
// //   border-radius: 20px;
// //   padding: 30px;
// //   box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
// //   overflow: hidden;

// //   @media (max-width: 768px) {
// //     padding: 20px;
// //     max-width: 90%;
// //   }
// // `;

// // // Container for the main image and overlay
// // const ImageContainer = styled.div`
// //   position: relative;
// //   width: 100%;
// //   height: 300px; /* Decreased height */
// //   margin-bottom: 20px;

// //   @media (max-width: 768px) {
// //     height: 200px;
// //   }
// // `;

// // const MainImage = styled.img`
// //   width: 100%;
// //   height: 100%;
// //   object-fit: cover;
// //   border-radius: 15px;
// // `;

// // const OverlayContent = styled.div`
// //   position: absolute;
// //   bottom: 20px;
// //   left: 20px;
// //   right: 20px;
// //   background: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
// //   padding: 15px;
// //   border-radius: 10px;
// //   color: #fff;

// //   @media (max-width: 768px) {
// //     bottom: 10px;
// //     left: 10px;
// //     right: 10px;
// //     padding: 10px;
// //   }
// // `;

// // const PropertyTitle = styled.h1`
// //   font-size: 24px;
// //   font-weight: bold;
// //   margin: 0 0 10px 0;
// //   text-transform: uppercase;

// //   @media (max-width: 768px) {
// //     font-size: 18px;
// //   }
// // `;

// // const PropertyDescription = styled.p`
// //   font-size: 14px;
// //   margin: 0;
// //   font-style: italic;

// //   @media (max-width: 768px) {
// //     font-size: 12px;
// //   }
// // `;

// // // Features Grid

// // const FeaturesGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
// //   gap: 15px;
// //   margin: 30px 0;

// //   @media (max-width: 768px) {
// //     grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
// //   }
// // `;

// // const FeatureCard = styled.div`
// //   background-color: #f7f7f7;
// //   border-radius: 12px;
// //   padding: 15px;
// //   text-align: center;
// //   transition: transform 0.3s;

// //   &:hover {
// //     transform: translateY(-3px);
// //   }
// // `;

// // const FeatureIcon = styled(FontAwesomeIcon)`
// //   font-size: 30px;
// //   color: #ff0000;
// //   margin-bottom: 10px;
// // `;

// // const FeatureDescription = styled.p`
// //   font-size: 14px;
// //   color: #333;
// //   font-weight: 500;
// // `;

// // // Thumbnail Gallery

// // const ThumbnailGallery = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   gap: 10px;
// //   margin-bottom: 30px;
// //   flex-wrap: wrap;
// // `;

// // const ThumbnailImage = styled.img`
// //   width: 45%;
// //   height: 120px;
// //   object-fit: cover;
// //   border-radius: 10px;

// //   @media (max-width: 768px) {
// //     width: 100%;
// //     margin-bottom: 10px;
// //     height: 100px;
// //   }
// // `;

// // // Business Info Card

// // const BusinessInfo = styled.div`
// //   background-color: #333;
// //   color: #fff;
// //   padding: 15px;
// //   border-radius: 12px;
// //   text-align: center;
// //   max-width: 250px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
// //   margin: 20px auto 0;

// //   img {
// //     width: 80px;
// //     border-radius: 50%;
// //     margin-bottom: 10px;
// //   }

// //   h2 {
// //     font-size: 18px;
// //     margin-bottom: 5px;
// //     color: #ffcc00;
// //   }

// //   p {
// //     font-size: 12px;
// //     margin: 3px 0;
// //   }

// //   a {
// //     color: #ffcc00;
// //     text-decoration: none;
// //   }

// //   @media (max-width: 768px) {
// //     max-width: 90%;
// //   }
// // `;

// // // Buttons

// // const ActionButton = styled.button`
// //   background-color: #ff0000;
// //   color: white;
// //   padding: 10px 20px;
// //   font-size: 14px;
// //   border: none;
// //   border-radius: 25px;
// //   cursor: pointer;
// //   transition: all 0.3s ease;
// //   text-transform: uppercase;
// //   margin: 5px;

// //   &:hover {
// //     background-color: #cc0000;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     width: 100%;
// //     margin: 5px 0;
// //     font-size: 12px;
// //   }
// // `;

// // const ButtonContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   flex-wrap: wrap;
// //   margin-top: 20px;
// // `;

// // // Loading Spinner

// // const spin = keyframes`
// //   to { transform: rotate(360deg); }
// // `;

// // const Spinner = styled.div`
// //   width: 50px;
// //   height: 50px;
// //   border: 5px solid rgba(0,0,0,0.1);
// //   border-left-color: #ff0000;
// //   border-radius: 50%;
// //   animation: ${spin} 1s linear infinite;
// //   margin: 100px auto;
// // `;

// // // Error Message

// // const ErrorMessage = styled.p`
// //   color: red;
// //   text-align: center;
// //   margin-top: 50px;
// //   font-size: 18px;
// // `;

// // // Navigation Button

// // const NavigationButton = styled.button`
// //   position: absolute;
// //   left: 20px;
// //   top: 20px;
// //   background-color: #333;
// //   border: 2px solid #ff0000;
// //   color: white;
// //   font-size: 14px;
// //   cursor: pointer;
// //   padding: 10px 15px;
// //   border-radius: 8px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   width: 180px;
// //   height: 40px;
// //   transition: background-color 0.3s, transform 0.3s;

// //   &:hover {
// //     background-color: #ff0000;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     font-size: 12px;
// //     width: 100%;
// //     height: auto;
// //     left: 10px;
// //     margin-bottom: 10px;
// //   }
// // `;

// // // Main Component

// // const PropertyAd = () => {
// //   const { id: propertyId } = useParams();
// //   const navigate = useNavigate();
// //   const [propertyDetails, setPropertyDetails] = useState(null);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchPropertyDetails = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:5000/api/properties/propertyAd/${propertyId}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem('token')}`,
// //               'Content-Type': 'application/json',
// //             },
// //           }
// //         );
// //         setPropertyDetails(response.data);
// //         setIsLoggedIn(!!localStorage.getItem('token'));
// //       } catch (err) {
// //         console.error(err);
// //         setError('Failed to load property details. Please try again later.');
// //       }
// //     };

// //     if (propertyId) {
// //       fetchPropertyDetails();
// //     } else {
// //       setError('No property ID provided.');
// //     }
// //   }, [propertyId]);

// //   // Derive inquiryType, propertyType, propertySubType
// //   const inquiryType = propertyDetails?.inquiryType
// //     ? Object.keys(propertyDetails.inquiryType).find(key => propertyDetails.inquiryType[key])
// //     : 'HOME SALE';

// //   const propertyType = propertyDetails?.propertyType
// //     ? Object.keys(propertyDetails.propertyType).find(key => propertyDetails.propertyType[key])
// //     : 'N/A';

// //   const propertySubType = propertyDetails?.propertySubType
// //     ? Object.keys(propertyDetails.propertySubType).find(key => propertyDetails.propertySubType[key])
// //     : 'N/A';

// //   // Calculate total size
// //   const totalSize = propertyDetails?.length && propertyDetails?.width
// //     ? propertyDetails.length * propertyDetails.width
// //     : 'N/A';

// //   // Prepare features data
// //   const featuresData = useMemo(() => [
// //     { icon: faBed, text: `${propertyDetails?.bedrooms ?? 'N/A'} Bedrooms` },
// //     { icon: faBath, text: `${propertyDetails?.bathrooms ?? 'N/A'} Bathrooms` },
// //     { icon: faCar, text: `Garage: ${propertyDetails?.features?.garage ? 'Yes' : 'No'}` },
// //     { icon: faRulerCombined, text: `${totalSize} sq ft` },
// //     { icon: faTree, text: `Garden: ${propertyDetails?.features?.garden ? 'Yes' : 'No'}` },
// //     { icon: faRoad, text: `Main Road: ${propertyDetails?.features?.mainRoad ? 'Yes' : 'No'}` },
// //     { icon: faCalendarAlt, text: `Closing Date: ${propertyDetails?.closingDate ? moment(propertyDetails.closingDate).format('MMM Do YYYY') : 'N/A'}` },
// //   ], [propertyDetails, totalSize]);

// //   // Handlers
// //   const handleShareOnWhatsApp = () => {
// //     const message = `Check out this property: ${inquiryType} - ${propertyType} - ${propertySubType} in ${propertyDetails?.city}. More details here: ${window.location.href}`;
// //     const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
// //     window.open(url, '_blank');
// //   };

// //   const handleShareOnEmail = () => {
// //     const subject = encodeURIComponent(`Check out this property: ${inquiryType} - ${propertyType}`);
// //     const body = encodeURIComponent(`Here are the details of the property "${inquiryType} - ${propertyType}" located in ${propertyDetails?.city}: ${window.location.href}`);
// //     window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
// //   };

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   const handleFindMatch = () => {
// //     navigate(`/PropertyMatches/${propertyId}`);
// //   };

// //   const handleNavigation = () => {
// //     navigate('/PropertyView');
// //   };

// //   // Handle image URLs
// //   const getImageUrl = (imagePath) => {
// //     if (!imagePath) return 'uploads/bg.jpg';
// //     return imagePath.replace(/\\/g, '/').replace(/ /g, '%20');
// //   };

// //   if (!propertyId) {
// //     return (
// //       <PageContainer>
// //         <ErrorMessage>No property ID provided.</ErrorMessage>
// //       </PageContainer>
// //     );
// //   }

// //   return (
// //     <PageContainer>
// //       {propertyDetails ? (
// //         <PropertyAdContainer id="printableArea">
// //           {isLoggedIn && (
// //             <NavigationButton onClick={handleNavigation} aria-label="Navigate to Property Bank">
// //               Property Bank
// //             </NavigationButton>
// //           )}

// //           {/* Main Property Image with Overlay */}
// //           <ImageContainer>
// //             <MainImage
// //               src={`http://localhost:5000/${getImageUrl(propertyDetails.images?.[0])}`}
// //               alt={`Image of ${propertyType} in ${propertyDetails.city}`}
// //             />
// //             <OverlayContent>
// //               <PropertyTitle>
// //                 {inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)} - {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} - {propertySubType.charAt(0).toUpperCase() + propertySubType.slice(1)}
// //               </PropertyTitle>
// //               <PropertyDescription>
// //                 Located in {propertyDetails.area || 'Area'}, Phase: {propertyDetails.phaseBlock || 'N/A'}.
// //               </PropertyDescription>
// //             </OverlayContent>
// //           </ImageContainer>

// //           {/* Features Grid */}
// //           <FeaturesGrid>
// //             {featuresData.map((feature, index) => (
// //               <FeatureCard key={index}>
// //                 <FeatureIcon icon={feature.icon} aria-hidden="true" />
// //                 <FeatureDescription>{feature.text}</FeatureDescription>
// //               </FeatureCard>
// //             ))}
// //           </FeaturesGrid>

// //           {/* Thumbnail Gallery */}
// //           <ThumbnailGallery>
// //             {propertyDetails.images?.slice(1, 5).map((image, index) => (
// //               <ThumbnailImage
// //                 key={index}
// //                 src={`http://localhost:5000/${getImageUrl(image)}`}
// //                 alt={`Property Image ${index + 1}`}
// //                 loading="lazy"
// //               />
// //             ))}
// //           </ThumbnailGallery>

// //           {/* Action Buttons */}
// //           {isLoggedIn && (
// //             <ButtonContainer>
// //               <ActionButton onClick={handleFindMatch} aria-label="Find Match">
// //                 Find Match
// //               </ActionButton>
// //               <ActionButton onClick={handleShareOnWhatsApp} aria-label="Share on WhatsApp">
// //                 Share on WhatsApp
// //               </ActionButton>
// //               <ActionButton onClick={handleShareOnEmail} aria-label="Share via Email">
// //                 Share via Email
// //               </ActionButton>
// //               <ActionButton onClick={handlePrint} aria-label="Print">
// //                 Print
// //               </ActionButton>
// //             </ButtonContainer>
// //           )}

// //           {/* Business Info Card */}
// //           <BusinessInfo>
// //             <img src={profileImage} alt="Agent Profile" />
// //             <h2>Mohamed Sharara</h2>
// //             <p>Graphic Designer</p>
// //             <p>Phone: +123 456 7890</p>
// //             <p>Email: mohamed@example.com</p>
// //             <p>Address: 123 Main Street, City</p>
// //             <p>
// //               Website: <a href="https://www.company.com">www.company.com</a>
// //             </p>
// //           </BusinessInfo>
// //         </PropertyAdContainer>
// //       ) : (
// //         <>
// //           {error ? (
// //             <ErrorMessage>{error}</ErrorMessage>
// //           ) : (
// //             <Spinner />
// //           )}
// //         </>
// //       )}
// //     </PageContainer>
// //   );
// // };

// // export default PropertyAd;


// import React, { useEffect, useState, useRef } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { toPng } from 'html-to-image'; // Import the html-to-image library

// // Import images corresponding to property subtype
// import apartmentImg from '../images/apartment.jpg';
// import factoryImg from '../images/factory.jpg';
// import farmHouseImg from '../images/farmhouse.jpg';
// import homeImg from '../images/home.jpg';
// import officeImg from '../images/office.jpg';
// import shopImg from '../images/shop.jpg';
// import villasImg from '../images/villas.jpg';
// import warehouseImg from '../images/warehouse.jpg';
// import defaultImg from '../images/default.jpg'; // Fallback image
// import bgImage from '../images/bg.jpg'; // Background image

// // Import social media icons (you can use an icon library or custom images)

// // Mapping property subtype to image
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

// // Helper function to get image based on property subtype
// const getImageForPropertySubType = (propertySubType) => {
//   for (const key in propertySubType) {
//     if (propertySubType[key]) {
//       return propertySubTypeImages[key] || defaultImg;
//     }
//   }
//   return defaultImg;
// };

// // Helper function to format inquiry type by adding spaces in camelCase words
// const formatInquiryType = (inquiryType) => {
//   if (inquiryType.forSale) return 'For Sale';
//   if (inquiryType.forPurchase) return 'For Purchase';
//   if (inquiryType.forRent) return 'For Rent';
//   if (inquiryType.onRent) return 'On Rent';
//   return '';
// };

// // Helper function to compose title based on property type, subtype, and inquiry type
// const composePropertyTitle = (inquiryType, propertyType, propertySubType) => {
//   let inquiryLabel = formatInquiryType(inquiryType);
//   let propertyTypeLabel = '';
//   let propertySubTypeLabel = '';

//   // Determine property type
//   if (propertyType.residential) propertyTypeLabel = 'Residential';
//   else if (propertyType.commercial) propertyTypeLabel = 'Commercial';
//   else if (propertyType.land) propertyTypeLabel = 'Land';

//   // Determine property subtype
//   for (const key in propertySubType) {
//     if (propertySubType[key]) {
//       propertySubTypeLabel = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
//       break;
//     }
//   }

//   // Compose the title in the order: Property Type, Property Subtype, Inquiry Type
//   return `${propertyTypeLabel} ${propertySubTypeLabel} ${inquiryLabel}`.trim();
// };

// // Styled components for the card layout
// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   min-height: 100vh;
//   padding-top: 200px; /* Space to prevent overlay from sticky header */
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   position: relative;
//   z-index: 0;
// `;

// const Overlay = styled.div`
//   background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
//   backdrop-filter: blur(8px); /* Apply blur to the background */
// `;

// const CardContainer = styled.div`
//   width: 80%;
//   max-width: 900px;
//   background-color: #f9f9f9;
//   border-radius: 15px;
//   overflow: hidden;
//   box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
//   display: flex;
//   flex-direction: column;
//   margin: 20px auto;
//   font-family: 'Roboto', sans-serif;
//   position: relative;
//   z-index: 2; /* Ensure card appears above overlay */
//   text-align: left;
// `;

// const CardHeader = styled.div`
//   display: flex;
//   position: relative;
// `;

// const CardImage = styled.div`
//   width: 40%; /* Take up 40% of the card width */
//   background-image: url(${(props) => props.imageUrl});
//   background-size: cover;
//   background-position: center;
//   position: relative;
// `;

// const BusinessLabel = styled.div`
//   position: absolute;
//   bottom: 10px;
//   left: 10px;
//   background-color: rgba(255, 255, 255, 0.85); /* Slightly transparent background */
//   color: #333;
//   padding: 10px 20px;
//   border-radius: 8px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   font-size: 12px;
//   z-index: 3;
//   border: 1px solid #e0e0e0;

//   h3 {
//     margin: 0;
//     font-size: 14px;
//     font-weight: 600;
//   }

//   p {
//     margin: 2px 0;
//     font-size: 10px;
//   }
// `;

// const CardContent = styled.div`
//   width: 60%;
//   padding: 25px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   margin: 0;
//   color: #333;
//   text-transform: uppercase;
// `;

// const Subtitle = styled.p`
//   font-size: 14px;
//   color: #777;
//   margin: 5px 0 20px 0;
//   font-style: italic;
// `;

// const FeaturesList = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
//   text-align: left;
// `;

// const FeatureItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-size: 12px;
//   color: #333;
// `;

// const CallToAction = styled.button`
//   background-color: #ff6b6b;
//   color: white;
//   padding: 10px 25px;
//   border: none;
//   border-radius: 20px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #e53e3e;
//   }
// `;

// const ShareButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 10px 20px;
//   margin-top: 15px;
//   border: none;
//   border-radius: 20px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #2980b9;
//   }
// `;

// // Modal styles
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background-color: #fff;
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
//   max-width: 500px;
//   width: 100%;
//   text-align: center;
// `;

// const SocialMediaOption = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 20px;
// `;

// const IconWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   cursor: pointer;

//   img {
//     width: 40px;
//     height: 40px;
//     margin-bottom: 5px;
//   }

//   span {
//     font-size: 12px;
//     color: #333;
//   }

//   &:hover {
//     opacity: 0.8;
//   }
// `;

// // Main Component
// const PropertyAd = () => {
//   const { id: propertyId } = useParams();
//   const [propertyDetails, setPropertyDetails] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const cardRef = useRef(); // Reference for the card container

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/properties/propertyAd/${propertyId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         setPropertyDetails(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (propertyId) {
//       fetchPropertyDetails();
//     }
//   }, [propertyId]);

//   if (!propertyDetails) {
//     return <p>Loading property details...</p>;
//   }

//   // Extract relevant data from API response
//   const { area, city, phaseBlock, propertyType, propertySubType, inquiryType, features, budget, advancePayment, priority } = propertyDetails;

//   // Compose the property title in the order: Property Type, Property Subtype, Inquiry Type
//   const propertyTitle = composePropertyTitle(inquiryType, propertyType, propertySubType);

//   // Get the appropriate image for the property subtype
//   const imageUrl =
//     propertyDetails.images && propertyDetails.images.length > 0
//       ? `http://localhost:5000/${propertyDetails.images[0]}`
//       : getImageForPropertySubType(propertyDetails.propertySubType);

//   // Function to handle opening and closing of modal
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   // Function to capture the image and handle sharing
//   const handleShare = async (platform) => {
//     try {
//       const dataUrl = await toPng(cardRef.current, { quality: 0.95, width: 900 }); // Capture full card with width set

//       let shareUrl = '';

//       // Set the URL based on selected platform
//       switch (platform) {
//         case 'facebook':
//           shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dataUrl)}`;
//           break;
//         case 'twitter':
//           shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(dataUrl)}`;
//           break;
//         case 'whatsapp':
//           shareUrl = `https://wa.me/?text=Check out this property: ${encodeURIComponent(dataUrl)}`;
//           break;
//         case 'email':
//           shareUrl = `mailto:?subject=Check out this property&body=Check out this property: ${encodeURIComponent(dataUrl)}`;
//           break;
//         default:
//           break;
//       }

//       window.open(shareUrl, '_blank'); // Open the sharing URL
//       toggleModal(); // Close the modal after sharing
//     } catch (error) {
//       console.error('Failed to capture image:', error);
//     }
//   };

//   return (
//     <PageContainer>
//       <Overlay />
//       <CardContainer ref={cardRef}>
//         <CardHeader>
//           {/* Image with Business Label */}
//           <CardImage imageUrl={imageUrl}>
//             <BusinessLabel>
//               <h3>Mohamed Sharara</h3>
//               <p>Graphic Designer</p>
//               <p>+123 456 7890</p>
//               <p>mohamed@example.com</p>
//             </BusinessLabel>
//           </CardImage>
//           <CardContent>
//             <Title>{propertyTitle}</Title>
//             <Subtitle>{`Located in ${area}, ${city}, Phase ${phaseBlock}`}</Subtitle>
//             <FeaturesList>
//               <FeatureItem>
//                 {budget ? <p>✔ Budget: {budget}</p> : null}
//                 {advancePayment ? <p>✔ Advance Payment: {advancePayment}</p> : null}
//               </FeatureItem>
//               <FeatureItem>
//                 <p>✔ Garage: {features.garage ? 'Yes' : 'No'}</p>
//                 <p>✔ Main Road Access: {features.mainRoad ? 'Yes' : 'No'}</p>
//               </FeatureItem>
//               <FeatureItem>
//                 <p>✔ Priority: {priority || 'Standard'}</p>
//               </FeatureItem>
//             </FeaturesList>
//             <CallToAction>Book Now!</CallToAction>
//             <ShareButton onClick={toggleModal}>Share this Ad</ShareButton>
//           </CardContent>
//         </CardHeader>
//       </CardContainer>

//       {/* Modal for social media sharing */}
//       {isModalOpen && (
//         <ModalOverlay onClick={toggleModal}>
//           <ModalContent onClick={(e) => e.stopPropagation() /* Prevent modal close on inner content click */}>
//             <h2>Share this Property</h2>
//             <SocialMediaOption>
//               <IconWrapper onClick={() => handleShare('facebook')}>
//                 <span>Facebook</span>
//               </IconWrapper>
//               <IconWrapper onClick={() => handleShare('twitter')}>
//                 <span>Twitter</span>
//               </IconWrapper>
//               <IconWrapper onClick={() => handleShare('whatsapp')}>
//                 <span>WhatsApp</span>
//               </IconWrapper>
//               <IconWrapper onClick={() => handleShare('email')}>
//                 <span>Email</span>
//               </IconWrapper>
//             </SocialMediaOption>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </PageContainer>
//   );
// };

// export default PropertyAd;


import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toPng } from 'html-to-image'; // Import the html-to-image library

// Import images corresponding to property subtype
import apartmentImg from '../images/apartment.jpg';
import factoryImg from '../images/factory.jpg';
import farmHouseImg from '../images/farmhouse.jpg';
import homeImg from '../images/home.jpg';
import officeImg from '../images/office.jpg';
import shopImg from '../images/shop.jpg';
import villasImg from '../images/villas.jpg';
import warehouseImg from '../images/warehouse.jpg';
import defaultImg from '../images/default.jpg'; // Fallback image
import bgImage from '../images/bg.jpg'; // Background image

// Mapping property subtype to image
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

// Helper function to get image based on property subtype
const getImageForPropertySubType = (propertySubType) => {
  for (const key in propertySubType) {
    if (propertySubType[key]) {
      return propertySubTypeImages[key] || defaultImg;
    }
  }
  return defaultImg;
};

// Helper function to format inquiry type by adding spaces in camelCase words
const formatInquiryType = (inquiryType) => {
  if (inquiryType.forSale) return 'For Sale';
  if (inquiryType.forPurchase) return 'For Purchase';
  if (inquiryType.forRent) return 'For Rent';
  if (inquiryType.onRent) return 'On Rent';
  return '';
};

// Helper function to compose title based on property type, subtype, and inquiry type
const composePropertyTitle = (inquiryType, propertyType, propertySubType) => {
  let inquiryLabel = formatInquiryType(inquiryType);
  let propertyTypeLabel = '';
  let propertySubTypeLabel = '';

  // Determine property type
  if (propertyType.residential) propertyTypeLabel = 'Residential';
  else if (propertyType.commercial) propertyTypeLabel = 'Commercial';
  else if (propertyType.land) propertyTypeLabel = 'Land';

  // Determine property subtype
  for (const key in propertySubType) {
    if (propertySubType[key]) {
      propertySubTypeLabel = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
      break;
    }
  }

  // Compose the title in the order: Property Type, Property Subtype, Inquiry Type
  return `${propertyTypeLabel} ${propertySubTypeLabel} ${inquiryLabel}`.trim();
};

// Styled components for the card layout
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 200px; /* Space to prevent overlay from sticky header */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 0;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  backdrop-filter: blur(8px); /* Apply blur to the background */
`;

const CardContainer = styled.div`
  width: 80%;
  max-width: 900px;
  background-color: #f9f9f9;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  font-family: 'Roboto', sans-serif;
  position: relative;
  z-index: 2; /* Ensure card appears above overlay */
  text-align: left;
`;

const CardHeader = styled.div`
  display: flex;
  position: relative;
`;

const CardImage = styled.div`
  width: 40%; /* Take up 40% of the card width */
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BusinessLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.85); /* Slightly transparent background */
  color: #333;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  z-index: 3;
  border: 1px solid #e0e0e0;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin: 2px 0;
    font-size: 10px;
  }
`;

const CardContent = styled.div`
  width: 60%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #333;
  text-transform: uppercase;
`;

const PropertyCode = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #777;
  margin: 5px 0 20px 0;
  font-style: italic;
`;

const FeaturesList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  text-align: left;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333;
`;

const CallToAction = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e53e3e;
  }
`;

const ShareButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  margin-top: 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const SocialMediaOption = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 12px;
    color: #333;
  }

  &:hover {
    opacity: 0.8;
  }
`;

// Main Component
const PropertyAd = () => {
  const { id: propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const cardRef = useRef(); // Reference for the card container

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/propertyAd/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setPropertyDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  if (!propertyDetails) {
    return <p>Loading property details...</p>;
  }

  // Extract relevant data from API response
  const { area, city, phaseBlock, propertyType, propertySubType, inquiryType, features, budget, advancePayment, priority, propertyCode } = propertyDetails;

  // Compose the property title in the order: Property Type, Property Subtype, Inquiry Type
  const propertyTitle = composePropertyTitle(inquiryType, propertyType, propertySubType);

  // Get the appropriate image for the property subtype
  const imageUrl =
    propertyDetails.images && propertyDetails.images.length > 0
      ? `http://localhost:5000/${propertyDetails.images[0]}`
      : getImageForPropertySubType(propertyDetails.propertySubType);

  // Function to handle opening and closing of modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to capture the image and handle sharing
  const handleShare = async (platform) => {
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, width: 900 }); // Capture full card with width set

      let shareUrl = '';

      // Set the URL based on selected platform
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dataUrl)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(dataUrl)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=Check out this property: ${encodeURIComponent(dataUrl)}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=Check out this property&body=Check out this property: ${encodeURIComponent(dataUrl)}`;
          break;
        default:
          break;
      }

      window.open(shareUrl, '_blank'); // Open the sharing URL
      toggleModal(); // Close the modal after sharing
    } catch (error) {
      console.error('Failed to capture image:', error);
    }
  };

  return (
    <PageContainer>
      <Overlay />
      <CardContainer ref={cardRef}>
        <CardHeader>
          {/* Image with Business Label */}
          <CardImage imageUrl={imageUrl}>
            <BusinessLabel>
              <h3>Mohamed Sharara</h3>
              <p>Graphic Designer</p>
              <p>+123 456 7890</p>
              <p>mohamed@example.com</p>
            </BusinessLabel>
          </CardImage>
          <CardContent>
            <Title>{propertyTitle}</Title>
            {propertyCode && (
              <PropertyCode>Property Code: {propertyCode || 'N/A'}</PropertyCode>

            )}
            <Subtitle>{`Located in ${area}, ${city}, Phase ${phaseBlock}`}</Subtitle>
            <FeaturesList>
              <FeatureItem>
                {budget ? <p>✔ Budget: {budget}</p> : null}
                {advancePayment ? <p>✔ Advance Payment: {advancePayment}</p> : null}
              </FeatureItem>
              <FeatureItem>
                <p>✔ Garage: {features.garage ? 'Yes' : 'No'}</p>
                <p>✔ Main Road Access: {features.mainRoad ? 'Yes' : 'No'}</p>
              </FeatureItem>
              <FeatureItem>
                <p>✔ Priority: {priority || 'Standard'}</p>
              </FeatureItem>
            </FeaturesList>
            <CallToAction>Book Now!</CallToAction>
            <ShareButton onClick={toggleModal}>Share this Ad</ShareButton>
          </CardContent>
        </CardHeader>
      </CardContainer>

      {/* Modal for social media sharing */}
      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation() /* Prevent modal close on inner content click */}>
            <h2>Share this Property</h2>
            <SocialMediaOption>
              <IconWrapper onClick={() => handleShare('facebook')}>
                <span>Facebook</span>
              </IconWrapper>
              <IconWrapper onClick={() => handleShare('twitter')}>
                <span>Twitter</span>
              </IconWrapper>
              <IconWrapper onClick={() => handleShare('whatsapp')}>
                <span>WhatsApp</span>
              </IconWrapper>
              <IconWrapper onClick={() => handleShare('email')}>
                <span>Email</span>
              </IconWrapper>
            </SocialMediaOption>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default PropertyAd;
