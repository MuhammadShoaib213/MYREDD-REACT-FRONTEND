// // // import React, { useEffect, useState, useRef } from 'react';
// // // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import html2canvas from 'html2canvas';
// // // import { 
// // //   FaBed, 
// // //   FaBath, 
// // //   FaUtensils, 
// // //   FaQuestion,
// // //   FaCar,
// // //   FaTree,
// // //   FaCouch,
// // //   FaChild,
// // //   FaBook,
// // //   FaUserFriends,
// // //   FaUserTie,
// // //   FaUserSecret,
// // //   FaFemale,
// // //   FaFilm,
// // //   FaTint,
// // //   FaFire,
// // //   FaBolt,
// // //   FaPhone,
// // //   FaMobileAlt,
// // //   FaShieldAlt,
// // //   FaSignInAlt
// // // } from 'react-icons/fa';
// // // import { GiElevator } from 'react-icons/gi';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import ShareLeadModal from './ShareLeadModal';
// // // import { API_CONFIG } from '../config/api.config';
// // // import PropertySearch from './PropertySearch';
// // // import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material'; // from MUI



// // // // ---------- HELPER ICON FUNCTIONS ----------
// // // const getFacilityIcon = (name) => {
// // //   if (!name || typeof name !== 'string') {
// // //     return <FaQuestion color="#ff1744" />;
// // //   }
// // //   const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
// // //   switch (normalized) {
// // //     case 'bedroom':
// // //       return <FaBed color="#ff1744" />;
// // //     case 'kidsroom':
// // //       return <FaChild color="#ff1744" />;
// // //     case 'guestroom':
// // //       return <FaUserFriends color="#ff1744" />;
// // //     case 'studyroom':
// // //       return <FaBook color="#ff1744" />;
// // //     case 'dining':
// // //     case 'diningroom':
// // //       return <FaUtensils color="#ff1744" />;
// // //     case 'sitting':
// // //     case 'sittingroom':
// // //     case 'lounge':
// // //       return <FaCouch color="#ff1744" />;
// // //     case 'servantquarter':
// // //       return <FaUserTie color="#ff1744" />;
// // //     case 'driverroom':
// // //       return <FaUserSecret color="#ff1744" />;
// // //     case 'maidroom':
// // //       return <FaFemale color="#ff1744" />;
// // //     case 'lawn':
// // //       return <FaTree color="#ff1744" />;
// // //     case 'cinema':
// // //       return <FaFilm color="#ff1744" />;
// // //     case 'garage':
// // //       return <FaCar color="#ff1744" />;
// // //     case 'elevator':
// // //       return <GiElevator color="#ff1744" />;
// // //     case 'bathroom':
// // //       return <FaBath color="#ff1744" />;
// // //     case 'kitchen':
// // //       return <FaUtensils color="#ff1744" />;
// // //     case 'water':
// // //       return <FaTint color="#ff1744" />;
// // //     case 'gas':
// // //       return <FaFire color="#ff1744" />;
// // //     case '247electricity':
// // //       return <FaBolt color="#ff1744" />;
// // //     case 'telephone':
// // //       return <FaPhone color="#ff1744" />;
// // //     case 'mobilecoverage':
// // //       return <FaMobileAlt color="#ff1744" />;
// // //     case '247security':
// // //       return <FaShieldAlt color="#ff1744" />;
// // //     case 'separateentrance':
// // //       return <FaSignInAlt color="#ff1744" />;
// // //     default:
// // //       if (normalized.includes('bed')) return <FaBed color="#ff1744" />;
// // //       if (normalized.includes('bath')) return <FaBath color="#ff1744" />;
// // //       if (normalized.includes('kitchen')) return <FaUtensils color="#ff1744" />;
// // //       return <FaQuestion color="#ff1744" />;
// // //   }
// // // };

// // // // ---------- STYLED COMPONENTS ----------
// // // const PageWrapper = styled.div`
// // //   background-color: #fff;
// // //   width: 100vw;
// // //   height: 100vh;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // // `;

// // // const Container = styled.div`
// // //   background: #000;
// // //   border: 2px solid #ff1744;
// // //   border-radius: 10px;
// // //   width: 800px;
// // //   height: 500px;
// // //   box-shadow: 0 8px 20px rgba(255, 23, 68, 0.5);
// // //   display: flex;
// // //   flex-direction: column;
// // //   overflow: hidden;
// // // `;

// // // const Header = styled.div`
// // //   flex-shrink: 0;
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   padding: 8px 16px;
// // //   background: #ff1744;
// // //   color: #fff;
// // // `;

// // // const Branding = styled.div`
// // //   font-size: 20px;
// // //   font-weight: bold;
// // //   color: #fff;
// // // `;

// // // const ContactInfo = styled.div`
// // //   font-size: 16px;
// // //   color: #fff;
// // // `;

// // // const Content = styled.div`
// // //   flex: 1 1 auto;
// // //   display: flex;
// // //   overflow: hidden;
// // // `;

// // // const LeftColumn = styled.div`
// // //   flex: 0 0 60%;
// // //   padding: 8px;
// // //   display: flex;
// // //   flex-direction: column;
// // // `;

// // // const ImageWrapper = styled.div`
// // //   position: relative;
// // //   flex: 1 1 auto;
// // //   overflow: hidden;
// // //   border-radius: 6px;
  
// // //   img {
// // //     width: 100%;
// // //     height: 100%;
// // //     object-fit: cover;
// // //     transition: transform 0.5s ease;
// // //   }
  
// // //   &:hover img {
// // //     transform: scale(1.05);
// // //   }
// // // `;

// // // const PriceOverlay = styled.div`
// // //   position: absolute;
// // //   bottom: 8px;
// // //   right: 8px;
// // //   background: #ff1744;
// // //   color: #fff;
// // //   padding: 6px 12px;
// // //   font-size: 20px;
// // //   font-weight: bold;
// // //   border-radius: 4px;
// // // `;

// // // const TopOverlay = styled.div`
// // //   position: absolute;
// // //   top: 8px;
// // //   left: 8px;
// // //   right: 8px;
// // //   text-align: center;
// // //   background: rgba(0, 0, 0, 0.8);
// // //   padding: 6px;
// // //   border-radius: 4px;
// // //   color: #fff;
// // // `;

// // // const OverlayTitle = styled.div`
// // //   font-size: 24px;
// // //   font-weight: bold;
// // //   color: #ff1744;
// // //   text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
// // // `;

// // // const OverlayAddress = styled.div`
// // //   font-size: 14px;
// // //   color: #fff;
// // //   margin-top: 2px;
// // // `;

// // // const SizeOverlay = styled.div`
// // //   position: absolute;
// // //   top: 8px;
// // //   right: 8px;
// // //   background: #fff;
// // //   color: #000;
// // //   padding: 4px 8px;
// // //   font-size: 20px;
// // //   font-weight: bold;
// // //   border-radius: 4px;
// // // `;

// // // const ThumbnailRow = styled.div`
// // //   display: flex;
// // //   gap: 6px;
// // //   margin-top: 6px;
// // //   justify-content: center;
// // //   flex-shrink: 0;
// // // `;

// // // const Thumbnail = styled.img`
// // //   width: 50px;
// // //   height: 50px;
// // //   object-fit: cover;
// // //   border: 2px solid transparent;
// // //   transition: transform 0.3s ease, border-color 0.3s ease;
// // //   cursor: pointer;
// // //   border-radius: 4px;
// // //   &:hover {
// // //     transform: scale(1.1);
// // //     border-color: #ff1744;
// // //   }
// // // `;

// // // const RightColumn = styled.div`
// // //   flex: 0 0 40%;
// // //   background: #000;
// // //   padding: 8px;
// // //   display: flex;
// // //   flex-direction: column;
// // //   overflow: hidden;
// // //   color: #fff;
// // // `;

// // // const DetailsSection = styled.div`
// // //   flex: 1 1 auto;
// // //   overflow-y: auto;
// // //   padding: 4px;
// // //   color: #fff;
// // // `;

// // // const SectionHeading = styled.h4`
// // //   font-size: 18px;
// // //   margin: 4px 0;
// // //   color: #ff1744;
// // // `;

// // // const DetailItem = styled.div`
// // //   font-size: 14px;
// // //   margin-bottom: 4px;
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 4px;
// // //   color: #fff;
// // // `;

// // // const Placeholder = styled.div`
// // //   font-size: 16px;
// // //   color: #fff;
// // //   text-align: center;
// // //   padding: 20px;
// // //   line-height: 1.4;
// // // `;

// // // const Footer = styled.div`
// // //   flex-shrink: 0;
// // //   display: flex;
// // //   justify-content: flex-end;
// // //   align-items: center;
// // //   background: #000;
// // //   padding: 6px 12px;
// // // `;

// // // const ShareButton = styled.button`
// // //   background-color: #ff1744;
// // //   border: none;
// // //   border-radius: 4px;
// // //   color: #fff;
// // //   font-size: 16px;
// // //   padding: 8px 16px;
// // //   cursor: pointer;
// // //   transition: background-color 0.3s ease;
  
// // //   &:hover {
// // //     background-color: #e3173f;
// // //   }
// // // `;

