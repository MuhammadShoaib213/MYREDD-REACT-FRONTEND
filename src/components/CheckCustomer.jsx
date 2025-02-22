// // import React, { useState } from 'react';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import bgImage from '../images/bg.jpg';

// // const Card = styled.div`
// //   width: 320px;  // Increased from 240px
// //   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// //   border-radius: 8px;
// //   overflow: hidden;
// //   background: white;
// // `;

// // const CardImage = styled.img`
// //   width: 100%;
// //   height: 240px;  // Increased from 180px to maintain aspect ratio
// //   object-fit: cover;
// // `;

// // const CardBody = styled.div`
// //   padding: 10px;
// // `;

// // const CardTitle = styled.h3`
// //   margin: 0;
// //   color: #333;
// //   font-size: 1.1em;
// // `;

// // const CardSubtitle = styled.p`
// //   margin: 0;
// //   color: #555;
// //   font-size: 0.9em;
// // `;

// // const ViewDetailButton = styled.button`
// //   background-color: red;
// //   color: white;
// //   border: none;
// //   padding: 8px 16px;
// //   margin-top: 10px;
// //   border-radius: 20px;
// //   cursor: pointer;
// //   transition: background-color 0.2s;

// //   &:hover {
// //     background-color: #8B0000;
// //   }
// // `;

// // // Existing styled components
// // const FullScreenContainer = styled.div`
// //   background-image: url(${bgImage});
// //   background-size: cover;
// //   background-position: center;
// //   background-blend-mode: overlay;
// //   background-color: rgba(0, 0, 0, 0.5);
// //   min-height: 100vh;
// //   padding: 120px 20px;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: flex-start;
// //   align-items: center;
// //   width: 100%;
// // `;

// // const Header = styled.h1`
// //   position: absolute;
// //   top: 135px;
// //   left: 50%;
// //   transform: translateX(-50%);
// //   padding: 20px;
// //   color: white;
// //   font-size: 2rem;
// //   text-align: center;
// //   z-index: 5;

// //   @media (max-width: 768px) {
// //     padding: 10px;
// //     font-size: 1.5rem;
// //   }
// // `;

// // const Container = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: flex-start;
// //   padding: 20px;
// //   background: #FFFFFF;
// //   border-radius: 8px;
// //   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
// //   max-width: 400px;
// //   width: 100%;
// //   box-sizing: border-box;
// //   margin-top: 150px;
// // `;

// // const StyledInput = styled.input`
// //   width: 100%;
// //   padding: 12px;
// //   margin: 10px 0;
// //   border: 2px solid #D3D3D3;
// //   border-radius: 5px;
// //   box-sizing: border-box;
// // `;

// // const Button = styled.button`
// //   padding: 10px 20px;
// //   margin-top: 20px;
// //   background-color: #FF0000;
// //   color: white;
// //   border: none;
// //   border-radius: 20px;
// //   cursor: pointer;
// //   width: 100%;
// //   &:hover {
// //     background-color: #D3D3D3;
// //   }
// // `;

// // const ErrorMessage = styled.div`
// //   color: #ff6b6b;
// //   margin-top: 10px;
// // `;

// // const BackButton = styled.button`
// //   position: absolute;
// //   left: 20px;
// //   top: 150px;
// //   background-color: #ffffff;
// //   border: 2px solid #e74c3c;
// //   color: #e74c3c;
// //   font-size: 14px;
// //   cursor: pointer;
// //   padding: 10px 15px;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   transition: background-color 0.3s, color 0.3s, transform 0.3s;
// //   z-index: 1000;

// //   &:hover {
// //     background-color: #e74c3c;
// //     color: #ffffff;
// //     transform: translateY(-2px);
// //   }

// //   @media (max-width: 768px) {
// //     left: 10px;
// //     width: 100%;
// //     text-align: center;
// //   }
// // `;

// // const ModalContainer = styled.div`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   right: 0;
// //   bottom: 0;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   background-color: rgba(0, 0, 0, 0.7);
// //   z-index: 100;
// // `;

// // const ModalContent = styled.div`
// //   padding: 20px;
// //   border-radius: 8px;
// //   max-width: 350px;  // Increased to fit larger card
// //   width: 90%;  // Keeps it responsive
// //   text-align: center;
// // `;

// // const CloseButton = styled.button`
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   background: none;
// //   border: none;
// //   color: white;
// //   font-size: 1.5rem;
// //   cursor: pointer;
// // `;

