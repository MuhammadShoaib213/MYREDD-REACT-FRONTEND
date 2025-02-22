// // MainForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import StepOne from './steps/StepOne';
// import StepTwo from './steps/StepTwo';
// import StepThree from './steps/StepThree';
// import StepFour from './steps/StepFour';
// import bgImage from '../../images/bg.jpg';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode'; // Import jwtDecode

// // Import Toastify components and CSS
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Container = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 70vh; // Reduced from 100vh
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px 20px; // Reduced top padding
//   padding-top: 80px;
// `;

// const MainForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userId, setUserId] = useState(null);
//   const [cnic, setCnic] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState(null);

//   const [formData, setFormData] = useState({
//     userId: '',         // Will be set from the token
//     cnicNumber: '',
//     selectedCountry: 'PK',
//     city: '',
//     district: '',
//     phaseBlock: '',
//     detectedAddress: '',
//     size: '',
//     sizeUnit: 'marla',
//     coveredWidth: '',
//     coveredLength: '',
//     coveredDepth: '',
//     coveredUnit: 'feet',
//     landWidth: '',
//     landLength: '',
//     landDepth: '',
//     landUnit: 'feet',
//     propertyNumber: '',
//     streetName: '',
//     floors: [],
//     facilities: [],
//     budget: { min: '', max: '' },
//     advanceAmount: '',
//     priority: '',
//     commission: { type: 'percentage', value: '' },
//     addedValue: { type: 'percentage', value: '' },
//     files: {},
//     inquiryType: '',
//     propertyType: '',
//     propertySubType: '',
//     Streetwidth: '',
//     StreetwidthUnit: '',
//     propertyCondition: '',
//     demand: '',
//     contractTerm: '',
//     frontPictures: '',
//     propertyPictures: '',
//     phoneNumber: '',
//   });