// // // // BackButton now navigates to the PropertyView route ("Property Bank")
// // // const BackButton = styled.button`
// // //   position: absolute;
// // //   left: 20px;
// // //   top: 150px;
// // //   background-color: #ffffff;
// // //   border: 2px solid #e74c3c;
// // //   color: #e74c3c;
// // //   font-size: 14px;
// // //   cursor: pointer;
// // //   padding: 10px 15px;
// // //   border-radius: 5px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // //   transition: background-color 0.3s, color 0.3s, transform 0.3s;
  
// // //   &:hover {
// // //     background-color: #e74c3c;
// // //     color: #ffffff;
// // //     transform: translateY(-2px);
// // //   }
  
// // //   @media (max-width: 768px) {
// // //     left: 10px;
// // //     width: 100%;
// // //     text-align: center;
// // //   }
// // // `;

// // // // ---------- HELPER FUNCTIONS FOR CAPTURING & UPLOADING ----------
// // // const captureAdAsImage = async (adElement) => {
// // //   try {
// // //     const canvas = await html2canvas(adElement, { useCORS: true });
// // //     return canvas.toDataURL('image/png');
// // //   } catch (error) {
// // //     console.error('Error capturing ad as image:', error);
// // //     throw error;
// // //   }
// // // };

// // // const uploadImage = async (dataURL) => {
// // //   try {
// // //     const blob = await (await fetch(dataURL)).blob();
// // //     const formData = new FormData();
// // //     formData.append('file', blob, 'property-ad.png');
// // //     const response = await axios.post(`${API_CONFIG.BASE_URL}/api/upload`, formData, {
// // //       headers: { 'Content-Type': 'multipart/form-data' },
// // //     });
// // //     return response.data.url;
// // //   } catch (error) {
// // //     console.error('Error uploading image:', error);
// // //     throw error;
// // //   }
// // // };

// // // // ---------- MAIN COMPONENT ----------
// // // const NewPropertyAd = () => {
// // //   const { id: propertyId } = useParams();
// // //   const [property, setProperty] = useState(null);
// // //   const adRef = useRef(null);
// // //   const [selectedImage, setSelectedImage] = useState('');
// // //   const [thumbnails, setThumbnails] = useState([]);
// // //   const navigate = useNavigate();

// // //   // State for controlling the lead sharing modal.
// // //   // We will use the property document's _id as the leadId.
// // //   const [shareModalOpen, setShareModalOpen] = useState(false);
// // //   const [showSearchModal, setShowSearchModal] = useState(false);
// // //   const [leadId, setLeadId] = useState(null);

// // //   // Fetch property details from API
// // //   useEffect(() => {
// // //     const fetchProperty = async () => {
// // //       try {
// // //         const response = await axios.get(`${API_CONFIG.API_URL}/properties/propertyAd/${propertyId}`, {
// // //           headers: {
// // //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //         });
// // //         setProperty(response.data);
// // //       } catch (err) {
// // //         console.error('Error fetching property details:', err);
// // //       }
// // //     };
// // //     if (propertyId) {
// // //       fetchProperty();
// // //     }
// // //   }, [propertyId]);

// // //   // Set up main image and thumbnails
// // //   useEffect(() => {
// // //     if (property) {
// // //       let mainImg = '';
// // //       let thumbImgs = [];
// // //       if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
// // //         mainImg = `${process.env.PUBLIC_URL}/image.png`;
// // //         thumbImgs = [];
// // //       } else {
// // //         const { frontPictures = [], propertyPictures = [] } = property;
// // //         if (frontPictures.length > 0) {
// // //           mainImg = `${API_CONFIG.BASE_URL}/${frontPictures[0]}`;
// // //           thumbImgs = frontPictures.slice(1).concat(propertyPictures);
// // //         } else if (propertyPictures.length > 0) {
// // //           mainImg = `${API_CONFIG.BASE_URL}/${propertyPictures[0]}`;
// // //           thumbImgs = propertyPictures.slice(1);
// // //         } else {
// // //           mainImg = `${process.env.PUBLIC_URL}/image.png`;
// // //         }
// // //       }
// // //       setSelectedImage(mainImg);
// // //       setThumbnails(thumbImgs.map(img => `${API_CONFIG.BASE_URL}/${img}`));
// // //     }
// // //   }, [property]);

// // //   if (!property) {
// // //     return <p style={{ color: '#fff' }}>Loading property details...</p>;
// // //   }

// // //   // Pricing logic
// // //   let priceDisplay = '';
// // //   if (property.inquiryType === 'For Sale' || property.inquiryType === 'For Rent') {
// // //     const priceValue = parseFloat(property.demand) || 0;
// // //     priceDisplay = `PKR ${priceValue.toLocaleString()}`;
// // //   } else if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
// // //     if (property.budget && (property.budget.min || property.budget.max)) {
// // //       priceDisplay = `PKR ${(property.budget.min || 0).toLocaleString()} - ${(property.budget.max || 0).toLocaleString()}`;
// // //     }
// // //   }

// // //   // Title and address logic
// // //   let title = '';
// // //   if (property.inquiryType === 'For Purchase') {
// // //     title = `Looking for ${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)}`;
// // //   } else if (property.inquiryType === 'On Rent') {
// // //     title = `looking ${property.propertySubType.toLowerCase()} for rent`;
// // //   } else {
// // //     title = `${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)} ${property.inquiryType}`;
// // //   }
// // //   const address = `${property.streetName}, ${property.district}, ${property.city}`;
// // //   const propertySize = `${property.size} ${property.sizeUnit}`;

// // //   // Floor Features and Facilities
// // //   const floorFeatures = property.floors && property.floors.length > 0 ? property.floors : [];
// // //   const availableFacilities =
// // //     property.facilities && property.facilities.length > 0
// // //       ? property.facilities.filter(f => {
// // //           const val = f.value.toString().toUpperCase();
// // //           return val !== 'N' && val !== '0';
// // //         })
// // //       : [];

// // //   // Handler for sharing the property ad image.
// // //   // Before capturing the image, temporarily hide the share buttons.
// // //   const handleShareProperty = async () => {
// // //     if (!adRef.current) return;
// // //     // Find the share buttons container and hide it
// // //     const shareButtons = adRef.current.querySelector('.share-buttons');
// // //     if (shareButtons) {
// // //       shareButtons.style.display = 'none';
// // //       // Wait a short moment to ensure the style change is applied
// // //       await new Promise(resolve => setTimeout(resolve, 100));
// // //     }
// // //     try {
// // //       const dataURL = await captureAdAsImage(adRef.current);
// // //       const imageUrl = await uploadImage(dataURL);
// // //       await navigator.clipboard.writeText(imageUrl);
// // //       toast.success("Property ad image link copied to clipboard!");
// // //     } catch (error) {
// // //       toast.error("Failed to share property image.");
// // //       console.error("Error sharing property ad image:", error);
// // //     } finally {
// // //       if (shareButtons) {
// // //         shareButtons.style.display = '';
// // //       }
// // //     }
// // //   };

// // //   // Handler for opening the Share Lead Modal.
// // //   // Use the property document's _id as the leadId.
// // //   const handleShareLead = () => {
// // //     setLeadId(property._id);
// // //     setShareModalOpen(true);
// // //   };

// // //   return (
// // //     <>
// // //       <PageWrapper>
// // //         {/* Back button now navigates to the PropertyView route ("Property Bank") */}
// // //         <BackButton onClick={() => navigate('/PropertyView')}>Property Bank</BackButton>
// // //         <Container ref={adRef}>
// // //           {/* Header */}
// // //           <Header>
// // //             <Branding>Muhammad Shoaib</Branding>
// // //             <ContactInfo>+1-234-567-8901</ContactInfo>
// // //           </Header>

// // //           {/* Main content area */}
// // //           <Content>
// // //             {/* Left Column: Image & Thumbnails */}
// // //             <LeftColumn>
// // //               <ImageWrapper>
// // //                 <img src={selectedImage} alt="Property Front" />
// // //                 <PriceOverlay>{priceDisplay}</PriceOverlay>
// // //                 <TopOverlay>
// // //                   <OverlayTitle>{title}</OverlayTitle>
// // //                   <OverlayAddress>{address}</OverlayAddress>
// // //                 </TopOverlay>
// // //                 <SizeOverlay>{propertySize}</SizeOverlay>
// // //               </ImageWrapper>
// // //               {thumbnails.length > 0 && (
// // //                 <ThumbnailRow>
// // //                   {thumbnails.map((imgUrl, index) => (
// // //                     <Thumbnail
// // //                       key={index}
// // //                       src={imgUrl}
// // //                       alt={`Thumbnail ${index + 1}`}
// // //                       onClick={() => setSelectedImage(imgUrl)}
// // //                     />
// // //                   ))}
// // //                 </ThumbnailRow>
// // //               )}
// // //             </LeftColumn>

