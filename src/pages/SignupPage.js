// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
// import styled from 'styled-components';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   margin: 50px auto;
//   padding: 20px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   background: #fff;
// `;

// const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledInput = styled.input`
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const StyledButton = styled.button`
//   padding: 10px;
//   background-color: red;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: darkred;
//   }
// `;

// const StyledSelect = styled.select`
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const PasswordContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
// `;

// const ToggleButton = styled.button`
//   position: absolute;
//   right: 10px;
//   border: none;
//   background: transparent;
//   cursor: pointer;
//   color: #666;
// `;

// const Label = styled.label`
//   margin-bottom: 5px;
// `;

// function SignupPage() {
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     userRole: '',
//     cnic: '',
//     phoneNumber: '',
//   });
//   const [phone, setPhone] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'cnic' && (isNaN(value) || value.length > 16)) return;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const completeFormData = {
//       ...formData,
//       phoneNumber: phone
//     };

//     for (let key in completeFormData) {
//       if (!completeFormData[key]) {
//         toast.error(`Please fill in your ${key}`);
//         return;
//       }
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(completeFormData),
//       });

//       if (response.ok) {
//         toast.success('Signup Successful! Sending OTP...');
//         sendOtpToUser(completeFormData.email); // Call to send OTP
//       } else {
//         const errorData = await response.json();
//         toast.error(`Signup error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error('Error signing up:', error);
//       toast.error('Failed to connect to the server.');
//     }
//   };

//   const sendOtpToUser = async (email) => {
//     const response = await fetch('http://localhost:5000/api/auth/send-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email })
//     });
//     if (response.ok) {
//       toast.success('OTP sent! Please check your email to verify.');
//       setTimeout(() => {
//         navigate('/VerifyOtpPage', { state: { email } }); // Delay navigation for 5000 ms (5 seconds)
//       }, 5000);
//     } else {
//       const errorData = await response.json();
//       toast.error(`Error sending OTP: ${errorData.message}`);
//     }
// };


//   return (
//     <FormContainer>
//       <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//       <h2>Sign Up</h2>
//       <StyledForm onSubmit={handleSubmit}>
//         <Label>First Name</Label>
//         <StyledInput name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
        
//         <Label>Last Name</Label>
//         <StyledInput name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
        
//         <Label>Email</Label>
//         <StyledInput name="email" type="email" value={formData.email} onChange={handleChange} required />
        
//         <Label>Password</Label>
//         <PasswordContainer>
//           <StyledInput 
//             name="password"
//             type={showPassword ? 'text' : 'password'}
//             value={formData.password}
//             onChange={handleChange}
//             required 
//           />
//           <ToggleButton onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? 'Hide' : 'Show'}
//           </ToggleButton>
//         </PasswordContainer>
        
//         <Label>Role</Label>
//         <StyledSelect name="userRole" value={formData.userRole} onChange={handleChange} required>
//           {/* <option value="">Select Role</option> */}
//           <option value="agent">Agent</option>
//           {/* <option value="agency">Agency</option> */}
//         </StyledSelect>
        
//         <Label>CNIC</Label>
//         <StyledInput name="cnic" type="text" value={formData.cnic} onChange={handleChange} required />
        
//         <Label>Phone Number</Label>
//         <PhoneInput
//           international
//           defaultCountry="US"
//           value={phone}
//           onChange={setPhone}
//         />
//         <br/>
//         <StyledButton type="submit">Sign Up</StyledButton>
//       </StyledForm>
//     </FormContainer>
//   );
// }

// export default SignupPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    phoneNumber: '',
    country: '',
    city: '',
  });
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      phoneNumber: phone,
      country: formData.country, // Make sure 'country' is being sent
      city: formData.city
    };

    for (let key in completeFormData) {
      if (!completeFormData[key]) {
        toast.error(`Please fill in your ${key}`);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      if (response.ok) {
        toast.success('Signup Successful! Sending OTP...');
        console.log(completeFormData);
        sendOtpToUser(completeFormData.email); // Call to send OTP
      } else {
        const errorData = await response.json();
        toast.error(`Signup error: ${errorData.message}`);
        console.log(completeFormData);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to connect to the server.');
    }
  };

  const sendOtpToUser = async (email) => {
    const response = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      toast.success('OTP sent! Please check your email to verify.');
      setTimeout(() => {
        navigate('/VerifyOtpPage', { state: { email } }); // Delay navigation for 5000 ms (5 seconds)
      }, 5000);
    } else {
      const errorData = await response.json();
      toast.error(`Error sending OTP: ${errorData.message}`);
    }
  };

  return (
    <FormContainer>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h2>Sign Up</h2>
      <StyledForm onSubmit={handleSubmit}>
        <Label>First Name</Label>
        <StyledInput name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
        
        <Label>Last Name</Label>
        <StyledInput name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
        
        <Label>Email</Label>
        <StyledInput name="email" type="email" value={formData.email} onChange={handleChange} required />
        
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
        
        <Label>Role</Label>
        <StyledSelect name="userRole" value={formData.userRole} onChange={handleChange} required>
        <option value="agent">Select Your Role</option>
          <option value="agent">Agent</option>
        </StyledSelect>
        
        <Label>Country</Label>
        <StyledSelect name="country" value={formData.country} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
          ))}
        </StyledSelect>
        
        <Label>City</Label>
        <StyledSelect name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.geonameId} value={city.name}>{city.name}</option>
          ))}
        </StyledSelect>
        
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
        <StyledButton type="submit">Sign Up</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default SignupPage;
