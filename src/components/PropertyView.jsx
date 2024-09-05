import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaBed, FaBath, FaRulerCombined, FaCar, FaTree,FaCalendarAlt , FaRoad,FaCity, FaHome, FaArrowsAlt, FaDollarSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import bgImage from '../images/bg.jpg';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // weekday: 'long'
  });
};



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

const PropertiesGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 50px; 
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  color: white;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const PropertyCard = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease-in-out;
  margin: 10px; // Adds spacing around the card
  // background: lightgrey;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 768px) {
    flex-direction: row; // Use row layout for larger screens
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px; // Round corners for the image
  border-top-right-radius: 8px;
    // padding: 5px; // Increased padding for content

  @media (min-width: 768px) {
    width: 340px;
    height: 100%;
    border-top-right-radius: 0; // Adjust rounding for larger screens
    border-bottom-left-radius: 8px;
  }
`;

const PropertyInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px; // Increased padding for content
  background: #fff;
  flex-grow: 1;

  @media (min-width: 768px) {
    border-left: 1px solid #ccc; // Separator appears only on larger screens
  }
`;

// const DetailsButton = styled.button`
//   background-color: red;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: darkred;
//   }
// `;

const DetailsButton = styled(Link)`
  background-color: red;
  color: white;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none; // Remove underline from links

  &:hover {
    background-color: darkred;
  }
`;


// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh;
//   padding: 20px;
// `;
// // const PropertiesGrid = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   justify-content: center;
// //   gap: 20px;
// //   padding: 20px;
// // `;

// // const PropertyCard = styled.div`
// //   width: 600px;
// //   height: 350px;  // Increased height for better spacing
// //   border: 1px solid #ccc;
// //   border-radius: 8px;
// //   overflow: hidden;
// //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// //   display: flex;
// //   flex-direction: row;  // Change direction to row
// //   position: relative; 
// //   transition: transform 0.3s ease-in-out;

// //   &:hover {
// //     transform: translateY(-5px);
// //   }
// // `;

// const PropertiesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); // Adjusting grid for responsiveness
//   gap: 20px;
//   padding: 20px;
// `;

// const PropertyCard = styled.div`
//   width: 100%; // Takes full width of the grid column
//   max-width: 600px; // Maintains max width on larger screens
//   height: auto; // Height auto for responsive adjustments
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column; // Better for mobile
//   position: relative;
//   transition: transform 0.3s ease-in-out;

//   &:hover {
//     transform: translateY(-5px);
//   }

//   @media (min-width: 768px) {
//     flex-direction: row; // Use row layout for larger screens
//   }
// `;


// const PropertyInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;  // Distribute space
//   padding: 10px;
//   background: #fff;
//   flex-grow: 1;
//   border-left: 1px solid #ccc;  // Separator between image and text
// `;

const PropertyTitle = styled.h3`
  font-size: 1.2em;
  color: #333;
  margin: 0;  // Remove margin for tighter spacing
`;

// const PropertyImage = styled.img`
//   width: 340px;  // Fixed width for the image
//   height: 100%;  // Full height of the card
//   object-fit: cover;  // Cover the designated area fully
// `;

// const PropertyImage = styled.img`
//   width: 100%; // Full width on smaller screens
//   height: 200px; // Adjust height to be fixed on smaller screens
//   object-fit: cover;

//   @media (min-width: 768px) {
//     width: 340px; // Fixed width for larger screens
//     height: 100%; // Full height of the card
//   }
// `;

// const PropertyInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 10px;
//   background: #fff;
//   flex-grow: 1;

//   @media (min-width: 768px) {
//     border-left: 1px solid #ccc; // Separator appears only on larger screens
//   }
// `;


// const Badge = styled.span`
//   position: absolute;
//   top: 10px;  // Position at the top of the card
//   right: 10px;  // Position at the right of the card
//   background-color: #007BFF;  // Blue background for consistency
//   color: white;
//   padding: 5px 10px;
//   border-radius: 15px;
//   font-weight: bold;
// `;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${(props) => props.color || '#007BFF'};  // Use prop color or default to blue
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
`;

// const DetailsButton = styled.button`
//   background-color: red;  // Blue background
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: darkred;  // Darker on hover
//   }
// `;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px; // Adjusted for better spacing
`;

const ActionButton = styled.button`
  background-color: red;  // A shade of green
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 8px;  // Adds spacing to the right of each button

  &:hover {
    background-color: darkred;  // Darker green on hover
  }

  &:last-child {
    margin-right: 0;  // Removes margin from the last button to avoid extra space at the end
  }
`;


const PrintButton = styled(ActionButton)`
  background-color: red;  // Red for the print button

  &:hover {
    background-color: darkred;  // Darker red on hover
  }
`;

const SubmitInquiryButton = styled.button`
  background-color: red; // Use the theme's blue color
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-bottom: 20px; // Space from the button to the grid

  &:hover {
    background-color: #8B0000; // Darker shade on hover
  }
`;


const FeaturesIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const DetailItem = styled.p`
  margin: 5px 0; // Adjust spacing as needed
  font-size: 1em; // Adjust font size as needed
`;

const DetailLabel = styled.span`
  font-weight: bold; // Makes the text bold
