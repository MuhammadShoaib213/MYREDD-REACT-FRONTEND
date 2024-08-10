// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import {jwtDecode} from 'jwt-decode';

// // // const ProfileContainer = styled.div`
// // //   display: flex;
// // //   width: 100%;
// // //   background: #f1f1f1;
// // // `;

// // // const LeftPanel = styled.div`
// // //   background: white;
// // //   padding: 20px;
// // //   width: 25%;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// // // `;

// // // const RightPanel = styled.div`
// // //   background: white;
// // //   padding: 20px;
// // //   width: 75%;
// // //   display: flex;
// // //   flex-direction: column;
// // //   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// // // `;

// // // const ProfilePic = styled.img`
// // //   width: 150px;
// // //   height: 150px;
// // //   border-radius: 50%;
// // //   margin-bottom: 20px;
// // // `;

// // // const FileInput = styled.input`
// // //   margin-bottom: 20px;
// // // `;

// // // const Tab = styled.button`
// // //   padding: 10px;
// // //   border: none;
// // //   background: ${(props) => props.active ? '#ccc' : 'white'};
// // //   cursor: pointer;
// // //   outline: none;
// // //   border-bottom: ${(props) => props.active ? '3px solid blue' : 'none'};
// // // `;

// // // const InputGroup = styled.div`
// // //   margin-bottom: 10px;
// // // `;

// // // const Label = styled.label`
// // //   display: block;
// // //   margin-bottom: 5px;
// // //   font-weight: bold;
// // // `;

// // // const Input = styled.input`
// // //   width: 100%;
// // //   padding: 8px;
// // //   border: 1px solid #ccc;
// // //   border-radius: 4px;
// // // `;

// // // const Select = styled.select`
// // //   width: 100%;
// // //   padding: 8px;
// // //   border: 1px solid #ccc;
// // //   border-radius: 4px;
// // // `;

// // // const UpdateButton = styled.button`
// // //   padding: 10px 20px;
// // //   background-color: blue;
// // //   color: white;
// // //   font-size: 16px;
// // //   border: none;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   margin-top: 20px;
// // // `;

// // // const ProfileView = () => {
// // //   const [activeTab, setActiveTab] = useState('about');
// // //   const [profile, setProfile] = useState({
// // //     firstName: '',
// // //     lastName: '',
// // //     email: '', // Email typically not updated, shown for reference
// // //     phoneNumber: '',
// // //     whatsappNumber: '',
// // //     country: '',
// // //     city: '',
// // //     location: '',
// // //     businessInfo: '',
// // //     businessLogo: '',
// // //     businessName: '',
// // //     businessOwnerName: '',
// // //     businessWorkingArea: '',
// // //     businessNTN: '',
// // //     residential: '',
// // //     commercial: '',
// // //     land: '',
// // //     experience: 0,
// // //     skills: [],
// // //     dateOfBirth: '', // Handled as string for input type="date"
// // //     age: 0
// // //   });

// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       const token = localStorage.getItem('token');
// // //       const decoded = jwtDecode(token);
// // //       const userId = decoded.userId;
// // //       try {
// // //         const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
// // //         setProfile({ ...profile, ...response.data });
// // //       } catch (error) {
// // //         console.error('Failed to fetch profile:', error);
// // //       }
// // //     };
// // //     fetchProfile();
// // //   }, []);

// // //   const handleUpdateProfile = async () => {
// // //     const token = localStorage.getItem('token');
// // //     const decoded = jwtDecode(token);
// // //     const userId = decoded.userId;
// // //     try {
// // //       const response = await axios.patch(`http://localhost:5000/api/auth/profile/${userId}`, profile);
// // //       alert('Profile updated successfully!');
// // //     } catch (error) {
// // //       console.error('Failed to update profile:', error);
// // //     }
// // //   };

