import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../images/bg.jpg';
import { API_CONFIG } from '../config/api.config';

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
  padding: 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

const Heading = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
`;

const StyledInput = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
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
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Email is missing. Please return to the previous page and submit again.");
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.API_URL}/auth/verify-otp-pass`, {
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
        navigate('/ResetPasswordForm', { state: { email } });
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Heading>Verify Your OTP</Heading>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>OTP:</StyledLabel>
          <StyledInput
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
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
