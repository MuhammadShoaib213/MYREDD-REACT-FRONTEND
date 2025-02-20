// // import React, { useState, useEffect, useMemo } from 'react';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import {
// //   FaBed,
// //   FaCar,
// //   FaTree,
// //   FaCalendarAlt,
// //   FaRoad,
// //   FaCity,
// //   FaHome,
// //   FaArrowsAlt,
// //   FaDollarSign,
// //   FaCheckCircle,
// //   FaHourglassHalf,
// //   FaTimesCircle,
// //   FaBarcode, // Import an icon for property code
// // } from 'react-icons/fa';
// // import { Link, useNavigate } from 'react-router-dom';
// // import {jwtDecode} from 'jwt-decode'; // Corrected import
// // import bgImage from '../images/bg.jpg';

// // // Import Images Corresponding to Each Property Subtype
// // import apartmentImg from '../images/apartment.jpg';
// // import factoryImg from '../images/factory.jpg';
// // import farmHouseImg from '../images/farmhouse.jpg';
// // import homeImg from '../images/home.jpg';
// // import officeImg from '../images/office.jpg';
// // import shopImg from '../images/shop.jpg';
// // import villasImg from '../images/villas.jpg';
// // import warehouseImg from '../images/warehouse.jpg';
// // import defaultImg from '../images/default.jpg'; // Fallback image

// // // Helper Functions

// // const formatDate = (dateString) => {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString('en-US', {
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric',
// //   });
// // };

// // const getPropertySubType = (subTypes) => {
// //   for (const key in subTypes) {
// //     if (subTypes[key]) {
// //       return key.charAt(0).toUpperCase() + key.slice(1);
// //     }
// //   }
// //   return 'Unknown';
// // };

// // // Mapping Subtypes to Images
// // const propertySubTypeImages = {
// //   apartment: apartmentImg,
// //   factory: factoryImg,
// //   farmHouse: farmHouseImg,
// //   home: homeImg,
// //   office: officeImg,
// //   shop: shopImg,
// //   villas: villasImg,
// //   warehouse: warehouseImg,
// // };

// // // Function to Get Image Based on Subtype
// // const getImageForPropertySubType = (propertySubType) => {
// //   for (const key in propertySubType) {
// //     if (propertySubType[key]) {
// //       return propertySubTypeImages[key] || defaultImg;
// //     }
// //   }
// //   return defaultImg; // Return a default image if no subtype matches
// // };

// // const getInquiryTypeLabel = (inquiryType) => {
// //   if (inquiryType.forSale) return { label: 'FOR SALE', color: '#E74C3C' };
// //   if (inquiryType.forRent) return { label: 'FOR RENT', color: '#2ECC71' };
// //   if (inquiryType.onRent) return { label: 'ON RENT', color: '#3498DB' };
// //   if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#9B59B6' };
// //   return { label: 'INQUIRY', color: '#95A5A6' };
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
// //   window.open(mailtoUrl, '_blank');
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

// // const Header = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   position: relative;
// //   width: 100%;
// //   padding: 20px;
// //   color: #2c3e50;

// //   h1 {
// //     font-size: 2em;
// //     margin: 0;
// //     font-weight: 700;
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

// // const SubmitInquiryButton = styled.button`
// //   background-color: #3498db;
// //   color: white;
// //   border: none;
// //   padding: 12px 25px;
// //   border-radius: 25px;
// //   font-size: 1em;
// //   cursor: pointer;
// //   transition: background-color 0.3s, transform 0.3s;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

// //   &:hover {
// //     background-color: #2980b9;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     width: 100%;
// //   }
// // `;

// // const SearchContainer = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 15px;
// //   justify-content: center;
// //   margin: 20px 0;
// //   background: #ffffff;
// //   padding: 20px 25px;
// //   border-radius: 10px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     align-items: stretch;
// //   }
// // `;

// // const SearchInput = styled.input`
// //   padding: 12px 15px;
// //   width: 250px;
// //   border: 1px solid #bdc3c7;
// //   border-radius: 5px;
// //   font-size: 1em;
// //   transition: border-color 0.3s;

// //   &:focus {
// //     border-color: #3498db;
// //     outline: none;
// //   }

// //   @media (max-width: 768px) {
// //     width: 100%;
// //   }
// // `;

// // const Select = styled.select`
// //   padding: 12px 15px;
// //   width: 200px;
// //   border: 1px solid #bdc3c7;
// //   border-radius: 5px;
// //   font-size: 1em;
// //   background-color: #ffffff;
// //   transition: border-color 0.3s;

// //   &:focus {
// //     border-color: #3498db;
// //     outline: none;
// //   }

// //   @media (max-width: 768px) {
// //     width: 100%;
// //   }
// // `;

// // const SearchButton = styled.button`
// //   padding: 12px 25px;
// //   background-color: #2ecc71;
// //   color: white;
// //   border: none;
// //   border-radius: 25px;
// //   font-size: 1em;
// //   cursor: pointer;
// //   transition: background-color 0.3s, transform 0.3s;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

// //   &:hover {
// //     background-color: #27ae60;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     width: 100%;
// //   }
// // `;

// // const ResetButton = styled.button`
// //   padding: 12px 25px;
// //   background-color: #e74c3c;
// //   color: white;
// //   border: none;
// //   border-radius: 25px;
// //   font-size: 1em;
// //   cursor: pointer;
// //   transition: background-color 0.3s, transform 0.3s;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

