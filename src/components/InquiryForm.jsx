import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
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


const InquiryForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token'); // Adjust depending on where you store your token
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; 
    const cnic = location.state?.cnic;
    const phoneNumber = location.state?.phoneNumber;
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      // purpose: '',
      userId: userId,
      cnicNumber: cnic || '',  // Use empty string if cnicNumber is undefined
      phoneNumber: phoneNumber || '',  // Use empty string if phoneNumber is undefined
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

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

  //   const handleChange = (input) => (e) => {
  //     const { name, value, checked, type } = e.target;
  //     if (type === 'checkbox') {
  //         setFormData(prevState => ({
  //             ...prevState,
  //             [input]: { ...prevState[input], [name]: checked }
  //         }));
  //     } else {
  //         setFormData(prevState => ({
  //             ...prevState,
  //             [input]: value
  //         }));
  //     }
  // };
  
  // const handleChange = (input, subInput = null) => (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   if (type === 'checkbox') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [name]: checked }
  //     }));
  //   } else if (type === 'file') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: files
  //     }));
  //   } else if (subInput) {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [subInput]: value }
  //     }));
  //   } else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: value
  //     }));
  //   }
  // };

  // const handleChange = (input, subInput = null) => (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   if (type === 'checkbox') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [name]: checked }
  //     }));
  //   } else if (type === 'file') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: files
  //     }));
  //   } else if (subInput) {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [subInput]: value }
  //     }));
  //   } else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: value
  //     }));
  //   }
  // };
    

  // const handleChange = (input, subInput = null) => (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   if (type === 'checkbox') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [name]: checked }
  //     }));
  //   } else if (type === 'file') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: files
  //     }));
  //   } else if (subInput) {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [subInput]: value }
  //     }));
  //   } else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: value
  //     }));
  //   }
  // };

  // const handleChange = (input, subInput = null) => (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   if (type === 'checkbox') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [name]: checked }
  //     }));
  //   } else if (type === 'file') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: files
  //     }));
  //   } else if (subInput) {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: { ...prevState[input], [subInput]: value }
  //     }));
  //   } else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [input]: value
  //     }));
  //   }
  //   console.log(`Field updated: ${input}${subInput ? ` -> ${subInput}` : ''}, Value: ${type === 'checkbox' ? checked : value}`);

  // };
  
  
//   const handleChange = (input, subInput = null) => (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === 'checkbox') {
//         setFormData(prevState => {
//             const newState = { ...prevState, [input]: { ...prevState[input], [name]: checked } };
//             console.log(`Updated formData:`, newState);
//             return newState;
//         });
//     } else if (type === 'file') {
//         setFormData(prevState => ({ ...prevState, [input]: files }));
//     } else if (subInput) {
//         setFormData(prevState => ({ ...prevState, [input]: { ...prevState[input], [subInput]: value } }));
//     } else {
//         setFormData(prevState => ({ ...prevState, [input]: value }));
//     }
// };