// // //             {/* Right Column: Details */}
// // //             <RightColumn>
// // //               <DetailsSection>
// // //                 {(floorFeatures.length === 0 && availableFacilities.length === 0) ? (
// // //                   <Placeholder>
// // //                     Detailed specifications are not available online.<br />
// // //                     Please contact us for more information.
// // //                   </Placeholder>
// // //                 ) : (
// // //                   <>
// // //                     {floorFeatures.length > 0 && (
// // //                       <>
// // //                         <SectionHeading>Floor Features</SectionHeading>
// // //                         {floorFeatures.map((floor, index) => (
// // //                           <div key={index} style={{ marginBottom: '4px' }}>
// // //                             <DetailItem>
// // //                               <strong>{floor.name}:</strong>
// // //                             </DetailItem>
// // //                             {floor.features &&
// // //                               Object.entries(floor.features)
// // //                                 .filter(([key, value]) => {
// // //                                   const val = value.toString().toUpperCase();
// // //                                   return val !== 'N' && val !== '0';
// // //                                 })
// // //                                 .map(([key, value]) => (
// // //                                   <DetailItem key={key}>
// // //                                     {getFacilityIcon(key)}
// // //                                     <span>{key}: {value}</span>
// // //                                   </DetailItem>
// // //                                 ))}
// // //                           </div>
// // //                         ))}
// // //                       </>
// // //                     )}
// // //                     {availableFacilities.length > 0 && (
// // //                       <>
// // //                         <SectionHeading>Facilities</SectionHeading>
// // //                         {availableFacilities.map((facility, index) => (
// // //                           <DetailItem key={index}>
// // //                             {getFacilityIcon(facility.name)}
// // //                             <span>{facility.name}</span>
// // //                           </DetailItem>
// // //                         ))}
// // //                       </>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </DetailsSection>
// // //             </RightColumn>
// // //           </Content>

// // //           {/* Footer with Share buttons wrapped in a container with class "share-buttons" */}
// // //           <Footer className="share-buttons">
// // //             <ShareButton onClick={handleShareProperty}>
// // //               Share Property
// // //             </ShareButton>
// // //             <ShareButton onClick={handleShareLead}>
// // //               Share with Associates
// // //             </ShareButton>
// // //           </Footer>
// // //         </Container>
// // //       </PageWrapper>
// // //       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
// // //       {/* Render the ShareLeadModal */}
// // //       <Button
// // //         variant="contained"
// // //         onClick={() => setShowSearchModal(true)}
// // //         // Possibly remove className="mt-3" if you’re not styling MUI
// // //       >
// // //         Find Matching Properties
// // //       </Button>

// // //       {/* MUI Dialog */}
// // //       <Dialog
// // //         open={showSearchModal}
// // //         onClose={() => setShowSearchModal(false)}
// // //         maxWidth="lg"
// // //         fullWidth
// // //       >
// // //         <DialogTitle>Matching Properties</DialogTitle>
// // //         <DialogContent>
// // //           {/* Pass in `property` instead of `currentAd` */}
// // //           <PropertySearch ad={property} />
// // //         </DialogContent>
// // //       </Dialog>
// // //     </>
// // //   );
// // // };

// // // export default NewPropertyAd;


// // import React, { useEffect, useState, useRef } from 'react';
// // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import html2canvas from 'html2canvas';
// // import {
// //   FaBed,
// //   FaBath,
// //   FaUtensils,
// //   FaQuestion,
// //   FaCar,
// //   FaTree,
// //   FaCouch,
// //   FaChild,
// //   FaBook,
// //   FaUserFriends,
// //   FaUserTie,
// //   FaUserSecret,
// //   FaFemale,
// //   FaFilm,
// //   FaTint,
// //   FaFire,
// //   FaBolt,
// //   FaPhone,
// //   FaMobileAlt,
// //   FaShieldAlt,
// //   FaSignInAlt,
// // } from 'react-icons/fa';
// // import { GiElevator } from 'react-icons/gi';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import ShareLeadModal from './ShareLeadModal';
// // import { API_CONFIG } from '../config/api.config';
// // // Import the updated PropertySearch
// // import PropertySearch from './PropertySearch';
// // import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material'; // from MUI

// // // ---------- HELPER ICON FUNCTIONS ----------
// // const getFacilityIcon = (name) => {
// //   if (!name || typeof name !== 'string') {
// //     return <FaQuestion color="#ff1744" />;
// //   }
// //   const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
// //   switch (normalized) {
// //     case 'bedroom':
// //       return <FaBed color="#ff1744" />;
// //     case 'kidsroom':
// //       return <FaChild color="#ff1744" />;
// //     case 'guestroom':
// //       return <FaUserFriends color="#ff1744" />;
// //     case 'studyroom':
// //       return <FaBook color="#ff1744" />;
// //     case 'dining':
// //     case 'diningroom':
// //       return <FaUtensils color="#ff1744" />;
// //     case 'sitting':
// //     case 'sittingroom':
// //     case 'lounge':
// //       return <FaCouch color="#ff1744" />;
// //     case 'servantquarter':
// //       return <FaUserTie color="#ff1744" />;
// //     case 'driverroom':
// //       return <FaUserSecret color="#ff1744" />;
// //     case 'maidroom':
// //       return <FaFemale color="#ff1744" />;
// //     case 'lawn':
// //       return <FaTree color="#ff1744" />;
// //     case 'cinema':
// //       return <FaFilm color="#ff1744" />;
// //     case 'garage':
// //       return <FaCar color="#ff1744" />;
// //     case 'elevator':
// //       return <GiElevator color="#ff1744" />;
// //     case 'bathroom':
// //       return <FaBath color="#ff1744" />;
// //     case 'kitchen':
// //       return <FaUtensils color="#ff1744" />;
// //     case 'water':
// //       return <FaTint color="#ff1744" />;
// //     case 'gas':
// //       return <FaFire color="#ff1744" />;
// //     case '247electricity':
// //       return <FaBolt color="#ff1744" />;
// //     case 'telephone':
// //       return <FaPhone color="#ff1744" />;
// //     case 'mobilecoverage':
// //       return <FaMobileAlt color="#ff1744" />;
// //     case '247security':
// //       return <FaShieldAlt color="#ff1744" />;
// //     case 'separateentrance':
// //       return <FaSignInAlt color="#ff1744" />;
// //     default:
// //       if (normalized.includes('bed')) return <FaBed color="#ff1744" />;
// //       if (normalized.includes('bath')) return <FaBath color="#ff1744" />;
// //       if (normalized.includes('kitchen')) return <FaUtensils color="#ff1744" />;
// //       return <FaQuestion color="#ff1744" />;
// //   }
// // };

// // // ---------- STYLED COMPONENTS ----------
// // const PageWrapper = styled.div`
// //   background-color: #fff;
// //   width: 100vw;
// //   height: 100vh;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const Container = styled.div`
// //   background: #000;
// //   border: 2px solid #ff1744;
// //   border-radius: 10px;
// //   width: 800px;
// //   height: 500px;
// //   box-shadow: 0 8px 20px rgba(255, 23, 68, 0.5);
// //   display: flex;
// //   flex-direction: column;
// //   overflow: hidden;
// // `;

// // const Header = styled.div`
// //   flex-shrink: 0;
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   padding: 8px 16px;
// //   background: #ff1744;
// //   color: #fff;
// // `;

// // const Branding = styled.div`
// //   font-size: 20px;
// //   font-weight: bold;
// //   color: #fff;
// // `;

// // const ContactInfo = styled.div`
// //   font-size: 16px;
// //   color: #fff;
// // `;

// // const Content = styled.div`
// //   flex: 1 1 auto;
// //   display: flex;
// //   overflow: hidden;
// // `;

// // const LeftColumn = styled.div`
// //   flex: 0 0 60%;
// //   padding: 8px;
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const ImageWrapper = styled.div`
// //   position: relative;
// //   flex: 1 1 auto;
// //   overflow: hidden;
// //   border-radius: 6px;

// //   img {
// //     width: 100%;
// //     height: 100%;
// //     object-fit: cover;
// //     transition: transform 0.5s ease;
// //   }

// //   &:hover img {
// //     transform: scale(1.05);
// //   }
// // `;

// // const PriceOverlay = styled.div`
// //   position: absolute;
// //   bottom: 8px;
// //   right: 8px;
// //   background: #ff1744;
// //   color: #fff;
// //   padding: 6px 12px;
// //   font-size: 20px;
// //   font-weight: bold;
// //   border-radius: 4px;
// // `;

// // const TopOverlay = styled.div`
// //   position: absolute;
// //   top: 8px;
// //   left: 8px;
// //   right: 8px;
// //   text-align: center;
// //   background: rgba(0, 0, 0, 0.8);
// //   padding: 6px;
// //   border-radius: 4px;
// //   color: #fff;
// // `;

// // const OverlayTitle = styled.div`
// //   font-size: 24px;
// //   font-weight: bold;
// //   color: #ff1744;
// //   text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
// // `;

// // const OverlayAddress = styled.div`
// //   font-size: 14px;
// //   color: #fff;
// //   margin-top: 2px;
// // `;

// // const SizeOverlay = styled.div`
// //   position: absolute;
// //   top: 8px;
// //   right: 8px;
// //   background: #fff;
// //   color: #000;
// //   padding: 4px 8px;
// //   font-size: 20px;
// //   font-weight: bold;
// //   border-radius: 4px;
// // `;