// //   &:hover {
// //     background-color: #c0392b;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     width: 100%;
// //   }
// // `;

// // const PropertiesGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(3, 1fr);
// //   gap: 30px;
// //   padding: 20px;

// //   @media (max-width: 1024px) {
// //     grid-template-columns: repeat(2, 1fr);
// //   }

// //   @media (max-width: 600px) {
// //     grid-template-columns: 1fr;
// //   }
// // `;

// // const PropertyCard = styled.div`
// //   background: #ffffff;
// //   border-radius: 10px;
// //   overflow: hidden;
// //   box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
// //   transition: transform 0.3s, box-shadow 0.3s;
// //   display: flex;
// //   flex-direction: column;
// //   position: relative;
// //   height: 100%;
// //   cursor: pointer;

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
// //   color: #2c3e50;
// //   margin-bottom: 10px;
// //   font-weight: 600;
// // `;

// // const DetailItem = styled.p`
// //   margin: 5px 0;
// //   font-size: 0.95em;
// //   color: #34495e;
// //   display: flex;
// //   align-items: center;
// // `;

// // const DetailLabel = styled.span`
// //   font-weight: 600;
// //   margin-right: 8px;
// // `;

// // const DetailIcon = styled.span`
// //   margin-right: 8px;
// //   color: #3498db;
// //   display: flex;
// //   align-items: center;
// // `;

// // const Badge = styled.span`
// //   position: absolute;
// //   top: 15px;
// //   right: 15px;
// //   background-color: ${(props) => props.color || '#3498db'};
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
// //   background-color: #3498db;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   font-size: 0.9em;
// //   transition: background-color 0.3s, transform 0.3s;

// //   &:hover {
// //     background-color: #2980b9;
// //     transform: translateY(-2px);
// //   }
// // `;

// // const PrintButton = styled(ActionButton)`
// //   background-color: #2ecc71;

// //   &:hover {
// //     background-color: #27ae60;
// //   }
// // `;

// // // Features Icons

// // const FeaturesIcons = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   margin-top: 10px;
// // `;

// // const FeatureIcon = ({ feature, IconComponent, title }) => (
// //   feature ? (
// //     <span title={title} style={{ color: '#7f8c8d' }}>
// //       <IconComponent size="18" />
// //     </span>
// //   ) : null
// // );

// // const PropertyFeatures = ({ features }) => (
// //   <FeaturesIcons>
// //     <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
// //     <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
// //     <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
// //   </FeaturesIcons>
// // );

// // // Status Icons and Dropdown

// // const STATUS_OPTIONS = ['active', 'pending', 'sold'];

// // const STATUS_ICONS = {
// //   active: <FaCheckCircle color="green" title="Active" />,
// //   pending: <FaHourglassHalf color="orange" title="Pending" />,
// //   sold: <FaTimesCircle color="red" title="Sold" />,
// // };

// // const StatusContainer = styled.div`
// //   position: absolute;
// //   top: 15px;
// //   left: 15px;
// // `;

// // const StatusIcon = styled.div`
// //   font-size: 1.5em;
// //   cursor: pointer;
// //   background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
// //   padding: 8px;
// //   border-radius: 50%;
// //   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2); /* Add a shadow for depth */
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const StatusDropdown = styled.select`
// //   position: absolute;
// //   top: 55px; /* Adjusted to account for the new icon size and padding */
// //   left: 15px;
// //   font-size: 1em;
// //   z-index: 1000;
// //   background-color: white;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// // `;

// // // Main Component

// // const PropertyView = () => {
// //   const [properties, setProperties] = useState([]);
// //   const [filteredProperties, setFilteredProperties] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedCity, setSelectedCity] = useState('');
// //   const [selectedArea, setSelectedArea] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProperties = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           console.error('No token found');
// //           setError('Authentication token not found. Please log in.');
// //           setLoading(false);
// //           return;
// //         }

// //         const decoded = jwtDecode(token);
// //         const userId = decoded.userId;

// //         const response = await axios.get(` http://localhost:6003/api/properties/all?userId=${userId}`);

// //         // Check if response.data is an array
// //         if (!Array.isArray(response.data)) {
// //           throw new Error('Invalid data format received from API.');
// //         }

// //         // Sort properties by updatedAt in descending order
// //         const sortedProperties = [...response.data].sort(
// //           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
// //         );

// //         setProperties(sortedProperties);
// //         setFilteredProperties(sortedProperties);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching properties:', error);
// //         setError('Failed to load properties. Please try again later.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchProperties();
// //   }, []);

// //   // Extract unique cities and areas
// //   const uniqueCities = useMemo(() => {
// //     return Array.from(new Set(properties.map((prop) => prop.city))).sort();
// //   }, [properties]);

// //   const uniqueAreas = useMemo(() => {
// //     return Array.from(new Set(properties.map((prop) => prop.area))).sort();
// //   }, [properties]);

// //   // Handle Search and Filters
// //   const handleSearch = () => {
// //     let filtered = [...properties];

// //     // Filter by search term
// //     if (searchTerm.trim() !== '') {
// //       filtered = filtered.filter((property) =>
// //         (property.title || '').toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     // Filter by selected city
// //     if (selectedCity !== '') {
// //       filtered = filtered.filter((property) => property.city === selectedCity);
// //     }