// // const CheckCustomer = () => {
// //   const navigate = useNavigate();
// //   const [cnic, setCnic] = useState('');
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [cnicError, setCnicError] = useState('');
// //   const [phoneError, setPhoneError] = useState('');
// //   const [serverError, setServerError] = useState('');
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [customerData, setCustomerData] = useState(null);

// //   const handleCnicChange = (event) => {
// //     const input = event.target.value;
// //     setCnic(input);
// //     setCnicError('');  // Clear any existing error message
// //   };

// //   const handlePhoneNumberChange = (event) => {
// //     const input = event.target.value;
// //     setPhoneNumber(input);
// //     if (!/^\+?[\d\s]{10,}$/.test(input)) {
// //       setPhoneError('Please enter a valid phone number with the country code.');
// //     } else {
// //       setPhoneError('');
// //     }
// //   };

// //   const checkCustomer = async () => {
// //     if (cnicError || phoneError) {
// //       alert('Please correct the errors before submitting.');
// //       return;
// //     }

// //     if (!cnic && !phoneNumber) {
// //       alert('Please enter at least one identifier to verify a customer.');
// //       return;
// //     }

// //     let params = {};
// //     if (cnic) {
// //       params.cnicNumber = cnic;
// //     }
// //     if (phoneNumber) {
// //       params.phoneNumber = phoneNumber;
// //     }

// //     try {
// //       const response = await axios.get(`api/customers/check`, { params });

// //       if (response.data.exists) {
// //         setCustomerData(response.data.customer);
// //         setModalVisible(true); // Show modal with customer data
// //       } else {
// //         alert('Customer not found. Redirecting to add customer...');
// //         navigate('/addCustomer', { state: { cnic, phoneNumber } });
// //       }
// //     } catch (error) {
// //       console.error('Error verifying customer:', error);
// //       if (error.response) {
// //         setServerError(error.response.data.message || 'An error occurred on the server.');
// //       } else if (error.request) {
// //         setServerError('No response received from the server. Please try again.');
// //       } else {
// //         setServerError('Error setting up request: ' + error.message);
// //       }
// //     }
// //   };

// //   return (
// //     <FullScreenContainer>
// //       {modalVisible && (
// //         <ModalContainer>
// //           <ModalContent>
// //             <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
// //             <Card>
// //               <CardImage src={customerData.profilePicture ? `${customerData.profilePicture}` : 'https://via.placeholder.com/200'} alt={customerData.fullName} />
// //               <CardBody>
// //                 <CardTitle>{customerData.fullName}</CardTitle>
// //                 <CardSubtitle>{customerData.currentAddress}</CardSubtitle>
// //                 <CardSubtitle>{customerData.personalMobile}</CardSubtitle>
// //                 <CardSubtitle><strong>Joined since: </strong>{new Date(customerData.updatedAt).toLocaleDateString()}</CardSubtitle>
// //                 <ViewDetailButton onClick={() => {
// //                   setModalVisible(false);
// //                   navigate('/InquiryForm', { state: { cnic, phoneNumber } });
// //                 }}>Continue</ViewDetailButton>
// //               </CardBody>
// //             </Card>
// //           </ModalContent>
// //         </ModalContainer>
// //       )}
// //       <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
// //       <Header>Verify the Customer From Database</Header>
// //       <Container>
// //         <StyledInput
// //           type="text"
// //           value={cnic}
// //           onChange={handleCnicChange}
// //           placeholder="Enter Customer Citizen ID"
// //         />
// //         {cnicError && <ErrorMessage>{cnicError}</ErrorMessage>}
// //         <Button onClick={checkCustomer}>Verify Customer</Button>
// //         {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
// //       </Container>
// //     </FullScreenContainer>
// //   );
// // };

// // export default CheckCustomer;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import bgImage from '../images/bg.jpg';

// /* --- Styled Components --- */
// const Card = styled.div`
//   width: 320px;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//   border-radius: 8px;
//   overflow: hidden;
//   background: white;
// `;

// const CardImage = styled.img`
//   width: 100%;
//   height: 240px;
//   object-fit: cover;
// `;

// const CardBody = styled.div`
//   padding: 10px;
// `;

// const CardTitle = styled.h3`
//   margin: 0;
//   color: #333;
//   font-size: 1.1em;
// `;

// const CardSubtitle = styled.p`
//   margin: 0;
//   color: #555;
//   font-size: 0.9em;
// `;

// const ViewDetailButton = styled.button`
//   background-color: red;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   margin-top: 10px;
//   border-radius: 20px;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #8B0000;
//   }
// `;

// const FullScreenContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh;
//   padding: 120px 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
// `;

