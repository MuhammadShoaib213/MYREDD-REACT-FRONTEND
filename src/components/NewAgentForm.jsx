import React, { useState } from 'react';
import styled from 'styled-components';
import {jwtDecode} from 'jwt-decode'; // Remember to install jwt-decode if not already installed
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const NewAgentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cnic: '',
    phoneNumber: '',
  });
  const [phone, setPhone] = useState('');

  // Decode the agency's JWT to get the agency ID
  const agencyToken = localStorage.getItem('token');
  const agencyData = jwtDecode(agencyToken);
  const agencyId = agencyData.userId; // Assuming the agency's userId is the agency ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cnic' && (isNaN(value) || value.length > 16)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const agentData = {
      ...formData,
      phoneNumber: phone,
      userRole: 'agent', // Automatically set the role to 'agent'
      agencyId: agencyId, // Include the agency ID
    };

    try {
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('Agent successfully added!');
      } else {
        const errorData = await response.json();
        alert(`Signup error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error signing up agent:', error);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <FormContainer>
      <h2>Add New Agent</h2>
      <StyledForm onSubmit={handleSubmit}>
        <Label>First Name</Label>
        <StyledInput name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
        
        <Label>Last Name</Label>
        <StyledInput name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
        
        <Label>Email</Label>
        <StyledInput name="email" type="email" value={formData.email} onChange={handleChange} required />
        
        <Label>Password</Label>
        <StyledInput name="password" type="password" value={formData.password} onChange={handleChange} required />
        
        <Label>CNIC</Label>
        <StyledInput name="cnic" type="text" value={formData.cnic} onChange={handleChange} required />
        
        <Label>Phone Number</Label>
        <PhoneInput
          international
          defaultCountry="US"
          value={phone}
          onChange={setPhone}
        />
        <br/>
        <StyledButton type="submit">Add Agent</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default NewAgentForm;
