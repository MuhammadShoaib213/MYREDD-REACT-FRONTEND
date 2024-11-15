// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';
// import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTree, FaCar, FaBuilding } from 'react-icons/fa';
// import bgImage from '../images/bg.jpg';
// import {  useNavigate } from 'react-router-dom';



// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh;
//   padding: 20px;
//   padding-top: 135px;
//   overflow-x: hidden; /* Prevent horizontal overflow */

//   @media (max-width: 768px) {
//     padding: 40px;
//     padding-top: 60px;
//   }
// `;

// const PropertyContainer = styled.div`
//   display: flex;
//   background: #fff;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//   margin: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   max-width: 100%; /* Prevent overflow */

//   @media (max-width: 768px) {
//     flex-direction: column;
//     margin: 10px;
//     padding: 10px;
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   width: 100%;
//   padding: 20px;
//   color: white;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;



// const LeftPanel = styled.div`
//   width: 35%;
//   padding: 20px;
//   border-right: 1px solid #ccc;
//   max-width: 100%; /* Prevent overflow */

//   @media (max-width: 768px) {
//     width: 100%;
//     border-right: none;
//     border-bottom: 1px solid #ccc;
//     padding: 10px;
//   }
// `;

// const RightPanel = styled.div`
//   width: 65%;
//   padding: 20px;
//   max-width: 100%; /* Prevent overflow */

//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 10px;
//   }
// `;

// const DetailSection = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   column-gap: 20px;
//   row-gap: 10px;
//   max-width: 100%; /* Prevent overflow */

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     row-gap: 5px;
//   }
// `;

// const TabList = styled.div`
//   display: flex;
//   background-color: #f1f1f1;
//   max-width: 95%; /* Prevent overflow */

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const TabButton = styled.button`
//   flex-grow: 1;
//   padding: 10px 20px;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   background-color: ${props => props.isActive ? 'red' : '#f1f1f1'};
//   border-bottom: ${props => props.isActive ? '2px solid grey' : 'none'};
//   max-width: 100%; /* Prevent overflow */

//   &:hover {
//     background-color: darkred;
//   }

//   @media (max-width: 768px) {
//     padding: 10px;
//     font-size: 14px;
//   }
// `;


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

// // const PropertyContainer = styled.div`
// //   display: flex;
// //   background: #fff;
// //   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
// //   margin: 20px;
// //   border: 1px solid #ccc;
// //   border-radius: 8px;
// // `;

// // const Header = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   width: 100%;
// //   padding: 20px;
// //   color: white;
// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     padding: 10px;
// //   }
// // `;

// // const LeftPanel = styled.div`
// //   width: 35%;
// //   padding: 20px;
// //   border-right: 1px solid #ccc;
// // `;

// // const RightPanel = styled.div`
// //   width: 65%;
// //   padding: 20px;
// // `;

// const Image = styled.img`
//   width: 95%;
//   height: auto;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
// `;

// const Title = styled.h1`
//   margin-bottom: 10px;
// `;

// const Price = styled.p`
//   font-size: 24px;
//   color: red;
// `;

// const IconText = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
// `;

// const Icon = styled.span`
//   margin-right: 10px;
// `;

// const TabsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// // const TabList = styled.div`
// //   display: flex;
// //   background-color: #f1f1f1;
// // `;

// // const TabButton = styled.button`
// //   flex-grow: 1;
// //   padding: 10px 20px;
// //   border: none;
// //   outline: none;
// //   cursor: pointer;
// //   background-color: ${props => props.isActive ? '#fff' : '#f1f1f1'};
// //   border-bottom: ${props => props.isActive ? '2px solid blue' : 'none'};

// //   &:hover {
// //     background-color: #ddd;
// //   }
// // `;

// const Content = styled.div`
//   padding: 20px;
//   background-color: #fff;
//   border: 1px solid #ccc;
// `;

// // const DetailSection = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(2, 1fr);
// //   column-gap: 20px;
// //   row-gap: 10px;
// // `;

// const DetailItem = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 16px;
// `;

// const Label = styled.span`
//   font-weight: bold;
// `;

// const Value = styled.span`
//   margin-left: 5px;
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 135px;
//   background-color: #333; // Subtle dark background
//   border: 2px solid #ff0000; // Border to match red theme
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   padding: 15px 20px; // Adjusted padding for better appearance
//   border-radius: 10px; // More rounded corners
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for depth
//   width: 200px; // Match the width of other buttons
//   height: 60px; // Match the height of other buttons
//   transition: background-color 0.3s, transform 0.3s; // Smooth transition effects
//   z-index: 1000;

//   &:hover {
//     background-color: #ff0000; // Match hover effect with the red theme
//     transform: translateY(-2px); // Slight lift on hover
//   }

//   @media (max-width: 768px) {
//     font-size: 14px;
//     width: 100%;
//     height: auto;
//     left: 10px;
//   }
// `;

