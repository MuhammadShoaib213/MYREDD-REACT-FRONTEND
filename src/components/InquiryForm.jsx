// import React, { useState } from 'react';
// import StepOne from './StepOne';
// import StepTwo from './StepTwo';
// import StepThree from './StepThree';
// import StepFour from './StepFour';
// import ProgressBar from './ProgressBar';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';


// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 200px;
//   background-color: #333;
//   border: 2px solid #ff0000;
//   color: white;
//   font-size: 14px;
//   cursor: pointer;
//   padding: 15px 20px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   width: 240px;
//   height: 60px;
//   transition: background-color 0.3s, transform 0.3s;
//   z-index: 10; // Bring the button above other elements
  
//   &:hover {
//     background-color: #ff0000;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     font-size: 14px;
//     width: 100%;
//     height: auto;
//     left: 10px;
//   }
// `;


// const InquiryForm = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const token = localStorage.getItem('token'); // Adjust depending on where you store your token
//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken.userId; 
//     const cnic = location.state?.cnic;
//     const phoneNumber = location.state?.phoneNumber;
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//       // purpose: '',
//       userId: userId,
//       cnicNumber: cnic || '',  // Use empty string if cnicNumber is undefined
//       phoneNumber: phoneNumber || '',  // Use empty string if phoneNumber is undefined
//       inquiryType: {
//         forPurchase: false,
//         forSale: false,
//         onRent: false,
//         forRent: false
//       },
//       propertyType: {
//           residential: false,
//           commercial: false,
//           land: false
//       },
//       propertySubType: {
//           home: false,
//           apartment: false,
//           villas: false,
//           farmHouse: false,
//           office: false,
//           shop: false,
//           warehouse: false,
//           factory: false
//       },
//       city: '',
//       area: '',
//       phaseBlock: '',
//       category: '',
//       length: '',
//       width: '',
//       status: '',
//       priority: '',
//       commission: '',
//       closingDate: '',
//       expected: '',
//       features: {
//           garage: false,
//           garden: false,
//           mainRoad: false
//       },
//       bedrooms: '',
//       budget: '',
//       advancePayment: '',
//       timeForPayment: '',
//       image: [],
//       video: '',
//     });

//     const nextStep = () => {
//         setCurrentStep(currentStep + 1);
//     };

//     const prevStep = () => {
//         if (currentStep > 1) setCurrentStep(currentStep - 1);
//     };

//   //   const handleChange = (input) => (e) => {
//   //     const { name, value, checked, type } = e.target;
//   //     if (type === 'checkbox') {
//   //         setFormData(prevState => ({
//   //             ...prevState,
//   //             [input]: { ...prevState[input], [name]: checked }
//   //         }));
//   //     } else {
//   //         setFormData(prevState => ({
//   //             ...prevState,
//   //             [input]: value
//   //         }));
//   //     }
//   // };
  
//   // const handleChange = (input, subInput = null) => (e) => {
//   //   const { name, value, type, checked, files } = e.target;
//   //   if (type === 'checkbox') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [name]: checked }
//   //     }));
//   //   } else if (type === 'file') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: files
//   //     }));
//   //   } else if (subInput) {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [subInput]: value }
//   //     }));
//   //   } else {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: value
//   //     }));
//   //   }
//   // };

//   // const handleChange = (input, subInput = null) => (e) => {
//   //   const { name, value, type, checked, files } = e.target;
//   //   if (type === 'checkbox') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [name]: checked }
//   //     }));
//   //   } else if (type === 'file') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: files
//   //     }));
//   //   } else if (subInput) {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [subInput]: value }
//   //     }));
//   //   } else {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: value
//   //     }));
//   //   }
//   // };
    

//   // const handleChange = (input, subInput = null) => (e) => {
//   //   const { name, value, type, checked, files } = e.target;
//   //   if (type === 'checkbox') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [name]: checked }
//   //     }));
//   //   } else if (type === 'file') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: files
//   //     }));
//   //   } else if (subInput) {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [subInput]: value }
//   //     }));
//   //   } else {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: value
//   //     }));
//   //   }
//   // };

