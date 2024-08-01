import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7f7f7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    if (!location.state || !location.state.email) {
      toast.error("Email information is missing.");
      return;
    }

    const response = await fetch('http://195.179.231.102:6003/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: location.state.email, otp })
    });

    if (response.ok) {
      toast.success('OTP Verified Successfully!');
      navigate('/dashboard'); // Navigate to dashboard or another appropriate page
    } else {
      const errorData = await response.json();
      toast.error(`Verification error: ${errorData.message}`);
    }
  };

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button type="submit">Verify OTP</Button>
      </Form>
    </Container>
  );
}

export default VerifyOtpPage;