// //     // Filter by selected area
// //     if (selectedArea !== '') {
// //       filtered = filtered.filter((property) => property.area === selectedArea);
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

// //   const handleCardClick = (propertyId) => {
// //     navigate(`/property/${propertyId}`);
// //   };

// //   // Effect to handle filtering when search or filters change
// //   useEffect(() => {
// //     handleSearch();
// //   }, [searchTerm, selectedCity, selectedArea, properties]);

// //   const updatePropertyStatus = (propertyId, newStatus) => {
// //     // Update filteredProperties
// //     setFilteredProperties((prevProperties) =>
// //       prevProperties.map((prop) =>
// //         prop._id === propertyId ? { ...prop, status: newStatus } : prop
// //       )
// //     );
// //     // Update the main properties state
// //     setProperties((prevProperties) =>
// //       prevProperties.map((prop) =>
// //         prop._id === propertyId ? { ...prop, status: newStatus } : prop
// //       )
// //     );
// //   };

// //   const PropertyCardComponent = ({ property, handleCardClick, updatePropertyStatus }) => {
// //     const [status, setStatus] = useState(property.status || 'active');
// //     const [showStatusDropdown, setShowStatusDropdown] = useState(false);

// //     const handleStatusClick = (e) => {
// //       e.stopPropagation(); // Prevent the card's onClick event
// //       setShowStatusDropdown(!showStatusDropdown);
// //     };

// //     const handleStatusChange = async (e) => {
// //       const newStatus = e.target.value;
// //       const previousStatus = status;
// //       setStatus(newStatus);

// //       try {
// //         const token = localStorage.getItem('token');
// //         const headers = { Authorization: `Bearer ${token}` };
// //         const response = await axios.patch(
// //           ` http://localhost:6003/api/properties/updateStatus/${property._id}`,
// //           { status: newStatus },
// //           { headers }
// //         );
// //         alert('Status updated successfully!');
// //         console.log(response.data);
// //         // Update the status in the parent component's state
// //         updatePropertyStatus(property._id, newStatus);
// //         setShowStatusDropdown(false); // Close the dropdown
// //       } catch (error) {
// //         setStatus(previousStatus); // Revert to previous status
// //         alert(
// //           `Failed to update status: ${
// //             error.response ? error.response.data.message : error.message
// //           }`
// //         );
// //         console.error('Failed to update status:', error);
// //       }
// //     };

// //     // Close dropdown when clicking outside
// //     useEffect(() => {
// //       const handleClickOutside = (event) => {
// //         if (
// //           showStatusDropdown &&
// //           !event.target.closest('.status-dropdown') &&
// //           !event.target.closest('.status-icon')
// //         ) {
// //           setShowStatusDropdown(false);
// //         }
// //       };
// //       document.addEventListener('click', handleClickOutside);
// //       return () => {
// //         document.removeEventListener('click', handleClickOutside);
// //       };
// //     }, [showStatusDropdown]);

// //     return (
// //       <PropertyCard onClick={() => handleCardClick(property._id)}>
// //         {/* Status Icon and Dropdown */}
// //         <StatusContainer>
// //           <StatusIcon className="status-icon" onClick={handleStatusClick}>
// //             {STATUS_ICONS[status]}
// //           </StatusIcon>
// //           {showStatusDropdown && (
// //             <StatusDropdown
// //               className="status-dropdown"
// //               value={status}
// //               onChange={handleStatusChange}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               {STATUS_OPTIONS.map((option) => (
// //                 <option key={option} value={option}>
// //                   {option.charAt(0).toUpperCase() + option.slice(1)}
// //                 </option>
// //               ))}
// //             </StatusDropdown>
// //           )}
// //         </StatusContainer>

// //         <PropertyImage
// //           src={
// //             property.images && property.images.length > 0
// //               ? ` http://localhost:6003/${property.images[0]}`
// //               : getImageForPropertySubType(property.propertySubType)
// //           }
// //           alt={property.title || 'Property Image'}
// //         />

// //         <PropertyInfo>
// //           <div>
// //             <PropertyTitle>{property.title || 'No Title Available'}</PropertyTitle>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaBarcode />
// //               </DetailIcon>
// //               <DetailLabel>Property Code:</DetailLabel> {property.propertyCode || 'N/A'}
// //             </DetailItem>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaHome />
// //               </DetailIcon>
// //               <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
// //             </DetailItem>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaCity />
// //               </DetailIcon>
// //               <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
// //             </DetailItem>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaArrowsAlt />
// //               </DetailIcon>
// //               <DetailLabel>Area:</DetailLabel> {property.area || 'N/A'}
// //             </DetailItem>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaBed />
// //               </DetailIcon>
// //               <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms || 'N/A'}
// //             </DetailItem>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaDollarSign />
// //               </DetailIcon>
// //               <DetailLabel>Price:</DetailLabel> ${property.budget || 'N/A'}
// //             </DetailItem>
// //             <DetailItem>
// //               <DetailIcon>
// //                 <FaCalendarAlt />
// //               </DetailIcon>
// //               <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
// //             </DetailItem>
// //             <PropertyFeatures features={property.features} />
// //           </div>