//   // const handleChange = (input, subInput = null) => (e) => {
//   //   const { name, value, type, checked, files } = e.target;
//   //   if (type === 'checkbox') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [name]: checked }
//   //     }));
//   //   } else if (type === 'file') {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: files
//   //     }));
//   //   } else if (subInput) {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: { ...prevState[input], [subInput]: value }
//   //     }));
//   //   } else {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [input]: value
//   //     }));
//   //   }
//   //   console.log(`Field updated: ${input}${subInput ? ` -> ${subInput}` : ''}, Value: ${type === 'checkbox' ? checked : value}`);

//   // };
  
  
// //   const handleChange = (input, subInput = null) => (e) => {
// //     const { name, value, type, checked, files } = e.target;
// //     if (type === 'checkbox') {
// //         setFormData(prevState => {
// //             const newState = { ...prevState, [input]: { ...prevState[input], [name]: checked } };
// //             console.log(`Updated formData:`, newState);
// //             return newState;
// //         });
// //     } else if (type === 'file') {
// //         setFormData(prevState => ({ ...prevState, [input]: files }));
// //     } else if (subInput) {
// //         setFormData(prevState => ({ ...prevState, [input]: { ...prevState[input], [subInput]: value } }));
// //     } else {
// //         setFormData(prevState => ({ ...prevState, [input]: value }));
// //     }
// // };


// const handleChange = (input, subInput = null) => (e) => {
//   const { name, value, type, checked } = e.target;
//   if (type === 'checkbox') {
//       setFormData(prevState => ({
//           ...prevState,
//           [input]: { ...prevState[input], [name]: checked }
//       }));
//   } else if (type === 'file') {
//       setFormData(prevState => ({
//           ...prevState,
//           [input]: e.target.files
//       }));
//   } else if (subInput) {
//       setFormData(prevState => ({
//           ...prevState,
//           [input]: { ...prevState[input], [subInput]: value }
//       }));
//   } else {
//       setFormData(prevState => ({
//           ...prevState,
//           [input]: value
//       }));
//   }
//   console.log(`Field updated: ${name}, Value: ${value}`);
// };



// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
  
// //     console.log('Final form data:', formData); // Check what is being submitted
  
// //     const submitData = new FormData();
// //     Object.keys(formData).forEach(key => {
// //       const value = formData[key];
// //       if (Array.isArray(value)) { // Assuming images or files are arrays
// //         value.forEach(file => submitData.append(key, file));
// //       } else if (typeof value === 'object') {
// //         submitData.append(key, JSON.stringify(value));
// //       } else {
// //         submitData.append(key, value);
// //       }
// //     });
  
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/properties/add', submitData, {
// //         headers: { 'Content-Type': 'multipart/form-data' }
// //       });
// //       console.log('Form submitted successfully:', response.data);
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //     }
// //   };
  

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   console.log('Final form data:', formData); // Check what is being submitted

// //   const submitData = new FormData();
// //   Object.keys(formData).forEach(key => {
// //     const value = formData[key];
// //     if (Array.isArray(value)) { // Assuming images or files are arrays
// //       value.forEach(file => submitData.append(key, file));
// //     } else if (typeof value === 'object') {
// //       submitData.append(key, JSON.stringify(value));
// //     } else {
// //       submitData.append(key, value);
// //     }
// //   });

// //   try {
// //     const response = await axios.post('http://localhost:5000/api/properties/add', submitData, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     });
// //     console.log('Form submitted successfully:', response.data);
// //   } catch (error) {
// //     console.error('Error submitting form:', error);
// //   }
// // };


// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   console.log('Final form data before processing:', formData);

// //   const submitData = new FormData();
// //   Object.keys(formData).forEach(key => {
// //       const value = formData[key];
// //       console.log(`Appending to FormData: ${key}:`, value); // Log data being appended
// //       if (Array.isArray(value)) {
// //           value.forEach(file => submitData.append(key, file));
// //       } else if (typeof value === 'object') {
// //           submitData.append(key, JSON.stringify(value));
// //       } else {
// //           submitData.append(key, value);
// //       }
// //   });