// // const ThumbnailRow = styled.div`
// //   display: flex;
// //   gap: 6px;
// //   margin-top: 6px;
// //   justify-content: center;
// //   flex-shrink: 0;
// // `;

// // const Thumbnail = styled.img`
// //   width: 50px;
// //   height: 50px;
// //   object-fit: cover;
// //   border: 2px solid transparent;
// //   transition: transform 0.3s ease, border-color 0.3s ease;
// //   cursor: pointer;
// //   border-radius: 4px;
// //   &:hover {
// //     transform: scale(1.1);
// //     border-color: #ff1744;
// //   }
// // `;

// // const RightColumn = styled.div`
// //   flex: 0 0 40%;
// //   background: #000;
// //   padding: 8px;
// //   display: flex;
// //   flex-direction: column;
// //   overflow: hidden;
// //   color: #fff;
// // `;

// // const DetailsSection = styled.div`
// //   flex: 1 1 auto;
// //   overflow-y: auto;
// //   padding: 4px;
// //   color: #fff;
// // `;

// // const SectionHeading = styled.h4`
// //   font-size: 18px;
// //   margin: 4px 0;
// //   color: #ff1744;
// // `;

// // const DetailItem = styled.div`
// //   font-size: 14px;
// //   margin-bottom: 4px;
// //   display: flex;
// //   align-items: center;
// //   gap: 4px;
// //   color: #fff;
// // `;

// // const Placeholder = styled.div`
// //   font-size: 16px;
// //   color: #fff;
// //   text-align: center;
// //   padding: 20px;
// //   line-height: 1.4;
// // `;

// // const Footer = styled.div`
// //   flex-shrink: 0;
// //   display: flex;
// //   justify-content: flex-end;
// //   align-items: center;
// //   background: #000;
// //   padding: 6px 12px;
// // `;

// // const ShareButton = styled.button`
// //   background-color: #ff1744;
// //   border: none;
// //   border-radius: 4px;
// //   color: #fff;
// //   font-size: 16px;
// //   padding: 8px 16px;
// //   cursor: pointer;
// //   transition: background-color 0.3s ease;

// //   &:hover {
// //     background-color: #e3173f;
// //   }
// // `;

// // // BackButton now navigates to the PropertyView route ("Property Bank")
// // const BackButton = styled.button`
// //   position: absolute;
// //   left: 20px;
// //   top: 150px;
// //   background-color: #ffffff;
// //   border: 2px solid #e74c3c;
// //   color: #e74c3c;
// //   font-size: 14px;
// //   cursor: pointer;
// //   padding: 10px 15px;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   transition: background-color 0.3s, color 0.3s, transform 0.3s;

// //   &:hover {
// //     background-color: #e74c3c;
// //     color: #ffffff;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     left: 10px;
// //     width: 100%;
// //     text-align: center;
// //   }
// // `;

// // // ---------- HELPER FUNCTIONS FOR CAPTURING & UPLOADING ----------
// // const captureAdAsImage = async (adElement) => {
// //   try {
// //     const canvas = await html2canvas(adElement, { useCORS: true });
// //     return canvas.toDataURL('image/png');
// //   } catch (error) {
// //     console.error('Error capturing ad as image:', error);
// //     throw error;
// //   }
// // };

// // const uploadImage = async (dataURL) => {
// //   try {
// //     const blob = await (await fetch(dataURL)).blob();
// //     const formData = new FormData();
// //     formData.append('file', blob, 'property-ad.png');
// //     const response = await axios.post(`${API_CONFIG.BASE_URL}/api/upload`, formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' },
// //     });
// //     return response.data.url;
// //   } catch (error) {
// //     console.error('Error uploading image:', error);
// //     throw error;
// //   }
// // };

// // // ---------- MAIN COMPONENT ----------
// // const NewPropertyAd = () => {
// //   const { id: propertyId } = useParams();
// //   const [property, setProperty] = useState(null);
// //   const adRef = useRef(null);
// //   const [selectedImage, setSelectedImage] = useState('');
// //   const [thumbnails, setThumbnails] = useState([]);
// //   const navigate = useNavigate();

// //   // State for controlling the lead sharing modal.
// //   // We will use the property document's _id as the leadId.
// //   const [shareModalOpen, setShareModalOpen] = useState(false);
// //   const [leadId, setLeadId] = useState(null);

// //   // State to show/hide the property-search dialog
// //   const [showSearchModal, setShowSearchModal] = useState(false);

// //   // Fetch property details from API
// //   useEffect(() => {
// //     const fetchProperty = async () => {
// //       try {
// //         const response = await axios.get(
// //           `${API_CONFIG.API_URL}/properties/propertyAd/${propertyId}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem('token')}`,
// //               'Content-Type': 'application/json',
// //             },
// //           }
// //         );
// //         setProperty(response.data);
// //       } catch (err) {
// //         console.error('Error fetching property details:', err);
// //       }
// //     };
// //     if (propertyId) {
// //       fetchProperty();
// //     }
// //   }, [propertyId]);

// //   // Set up main image and thumbnails
// //   useEffect(() => {
// //     if (property) {
// //       let mainImg = '';
// //       let thumbImgs = [];
// //       if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
// //         mainImg = `${process.env.PUBLIC_URL}/image.png`;
// //         thumbImgs = [];
// //       } else {
// //         const { frontPictures = [], propertyPictures = [] } = property;
// //         if (frontPictures.length > 0) {
// //           mainImg = `${API_CONFIG.BASE_URL}/${frontPictures[0]}`;
// //           thumbImgs = frontPictures.slice(1).concat(propertyPictures);
// //         } else if (propertyPictures.length > 0) {
// //           mainImg = `${API_CONFIG.BASE_URL}/${propertyPictures[0]}`;
// //           thumbImgs = propertyPictures.slice(1);
// //         } else {
// //           mainImg = `${process.env.PUBLIC_URL}/image.png`;
// //         }
// //       }
// //       setSelectedImage(mainImg);
// //       setThumbnails(thumbImgs.map((img) => `${API_CONFIG.BASE_URL}/${img}`));
// //     }
// //   }, [property]);

// //   if (!property) {
// //     return <p style={{ color: '#fff' }}>Loading property details...</p>;
// //   }

// //   // Pricing logic
// //   let priceDisplay = '';
// //   if (property.inquiryType === 'For Sale' || property.inquiryType === 'For Rent') {
// //     const priceValue = parseFloat(property.demand) || 0;
// //     priceDisplay = `PKR ${priceValue.toLocaleString()}`;
// //   } else if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
// //     if (property.budget && (property.budget.min || property.budget.max)) {
// //       priceDisplay = `PKR ${(property.budget.min || 0).toLocaleString()} - ${(property.budget.max || 0).toLocaleString()}`;
// //     }
// //   }

// //   // Title and address logic
// //   let title = '';
// //   if (property.inquiryType === 'For Purchase') {
// //     title = `Looking for ${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)}`;
// //   } else if (property.inquiryType === 'On Rent') {
// //     title = `looking ${property.propertySubType.toLowerCase()} for rent`;
// //   } else {
// //     title = `${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)} ${
// //       property.inquiryType
// //     }`;
// //   }
// //   const address = `${property.streetName}, ${property.district}, ${property.city}`;
// //   const propertySize = `${property.size} ${property.sizeUnit}`;

// //   // Floor Features and Facilities
// //   const floorFeatures = property.floors && property.floors.length > 0 ? property.floors : [];
// //   const availableFacilities =
// //     property.facilities && property.facilities.length > 0
// //       ? property.facilities.filter((f) => {
// //           const val = f.value.toString().toUpperCase();
// //           return val !== 'N' && val !== '0';
// //         })
// //       : [];

// //   // Handler for sharing the property ad image.
// //   const handleShareProperty = async () => {
// //     if (!adRef.current) return;
// //     // Temporarily hide the share buttons
// //     const shareButtons = adRef.current.querySelector('.share-buttons');
// //     if (shareButtons) {
// //       shareButtons.style.display = 'none';
// //       await new Promise((resolve) => setTimeout(resolve, 100));
// //     }
// //     try {
// //       const dataURL = await captureAdAsImage(adRef.current);
// //       const imageUrl = await uploadImage(dataURL);
// //       await navigator.clipboard.writeText(imageUrl);
// //       toast.success('Property ad image link copied to clipboard!');
// //     } catch (error) {
// //       toast.error('Failed to share property image.');
// //       console.error('Error sharing property ad image:', error);
// //     } finally {
// //       if (shareButtons) {
// //         shareButtons.style.display = '';
// //       }
// //     }
// //   };

// //   // Handler for opening the Share Lead Modal.
// //   const handleShareLead = () => {
// //     setLeadId(property._id);
// //     setShareModalOpen(true);
// //   };

// //   return (
// //     <>
// //       <PageWrapper>
// //         {/* Back button now navigates to the "Property Bank" route */}
// //         <BackButton onClick={() => navigate('/PropertyView')}>Property Bank</BackButton>
// //         <Container ref={adRef}>
// //           {/* Header */}
// //           <Header>
// //             <Branding>Muhammad Shoaib</Branding>
// //             <ContactInfo>+1-234-567-8901</ContactInfo>
// //           </Header>