// //           <ActionButtonsContainer>
// //             <ActionButton
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 handleWhatsAppShare(property.title || 'No Title', window.location.href);
// //               }}
// //             >
// //               WhatsApp
// //             </ActionButton>
// //             <ActionButton
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 handleEmailShare(property.title || 'No Title', window.location.href);
// //               }}
// //             >
// //               Email
// //             </ActionButton>
// //             <PrintButton
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 handlePrint();
// //               }}
// //             >
// //               Print
// //             </PrintButton>
// //           </ActionButtonsContainer>
// //         </PropertyInfo>

// //         <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
// //           {getInquiryTypeLabel(property.inquiryType).label}
// //         </Badge>
// //       </PropertyCard>
// //     );
// //   };

// //   return (
// //     <PageContainer>
// //       <Header>
// //         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
// //         <h1>Property Bank</h1>
// //       </Header>

// //       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// //         <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
// //           <SubmitInquiryButton>Submit An Inquiry</SubmitInquiryButton>
// //         </Link>
// //       </div>

// //       {/* Search and Filter Controls */}
// //       <SearchContainer>
// //         <SearchInput
// //           type="text"
// //           placeholder="Search by title..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           aria-label="Search Properties by Title"
// //         />

// //         <Select
// //           value={selectedCity}
// //           onChange={(e) => setSelectedCity(e.target.value)}
// //           aria-label="Filter by City"
// //         >
// //           <option value="">All Cities</option>
// //           {uniqueCities.map((city) => (
// //             <option key={city} value={city}>
// //               {city}
// //             </option>
// //           ))}
// //         </Select>

// //         <Select
// //           value={selectedArea}
// //           onChange={(e) => setSelectedArea(e.target.value)}
// //           aria-label="Filter by Area"
// //         >
// //           <option value="">All Areas</option>
// //           {uniqueAreas.map((area) => (
// //             <option key={area} value={area}>
// //               {area}
// //             </option>
// //           ))}
// //         </Select>

// //         <SearchButton onClick={handleSearch}>Search</SearchButton>
// //         <ResetButton onClick={handleReset}>Reset</ResetButton>
// //       </SearchContainer>

// //       {/* Loading Indicator */}
// //       {loading && (
// //         <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
// //           Loading properties...
// //         </p>
// //       )}

// //       {/* Error Message */}
// //       {error && (
// //         <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
// //       )}

// //       {/* Properties Grid */}
// //       {!loading && !error && (
// //         <PropertiesGrid>
// //           {filteredProperties.length > 0 ? (
// //             filteredProperties.map((property) => (
// //               <PropertyCardComponent
// //                 key={property._id}
// //                 property={property}
// //                 handleCardClick={handleCardClick}
// //                 updatePropertyStatus={updatePropertyStatus}
// //               />
// //             ))
// //           ) : (
// //             <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
// //               No properties match your search criteria.
// //             </p>
// //           )}
// //         </PropertiesGrid>
// //       )}
// //     </PageContainer>
// //   );
// // };

// // export default PropertyView;


// import React, { useState, useEffect, useMemo } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import {
//   FaBed,
//   FaCar,
//   FaTree,
//   FaCalendarAlt,
//   FaRoad,
//   FaCity,
//   FaHome,
//   FaArrowsAlt,
//   FaDollarSign,
//   FaCheckCircle,
//   FaHourglassHalf,
//   FaTimesCircle,
//   FaBarcode,
// } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
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

// // --- Helper Functions --- //

// // Parse numbers that may be wrapped in an object (e.g. { $numberInt: "2" })
// const parseNumber = (val) => {
//   if (val && typeof val === 'object' && val.$numberInt) {
//     return parseInt(val.$numberInt, 10);
//   }
//   return val;
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

// // Returns a capitalized property subtype if it's a string
// const getPropertySubType = (subType) => {
//   if (typeof subType === 'string') {
//     return subType.charAt(0).toUpperCase() + subType.slice(1);
//   }
//   if (typeof subType === 'object' && subType !== null) {
//     for (const key in subType) {
//       if (subType[key]) {
//         return key.charAt(0).toUpperCase() + key.slice(1);
//       }
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

// // Returns the appropriate image based on propertySubType
// const getImageForPropertySubType = (propertySubType) => {
//   if (typeof propertySubType === 'object') {
//     for (const key in propertySubType) {
//       if (propertySubType[key]) {
//         return propertySubTypeImages[key] || defaultImg;
//       }
//     }
//   }
//   return propertySubTypeImages[propertySubType] || defaultImg;
// };

// // Formats the budget object into a price range string
// const formatBudget = (budget) => {
//   if (budget && typeof budget === 'object') {
//     const min = parseNumber(budget.min);
//     const max = parseNumber(budget.max);
//     return `PKR ${min} - PKR ${max}`;
//   }
//   return `PKR ${budget || 'N/A'}`;
// };

// // New: Use demand if available, otherwise use budget
// const getPrice = (property) => {
//   if (property.demand != null && property.demand !== "") {
//     return `PKR ${parseNumber(property.demand)}`;
//   } else {
//     return formatBudget(property.budget);
//   }
// };