// //   try {
// //       const response = await axios.post('http://localhost:5000/api/properties/add', submitData, {
// //           headers: { 'Content-Type': 'multipart/form-data' }
// //       });
// //       console.log('Form submitted successfully:', response.data);
// //   } catch (error) {
// //       console.error('Error submitting form:', error);
// //   }
// // };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   console.log('Final form data before processing:', formData);

// //   const submitData = new FormData();
// // //   Object.keys(formData).forEach(key => {
// // //       const value = formData[key];
// // //       if (key === 'images' && value.length) {
// // //           // Check if it's the image array and has content
// // //           Array.from(value).forEach(file => {
// // //               submitData.append(key, file);
// // //               console.log(`Appending image:`, file.name); // Debugging to ensure files are appended
// // //           });
// // //       } else if (typeof value === 'object' && !Array.isArray(value)) {
// // //           // Handle JSON data, ensure other data isn't skipped
// // //           submitData.append(key, JSON.stringify(value));
// // //       } else {
// // //           // Handle other data types
// // //           submitData.append(key, value);
// // //       }
// // //   });
// // Object.keys(formData).forEach(key => {
// //     const value = formData[key];
// //     console.log(`Appending ${key}: ${value}`); // Debug statement to log what's being appended
// //     if (Array.isArray(value)) {
// //         value.forEach(file => submitData.append(key, file));
// //     } else if (typeof value === 'object' && !Array.isArray(value) && key !== 'status') {
// //         submitData.append(key, JSON.stringify(value));
// //     } else {
// //         submitData.append(key, value);
// //     }
// // });


// //   // Debugging: Log FormData to ensure it contains what you expect
// //   for (let pair of submitData.entries()) {
// //       console.log(`${pair[0]}: ${pair[1] instanceof Blob ? 'File...' : pair[1]}`);
// //   }

// //   try {
// //       const response = await axios.post('http://localhost:5000/api/properties/add', submitData, {
// //           headers: { 'Content-Type': 'multipart/form-data' }
// //       });
// //       console.log('Form submitted successfully:', response.data);
// //       alert('Inquiry Generated');
// //       navigate('/PropertyView');
// //   } catch (error) {
// //       console.error('Error submitting form:', error);
// //       alert('Error Generating Inquiry');
// //   }
// // };

// const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('Final form data before processing:', formData);
    
//     const submitData = new FormData();
    
//     // Loop through each key in the formData object and append it to submitData
//     Object.keys(formData).forEach(key => {
//       const value = formData[key];
      
//       console.log(`Processing key: ${key}, value: ${value}`); // Log the key and value
    
//       // Check if the value is an array (like for file uploads)
//       if (Array.isArray(value)) {
//         // Append each file under the 'images' field if key is 'images'
//         if (key === 'images') {
//           Array.from(value).forEach(file => {
//             console.log(`Appending file to ${key}:`, file.name); // Log each file
//             submitData.append(key, file); // Append the file to FormData
//           });
//         }
//       } else if (key === 'video' && value) {
//         console.log(`Appending video file:`, value.name);
//         submitData.append('video', value); // Appending video if it exists
//       } else if (typeof value === 'object' && !Array.isArray(value) && key !== 'status') {
//         submitData.append(key, JSON.stringify(value));
//       } else {
//         submitData.append(key, value);
//       }
//     });
  
//     // Debugging: Log FormData entries
//     for (let pair of submitData.entries()) {
//       console.log(`${pair[0]}: ${pair[1] instanceof Blob ? pair[1].name : pair[1]}`);
//     }
  
//     try {
//       console.log('Submitting form data...');
    
//       // Submit the form data to the API endpoint
//       const response = await axios.post('http://localhost:5000/api/properties/add', submitData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
    
//       // Log the full response for debugging purposes
//       console.log('API response:', response);
  
//       const { propertyId } = response.data;
    
//       console.log('Received property ID:', propertyId);
    
//       alert('Inquiry Generated');
    
//       navigate(`/PropertyAd/${propertyId}`, { state: { propertyId } });

//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error Generating Inquiry');
//     }
//   };
  