// // //   const handleTabClick = (tab) => {
// // //     setActiveTab(tab);
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setProfile(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   return (
// // //     <ProfileContainer>
// // //       <LeftPanel>
// // //         <ProfilePic src={profile.businessLogo || "https://via.placeholder.com/150"} alt="Business Logo" />
// // //         <FileInput type="file" onChange={(e) => setProfile({...profile, businessLogo: e.target.value})} />
// // //         <p>{`${profile.firstName} ${profile.lastName}`}</p>
// // //         <p>{profile.email}</p>  // Display only, not editable
// // //       </LeftPanel>
// //     //   <RightPanel>
// //     //     <div style={{ marginBottom: '20px', display: 'flex', borderBottom: '1px solid #ccc' }}>
// //     //       <Tab onClick={() => handleTabClick('about')} active={activeTab === 'about'}>About</Tab>
// //     //       <Tab onClick={() => handleTabClick('branchDetails')} active={activeTab === 'branchDetails'}>Branch Details</Tab>
// //     //     </div>
// //     //     {activeTab === 'about' && (
// //     //       <div>
// //     //         <InputGroup>
// //     //           <Label htmlFor="firstName">First Name</Label>
// //     //           <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="lastName">Last Name</Label>
// //     //           <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="phoneNumber">Phone Number</Label>
// //     //           <Input id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
// //     //           <Input id="whatsappNumber" name="whatsappNumber" value={profile.whatsappNumber} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="dateOfBirth">Date of Birth</Label>
// //     //           <Input type="date" id="dateOfBirth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="country">Country</Label>
// //     //           <Input id="country" name="country" value={profile.country} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="city">City</Label>
// //     //           <Input id="city" name="city" value={profile.city} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="location">Location</Label>
// //     //           <Input id="location" name="location" value={profile.location} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="age">Age</Label>
// //     //           <Input type="number" id="age" name="age" value={profile.age} onChange={handleChange} />
// //     //         </InputGroup>
// //     //       </div>
// //     //     )}
// //     //     {activeTab === 'branchDetails' && (
// //     //       <div>
// //     //         <InputGroup>
// //     //           <Label htmlFor="businessName">Business Name</Label>
// //     //           <Input id="businessName" name="businessName" value={profile.businessName} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="businessOwnerName">Business Owner Name</Label>
// //     //           <Input id="businessOwnerName" name="businessOwnerName" value={profile.businessOwnerName} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="businessWorkingArea">Business Working Area</Label>
// //     //           <Input id="businessWorkingArea" name="businessWorkingArea" value={profile.businessWorkingArea} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="businessNTN">Business NTN</Label>
// //     //           <Input id="businessNTN" name="businessNTN" value={profile.businessNTN} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="residential">Residential Info</Label>
// //     //           <Input id="residential" name="residential" value={profile.residential} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="commercial">Commercial Info</Label>
// //     //           <Input id="commercial" name="commercial" value={profile.commercial} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="land">Land Info</Label>
// //     //           <Input id="land" name="land" value={profile.land} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="experience">Experience (years)</Label>
// //     //           <Input type="number" id="experience" name="experience" value={profile.experience} onChange={handleChange} />
// //     //         </InputGroup>
// //     //         <InputGroup>
// //     //           <Label htmlFor="skills">Skills (comma-separated)</Label>
// //     //           <Input id="skills" name="skills" value={profile.skills.join(', ')} onChange={e => setProfile({...profile, skills: e.target.value.split(',').map(skill => skill.trim())})} />
// //     //         </InputGroup>
// //     //       </div>
// //     //     )}
// //     //     <UpdateButton onClick={handleUpdateProfile}>Update Info</UpdateButton>
// //     //   </RightPanel>
// // //     </ProfileContainer>
// // //   );
// // // };

// // // export default ProfileView;



// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import {jwtDecode} from 'jwt-decode';

// // const ProfileContainer = styled.div`
// //   display: flex;
// //   width: 100%;
// //   background: #f1f1f1;
// // `;

// // const LeftPanel = styled.div`
// //   background: white;
// //   padding: 20px;
// //   width: 25%;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// // `;

// // const RightPanel = styled.div`
// //   background: white;
// //   padding: 20px;
// //   width: 75%;
// //   display: flex;
// //   flex-direction: column;
// //   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// // `;

// // const ProfilePic = styled.img`
// //   width: 150px;
// //   height: 150px;
// //   border-radius: 50%;
// //   margin-bottom: 20px;
// // `;

// // const FileInput = styled.input`
// //   margin-bottom: 20px;
// // `;

// // const Tab = styled.button`
// //   padding: 10px;
// //   border: none;
// //   background: ${(props) => props.active ? '#ccc' : 'white'};
// //   cursor: pointer;
// //   outline: none;
// //   border-bottom: ${(props) => props.active ? '3px solid blue' : 'none'};
// // `;

// // const InputGroup = styled.div`
// //   margin-bottom: 10px;
// // `;

// // const Label = styled.label`
// //   display: block;
// //   margin-bottom: 5px;
// //   font-weight: bold;
// // `;

// // const Input = styled.input`
// //   width: 100%;
// //   padding: 8px;
// //   border: 1px solid #ccc;
// //   border-radius: 4px;
// // `;

// // const Select = styled.select`
// //   width: 100%;
// //   padding: 8px;
// //   border: 1px solid #ccc;
// //   border-radius: 4px;
// // `;

// // const UpdateButton = styled.button`
// //   padding: 10px 20px;
// //   background-color: blue;
// //   color: white;
// //   font-size: 16px;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   margin-top: 20px;
// // `;


// // // Other styled components as before...

// // const ProfileView = () => {
// //   const [activeTab, setActiveTab] = useState('about');
// //   const [profile, setProfile] = useState({
// //     // existing fields...
// //   });

// //   const [profileImage, setProfileImage] = useState(null);
// //   const [businessLogoImage, setBusinessLogoImage] = useState(null);

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       const token = localStorage.getItem('token');
// //       const decoded = jwtDecode(token);
// //       const userId = decoded.userId;
// //       try {
// //         const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
// //         setProfile({ ...profile, ...response.data });
// //         console.log(response.data); // Log the data received, especially the image URLs
// //       } catch (error) {
// //         console.error('Failed to fetch profile:', error);
// //       }
// //     };
// //     fetchProfile(); 
// //   }, []);
  

// //   const handleUpdateProfile = async () => {
// //     const formData = new FormData();
// //     Object.keys(profile).forEach(key => {
// //       formData.append(key, profile[key]);
// //     });
// //     if (profileImage) {
// //       formData.append('profilePicture', profileImage);
// //     }
// //     if (businessLogoImage) {
// //       formData.append('businessLogo', businessLogoImage);
// //     }

// //     const token = localStorage.getItem('token');
// //     const decoded = jwtDecode(token);
// //     const userId = decoded.userId;
// //     const config = {
// //       headers: {
// //         'Content-Type': 'multipart/form-data'
// //       }
// //     };

// //     try {
// //       await axios.patch(`http://localhost:5000/api/auth/profile/${userId}`, formData, config);
// //       alert('Profile updated successfully!');
// //     } catch (error) {
// //       console.error('Failed to update profile:', error);
// //     }
// //   };

// //   const handleTabClick = (tab) => {
// //     setActiveTab(tab);
// //   };

// //   const handleImageChange = (e, setImage) => {
// //     setImage(e.target.files[0]);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfile(prev => ({ ...prev, [name]: value }));
// //   };

// //   return (
// //     <ProfileContainer>
// //       <LeftPanel>
// //       <ProfilePic src={profile.profilePicture || "https://via.placeholder.com/150"} alt="Profile Picture" />
// //         <FileInput type="file" onChange={(e) => handleImageChange(e, setProfileImage)} />
// //         {/* Display fields */}
// //          <p>{`${profile.firstName} ${profile.lastName}`}</p>
// //          <p>{profile.email}</p>
// //       </LeftPanel>
// //       <RightPanel>
// //         <div style={{ marginBottom: '20px', display: 'flex', borderBottom: '1px solid #ccc' }}>
// //           <Tab onClick={() => handleTabClick('about')} active={activeTab === 'about'}>About</Tab>
// //           <Tab onClick={() => handleTabClick('branchDetails')} active={activeTab === 'branchDetails'}>Branch Details</Tab>
// //         </div>
// //         {activeTab === 'about' && (
// //           <div>
// //             <InputGroup>
// //               <Label htmlFor="firstName">First Name</Label>
// //               <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="lastName">Last Name</Label>
// //               <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="phoneNumber">Phone Number</Label>
// //               <Input id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
// //               <Input id="whatsappNumber" name="whatsappNumber" value={profile.whatsappNumber} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="dateOfBirth">Date of Birth</Label>
// //               <Input type="date" id="dateOfBirth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="country">Country</Label>
// //               <Input id="country" name="country" value={profile.country} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="city">City</Label>
// //               <Input id="city" name="city" value={profile.city} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="location">Location</Label>
// //               <Input id="location" name="location" value={profile.location} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="age">Age</Label>
// //               <Input type="number" id="age" name="age" value={profile.age} onChange={handleChange} />
// //             </InputGroup>
// //           </div>
// //         )}
// //         {activeTab === 'branchDetails' && (
// //           <div>
// //             <InputGroup>
// //               <Label htmlFor="businessName">Business Name</Label>
// //               <Input id="businessName" name="businessName" value={profile.businessName} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="businessOwnerName">Business Owner Name</Label>
// //               <Input id="businessOwnerName" name="businessOwnerName" value={profile.businessOwnerName} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="businessWorkingArea">Business Working Area</Label>
// //               <Input id="businessWorkingArea" name="businessWorkingArea" value={profile.businessWorkingArea} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="businessNTN">Business NTN</Label>
// //               <Input id="businessNTN" name="businessNTN" value={profile.businessNTN} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="residential">Residential Info</Label>
// //               <Input id="residential" name="residential" value={profile.residential} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="commercial">Commercial Info</Label>
// //               <Input id="commercial" name="commercial" value={profile.commercial} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="land">Land Info</Label>
// //               <Input id="land" name="land" value={profile.land} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="experience">Experience (years)</Label>
// //               <Input type="number" id="experience" name="experience" value={profile.experience} onChange={handleChange} />
// //             </InputGroup>
// //             <InputGroup>
// //               <Label htmlFor="skills">Skills (comma-separated)</Label>
// //               <Input id="skills" name="skills" value={profile.skills.join(', ')} onChange={e => setProfile({...profile, skills: e.target.value.split(',').map(skill => skill.trim())})} />
// //             </InputGroup>
// //           </div>
// //         )}
// //         <UpdateButton onClick={handleUpdateProfile}>Update Info</UpdateButton>
// //       </RightPanel>
// //     </ProfileContainer>
// //   );
// // };

// // export default ProfileView;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const ProfileContainer = styled.div`
//   display: flex;
//   width: 100%;
//   background: #f1f1f1;
//   padding-top: 80px;
// `;

// const LeftPanel = styled.div`
//   background: white;
//   padding: 20px;
//   width: 25%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// `;

// const RightPanel = styled.div`
//   background: white;
//   padding: 20px;
//   width: 75%;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
// `;

// const ProfilePic = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   margin-bottom: 20px;
// `;

// const FileInput = styled.input`
//   margin-bottom: 20px;
// `;

// const Tab = styled.button`
//   padding: 10px;
//   border: none;
//   background: ${(props) => props.active ? '#ccc' : 'white'};
//   cursor: pointer;
//   outline: none;
//   border-bottom: ${(props) => props.active ? '3px solid blue' : 'none'};
// `;

// const InputGroup = styled.div`
//   margin-bottom: 10px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const UpdateButton = styled.button`
//   padding: 10px 20px;
//   background-color: blue;
//   color: white;
//   font-size: 16px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 20px;
// `;

// const ErrorContainer = styled.div`
//   background-color: #ffdddd;
//   color: #d8000c;
//   padding: 10px;
//   border: 1px solid #d8000c;
//   border-radius: 5px;
//   margin-bottom: 20px;
// `;

// const ProfileView = () => {
//   const [activeTab, setActiveTab] = useState('about');
//   const [profile, setProfile] = useState({
//     // existing fields...
//   });
//   const [profileImage, setProfileImage] = useState(null);
//   const [businessLogoImage, setBusinessLogoImage] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token');
//       const decoded = jwtDecode(token);
//       const userId = decoded.userId;
//       try {
//         const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
//         setProfile({ ...profile, ...response.data });
//         setError(null); // Clear any previous errors
//       } catch (error) {
//         setError('Failed to fetch profile. Please try again later.');
//         console.error('Failed to fetch profile:', error);
//       }
//     };
//     fetchProfile(); 
//   }, []);

//   const handleUpdateProfile = async () => {
//     const formData = new FormData();
//     Object.keys(profile).forEach(key => {
//       formData.append(key, profile[key]);
//     });
//     if (profileImage) {
//       formData.append('profilePicture', profileImage);
//     }
//     if (businessLogoImage) {
//       formData.append('businessLogo', businessLogoImage);
//     }

//     const token = localStorage.getItem('token');
//     const decoded = jwtDecode(token);
//     const userId = decoded.userId;
//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     };

//     try {
//       await axios.patch(`http://localhost:5000/api/auth/profile/${userId}`, formData, config);
//       alert('Profile updated successfully!');
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       const errorMessage = error.response && error.response.data && error.response.data.message
//         ? error.response.data.message
//         : 'Failed to update profile. Please try again later.';
//       setError(errorMessage);
//       console.error('Failed to update profile:', error);
//     }
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleImageChange = (e, setImage) => {
//     setImage(e.target.files[0]);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <ProfileContainer>
//       <LeftPanel>
//         {/* <ProfilePic src={profile.profilePicture || "https://via.placeholder.com/150"} alt="Profile Picture" /> */}
//         <ProfilePic src={profile.profilePicture ? `http://localhost:5000/${profile.profilePicture}` : 'https://via.placeholder.com/200'} alt={profile.profilePicture} />
//         <FileInput type="file" onChange={(e) => handleImageChange(e, setProfileImage)} />
//         <p>{`${profile.firstName} ${profile.lastName}`}</p>
//         <p>{profile.email}</p>
//       </LeftPanel>
//       <RightPanel>
//         {error && <ErrorContainer>{error}</ErrorContainer>}
//         <div style={{ marginBottom: '20px', display: 'flex', borderBottom: '1px solid #ccc' }}>
//           <Tab onClick={() => handleTabClick('about')} active={activeTab === 'about'}>About</Tab>
//           <Tab onClick={() => handleTabClick('branchDetails')} active={activeTab === 'branchDetails'}>Branch Details</Tab>
//         </div>
//         {activeTab === 'about' && (
//           <div>
//             <InputGroup>
//               <Label htmlFor="firstName">First Name</Label>
//               <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="lastName">Last Name</Label>
//               <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="phoneNumber">Phone Number</Label>
//               <Input id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
//               <Input id="whatsappNumber" name="whatsappNumber" value={profile.whatsappNumber} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="dateOfBirth">Date of Birth</Label>
//               <Input type="date" id="dateOfBirth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="country">Country</Label>
//               <Input id="country" name="country" value={profile.country} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="city">City</Label>
//               <Input id="city" name="city" value={profile.city} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="location">Location</Label>
//               <Input id="location" name="location" value={profile.location} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="age">Age</Label>
//               <Input type="number" id="age" name="age" value={profile.age} onChange={handleChange} />
//             </InputGroup>
//           </div>
//         )}
//         {activeTab === 'branchDetails' && (
//           <div>
//             <InputGroup>
//               <Label htmlFor="businessName">Business Name</Label>
//               <Input id="businessName" name="businessName" value={profile.businessName} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="businessOwnerName">Business Owner Name</Label>
//               <Input id="businessOwnerName" name="businessOwnerName" value={profile.businessOwnerName} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="businessWorkingArea">Business Working Area</Label>
//               <Input id="businessWorkingArea" name="businessWorkingArea" value={profile.businessWorkingArea} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="businessNTN">Business NTN</Label>
//               <Input id="businessNTN" name="businessNTN" value={profile.businessNTN} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="residential">Residential Info</Label>
//               <Input id="residential" name="residential" value={profile.residential} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="commercial">Commercial Info</Label>
//               <Input id="commercial" name="commercial" value={profile.commercial} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="land">Land Info</Label>
//               <Input id="land" name="land" value={profile.land} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="experience">Experience (years)</Label>
//               <Input type="number" id="experience" name="experience" value={profile.experience} onChange={handleChange} />
//             </InputGroup>
//             <InputGroup>
//               <Label htmlFor="skills">Skills (comma-separated)</Label>
//               <Input id="skills" name="skills" value={profile.skills ? profile.skills.join(', ') : ''} onChange={e => setProfile({...profile, skills: e.target.value.split(',').map(skill => skill.trim())})} />
//             </InputGroup>
//           </div>
//         )}
//         <UpdateButton onClick={handleUpdateProfile}>Update Info</UpdateButton>
//       </RightPanel>
//     </ProfileContainer>
//   );
// };

// export default ProfileView;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f1f1f1;
  padding-top: 80px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftPanel = styled.div`
  background: white;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 25%;
  }
`;

const RightPanel = styled.div`
  background: white;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 75%;
  }
`;

const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const FileInput = styled.input`
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px;
  border: none;
  background: ${(props) => (props.active ? '#ccc' : 'white')};
  cursor: pointer;
  outline: none;
  border-bottom: ${(props) => (props.active ? '3px solid blue' : 'none')};
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UpdateButton = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const ErrorContainer = styled.div`
  background-color: #ffdddd;
  color: #d8000c;
  padding: 10px;
  border: 1px solid #d8000c;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [profile, setProfile] = useState({
    // existing fields...
  });
  const [profileImage, setProfileImage] = useState(null);
  const [businessLogoImage, setBusinessLogoImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
        setProfile({ ...profile, ...response.data });
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Failed to fetch profile. Please try again later.');
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile(); 
  }, []);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    Object.keys(profile).forEach(key => {
      formData.append(key, profile[key]);
    });
    if (profileImage) {
      formData.append('profilePicture', profileImage);
    }
    if (businessLogoImage) {
      formData.append('businessLogo', businessLogoImage);
    }

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      await axios.patch(`http://localhost:5000/api/auth/profile/${userId}`, formData, config);
      alert('Profile updated successfully!');
      setError(null); // Clear any previous errors
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Failed to update profile. Please try again later.';
      setError(errorMessage);
      console.error('Failed to update profile:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <ProfileContainer>
      <LeftPanel>
        <ProfilePic src={profile.profilePicture ? `http://localhost:5000/${profile.profilePicture}` : 'https://via.placeholder.com/200'} alt={profile.profilePicture} />
        <FileInput type="file" onChange={(e) => handleImageChange(e, setProfileImage)} />
        <p>{`${profile.firstName} ${profile.lastName}`}</p>
        <p>{profile.email}</p>
      </LeftPanel>
      <RightPanel>
        {error && <ErrorContainer>{error}</ErrorContainer>}
        <div style={{ marginBottom: '20px', display: 'flex', borderBottom: '1px solid #ccc' }}>
          <Tab onClick={() => handleTabClick('about')} active={activeTab === 'about'}>About</Tab>
          <Tab onClick={() => handleTabClick('branchDetails')} active={activeTab === 'branchDetails'}>Branch Details</Tab>
        </div>
        {activeTab === 'about' && (
          <div>
            <InputGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input id="whatsappNumber" name="whatsappNumber" value={profile.whatsappNumber} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input type="date" id="dateOfBirth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" value={profile.country} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={profile.city} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={profile.location} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="age">Age</Label>
              <Input type="number" id="age" name="age" value={profile.age} onChange={handleChange} />
            </InputGroup>
          </div>
        )}
        {activeTab === 'branchDetails' && (
          <div>
            <InputGroup>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" name="businessName" value={profile.businessName} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="businessOwnerName">Business Owner Name</Label>
              <Input id="businessOwnerName" name="businessOwnerName" value={profile.businessOwnerName} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="businessWorkingArea">Business Working Area</Label>
              <Input id="businessWorkingArea" name="businessWorkingArea" value={profile.businessWorkingArea} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="businessNTN">Business NTN</Label>
              <Input id="businessNTN" name="businessNTN" value={profile.businessNTN} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="residential">Residential Info</Label>
              <Input id="residential" name="residential" value={profile.residential} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="commercial">Commercial Info</Label>
              <Input id="commercial" name="commercial" value={profile.commercial} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="land">Land Info</Label>
              <Input id="land" name="land" value={profile.land} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="experience">Experience (years)</Label>
              <Input type="number" id="experience" name="experience" value={profile.experience} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input id="skills" name="skills" value={profile.skills ? profile.skills.join(', ') : ''} onChange={e => setProfile({...profile, skills: e.target.value.split(',').map(skill => skill.trim())})} />
            </InputGroup>
          </div>
        )}
        <UpdateButton onClick={handleUpdateProfile}>Update Info</UpdateButton>
      </RightPanel>
    </ProfileContainer>
  );
};

export default ProfileView;
