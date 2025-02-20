// Import necessary dependencies
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js";
import bgImage from "../images/bg.jpg";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column; /* Adjusted to allow vertical stacking */
  align-items: center;
  min-height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  padding-top: 100px;
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
  background: #ffffffb0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  overflow-y: auto;
  max-height: 80vh;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px 0;
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
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
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
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;
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

const FileInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

const FileInputLabel = styled.label`
  padding: 8px 16px;
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  display: inline-block;
`;

const FileNameDisplay = styled.span`
  font-size: 16px;
`;

const SmallButton = styled.button`
  padding: 6px 12px;
  margin-left: 10px;
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #0056b3;
  }
`;

// New styled components for the WhatsApp modal and button
const WhatsAppModalOverlay = styled(ModalOverlay)``;

const WhatsAppModalContainer = styled(ModalContainer)`
  width: 400px;
`;

const WhatsAppForm = styled(Form)``;

const WhatsAppButton = styled(Button)`
  background-color: #25d366; /* WhatsApp green color */
  &:hover {
    background-color: #128c7e;
  }
  margin-bottom: 20px;
`;

// Main component
const CustomerInquiryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inviteToken, setInviteToken] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cnicNumber: "",
    currentCountry: "",
    permanentCountry: "",
    cityFrom: "",
    currentCity: "",
    fullName: "",
    gender: "",
    image: null,
    profession: "",
    age: "",
    officialMobile: "",
    personalMobile: "",
    whatsappMobile: "",
    officialEmail: "",
    personalEmail: "",
    maritalStatus: "",
    dependants: "",
    currentAddress: "",
    contactPreference: "",
    officialEmailVerified: false,
    personalEmailVerified: false,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("");
  const [permanentCountry, setPermanentCountry] = useState("");
  const [currentCities, setCurrentCities] = useState([]);
  const [permanentCities, setPermanentCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [serverError, setServerError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [mobileSelection, setMobileSelection] = useState({
    personalMobile: "same",
    whatsappMobile: "same",
  });

  // New state variables for WhatsApp sharing
  const [whatsappModalVisible, setWhatsappModalVisible] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappNumberError, setWhatsappNumberError] = useState("");

  const [emailOtp, setEmailOtp] = useState({
    officialEmail: "",
    personalEmail: "",
  });
  const [emailVerificationError, setEmailVerificationError] = useState({
    officialEmail: "",
    personalEmail: "",
  });
  const [otpSent, setOtpSent] = useState({
    officialEmail: false,
    personalEmail: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("inviteToken");
    if (tokenFromUrl) {
      setInviteToken(tokenFromUrl);
    }
  }, [location]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("http://api.geonames.org/countryInfoJSON?username=shoaib1")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.geonames);
        console.log(data);
      })
      .catch((error) => console.error("Failed to fetch countries:", error));
  };

  const fetchCities = (countryCode, setCities) => {
    fetch(
      `http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`
    )
      .then((response) => response.json())
      .then((data) => setCities(data.geonames))
      .catch((error) => console.error("Failed to fetch cities", error));
  };

  const handleCurrentCountryChange = (e) => {
    const countryCode = e.target.value;
    setCurrentCountry(countryCode);
    setFormData((prevFormData) => ({
      ...prevFormData,
      currentCountry: countryCode,
    }));

    if (countryCode) {
      fetchCities(countryCode, setCurrentCities);
    } else {
      setCurrentCities([]);
    }
  };

  const handlePermanentCountryChange = (e) => {
    const countryCode = e.target.value;
    setPermanentCountry(countryCode);
    setFormData((prevFormData) => ({
      ...prevFormData,
      permanentCountry: countryCode,
    }));

    if (countryCode) {
      fetchCities(countryCode, setPermanentCities);
    } else {
      setPermanentCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));

    // Update the personal and WhatsApp numbers if their selection is 'same'
    if (name === "officialMobile") {
      if (mobileSelection.personalMobile === "same") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          personalMobile: value,
        }));
      }
      if (mobileSelection.whatsappMobile === "same") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          whatsappMobile: value,
        }));
      }
    }
  };

  const handleMobileSelectionChange = (e) => {
    const { name, value } = e.target;
    setMobileSelection((prevSelection) => ({
      ...prevSelection,
      [name]: value,
    }));

    // Automatically update the phone number fields based on the selection
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value === "same" ? prevFormData.officialMobile : "",
    }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const validateInputs = () => {
    const errors = {};
    if (!formData.cnicNumber) {
      errors.cnicNumber = "Citizen ID is required";
    }
    if (!formData.cityFrom) {
      errors.cityFrom = "City of origin is required";
    }
    if (!formData.currentCity) {
      errors.currentCity = "Current city is required";
    }
    if (!formData.fullName) {
      errors.fullName = "Full name is required";
    }
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    if (!formData.officialEmailVerified) {
      errors.officialEmail = "Please verify your official email.";
    }
    if (!formData.personalEmailVerified) {
      errors.personalEmail = "Please verify your personal email.";
    }
    // Add more validations as needed...
    return errors;
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setServerError(""); // Clear previous errors
  //   const errors = validateInputs();
  //   if (Object.keys(errors).length > 0) {
  //     setValidationErrors(errors);
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   let userId = "";

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       userId = decoded.userId;
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //       setServerError("Session expired. Please login again.");
  //       navigate("/login");
  //       return;
  //     }
  //   }

  //   if (mobileSelection.personalMobile === "same") {
  //     formData.personalMobile = formData.officialMobile;
  //   }
  //   if (mobileSelection.whatsappMobile === "same") {
  //     formData.whatsappMobile = formData.officialMobile;
  //   }

  //   const data = new FormData();
  //   Object.keys(formData).forEach((key) => {
  //     if (key === "image" && formData[key]) {
  //       data.append(key, formData[key], formData[key].name);
  //     } else {
  //       data.append(key, formData[key]);
  //     }
  //   });
  //   data.append("userId", userId);

  //   try {
  //     console.log(formData);
  //     const response = await axios.post(
  //       "api/customers/add",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       alert("Customer added successfully! Navigating to Inquiry Form");
  //       setModalVisible(true); // Show the modal
  //     } else {
  //       setServerError(`Unexpected status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     if (error.response) {
  //       setServerError(
  //         error.response.data.message || "An error occurred on the server."
  //       );
  //     } else if (error.request) {
  //       setServerError(
  //         "No response received from the server. Please try again."
  //       );
  //     } else {
  //       setServerError("Error setting up request: " + error.message);
  //     }
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError(""); // Clear previous errors
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Retrieve userId from the JWT token (if available)
    const token = localStorage.getItem("token");
    let userId = "";

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        setServerError("Session expired. Please login again.");
        navigate("/login");
        return;
      }
    }

    // Automatically adjust related phone numbers if the user has chosen the same option
    if (mobileSelection.personalMobile === "same") {
      formData.personalMobile = formData.officialMobile;
    }
    if (mobileSelection.whatsappMobile === "same") {
      formData.whatsappMobile = formData.officialMobile;
    }

    // Prepare the data for submission
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData[key]) {
        data.append(key, formData[key], formData[key].name);
      } else {
        data.append(key, formData[key]);
      }
    });

    // Include the userId (if available) and inviteToken (if it exists)
    if (userId) {
      data.append("userId", userId);
    }
    if (inviteToken) {
      data.append("inviteToken", inviteToken);
    }

    try {
      // Submit the form data to the backend
      const response = await axios.post(
        "api/customers/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token in headers if required for authentication
          },
        }
      );

      if (response.status === 201) {
        alert("Customer added successfully! Navigating to Inquiry Form");
        setModalVisible(true); // Show the modal on success
      } else {
        setServerError(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        setServerError(
          error.response.data.message || "An error occurred on the server."
        );
      } else if (error.request) {
        setServerError(
          "No response received from the server. Please try again."
        );
      } else {
        setServerError("Error setting up request: " + error.message);
      }
    }
  };

  const handleModalClose = (route) => {
    setModalVisible(false);
    navigate(route, { state: { cnic: formData.cnicNumber } });
  };

  // // New function to handle WhatsApp number submission
  // const handleWhatsAppSubmit = (e) => {
  //   e.preventDefault();

  //   // Validate the WhatsApp number
  //   const number = whatsappNumber.trim();
  //   if (!isValidPhoneNumber(number)) {
  //     setWhatsappNumberError("Please enter a valid WhatsApp number.");
  //     return;
  //   }

  //   // Clear any previous errors
  //   setWhatsappNumberError("");

  //   // Generate the WhatsApp share link
  //   const encodedMessage = encodeURIComponent(
  //     `Hello, I would like to share this form with you: ${window.location.href}`
  //   );
  //   const whatsappLink = `https://wa.me/${number}?text=${encodedMessage}`;

  //   // Open the WhatsApp share link
  //   window.open(whatsappLink, "_blank");

  //   // Close the modal
  //   setWhatsappModalVisible(false);
  //   setWhatsappNumber("");
  // };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();

    // Validate the WhatsApp number
    const number = whatsappNumber.trim();
    if (!isValidPhoneNumber(number)) {
      setWhatsappNumberError("Please enter a valid WhatsApp number.i.e. +92 3123212456 ");
      return;
    }

    // Clear any previous errors
    setWhatsappNumberError("");

    // Generate a unique invite token
    const inviteToken = uuidv4();

    // Get the inviter's userId from the token
    const token = localStorage.getItem("token");
    let userId = "";

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        setServerError("Session expired. Please login again.");
        navigate("/login");
        return;
      }
    } else {
      setServerError("You must be logged in to share the form.");
      navigate("/login");
      return;
    }

    // Send the invite token and inviter's userId to the backend to store the mapping
    try {
      await axios.post(
        "api/CustomerInvites/create-invite-token",
        { inviteToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error creating invite token:", error);
      setServerError("Failed to create invite link. Please try again.");
      return;
    }

    // Generate the WhatsApp share link with the invite token
    const formUrl = `${window.location.origin}/CustomerInquiryForm?inviteToken=${inviteToken}`;
    const encodedMessage = encodeURIComponent(
      `Hello, I would like to share this form with you: ${formUrl}`
    );
    const whatsappLink = `https://wa.me/${number}?text=${encodedMessage}`;

    // Open the WhatsApp share link
    window.open(whatsappLink, "_blank");

    // Close the modal
    setWhatsappModalVisible(false);
    setWhatsappNumber("");
  };

  // Function to handle sending OTP
  const handleSendOtp = async (emailType) => {
    const email = formData[emailType];
    if (!email) {
      setEmailVerificationError((prev) => ({
        ...prev,
        [emailType]: "Please enter an email address first.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "api/auth/send-otp",
        { email }
      );
      if (response.status === 200) {
        alert(`OTP sent to ${email}. Please check your email.`);
        setOtpSent((prev) => ({ ...prev, [emailType]: true }));
        setEmailVerificationError((prev) => ({ ...prev, [emailType]: "" }));
      } else {
        setEmailVerificationError((prev) => ({
          ...prev,
          [emailType]: "Failed to send OTP. Please try again.",
        }));
      }
    } catch (error) {
      console.error(`Error sending OTP to ${emailType}:`, error);
      setEmailVerificationError((prev) => ({
        ...prev,
        [emailType]:
          error.response?.data?.message ||
          "An error occurred while sending OTP.",
      }));
    }
  };

  // Function to handle verifying OTP
  const handleVerifyOtp = async (emailType) => {
    const email = formData[emailType];
    const otp = emailOtp[emailType];
    if (!otp) {
      setEmailVerificationError((prev) => ({
        ...prev,
        [emailType]: "Please enter the OTP sent to your email.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "api/auth/verify-otp",
        { email, otp }
      );
      if (response.status === 200) {
        alert(`Email ${email} verified successfully.`);
        setFormData((prev) => ({
          ...prev,
          [`${emailType}Verified`]: true,
        }));
        setEmailVerificationError((prev) => ({ ...prev, [emailType]: "" }));
        setOtpSent((prev) => ({ ...prev, [emailType]: false }));
      } else {
        setEmailVerificationError((prev) => ({
          ...prev,
          [emailType]: "OTP verification failed. Please try again.",
        }));
      }
    } catch (error) {
      console.error(`Error verifying OTP for ${emailType}:`, error);
      setEmailVerificationError((prev) => ({
        ...prev,
        [emailType]:
          error.response?.data?.message ||
          "An error occurred during OTP verification.",
      }));
    }
  };

  return (
    <PageContainer>
      {/* Share on WhatsApp button at the top */}
      <WhatsAppButton onClick={() => setWhatsappModalVisible(true)}>
        Share this form on WhatsApp
      </WhatsAppButton>

      <StepContainer>
        <Container style={{ display: "block" }}>
          <h2>Step 1: Basic Details</h2>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="cnicNumber"
              placeholder="Citizen ID"
              value={formData.cnicNumber}
              onChange={handleChange}
              maxLength={16}
            />
            {validationErrors.cnicNumber && (
              <ErrorMessage>{validationErrors.cnicNumber}</ErrorMessage>
            )}
            <Select
              name="currentCountry"
              value={currentCountry}
              onChange={handleCurrentCountryChange}
            >
              <option value="">Select your current Country</option>
              {countries.map((country) => (
                <option key={country.countryCode} value={country.countryCode}>
                  {country.countryName}
                </option>
              ))}
            </Select>
            {validationErrors.cityFrom && (
              <ErrorMessage>{validationErrors.cityFrom}</ErrorMessage>
            )}
            <Select
              name="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
            >
              <option value="">Select your Current city</option>
              {currentCities.map((city) => (
                <option key={city.geonameId} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>

            {validationErrors.country && (
              <ErrorMessage>{validationErrors.country}</ErrorMessage>
            )}
            <Select
              name="permanentCountry"
              value={permanentCountry}
              onChange={handlePermanentCountryChange}
            >
              <option value="">Select your Permanent Country</option>
              {countries.map((country) => (
                <option key={country.countryCode} value={country.countryCode}>
                  {country.countryName}
                </option>
              ))}
            </Select>
            <Select
              name="cityFrom"
              value={formData.cityFrom}
              onChange={handleChange}
            >
              <option value="">Select your Permanent city</option>
              {permanentCities.map((city) => (
                <option key={city.geonameId} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>

            {validationErrors.currentCity && (
              <ErrorMessage>{validationErrors.currentCity}</ErrorMessage>
            )}
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {validationErrors.fullName && (
              <ErrorMessage>{validationErrors.fullName}</ErrorMessage>
            )}
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            {validationErrors.gender && (
              <ErrorMessage>{validationErrors.gender}</ErrorMessage>
            )}
            {/* <Input type="file" name="image" onChange={handleChange} /> */}
            <FileInputContainer>
              <HiddenFileInput
                id="file"
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/jpeg, image/png"
              />
              <FileInputLabel htmlFor="file">Upload your pic</FileInputLabel>
              <FileNameDisplay>
                {formData.image ? formData.image.name : "No file chosen"}
              </FileNameDisplay>
            </FileInputContainer>
            <br />
            <Input
              type="text"
              name="profession"
              placeholder="Profession (Optional)"
              value={formData.profession}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <Button type="button" onClick={handleNext}>
              Save and Next
            </Button>
          </Form>
          {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
        </Container>

        {currentStep === 2 && (
          <Container style={{ display: "block" }}>
            <h2>Step 2: Contact Details</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="officialMobile"
                placeholder="Official Mobile #"
                value={formData.officialMobile}
                onChange={handleChange}
              />
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
                    value="different"
                    checked={mobileSelection.personalMobile === "different"}
                    onChange={handleMobileSelectionChange}
                  />
                  Different Personal Number
                </label>
                <label>
                  <input
                    type="radio"
                    name="personalMobile"
                    value="same"
                    checked={mobileSelection.personalMobile === "same"}
                    onChange={handleMobileSelectionChange}
                  />
                  Same as Official Mobile
                </label>
                <Input
                  type="text"
                  name="personalMobile"
                  placeholder="Personal Mobile #"
                  value={
                    mobileSelection.personalMobile === "same"
                      ? formData.officialMobile
                      : formData.personalMobile
                  }
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name="whatsappMobile"
                    value="different"
                    checked={mobileSelection.whatsappMobile === "different"}
                    onChange={handleMobileSelectionChange}
                  />
                  Different Whatsapp Number
                </label>
                <label>
                  <input
                    type="radio"
                    name="whatsappMobile"
                    value="same"
                    checked={mobileSelection.whatsappMobile === "same"}
                    onChange={handleMobileSelectionChange}
                  />
                  Same as Official Mobile
                </label>
                <Input
                  type="text"
                  name="whatsappMobile"
                  placeholder="WhatsApp Mobile #"
                  value={
                    mobileSelection.whatsappMobile === "same"
                      ? formData.officialMobile
                      : formData.whatsappMobile
                  }
                  onChange={handleChange}
                />
              </div>

              {/* <Input
                type="email"
                name="officialEmail"
                placeholder="Official Email"
                value={formData.officialEmail}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="personalEmail"
                placeholder="Personal Email"
                value={formData.personalEmail}
                onChange={handleChange}
              /> */}
              <div>
                <Input
                  type="email"
                  name="officialEmail"
                  placeholder="Official Email"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  disabled={formData.officialEmailVerified}
                />
                {!formData.officialEmailVerified && (
                  <SmallButton
                    type="button"
                    onClick={() => handleSendOtp("officialEmail")}
                  >
                    Verify Email
                  </SmallButton>
                )}
                {emailVerificationError.officialEmail && (
                  <ErrorMessage>
                    {emailVerificationError.officialEmail}
                  </ErrorMessage>
                )}
                {otpSent.officialEmail && !formData.officialEmailVerified && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter OTP"
                      value={emailOtp.officialEmail}
                      onChange={(e) =>
                        setEmailOtp((prev) => ({
                          ...prev,
                          officialEmail: e.target.value,
                        }))
                      }
                    />
                    <SmallButton
                      type="button"
                      onClick={() => handleVerifyOtp("officialEmail")}
                    >
                      Submit OTP
                    </SmallButton>
                  </div>
                )}
                {formData.officialEmailVerified && (
                  <p style={{ color: "green" }}>Official Email verified ✔</p>
                )}
              </div>

              {/* Personal Email Field with Verification */}
              <div>
                <Input
                  type="email"
                  name="personalEmail"
                  placeholder="Personal Email"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  disabled={formData.personalEmailVerified}
                />
                {!formData.personalEmailVerified && (
                  <SmallButton
                    type="button"
                    onClick={() => handleSendOtp("personalEmail")}
                  >
                    Verify Email
                  </SmallButton>
                )}
                {emailVerificationError.personalEmail && (
                  <ErrorMessage>
                    {emailVerificationError.personalEmail}
                  </ErrorMessage>
                )}
                {otpSent.personalEmail && !formData.personalEmailVerified && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter OTP"
                      value={emailOtp.personalEmail}
                      onChange={(e) =>
                        setEmailOtp((prev) => ({
                          ...prev,
                          personalEmail: e.target.value,
                        }))
                      }
                    />
                    <SmallButton
                      type="button"
                      onClick={() => handleVerifyOtp("personalEmail")}
                    >
                      Submit OTP
                    </SmallButton>
                  </div>
                )}
                {formData.personalEmailVerified && (
                  <p style={{ color: "green" }}>Personal Email verified ✔</p>
                )}
              </div>
              {validationErrors.officialEmail && (
                <ErrorMessage>{validationErrors.officialEmail}</ErrorMessage>
              )}
              {validationErrors.personalEmail && (
                <ErrorMessage>{validationErrors.personalEmail}</ErrorMessage>
              )}
              {/* <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </Select>
              <Input type="text" name="dependants" placeholder="Number of Dependents (if married)" value={formData.dependants} onChange={handleChange} />
               */}
              <Select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </Select>

              {formData.maritalStatus === "Married" && (
                <Input
                  type="text"
                  name="dependants"
                  placeholder="Number of Dependents (if married)"
                  value={formData.dependants}
                  onChange={handleChange}
                />
              )}

              <Input
                type="text"
                name="currentAddress"
                placeholder="Your current address"
                value={formData.currentAddress}
                onChange={handleChange}
              />
              <Select
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleChange}
              >
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

      {/* WhatsApp Modal */}
      {whatsappModalVisible && (
        <ModalOverlay onClick={() => setWhatsappModalVisible(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setWhatsappModalVisible(false)}>
              ×
            </CloseButton>
            <h3>Share Form on WhatsApp</h3>
            <WhatsAppForm onSubmit={handleWhatsAppSubmit}>
              <Input
                type="tel"
                name="whatsappNumber"
                placeholder="Enter WhatsApp Number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
              {whatsappNumberError && (
                <ErrorMessage>{whatsappNumberError}</ErrorMessage>
              )}
              <Button type="submit">Share</Button>
            </WhatsAppForm>
          </ModalContainer>
        </ModalOverlay>
      )}

      {modalVisible && (
        <ModalOverlay onClick={() => setModalVisible(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
            <p>Submission successful! What would you like to do next?</p>
            <Button onClick={() => handleModalClose("/dashboard")}>
              Dashboard
            </Button>
            &nbsp;
            <Button onClick={() => handleModalClose("/InquiryForm")}>
              Submit an Inquiry
            </Button>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default CustomerInquiryForm;