// const getInquiryTypeLabel = (inquiryType) => {
//   if (typeof inquiryType === 'object' && inquiryType !== null) {
//     if (inquiryType.forSale) return { label: 'FOR SALE', color: '#E74C3C' };
//     if (inquiryType.forRent) return { label: 'FOR RENT', color: '#2ECC71' };
//     if (inquiryType.onRent) return { label: 'ON RENT', color: '#3498DB' };
//     if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: '#9B59B6' };
//   } else if (typeof inquiryType === 'string') {
//     const type = inquiryType.toLowerCase();
//     if (type.includes('sale')) return { label: 'FOR SALE', color: '#E74C3C' };
//     if (type.includes('rent')) return { label: 'FOR RENT', color: '#2ECC71' };
//     if (type.includes('purchase')) return { label: 'FOR PURCHASE', color: '#9B59B6' };
//   }
//   return { label: 'INQUIRY', color: '#95A5A6' };
// };

// // New helper to build complete address from available fields
// const getCompleteAddress = (property) => {
//   const addressParts = [];
//   if (property.streetName) addressParts.push(property.streetName);
//   if (property.phaseBlock) addressParts.push(property.phaseBlock);
//   if (property.district) addressParts.push(property.district);
//   if (property.city) addressParts.push(property.city);
//   return addressParts.join(', ');
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

// // --- Styled Components --- //

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
//   color: #2c3e50;

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

// const SubmitInquiryButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   border: none;
//   padding: 12px 25px;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #2980b9;
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
//   background: #ffffff;
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
//   border: 1px solid #bdc3c7;
//   border-radius: 5px;
//   font-size: 1em;
//   transition: border-color 0.3s;

//   &:focus {
//     border-color: #3498db;
//     outline: none;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Select = styled.select`
//   padding: 12px 15px;
//   width: 200px;
//   border: 1px solid #bdc3c7;
//   border-radius: 5px;
//   font-size: 1em;
//   background-color: #ffffff;
//   transition: border-color 0.3s;

//   &:focus {
//     border-color: #3498db;
//     outline: none;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchButton = styled.button`
//   padding: 12px 25px;
//   background-color: #2ecc71;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #27ae60;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const ResetButton = styled.button`
//   padding: 12px 25px;
//   background-color: #e74c3c;
//   color: white;
//   border: none;
//   border-radius: 25px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.3s;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #c0392b;
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
//   background: #ffffff;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s, box-shadow 0.3s;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   height: 100%;
//   cursor: pointer;

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
//   color: #2c3e50;
//   margin-bottom: 5px;
//   font-weight: 600;
// `;

// // New styled component for the subtitle (complete address)
// const PropertySubtitle = styled.h4`
//   font-size: 1.1em;
//   color: #7f8c8d;
//   margin-bottom: 10px;
//   font-weight: 400;
// `;

// const DetailItem = styled.p`
//   margin: 5px 0;
//   font-size: 0.95em;
//   color: #34495e;
//   display: flex;
//   align-items: center;
// `;

// const DetailLabel = styled.span`
//   font-weight: 600;
//   margin-right: 8px;
// `;

// const DetailIcon = styled.span`
//   margin-right: 8px;
//   color: #3498db;
//   display: flex;
//   align-items: center;
// `;

// const Badge = styled.span`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background-color: ${(props) => props.color || '#3498db'};
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
//   background-color: #3498db;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 0.9em;
//   transition: background-color 0.3s, transform 0.3s;

//   &:hover {
//     background-color: #2980b9;
//     transform: translateY(-2px);
//   }
// `;

// const PrintButton = styled(ActionButton)`
//   background-color: #2ecc71;

//   &:hover {
//     background-color: #27ae60;
//   }
// `;

// // --- Facilities Components --- //

// const FacilitiesContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
//   margin-top: 10px;
// `;

// const FacilityBadge = styled.span`
//   background-color: #ecf0f1;
//   color: #2c3e50;
//   padding: 4px 8px;
//   border-radius: 4px;
//   font-size: 0.8em;
// `;

// const PropertyFacilities = ({ facilities = [] }) => {
//   return (
//     <FacilitiesContainer>
//       {facilities.map((facility, index) =>
//         facility.value === "Y" ? (
//           <FacilityBadge key={index}>{facility.name}</FacilityBadge>
//         ) : null
//       )}
//     </FacilitiesContainer>
//   );
// };

// // --- Status Icons and Dropdown --- //

// const STATUS_OPTIONS = ['New', 'active', 'pending', 'sold'];

// const STATUS_ICONS = {
//   New: <FaCheckCircle color="blue" title="New" />,
//   active: <FaCheckCircle color="green" title="Active" />,
//   pending: <FaHourglassHalf color="orange" title="Pending" />,
//   sold: <FaTimesCircle color="red" title="Sold" />,
// };

// const StatusContainer = styled.div`
//   position: absolute;
//   top: 15px;
//   left: 15px;
// `;

// const StatusIcon = styled.div`
//   font-size: 1.5em;
//   cursor: pointer;
//   background-color: rgba(255, 255, 255, 0.9);
//   padding: 8px;
//   border-radius: 50%;
//   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StatusDropdown = styled.select`
//   position: absolute;
//   top: 55px;
//   left: 15px;
//   font-size: 1em;
//   z-index: 1000;
//   background-color: white;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// // --- Main Component --- //

// const PropertyView = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   // Using "district" for area filtering as per the document
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
//         const response = await axios.get(` http://localhost:6003/api/properties/all?userId=${userId}`);
//         if (!Array.isArray(response.data)) {
//           throw new Error('Invalid data format received from API.');
//         }
//         const sortedProperties = [...response.data].sort(
//           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//         );
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

