// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { useNavigate } from 'react-router-dom';
// // // import {jwtDecode} from 'jwt-decode'; // Correct import statement



// // // // Styling for containers and form elements
// // // const PageContainer = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   min-height: 100vh;
// // // `;

// // // const StepContainer = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   width: 1200px; // Adjust this width to contain both steps side by side
// // // `;

// // // const Container = styled.div`
// // //   flex: 1;
// // //   padding: 20px;
// // //   margin: 10px;
// // //   background: #f0f0f0;
// // //   border-radius: 8px;
// // //   box-shadow: 0 2px 5px rgba(0,0,0,0.2);
// // //   width: 45%; // Each container takes up 45%, leaving space for margins
// // //   display: none; // Initially hidden, shown based on the step
// // // `;

// // // const Form = styled.form`
// // //   display: flex;
// // //   flex-direction: column;
// // // `;

// // // const Input = styled.input`
// // //   padding: 8px;
// // //   margin-bottom: 10px;
// // //   border: 2px solid #ccc;
// // //   border-radius: 5px;
// // // `;

// // // const Select = styled.select`
// // //   padding: 8px;
// // //   margin-bottom: 10px;
// // //   border: 2px solid #ccc;
// // //   border-radius: 5px;
// // // `;

// // // const Button = styled.button`
// // //   padding: 10px 20px;
// // //   background-color: #FF0000;
// // //   color: white;
// // //   border: none;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   &:hover {
// // //     background-color: #D3D3D3;
// // //   }
// // // `;