//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     // Retrieve and decode token from localStorage if available
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         if (decodedToken && decodedToken.userId) {
//           setUserId(decodedToken.userId);
//         }
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         toast.error('Error decoding authentication token.');
//       }
//     }

//     // Check for a temporary token in query parameters
//     const queryParams = new URLSearchParams(window.location.search);
//     const tempTokenParam = queryParams.get('tempToken');
//     if (tempTokenParam) {
//       try {
//         const decodedTempToken = JSON.parse(atob(tempTokenParam));
//         if (decodedTempToken.userId) {
//           setUserId(decodedTempToken.userId);
//         }
//         if (decodedTempToken.cnic) {
//           setCnic(decodedTempToken.cnic);
//         }
//       } catch (error) {
//         console.error('Error decoding tempToken:', error);
//         toast.error('Error decoding temporary token.');
//       }
//     }

//     // If `location.state` contains `cnic` and `phoneNumber`, set them.
//     if (location.state?.cnic) {
//       setCnic(location.state.cnic);
//     }
//     if (location.state?.phoneNumber) {
//       setPhoneNumber(location.state.phoneNumber);
//     }
//   }, [location]);

//   // Update formData with userId, cnic, and phoneNumber once they're set
//   useEffect(() => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       userId: userId || '',
//       cnicNumber: cnic || '',
//       phoneNumber: phoneNumber || ''
//     }));
//   }, [userId, cnic, phoneNumber]);

//   // --- Handler functions for steps ---
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleChangeDistrict = (selectedDistrict) => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       district: selectedDistrict,
//     }));
//   };

//   const handleFloorChange = (updatedFloors) => {
//     const transformedFloors = updatedFloors.map((floor) => ({
//       name: floor.name || 'Unnamed Floor',
//       features: floor.features
//         ? Object.fromEntries(
//             Object.entries(floor.features).map(([featureName, featureValue]) => [
//               featureName || 'Unnamed Feature',
//               featureValue || 0,
//             ])
//           )
//         : {},
//     }));

//     setFormData(prev => ({
//       ...prev,
//       floors: transformedFloors,
//     }));
//   };

//   const handleFacilitiesChange = (updatedFacilities) => {
//     const transformedFacilities = updatedFacilities.map((facility) => ({
//       name: facility.name || 'Unknown',
//       value: facility.value === 'Y' || facility.value === 'N' ? facility.value : 'N',
//     }));

//     setFormData(prev => ({
//       ...prev,
//       facilities: transformedFacilities,
//     }));
//   };

//   const handlePriorityChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       priority: value,
//     }));
//   };

//   const handleBudgetChange = (updatedBudget) => {
//     setFormData(prev => ({
//       ...prev,
//       budget: updatedBudget,
//     }));
//   };

//   const handleCommissionChange = (updatedCommission) => {
//     setFormData(prev => ({
//       ...prev,
//       commission: updatedCommission,
//     }));
//   };

//   const handleAdvanceChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       advanceAmount: value,
//     }));
//   };

//   const handlePropertyConditionChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       propertyCondition: value,
//     }));
//   };

//   const handleContractTermChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       contractTerm: value,
//     }));
//   };

//   const handleDemandChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       demand: value,
//     }));
//   };

//   const handleFilesChange = (name, files) => {
//     const fileArray = Array.from(files);
//     setFormData(prev => ({
//       ...prev,
//       frontPictures: fileArray,
//     }));
//   };

//   const handlePropertyImagesChange = (name, files) => {
//     const fileArray = Array.from(files);
//     setFormData(prev => ({
//       ...prev,
//       propertyPictures: fileArray,
//     }));
//   };

//   const handleAddedValueChange = (updatedAddedValue) => {
//     setFormData(prev => ({
//       ...prev,
//       addedValue: updatedAddedValue,
//     }));
//   };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   console.log('React formData state just before submit:', formData);

//   //   try {
//   //     // Create a new FormData object
//   //     const formDataToSubmit = new FormData();

//   //     // Convert the React state into FormData
//   //     for (const [key, value] of Object.entries(formData)) {
//   //       // For arrays of File objects (e.g., frontPictures, propertyPictures)
//   //       if ((key === 'frontPictures' || key === 'propertyPictures') && Array.isArray(value)) {
//   //         value.forEach((file) => {
//   //           formDataToSubmit.append(key, file);
//   //         });
//   //       }
//   //       // For a single File (e.g., video)
//   //       else if (key === 'video' && value instanceof File) {
//   //         formDataToSubmit.append('video', value);
//   //       }
//   //       // For arrays of objects (e.g., facilities, floors)
//   //       else if ((key === 'facilities' || key === 'floors') && Array.isArray(value)) {
//   //         formDataToSubmit.append(key, JSON.stringify(value));
//   //       }
//   //       // For nested objects (e.g., budget, commission, addedValue)
//   //       else if (key === 'budget' || key === 'commission' || key === 'addedValue') {
//   //         formDataToSubmit.append(key, JSON.stringify(value));
//   //       }
//   //       // For primitive values
//   //       else {
//   //         formDataToSubmit.append(key, value);
//   //       }
//   //     }

//   //     // Log out the FormData key-value pairs
//   //     console.log('FormData key-value pairs:');
//   //     for (const [formKey, val] of formDataToSubmit.entries()) {
//   //       if (val instanceof File) {
//   //         console.log(
//   //           formKey,
//   //           `=> File name: ${val.name}, size: ${val.size}, type: ${val.type}`
//   //         );
//   //       } else {
//   //         console.log(formKey, val);
//   //       }
//   //     }

//   //     // Send the POST request
//   //     const response = await axios.post(
//   //       'api/properties/add',
//   //       formDataToSubmit,
//   //       { headers: { 'Content-Type': 'multipart/form-data' } }
//   //     );

//   //     console.log('Form submitted successfully:', response.data);
//   //     toast.success('Form submitted successfully!');

//   //     // Extract the property id from the response (assuming it's returned as _id)
//   //     const propertyId = response.data._id;
//   //     // Navigate to the PropertyAd page using the property id
//   //     navigate(`/PropertyAd/${propertyId}`);
//   //   } catch (error) {
//   //     const errorMsg =
//   //       error.response && error.response.data && error.response.data.message
//   //         ? error.response.data.message
//   //         : error.message || 'Unknown error occurred';
//   //     console.error('Error submitting form:', errorMsg);
//   //     toast.error(`Failed to submit the form. ${errorMsg}`);
//   //   }
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('React formData state just before submit:', formData);
  
//     try {
//       // Create a new FormData object
//       const formDataToSubmit = new FormData();
  
//       // Convert your React state into FormData
//       for (const [key, value] of Object.entries(formData)) {
//         if ((key === 'frontPictures' || key === 'propertyPictures') && Array.isArray(value)) {
//           value.forEach((file) => {
//             formDataToSubmit.append(key, file);
//           });
//         } else if (key === 'video' && value instanceof File) {
//           formDataToSubmit.append('video', value);
//         } else if ((key === 'facilities' || key === 'floors') && Array.isArray(value)) {
//           formDataToSubmit.append(key, JSON.stringify(value));
//         } else if (key === 'budget' || key === 'commission' || key === 'addedValue') {
//           formDataToSubmit.append(key, JSON.stringify(value));
//         } else {
//           formDataToSubmit.append(key, value);
//         }
//       }
  
//       // Log out everything in the FormData before sending
//       console.log('FormData key-value pairs:');
//       for (const [formKey, val] of formDataToSubmit.entries()) {
//         if (val instanceof File) {
//           console.log(
//             formKey,
//             `=> File name: ${val.name}, size: ${val.size}, type: ${val.type}`
//           );
//         } else {
//           console.log(formKey, val);
//         }
//       }
  
//       // Send the POST request
//       const response = await axios.post(
//         'http://195.179.231.102:6003/api/properties/add',
//         formDataToSubmit,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );
  
//       console.log('Form submitted successfully:', response.data);
//       toast.success('Form submitted successfully!');
  
//       // Try extracting the property id from the response.
//       // Adjust the property key as needed based on your API response.
//       const propertyId = response.data.propertyId || response.data.id;
  
//       if (propertyId) {
//         // Navigate to the PropertyAd page with the property id
//         navigate(`/PropertyAd/${propertyId}`);
//       } else {
//         console.error("Property ID not found in the server response", response.data);
//         toast.error("Property submitted, but no property id was returned.");
//       }
//     } catch (error) {
//       const errorMsg =
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : error.message || 'Unknown error occurred';
//       console.error('Error submitting form:', errorMsg);
//       toast.error(`Failed to submit the form. ${errorMsg}`);
//     }
//   };
  
//   // Merges Step 4's local data into the parent formData
//   const finalUpdateFormData = (localData) => {
//     setFormData(prev => ({
//       ...prev,
//       ...localData,
//     }));
//   };

//   // Steps navigation
//   const nextStep = () => {
//     setCurrentStep(prevStep => prevStep + 1);
//   };
//   const prevStepFn = () => {
//     setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
//   };

//   // Group existing handler functions
//   const handlers = {
//     handleChange,
//     handleFloorChange,
//     handleFilesChange,
//     handleFacilitiesChange,
//     handlePriorityChange,
//     handleBudgetChange,
//     handleCommissionChange,
//     handleAdvanceChange,
//     handlePropertyConditionChange,
//     handleDemandChange,
//     handleAddedValueChange,
//     handleContractTermChange,
//     handlePropertyImagesChange,
//     handleChangeDistrict,
//     handleSubmit,
//   };

//   // Define steps
//   const stepComponents = [
//     <StepOne
//       key={1}
//       nextStep={nextStep}
//       handleChange={handleChange}
//       formData={formData}
//     />,
//     <StepTwo
//       key={2}
//       nextStep={nextStep}
//       prevStep={prevStepFn}
//       handleChange={handleChange}
//       formData={formData}
//     />,
//     <StepThree
//       key={3}
//       nextStep={nextStep}
//       prevStep={prevStepFn}
//       handleChange={handleChange}
//       formData={formData}
//     />,
//     <StepFour
//       key={4}
//       prevStep={prevStepFn}
//       formData={formData}
//       handlers={handlers}
//       finalUpdateFormData={finalUpdateFormData}
//     />,
//   ];

//   return (
//     <Container>
//       <div>
//         {stepComponents[currentStep]}
//         {/* ToastContainer renders notifications */}
//         <ToastContainer 
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </div>
//     </Container>
//   );
// };

// export default MainForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImage from '../../images/bg.jpg';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import API config – adjust the relative path as needed.
import { API_CONFIG } from '../../config/api.config';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f4f4f4;
  }
