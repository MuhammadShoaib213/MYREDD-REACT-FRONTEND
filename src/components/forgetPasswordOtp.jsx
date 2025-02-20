import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation to access the navigation state
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../images/bg.jpg';

const MainContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 60px; // Increased padding for more space inside
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px; // Increased width for more spacious layout
`;

const Heading = styled.h1`
  font-size: 28px; // Increased font size for better visibility
  color: #333;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-size: 16px; // Increased font size for better readability
`;

const StyledInput = styled.input`
  padding: 12px; // Increased padding for easier interaction
  margin-bottom: 15px; // Slightly increased margin for better spacing
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px; // Increased font size for better readability
`;

const StyledButton = styled.button`
  padding: 12px 20px; // Increased padding for a more clickable area
  font-size: 16px; // Increased font size for better visibility
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkred;
  }
`;



const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;


function OTPVerificationForm() {
  const location = useLocation();  // Access location to retrieve state
  const email = location.state?.email;  // Retrieve the email passed via state
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Email is missing. Please return to the previous page and submit again.");
      return;
    }

    try {
      const response = await fetch('/api/auth/verify-otp-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, passOtp: otp }),
      });

      console.log("Sending request with data:", { email, passOtp: otp });
      const data = await response.json();
      if (response.ok) {
        toast.success('OTP verified successfully!');
        navigate('/ResetPasswordForm', { state: { email } });  // Optionally pass email to reset password page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to connect to the server.');
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Heading>Verify Your OTP</Heading>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>OTP:</StyledLabel>
          <StyledInput
            type="text"
            value={otp}
            onChange={e => setOTP(e.target.value)}
            required
            placeholder="Enter OTP"
          />
          <StyledButton type="submit">Verify OTP</StyledButton>
        </StyledForm>
      </FormContainer>
    </MainContainer>
  );
}

export default OTPVerificationForm;