// const TabContent = ({ activeTab, property }) => {
//   switch (activeTab) {
//     case 'overview':
//       return (
//         <Content>
//           <DetailSection>
//             <DetailItem><Label>Offering:</Label><Value>Home</Value></DetailItem>
//             <DetailItem><Label>Type:</Label><Value>Residential</Value></DetailItem>
//             <DetailItem><Label>Size:</Label><Value>{property.area}</Value></DetailItem>
//             <DetailItem><Label>Purpose:</Label><Value>{property.purpose}</Value></DetailItem>
//             <DetailItem><Label>Owner City:</Label><Value>{property.city}</Value></DetailItem>
//             <DetailItem><Label>Owner Name:</Label><Value>{property.userId}</Value></DetailItem>
//           </DetailSection>
//         </Content>
//       );
//     case 'location':
//       return <Content>Location & Nearby content...</Content>;
//     case 'payment':
//       return <Content>Payment Details content...</Content>;
//     default:
//       return <Content>Select a tab</Content>;
//   }
// };

// const PropertyTabs = ({ property }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   return (
//     <TabsContainer>
//       <TabList>
//         <TabButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
//           Overview
//         </TabButton>
//         <TabButton isActive={activeTab === 'location'} onClick={() => setActiveTab('location')}>
//           Location & Nearby
//         </TabButton>
//         <TabButton isActive={activeTab === 'payment'} onClick={() => setActiveTab('payment')}>
//           Payment Details
//         </TabButton>
//       </TabList>
//       <TabContent activeTab={activeTab} property={property} />
//     </TabsContainer>
//   );
// };

// const PropertyDetailsPage = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/properties/property/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         setProperty(response.data);
//       } catch (err) {
//         setError('Failed to fetch property details');
//         console.error(err);
//       }
//     };

//     fetchPropertyDetails();
//   }, [id]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!property) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <PageContainer>
//       <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//           <Header>
//           <h1>Property Details</h1>
//           {/* <Logo>Logo</Logo> */}
//         </Header>
//     <PropertyContainer>
//       <LeftPanel>
//       <Image 
//   src={property.images[0] ? `http://localhost:5000/${property.images[0]}` : 'http://localhost:5000/uploads/bg.jpg'} 
//   alt={property.title}
// />
//         <Title>{property.title || "Home"}</Title>
//         <Price>Rs {property.budget || "Price Not Available"}</Price>
//         <IconText>
//           <Icon><FaMapMarkerAlt /></Icon>
//           <span>{property.location}</span>
//         </IconText>
//         <IconText>
//           <Icon><FaPhone /></Icon>
//           <span>{property.contact || "No Contact Info"}</span>
//         </IconText>
//         <IconText>
//           <Icon><FaEnvelope /></Icon>
//           <span>{property.email || "No Email Provided"}</span>
//         </IconText>
//       </LeftPanel>
//       <RightPanel>
//         <PropertyTabs property={property} />
//       </RightPanel>
//     </PropertyContainer>
//     </PageContainer>
//   );
// };

// export default PropertyDetailsPage;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'; // Corrected import
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import bgImage from '../images/bg.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components

const PageContainer = styled.div`
  --navbar-height: 80px;
  --header-height: 60px;

  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  padding: 20px;
  padding-top: calc(var(--navbar-height) + var(--header-height) + 20px); /* Adjust as needed */
  overflow-x: hidden; /* Prevent horizontal overflow */

  @media (max-width: 768px) {
    padding: 40px 20px;
    padding-top: calc(var(--navbar-height) + var(--header-height) + 20px); /* Adjust if navbar height changes on mobile */
  }
`;

const PropertyContainer = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  border-radius: 12px;
  max-width: 1200px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 10px;
    box-shadow: none;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center; /* Center the title */
  align-items: center;
  width: 100%;
  padding: 60px 40px;
  color: white;
  position: fixed;
  top: var(--navbar-height); /* Position below navbar */
  left: 0;
  z-index: 1010; /* Ensure it's above the navbar */

  h1 {
    margin: 0;
    font-size: 24px;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;

    h1 {
      font-size: 20px;
      text-align: center;
      width: 100%;
    }
  }
`;

const BackButton = styled.button`
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  position: fixed;
  top: calc(var(--navbar-height) + var(--header-height)); /* Position below navbar and Header */
  left: 20px;
  z-index: 1011; /* Ensure it's above Header and navbar */

  &:hover {
    background-color: #ff0000;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    top: calc(var(--navbar-height) + var(--header-height)); /* Adjust if navbar height changes on mobile */
    left: 10px;
    width: 150px;
    font-size: 14px;
  }
`;

const UpdateButton = styled.button`
  background-color: #007bff; /* Blue for Update */
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  margin-top: 10px; /* Add spacing from above elements */

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SaveButton = styled.button`
  background-color: #28a745; /* Green for Save */
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545; /* Red for Cancel */
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  margin-top: 10px;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const LeftPanel = styled.div`
  width: 40%;
  padding: 30px;
  background-color: #f9f9f9;
  border-right: 1px solid #eee;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    padding: 20px;
  }
`;

const RightPanel = styled.div`
  width: 60%;
  padding: 30px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  object-fit: cover;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const Price = styled.p`
  font-size: 22px;
  color: #e74c3c;
  margin-bottom: 20px;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #555;

  svg {
    margin-right: 10px;
    color: #e74c3c;
  }
`;