// //           {/* Main content area */}
// //           <Content>
// //             {/* Left Column: Image & Thumbnails */}
// //             <LeftColumn>
// //               <ImageWrapper>
// //                 <img src={selectedImage} alt="Property Front" />
// //                 <PriceOverlay>{priceDisplay}</PriceOverlay>
// //                 <TopOverlay>
// //                   <OverlayTitle>{title}</OverlayTitle>
// //                   <OverlayAddress>{address}</OverlayAddress>
// //                 </TopOverlay>
// //                 <SizeOverlay>{propertySize}</SizeOverlay>
// //               </ImageWrapper>
// //               {thumbnails.length > 0 && (
// //                 <ThumbnailRow>
// //                   {thumbnails.map((imgUrl, index) => (
// //                     <Thumbnail
// //                       key={index}
// //                       src={imgUrl}
// //                       alt={`Thumbnail ${index + 1}`}
// //                       onClick={() => setSelectedImage(imgUrl)}
// //                     />
// //                   ))}
// //                 </ThumbnailRow>
// //               )}
// //             </LeftColumn>

// //             {/* Right Column: Details */}
// //             <RightColumn>
// //               <DetailsSection>
// //                 {floorFeatures.length === 0 && availableFacilities.length === 0 ? (
// //                   <Placeholder>
// //                     Detailed specifications are not available online.
// //                     <br />
// //                     Please contact us for more information.
// //                   </Placeholder>
// //                 ) : (
// //                   <>
// //                     {floorFeatures.length > 0 && (
// //                       <>
// //                         <SectionHeading>Floor Features</SectionHeading>
// //                         {floorFeatures.map((floor, index) => (
// //                           <div key={index} style={{ marginBottom: '4px' }}>
// //                             <DetailItem>
// //                               <strong>{floor.name}:</strong>
// //                             </DetailItem>
// //                             {floor.features &&
// //                               Object.entries(floor.features)
// //                                 .filter(([key, value]) => {
// //                                   const val = value.toString().toUpperCase();
// //                                   return val !== 'N' && val !== '0';
// //                                 })
// //                                 .map(([key, value]) => (
// //                                   <DetailItem key={key}>
// //                                     {getFacilityIcon(key)}
// //                                     <span>
// //                                       {key}: {value}
// //                                     </span>
// //                                   </DetailItem>
// //                                 ))}
// //                           </div>
// //                         ))}
// //                       </>
// //                     )}
// //                     {availableFacilities.length > 0 && (
// //                       <>
// //                         <SectionHeading>Facilities</SectionHeading>
// //                         {availableFacilities.map((facility, index) => (
// //                           <DetailItem key={index}>
// //                             {getFacilityIcon(facility.name)}
// //                             <span>{facility.name}</span>
// //                           </DetailItem>
// //                         ))}
// //                       </>
// //                     )}
// //                   </>
// //                 )}
// //               </DetailsSection>
// //             </RightColumn>
// //           </Content>

// //           {/* Footer with Share buttons wrapped in a container with class "share-buttons" */}
// //           <Footer className="share-buttons">
// //             <ShareButton onClick={handleShareProperty}>Share Property</ShareButton>
// //             <ShareButton onClick={handleShareLead}>Share with Associates</ShareButton>
// //           </Footer>
// //         </Container>
// //       </PageWrapper>

// //       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

// //       {/* The "Find Matching Properties" button – triggers the search dialog */}
// //       <Button
// //         variant="contained"
// //         onClick={() => setShowSearchModal(true)}
// //         style={{ marginTop: '20px' }}
// //       >
// //         Find Matching Properties
// //       </Button>

// //       {/* MUI Dialog for property search */}
// //       <Dialog
// //         open={showSearchModal}
// //         onClose={() => setShowSearchModal(false)}
// //         maxWidth="lg"
// //         fullWidth
// //       >
// //         <DialogTitle>Matching Properties</DialogTitle>
// //         <DialogContent>
// //           {/* Pass the full property object as `ad` to PropertySearch */}
// //           <PropertySearch ad={property} />
// //         </DialogContent>
// //       </Dialog>

// //       {/* ShareLeadModal (if you use it for sharing leads) */}
// //       <ShareLeadModal
// //         open={shareModalOpen}
// //         onClose={() => setShareModalOpen(false)}
// //         leadId={leadId}
// //       />
// //     </>
// //   );
// // };

// // export default NewPropertyAd;


// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import {
//   FaBed,
//   FaBath,
//   FaUtensils,
//   FaQuestion,
//   FaCar,
//   FaTree,
//   FaCouch,
//   FaChild,
//   FaBook,
//   FaUserFriends,
//   FaUserTie,
//   FaUserSecret,
//   FaFemale,
//   FaFilm,
//   FaTint,
//   FaFire,
//   FaBolt,
//   FaPhone,
//   FaMobileAlt,
//   FaShieldAlt,
//   FaSignInAlt,
// } from 'react-icons/fa';
// import { GiElevator } from 'react-icons/gi';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ShareLeadModal from './ShareLeadModal';
// import { API_CONFIG } from '../config/api.config';
// import PropertySearch from './PropertySearch'; 
// import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import {jwtDecode} from 'jwt-decode'; 

// // ---------- HELPER ICON FUNCTIONS ----------
// const getFacilityIcon = (name) => {
//   if (!name || typeof name !== 'string') {
//     return <FaQuestion color="#ff1744" />;
//   }
//   const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
//   switch (normalized) {
//     case 'bedroom':
//       return <FaBed color="#ff1744" />;
//     case 'kidsroom':
//       return <FaChild color="#ff1744" />;
//     case 'guestroom':
//       return <FaUserFriends color="#ff1744" />;
//     case 'studyroom':
//       return <FaBook color="#ff1744" />;
//     case 'dining':
//     case 'diningroom':
//       return <FaUtensils color="#ff1744" />;
//     case 'sitting':
//     case 'sittingroom':
//     case 'lounge':
//       return <FaCouch color="#ff1744" />;
//     case 'servantquarter':
//       return <FaUserTie color="#ff1744" />;
//     case 'driverroom':
//       return <FaUserSecret color="#ff1744" />;
//     case 'maidroom':
//       return <FaFemale color="#ff1744" />;
//     case 'lawn':
//       return <FaTree color="#ff1744" />;
//     case 'cinema':
//       return <FaFilm color="#ff1744" />;
//     case 'garage':
//       return <FaCar color="#ff1744" />;
//     case 'elevator':
//       return <GiElevator color="#ff1744" />;
//     case 'bathroom':
//       return <FaBath color="#ff1744" />;
//     case 'kitchen':
//       return <FaUtensils color="#ff1744" />;
//     case 'water':
//       return <FaTint color="#ff1744" />;
//     case 'gas':
//       return <FaFire color="#ff1744" />;
//     case '247electricity':
//       return <FaBolt color="#ff1744" />;
//     case 'telephone':
//       return <FaPhone color="#ff1744" />;
//     case 'mobilecoverage':
//       return <FaMobileAlt color="#ff1744" />;
//     case '247security':
//       return <FaShieldAlt color="#ff1744" />;
//     case 'separateentrance':
//       return <FaSignInAlt color="#ff1744" />;
//     default:
//       if (normalized.includes('bed')) return <FaBed color="#ff1744" />;
//       if (normalized.includes('bath')) return <FaBath color="#ff1744" />;
//       if (normalized.includes('kitchen')) return <FaUtensils color="#ff1744" />;
//       return <FaQuestion color="#ff1744" />;
//   }
// };

// // ---------- STYLED COMPONENTS ----------
// const PageWrapper = styled.div`
//   background-color: #fff;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Container = styled.div`
//   background: #000;
//   border: 2px solid #ff1744;
//   border-radius: 10px;
//   width: 800px;
//   height: 500px;
//   box-shadow: 0 8px 20px rgba(255, 23, 68, 0.5);
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
// `;

// const Header = styled.div`
//   flex-shrink: 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 8px 16px;
//   background: #ff1744;
//   color: #fff;
// `;

// const Branding = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   color: #fff;
// `;

// const ContactInfo = styled.div`
//   font-size: 16px;
//   color: #fff;
// `;

// const Content = styled.div`
//   flex: 1 1 auto;
//   display: flex;
//   overflow: hidden;
// `;

// const LeftColumn = styled.div`
//   flex: 0 0 40%;
//   padding: 8px;
//   display: flex;
//   flex-direction: column;
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   flex: 1 1 auto;
//   overflow: hidden;
//   border-radius: 6px;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s ease;
//   }

//   &:hover img {
//     transform: scale(1.05);
//   }
// `;

// const PriceOverlay = styled.div`
//   position: absolute;
//   bottom: 8px;
//   right: 8px;
//   background: #ff1744;
//   color: #fff;
//   padding: 6px 12px;
//   font-size: 20px;
//   font-weight: bold;
//   border-radius: 4px;
// `;

// const TopOverlay = styled.div`
//   position: absolute;
//   top: 8px;
//   left: 8px;
//   right: 8px;
//   text-align: center;
//   background: rgba(0, 0, 0, 0.8);
//   padding: 6px;
//   border-radius: 4px;
//   color: #fff;
// `;

// const OverlayTitle = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #ff1744;
//   text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
// `;