// const Header = styled.h1`
//   position: absolute;
//   top: 135px;
//   left: 50%;
//   transform: translateX(-50%);
//   padding: 20px;
//   color: white;
//   font-size: 2rem;
//   text-align: center;
//   z-index: 5;

//   @media (max-width: 768px) {
//     padding: 10px;
//     font-size: 1.5rem;
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   padding: 20px;
//   background: #FFFFFF;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   max-width: 400px;
//   width: 100%;
//   box-sizing: border-box;
//   margin-top: 150px;
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

// const ErrorMessage = styled.div`
//   color: #ff6b6b;
//   margin-top: 10px;
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 150px;
//   background-color: #ffffff;
//   border: 2px solid #e74c3c;
//   color: #e74c3c;
//   font-size: 14px;
//   cursor: pointer;
//   padding: 10px 15px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s, color 0.3s, transform 0.3s;
//   z-index: 1000;

//   &:hover {
//     background-color: #e74c3c;
//     color: #ffffff;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     left: 10px;
//     width: 100%;
//     text-align: center;
//   }
// `;

// const ModalContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.7);
//   z-index: 100;
// `;

// const ModalContent = styled.div`
//   padding: 20px;
//   border-radius: 8px;
//   max-width: 350px;
//   width: 90%;
//   text-align: center;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: none;
//   border: none;
//   color: white;
//   font-size: 1.5rem;
//   cursor: pointer;
// `;

// /* --- Main Component --- */
// const CheckCustomer = () => {
//   const navigate = useNavigate();

//   // State
//   const [cnic, setCnic] = useState('');
//   const [cnicError, setCnicError] = useState('');
//   const [serverError, setServerError] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [customerData, setCustomerData] = useState(null);

//   // JWT decode
//   const [userId, setUserId] = useState('');
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded && decoded.userId) {
//           setUserId(decoded.userId);
//         }
//       } catch (err) {
//         console.error('Error decoding token:', err);
//       }
//     }
//   }, []);

//   // Handle CNIC changes
//   const handleCnicChange = (event) => {
//     const input = event.target.value;
//     setCnic(input);
//     setCnicError('');
//   };

//   // Check customer with CNIC + userId
//   const checkCustomer = async () => {
//     if (cnicError) {
//       alert('Please correct any errors before submitting.');
//       return;
//     }

//     if (!cnic) {
//       alert('Please enter a CNIC to verify a customer.');
//       return;
//     }

//     let params = { cnicNumber: cnic };
//     if (userId) {
//       params.userId = userId;
//     }

//     try {
//       const response = await axios.get('http://195.179.231.102:6003/api/customers/check', { params });

//       if (response.data.exists) {
//         setCustomerData(response.data.customer);
//         setModalVisible(true); // Show modal with customer data
//         console.log(params);
//       } else {
//         alert('Customer not found. Redirecting to add customer...');
//         navigate('/addCustomer', { state: { cnic } });
//       }
//     } catch (error) {
//       console.error('Error verifying customer:', error);
//       if (error.response) {
//         setServerError(
//           error.response.data.message || 'An error occurred on the server.'
//         );
//       } else if (error.request) {
//         setServerError('No response received from the server. Please try again.');
//       } else {
//         setServerError('Error setting up request: ' + error.message);
//       }
//     }
//   };

//   return (
//     <FullScreenContainer>
//       {modalVisible && (
//         <ModalContainer>
//           <ModalContent>
//             <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
//             <Card>
//               <CardImage
//                 src={
//                   customerData?.profilePicture
//                     ? `${customerData.profilePicture}`
//                     : 'https://via.placeholder.com/200'
//                 }
//                 alt={customerData?.fullName}
//               />
//               <CardBody>
//                 <CardTitle>{customerData?.fullName}</CardTitle>
//                 <CardSubtitle>{customerData?.currentAddress}</CardSubtitle>
//                 <CardSubtitle>{customerData?.personalMobile}</CardSubtitle>
//                 <CardSubtitle>
//                   <strong>Joined since: </strong>
//                   {new Date(customerData?.updatedAt).toLocaleDateString()}
//                 </CardSubtitle>
//                 <ViewDetailButton
//                   onClick={() => {
//                     setModalVisible(false);
//                     // Navigate to InquiryForm with CNIC in state
//                     navigate('/InquiryForm', { state: { cnic } });
//                   }}
//                 >
//                   Continue
//                 </ViewDetailButton>
//               </CardBody>
//             </Card>
//           </ModalContent>
//         </ModalContainer>
//       )}

//       <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//       <Header>Verify the Customer From Database</Header>

//       <Container>
//         <StyledInput
//           type="text"
//           value={cnic}
//           onChange={handleCnicChange}
//           placeholder="Enter Customer Citizen ID"
//         />
//         {cnicError && <ErrorMessage>{cnicError}</ErrorMessage>}

//         <Button onClick={checkCustomer}>Verify Customer</Button>
//         {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
//       </Container>
//     </FullScreenContainer>
//   );
// };

// export default CheckCustomer;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import bgImage from '../images/bg.jpg';
import { API_CONFIG } from '../config/api.config';

// --- Helper Functions ---
// Convert Windows backslashes to forward slashes
function normalizePath(filePath) {
  if (!filePath) return '';
  return filePath.replace(/\\/g, '/');
}

// Build a full URL for images using the base URL; if already absolute, return it as is.
function getFullUrl(filePath) {
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath)) return filePath;
  return `${API_CONFIG.BASE_URL}/${normalizePath(filePath)}`;
}

