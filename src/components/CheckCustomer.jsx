// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import bgImage from '../images/bg.jpg';

// // Full-screen container to center the child content
// const FullScreenContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh; /* Ensure it covers the whole viewport height */
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;



// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   background: #FFFFFF;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   max-width: 400px;
//   width: 100%; // Ensures it does not exceed the max-width
//   box-sizing: border-box;
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 10px 0;
//   border: 2px solid #D3D3D3;
//   border-radius: 5px;
//   box-sizing: border-box;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   margin-top: 20px;
//   background-color: #FF0000;
//   color: white;
//   border: none;
//   border-radius: 20px;
//   cursor: pointer;
//   width: 100%;
//   &:hover {
//     background-color: #D3D3D3;
//   }
// `;

// const CheckCustomer = () => {
//   const navigate = useNavigate();
//   const [cnicNumber, setCnicNumber] = useState('');

//   const checkCustomer = async () => {
//     if (!/^\d{16}$/.test(cnicNumber)) {
//       alert('CNIC must be exactly 16 digits.');
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:5000/api/customers/check`, {
//         params: { cnicNumber }
//       });

//       if (response.data.exists) {
//         alert('Customer verified, please continue.');
//         navigate('/InquiryForm', { state: { cnicNumber } }); 
//       } else {
//         alert('Customer not found. Redirecting to add customer...');
//         navigate('/addCustomer');
//       }
//     } catch (error) {
//       console.error('Error verifying customer:', error);
//       alert(`Customer not found. Redirecting to add customer...`);
//       navigate('/CustomerInquiryForm');
//     }
//   };

//   return (
//     <FullScreenContainer>
//       <Container>
//         <StyledInput
//           type="number"
//           value={cnicNumber}
//           onChange={(e) => setCnicNumber(e.target.value)}
//           placeholder="Enter Customer CNIC"
//         />
//         <Button onClick={checkCustomer}>Verify Customer</Button>
//       </Container>
//     </FullScreenContainer>
//   );
// };

// export default CheckCustomer;


import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/bg.jpg';

const FullScreenContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #D3D3D3;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #D3D3D3;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
`;

const CheckCustomer = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState('');
  const [cnicError, setCnicError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleCnicChange = (event) => {
    const input = event.target.value;
    setCnic(input);
    if (!/^\d{16}$/.test(input)) {
      setCnicError('CNIC must be exactly 16 digits.');
    } else {
      setCnicError('');
    }
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    setPhoneNumber(input);
    if (!/^\+?[\d\s]{10,}$/.test(input)) {
      setPhoneError('Please enter a valid phone number with the country code.');
    } else {
      setPhoneError('');
    }
  };

  const checkCustomer = async () => {
    if (cnicError || phoneError) {
      alert('Please correct the errors before submitting.');
      return;
    }
  
    if (!cnic && !phoneNumber) {
      alert('Please enter at least one identifier to verify a customer.');
      return;
    }
  
    // Create a params object
    let params = {};
    if (cnic) {
      params.cnicNumber = cnic;
    }
    if (phoneNumber) {
      params.phoneNumber = phoneNumber;
    }
  
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/check`, { params });
  
      if (response.data.exists) {
        alert('Customer verified, please continue.');
        navigate('/InquiryForm', { state: { cnic, phoneNumber } });
        console.log(cnic, phoneNumber);
      } else {
        alert('Customer not found. Redirecting to add customer...');
        navigate('/addCustomer', { state: { cnic, phoneNumber } });
      }
    } catch (error) {
      console.error('Error verifying customer:', error);
      alert('Failed to verify customer. Please try again.');
    }
  };
  
  


  return (
    <FullScreenContainer>
      <Container>
        <StyledInput
          type="text"
          value={cnic}
          onChange={handleCnicChange}
          placeholder="Enter Customer CNIC"
        />
        {cnicError && <ErrorMessage>{cnicError}</ErrorMessage>}
        
        <StyledInput
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter Customer Phone Number"
        />
        {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
        
        <Button onClick={checkCustomer}>Verify Customer</Button>
      </Container>
    </FullScreenContainer>
  );
};

export default CheckCustomer;