const TabsContainer = styled.div`
  margin-top: 20px;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#fff' : '#f1f1f1')};
  border-bottom: ${(props) => (props.isActive ? '2px solid #007bff' : 'none')};
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-top: none;
  border-radius: 0 0 12px 12px;

  @media (max-width: 768px) {
    border-radius: 0 0 0 0;
  }
`;

const DetailSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 10px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

const Value = styled.span`
  margin-left: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    font-weight: 600;
    margin-bottom: 5px;
    display: block;
    color: #333;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

// Tab Content Component

const TabContent = ({ activeTab, property, isEditing, formData, handleChange, handleSave, handleCancel }) => {
  if (isEditing) {
    return (
      <Content>
        <Form onSubmit={handleSave}>
          <FormGroup>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="budget">Budget (Rs)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {/* Add more fields as needed */}
          <ButtonGroup>
            <SaveButton type="submit">
              <FaSave /> Update
            </SaveButton>
            <CancelButton type="button" onClick={handleCancel}>
              <FaTimes /> Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </Content>
    );
  }

  // View Mode
  switch (activeTab) {
    case 'overview':
      return (
        <Content>
          <DetailSection>
            <DetailItem>
              <Label>Title:</Label>
              <Value>{property.title}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Budget:</Label>
              <Value>Rs {property.budget}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Location:</Label>
              <Value>{property.location}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Contact:</Label>
              <Value>{property.contact}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Email:</Label>
              <Value>{property.email}</Value>
            </DetailItem>
            {/* Add more fields as needed */}
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

const PropertyTabs = ({ property, isEditing, formData, handleChange, handleSave, handleCancel }) => {
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
      <TabContent
        activeTab={activeTab}
        property={property}
        isEditing={isEditing}
        formData={formData}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel} // Pass handleCancel down
      />
    </TabsContainer>
  );
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({
    images: [], // Initialize images as an empty array
    title: '',
    budget: '',
    location: '',
    contact: '',
    email: '',
    // Add other fields as needed
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    location: '',
    contact: '',
    email: '',
    // Add other fields as needed
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/property/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setProperty(response.data);
        // Initialize formData with fetched property data
        setFormData({
          title: response.data.title || '',
          budget: response.data.budget || '',
          location: response.data.location || '',
          contact: response.data.contact || '',
          email: response.data.email || '',
          // Initialize other fields as needed
        });
      } catch (err) {
        setError('Failed to fetch property details');
        console.error(err);
        toast.error('Failed to fetch property details.');
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to update (excluding images and videos)
      const updatedData = {
        title: formData.title,
        budget: formData.budget,
        location: formData.location,
        contact: formData.contact,
        email: formData.email,
        // Add other fields as needed
      };

      const response = await axios.put(
        `http://localhost:5000/api/properties/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Updated Property Data:', response.data); // Debugging

      // Update the property state with the updated data
      setProperty(response.data);
      toast.success('Property updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update property. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    // Reset formData to original property data
    setFormData({
      title: property.title || '',
      budget: property.budget || '',
      location: property.location || '',
      contact: property.contact || '',
      email: property.email || '',
      // Reset other fields as needed
    });
    setIsEditing(false);
  };

  if (error) {
    return (
      <PageContainer>
        <ToastContainer />
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Header>
          <h1>Property Details</h1>
        </Header>
        <div>Error: {error}</div>
      </PageContainer>
    );
  }

  if (!property) {
    return (
      <PageContainer>
        <ToastContainer />
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Header>
          <h1>Property Details</h1>
        </Header>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ToastContainer />
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>
        <h1>Property Details</h1>
        {/* UpdateButton has been moved to LeftPanel */}
      </Header>
      <PropertyContainer>
        <LeftPanel>
          <Image
            src={
              Array.isArray(property.images) && property.images.length > 0
                ? `http://localhost:5000/${property.images[0]}`
                : 'http://localhost:5000/uploads/bg.jpg'
            }
            alt={property.title}
          />

          {!isEditing && (
            <UpdateButton onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit
            </UpdateButton>
          )}

          {isEditing ? (
            // The form is handled within TabContent
            null
          ) : (
            <>
              <Title>{property.title || 'Home'}</Title>
              <Price>Rs {property.budget || 'Price Not Available'}</Price>
              <IconText>
                <FaMapMarkerAlt />
                <span>{property.location}</span>
              </IconText>
              <IconText>
                <FaPhone />
                <span>{property.contact || 'No Contact Info'}</span>
              </IconText>
              <IconText>
                <FaEnvelope />
                <span>{property.email || 'No Email Provided'}</span>
              </IconText>
            </>
          )}
        </LeftPanel>
        <RightPanel>
          <PropertyTabs
            property={property}
            isEditing={isEditing}
            formData={formData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel} // Pass handleCancel as a prop
          />
          {/* Buttons are now within the form in TabContent */}
        </RightPanel>
      </PropertyContainer>
    </PageContainer>
  );
};

export default PropertyDetailsPage;