//   // Extract unique cities and use "district" for areas
//   const uniqueCities = useMemo(() => {
//     return Array.from(new Set(properties.map((prop) => prop.city))).sort();
//   }, [properties]);

//   const uniqueAreas = useMemo(() => {
//     return Array.from(new Set(properties.map((prop) => prop.district))).sort();
//   }, [properties]);

//   const handleSearch = () => {
//     let filtered = [...properties];
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter((property) =>
//         (property.title || property.streetName || '').toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (selectedCity !== '') {
//       filtered = filtered.filter((property) => property.city === selectedCity);
//     }
//     if (selectedArea !== '') {
//       filtered = filtered.filter((property) => property.district === selectedArea);
//     }
//     setFilteredProperties(filtered);
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setSelectedCity('');
//     setSelectedArea('');
//     setFilteredProperties(properties);
//   };

//   const handleCardClick = (propertyId) => {
//     navigate(`/property/${propertyId}`);
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, selectedCity, selectedArea, properties]);

//   const updatePropertyStatus = (propertyId, newStatus) => {
//     setFilteredProperties((prevProperties) =>
//       prevProperties.map((prop) =>
//         prop._id === propertyId ? { ...prop, status: newStatus } : prop
//       )
//     );
//     setProperties((prevProperties) =>
//       prevProperties.map((prop) =>
//         prop._id === propertyId ? { ...prop, status: newStatus } : prop
//       )
//     );
//   };

//   const PropertyCardComponent = ({ property, handleCardClick, updatePropertyStatus }) => {
//     const [status, setStatus] = useState(property.status || 'New');
//     const [showStatusDropdown, setShowStatusDropdown] = useState(false);

//     const handleStatusClick = (e) => {
//       e.stopPropagation();
//       setShowStatusDropdown(!showStatusDropdown);
//     };

//     const handleStatusChange = async (e) => {
//       const newStatus = e.target.value;
//       const previousStatus = status;
//       setStatus(newStatus);
//       try {
//         const token = localStorage.getItem('token');
//         const headers = { Authorization: `Bearer ${token}` };
//         const response = await axios.patch(
//           ` http://localhost:6003/api/properties/updateStatus/${property._id}`,
//           { status: newStatus },
//           { headers }
//         );
//         alert('Status updated successfully!');
//         updatePropertyStatus(property._id, newStatus);
//         setShowStatusDropdown(false);
//       } catch (error) {
//         setStatus(previousStatus);
//         alert(
//           `Failed to update status: ${
//             error.response ? error.response.data.message : error.message
//           }`
//         );
//         console.error('Failed to update status:', error);
//       }
//     };

//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (
//           showStatusDropdown &&
//           !event.target.closest('.status-dropdown') &&
//           !event.target.closest('.status-icon')
//         ) {
//           setShowStatusDropdown(false);
//         }
//       };
//       document.addEventListener('click', handleClickOutside);
//       return () => {
//         document.removeEventListener('click', handleClickOutside);
//       };
//     }, [showStatusDropdown]);

//     // Determine bedroom count from property.floors if property.bedrooms is not available
//     const bedroomCount =
//       property.bedrooms ||
//       (property.floors &&
//         property.floors.length > 0 &&
//         property.floors[0].features &&
//         parseNumber(property.floors[0].features["Bedroom"])) ||
//       'N/A';

//     return (
//       <PropertyCard onClick={() => handleCardClick(property._id)}>
//         <StatusContainer>
//           <StatusIcon className="status-icon" onClick={handleStatusClick}>
//             {STATUS_ICONS[status] || STATUS_ICONS['New']}
//           </StatusIcon>
//           {showStatusDropdown && (
//             <StatusDropdown
//               className="status-dropdown"
//               value={status}
//               onChange={handleStatusChange}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {STATUS_OPTIONS.map((option) => (
//                 <option key={option} value={option}>
//                   {option.charAt(0).toUpperCase() + option.slice(1)}
//                 </option>
//               ))}
//             </StatusDropdown>
//           )}
//         </StatusContainer>

//         <PropertyImage
//           src={
//             property.frontPictures && property.frontPictures.length > 0
//               ? ` http://localhost:6003/${property.frontPictures[0]}`
//               : property.propertyPictures && property.propertyPictures.length > 0
//               ? ` http://localhost:6003/${property.propertyPictures[0]}`
//               : getImageForPropertySubType(property.propertySubType)
//           }
//           alt={property.title || property.streetName || 'Property Image'}
//         />

