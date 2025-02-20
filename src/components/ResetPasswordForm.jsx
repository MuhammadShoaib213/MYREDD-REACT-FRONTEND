import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
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
  padding: 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px; // Ensuring ample width for the layout
`;

const Heading = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  display: block;
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ToggleButton = styled.button`
  padding: 12px 15px;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  margin-left: 10px;
`;

const StyledButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: darkred;
  }
  width: 100%;
  margin-top: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
          const response = await fetch('http://195.179.231.102:6003/api/auth/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
          });
    
          const data = await response.json();
          if (response.ok) {
            toast.success('Password reset successfully!');
            navigate('/login'); // Redirect to login page
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
        <Heading>Set New Password</Heading>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>New Password:</StyledLabel>
          <InputContainer>
            <StyledInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <ToggleButton type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? 'Hide' : 'Show'}
            </ToggleButton>
          </InputContainer>
          <StyledLabel>Confirm New Password:</StyledLabel>
          <InputContainer>
            <StyledInput
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <ToggleButton type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? 'Hide' : 'Show'}
            </ToggleButton>
          </InputContainer>
          <StyledButton type="submit">Reset Password</StyledButton>
        </StyledForm>
      </FormContainer>
    </MainContainer>
  );
}

export default ResetPasswordForm;