//     const stepComponents = [
//         <StepOne nextStep={nextStep} handleChange={handleChange} formData={formData} />,
//         <StepTwo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />,
//         <StepThree nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />,
//         <StepFour prevStep={prevStep} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
//     ];

//     return (
//         <div>
//             <ProgressBar currentStep={currentStep} />
//             <BackButton onClick={() => navigate(-1)}>← Back To Check Customer</BackButton>
//             {stepComponents[currentStep - 1]}
//         </div>
//     );
// };

// export default InquiryForm;


import React, { useState, useEffect } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 200px;
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
  height: 60px;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 10; // Bring the button above other elements
  
  &:hover {
    background-color: #ff0000;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;

const WhatsAppButton = styled.button`
  position: absolute;
  right: 20px;
  top: 200px;
  background-color: #25D366;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
  height: 60px;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 10; // Bring the button above other elements
  
  &:hover {
    background-color: #128C7E;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    right: 10px;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  position: relative;
`;

const PopupHeader = styled.h2`
  margin-top: 0;
`;

const PopupInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const PopupButton = styled.button`
  background-color: #25D366;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  
  &:hover {
    background-color: #128C7E;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const InquiryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  // Variables to store userId and cnic from either token or query parameter
  const [userId, setUserId] = useState(null);
  const [cnic, setCnic] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [formData, setFormData] = useState({
    userId: '',
    cnicNumber: '',
    phoneNumber: '',
    inquiryType: {
      forPurchase: false,
      forSale: false,
      onRent: false,
      forRent: false
    },
    propertyType: {
      residential: false,
      commercial: false,
      land: false
    },
    propertySubType: {
      home: false,
      apartment: false,
      villas: false,
      farmHouse: false,
      office: false,
      shop: false,
      warehouse: false,
      factory: false
    },
    city: '',
    area: '',
    phaseBlock: '',
    category: '',
    length: '',
    width: '',
    status: '',
    priority: '',
    commission: '',
    closingDate: '',
    expected: '',
    features: {
      garage: false,
      garden: false,
      mainRoad: false
    },
    bedrooms: '',
    budget: '',
    advancePayment: '',
    timeForPayment: '',
    image: [],
    video: '',
  });

  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState('');

  useEffect(() => {
    // Retrieve and decode token from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.userId) {
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    // Check for a temporary token in query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const tempTokenParam = queryParams.get('tempToken');
    if (tempTokenParam) {
      try {
        const decodedTempToken = JSON.parse(atob(tempTokenParam));
        if (decodedTempToken.userId) {
          setUserId(decodedTempToken.userId);
        }
        if (decodedTempToken.cnic) {
          setCnic(decodedTempToken.cnic);
        }
      } catch (error) {
        console.error('Error decoding tempToken:', error);
      }
    }
    
    // If `location.state` contains `cnic` and `phoneNumber`, set them.
    if (location.state?.cnic) {
      setCnic(location.state.cnic);
    }
    if (location.state?.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
    }
  }, [location]);

  useEffect(() => {
    // Update the formData once userId and cnic are set
    setFormData(prevFormData => ({
      ...prevFormData,
      userId: userId || '',
      cnicNumber: cnic || '',
      phoneNumber: phoneNumber || ''
    }));
  }, [userId, cnic, phoneNumber]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (input, subInput = null) => (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [input]: { ...prevState[input], [name]: checked }
      }));
    } else if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [input]: e.target.files
      }));
    } else if (subInput) {
      setFormData(prevState => ({
        ...prevState,
        [input]: { ...prevState[input], [subInput]: value }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [input]: value
      }));
    }
    console.log(`Field updated: ${name}, Value: ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Final form data before processing:', formData);
    
    const submitData = new FormData();
    
    // Loop through each key in the formData object and append it to submitData
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      
      console.log(`Processing key: ${key}, value: ${value}`); // Log the key and value
    
      // Check if the value is an array (like for file uploads)
      if (key === 'image' && Array.isArray(value)) {
        // Append each file under the 'images' field if key is 'images'
        Array.from(value).forEach(file => {
          console.log(`Appending file to ${key}:`, file.name); // Log each file
          submitData.append(key, file); // Append the file to FormData
        });
      } else if (key === 'video' && value) {
        console.log(`Appending video file:`, value.name);
        submitData.append('video', value); // Appending video if it exists
      } else if (typeof value === 'object' && !Array.isArray(value) && key !== 'status') {
        // For sub-objects, encode as JSON
        submitData.append(key, JSON.stringify(value));
      } else {
        // For other fields, append directly
        submitData.append(key, value);
      }
    });
  
    // Debugging: Log FormData entries
    for (let pair of submitData.entries()) {
      console.log(`${pair[0]}: ${pair[1] instanceof Blob ? pair[1].name : pair[1]}`);
    }
  
    try {
      console.log('Submitting form data...');
    
      // Submit the form data to the API endpoint
      const response = await axios.post('http://localhost:5000/api/properties/add', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    
      // Log the full response for debugging purposes
      console.log('API response:', response);
  
      if (response.data) {
        const { propertyId } = response.data;
        
        console.log('Received property ID:', propertyId);
      
        alert('Inquiry Generated');
      
        navigate(`/PropertyAd/${propertyId}`, { state: { propertyId } });
      } else {
        throw new Error('No data received from server');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error Generating Inquiry');
    }
  };

  // Function to create a temporary token containing necessary data
  const createTempToken = (data) => {
    // For simplicity, we'll just encode the data in base64
    const stringifiedData = JSON.stringify(data);
    return btoa(stringifiedData);
  };

  // Handle the WhatsApp share functionality
  const handleWhatsAppShare = () => {
    if (!whatsAppNumber) {
      toast.error('Please enter a valid WhatsApp number.');
      return;
    }

    // Validate the WhatsApp number (basic validation)
    const isValidNumber = /^[0-9]{10,15}$/.test(whatsAppNumber); // Adjust the regex as needed for your region
    if (!isValidNumber) {
      toast.error('Please enter a valid WhatsApp number.');
      return;
    }

    // Create a temporary token with the required data
    const tempToken = createTempToken({ userId, cnic });

    // Construct the URL that the recipient will open to fill the form
    const formUrl = `http://localhost:3000/inquiry?tempToken=${encodeURIComponent(tempToken)}`;

    // Construct the message text with the link
    const message = `Please fill this property inquiry form: ${formUrl}`;

    // Use the WhatsApp URL scheme to open the WhatsApp application
    // This will only work if WhatsApp is installed and registered for this URL scheme
    const whatsappUrl = `whatsapp://send?phone=${encodeURIComponent(whatsAppNumber)}&text=${encodeURIComponent(message)}`;

    // Attempt to open WhatsApp with the message
    window.open(whatsappUrl, '_blank');

    // Close the popup
    setShowWhatsAppPopup(false);
  };

  const stepComponents = [
    <StepOne nextStep={nextStep} handleChange={handleChange} formData={formData} />,
    <StepTwo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />,
    <StepThree nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />,
    <StepFour prevStep={prevStep} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
  ];

  return (
    <div>
      <ProgressBar currentStep={currentStep} />
      <BackButton onClick={() => navigate(-1)}>← Back To Check Customer</BackButton>
      <WhatsAppButton onClick={() => setShowWhatsAppPopup(true)}>Share on WhatsApp</WhatsAppButton>
      {stepComponents[currentStep - 1]}
      {showWhatsAppPopup && (
        <PopupOverlay>
          <PopupContainer>
            <CloseButton onClick={() => setShowWhatsAppPopup(false)}>×</CloseButton>
            <PopupHeader>Share Form via WhatsApp</PopupHeader>
            <label htmlFor="whatsAppNumber">Enter WhatsApp Number:</label>
            <PopupInput
              type="text"
              id="whatsAppNumber"
              value={whatsAppNumber}
              onChange={(e) => setWhatsAppNumber(e.target.value)}
              placeholder="e.g. 9234567890"
            />
            <PopupButton onClick={handleWhatsAppShare}>Share</PopupButton>
          </PopupContainer>
        </PopupOverlay>
      )}
      <ToastContainer />
    </div>
  );
};

export default InquiryForm;