// --- Styled Components ---
const Card = styled.div`
  width: 320px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const CardImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.1em;
`;

const CardSubtitle = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9em;
`;

const ViewDetailButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  margin-top: 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #8B0000;
  }
`;

const FullScreenContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  padding: 120px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Header = styled.h1`
  position: absolute;
  top: 135px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  color: white;
  font-size: 2rem;
  text-align: center;
  z-index: 5;
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 150px;
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

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 150px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  z-index: 1000;
  &:hover {
    background-color: #e74c3c;
    color: #ffffff;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    left: 10px;
    width: 100%;
    text-align: center;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 8px;
  max-width: 350px;
  width: 90%;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

// --- Main Component ---
const CheckCustomer = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState('');
  const [cnicError, setCnicError] = useState('');
  const [serverError, setServerError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  // Decode JWT to retrieve userId
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.userId) {
          setUserId(decoded.userId);
        }
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, []);

  const handleCnicChange = (event) => {
    const input = event.target.value;
    setCnic(input);
    setCnicError('');
  };

  const checkCustomer = async () => {
    if (cnicError) {
      alert('Please correct any errors before submitting.');
      return;
    }
    if (!cnic) {
      alert('Please enter a CNIC to verify a customer.');
      return;
    }
    let params = { cnicNumber: cnic };
    if (userId) {
      params.userId = userId;
    }
    try {
      const response = await axios.get(`${API_CONFIG.API_URL}/customers/check`, { params });
      if (response.data.exists) {
        setCustomerData(response.data.customer);
        setModalVisible(true);
        console.log(params);
      } else {
        alert('Customer not found. Redirecting to add customer...');
        navigate('/addCustomer', { state: { cnic } });
      }
    } catch (error) {
      console.error('Error verifying customer:', error);
      if (error.response) {
        setServerError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setServerError('No response received from the server. Please try again.');
      } else {
        setServerError('Error setting up request: ' + error.message);
      }
    }
  };

  return (
    <FullScreenContainer>
      {modalVisible && (
        <ModalContainer>
          <ModalContent>
            <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
            <Card>
              <CardImage
                src={
                  customerData?.profilePicture
                    ? getFullUrl(customerData.profilePicture)
                    : 'https://via.placeholder.com/200'
                }
                alt={customerData?.fullName}
              />
              <CardBody>
                <CardTitle>{customerData?.fullName}</CardTitle>
                <CardSubtitle>{customerData?.currentAddress}</CardSubtitle>
                <CardSubtitle>{customerData?.personalMobile}</CardSubtitle>
                <CardSubtitle>
                  <strong>Joined since: </strong>
                  {new Date(customerData?.updatedAt).toLocaleDateString()}
                </CardSubtitle>
                <ViewDetailButton
                  onClick={() => {
                    setModalVisible(false);
                    navigate('/InquiryForm', { state: { cnic } });
                  }}
                >
                  Continue
                </ViewDetailButton>
              </CardBody>
            </Card>
          </ModalContent>
        </ModalContainer>
      )}
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Verify the Customer From Database</Header>
      <Container>
        <StyledInput
          type="text"
          value={cnic}
          onChange={handleCnicChange}
          placeholder="Enter Customer Citizen ID"
        />
        {cnicError && <ErrorMessage>{cnicError}</ErrorMessage>}
        <Button onClick={checkCustomer}>Verify Customer</Button>
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
      </Container>
    </FullScreenContainer>
  );
};

export default CheckCustomer;
