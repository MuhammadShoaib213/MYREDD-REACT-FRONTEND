import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput, { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import bgImage from '../images/bg.jpg';

const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 15px;
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

const StyledSelect = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #666;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #333;
  &:after {
    content: ' *';
    color: red;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-size: 0.9em;
`;

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userRole: '',
    cnic: '',
    country: '',
    city: '',
  });
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://api.geonames.org/countryInfoJSON?username=shoaib1')
      .then(response => response.json())
      .then(data => setCountries(data.geonames))
      .catch(error => console.error('Failed to fetch countries:', error));
  }, []);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const phoneCode = getCountryCallingCode(countryCode);
    setPhone(`+${phoneCode}`);
    setFormData({ ...formData, country: countryCode });
    if (countryCode) {
      fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`)
        .then(response => response.json())
        .then(data => setCities(data.geonames))
        .catch(error => console.error('Failed to fetch cities', error));
    } else {
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cnic' && (isNaN(value) || value.length > 16)) return;
    setFormData({ ...formData, [name]: value });
  };

  const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!isPasswordStrong(formData.password))
      newErrors.password = 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.';
    if (!formData.userRole) newErrors.userRole = 'Role is required';
    if (!formData.cnic) newErrors.cnic = 'Citizen ID is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!phone || !isValidPhoneNumber(phone)) newErrors.phoneNumber = 'Valid Phone Number is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const completeFormData = {
      ...formData,
      phoneNumber: phone,
      country: formData.country,
      city: formData.city
    };

    try {
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      if (response.ok) {
        sendOtpToUser(completeFormData.email);
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrors({ form: 'Failed to connect to the server.' });
    }
  };

  const sendOtpToUser = async (email) => {
    const response = await fetch('api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      navigate('/VerifyOtpPage', { state: { email } });
    } else {
      const errorData = await response.json();
      setErrors({ form: `Error sending OTP: ${errorData.message}` });
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2>Sign Up</h2>
        <StyledForm onSubmit={handleSubmit}>
          <Label>First Name</Label>
          <StyledInput name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}

          <Label>Last Name</Label>
          <StyledInput name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

          <Label>Email</Label>
          <StyledInput name="email" type="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <Label>Password</Label>
          <PasswordContainer>
            <StyledInput
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ToggleButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </ToggleButton>
          </PasswordContainer>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <Label>Role</Label>
          <StyledSelect name="userRole" value={formData.userRole} onChange={handleChange} required>
            <option value="">Select Your Role</option>
            <option value="agent">Agent</option>
          </StyledSelect>
          {errors.userRole && <ErrorMessage>{errors.userRole}</ErrorMessage>}

          <Label>Country</Label>
          <StyledSelect name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </StyledSelect>
          {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}

          <Label>City</Label>
          <StyledSelect name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </StyledSelect>
          {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}

          <Label>Citizen ID</Label>
          <StyledInput name="cnic" type="text" value={formData.cnic} onChange={handleChange} required />
          {errors.cnic && <ErrorMessage>{errors.cnic}</ErrorMessage>}

          <Label>Phone Number</Label>
          <PhoneInput
            international
            defaultCountry="US"
            value={phone}
            onChange={setPhone}
            required
          />
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
          <br />
          {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
          <StyledButton type="submit">Sign Up</StyledButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
}

export default SignupPage;