// const OverlayAddress = styled.div`
//   font-size: 14px;
//   color: #fff;
//   margin-top: 2px;
// `;
  
// const SizeOverlay = styled.div`
//   position: absolute;
//   top: 80px;
//   right: 8px;
//   background: #fff;
//   color: #000;
//   padding: 4px 8px;
//   font-size: 20px;
//   font-weight: bold;
//   border-radius: 4px;
// `;

// const ThumbnailRow = styled.div`
//   display: flex;
//   gap: 6px;
//   margin-top: 6px;
//   justify-content: center;
//   flex-shrink: 0;
// `;

// const Thumbnail = styled.img`
//   width: 50px;
//   height: 50px;
//   object-fit: cover;
//   border: 2px solid transparent;
//   transition: transform 0.3s ease, border-color 0.3s ease;
//   cursor: pointer;
//   border-radius: 4px;

//   &:hover {
//     transform: scale(1.1);
//     border-color: #ff1744;
//   }
// `;

// const RightColumn = styled.div`
//   flex: 0 0 60%;
//   background: #000;
//   padding: 8px;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   color: #fff;
// `;

// const DetailsSection = styled.div`
//   flex: 1 1 auto;
//   overflow-y: auto;
//   padding: 4px;
//   color: #fff;
// `;

// const SectionHeading = styled.h4`
//   font-size: 18px;
//   margin: 4px 0;
//   color: #ff1744;
// `;

// const DetailItem = styled.div`
//   font-size: 14px;
//   margin-bottom: 4px;
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   color: #fff;
// `;

// const Placeholder = styled.div`
//   font-size: 16px;
//   color: #fff;
//   text-align: center;
//   padding: 20px;
//   line-height: 1.4;
// `;

// const Footer = styled.div`
//   flex-shrink: 0;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   background: #000;
//   padding: 6px 12px;
//   gap: 8px;
// `;

// const ShareButton = styled.button`
//   background-color: #ff1744;
//   border: none;
//   border-radius: 4px;
//   color: #fff;
//   font-size: 16px;
//   padding: 8px 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #e3173f;
//   }
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 150px;
//   background-color: #ffffff;
//   border: 2px solid #e74c3c;
//   color: #e74c3c;
//   font-size: 14px;
//   cursor: pointer;
//   padding: 10px 15px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s, color 0.3s, transform 0.3s;

//   &:hover {
//     background-color: #e74c3c;
//     color: #ffffff;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     left: 10px;
//     width: 100%;
//     text-align: center;
//   }
// `;

// // ---------- HELPER FUNCTIONS FOR CAPTURING & UPLOADING ----------
// const captureAdAsImage = async (adElement) => {
//   try {
//     const canvas = await html2canvas(adElement, { useCORS: true });
//     return canvas.toDataURL('image/png');
//   } catch (error) {
//     console.error('Error capturing ad as image:', error);
//     throw error;
//   }
// };

// const uploadImage = async (dataURL) => {
//   try {
//     const blob = await (await fetch(dataURL)).blob();
//     const formData = new FormData();
//     formData.append('file', blob, 'property-ad.png');
//     const response = await axios.post(`${API_CONFIG.BASE_URL}/api/upload`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data.url;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// };


// const token = localStorage.getItem('token');
// let decodedToken = {};
// if (token) {
//   try {
//     decodedToken = jwtDecode(token);
//     console.log(decodedToken);
//   } catch (err) {
//     console.error('Error decoding JWT:', err);
//   }
// }

// // ---------- MAIN COMPONENT ----------
// const NewPropertyAd = () => {
//   const { id: propertyId } = useParams();
//   const navigate = useNavigate();

//   const adRef = useRef(null);

//   const [property, setProperty] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [thumbnails, setThumbnails] = useState([]);

//   // ShareLead states
//   const [shareModalOpen, setShareModalOpen] = useState(false);
//   const [leadId, setLeadId] = useState(null);

//   // For "Find Matching Properties" modal
//   const [showSearchModal, setShowSearchModal] = useState(false);

