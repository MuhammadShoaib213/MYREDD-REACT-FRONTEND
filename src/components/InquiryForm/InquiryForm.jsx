// MainForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import bgImage from '../../images/bg.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 70vh; // Reduced from 100vh
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px; // Reduced top padding
  padding-top: 80px;
`;

const MainForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [cnic, setCnic] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

  const [formData, setFormData] = useState({
    cnicNumber : '',
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
    contractTerm : '',
    frontPictures:'',
    propertyPictures:'',
  });

  const [currentStep, setCurrentStep] = useState(0);


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
  

  // --- Handler functions for steps 1-3 (unchanged) ---
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleChangeDistrict = (selectedDistrict) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: selectedDistrict,
    }));
  };
  

  // ... handleFloorChange, handleFacilitiesChange, etc., remain the same ...

  //   const handleFloorChange = (updatedFloors) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     floors: updatedFloors,
  //   }));
  // };


  const handleFloorChange = (updatedFloors) => {
    const transformedFloors = updatedFloors.map((floor) => ({
      name: floor.name || 'Unnamed Floor', // Default floor name if missing
      features: floor.features
        ? Object.fromEntries(
            Object.entries(floor.features).map(([featureName, featureValue]) => [
              featureName || 'Unnamed Feature', // Default feature name if missing
              featureValue || 0, // Default feature value if missing
            ])
          )
        : {}, // Default to empty object if features are missing
    }));
  
    setFormData((prev) => ({
      ...prev,
      floors: transformedFloors,
    }));
  };
  

  // const handleFacilitiesChange = (updatedFacilities) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     facilities: updatedFacilities,
  //   }));
  // };



  const handleFacilitiesChange = (updatedFacilities) => {
    const transformedFacilities = updatedFacilities.map((facility) => ({
      name: facility.name || 'Unknown', // Default name if missing
      value: facility.value === 'Y' || facility.value === 'N' ? facility.value : 'N', // Default value
    }));
  
    setFormData((prev) => ({
      ...prev,
      facilities: transformedFacilities,
    }));
  };
  



    const handlePriorityChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      priority: value,
    }));
  };

    const handleBudgetChange = (updatedBudget) => {
    setFormData((prev) => ({
      ...prev,
      budget: updatedBudget,
    }));
  };

    const handleCommissionChange = (updatedCommission) => {
    setFormData((prev) => ({
      ...prev,
      commission: updatedCommission,
    }));
  };

  const handleAdvanceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      advanceAmount: value,
    }));
  };

  const handlePropertyConditionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      propertyCondition: value,
    }));
  };  


  const handleContractTermChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      contractTerm: value,
    }));
  };  

  const handleDemandChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      demand: value,
    }));
  };  
  
  const handleFilesChange = (name, files) => {
    const fileArray = Array.from(files);

    setFormData((prev) => ({
      ...prev,
        frontPictures: fileArray, // Store files by field name

    }));
  };


  const handlePropertyImagesChange = (name, files) => {
    const fileArray = Array.from(files);

    setFormData((prev) => ({
      ...prev,
      propertyPictures: fileArray, // Store files by field name

    }));
  };

  

  const handleAddedValueChange = (updatedAddedValue) => {
    setFormData((prev) => ({
      ...prev,
      addedValue: updatedAddedValue,
    }));
  };

  // // --- Final submission (gets called by Step 4's <form onSubmit>) ---
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   try {
  //     // Initialize FormData
  //     const formDataToSubmit = new FormData();
  
  //     // Add form data fields to FormData object
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (Array.isArray(value)) {
  //         // If value is an array (e.g., files or other lists)
  //         value.forEach((item, index) => {
  //           formDataToSubmit.append(`${key}[${index}]`, item);
  //         });
  //       } else if (typeof value === 'object' && value !== null) {
  //         // If value is an object (e.g., nested objects like budget)
  //         Object.entries(value).forEach(([nestedKey, nestedValue]) => {
  //           formDataToSubmit.append(`${key}[${nestedKey}]`, nestedValue);
  //         });
  //       } else {
  //         // For regular fields
  //         formDataToSubmit.append(key, value);
  //       }
  //     });
  
  //     // Make the POST request
  //     const response = await axios.post(
  //       'http://195.179.231.102:6003/api/properties/add',
  //       formDataToSubmit,
  //       {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       }
  //     );
  
  //     // Handle the response
  //     console.log('Form submitted successfully:', response.data);
  //     alert('Form submitted successfully!');
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error submitting form:', error.response || error.message);
  //     alert('Failed to submit the form. Please try again.');
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Log the React state before submitting
    console.log('React formData state just before submit:', formData);

    try {
      // 2. Create a new FormData object
      const formDataToSubmit = new FormData();

      // 3. Convert your React state into FormData
      for (const [key, value] of Object.entries(formData)) {
        // If it's an array of File objects (e.g., frontPictures, propertyPictures)
        if ((key === 'frontPictures' || key === 'propertyPictures') && Array.isArray(value)) {
          value.forEach((file) => {
            formDataToSubmit.append(key, file);
          });
        }
        // If it's a single File (e.g., video)
        else if (key === 'video' && value instanceof File) {
          formDataToSubmit.append('video', value);
        }
        // If it's an array of objects (e.g., facilities, floors)
        else if (
          (key === 'facilities' || key === 'floors') &&
          Array.isArray(value)
        ) {
          // Stringify the entire array
          formDataToSubmit.append(key, JSON.stringify(value));
        }
        // If it's a nested object (e.g., budget, commission, addedValue)
        else if (
          key === 'budget' ||
          key === 'commission' ||
          key === 'addedValue'
        ) {
          formDataToSubmit.append(key, JSON.stringify(value));
        }
        // Otherwise, treat it as a primitive (string/number/etc.)
        else {
          formDataToSubmit.append(key, value);
        }
      }

      // 4. Log out everything in the FormData right before sending
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

      // 5. Send the POST request
      const response = await axios.post(
        'http://195.179.231.102:6003/api/properties/add',
        formDataToSubmit,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // 6. Log response from server
      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      alert('Failed to submit the form. Please try again.');
    }
  };
  
  
 // This function merges Step 4's local data into parent formData
 const finalUpdateFormData = (localData) => {
   setFormData((prev) => ({
     ...prev,
     ...localData,
   }));
 };

  // Steps navigation
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const prevStepFn = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Group existing handler functions
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
    // ...
  };

  // Define steps
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
      {/* <div>
        <h3>Form Data Preview:</h3>
        <pre style={{ background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div> */}
    </div>
    </Container>
  );
};

export default MainForm;