//         <PropertyInfo>
//           <div>
//             {/* Title is now "Property Subtype - Inquiry Type" */}
//             <PropertyTitle>
//               {`${getPropertySubType(property.propertySubType)} - ${getInquiryTypeLabel(property.inquiryType).label}`}
//             </PropertyTitle>
//             {/* Subtitle is the complete address */}
//             <PropertySubtitle>
//               {getCompleteAddress(property)}
//             </PropertySubtitle>
//             <DetailItem>
//               <DetailIcon>
//                 <FaBarcode />
//               </DetailIcon>
//               <DetailLabel>Property Code:</DetailLabel> {property.propertyCode || 'N/A'}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaHome />
//               </DetailIcon>
//               <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaCity />
//               </DetailIcon>
//               <DetailLabel>City:</DetailLabel> {property.city || 'N/A'}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaArrowsAlt />
//               </DetailIcon>
//               <DetailLabel>District:</DetailLabel> {property.district || 'N/A'}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaArrowsAlt />
//               </DetailIcon>
//               <DetailLabel>Phase Block:</DetailLabel> {property.phaseBlock || 'N/A'}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaBed />
//               </DetailIcon>
//               <DetailLabel>Bedrooms:</DetailLabel> {bedroomCount}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaDollarSign />
//               </DetailIcon>
//               <DetailLabel>Price:</DetailLabel> {getPrice(property)}
//             </DetailItem>
//             <DetailItem>
//               <DetailIcon>
//                 <FaCalendarAlt />
//               </DetailIcon>
//               <DetailLabel>Date Added:</DetailLabel> {formatDate(property.updatedAt)}
//             </DetailItem>
//             {/* Display available facilities */}
//             <PropertyFacilities facilities={property.facilities} />
//           </div>

//           <ActionButtonsContainer>
//             <ActionButton
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleWhatsAppShare(property.title || property.streetName || 'No Title', window.location.href);
//               }}
//             >
//               WhatsApp
//             </ActionButton>
//             <ActionButton
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleEmailShare(property.title || property.streetName || 'No Title', window.location.href);
//               }}
//             >
//               Email
//             </ActionButton>
//             <PrintButton
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handlePrint();
//               }}
//             >
//               Print
//             </PrintButton>
//           </ActionButtonsContainer>
//         </PropertyInfo>

//         <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
//           {getInquiryTypeLabel(property.inquiryType).label}
//         </Badge>
//       </PropertyCard>
//     );
//   };

//   return (
//     <PageContainer>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//         <h1>Property Bank</h1>
//       </Header>

//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
//           <SubmitInquiryButton>Submit An Inquiry</SubmitInquiryButton>
//         </Link>
//       </div>

//       <SearchContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           aria-label="Search Properties by Title"
//         />
//         <Select
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//           aria-label="Filter by City"
//         >
//           <option value="">All Cities</option>
//           {uniqueCities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </Select>
//         <Select
//           value={selectedArea}
//           onChange={(e) => setSelectedArea(e.target.value)}
//           aria-label="Filter by District"
//         >
//           <option value="">All Districts</option>
//           {uniqueAreas.map((area) => (
//             <option key={area} value={area}>
//               {area}
//             </option>
//           ))}
//         </Select>
//         <SearchButton onClick={handleSearch}>Search</SearchButton>
//         <ResetButton onClick={handleReset}>Reset</ResetButton>
//       </SearchContainer>

//       {loading && (
//         <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
//           Loading properties...
//         </p>
//       )}
//       {error && (
//         <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
//       )}
//       {!loading && !error && (
//         <PropertiesGrid>
//           {filteredProperties.length > 0 ? (
//             filteredProperties.map((property) => (
//               <PropertyCardComponent
//                 key={property._id}
//                 property={property}
//                 handleCardClick={handleCardClick}
//                 updatePropertyStatus={updatePropertyStatus}
//               />
//             ))
//           ) : (
//             <p style={{ color: '#2c3e50', textAlign: 'center', fontSize: '1.2em' }}>
//               No properties match your search criteria.
//             </p>
//           )}
//         </PropertiesGrid>
//       )}
//     </PageContainer>
//   );
// };

// export default PropertyView;



import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import html2canvas from 'html2canvas';
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
import { Link, useNavigate } from 'react-router-dom';
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

// --- Helper Functions ---
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

const formatBudget = (budget) => {
  if (budget && typeof budget === 'object') {
    const min = parseNumber(budget.min);
    const max = parseNumber(budget.max);
    return `PKR ${min} - PKR ${max}`;
  }
  return `PKR ${budget || 'N/A'}`;
};

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

const getCompleteAddress = (property) => {
  const addressParts = [];
  if (property.streetName) addressParts.push(property.streetName);
  if (property.phaseBlock) addressParts.push(property.phaseBlock);
  if (property.district) addressParts.push(property.district);
  if (property.city) addressParts.push(property.city);
  return addressParts.join(', ');
};

// Updated to open Gmail's compose window in a new tab
const handleEmailShare = (title, url) => {
  const subject = `Interesting Property Alert: ${title}`;
  const emailBody = `I found this interesting property and thought you might want to see it.\n\nImage Link: ${url}`;
  const subjectEncoded = encodeURIComponent(subject);
  const bodyEncoded = encodeURIComponent(emailBody);
  // Compose URL for Gmail:
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subjectEncoded}&body=${bodyEncoded}`;
  window.open(gmailLink, '_blank');
};

const handleWhatsAppShare = (title, url) => {
  const text = `Check out this property: ${title}\n\nImage Link: ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

const handlePrint = () => {
  window.print();
};

// --- New Helper Functions for Capturing & Uploading Card Image ---
const BASE_URL = 'http://localhost:5000';

const captureCardAsImage = async (cardElement) => {
  try {
    const canvas = await html2canvas(cardElement, { useCORS: true });
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  } catch (error) {
    console.error('Error capturing card image:', error);
    throw error;
  }
};