//   // Fetch property from API
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `${API_CONFIG.API_URL}/properties/propertyAd/${propertyId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         console.log('Fetched property =>', response.data);

//         setProperty(response.data);
//       } catch (err) {
//         console.error('Error fetching property details:', err);
//       }
//     };

//     if (propertyId) {
//       fetchProperty();
//     }
//   }, [propertyId]);

//   // Setup main image + thumbnails
//   useEffect(() => {
//     if (!property) return;

//     let mainImg = '';
//     let thumbImgs = [];

//     if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
//       mainImg = `${process.env.PUBLIC_URL}/image.png`;
//     } else {
//       const { frontPictures = [], propertyPictures = [] } = property;
//       if (frontPictures.length > 0) {
//         mainImg = `${API_CONFIG.BASE_URL}/${frontPictures[0]}`;
//         thumbImgs = frontPictures.slice(1).concat(propertyPictures);
//       } else if (propertyPictures.length > 0) {
//         mainImg = `${API_CONFIG.BASE_URL}/${propertyPictures[0]}`;
//         thumbImgs = propertyPictures.slice(1);
//       } else {
//         mainImg = `${process.env.PUBLIC_URL}/image.png`;
//       }
//     }

//     setSelectedImage(mainImg);
//     setThumbnails(thumbImgs.map((img) => `${API_CONFIG.BASE_URL}/${img}`));
//   }, [property]);

//   // Early return if data is not yet loaded
//   if (!property) {
//     return <p style={{ color: '#fff' }}>Loading property details...</p>;
//   }

//   // Pricing
//   let priceDisplay = '';
//   if (property.inquiryType === 'For Sale' || property.inquiryType === 'For Rent') {
//     const priceValue = parseFloat(property.demand) || 0;
//     priceDisplay = `PKR ${priceValue.toLocaleString()}`;
//   } else if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
//     if (property.budget && (property.budget.min || property.budget.max)) {
//       priceDisplay = `PKR ${(property.budget.min || 0).toLocaleString()} - ${(property.budget.max || 0).toLocaleString()}`;
//     }
//   }

//   // Title & address
//   let title = '';
//   if (property.inquiryType === 'For Purchase') {
//     title = `Looking for ${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)}`;
//   } else if (property.inquiryType === 'On Rent') {
//     title = `looking ${property.propertySubType.toLowerCase()} for rent`;
//   } else {
//     title = `${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)} ${property.inquiryType}`;
//   }
//   const address = `${property.streetName}, ${property.district}, ${property.city}`;
//   const propertySize = `${property.size} ${property.sizeUnit}`;

//   // Floors + Facilities
//   const floorFeatures = property.floors && property.floors.length > 0 ? property.floors : [];
//   const availableFacilities = Array.isArray(property.facilities)
//     ? property.facilities.filter((f) => {
//         const val = f.value?.toString().toUpperCase();
//         return val !== 'N' && val !== '0';
//       })
//     : [];

//   // Handler: share property
//   const handleShareProperty = async () => {
//     if (!adRef.current) return;
//     const shareButtons = adRef.current.querySelector('.share-buttons');
//     if (shareButtons) {
//       shareButtons.style.display = 'none';
//       await new Promise((r) => setTimeout(r, 100));
//     }
//     try {
//       const dataURL = await captureAdAsImage(adRef.current);
//       const imageUrl = await uploadImage(dataURL);
//       await navigator.clipboard.writeText(imageUrl);
//       toast.success('Property ad image link copied to clipboard!');
//     } catch (error) {
//       toast.error('Failed to share property image.');
//       console.error('Error sharing property ad image:', error);
//     } finally {
//       if (shareButtons) shareButtons.style.display = '';
//     }
//   };

//   // Handler: share lead
//   const handleShareLead = () => {
//     if (!property._id) {
//       console.error('Property _id is missing, cannot share with associates.');
//       toast.error('Unable to share lead – property ID not found.');
//       return;
//     }
//     console.log('Sharing lead with ID:', property._id);
//     setLeadId(property._id);
//     setShareModalOpen(true);
//   };

//   // Handler: find matches (open MUI dialog)
//   const handleFindMatches = () => {
//     setShowSearchModal(true);
//   };

//   return (
//     <>
//       <PageWrapper>
//         <BackButton onClick={() => navigate('/PropertyView')}>Property Bank</BackButton>

//         <Container ref={adRef}>
//           <Header>
//             <Branding>{decodedToken.firstName && decodedToken.lastName
//                 ? `${decodedToken.firstName} ${decodedToken.lastName}`
//                 : 'Brand Name'}</Branding>
//             <ContactInfo>{decodedToken.whatsappNumber ? decodedToken.whatsappNumber : '+1-234-567-8901'}</ContactInfo>
//           </Header>

//           <Content>
//             {/* LEFT COLUMN: main image + thumbs */}
//             <LeftColumn>
//               <ImageWrapper>
//                 <img src={selectedImage} alt="Property Front" />
//                 <PriceOverlay>{priceDisplay}</PriceOverlay>
//                 <TopOverlay>
//                   <OverlayTitle>{title}</OverlayTitle>
//                   <OverlayAddress>{address}</OverlayAddress>
//                 </TopOverlay>
//                 <SizeOverlay>{propertySize}</SizeOverlay>
//               </ImageWrapper>
//               {thumbnails.length > 0 && (
//                 <ThumbnailRow>
//                   {thumbnails.map((imgUrl, idx) => (
//                     <Thumbnail
//                       key={idx}
//                       src={imgUrl}
//                       alt={`Thumbnail ${idx + 1}`}
//                       onClick={() => setSelectedImage(imgUrl)}
//                     />
//                   ))}
//                 </ThumbnailRow>
//               )}
//             </LeftColumn>

//             {/* RIGHT COLUMN: details */}
//             <RightColumn>
//               <DetailsSection>
//                 {floorFeatures.length === 0 && availableFacilities.length === 0 ? (
//                   <Placeholder>
//                     Detailed specifications are not available online.
//                     <br />
//                     Please contact us for more information.
//                   </Placeholder>
//                 ) : (
//                   <>
//                     {floorFeatures.length > 0 && (
//                       <>
//                         <SectionHeading>Floor Features</SectionHeading>
//                         {floorFeatures.map((floor, index) => (
//                           <div key={index} style={{ marginBottom: '4px' }}>
//                             <DetailItem>
//                               <strong>{floor.name}:</strong>
//                             </DetailItem>
//                             {floor.features &&
//                               Object.entries(floor.features)
//                                 .filter(([key, value]) => {
//                                   const val = value?.toString().toUpperCase();
//                                   return val !== 'N' && val !== '0';
//                                 })
//                                 .map(([key, value]) => (
//                                   <DetailItem key={key}>
//                                     {getFacilityIcon(key)}
//                                     <span>
//                                       {key}: {value}
//                                     </span>
//                                   </DetailItem>
//                                 ))}
//                           </div>
//                         ))}
//                       </>
//                     )}

//                     {availableFacilities.length > 0 && (
//                       <>
//                         <SectionHeading>Facilities</SectionHeading>
//                         {availableFacilities.map((facility, idx) => (
//                           <DetailItem key={idx}>
//                             {getFacilityIcon(facility.name)}
//                             <span>{facility.name}</span>
//                           </DetailItem>
//                         ))}
//                       </>
//                     )}
//                   </>
//                 )}
//               </DetailsSection>
//             </RightColumn>
//           </Content>

//           {/* FOOTER: share buttons */}
//           <Footer className="share-buttons">
//             <ShareButton onClick={handleShareProperty}>Share Property</ShareButton>
//             <ShareButton onClick={handleShareLead}>Share with Associates</ShareButton>
//             <ShareButton onClick={handleFindMatches}>Find Matching Properties</ShareButton>
//             <ShareButton
//     onClick={() => navigate('/InquiryForm', { state: { cnic: property?.cnic } })}
//   >
//     Add Another Inquiry
//   </ShareButton>
//           </Footer>
//         </Container>
//       </PageWrapper>

//       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

//       {/* MUI DIALOG FOR MATCHING PROPERTIES */}
//       <Dialog
//         open={showSearchModal}
//         onClose={() => setShowSearchModal(false)}
//         maxWidth="lg"
//         fullWidth
//       >
//         <DialogTitle>Matching Properties</DialogTitle>
//         <DialogContent>
//           <PropertySearch ad={property} />
//         </DialogContent>
//       </Dialog>

//       {/* SHARE LEAD MODAL */}
//       <ShareLeadModal
//         open={shareModalOpen}
//         onClose={() => setShareModalOpen(false)}
//         leadId={leadId}
//       />
//     </>
//   );
// };

// export default NewPropertyAd;

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import html2canvas from 'html2canvas';
import {
  FaBed,
  FaBath,
  FaUtensils,
  FaQuestion,
  FaCar,
  FaTree,
  FaCouch,
  FaChild,
  FaBook,
  FaUserFriends,
  FaUserTie,
  FaUserSecret,
  FaFemale,
  FaFilm,
  FaTint,
  FaFire,
  FaBolt,
  FaPhone,
  FaMobileAlt,
  FaShieldAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import { GiElevator } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { API_CONFIG } from '../config/api.config';
import ShareLeadModal from './ShareLeadModal';
// Import matching property search component
import PropertySearch from './PropertySearch';

// ---------- HELPER ICON FUNCTIONS ----------
const getFacilityIcon = (name) => {
  if (!name || typeof name !== 'string') {
    return <FaQuestion color="#ff1744" />;
  }
  const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  switch (normalized) {
    case 'bedroom':
      return <FaBed color="#ff1744" />;
    case 'kidsroom':
      return <FaChild color="#ff1744" />;
    case 'guestroom':
      return <FaUserFriends color="#ff1744" />;
    case 'studyroom':
      return <FaBook color="#ff1744" />;
    case 'dining':
    case 'diningroom':
      return <FaUtensils color="#ff1744" />;
    case 'sitting':
    case 'sittingroom':
    case 'lounge':
      return <FaCouch color="#ff1744" />;
    case 'servantquarter':
      return <FaUserTie color="#ff1744" />;
    case 'driverroom':
      return <FaUserSecret color="#ff1744" />;
    case 'maidroom':
      return <FaFemale color="#ff1744" />;
    case 'lawn':
      return <FaTree color="#ff1744" />;
    case 'cinema':
      return <FaFilm color="#ff1744" />;
    case 'garage':
      return <FaCar color="#ff1744" />;
    case 'elevator':
      return <GiElevator color="#ff1744" />;
    case 'bathroom':
      return <FaBath color="#ff1744" />;
    case 'kitchen':
      return <FaUtensils color="#ff1744" />;
    case 'water':
      return <FaTint color="#ff1744" />;
    case 'gas':
      return <FaFire color="#ff1744" />;
    case '247electricity':
      return <FaBolt color="#ff1744" />;
    case 'telephone':
      return <FaPhone color="#ff1744" />;
    case 'mobilecoverage':
      return <FaMobileAlt color="#ff1744" />;
    case '247security':
      return <FaShieldAlt color="#ff1744" />;
    case 'separateentrance':
      return <FaSignInAlt color="#ff1744" />;
    default:
      if (normalized.includes('bed')) return <FaBed color="#ff1744" />;
      if (normalized.includes('bath')) return <FaBath color="#ff1744" />;
      if (normalized.includes('kitchen')) return <FaUtensils color="#ff1744" />;
      return <FaQuestion color="#ff1744" />;
  }
};

// ---------- STYLED COMPONENTS ----------
const PageWrapper = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: #000;
  border: 2px solid #ff1744;
  border-radius: 10px;
  width: 800px;
  height: 500px;
  box-shadow: 0 8px 20px rgba(255, 23, 68, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #ff1744;
  color: #fff;
`;

const Branding = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const ContactInfo = styled.div`
  font-size: 16px;
  color: #fff;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  flex: 0 0 40%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  overflow: hidden;
  border-radius: 6px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const PriceOverlay = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: #ff1744;
  color: #fff;
  padding: 6px 12px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 4px;
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 6px;
  border-radius: 4px;
  color: #fff;
`;

const OverlayTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ff1744;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const OverlayAddress = styled.div`
  font-size: 14px;
  color: #fff;
  margin-top: 2px;
`;

const SizeOverlay = styled.div`
  position: absolute;
  top: 80px;
  right: 8px;
  background: #fff;
  color: #000;
  padding: 4px 8px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 4px;
`;

const ThumbnailRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
  justify-content: center;
  flex-shrink: 0;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid transparent;
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    transform: scale(1.1);
    border-color: #ff1744;
  }
`;

const RightColumn = styled.div`
  flex: 0 0 60%;
  background: #000;
  padding: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #fff;
`;

const DetailsSection = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 4px;
  color: #fff;
`;

const SectionHeading = styled.h4`
  font-size: 18px;
  margin: 4px 0;
  color: #ff1744;
`;

const DetailItem = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
`;

const Placeholder = styled.div`
  font-size: 16px;
  color: #fff;
  text-align: center;
  padding: 20px;
  line-height: 1.4;
`;

// The Footer now uses a ShareButton for all buttons for uniform size and styling.
const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #000;
  padding: 6px 12px;
  gap: 8px;
`;

const ShareButton = styled.button`
  background-color: #ff1744;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 150px;

  &:hover {
    background-color: #e3173f;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 150px;
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

// ---------- HELPER FUNCTIONS FOR CAPTURING & UPLOADING ----------
const captureAdAsImage = async (adElement) => {
  try {
    const canvas = await html2canvas(adElement, { useCORS: true });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing ad as image:', error);
    throw error;
  }
};

const uploadImage = async (dataURL) => {
  try {
    const blob = await (await fetch(dataURL)).blob();
    const formData = new FormData();
    formData.append('file', blob, 'property-ad.png');
    const response = await axios.post(`${API_CONFIG.BASE_URL}/api/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// ---------- SHARE HELPER FUNCTIONS ----------
const handleWhatsAppShare = (title, url) => {
  const text = `Check out this property: ${title}\n\nImage Link: ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

const handleEmailShare = (title, url) => {
  const subject = `Interesting Property Alert: ${title}`;
  const emailBody = `I found this interesting property and thought you might want to see it.\n\nImage Link: ${url}`;
  const subjectEncoded = encodeURIComponent(subject);
  const bodyEncoded = encodeURIComponent(emailBody);
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subjectEncoded}&body=${bodyEncoded}`;
  window.open(gmailLink, '_blank');
};

