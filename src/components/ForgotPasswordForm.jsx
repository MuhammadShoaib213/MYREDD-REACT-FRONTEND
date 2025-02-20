import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 60px; // Increased padding for a larger inner space
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px; // Increased width for a larger form
`;


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-size: 28px;  // Increased from 24px to 28px
  color: #333;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;  // Increased font size for better visibility
`;

const StyledInput = styled.input`
  padding: 12px;  // Increased padding for a better user experience
  margin-bottom: 15px;  // Slightly increased margin
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;  // Increased font size for better readability
`;

const StyledButton = styled.button`
  padding: 12px 20px;  // Increased padding for a more clickable area
  font-size: 16px;  // Increased font size for visibility
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


function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(' http://localhost:6003/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Password reset email sent!');
        navigate('/OTPVerificationForm', { state: { email: email } });  // Pass email in state to the next component
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
        <Heading>Reset Your Password</Heading>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Email:</StyledLabel>
          <StyledInput
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <StyledButton type="submit">Send Reset OTP</StyledButton>
        </StyledForm>
      </FormContainer>
    </MainContainer>
  );
}

export default ForgotPasswordForm;