`;

const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  padding-top: 80px;
`;

const MainForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [cnic, setCnic] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    cnicNumber: '',
    selectedCountry: 'PK',
    city: '',
    district: '',
    phaseBlock: '',
    detectedAddress: '',
    size: '',
    sizeUnit: 'marla',
    coveredWidth: '',
    coveredLength: '',
    coveredDepth: '',
    coveredUnit: 'feet',
    landWidth: '',
    landLength: '',
    landDepth: '',
    landUnit: 'feet',
    propertyNumber: '',
    streetName: '',
    floors: [],
    facilities: [],
    budget: { min: '', max: '' },
    advanceAmount: '',
    priority: '',
    commission: { type: 'percentage', value: '' },
    addedValue: { type: 'percentage', value: '' },
    files: {},
    inquiryType: '',
    propertyType: '',
    propertySubType: '',
    Streetwidth: '',
    StreetwidthUnit: '',
    propertyCondition: '',
    demand: '',
    contractTerm: '',
    frontPictures: '',
    propertyPictures: '',
    phoneNumber: '',
  });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.userId) {
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Error decoding authentication token.');
      }
    }
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
        toast.error('Error decoding temporary token.');
      }
    }
    if (location.state?.cnic) {
      setCnic(location.state.cnic);
    }
    if (location.state?.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
    }
  }, [location]);

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      userId: userId || '',
      cnicNumber: cnic || '',
      phoneNumber: phoneNumber || ''
    }));
  }, [userId, cnic, phoneNumber]);

  // --- Handler functions for steps ---
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeDistrict = (selectedDistrict) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      district: selectedDistrict,
    }));
  };

  const handleFloorChange = (updatedFloors) => {
    const transformedFloors = updatedFloors.map((floor) => ({
      name: floor.name || 'Unnamed Floor',
      features: floor.features
        ? Object.fromEntries(
            Object.entries(floor.features).map(([featureName, featureValue]) => [
              featureName || 'Unnamed Feature',
              featureValue || 0,
            ])
          )
        : {},
    }));
    setFormData(prev => ({
      ...prev,
      floors: transformedFloors,
    }));
  };

  const handleFacilitiesChange = (updatedFacilities) => {
    const transformedFacilities = updatedFacilities.map((facility) => ({
      name: facility.name || 'Unknown',
      value: facility.value === 'Y' || facility.value === 'N' ? facility.value : 'N',
    }));
    setFormData(prev => ({
      ...prev,
      facilities: transformedFacilities,
    }));
  };

  const handlePriorityChange = (value) => {
    setFormData(prev => ({
      ...prev,
      priority: value,
    }));
  };

  const handleBudgetChange = (updatedBudget) => {
    setFormData(prev => ({
      ...prev,
      budget: updatedBudget,
    }));
  };

  const handleCommissionChange = (updatedCommission) => {
    setFormData(prev => ({
      ...prev,
      commission: updatedCommission,
    }));
  };

  const handleAdvanceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      advanceAmount: value,
    }));
  };

  const handlePropertyConditionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      propertyCondition: value,
    }));
  };

  const handleContractTermChange = (value) => {
    setFormData(prev => ({
      ...prev,
      contractTerm: value,
    }));
  };

  const handleDemandChange = (value) => {
    setFormData(prev => ({
      ...prev,
      demand: value,
    }));
  };

  const handleFilesChange = (name, files) => {
    const fileArray = Array.from(files);
    setFormData(prev => ({
      ...prev,
      frontPictures: fileArray,
    }));
  };

  const handlePropertyImagesChange = (name, files) => {
    const fileArray = Array.from(files);
    setFormData(prev => ({
      ...prev,
      propertyPictures: fileArray,
    }));
  };

  const handleAddedValueChange = (updatedAddedValue) => {
    setFormData(prev => ({
      ...prev,
      addedValue: updatedAddedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('React formData state just before submit:', formData);
  
    try {
      // Create a new FormData object
      const formDataToSubmit = new FormData();
  
      // Convert your React state into FormData
      for (const [key, value] of Object.entries(formData)) {
        if ((key === 'frontPictures' || key === 'propertyPictures') && Array.isArray(value)) {
          value.forEach((file) => {
            formDataToSubmit.append(key, file);
          });
        } else if (key === 'video' && value instanceof File) {
          formDataToSubmit.append('video', value);
        } else if ((key === 'facilities' || key === 'floors') && Array.isArray(value)) {
          formDataToSubmit.append(key, JSON.stringify(value));
        } else if (key === 'budget' || key === 'commission' || key === 'addedValue') {
          formDataToSubmit.append(key, JSON.stringify(value));
        } else {
          formDataToSubmit.append(key, value);
        }
      }
  
      // Log out the FormData key-value pairs
      console.log('FormData key-value pairs:');
      for (const [formKey, val] of formDataToSubmit.entries()) {
        if (val instanceof File) {
          console.log(
            formKey,
            `=> File name: ${val.name}, size: ${val.size}, type: ${val.type}`
          );
        } else {
          console.log(formKey, val);
        }
      }
  
      // Send the POST request using the API config URL
      const response = await axios.post(
        `${API_CONFIG.API_URL}/properties/add`,
        formDataToSubmit,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      console.log('Form submitted successfully:', response.data);
      toast.success('Form submitted successfully!');
  
      // Extract the property id from the response.
      const propertyId = response.data.propertyId || response.data.id;
  
      if (propertyId) {
        navigate(`/PropertyAd/${propertyId}`);
      } else {
        console.error("Property ID not found in the server response", response.data);
        toast.error("Property submitted, but no property id was returned.");
      }
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || 'Unknown error occurred';
      console.error('Error submitting form:', errorMsg);
      toast.error(`Failed to submit the form. ${errorMsg}`);
    }
  };
  
  const finalUpdateFormData = (localData) => {
    setFormData(prev => ({
      ...prev,
      ...localData,
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };
  const prevStepFn = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };
  
  const handlers = {
    handleChange,
    handleFloorChange,
    handleFilesChange,
    handleFacilitiesChange,
    handlePriorityChange,
    handleBudgetChange,
    handleCommissionChange,
    handleAdvanceChange,
    handlePropertyConditionChange,
    handleDemandChange,
    handleAddedValueChange,
    handleContractTermChange,
    handlePropertyImagesChange,
    handleChangeDistrict,
    handleSubmit,
  };
  
  const stepComponents = [
    <StepOne
      key={1}
      nextStep={nextStep}
      handleChange={handleChange}
      formData={formData}
    />,
    <StepTwo
      key={2}
      nextStep={nextStep}
      prevStep={prevStepFn}
      handleChange={handleChange}
      formData={formData}
    />,
    <StepThree
      key={3}
      nextStep={nextStep}
      prevStep={prevStepFn}
      handleChange={handleChange}
      formData={formData}
    />,
    <StepFour
      key={4}
      prevStep={prevStepFn}
      formData={formData}
      handlers={handlers}
      finalUpdateFormData={finalUpdateFormData}
    />,
  ];
  
  return (
    <Container>
      <div>
        {stepComponents[currentStep]}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Container>
  );
};

export default MainForm;
