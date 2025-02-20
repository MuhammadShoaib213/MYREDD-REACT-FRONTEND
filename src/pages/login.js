import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  padding-top: 100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px;
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

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ResetPasswordLink = styled.div`
  color: red;
  cursor: pointer;
  margin-top: 10px; // Add some margin for visual separation

  &:hover {
    text-decoration: underline; // Visual feedback for hover
  }
`;


function LoginForm({ onLoginSuccess, onClose }) { // Ensure onClose is also conditional if needed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://195.179.231.102:6003/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess();  // Only call if it's a function
        }
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Failed to connect to the server.');
    }
  };

  return (
    <FormContainer>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Email:</StyledLabel>
        <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <StyledLabel>Password:</StyledLabel>
        <PasswordContainer>
          <StyledInput type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
          <ToggleButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </ToggleButton>
        </PasswordContainer>
        <ResetPasswordLink onClick={() => {
  navigate('/ForgotPasswordForm');
  if (typeof onClose === 'function') {
    onClose(); // Close the modal before navigating
  }
}}>
  Reset password
</ResetPasswordLink>
        <br/>
        <StyledButton type="submit">Login</StyledButton>
        <br/>
        <StyledLabel>Don't have an account? Signup Now</StyledLabel>
        <br/>
        <StyledButton type="button" onClick={() => {
          navigate('/signup');
          if (typeof onClose === 'function') {
            onClose(); // Call onClose if it's a function
          }
        }}>Signup</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default LoginForm;