const uploadImage = async (dataURL) => {
  try {
    const blob = await (await fetch(dataURL)).blob();
    const formData = new FormData();
    formData.append('file', blob, 'property-card.png');

    const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.url;
  } catch (error) {
    console.error('Error uploading card image:', error);
    throw error;
  }
};

// --- Styled Components ---
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

/* Container that holds the share buttons. */
const ShareButtonsContainer = styled.div.attrs({
  className: 'share-buttons',
})`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  align-items: center; /* So spinner and buttons align nicely */
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

// A simple spinner styled component
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

// --- Facilities Component ---
const PropertyFacilities = ({ facilities = [] }) => {
  return (
    <FacilitiesContainer>
      {facilities.map((facility, index) =>
        facility.value === 'Y' ? (
          <FacilityBadge key={index}>{facility.name}</FacilityBadge>
        ) : null
      )}
    </FacilitiesContainer>
  );
};

const STATUS_OPTIONS = ['New', 'active', 'pending', 'sold'];
const STATUS_ICONS = {
  New: <FaCheckCircle color="blue" title="New" />,
  active: <FaCheckCircle color="green" title="Active" />,
  pending: <FaHourglassHalf color="orange" title="Pending" />,
  sold: <FaTimesCircle color="red" title="Sold" />,
};

// --- Main Component ---
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
        const response = await axios.get(
          ` http://localhost:6003/api/properties/all?userId=${userId}`
        );
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format received from API.');
        }
        const sortedProperties = [...response.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setProperties(sortedProperties);
        setFilteredProperties(sortedProperties);
        setLoading(false);
        console.log('Fetched properties:', sortedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const uniqueCities = useMemo(() => {
    return Array.from(new Set(properties.map((prop) => prop.city))).sort();
  }, [properties]);

  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(properties.map((prop) => prop.district))).sort();
  }, [properties]);

  const handleSearch = () => {
    let filtered = [...properties];
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((property) =>
        (property.title || property.streetName || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedArea('');
    setFilteredProperties(properties);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [searchTerm, selectedCity, selectedArea, properties]);

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

  const PropertyCardComponent = ({ property, updatePropertyStatus }) => {
    const [status, setStatus] = useState(property.status || 'New');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const cardRef = useRef(null);
    // New local state for controlling the spinner
    const [isSharing, setIsSharing] = useState(false);

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
          ` http://localhost:6003/api/properties/updateStatus/${property._id}`,
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

    const bedroomCount =
      property.bedrooms ||
      (property.floors &&
        property.floors.length > 0 &&
        property.floors[0].features &&
        parseNumber(property.floors[0].features['Bedroom'])) ||
      'N/A';

    // -- Our consolidated handleShare function with spinner --
    const handleShare = async (event, shareType, property) => {
      event.stopPropagation();
      if (!cardRef.current) return;

      // Show spinner
      setIsSharing(true);

      // 1) Hide share buttons
      const shareButtons = cardRef.current.querySelector('.share-buttons');
      if (shareButtons) {
        shareButtons.style.display = 'none';
        // short delay to ensure style is applied
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      try {
        // 2) Capture the card
        const dataURL = await captureCardAsImage(cardRef.current);

        // 3) Upload the image to server
        const imageUrl = await uploadImage(dataURL);

        // 4) Copy the URL to clipboard
        await navigator.clipboard.writeText(imageUrl);

        // 5) Share via chosen method
        switch (shareType) {
          case 'whatsapp':
            handleWhatsAppShare( 'check out this property', imageUrl);
            break;
          case 'email':
            handleEmailShare( 'check out this property', imageUrl);
            break;
          case 'print':
            handlePrint();
            break;
          default:
            console.log('Unknown share type:', shareType);
        }
      } catch (error) {
        console.error('Error sharing property ad image:', error);
      } finally {
        // 6) Show share buttons again
        if (shareButtons) {
          shareButtons.style.display = '';
        }
        // Hide spinner
        setIsSharing(false);
      }
    };

    return (
      <PropertyCard
        ref={cardRef}
        onClick={(e) => {
          e.stopPropagation();
          // If needed, handle a click on the card here
        }}
      >
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
              ? ` http://localhost:6003/${property.frontPictures[0]}`
              : property.propertyPictures && property.propertyPictures.length > 0
              ? ` http://localhost:6003/${property.propertyPictures[0]}`
              : getImageForPropertySubType(property.propertySubType)
          }
          alt={property.title || property.streetName || 'Property Image'}
        />

        <PropertyInfo>
          <div>
            <PropertyTitle>
              {`${getPropertySubType(property.propertySubType)} - ${
                getInquiryTypeLabel(property.inquiryType).label
              }`}
            </PropertyTitle>
            <PropertySubtitle>{getCompleteAddress(property)}</PropertySubtitle>
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

          {/* The container that holds the share buttons now includes a spinner if isSharing is true */}
          <ShareButtonsContainer>
            {isSharing && <Spinner />}
            <ActionButton onClick={(e) => handleShare(e, 'whatsapp', property)}>
              WhatsApp
            </ActionButton>
            <ActionButton onClick={(e) => handleShare(e, 'email', property)}>
              Email
            </ActionButton>
          </ShareButtonsContainer>
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
        <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>
      )}
      {!loading && !error && (
        <PropertiesGrid>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCardComponent
                key={property._id}
                property={property}
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