`;

const DetailIcon = styled.span`
  margin-right: 8px; // Space between icon and text
  display: inline-flex; // Aligns icon with the text vertically
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 50px;
  background-color: #333; // Subtle dark background
  border: 2px solid #ff0000; // Border to match red theme
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px; // Adjusted padding for better appearance
  border-radius: 10px; // More rounded corners
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for depth
  width: 200px; // Match the width of other buttons
  height: 60px; // Match the height of other buttons
  transition: background-color 0.3s, transform 0.3s; // Smooth transition effects

  &:hover {
    background-color: #ff0000; // Match hover effect with the red theme
    transform: translateY(-2px); // Slight lift on hover
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;


const FeatureIcon = ({ feature, IconComponent }) => (
  feature ? <IconComponent size="20" /> : null
);
const PropertyFeatures = ({ features }) => (
  <FeaturesIcons>
    <FeatureIcon feature={features.garage} IconComponent={FaCar} title="Garage" />
    <FeatureIcon feature={features.garden} IconComponent={FaTree} title="Garden" />
    <FeatureIcon feature={features.mainRoad} IconComponent={FaRoad} title="Main Road" />
  </FeaturesIcons>
);


const handleWhatsAppShare = (title, url) => {
  const text = `Check out this property: ${title}, ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
};

const handleEmailShare = (title, url) => {
  const subject = `Interesting Property Alert: ${title}`;
  const emailBody = `I found this interesting property and thought you might want to see it: ${url}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(mailtoUrl, 'https://mail.google.com/'); // Ensure it opens in a new tab or window
};


const handlePrint = () => {
  window.print();
};


const getPropertySubType = (subTypes) => {
  for (const key in subTypes) {
    if (subTypes[key]) {
      return key.charAt(0).toUpperCase() + key.slice(1);  // Capitalize the first letter for display
    }
  }
  return 'Unknown';  // Default case if no subtype is true
};



const getInquiryTypeLabel = (inquiryType) => {
  if (inquiryType.forSale) return { label: 'FOR SALE', color: 'red' };
  if (inquiryType.forRent) return { label: 'FOR RENT', color: 'green' };
  if (inquiryType.onRent) return { label: 'ON RENT', color: 'blue' };
  if (inquiryType.forPurchase) return { label: 'FOR PURCHASE', color: 'dodgerblue' };
  return { label: 'INQUIRY', color: 'grey' }; // Default case
};


const PropertyView = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);  // Decode the JWT
        const userId = decoded.userId;      // Extract the user ID from the token

        const response = await axios.get(`http://localhost:5000/api/properties/all?userId=${userId}`);
        // const response = await axios.get('http://localhost:5000/api/properties/all');
        setProperties(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (

    <PageContainer>

<Header>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
          <h1>Property Bank</h1>
          {/* <Logo>Logo</Logo> */}
        </Header>

         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
       <Link to="/CheckCustomer"> 
    <SubmitInquiryButton onClick={() => console.log('Navigate to inquiry form')}>
      Submit An Inquiry
    </SubmitInquiryButton>
    </Link>
  </div>
    <PropertiesGrid>
      {properties.map(property => (
        <PropertyCard key={property._id}>
          {/* <PropertyImage src={property.images[0] ? `http://localhost:5000/uploads/${property.images[0]}` : 'http://localhost:5000/uploads/bg.jpg'} alt={property.title} /> */}
          <PropertyImage 
  src={property.images[0] ? `http://localhost:5000/${property.images[0]}` : 'http://localhost:5000/uploads/bg.jpg'} 
  alt={property.title}
/>

          <PropertyInfo>
          <div>
    <br />
    <PropertyTitle>{property.title}</PropertyTitle>
    <br/>
    <DetailItem>
      <DetailIcon><FaHome /></DetailIcon>
      <DetailLabel>Type:</DetailLabel> {getPropertySubType(property.propertySubType)}
    </DetailItem>
    <DetailItem>
      <DetailIcon><FaCity /></DetailIcon>
      <DetailLabel>City:</DetailLabel> {property.city}
    </DetailItem>
    <DetailItem>
      <DetailIcon><FaArrowsAlt /></DetailIcon>
      <DetailLabel>Area:</DetailLabel> {property.area}
    </DetailItem>
    <DetailItem>
      <DetailIcon><FaBed /></DetailIcon>
      <DetailLabel>Bedrooms:</DetailLabel> {property.bedrooms}
    </DetailItem>
    <DetailItem>
      <DetailIcon><FaDollarSign /></DetailIcon>
      <DetailLabel>Price:</DetailLabel> ${property.budget}
    </DetailItem>
    <DetailItem>
      <DetailIcon><FaCalendarAlt /></DetailIcon>
      <DetailLabel>Date Added :</DetailLabel> {formatDate(property.updatedAt)}
    </DetailItem>
    <PropertyFeatures features={property.features} />
    <br/>
  </div>

  <DetailsButton as={Link} to={`/property/${property._id}`}>Details</DetailsButton>
            <ActionButtonsContainer>
              <ActionButton onClick={() => handleWhatsAppShare(property.title, window.location.href)}>Share on WhatsApp</ActionButton>
              <ActionButton onClick={() => handleEmailShare(property.title, window.location.href)}>Share via Email</ActionButton>
              <PrintButton onClick={handlePrint}>Print</PrintButton>
            </ActionButtonsContainer>
          </PropertyInfo>
          {/* <Badge>{getInquiryTypeLabel(property.inquiryType).label}</Badge> */}
          <Badge color={getInquiryTypeLabel(property.inquiryType).color}>
  {getInquiryTypeLabel(property.inquiryType).label}
</Badge>
          <br/>
        </PropertyCard>
      ))}
    </PropertiesGrid>
    </PageContainer>
  );
  
  

  
  };

export default PropertyView;