// // // // Component for the multi-step form
// // // const CustomerInquiryForm = () => {
// // //   const navigate = useNavigate();
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [formData, setFormData] = useState({
// // //     cnicNumber: '',
// // //     cityFrom: '',
// // //     currentCity: '',
// // //     fullName: '',
// // //     gender: '',
// // //     image: null,
// // //     profession: '',
// // //     age: '',
// // //     officialMobile: '',
// // //     personalMobile: '',
// // //     whatsappMobile: '',
// // //     officialEmail: '',
// // //     personalEmail: '',
// // //     maritalStatus: '',
// // //     dependants: '',
// // //     currentAddress: '',
// // //     contactPreference: ''
// // //   });


// // //   const [countries, setCountries] = useState([]);
// // //   const [phoneCodes, setPhoneCodes] = useState({});
// // //   const [selectedCountry, setSelectedCountry] = useState('');
// // //   const [cities, setCities] = useState([]);

// // //   useEffect(() => {
// // //     fetchCountries();
// // //   }, []);

// // //   const fetchCountries = () => {
// // //     fetch('http://api.geonames.org/countryInfoJSON?username=shoaib1')
// // //       .then(response => response.json())
// // //       .then(data => {
// // //         setCountries(data.geonames);
// // //         const codes = {};
// // //         data.geonames.forEach(country => {
// // //           if (country.phoneCode) {  // Make sure phone code exists
// // //             codes[country.countryCode] = `+${country.phoneCode}`;
// // //           }
// // //         });
// // //         setPhoneCodes(codes);  // Ensure this state is updated here
// // //         console.log(data);
// // //       })
// // //       .catch(error => console.error('Failed to fetch countries:', error));
// // //   };
    
  

// // //   const fetchCities = (countryCode) => {
// // //     fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`)
// // //       .then(response => {
// // //         if (!response.ok) {
// // //           throw new Error('Network response was not ok');
// // //         }
// // //         return response.json();
// // //       })
// // //       .then(data => setCities(data.geonames))
// // //       .catch(error => console.error('Failed to fetch cities', error));
// // //   };

// // //  const handleCountryChange = (e) => {
// // //   const countryCode = e.target.value;
// // //   setSelectedCountry(countryCode);

// // //   // Prepend the new country code to the phone numbers
// // //   setFormData({
// // //     ...formData,
// // //     officialMobile: phoneCodes[countryCode] + (formData.officialMobile || ''),
// // //     personalMobile: phoneCodes[countryCode] + (formData.personalMobile || ''),
// // //     whatsappMobile: phoneCodes[countryCode] + (formData.whatsappMobile || '')
// // //   });

// // //   if (countryCode) {
// // //     fetchCities(countryCode);
// // //   } else {
// // //     setCities([]);
// // //   }
// // // };

// // //   const handleChange = (e) => {
// // //     const { name, value, files } = e.target;
// // //     if (files) {
// // //       setFormData({ ...formData, [name]: files[0] });
// // //     } else {
// // //       setFormData({ ...formData, [name]: value });
// // //     }

// // //     if (name === 'officialMobile' || name === 'personalMobile' || name === 'whatsappMobile') {
// // //       const strippedValue = value.replace(phoneCodes[selectedCountry], ''); // Strip the country code
// // //       setFormData({ ...formData, [name]: strippedValue });
// // //     } else if (files) {
// // //       setFormData({ ...formData, [name]: files[0] });
// // //     } else {
// // //       setFormData({ ...formData, [name]: value });
// // //     }
// // //   };

// // //   const handleNext = () => {
// // //     setCurrentStep(2); // Move to step 2 without submitting
// // //   };

// // // //   const handleSubmit = async (event) => {
// // // //     event.preventDefault();
// // // //     const data = new FormData();
// // // //     Object.keys(formData).forEach(key => {
// // // //         if (key === 'image' && formData[key]) {
// // // //             data.append(key, formData[key], formData[key].name);
// // // //         } else {
// // // //             data.append(key, formData[key]);
// // // //         }
// // // //     });

// // // //     try {
// // // //         const response = await axios.post('http://195.179.231.102:6003/api/customers/add', data, {
// // // //             headers: {
// // // //                 'Content-Type': 'multipart/form-data'
// // // //             }
// // // //         });

// // // //         // Check the response and display a toast message accordingly
// // // //         if (response.status === 201) {
// // // //             toast.success('Customer added successfully!, Navigating to Inquiry Form', {
// // // //                 position: "top-right",
// // // //                 autoClose: 5000,
// // // //                 hideProgressBar: false,
// // // //                 closeOnClick: true,
// // // //                 pauseOnHover: true,
// // // //                 draggable: true,
// // // //                 progress: undefined,
// // // //             });

// // // //             navigate('/InquiryForm', { state: { cnicNumber: formData.cnicNumber } });

// // // //         } else {
// // // //             // Handle unexpected statuses by showing an error toast
// // // //             toast.error(`Unexpected status: ${response.status}`, {
// // // //                 position: "top-right",
// // // //                 autoClose: 5000,
// // // //                 hideProgressBar: false,
// // // //                 closeOnClick: true,
// // // //                 pauseOnHover: true,
// // // //                 draggable: true,
// // // //                 progress: undefined,
// // // //             });
// // // //         }
// // // //     } catch (error) {
// // // //         console.error('Error submitting form:', error);
// // // //         // Display a toast message for the error
// // // //         toast.error('Error submitting the form. Please check your connection and try again.', {
// // // //             position: "top-right",
// // // //             autoClose: 5000,
// // // //             hideProgressBar: false,
// // // //             closeOnClick: true,
// // // //             pauseOnHover: true,
// // // //             draggable: true,
// // // //             progress: undefined,
// // // //         });
// // // //     }
// // // // };



// // // const handleSubmit = async (event) => {
// // //   event.preventDefault();
// // //   const token = localStorage.getItem('token'); // Retrieve the token from localStorage
// // //   let userId = '';

// // //   if (token) {
// // //     try {
// // //       const decoded = jwtDecode(token); // Decode the token
// // //       userId = decoded.userId; // Assuming 'userId' is the key where user ID is stored
// // //     } catch (error) {
// // //       console.error("Error decoding token:", error);
// // //       toast.error('Session expired. Please login again.', {
// // //         position: "top-right",
// // //         autoClose: 5000,
// // //         hideProgressBar: false,
// // //         closeOnClick: true,
// // //         pauseOnHover: true,
// // //         draggable: true,
// // //         progress: undefined,
// // //       });
// // //       navigate('/login'); // Redirect to login or appropriate page
// // //       return; // Stop further execution
// // //     }
// // //   }

// // //   const data = new FormData();
// // //   Object.keys(formData).forEach(key => {
// // //     if (key === 'image' && formData[key]) {
// // //       data.append(key, formData[key], formData[key].name);
// // //     } else {
// // //       data.append(key, formData[key]);
// // //     }
// // //   });
// // //   data.append('userId', userId); // Append the user ID to the form data

// // //   try {
// // //     const response = await axios.post('http://195.179.231.102:6003/api/customers/add', data, {
// // //       headers: {
// // //         'Content-Type': 'multipart/form-data'
// // //       }
// // //     });

// // //     if (response.status === 201) {
// // //       toast.success('Customer added successfully!, Navigating to Inquiry Form', {
// // //         position: "top-right",
// // //         autoClose: 5000,
// // //         hideProgressBar: false,
// // //         closeOnClick: true,
// // //         pauseOnHover: true,
// // //         draggable: true,
// // //         progress: undefined,
// // //       });
// // //       console.log(data);
// // //       navigate('/InquiryForm', { state: { cnicNumber: formData.cnicNumber } });
// // //     } else {
// // //       toast.error(`Unexpected status: ${response.status}`, {
// // //         position: "top-right",
// // //         autoClose: 5000,
// // //         hideProgressBar: false,
// // //         closeOnClick: true,
// // //         pauseOnHover: true,
// // //         draggable: true,
// // //         progress: undefined,
// // //       });
// // //     }
// // //   } catch (error) {
// // //     console.error('Error submitting form:', error);
// // //     toast.error('Error submitting the form. Please check your connection and try again.', {
// // //       position: "top-right",
// // //       autoClose: 5000,
// // //       hideProgressBar: false,
// // //       closeOnClick: true,
// // //       pauseOnHover: true,
// // //       draggable: true,
// // //       progress: undefined,
// // //     });
// // //   }
// // // };


// // //   return (
// // //     <PageContainer>
// // //         <ToastContainer />
// // //       <StepContainer>
// // //         <Container style={{ display: 'block' }}>
// // //           <h2>Step 1: Basic Details</h2>
// // //           <Form onSubmit={handleSubmit}>
// // //             {/* Form fields for Step 1 */}
// // //             <Input type="text" name="cnicNumber" placeholder="CNIC (16 digits)" value={formData.cnicNumber} onChange={handleChange} maxLength={16} />
// // //             <Select name="country" value={selectedCountry} onChange={handleCountryChange}>
// // //               <option value="">Select your Country</option>
// // //               {countries.map((country) => (
// // //                 <option key={country.countryCode} value={country.countryCode}>
// // //                   {country.countryName}
// // //                 </option>
// // //               ))}
// // //             </Select>
// // //             <Select name="cityFrom" value={formData.cityFrom} onChange={handleChange}>
// // //               <option value="">Select your city</option>
// // //               {cities.map((city) => (
// // //                 <option key={city.geonameId} value={city.name}>
// // //                   {city.name}
// // //                 </option>
// // //               ))}
// // //             </Select>
// // //             <Select name="currentCity" value={formData.currentCity} onChange={handleChange}>
// // //               <option value="">Select your Current city</option>
// // //               {cities.map((city) => (
// // //                 <option key={city.geonameId} value={city.name}>
// // //                   {city.name}
// // //                 </option>
// // //               ))}
// // //             </Select>
// // //             <Input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
// // //             <Select name="gender" value={formData.gender} onChange={handleChange}>
// // //               <option value="">Gender</option>
// // //               <option value="Male">Male</option>
// // //               <option value="Female">Female</option>
// // //             </Select>
// // //             <Input type="file" name="image" onChange={handleChange} />
// // //             <Input type="text" name="profession" placeholder="Profession (Optional)" value={formData.profession} onChange={handleChange} />
// // //             <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
// // //             <Button type="button" onClick={handleNext}>Save and Next</Button>
// // //           </Form>
// // //         </Container>
// // //         {currentStep === 2 && (
// // //           <Container style={{ display: 'block' }}>
// // //             <h2>Step 2: Contact Details</h2>
// // //             <Form onSubmit={handleSubmit}>
// // //               {/* Form fields for Step 2 */}
// // //               {/* <Input type="text" name="officialMobile" placeholder="Official Mobile #" value={formData.officialMobile} onChange={handleChange} />
// // //               <Input type="text" name="personalMobile" placeholder="Personal Mobile #" value={formData.personalMobile} onChange={handleChange} />
// // //               <Input type="text" name="whatsappMobile" placeholder="WhatsApp Mobile #" value={formData.whatsappMobile} onChange={handleChange} /> */}
// // //                <Input
// // //           type="text"
// // //           name="officialMobile"
// // //           placeholder="Official Mobile #"
// // //           value={formData.officialMobile}
// // //           onChange={(e) => setFormData({...formData, officialMobile: e.target.value})}
// // //         />
// // //         <Input
// // //           type="text"
// // //           name="personalMobile"
// // //           placeholder="Personal Mobile #"
// // //           value={formData.personalMobile}
// // //           onChange={(e) => setFormData({...formData, personalMobile: e.target.value})}
// // //         />
// // //         <Input
// // //           type="text"
// // //           name="whatsappMobile"
// // //           placeholder="WhatsApp Mobile #"
// // //           value={formData.whatsappMobile}
// // //           onChange={(e) => setFormData({...formData, whatsappMobile: e.target.value})}
// // //         />
// // //               <Input type="email" name="officialEmail" placeholder="Official Email" value={formData.officialEmail} onChange={handleChange} />
// // //               <Input type="email" name="personalEmail" placeholder="Personal Email" value={formData.personalEmail} onChange={handleChange} />
// // //               <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
// // //                 <option value="">Marital Status</option>
// // //                 <option value="Single">Single</option>
// // //                 <option value="Married">Married</option>
// // //               </Select>
// // //               <Input type="text" name="dependants" placeholder="Number of Dependents (if married)" value={formData.dependants} onChange={handleChange} />
// // //               <Input type="text" name="currentAddress" placeholder="Your current address" value={formData.currentAddress} onChange={handleChange} />
// // //               <Select name="contactPreference" value={formData.contactPreference} onChange={handleChange}>
// // //                 <option value="">Preferred way to contact</option>
// // //                 <option value="Call">Call</option>
// // //                 <option value="Email">Email</option>
// // //                 <option value="SMS">SMS</option>
// // //                 <option value="WhatsApp">WhatsApp</option>
// // //                 <option value="In Person">In Person</option>
// // //               </Select>
// // //               <Button type="submit">Save Customer</Button>
// // //             </Form>
// // //           </Container>
// // //         )}
// // //       </StepContainer>
// // //     </PageContainer>
// // //   );
// // // };

// // // export default CustomerInquiryForm;



// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { useNavigate } from 'react-router-dom';
// // import {jwtDecode} from 'jwt-decode'; // Correct import statement
// // import { getCountryCallingCode } from 'libphonenumber-js';
// // import bgImage from '../images/bg.jpg';


// // // Styling for containers and form elements
// // const PageContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   min-height: 100vh;
// //   background-image: url(${bgImage});
// //   background-size: cover;
// //   background-position: center;
// //   background-blend-mode: overlay;
// //   background-color: rgba(0, 0, 0, 0.5);

// //    @media (max-width: 768px) { 
// //     padding: 10px;
// //   }
// // `;

// // const StepContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   width: 1200px; // Adjust this width to contain both steps side by side

// //     @media (max-width: 768px) { // For tablets and below
// //     flex-direction: column;
// //     width: 100%; // Take up full width for smaller screens
// //   }
// // `;

// // const Container = styled.div`
// //   flex: 1;
// //   padding: 20px;
// //   margin: 10px;
// //   background: #f0f0f0;
// //   border-radius: 8px;
// //   box-shadow: 0 2px 5px rgba(0,0,0,0.2);
// //   width: 45%; // Each container takes up 45%, leaving space for margins
// //   display: none; // Initially hidden, shown based on the step

// //    @media (max-width: 768px) { 
// //     width: 85%; // Full width on smaller screens
// //     margin: 15px 15px; // Adjust margin for mobile view
// //   }
// // `;

// // const Form = styled.form`
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const Input = styled.input`
// //   padding: 8px;
// //   margin-bottom: 10px;
// //   border: 2px solid #ccc;
// //   border-radius: 5px;
// // `;

// // const Select = styled.select`
// //   padding: 8px;
// //   margin-bottom: 10px;
// //   border: 2px solid #ccc;
// //   border-radius: 5px;
// // `;

// // const Button = styled.button`
// //   padding: 10px 20px;
// //   background-color: #FF0000;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   &:hover {
// //     background-color: #D3D3D3;
// //   }
// // `;

// // const ModalOverlay = styled.div`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   height: 100vh;
// //   background-color: rgba(0, 0, 0, 0.5);
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   z-index: 1000;  // Ensure it's above other content
// // `;

// // const ModalContainer = styled.div`
// //   background-color: #fff;
// //   padding: 20px;
// //   border-radius: 8px;
// //   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// //   width: 500px;  // Adjust size as necessary
// //   position: relative;
// // `;

// // const CloseButton = styled.button`
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   border: none;
// //   background: none;
// //   font-size: 24px;
// //   cursor: pointer;
// // `;

// // // Component for the multi-step form
// // const CustomerInquiryForm = () => {
// //   const navigate = useNavigate();
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [formData, setFormData] = useState({
// //     cnicNumber: '',
// //     country: '', 
// //     cityFrom: '',
// //     currentCity: '',
// //     fullName: '',
// //     gender: '',
// //     image: null,
// //     profession: '',
// //     age: '',
// //     officialMobile: '',
// //     personalMobile: '',
// //     whatsappMobile: '',
// //     officialEmail: '',
// //     personalEmail: '',
// //     maritalStatus: '',
// //     dependants: '',
// //     currentAddress: '',
// //     contactPreference: ''
// //   });


// //   const [countries, setCountries] = useState([]);
// //   const [phoneCodes, setPhoneCodes] = useState({});
// //   const [selectedCountry, setSelectedCountry] = useState('');
// //   const [cities, setCities] = useState([]);
// //   const [otherCity, setOtherCity] = useState({ cityFrom: false, currentCity: false });
// //   const [modalVisible, setModalVisible] = useState(false);


// //   useEffect(() => {
// //     fetchCountries();
// //   }, []);

// //   const fetchCountries = () => {
// //     fetch('http://api.geonames.org/countryInfoJSON?username=shoaib1')
// //       .then(response => response.json())
// //       .then(data => {
// //         setCountries(data.geonames); // Storing just the country data
// //         console.log(data);
// //       })
// //       .catch(error => console.error('Failed to fetch countries:', error));
// //   };
  
    
  

// //   const fetchCities = (countryCode) => {
// //     fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`)
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then(data => setCities(data.geonames))
// //       .catch(error => console.error('Failed to fetch cities', error));
// //   };

// //   const handleCountryChange = (e) => {
// //     const countryCode = e.target.value;
// //     setSelectedCountry(countryCode);

// //     // Ensure that getCountryCallingCode is working as expected
// //     let phoneCode = '';
// //     try {
// //         phoneCode = getCountryCallingCode(countryCode);
// //     } catch (error) {
// //         console.error('Failed to get phone code:', error);
// //         phoneCode = ''; // Ensure a fallback or default behavior
// //     }

// //     setFormData(prevFormData => ({
// //         ...prevFormData,
// //         country: countryCode, // Check this is correctly obtaining value from e.target.value
// //         officialMobile: `+${phoneCode}`,
// //         personalMobile: `+${phoneCode}`,
// //         whatsappMobile: `+${phoneCode}`
// //     }));

// //     if (countryCode) {
// //         fetchCities(countryCode);
// //     } else {
// //         setCities([]);
// //     }
// // };



// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (files) {
// //       setFormData({ ...formData, [name]: files[0] });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }

// //     if (name === 'officialMobile' || name === 'personalMobile' || name === 'whatsappMobile') {
// //       const strippedValue = value.replace(phoneCodes[selectedCountry], ''); // Strip the country code
// //       setFormData({ ...formData, [name]: strippedValue });
// //     } else if (files) {
// //       setFormData({ ...formData, [name]: files[0] });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const handleNext = () => {
// //     setCurrentStep(2); // Move to step 2 without submitting
// //   };


// // const handleSubmit = async (event) => {
// //   event.preventDefault();
// //   const token = localStorage.getItem('token'); // Retrieve the token from localStorage
// //   let userId = '';

// //   if (token) {
// //     try {
// //       const decoded = jwtDecode(token); // Decode the token
// //       userId = decoded.userId; // Assuming 'userId' is the key where user ID is stored
// //     } catch (error) {
// //       console.error("Error decoding token:", error);
// //       toast.error('Session expired. Please login again.', {
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //       });
// //       navigate('/login'); // Redirect to login or appropriate page
// //       return; // Stop further execution
// //     }
// //   }

// //   const data = new FormData();
// //   Object.keys(formData).forEach(key => {
// //     if (key === 'image' && formData[key]) {
// //       data.append(key, formData[key], formData[key].name);
// //     } else {
// //       data.append(key, formData[key]);
// //     }
// //   });
// //   data.append('userId', userId); // Append the user ID to the form data

// //   try {
// //     console.log(formData);
// //     const response = await axios.post('http://195.179.231.102:6003/api/customers/add', data, {
// //       headers: {
// //         'Content-Type': 'multipart/form-data'
// //       }
// //     });

// //     if (response.status === 201) {
// //       toast.success('Customer added successfully!, Navigating to Inquiry Form', {
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //       });
// //       console.log(data);
// //       setModalVisible(true); 
// //       // navigate('/InquiryForm', { state: { cnicNumber: formData.cnicNumber } });
// //     } else {
// //       toast.error(`Unexpected status: ${response.status}`, {
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Error submitting form:', error);
// //     toast.error('Error submitting the form. Please check your connection and try again.', {
// //       position: "top-right",
// //       autoClose: 5000,
// //       hideProgressBar: false,
// //       closeOnClick: true,
// //       pauseOnHover: true,
// //       draggable: true,
// //       progress: undefined,
// //     });
// //   }
// // };


// // const handleModalClose = (route) => {
// //   setModalVisible(false);
// //   navigate(route); // Navigate based on button clicked in modal
// // };

// //   return (
// //     <PageContainer>
// //         <ToastContainer />
// //       <StepContainer>
// //         <Container style={{ display: 'block' }}>
// //           <h2>Step 1: Basic Details</h2>
// //           <Form onSubmit={handleSubmit}>
// //             {/* Form fields for Step 1 */}
// //             <Input type="text" name="cnicNumber" placeholder="CNIC (16 digits)" value={formData.cnicNumber} onChange={handleChange} maxLength={16} />
// //             <Select name="country" value={selectedCountry} onChange={handleCountryChange}>
// //               <option value="">Select your Country</option>
// //               {countries.map((country) => (
// //                 <option key={country.countryCode} value={country.countryCode}>
// //                   {country.countryName}
// //                 </option>
// //               ))}
// //             </Select>
// //             <Select name="cityFrom" value={formData.cityFrom} onChange={handleChange}>
// //               <option value="">Select your city</option>
// //               {cities.map((city) => (
// //                 <option key={city.geonameId} value={city.name}>
// //                   {city.name}
// //                 </option>
// //               ))}
// //             </Select>
// //             <Select name="currentCity" value={formData.currentCity} onChange={handleChange}>
// //               <option value="">Select your Current city</option>
// //               {cities.map((city) => (
// //                 <option key={city.geonameId} value={city.name}>
// //                   {city.name}
// //                 </option>
// //               ))}
// //             </Select>
// //             <Input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
// //             <Select name="gender" value={formData.gender} onChange={handleChange}>
// //               <option value="">Gender</option>
// //               <option value="Male">Male</option>
// //               <option value="Female">Female</option>
// //             </Select>
// //             <Input type="file" name="image" onChange={handleChange} />
// //             <Input type="text" name="profession" placeholder="Profession (Optional)" value={formData.profession} onChange={handleChange} />
// //             <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
// //             <Button type="button" onClick={handleNext}>Save and Next</Button>
// //           </Form>
// //         </Container>
// //         {currentStep === 2 && (
// //           <Container style={{ display: 'block' }}>
// //             <h2>Step 2: Contact Details</h2>
// //             <Form onSubmit={handleSubmit}>
// //               {/* Form fields for Step 2 */}
// //                <Input
// //                type="text"
// //                name="officialMobile"
// //                placeholder="Official Mobile #"
// //                value={formData.officialMobile}
// //                onChange={handleChange}
// //                 />
// //                 <Input
// //                 type="text"
// //                 name="personalMobile"
// //                 placeholder="Personal Mobile #"
// //                 value={formData.personalMobile}
// //                 onChange={handleChange}
// //                 />
// //                 <Input
// //                 type="text"
// //                 name="whatsappMobile"
// //                 placeholder="WhatsApp Mobile #"
// //                 value={formData.whatsappMobile}
// //                 onChange={handleChange}
// //                 />

// //               <Input type="email" name="officialEmail" placeholder="Official Email" value={formData.officialEmail} onChange={handleChange} />
// //               <Input type="email" name="personalEmail" placeholder="Personal Email" value={formData.personalEmail} onChange={handleChange} />
// //               <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
// //                 <option value="">Marital Status</option>
// //                 <option value="Single">Single</option>
// //                 <option value="Married">Married</option>
// //               </Select>
// //               <Input type="text" name="dependants" placeholder="Number of Dependents (if married)" value={formData.dependants} onChange={handleChange} />
// //               <Input type="text" name="currentAddress" placeholder="Your current address" value={formData.currentAddress} onChange={handleChange} />
// //               <Select name="contactPreference" value={formData.contactPreference} onChange={handleChange}>
// //                 <option value="">Preferred way to contact</option>
// //                 <option value="Call">Call</option>
// //                 <option value="Email">Email</option>
// //                 <option value="SMS">SMS</option>
// //                 <option value="WhatsApp">WhatsApp</option>
// //                 <option value="In Person">In Person</option>
// //               </Select>
// //               <Button type="submit">Save Customer</Button>
// //             </Form>
// //           </Container>
// //         )}
// //       </StepContainer>
// //       {modalVisible && (
// //         <ModalOverlay onClick={() => setModalVisible(false)}>
// //           <ModalContainer onClick={e => e.stopPropagation()}>
// //             <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
// //             <p>Submission successful! What would you like to do next?</p>
// //             <Button onClick={() => handleModalClose('/dashboard')}>Dashboard</Button>
// //             &nbsp;
// //             <Button onClick={() => handleModalClose('/submit-inquiry')}>Submit an Inquiry</Button>
// //           </ModalContainer>
// //         </ModalOverlay>
// //       )}
// //     </PageContainer>
// //   );
// // };

// // export default CustomerInquiryForm;



// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import { getCountryCallingCode } from 'libphonenumber-js';
// import bgImage from '../images/bg.jpg';

// const PageContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);

//   @media (max-width: 768px) { 
//     padding: 10px;
//   }
// `;

// const StepContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 1200px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     width: 100%;
//   }
// `;

// const Container = styled.div`
//   flex: 1;
//   padding: 20px;
//   margin: 10px;
//   background: #f0f0f0;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//   width: 45%;
//   display: none;

//   @media (max-width: 768px) { 
//     width: 85%;
//     margin: 15px 15px;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 2px solid #ccc;
//   border-radius: 5px;
// `;

// const Select = styled.select`
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 2px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #FF0000;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #D3D3D3;
//   }
// `;

// const ErrorMessage = styled.div`
//   color: #ff6b6b;
//   margin-top: 10px;
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContainer = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   width: 500px;
//   position: relative;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   border: none;
//   background: none;
//   font-size: 24px;
//   cursor: pointer;
// `;

// const CustomerInquiryForm = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     cnicNumber: '',
//     country: '', 
//     cityFrom: '',
//     currentCity: '',
//     fullName: '',
//     gender: '',
//     image: null,
//     profession: '',
//     age: '',
//     officialMobile: '',
//     personalMobile: '',
//     whatsappMobile: '',
//     officialEmail: '',
//     personalEmail: '',
//     maritalStatus: '',
//     dependants: '',
//     currentAddress: '',
//     contactPreference: ''
//   });

//   const [countries, setCountries] = useState([]);
//   const [phoneCodes, setPhoneCodes] = useState({});
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [cities, setCities] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [serverError, setServerError] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = () => {
//     fetch('http://api.geonames.org/countryInfoJSON?username=shoaib1')
//       .then(response => response.json())
//       .then(data => {
//         setCountries(data.geonames);
//         console.log(data);
//       })
//       .catch(error => console.error('Failed to fetch countries:', error));
//   };

//   const fetchCities = (countryCode) => {
//     fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => setCities(data.geonames))
//       .catch(error => console.error('Failed to fetch cities', error));
//   };

//   const handleCountryChange = (e) => {
//     const countryCode = e.target.value;
//     setSelectedCountry(countryCode);

//     let phoneCode = '';
//     try {
//         phoneCode = getCountryCallingCode(countryCode);
//     } catch (error) {
//         console.error('Failed to get phone code:', error);
//         phoneCode = '';
//     }

//     setFormData(prevFormData => ({
//         ...prevFormData,
//         country: countryCode,
//         officialMobile: `+${phoneCode}`,
//         personalMobile: `+${phoneCode}`,
//         whatsappMobile: `+${phoneCode}`
//     }));

//     if (countryCode) {
//         fetchCities(countryCode);
//     } else {
//         setCities([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: files ? files[0] : value
//     }));
//   };

//   const handleNext = () => {
//     setCurrentStep(2);
//   };

//   const validateInputs = () => {
//     const errors = {};
//     if (!/^\d{16}$/.test(formData.cnicNumber)) {
//       errors.cnicNumber = 'CNIC must be a 16-digit number';
//     }
//     if (!formData.country) {
//       errors.country = 'Country is required';
//     }
//     if (!formData.cityFrom) {
//       errors.cityFrom = 'City of origin is required';
//     }
//     if (!formData.currentCity) {
//       errors.currentCity = 'Current city is required';
//     }
//     if (!formData.fullName) {
//       errors.fullName = 'Full name is required';
//     }
//     if (!formData.gender) {
//       errors.gender = 'Gender is required';
//     }
//     // Add more validations as needed...
//     return errors;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setServerError(''); // Clear previous errors
//     const errors = validateInputs();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     const token = localStorage.getItem('token');
//     let userId = '';

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         userId = decoded.userId;
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         setServerError('Session expired. Please login again.');
//         navigate('/login');
//         return;
//       }
//     }

//     const data = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === 'image' && formData[key]) {
//         data.append(key, formData[key], formData[key].name);
//       } else {
//         data.append(key, formData[key]);
//       }
//     });
//     data.append('userId', userId);

//     try {
//       console.log(formData);
//       const response = await axios.post('http://195.179.231.102:6003/api/customers/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 201) {
//         alert('Customer added successfully! Navigating to Inquiry Form');
//         setModalVisible(true);
//       } else {
//         setServerError(`Unexpected status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       if (error.response) {
//         setServerError(error.response.data.message || 'An error occurred on the server.');
//       } else if (error.request) {
//         setServerError('No response received from the server. Please try again.');
//       } else {
//         setServerError('Error setting up request: ' + error.message);
//       }
//     }
//   };

//   const handleModalClose = (route) => {
//     setModalVisible(false);
//     navigate(route);
//   };

//   return (
//     <PageContainer>
//       <StepContainer>
//         <Container style={{ display: 'block' }}>
//           <h2>Step 1: Basic Details</h2>
//           <Form onSubmit={handleSubmit}>
//             <Input type="text" name="cnicNumber" placeholder="CNIC (16 digits)" value={formData.cnicNumber} onChange={handleChange} maxLength={16} />
//             {validationErrors.cnicNumber && <ErrorMessage>{validationErrors.cnicNumber}</ErrorMessage>}
//             <Select name="country" value={selectedCountry} onChange={handleCountryChange}>
//               <option value="">Select your Country</option>
//               {countries.map((country) => (
//                 <option key={country.countryCode} value={country.countryCode}>
//                   {country.countryName}
//                 </option>
//               ))}
//             </Select>
//             {validationErrors.country && <ErrorMessage>{validationErrors.country}</ErrorMessage>}
//             <Select name="cityFrom" value={formData.cityFrom} onChange={handleChange}>
//               <option value="">Select your city</option>
//               {cities.map((city) => (
//                 <option key={city.geonameId} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </Select>
//             {validationErrors.cityFrom && <ErrorMessage>{validationErrors.cityFrom}</ErrorMessage>}
//             <Select name="currentCity" value={formData.currentCity} onChange={handleChange}>
//               <option value="">Select your Current city</option>
//               {cities.map((city) => (
//                 <option key={city.geonameId} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </Select>
//             {validationErrors.currentCity && <ErrorMessage>{validationErrors.currentCity}</ErrorMessage>}
//             <Input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
//             {validationErrors.fullName && <ErrorMessage>{validationErrors.fullName}</ErrorMessage>}
//             <Select name="gender" value={formData.gender} onChange={handleChange}>
//               <option value="">Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </Select>
//             {validationErrors.gender && <ErrorMessage>{validationErrors.gender}</ErrorMessage>}
//             <Input type="file" name="image" onChange={handleChange} />
//             <Input type="text" name="profession" placeholder="Profession (Optional)" value={formData.profession} onChange={handleChange} />
//             <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
//             <Button type="button" onClick={handleNext}>Save and Next</Button>
//           </Form>
//           {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
//         </Container>
//         {currentStep === 2 && (
//           <Container style={{ display: 'block' }}>
//             <h2>Step 2: Contact Details</h2>
//             <Form onSubmit={handleSubmit}>
//               <Input type="text" name="officialMobile" placeholder="Official Mobile #" value={formData.officialMobile} onChange={handleChange} />
//               <Input type="text" name="personalMobile" placeholder="Personal Mobile #" value={formData.personalMobile} onChange={handleChange} />
//               <Input type="text" name="whatsappMobile" placeholder="WhatsApp Mobile #" value={formData.whatsappMobile} onChange={handleChange} />
//               <Input type="email" name="officialEmail" placeholder="Official Email" value={formData.officialEmail} onChange={handleChange} />
//               <Input type="email" name="personalEmail" placeholder="Personal Email" value={formData.personalEmail} onChange={handleChange} />
//               <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
//                 <option value="">Marital Status</option>
//                 <option value="Single">Single</option>
//                 <option value="Married">Married</option>
//               </Select>
//               <Input type="text" name="dependants" placeholder="Number of Dependents (if married)" value={formData.dependants} onChange={handleChange} />
//               <Input type="text" name="currentAddress" placeholder="Your current address" value={formData.currentAddress} onChange={handleChange} />
//               <Select name="contactPreference" value={formData.contactPreference} onChange={handleChange}>
//                 <option value="">Preferred way to contact</option>
//                 <option value="Call">Call</option>
//                 <option value="Email">Email</option>
//                 <option value="SMS">SMS</option>
//                 <option value="WhatsApp">WhatsApp</option>
//                 <option value="In Person">In Person</option>
//               </Select>
//               <Button type="submit">Save Customer</Button>
//             </Form>
//             {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
//           </Container>
//         )}
//       </StepContainer>
//       {modalVisible && (
//         <ModalOverlay onClick={() => setModalVisible(false)}>
//           <ModalContainer onClick={e => e.stopPropagation()}>
//             <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
//             <p>Submission successful! What would you like to do next?</p>
//             <Button onClick={() => handleModalClose('/dashboard')}>Dashboard</Button>
//             &nbsp;
//             <Button onClick={() => handleModalClose('/InquiryForm')}>Submit an Inquiry</Button>
//           </ModalContainer>
//         </ModalOverlay>
//       )}
//     </PageContainer>
//   );
// };

// export default CustomerInquiryForm;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getCountryCallingCode } from 'libphonenumber-js';
import bgImage from '../images/bg.jpg';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  padding-top: 80px;
  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Container = styled.div`
  flex: 1;
  padding: 20px;
  margin: 10px;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  width: 45%;
  display: none;

  @media (max-width: 768px) {
    width: 85%;
    margin: 15px 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #D3D3D3;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

const CustomerInquiryForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cnicNumber: '',
    country: '',
    cityFrom: '',
    currentCity: '',
    fullName: '',
    gender: '',
    image: null,
    profession: '',
    age: '',
    officialMobile: '',
    personalMobile: '',
    whatsappMobile: '',
    officialEmail: '',
    personalEmail: '',
    maritalStatus: '',
    dependants: '',
    currentAddress: '',
    contactPreference: ''
  });

  const [countries, setCountries] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [serverError, setServerError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [mobileSelection, setMobileSelection] = useState({
    personalMobile: 'same',
    whatsappMobile: 'same'
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch('http://api.geonames.org/countryInfoJSON?username=shoaib1')
      .then(response => response.json())
      .then(data => {
        setCountries(data.geonames);
        console.log(data);
      })
      .catch(error => console.error('Failed to fetch countries:', error));
  };

  const fetchCities = (countryCode) => {
    fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCities(data.geonames))
      .catch(error => console.error('Failed to fetch cities', error));
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    let phoneCode = '';
    try {
        phoneCode = getCountryCallingCode(countryCode);
    } catch (error) {
        console.error('Failed to get phone code:', error);
        phoneCode = '';
    }

    setFormData(prevFormData => ({
        ...prevFormData,
        country: countryCode,
        officialMobile: `+${phoneCode} `,
        personalMobile: `+${phoneCode} `,
        whatsappMobile: `+${phoneCode} `
    }));

    if (countryCode) {
        fetchCities(countryCode);
    } else {
        setCities([]);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: files ? files[0] : value
  //   }));
  // };

  // const handleMobileSelectionChange = (e) => {
  //   const { name, value } = e.target;
  //   setMobileSelection(prevSelection => ({
  //     ...prevSelection,
  //     [name]: value
  //   }));

  //   if (value === 'same') {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       [name]: prevFormData.officialMobile
  //     }));
  //   } else {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       [name]: ''
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: files ? files[0] : value
    }));

    // Update the personal and WhatsApp numbers if their selection is 'same'
    if (name === 'officialMobile') {
        if (mobileSelection.personalMobile === 'same') {
            setFormData(prevFormData => ({
                ...prevFormData,
                personalMobile: value
            }));
        }
        if (mobileSelection.whatsappMobile === 'same') {
            setFormData(prevFormData => ({
                ...prevFormData,
                whatsappMobile: value
            }));
        }
    }
};

  const handleMobileSelectionChange = (e) => {
    const { name, value } = e.target;
    setMobileSelection(prevSelection => ({
        ...prevSelection,
        [name]: value
    }));

    // Automatically update the phone number fields based on the selection
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value === 'same' ? prevFormData.officialMobile : ''
    }));
};

  const handleNext = () => {
    setCurrentStep(2);
  };

  const validateInputs = () => {
    const errors = {};
    // if (!/^\d{16}$/.test(formData.cnicNumber)) {
    //   errors.cnicNumber = 'CNIC must be a 16-digit number';
    // }
    if (!formData.cnicNumber) {
      errors.cnicNumber = 'Citizen ID is required';
    }
    
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.cityFrom) {
      errors.cityFrom = 'City of origin is required';
    }
    if (!formData.currentCity) {
      errors.currentCity = 'Current city is required';
    }
    if (!formData.fullName) {
      errors.fullName = 'Full name is required';
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
    // Add more validations as needed...
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError(''); // Clear previous errors
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const token = localStorage.getItem('token');
    let userId = '';

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        setServerError('Session expired. Please login again.');
        navigate('/login');
        return;
      }
    }

    if (mobileSelection.personalMobile === 'same') {
      formData.personalMobile = formData.officialMobile;
    }
    if (mobileSelection.whatsappMobile === 'same') {
      formData.whatsappMobile = formData.officialMobile;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        data.append(key, formData[key], formData[key].name);
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append('userId', userId);

    try {
      console.log(formData);
      const response = await axios.post('http://195.179.231.102:6003/api/customers/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Customer added successfully! Navigating to Inquiry Form');
        setModalVisible(true); // Show the modal
      } else {
        setServerError(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        setServerError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setServerError('No response received from the server. Please try again.');
      } else {
        setServerError('Error setting up request: ' + error.message);
      }
    }
  };

  const handleModalClose = (route) => {
    setModalVisible(false);
    navigate(route, { state: { cnic: formData.cnicNumber } });
  };

  return (
    <PageContainer>
      <StepContainer>
        <Container style={{ display: 'block' }}>
          <h2>Step 1: Basic Details</h2>
          <Form onSubmit={handleSubmit}>
            <Input type="text" name="cnicNumber" placeholder="Citizen ID" value={formData.cnicNumber} onChange={handleChange} maxLength={16} />
            {validationErrors.cnicNumber && <ErrorMessage>{validationErrors.cnicNumber}</ErrorMessage>}
            <Select name="country" value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select your Country</option>
              {countries.map((country) => (
                <option key={country.countryCode} value={country.countryCode}>
                  {country.countryName}
                </option>
              ))}
            </Select>
            {validationErrors.country && <ErrorMessage>{validationErrors.country}</ErrorMessage>}
            <Select name="cityFrom" value={formData.cityFrom} onChange={handleChange}>
              <option value="">Select your city</option>
              {cities.map((city) => (
                <option key={city.geonameId} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>
            {validationErrors.cityFrom && <ErrorMessage>{validationErrors.cityFrom}</ErrorMessage>}
            <Select name="currentCity" value={formData.currentCity} onChange={handleChange}>
              <option value="">Select your Current city</option>
              {cities.map((city) => (
                <option key={city.geonameId} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>
            {validationErrors.currentCity && <ErrorMessage>{validationErrors.currentCity}</ErrorMessage>}
            <Input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            {validationErrors.fullName && <ErrorMessage>{validationErrors.fullName}</ErrorMessage>}
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            {validationErrors.gender && <ErrorMessage>{validationErrors.gender}</ErrorMessage>}
            <Input type="file" name="image" onChange={handleChange} />
            <Input type="text" name="profession" placeholder="Profession (Optional)" value={formData.profession} onChange={handleChange} />
            <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            <Button type="button" onClick={handleNext}>Save and Next</Button>
          </Form>
          {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
        </Container>
        {currentStep === 2 && (
          <Container style={{ display: 'block' }}>
            <h2>Step 2: Contact Details</h2>
            <Form onSubmit={handleSubmit}>
              <Input type="text" name="officialMobile" placeholder="Official Mobile #" value={formData.officialMobile} onChange={handleChange} />
              {/* <div>
                <label>
                  <input
                    type="radio"
                    name="personalMobile"
                    value="same"
                    checked={mobileSelection.personalMobile === 'same'}
                    onChange={handleMobileSelectionChange}
                  />
                  Same as Official Mobile
                </label>
                <label>
                  <input
                    type="radio"
                    name="personalMobile"
                    value="different"
                    checked={mobileSelection.personalMobile === 'different'}
                    onChange={handleMobileSelectionChange}
                  />
                  Different Personal Number
                </label>
              </div>
              {mobileSelection.personalMobile === 'different' && (
                <Input type="text" name="personalMobile" placeholder="Personal Mobile #" value={formData.personalMobile} onChange={handleChange} />
              )}
              <div>
                <label>
                  <input
                    type="radio"
                    name="whatsappMobile"
                    value="same"
                    checked={mobileSelection.whatsappMobile === 'same'}
                    onChange={handleMobileSelectionChange}
                  />
                  Same as Official Mobile
                </label>
                <label>
                  <input
                    type="radio"
                    name="whatsappMobile"
                    value="different"
                    checked={mobileSelection.whatsappMobile === 'different'}
                    onChange={handleMobileSelectionChange}
                  />
                  Different Whatsapp Number
                </label>
              </div>
              {mobileSelection.whatsappMobile === 'different' && (
                <Input type="text" name="whatsappMobile" placeholder="WhatsApp Mobile #" value={formData.whatsappMobile} onChange={handleChange} />
              )} */}
              <div>
    <label>
        <input
            type="radio"
            name="personalMobile"
            value="same"
            checked={mobileSelection.personalMobile === 'same'}
            onChange={handleMobileSelectionChange}
        />
        Same as Official Mobile
    </label>
    <label>
        <input
            type="radio"
            name="personalMobile"
            value="different"
            checked={mobileSelection.personalMobile === 'different'}
            onChange={handleMobileSelectionChange}
        />
        Different Personal Number
    </label>
    <Input
        type="text"
        name="personalMobile"
        placeholder="Personal Mobile #"
        value={mobileSelection.personalMobile === 'same' ? formData.officialMobile : formData.personalMobile}
        onChange={handleChange}
    />
</div>

<div>
    <label>
        <input
            type="radio"
            name="whatsappMobile"
            value="same"
            checked={mobileSelection.whatsappMobile === 'same'}
            onChange={handleMobileSelectionChange}
        />
        Same as Official Mobile
    </label>
    <label>
        <input
            type="radio"
            name="whatsappMobile"
            value="different"
            checked={mobileSelection.whatsappMobile === 'different'}
            onChange={handleMobileSelectionChange}
        />
        Different Whatsapp Number
    </label>
    <Input
        type="text"
        name="whatsappMobile"
        placeholder="WhatsApp Mobile #"
        value={mobileSelection.whatsappMobile === 'same' ? formData.officialMobile : formData.whatsappMobile}
        onChange={handleChange}
    />
</div>

              <Input type="email" name="officialEmail" placeholder="Official Email" value={formData.officialEmail} onChange={handleChange} />
              <Input type="email" name="personalEmail" placeholder="Personal Email" value={formData.personalEmail} onChange={handleChange} />
              <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </Select>
              <Input type="text" name="dependants" placeholder="Number of Dependents (if married)" value={formData.dependants} onChange={handleChange} />
              <Input type="text" name="currentAddress" placeholder="Your current address" value={formData.currentAddress} onChange={handleChange} />
              <Select name="contactPreference" value={formData.contactPreference} onChange={handleChange}>
                <option value="">Preferred way to contact</option>
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="In Person">In Person</option>
              </Select>
              <Button type="submit">Save Customer</Button>
            </Form>
            {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
          </Container>
        )}
      </StepContainer>
      {modalVisible && (
        <ModalOverlay onClick={() => setModalVisible(false)}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
            <p>Submission successful! What would you like to do next?</p>
            <Button onClick={() => handleModalClose('/dashboard')}>Dashboard</Button>
            &nbsp;
            <Button onClick={() => handleModalClose('/InquiryForm')}>Submit an Inquiry</Button>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default CustomerInquiryForm;