const token = localStorage.getItem('token');
let decodedToken = {};
if (token) {
  try {
    decodedToken = jwtDecode(token);
    console.log(decodedToken);
  } catch (err) {
    console.error('Error decoding JWT:', err);
  }
}

// ---------- MAIN COMPONENT ----------
const NewPropertyAd = () => {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();
  const adRef = useRef(null);

  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  // ShareLead state for associate sharing
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [leadId, setLeadId] = useState(null);

  // For "Find Matching Properties" modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Fetch property data from API
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${API_CONFIG.API_URL}/properties/propertyAd/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Fetched property =>', response.data);
        setProperty(response.data);
      } catch (err) {
        console.error('Error fetching property details:', err);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  // Setup main image and thumbnails
  useEffect(() => {
    if (!property) return;
    let mainImg = '';
    let thumbImgs = [];

    if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
      mainImg = `${process.env.PUBLIC_URL}/image.png`;
    } else {
      const { frontPictures = [], propertyPictures = [] } = property;
      if (frontPictures.length > 0) {
        mainImg = `${API_CONFIG.BASE_URL}/${frontPictures[0]}`;
        thumbImgs = frontPictures.slice(1).concat(propertyPictures);
      } else if (propertyPictures.length > 0) {
        mainImg = `${API_CONFIG.BASE_URL}/${propertyPictures[0]}`;
        thumbImgs = propertyPictures.slice(1);
      } else {
        mainImg = `${process.env.PUBLIC_URL}/image.png`;
      }
    }
    setSelectedImage(mainImg);
    setThumbnails(thumbImgs.map((img) => `${API_CONFIG.BASE_URL}/${img}`));
  }, [property]);

  if (!property) {
    return <p style={{ color: '#fff' }}>Loading property details...</p>;
  }

  // Pricing
  let priceDisplay = '';
  if (property.inquiryType === 'For Sale' || property.inquiryType === 'For Rent') {
    const priceValue = parseFloat(property.demand) || 0;
    priceDisplay = `PKR ${priceValue.toLocaleString()}`;
  } else if (property.inquiryType === 'For Purchase' || property.inquiryType === 'On Rent') {
    if (property.budget && (property.budget.min || property.budget.max)) {
      priceDisplay = `PKR ${(property.budget.min || 0).toLocaleString()} - ${(property.budget.max || 0).toLocaleString()}`;
    }
  }

  // Title and address formatting
  let title = '';
  if (property.inquiryType === 'For Purchase') {
    title = `Looking for ${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)}`;
  } else if (property.inquiryType === 'On Rent') {
    title = `looking ${property.propertySubType.toLowerCase()} for rent`;
  } else {
    title = `${property.propertySubType.charAt(0).toUpperCase() + property.propertySubType.slice(1)} ${property.inquiryType}`;
  }
  const address = `${property.streetName}, ${property.district}, ${property.city}`;
  const propertySize = `${property.size} ${property.sizeUnit}`;

  // Floors and Facilities
  const floorFeatures = property.floors && property.floors.length > 0 ? property.floors : [];
  const availableFacilities = Array.isArray(property.facilities)
    ? property.facilities.filter((f) => {
        const val = f.value?.toString().toUpperCase();
        return val !== 'N' && val !== '0';
      })
    : [];

  // Handler: Share property (copy, WhatsApp, or Email)
  const handleShareProperty = async (shareType = 'copy') => {
    if (!adRef.current) return;
    const shareButtons = adRef.current.querySelector('.share-buttons');
    if (shareButtons) {
      shareButtons.style.display = 'none';
      await new Promise((r) => setTimeout(r, 100));
    }
    try {
      const dataURL = await captureAdAsImage(adRef.current);
      const imageUrl = await uploadImage(dataURL);
      try {
        await navigator.clipboard.writeText(imageUrl);
      } catch (clipErr) {
        console.error('Clipboard copy failed:', clipErr);
      }
      switch (shareType) {
        case 'whatsapp':
          handleWhatsAppShare('Check out this property', imageUrl);
          toast.success('Shared via WhatsApp and link copied!');
          break;
        case 'email':
          handleEmailShare('Check out this property', imageUrl);
          toast.success('Shared via Email and link copied!');
          break;
        case 'copy':
        default:
          toast.success('Property ad image link copied to clipboard!');
          break;
      }
    } catch (error) {
      toast.error('Failed to share property image.');
      console.error('Error sharing property ad image:', error);
    } finally {
      if (shareButtons) shareButtons.style.display = '';
    }
  };

  // Handler: Share with Associates – opens the share modal.
  const handleShareLead = () => {
    if (!property._id) {
      console.error('Property _id is missing, cannot share with associates.');
      toast.error('Unable to share lead – property ID not found.');
      return;
    }
    setLeadId(property._id);
    setShareModalOpen(true);
  };

  // Handler: Find Matches – opens the matching properties dialog.
  const handleFindMatches = () => {
    setShowSearchModal(true);
  };

  return (
    <>
      <PageWrapper>
        <BackButton onClick={() => navigate('/PropertyView')}>Property Bank</BackButton>
        <Container ref={adRef}>
          <Header>
            <Branding>
              {decodedToken.firstName && decodedToken.lastName
                ? `${decodedToken.firstName} ${decodedToken.lastName}`
                : 'Brand Name'}
            </Branding>
            <ContactInfo>
              {decodedToken.whatsappNumber ? decodedToken.whatsappNumber : '+1-234-567-8901'}
            </ContactInfo>
          </Header>
          <Content>
            {/* LEFT COLUMN: Main image and thumbnails */}
            <LeftColumn>
              <ImageWrapper>
                <img src={selectedImage} alt="Property Front" />
                <PriceOverlay>{priceDisplay}</PriceOverlay>
                <TopOverlay>
                  <OverlayTitle>{title}</OverlayTitle>
                  <OverlayAddress>{address}</OverlayAddress>
                </TopOverlay>
                <SizeOverlay>{propertySize}</SizeOverlay>
              </ImageWrapper>
              {thumbnails.length > 0 && (
                <ThumbnailRow>
                  {thumbnails.map((imgUrl, idx) => (
                    <Thumbnail
                      key={idx}
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setSelectedImage(imgUrl)}
                    />
                  ))}
                </ThumbnailRow>
              )}
            </LeftColumn>

            {/* RIGHT COLUMN: Details */}
            <RightColumn>
              <DetailsSection>
                {floorFeatures.length === 0 && availableFacilities.length === 0 ? (
                  <Placeholder>
                    Detailed specifications are not available online.
                    <br />
                    Please contact us for more information.
                  </Placeholder>
                ) : (
                  <>
                    {floorFeatures.length > 0 && (
                      <>
                        <SectionHeading>Floor Features</SectionHeading>
                        {floorFeatures.map((floor, index) => (
                          <div key={index} style={{ marginBottom: '4px' }}>
                            <DetailItem>
                              <strong>{floor.name}:</strong>
                            </DetailItem>
                            {floor.features &&
                              Object.entries(floor.features)
                                .filter(([key, value]) => {
                                  const val = value?.toString().toUpperCase();
                                  return val !== 'N' && val !== '0';
                                })
                                .map(([key, value]) => (
                                  <DetailItem key={key}>
                                    {getFacilityIcon(key)}
                                    <span>
                                      {key}: {value}
                                    </span>
                                  </DetailItem>
                                ))}
                          </div>
                        ))}
                      </>
                    )}

                    {availableFacilities.length > 0 && (
                      <>
                        <SectionHeading>Facilities</SectionHeading>
                        {availableFacilities.map((facility, idx) => (
                          <DetailItem key={idx}>
                            {getFacilityIcon(facility.name)}
                            <span>{facility.name}</span>
                          </DetailItem>
                        ))}
                      </>
                    )}
                  </>
                )}
              </DetailsSection>
            </RightColumn>
          </Content>

          {/* FOOTER: Share buttons */}
          <Footer className="share-buttons">
            <ShareButton onClick={() => handleShareProperty('copy')}>Copy Link</ShareButton>
            <ShareButton onClick={() => handleShareProperty('whatsapp')}>WhatsApp</ShareButton>
            <ShareButton onClick={() => handleShareProperty('email')}>Email</ShareButton>
            <ShareButton onClick={handleShareLead}>Share with Associates</ShareButton>
            <ShareButton onClick={handleFindMatches}>Find Matching Properties</ShareButton>
            <ShareButton onClick={() => navigate('/InquiryForm', { state: { cnic: property?.cnic } })}>
              Add Another Inquiry
            </ShareButton>
          </Footer>
        </Container>
      </PageWrapper>

      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

      {/* Dialog for Matching Properties */}
      <Dialog
        open={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Matching Properties</DialogTitle>
        <DialogContent>
          <PropertySearch ad={property} />
        </DialogContent>
      </Dialog>

      {/* ShareLeadModal for associating sharing */}
      <ShareLeadModal
        isOpen={shareModalOpen}
        onRequestClose={() => setShareModalOpen(false)}
        leadId={leadId}
      />
    </>
  );
};

export default NewPropertyAd;
