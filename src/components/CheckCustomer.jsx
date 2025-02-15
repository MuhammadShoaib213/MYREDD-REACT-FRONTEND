import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/bg.jpg';

const Card = styled.div`
  width: 320px;  // Increased from 240px
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const CardImage = styled.img`
  width: 100%;
  height: 240px;  // Increased from 180px to maintain aspect ratio
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.1em;
`;

const CardSubtitle = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9em;
`;

const ViewDetailButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  margin-top: 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8B0000;
  }
`;

// Existing styled components
const FullScreenContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  padding: 120px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Header = styled.h1`
  position: absolute;
  top: 135px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  color: white;
  font-size: 2rem;
  text-align: center;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 150px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #D3D3D3;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #D3D3D3;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 135px;
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 60px;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 10;
  
  &:hover {
    background-color: #ff0000;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 8px;
  max-width: 350px;  // Increased to fit larger card
  width: 90%;  // Keeps it responsive
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CheckCustomer = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnicError, setCnicError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [serverError, setServerError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const handleCnicChange = (event) => {
    const input = event.target.value;
    setCnic(input);
    setCnicError('');  // Clear any existing error message
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    setPhoneNumber(input);
    if (!/^\+?[\d\s]{10,}$/.test(input)) {
      setPhoneError('Please enter a valid phone number with the country code.');
    } else {
      setPhoneError('');
    }
  };

  const checkCustomer = async () => {
    if (cnicError || phoneError) {
      alert('Please correct the errors before submitting.');
      return;
    }

    if (!cnic && !phoneNumber) {
      alert('Please enter at least one identifier to verify a customer.');
      return;
    }

    let params = {};
    if (cnic) {
      params.cnicNumber = cnic;
    }
    if (phoneNumber) {
      params.phoneNumber = phoneNumber;
    }

    try {
      const response = await axios.get(`http://195.179.231.102:6003/api/customers/check`, { params });

      if (response.data.exists) {
        setCustomerData(response.data.customer);
        setModalVisible(true); // Show modal with customer data
      } else {
        alert('Customer not found. Redirecting to add customer...');
        navigate('/addCustomer', { state: { cnic, phoneNumber } });
      }
    } catch (error) {
      console.error('Error verifying customer:', error);
      if (error.response) {
        setServerError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setServerError('No response received from the server. Please try again.');
      } else {
        setServerError('Error setting up request: ' + error.message);
      }
    }
  };

  return (
    <FullScreenContainer>
      {modalVisible && (
        <ModalContainer>
          <ModalContent>
            <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
            <Card>
              <CardImage src={customerData.profilePicture ? `http://195.179.231.102:6003/${customerData.profilePicture}` : 'https://via.placeholder.com/200'} alt={customerData.fullName} />
              <CardBody>
                <CardTitle>{customerData.fullName}</CardTitle>
                <CardSubtitle>{customerData.currentAddress}</CardSubtitle>
                <CardSubtitle>{customerData.personalMobile}</CardSubtitle>
                <CardSubtitle><strong>Joined since: </strong>{new Date(customerData.updatedAt).toLocaleDateString()}</CardSubtitle>
                <ViewDetailButton onClick={() => {
                  setModalVisible(false);
                  navigate('/InquiryForm', { state: { cnic, phoneNumber } });
                }}>Continue</ViewDetailButton>
              </CardBody>
            </Card>
          </ModalContent>
        </ModalContainer>
      )}
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Verify the Customer From Database</Header>
      <Container>
        <StyledInput
          type="text"
          value={cnic}
          onChange={handleCnicChange}
          placeholder="Enter Customer Citizen ID"
        />
        {cnicError && <ErrorMessage>{cnicError}</ErrorMessage>}
        <Button onClick={checkCustomer}>Verify Customer</Button>
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
      </Container>
    </FullScreenContainer>
  );
};

export default CheckCustomer;
