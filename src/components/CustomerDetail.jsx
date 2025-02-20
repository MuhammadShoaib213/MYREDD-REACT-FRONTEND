import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import bgImage from '../images/bg.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 40px;
  padding-top: 180px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 40px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-right: 20px;
  width: 100%;
  max-width: 400px;
  flex: 1;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
  }
`;

const SidePanel = styled.div`
  background: #e8e8e8;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  height: 500px;
  max-width: 400px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const DetailImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const DetailText = styled.p`
  margin: 10px 0;
  font-size: 20px;
  color: #333;
`;

const Label = styled.span`
  font-weight: bold;
  color: #666;
`;

const DetailEntry = styled.div`
  background: white;
  padding: 15px;
  margin: 10px 0;
  font-size: 18px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
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

// Styled component for clickable text
const ClickableText = styled.span`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  &:hover {
    color: darkblue;
  }
`;

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const response = await fetch(` http://localhost:6003/api/customers/detail/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer details');
        }
        const data = await response.json();
        console.log(data);
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer details:', error.message);
      }
    };

    fetchCustomerDetail();
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  // Opens WhatsApp chat with the given number
  const handleOpenWhatsApp = (number) => {
    const url = `https://wa.me/${number}`;
    window.open(url, '_blank');
  };

  // Opens Gmail compose window with the email as recipient
  const handleOpenGmail = (email) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(gmailUrl, '_blank');
  };

  // Copies mobile number to clipboard and shows a toast message
  const handleCopyMobile = (number) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        toast.success('Mobile number copied to clipboard!');
      })
      .catch((err) => {
        toast.error('Failed to copy mobile number.');
        console.error('Clipboard error:', err);
      });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <MainContent>
        <DetailImage src={customer.profilePicture ? ` http://localhost:6003/${customer.profilePicture}` : 'https://via.placeholder.com/200'} alt={customer.fullName} />
        <DetailText>
          <Label>Name:</Label> {customer.fullName}
        </DetailText>
        <DetailText>
          <Label>Mobile:</Label>{' '}
          <ClickableText onClick={() => handleCopyMobile(customer.officialMobile)}>
            {customer.officialMobile}
          </ClickableText>
        </DetailText>
        <DetailText>
          <Label>WhatsApp:</Label>{' '}
          <ClickableText onClick={() => handleOpenWhatsApp(customer.whatsappMobile)}>
            {customer.whatsappMobile}
          </ClickableText>
        </DetailText>
        <DetailText>
          <Label>Member Since:</Label> {new Date(customer.createdAt).toLocaleDateString()}
        </DetailText>
        <DetailText>
          <Label>Address:</Label> {customer.currentAddress}, {customer.currentCity}, {customer.country}
        </DetailText>
      </MainContent>
      <SidePanel>
        <DetailEntry>
          <Label>Citizen ID:</Label> {customer.cnicNumber}
        </DetailEntry>
        <DetailEntry>
          <Label>Living City:</Label> {customer.currentCity}
        </DetailEntry>
        <DetailEntry>
          <Label>Profession:</Label> {customer.profession}
        </DetailEntry>
        <DetailEntry>
          <Label>Personal Email:</Label>{' '}
          <ClickableText onClick={() => handleOpenGmail(customer.personalEmail)}>
            {customer.personalEmail}
          </ClickableText>
        </DetailEntry>
        <DetailEntry>
          <Label>Official Email:</Label>{' '}
          <ClickableText onClick={() => handleOpenGmail(customer.officialEmail)}>
            {customer.officialEmail}
          </ClickableText>
        </DetailEntry>
        <DetailEntry>
          <Label>Age:</Label> {customer.age}
        </DetailEntry>
        <DetailEntry>
          <Label>Dependants:</Label> {customer.dependants}
        </DetailEntry>
      </SidePanel>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </PageContainer>
  );
};

export default CustomerDetail;
