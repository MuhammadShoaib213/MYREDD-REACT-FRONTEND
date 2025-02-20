import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  FaClipboardList,
  FaHome,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import bgImage from '../images/bg.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ---------- Styled Components ----------

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
  padding-top: calc(var(--navbar-height) + var(--header-height) + 20px);
  overflow-x: hidden;
  @media (max-width: 768px) {
    padding: 40px 20px;
    padding-top: calc(var(--navbar-height) + var(--header-height) + 20px);
  }
`;

const PropertyContainer = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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

const HeaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 60px 40px;
  color: white;
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  z-index: 1010;
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
  position: absolute;
  left: 20px;
  top: 135px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  z-index: 9999;

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

// ---------- Carousel Styled Components ----------

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  height: 400px;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
  /* Temporary border for debugging; remove if not needed */
  border: 2px solid red;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;
  &:hover {
    background: rgba(0,0,0,0.7);
  }
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  text-align: center;
  background: rgba(0,0,0,0.8);
  padding: 6px;
  border-radius: 4px;
  color: #fff;
`;

const OverlayTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ff1744;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
`;

const OverlayAddress = styled.div`
  font-size: 14px;
  color: #fff;
  margin-top: 2px;
`;

const SizeOverlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  color: #000;
  padding: 4px 8px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 4px;
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

// ---------- Tabs & Details Styled Components ----------

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

const ContentArea = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-top: none;
  border-radius: 0 0 12px 12px;
  @media (max-width: 768px) {
    border-radius: 0;
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

const UpdateButtonStyled = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  margin-top: 10px;
  svg {
    margin-right: 8px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SaveButton = styled.button`
  background-color: #28a745;
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
  background-color: #dc3545;
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

// ---------- Helper Functions ----------

const normalizePath = (path) => {
  let normalized = path.replace(/\\/g, '/');
  if (normalized.charAt(0) !== '/') {
    normalized = '/' + normalized;
  }
  return normalized;
};

const formatBudget = (budget) => {
  if (budget && typeof budget === 'object') {
    const { min, max } = budget;
    if (min || max) {
      return `Rs ${min.toLocaleString()} - Rs ${max.toLocaleString()}`;
    }
  }
  return 'Price Not Available';
};

// ---------- Tab Content & Tabs Components ----------