const handleChange = (input, subInput = null) => (e) => {
  const { name, value, type, checked } = e.target;
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



//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     console.log('Final form data:', formData); // Check what is being submitted
  
//     const submitData = new FormData();
//     Object.keys(formData).forEach(key => {
//       const value = formData[key];
//       if (Array.isArray(value)) { // Assuming images or files are arrays
//         value.forEach(file => submitData.append(key, file));
//       } else if (typeof value === 'object') {
//         submitData.append(key, JSON.stringify(value));
//       } else {
//         submitData.append(key, value);
//       }
//     });
  
//     try {
//       const response = await axios.post('http://195.179.231.102:6003/api/properties/add', submitData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       console.log('Form submitted successfully:', response.data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
  

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log('Final form data:', formData); // Check what is being submitted

//   const submitData = new FormData();
//   Object.keys(formData).forEach(key => {
//     const value = formData[key];
//     if (Array.isArray(value)) { // Assuming images or files are arrays
//       value.forEach(file => submitData.append(key, file));
//     } else if (typeof value === 'object') {
//       submitData.append(key, JSON.stringify(value));
//     } else {
//       submitData.append(key, value);
//     }
//   });

//   try {
//     const response = await axios.post('http://195.179.231.102:6003/api/properties/add', submitData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     console.log('Form submitted successfully:', response.data);
//   } catch (error) {
//     console.error('Error submitting form:', error);
//   }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log('Final form data before processing:', formData);

//   const submitData = new FormData();
//   Object.keys(formData).forEach(key => {
//       const value = formData[key];
//       console.log(`Appending to FormData: ${key}:`, value); // Log data being appended
//       if (Array.isArray(value)) {
//           value.forEach(file => submitData.append(key, file));
//       } else if (typeof value === 'object') {
//           submitData.append(key, JSON.stringify(value));
//       } else {
//           submitData.append(key, value);
//       }
//   });

//   try {
//       const response = await axios.post('http://195.179.231.102:6003/api/properties/add', submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       console.log('Form submitted successfully:', response.data);
//   } catch (error) {
//       console.error('Error submitting form:', error);
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log('Final form data before processing:', formData);

//   const submitData = new FormData();
// //   Object.keys(formData).forEach(key => {
// //       const value = formData[key];
// //       if (key === 'images' && value.length) {
// //           // Check if it's the image array and has content
// //           Array.from(value).forEach(file => {
// //               submitData.append(key, file);
// //               console.log(`Appending image:`, file.name); // Debugging to ensure files are appended
// //           });
// //       } else if (typeof value === 'object' && !Array.isArray(value)) {
// //           // Handle JSON data, ensure other data isn't skipped
// //           submitData.append(key, JSON.stringify(value));
// //       } else {
// //           // Handle other data types
// //           submitData.append(key, value);
// //       }
// //   });
// Object.keys(formData).forEach(key => {
//     const value = formData[key];
//     console.log(`Appending ${key}: ${value}`); // Debug statement to log what's being appended
//     if (Array.isArray(value)) {
//         value.forEach(file => submitData.append(key, file));
//     } else if (typeof value === 'object' && !Array.isArray(value) && key !== 'status') {
//         submitData.append(key, JSON.stringify(value));
//     } else {
//         submitData.append(key, value);
//     }
// });


//   // Debugging: Log FormData to ensure it contains what you expect
//   for (let pair of submitData.entries()) {
//       console.log(`${pair[0]}: ${pair[1] instanceof Blob ? 'File...' : pair[1]}`);
//   }

//   try {
//       const response = await axios.post('http://195.179.231.102:6003/api/properties/add', submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       console.log('Form submitted successfully:', response.data);
//       alert('Inquiry Generated');
//       navigate('/PropertyView');
//   } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error Generating Inquiry');
//   }
// };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Final form data before processing:', formData);
    
    const submitData = new FormData();
    
    // Loop through each key in the formData object and append it to submitData
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      
      console.log(`Processing key: ${key}, value: ${value}`); // Log the key and value
    
      // Check if the value is an array (like for file uploads)
      if (Array.isArray(value)) {
        // Append each file under the 'images' field if key is 'images'
        if (key === 'images') {
          Array.from(value).forEach(file => {
            console.log(`Appending file to ${key}:`, file.name); // Log each file
            submitData.append(key, file); // Append the file to FormData
          });
        }
      } else if (key === 'video' && value) {
        console.log(`Appending video file:`, value.name);
        submitData.append('video', value); // Appending video if it exists
      } else if (typeof value === 'object' && !Array.isArray(value) && key !== 'status') {
        submitData.append(key, JSON.stringify(value));
      } else {
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
      const response = await axios.post('http://195.179.231.102:6003/api/properties/add', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    
      // Log the full response for debugging purposes
      console.log('API response:', response);
  
      const { propertyId } = response.data;
    
      console.log('Received property ID:', propertyId);
    
      alert('Inquiry Generated');
    
      navigate(`/PropertyAd/${propertyId}`, { state: { propertyId } });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error Generating Inquiry');
    }
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
            {stepComponents[currentStep - 1]}
        </div>
    );
};

export default InquiryForm;