const TabContentComponent = ({
  activeTab,
  property,
  isEditing,
  formData,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  if (isEditing) {
    return (
      <ContentArea>
        <Form onSubmit={handleSave}>
          <FormGroup>
            <label htmlFor="inquiryType">Inquiry Type</label>
            <input
              type="text"
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
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
            <label htmlFor="location">Location (Street, District, City)</label>
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
          <ButtonGroup>
            <SaveButton type="submit">
              <FaSave /> Update
            </SaveButton>
            <CancelButton type="button" onClick={handleCancel}>
              <FaTimes /> Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </ContentArea>
    );
  }
  // View Mode
  switch (activeTab) {
    case 'overview':
      return (
        <ContentArea>
          <DetailSection>
            <DetailItem>
              <Label>Inquiry Type:</Label>
              <Value>{property.inquiryType}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Property Code:</Label>
              <Value>{property.propertyCode}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Condition:</Label>
              <Value>{property.propertyCondition}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Area Society:</Label>
              <Value>{property.areaSociety}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Contract Term:</Label>
              <Value>{property.contractTerm || 'N/A'}</Value>
            </DetailItem>
          </DetailSection>
        </ContentArea>
      );
    case 'location':
      return (
        <ContentArea>
          <DetailSection>
            <DetailItem>
              <Label>Street Name:</Label>
              <Value>{property.streetName}</Value>
            </DetailItem>
            <DetailItem>
              <Label>District:</Label>
              <Value>{property.district}</Value>
            </DetailItem>
            <DetailItem>
              <Label>City:</Label>
              <Value>{property.city}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Detected Address:</Label>
              <Value>{property.detectedAddress || 'N/A'}</Value>
            </DetailItem>
          </DetailSection>
        </ContentArea>
      );
    case 'payment':
      return (
        <ContentArea>
          <DetailSection>
            <DetailItem>
              <Label>Payment Details:</Label>
              <Value>
                {property.demand && property.demand !== ""
                  ? `Demand: Rs ${Number(property.demand).toLocaleString()}`
                  : formatBudget(property.budget)}
              </Value>
            </DetailItem>
          </DetailSection>
        </ContentArea>
      );
    case 'additional':
      return (
        <ContentArea>
          <DetailSection>
            <DetailItem>
              <Label>Street Width:</Label>
              <Value>
                {property.Streetwidth} {property.StreetwidthUnit || ''}
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Added Value:</Label>
              <Value>
                {property.addedValue?.value}% ({property.addedValue?.type})
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Advance Payment:</Label>
              <Value>{property.advancePayment}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Commission:</Label>
              <Value>
                {property.commission?.value}% ({property.commission?.type})
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Land Dimensions:</Label>
              <Value>
                {property.landLength} x {property.landWidth} {property.landUnit}
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Covered Dimensions:</Label>
              <Value>
                {property.coveredLength} x {property.coveredWidth} {property.coveredUnit}
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Size:</Label>
              <Value>
                {property.size} {property.sizeUnit}
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Facilities:</Label>
              <Value>
                {property.facilities && property.facilities.length > 0
                  ? property.facilities.map((facility, idx) => (
                      <span key={idx}>
                        {facility.name || JSON.stringify(facility)}
                        {idx !== property.facilities.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : 'No Facilities'}
              </Value>
            </DetailItem>
            <DetailItem>
              <Label>Floors:</Label>
              <Value>
                {property.floors && property.floors.length > 0
                  ? property.floors.map((floor, idx) => (
                      <span key={idx}>
                        {floor.name || JSON.stringify(floor)}
                        {idx !== property.floors.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : 'No Floor Data'}
              </Value>
            </DetailItem>
          </DetailSection>
        </ContentArea>
      );
    default:
      return <ContentArea>Select a tab</ContentArea>;
  }
};

const PropertyTabs = ({
  property,
  isEditing,
  formData,
  handleChange,
  handleSave,
  handleCancel,
}) => {
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
        <TabButton isActive={activeTab === 'additional'} onClick={() => setActiveTab('additional')}>
          Additional
        </TabButton>
      </TabList>
      <TabContentComponent
        activeTab={activeTab}
        property={property}
        isEditing={isEditing}
        formData={formData}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </TabsContainer>
  );
};

// ---------- Main Component: PropertyDetailsPage ----------

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    inquiryType: '',
    budget: '',
    location: '',
    email: '',
  });
  // Carousel state
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Compute display strings
  const priceDisplay =
    property &&
    (property.demand && property.demand !== ""
      ? `PKR ${Number(property.demand).toLocaleString()}`
      : formatBudget(property.budget));
  const titleDisplay =
    property && property.inquiryType ? property.inquiryType : 'Inquiry';
  const address =
    property &&
    `${property.streetName}, ${property.district}, ${property.city}`;
  const propertySize =
    property && property.size && property.sizeUnit
      ? `${property.size} ${property.sizeUnit}`
      : '';

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://195.179.231.102:6003/api/properties/property/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setProperty(response.data);
        setFormData({
          inquiryType: response.data.inquiryType || '',
          budget: response.data.budget ? response.data.budget.min || '' : '',
          location:
            response.data.location ||
            `${response.data.streetName || ''}, ${response.data.district || ''}, ${response.data.city || ''}`,
          email: response.data.email || '',
        });
      } catch (err) {
        setError('Failed to fetch property details');
        console.error(err);
        toast.error('Failed to fetch property details.');
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // Set up carousel images using both frontPictures and propertyPictures
  useEffect(() => {
    if (property) {
      const baseUrl = 'http://localhost:5000';
      const { frontPictures = [], propertyPictures = [] } = property;
      let images = [];
      if (frontPictures.length > 0) {
        images = frontPictures.concat(propertyPictures);
      } else if (propertyPictures.length > 0) {
        images = propertyPictures;
      }
      if (images.length > 0) {
        const normalized = images.map(img => `${baseUrl}${normalizePath(img)}`);
        console.log('Carousel image URLs:', normalized);
        setCarouselImages(normalized);
        setCurrentImageIndex(0);
      } else {
        const defaultImg = `${process.env.PUBLIC_URL}/image.png`;
        console.log('Using default image:', defaultImg);
        setCarouselImages([defaultImg]);
        setCurrentImageIndex(0);
      }
    }
  }, [property]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        inquiryType: formData.inquiryType,
        budget: { min: formData.budget, max: formData.budget },
        location: formData.location,
        email: formData.email,
      };

      const response = await axios.put(`http://195.179.231.102:6003/api/properties/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setProperty(response.data);
      toast.success('Property updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update property. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData({
      inquiryType: property.inquiryType || '',
      budget: property.budget ? property.budget.min || '' : '',
      location:
        property.location ||
        `${property.streetName || ''}, ${property.district || ''}, ${property.city || ''}`,
      email: property.email || '',
    });
    setIsEditing(false);
  };

  if (error) {
    return (
      <PageContainer>
        <ToastContainer />
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <HeaderStyled>
          <h1>Property Details</h1>
        </HeaderStyled>
        <div>Error: {error}</div>
      </PageContainer>
    );
  }

  if (!property) {
    return (
      <PageContainer>
        <ToastContainer />
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <HeaderStyled>
          <h1>Property Details</h1>
        </HeaderStyled>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ToastContainer />
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <HeaderStyled>
        <h1>Property Details</h1>
      </HeaderStyled>
      <PropertyContainer>
        <LeftPanel>
          <CarouselWrapper>
            <CarouselImage
              src={carouselImages[currentImageIndex]}
              alt={titleDisplay}
              crossOrigin="anonymous"
            />
            <PrevButton onClick={handlePrevImage}>
              <FaArrowLeft size={20} />
            </PrevButton>
            <NextButton onClick={handleNextImage}>
              <FaArrowRight size={20} />
            </NextButton>
            <Overlay>
              <OverlayTitle>{titleDisplay}</OverlayTitle>
              <OverlayAddress>{address}</OverlayAddress>
            </Overlay>
            <SizeOverlay>{propertySize}</SizeOverlay>
            <PriceOverlay>{priceDisplay}</PriceOverlay>
          </CarouselWrapper>
          {!isEditing && (
            <>
              <div style={{ marginTop: '10px' }}>
                <FaClipboardList color="#ff1744" /> Property Code: {property.propertyCode}
              </div>
              <div style={{ marginTop: '4px' }}>
                <FaHome color="#ff1744" /> Type: {property.propertyType} - {property.propertySubType}
              </div>
              <UpdateButtonStyled onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit
              </UpdateButtonStyled>
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
            handleCancel={handleCancel}
          />
        </RightPanel>
      </PropertyContainer>
    </PageContainer>
  );
};

export default PropertyDetailsPage;
