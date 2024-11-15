// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import { FiUsers, FiHome, FiBriefcase, FiSun, FiClock } from 'react-icons/fi';
// // import {jwtDecode} from 'jwt-decode'; // Correct the import statement
// // import { Link } from 'react-router-dom';
// // import Lottie from 'react-lottie';
// // import animationData from '../animation/3.json';
// // import WeatherWidget from '../components/WeatherWidget';
// // import bgImage from '../images/bg.jpg';

// // const DashboardContainer = styled.div`
// //   background-image: url(${bgImage});
// //   background-size: cover;
// //   background-position: center;
// //   background-blend-mode: overlay;
// //   background-color: rgba(0, 0, 0, 0.5); // This creates the 50% opacity effect over the image
// //   height: 100vh;
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const ButtonContainer = styled.div`
// //   display: flex;
// //   flex-direction: column; // Buttons aligned vertically
// //   gap: 20px; // Space between buttons
// //   align-self: flex-end; // Aligns the container to the right
// //   margin-right: 100px;
// // `;

// // const NavButton = styled.button`
// //   padding: 40px;
// //   width: 400px; // Ensures all buttons have the same width
// //   border: none;
// //   border-radius: 10px;
// //   background: red; // Default background is now red
// //   color: white; // Set text color to white for better contrast
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   transition: background-color 0.3s;
// //   cursor: pointer;
// //   &:hover {
// //     background-color: darkred; // A darker red on hover
// //   }
// // `;

// // const Icon = styled.span`
// //   margin-right: 10px;
// //   font-size: 30px;
// // `;

// // const Label = styled.span`
// //   font-size: 26px;
// // `;


// // // const UserInfoWidget = styled.div`
// // //   position: fixed;
// // //   top: 250px;  // Adjust this as needed based on the height of the WeatherTimeWidget
// // //   left: 20px;
// // //   padding: 20px;
// // //   background: rgba(255, 255, 255, 0.8);  // Semi-transparent white background for visibility
// // //   color: #333;  // Dark text for readability
// // //   border-radius: 10px;
// // //   width: 300px;  // Set a fixed width
// // //   font-size: 16px;  // Font size for readability
// // //   display: flex;
// // //   flex-direction: column;
// // //   justify-content: space-between;
// // //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  // Subtle shadow for depth
// // // `;
// // const UserInfoWidget = styled.div`
// //   background-color: #fff;
// //   border-radius: 15px;
// //   box-shadow: 0 4px 8px rgba(0,0,0,0.15);
// //   padding: 10px;
// //   width: 320px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   font-family: Arial, sans-serif;
// //   position: fixed;  // Keeps the widget visible and in a fixed position
// //   top: 250px;  // Adjust this value so it doesn't overlap with the WeatherWidget
// //   left: 20px;
// //   z-index: 5;  // A lower z-index than WeatherWidget if it should appear beneath it
// // `;

// // const UserImage = styled.img`
// //   width: 80px;
// //   height: 80px;
// //   border-radius: 50%;
// //   margin-bottom: 10px;
// // `;

// // const UserName = styled.div`
// //   color: #333;
// //   font-size: 20px;
// //   font-weight: bold;
// // `;

// // const UserRole = styled.div`
// //   color: #666;
// //   font-size: 16px;
// //   margin-bottom: 10px;
// // `;


// // const UserInfoItem = styled.div`
// //   margin-bottom: 8px;  // Spacing between items
// // `;


// // const FloatingWeatherWidget = styled(WeatherWidget)`
// //   position: fixed;  // Use fixed to keep it in view even on scroll
// //   top: 20px;
// //   left: 20px;
// //   z-index: 10;  // Higher z-index ensures it stays on top
// // `;


// // const AnimationContainer = styled.div`
// //   position: fixed;  // Makes the container float over other content
// //   bottom: 20px;  // Positions the container at the bottom of the viewport
// //   left: 600px;  // Positions the container from the left side of the viewport
// //   display: flex;
// //   justify-content: flex-start; // Aligns items to the left
// //   align-items: center; // Vertically centers the items in the container
// //   width: 300px;  // Specifies the width of the container
// //   padding: 20px; // Adds padding inside the container
// //   z-index: 5;  // Ensures it does not overlap more important floating elements
// // `;


// // const LottieAnimation = () => {
// //   const defaultOptions = {
// //     loop: true,
// //     autoplay: true,
// //     animationData: animationData,
// //     rendererSettings: {
// //       preserveAspectRatio: 'xMidYMid slice'
// //     }
// //   };

// //   return <Lottie options={defaultOptions} height={400} width={400} />;
// // };

// // const fetchWeather = async (setWeather) => {
// //   const apiKey = 'b7a87b8e467a4d8ef91c459741fd0a08'; // Your API key
// //   const lat = '51.5074'; // Latitude for London
// //   const lon = '-0.1278'; // Longitude for London
// //   const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;

// //   try {
// //     const response = await fetch(url);
// //     const data = await response.json();
// //     console.log(data); // Log the data to see what's being returned
// //     const weather = {
// //       temp: Math.round(data.current.temp),
// //       description: data.current.weather[0].description
// //     };
// //     setWeather(weather);
// //   } catch (error) {
// //     console.error("Failed to fetch weather data:", error);
// //   }
// // };

// // const Dashboard = () => {
// //   const [time, setTime] = useState(new Date());
// //   const [user, setUser] = useState({ role: 'agent' });
// //   const [weather, setWeather] = useState({ temp: '', description: '' });

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       try {
// //         const decoded = jwtDecode(token);
// //         setUser({
// //           userId: decoded.userId,
// //           role: decoded.role,
// //           email: decoded.email,
// //           firstName: decoded.firstName,
// //           lastName: decoded.lastName,
// //           agencyId: decoded.agencyId // Include agencyId if present
// //         });
// //       } catch (error) {
// //         console.error("Failed to decode token:", error);
// //         // Handle token decode error, e.g., by redirecting to login
// //       }
// //     }

// //     const timer = setInterval(() => {
// //       setTime(new Date());
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   useEffect(() => {
// //     fetchWeather(setWeather);
// //   }, []);

// //   const profilePic = 'https://img.freepik.com/free-photo/3d-illustration-hipster-man-with-mustache-eyeglasses_1142-42006.jpg?t=st=1719521581~exp=1719525181~hmac=56cf45c62c59b3d5af2251f15439de55e3a79f29222cd2d162270c6e92a72437&w=740';

// //   return (
// //     <DashboardContainer>
// //       <br/>
// //       <UserInfoWidget>
// //       <UserImage src={profilePic} alt="Profile" />
// //       <UserName>{user.firstName} {user.lastName}</UserName>
// //       <UserRole>{user.role}</UserRole>
// //         {/* <UserInfoItem><strong>Name:</strong> {user.firstName} {user.lastName}</UserInfoItem>
// //         <UserInfoItem><strong>Role:</strong> {user.role}</UserInfoItem> */}
// //         {/* <UserInfoItem><strong>Email:</strong> {user.email}</UserInfoItem> */}
// //       </UserInfoWidget>
// //       <ButtonContainer>
// //         <Link to="/CRM" style={{ textDecoration: 'none' }}>
// //           <NavButton>
// //             <Icon><FiHome /></Icon>
// //             <Label>Dashboard</Label>
// //           </NavButton>
// //         </Link>
// //         <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
// //           <NavButton>
// //             <Icon><FiUsers /></Icon>
// //             <Label>Customers</Label>
// //           </NavButton>
// //         </Link>
// //         <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
// //           <NavButton>
// //             <Icon><FiUsers /></Icon>
// //             <Label>Property Bank</Label>
// //           </NavButton>
// //         </Link>
// //         <Link to="/FriendsList" style={{ textDecoration: 'none' }}>
// //           <NavButton>
// //             <Icon><FiUsers /></Icon>
// //             <Label>Business Associates</Label>
// //           </NavButton>
// //         </Link>
// //         <NavButton>
// //           <Icon><FiUsers /></Icon>
// //           <Label>My Profile</Label>
// //         </NavButton>
// //         {user.role === 'agency' && (
// //           <>
// //             <Link to="/Agent" style={{ textDecoration: 'none' }}>
// //               <NavButton>
// //                 <Icon><FiUsers /></Icon>
// //                 <Label>Agents</Label>
// //               </NavButton>
// //             </Link>
// //             <Link to="/AttendanceViewer" style={{ textDecoration: 'none' }}>
// //               <NavButton>
// //                 <Icon><FiBriefcase /></Icon>
// //                 <Label>Attendance Report</Label>
// //               </NavButton>
// //             </Link>
// //           </>
// //         )}
// //         {user.role === 'agent' && user.agencyId && (
// //           <Link to="/AttendanceModule" style={{ textDecoration: 'none' }}>
// //           <NavButton>
// //             <Icon><FiClock /></Icon>
// //             <Label>Mark Attendance</Label>
// //           </NavButton>
// //           </Link>
// //         )}
// //       </ButtonContainer>
// //       <AnimationContainer>
// //         <LottieAnimation />
// //       </AnimationContainer>
// //        <FloatingWeatherWidget />
// //     </DashboardContainer>
// //   );
// // };

// // export default Dashboard;




// import React, { useState, useEffect , useRef } from 'react';
// import styled from 'styled-components';
// import { FiUsers, FiHome, FiBriefcase, FiClock, FiBarChart2, FaBuildingColumns } from 'react-icons/fi';
// import {jwtDecode} from 'jwt-decode'; // Correct the import statement
// import { Link } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import animationData from '../animation/3.json';
// import WeatherWidget from '../components/WeatherWidget';
// import bgImage from '../images/bg.jpg';
// import { useNavigate } from 'react-router-dom';


// const DashboardContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5); // This creates the 50% opacity effect over the image
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   padding-top: 80px;
//   @media (max-width: 768px) {
//     height: auto;
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column; // Buttons aligned vertically
//   gap: 15px; // Space between buttons
//   align-self: flex-end; // Aligns the container to the right
//   margin-right: 100px;
//   @media (max-width: 768px) {
//     align-self: center;
//     margin-right: 0;
//     margin-top: 20px;
//   }
// `;

// const NavButton = styled.button`
//   padding: 40px;
//   width: 400px; // Ensures all buttons have the same width
//   border: none;
//   border-radius: 10px;
//   background: red; // Default background is now red
//   color: white; // Set text color to white for better contrast
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background-color 0.3s;
//   cursor: pointer;
//   &:hover {
//     background-color: darkred; // A darker red on hover
//   }
//   @media (max-width: 768px) {
//     width: 90%;
//     padding: 20px;
//   }
// `;


// const StickyButton = styled(NavButton)` // Now correctly extends NavButton which is already defined
//   position: fixed;
//   left: 20px;
//   bottom: 60px;
//   width: auto; // Automatically adjust width to fit content

//   @media (max-width: 768px) {
//     position: static;
//     margin: 14px auto;
//     width: 55%;
//   }
// `;

// const Icon = styled.span`
//   margin-right: 10px;
//   font-size: 30px;
// `;

// const Label = styled.span`
//   font-size: 26px;
// `;

// const UserInfoWidget = styled.div`
//   background-color: #fff;
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.15);
//   padding: 10px;
//   width: 320px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-family: Arial, sans-serif;
//   position: fixed;  // Keeps the widget visible and in a fixed position
//   top: 250px;  // Adjust this value so it doesn't overlap with the WeatherWidget
//   left: 20px;
//   z-index: 5;  // A lower z-index than WeatherWidget if it should appear beneath it
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const UserImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   margin-bottom: 10px;
// `;

// const UserName = styled.div`
//   color: #333;
//   font-size: 20px;
//   font-weight: bold;
// `;

// const UserRole = styled.div`
//   color: #666;
//   font-size: 16px;
//   margin-bottom: 10px;
// `;

// const FloatingWeatherWidget = styled(WeatherWidget)`
//   position: fixed;  // Use fixed to keep it in view even on scroll
//   top: 20px;
//   left: 20px;
//   z-index: 10;  // Higher z-index ensures it stays on top
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const AnimationContainer = styled.div`
//   position: fixed;  // Makes the container float over other content
//   bottom: 20px;  // Positions the container at the bottom of the viewport
//   left: 30%;  // Positions the container from the left side of the viewport
//   display: flex;
//   justify-content: flex-start; // Aligns items to the left
//   align-items: center; // Vertically centers the items in the container
//   width: 300px;  // Specifies the width of the container
//   padding: 20px; // Adds padding inside the container
//   z-index: 5;  // Ensures it does not overlap more important floating elements
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;


// const ProgressBarContainer = styled.div`
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   position: relative;
//   height: 20px;
//   width: 100%;
// `;

// const ProgressBar = styled.div`
//   background: green;
//   height: 100%;
//   transition: width 0.3s ease-in-out;
// `;

// const ProfileButton = styled(NavButton)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ProfileCompletion = styled.span`
//   color: white;
//   margin-left: 10px;
//   font-size: 16px;
// `;

// const LottieAnimation = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   return <Lottie options={defaultOptions} height={400} width={400} />;
// };

// const fetchWeather = async (setWeather) => {
//   const apiKey = 'b7a87b8e467a4d8ef91c459741fd0a08'; // Your API key
//   const lat = '51.5074'; // Latitude for London
//   const lon = '-0.1278'; // Longitude for London
//   const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data); // Log the data to see what's being returned
//     const weather = {
//       temp: Math.round(data.current.temp),
//       description: data.current.weather[0].description
//     };
//     setWeather(weather);
//   } catch (error) {
//     console.error("Failed to fetch weather data:", error);
//   }
// };



// const Dashboard = () => {
//   const [time, setTime] = useState(new Date());
//   const [user, setUser] = useState({ role: 'agent', profileCompletion: 0 });  // Default to 0% until fetched
//   const [weather, setWeather] = useState({ temp: '', description: '' });
//   const navigate = useNavigate();
//   const hasRedirected = useRef(false);


//   useEffect(() => {
//     if (hasRedirected.current) return; // Prevent further execution if already redirected

//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('Authentication Required. Redirecting to login...');
//       hasRedirected.current = true; // Mark as redirected
//       navigate('/login');
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         alert('Session has expired. Redirecting to login...');
//         hasRedirected.current = true; // Mark as redirected
//         navigate('/login');
//       }
//     } catch (error) {
//       alert('Authentication Required. Redirecting to login...');
//       hasRedirected.current = true; // Mark as redirected
//       navigate('/login');
//     }
//   }, [navigate]);


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log(decoded);
//         setUser({
//           userId: decoded.userId,
//           role: decoded.role,
//           email: decoded.email,
//           firstName: decoded.firstName,
//           lastName: decoded.lastName,
//           agencyId: decoded.agencyId, // Include agencyId if present
//           profilePic: decoded.profilePicture,
//         });
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         // Handle token decode error, e.g., by redirecting to login
//       }
//     }

//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

  
//   useEffect(() => {
//     fetchWeather(setWeather);
//   }, []);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:5000/api/auth/profile/${user.userId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setUser(prevState => ({
//             ...prevState,
//             profilePic: data.profilePicture,
//             profileCompletion: data.profileCompletion  // Ensure this field is correctly named as received from your backend
//           }));        
//         } else {
//           console.error("Failed to fetch user profile:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//       }
//     };

//     if (user.userId) {
//       fetchUserProfile();
//     }
//   }, [user.userId]);

  

//   const profilePic = 'https://cdn-icons-png.freepik.com/512/147/147144.png';

//   return (
//     <DashboardContainer>
//       <br/>
//       <UserInfoWidget>
//         {/* <UserImage src={user.profilePic} alt="Profile" /> */}
//         <UserImage src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : 'https://via.placeholder.com/200'} alt={user.profilePic} />
//         <UserName>{user.firstName} {user.lastName}</UserName>
//         <UserRole>{user.role}</UserRole>
//       </UserInfoWidget>
//       <FloatingWeatherWidget />
//       <AnimationContainer>
//         <LottieAnimation />
//       </AnimationContainer>
//       <ButtonContainer>
//         <Link to="/CRM" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiHome /></Icon>
//             <Label>Dashboard</Label>
//           </NavButton>
//         </Link>
//         <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiHome /></Icon>
//             <Label>Property Bank</Label>
//           </NavButton>
//         </Link>
//         <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiUsers /></Icon>
//             <Label>Customers</Label>
//           </NavButton>
//         </Link>
//         <Link to="/businessAssociatesPage" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiBriefcase /></Icon>
//             <Label>Business Associates</Label>
//           </NavButton>
//         </Link>
//         <Link to="/leadMenu" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiBarChart2 /></Icon>
//             <Label>Business Status</Label>
//           </NavButton>
//         </Link>
//         {/* <NavButton>
//           <Icon><FiUsers /></Icon>
//           <Label>My Profile</Label>
//         </NavButton> */}
//         <Link to="/profileView" style={{ textDecoration: 'none' }}>
//         <ProfileButton>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <Icon><FiUsers /></Icon>
//               <Label>My Profile</Label>
//             </div>
//             <ProfileCompletion>{user.profileCompletion}%</ProfileCompletion>
//             <ProgressBarContainer>
//               <ProgressBar style={{ width: `${user.profileCompletion}%` }} />
//             </ProgressBarContainer>
//           </ProfileButton>
//       </Link>
//         {user.role === 'agency' && (
//           <>
//             <Link to="/Agent" style={{ textDecoration: 'none' }}>
//               <NavButton>
//                 <Icon><FiUsers /></Icon>
//                 <Label>Agents</Label>
//               </NavButton>
//             </Link>
//             <Link to="/AttendanceViewer" style={{ textDecoration: 'none' }}>
//               <NavButton>
//                 <Icon><FiBriefcase /></Icon>
//                 <Label>Attendance Report</Label>
//               </NavButton>
//             </Link>
//           </>
//         )}
//         {user.role === 'agent' && user.agencyId && (
//           <Link to="/AttendanceModule" style={{ textDecoration: 'none' }}>
//             <NavButton>
//               <Icon><FiClock /></Icon>
//               <Label>Mark Attendance</Label>
//             </NavButton>
//           </Link>
//         )}
//       </ButtonContainer>
//       <br/>
//       <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
//         <StickyButton>
//           <Icon><FiBriefcase /></Icon>
//           <Label>Submit an Inquiry</Label>
//         </StickyButton>
//       </Link>
//     </DashboardContainer>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { FiUsers, FiHome, FiBriefcase, FiClock, FiBarChart2 } from 'react-icons/fi';
// import { jwtDecode } from 'jwt-decode';
// import { Link } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import animationData from '../animation/3.json';
// import WeatherWidget from '../components/WeatherWidget';
// import bgImage from '../images/bg.jpg';
// import { useNavigate } from 'react-router-dom';

// const DashboardContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   padding-top: 80px;
//   @media (max-width: 768px) {
//     height: auto;
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   align-self: flex-end;
//   margin-right: 100px;
//   @media (max-width: 768px) {
//     align-self: center;
//     margin-right: 0;
//     margin-top: 20px;
//   }
// `;

// const NavButton = styled.button`
//   padding: 40px;
//   width: 400px;
//   border: none;
//   border-radius: 10px;
//   background: red;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background-color 0.3s;
//   cursor: pointer;
//   &:hover {
//     background-color: darkred;
//   }
//   @media (max-width: 768px) {
//     width: 90%;
//     padding: 20px;
//   }
// `;

// const StickyButton = styled(NavButton)`
//   position: fixed;
//   left: 20px;
//   bottom: 60px;
//   width: auto;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 14px auto;
//     width: 55%;
//   }
// `;

// const Icon = styled.span`
//   margin-right: 10px;
//   font-size: 30px;
// `;

// const Label = styled.span`
//   font-size: 26px;
// `;

// const UserInfoWidget = styled.div`
//   background-color: #fff;
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.15);
//   padding: 10px;
//   width: 320px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: fixed;
//   top: 250px;
//   left: 20px;
//   z-index: 5;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const UserImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   margin-bottom: 10px;
// `;

// const UserName = styled.div`
//   color: #333;
//   font-size: 20px;
//   font-weight: bold;
// `;

// const UserRole = styled.div`
//   color: #666;
//   font-size: 16px;
//   margin-bottom: 10px;
// `;

// const FloatingWeatherWidget = styled(WeatherWidget)`
//   position: fixed;
//   top: 20px;
//   left: 20px;
//   z-index: 10;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const AnimationContainer = styled.div`
//   position: fixed;
//   bottom: 20px;
//   left: 30%;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   width: 300px;
//   padding: 20px;
//   z-index: 5;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const ProgressBarContainer = styled.div`
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   position: relative;
//   height: 20px;
//   width: 100%;
// `;

// const ProgressBar = styled.div`
//   background: green;
//   height: 100%;
//   transition: width 0.3s ease-in-out;
// `;

// const ProfileButton = styled(NavButton)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ProfileCompletion = styled.span`
//   color: white;
//   margin-left: 10px;
//   font-size: 16px;
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   text-align: center;
// `;

// const CloseButton = styled.button`
//   padding: 10px 20px;
//   background-color: red;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 20px;
// `;

// const LottieAnimation = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   return <Lottie options={defaultOptions} height={400} width={400} />;
// };

// const Dashboard = () => {
//   const [time, setTime] = useState(new Date());
//   const [user, setUser] = useState({ role: 'agent', profileCompletion: 0 });
//   const [weather, setWeather] = useState({ temp: '', description: '' });
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const hasRedirected = useRef(false);

//   useEffect(() => {
//     if (user.profileCompletion < 100) {
//       setShowModal(true);
//     } else {
//       setShowModal(false);
//     }
//   }, [user.profileCompletion]);

//   useEffect(() => {
//     if (hasRedirected.current) return;

//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('Authentication Required. Redirecting to login...');
//       hasRedirected.current = true;
//       navigate('/login');
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         alert('Session has expired. Redirecting to login...');
//         hasRedirected.current = true;
//         navigate('/login');
//       }
//     } catch (error) {
//       alert('Authentication Required. Redirecting to login...');
//       hasRedirected.current = true;
//       navigate('/login');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser({
//           userId: decoded.userId,
//           role: decoded.role,
//           email: decoded.email,
//           firstName: decoded.firstName,
//           lastName: decoded.lastName,
//           agencyId: decoded.agencyId,
//           profilePic: decoded.profilePicture,
//         });
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     }

//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       const apiKey = 'b7a87b8e467a4d8ef91c459741fd0a08';
//       const lat = '51.5074';
//       const lon = '-0.1278';
//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setWeather({
//           temp: Math.round(data.main.temp),
//           description: data.weather[0].description,
//         });
//       } catch (error) {
//         console.error("Failed to fetch weather data:", error);
//       }
//     };

//     fetchWeather();
//   }, []);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:5000/api/auth/profile/${user.userId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setUser(prevState => ({
//             ...prevState,
//             profilePic: data.profilePicture,
//             profileCompletion: data.profileCompletion
//           }));
//         } else {
//           console.error("Failed to fetch user profile:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//       }
//     };

//     if (user.userId) {
//       fetchUserProfile();
//     }
//   }, [user.userId]);

//   return (
//     <DashboardContainer>
//       <br/>
//       <UserInfoWidget>
//         <UserImage src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : 'https://via.placeholder.com/200'} alt="Profile"/>
//         <UserName>{user.firstName} {user.lastName}</UserName>
//         <UserRole>{user.role}</UserRole>
//       </UserInfoWidget>
//       <FloatingWeatherWidget />
//       <AnimationContainer>
//         <LottieAnimation />
//       </AnimationContainer>
//       <ButtonContainer>
//         <Link to="/CRM" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiHome /></Icon>
//             <Label>Dashboard</Label>
//           </NavButton>
//         </Link>
//         <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiHome /></Icon>
//             <Label>Property Bank</Label>
//           </NavButton>
//         </Link>
//         <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiUsers /></Icon>
//             <Label>Customers</Label>
//           </NavButton>
//         </Link>
//         <Link to="/businessAssociatesPage" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiBriefcase /></Icon>
//             <Label>Business Associates</Label>
//           </NavButton>
//         </Link>
//         <Link to="/leadMenu" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiBarChart2 /></Icon>
//             <Label>Business Status</Label>
//           </NavButton>
//         </Link>
//         <Link to="/profileView" style={{ textDecoration: 'none' }}>
//           <ProfileButton>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <Icon><FiUsers /></Icon>
//               <Label>My Profile</Label>
//             </div>
//             <ProfileCompletion>{user.profileCompletion}%</ProfileCompletion>
//             <ProgressBarContainer>
//               <ProgressBar style={{ width: `${user.profileCompletion}%` }} />
//             </ProgressBarContainer>
//           </ProfileButton>
//         </Link>
//         {user.role === 'agency' && (
//           <>
//             <Link to="/Agent" style={{ textDecoration: 'none' }}>
//               <NavButton>
//                 <Icon><FiUsers /></Icon>
//                 <Label>Agents</Label>
//               </NavButton>
//             </Link>
//             <Link to="/AttendanceViewer" style={{ textDecoration: 'none' }}>
//               <NavButton>
//                 <Icon><FiBriefcase /></Icon>
//                 <Label>Attendance Report</Label>
//               </NavButton>
//             </Link>
//           </>
//         )}
//         {user.role === 'agent' && user.agencyId && (
//           <Link to="/AttendanceModule" style={{ textDecoration: 'none' }}>
//             <NavButton>
//               <Icon><FiClock /></Icon>
//               <Label>Mark Attendance</Label>
//             </NavButton>
//           </Link>
//         )}
//       </ButtonContainer>
//       <br/>
//       <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
//         <StickyButton>
//           <Icon><FiBriefcase /></Icon>
//           <Label>Submit an Inquiry</Label>
//         </StickyButton>
//       </Link>
//       {showModal && (
//         <Modal>
//           <ModalContent>
//             <h1>Complete Your Profile</h1>
//             <p>Complete your profile to get a 10% discount on our premium advertisement plans!</p>
//             <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
//           </ModalContent>
//         </Modal>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { FiUsers, FiHome, FiBriefcase, FiClock, FiBarChart2, FiAlertCircle } from 'react-icons/fi';
// import {jwtDecode} from 'jwt-decode';
// import { Link, useNavigate } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import animationData from '../animation/3.json';
// import WeatherWidget from '../components/WeatherWidget';
// import bgImage from '../images/bg.jpg';
// import { AnimatePresence, motion } from 'framer-motion';

// // Styled components
// const DashboardContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   padding-top: 80px;
//   @media (max-width: 768px) {
//     height: auto;
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   align-self: flex-end;
//   margin-right: 100px;
//   @media (max-width: 768px) {
//     align-self: center;
//     margin-right: 0;
//     margin-top: 20px;
//   }
// `;

// const NavButton = styled.button`
//   padding: 40px;
//   width: 400px;
//   border: none;
//   border-radius: 10px;
//   background: red;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background-color 0.3s;
//   cursor: pointer;
//   &:hover {
//     background-color: darkred;
//   }
//   @media (max-width: 768px) {
//     width: 90%;
//     padding: 20px;
//   }
// `;

// const StickyButton = styled(NavButton)`
//   position: fixed;
//   left: 20px;
//   bottom: 60px;
//   width: auto;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 14px auto;
//     width: 55%;
//   }
// `;

// const Icon = styled.span`
//   margin-right: 10px;
//   font-size: 30px;
// `;

// const Label = styled.span`
//   font-size: 26px;
// `;

// const UserInfoWidget = styled.div`
//   background-color: #fff;
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.15);
//   padding: 10px;
//   width: 320px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: fixed;
//   top: 250px;
//   left: 20px;
//   z-index: 5;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const UserImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   margin-bottom: 10px;
// `;

// const UserName = styled.div`
//   color: #333;
//   font-size: 20px;
//   font-weight: bold;
// `;

// const UserRole = styled.div`
//   color: #666;
//   font-size: 16px;
//   margin-bottom: 10px;
// `;

// const FloatingWeatherWidget = styled(WeatherWidget)`
//   position: fixed;
//   top: 20px;
//   left: 20px;
//   z-index: 10;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const AnimationContainer = styled.div`
//   position: fixed;
//   bottom: 20px;
//   left: 30%;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   width: 300px;
//   padding: 20px;
//   z-index: 5;
//   @media (max-width: 768px) {
//     position: static;
//     margin: 20px auto;
//     width: 90%;
//   }
// `;

// const ProgressBarContainer = styled.div`
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   position: relative;
//   height: 20px;
//   width: 100%;
// `;

// const ProgressBar = styled.div`
//   background: green;
//   height: 100%;
//   transition: width 0.3s ease-in-out;
// `;

// const ProfileButton = styled(NavButton)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ProfileCompletion = styled.span`
//   color: white;
//   margin-left: 10px;
//   font-size: 16px;
// `;

// // New Modal Styled Components with Adjusted Colors
// const ModalOverlay = styled(motion.div)`
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 2rem;
//   position: fixed;
//   inset: 0;
//   z-index: 1000;
//   display: grid;
//   place-items: center;
//   overflow-y: auto;
//   cursor: pointer;
// `;

// const ModalContent = styled(motion.div)`
//   background: linear-gradient(to bottom right, red, darkred);
//   color: white;
//   padding: 1.5rem;
//   border-radius: 0.5rem;
//   width: 100%;
//   max-width: 32rem;
//   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
//   cursor: default;
//   position: relative;
//   overflow: hidden;

//   .icon-background {
//     color: rgba(255, 255, 255, 0.1);
//     transform: rotate(12deg);
//     font-size: 250px;
//     position: absolute;
//     z-index: 0;
//     top: -6rem;
//     left: -6rem;
//   }

//   .modal-body {
//     position: relative;
//     z-index: 10;
//     text-align: center;

//     .icon-wrapper {
//       background-color: white;
//       width: 4rem;
//       height: 4rem;
//       margin: 0 auto 0.5rem;
//       border-radius: 9999px;
//       display: grid;
//       place-items: center;
//       color: darkred;
//       font-size: 1.875rem;
//     }

//     h3 {
//       font-size: 1.875rem;
//       font-weight: bold;
//       margin-bottom: 0.5rem;
//     }

//     p {
//       margin-bottom: 1.5rem;
//     }

//     .button-group {
//       display: flex;
//       gap: 0.5rem;

//       button {
//         flex: 1;
//         padding: 0.5rem;
//         border-radius: 0.375rem;
//         font-weight: 600;
//         cursor: pointer;
//         transition: opacity 0.2s;
//         border: none;

//         &:first-child {
//           background-color: transparent;
//           color: white;
//           &:hover {
//             opacity: 0.9;
//           }
//         }

//         &:last-child {
//           background-color: white;
//           color: darkred;
//           &:hover {
//             opacity: 0.9;
//           }
//         }
//       }
//     }
//   }
// `;

// // Lottie Animation Component
// const LottieAnimation = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   return <Lottie options={defaultOptions} height={400} width={400} />;
// };

// // New Modal Component
// const SpringModal = ({ isOpen, setIsOpen }) => {
//   const navigate = useNavigate(); // Use navigate inside the modal component

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <ModalOverlay
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsOpen(false)}
//         >
//           <ModalContent
//             initial={{ scale: 0, rotate: '12.5deg' }}
//             animate={{ scale: 1, rotate: '0deg' }}
//             exit={{ scale: 0, rotate: '0deg' }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <FiAlertCircle className="icon-background" />
//             <div className="modal-body">
//               <div className="icon-wrapper">
//                 <FiAlertCircle />
//               </div>
//               <h3>Complete Your Profile</h3>
//               <p>
//                 Complete your profile to get a 10% discount on our premium advertisement plans!
//               </p>
//               <div className="button-group">
//                 <button onClick={() => setIsOpen(false)}>Later</button>
//                 <button
//                   onClick={() => {
//                     setIsOpen(false);
//                     navigate('/ProfileView'); // Adjust this path to your profile edit page
//                   }}
//                 >
//                   Complete Now
//                 </button>
//               </div>
//             </div>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </AnimatePresence>
//   );
// };

// const Dashboard = () => {
//   const [time, setTime] = useState(new Date());
//   const [user, setUser] = useState({ role: 'agent', profileCompletion: 0 });
//   const [weather, setWeather] = useState({ temp: '', description: '' });
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const hasRedirected = useRef(false);

//   useEffect(() => {
//     if (user.profileCompletion < 100) {
//       setShowModal(true);
//     } else {
//       setShowModal(false);
//     }
//   }, [user.profileCompletion]);

//   useEffect(() => {
//     if (hasRedirected.current) return;

//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('Authentication Required. Redirecting to login...');
//       hasRedirected.current = true;
//       navigate('/login');
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         alert('Session has expired. Redirecting to login...');
//         hasRedirected.current = true;
//         navigate('/login');
//       }
//     } catch (error) {
//       alert('Authentication Required. Redirecting to login...');
//       hasRedirected.current = true;
//       navigate('/login');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser({
//           userId: decoded.userId,
//           role: decoded.role,
//           email: decoded.email,
//           firstName: decoded.firstName,
//           lastName: decoded.lastName,
//           agencyId: decoded.agencyId,
//           profilePic: decoded.profilePicture,
//           profileCompletion: decoded.profileCompletion || 0,
//         });
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }
//     }

//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       const apiKey = 'b7a87b8e467a4d8ef91c459741fd0a08';
//       const lat = '51.5074';
//       const lon = '-0.1278';
//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setWeather({
//           temp: Math.round(data.main.temp),
//           description: data.weather[0].description,
//         });
//       } catch (error) {
//         console.error('Failed to fetch weather data:', error);
//       }
//     };

//     fetchWeather();
//   }, []);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:5000/api/auth/profile/${user.userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setUser((prevState) => ({
//             ...prevState,
//             profilePic: data.profilePicture,
//             profileCompletion: data.profileCompletion,
//           }));
//         } else {
//           console.error('Failed to fetch user profile:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//       }
//     };

//     if (user.userId) {
//       fetchUserProfile();
//     }
//   }, [user.userId]);

//   return (
//     <DashboardContainer>
//       <br />
//       <UserInfoWidget>
//         <UserImage
//           src={
//             user.profilePic
//               ? `http://localhost:5000/${user.profilePic}`
//               : 'https://via.placeholder.com/200'
//           }
//           alt="Profile"
//         />
//         <UserName>
//           {user.firstName} {user.lastName}
//         </UserName>
//         <UserRole>{user.role}</UserRole>
//       </UserInfoWidget>
//       <FloatingWeatherWidget />
//       <AnimationContainer>
//         <LottieAnimation />
//       </AnimationContainer>
//       <ButtonContainer>
//         <Link to="/CRM" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon>
//               <FiHome />
//             </Icon>
//             <Label>Dashboard</Label>
//           </NavButton>
//         </Link>
//         <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon>
//               <FiHome />
//             </Icon>
//             <Label>Property Bank</Label>
//           </NavButton>
//         </Link>
//         <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon>
//               <FiUsers />
//             </Icon>
//             <Label>Customers</Label>
//           </NavButton>
//         </Link>
//         <Link to="/businessAssociatesPage" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon>
//               <FiBriefcase />
//             </Icon>
//             <Label>Business Associates</Label>
//           </NavButton>
//         </Link>
//         <Link to="/leadMenu" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon>
//               <FiBarChart2 />
//             </Icon>
//             <Label>Business Status</Label>
//           </NavButton>
//         </Link>
//         <Link to="/profileView" style={{ textDecoration: 'none' }}>
//           <ProfileButton>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <Icon>
//                 <FiUsers />
//               </Icon>
//               <Label>My Profile</Label>
//             </div>
//             <ProfileCompletion>{user.profileCompletion}%</ProfileCompletion>
//             <ProgressBarContainer>
//               <ProgressBar style={{ width: `${user.profileCompletion}%` }} />
//             </ProgressBarContainer>
//           </ProfileButton>
//         </Link>
//         {user.role === 'agency' && (
//           <>
//             <Link to="/Agent" style={{ textDecoration: 'none' }}>
//               <NavButton>
//                 <Icon>
//                   <FiUsers />
//                 </Icon>
//                 <Label>Agents</Label>
//               </NavButton>
//             </Link>
//             <Link to="/AttendanceViewer" style={{ textDecoration: 'none' }}>
//               <NavButton>
//                 <Icon>
//                   <FiBriefcase />
//                 </Icon>
//                 <Label>Attendance Report</Label>
//               </NavButton>
//             </Link>
//           </>
//         )}
//         {user.role === 'agent' && user.agencyId && (
//           <Link to="/AttendanceModule" style={{ textDecoration: 'none' }}>
//             <NavButton>
//               <Icon>
//                 <FiClock />
//               </Icon>
//               <Label>Mark Attendance</Label>
//             </NavButton>
//           </Link>
//         )}
//       </ButtonContainer>
//       <br />
//       <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
//         <StickyButton>
//           <Icon>
//             <FiBriefcase />
//           </Icon>
//           <Label>Submit an Inquiry</Label>
//         </StickyButton>
//       </Link>
//       <SpringModal isOpen={showModal} setIsOpen={setShowModal} />
//     </DashboardContainer>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  FiUsers,
  FiHome,
  FiBriefcase,
  FiClock,
  FiBarChart2,
  FiAlertCircle,
} from 'react-icons/fi';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animation/3.json';
import WeatherWidget from '../components/WeatherWidget';
import bgImage from '../images/bg.jpg';
import { AnimatePresence, motion } from 'framer-motion';

// Styled components with updated styles and adjustments
const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px; /* Accommodate sticky header */
  padding: 20px;
  position: relative;
  overflow-x: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 20px 0;
`;

const NavButton = styled(motion.button)`
  padding: 15px;
  width: 220px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 15px rgba(255, 75, 43, 0.4);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const Icon = styled.span`
  margin-bottom: 5px;
  font-size: 30px;
`;

const Label = styled.span`
  font-size: 16px;
  text-align: center;
`;

const UserInfoWidget = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  padding: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed; /* Made sticky */
  top: 100px; /* Adjust as needed */
  right: 20px;
  z-index: 10;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 20px;
  }
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;

const UserName = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const UserRole = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

const FloatingWeatherWidget = styled(WeatherWidget)`
  position: fixed;
  top: 100px; /* Adjust to align with UserInfoWidget */
  right: 20px;
  width: 200px; /* Set same width */
  z-index: 10;

  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
  }
`;

const AnimationContainer = styled.div`
  margin-top: 20px;
  width: 200px; /* Decreased width */
  height: 200px; /* Decreased height */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileCompletion = styled.div`
  width: 100%;
  background: #e0e0de;
  border-radius: 20px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: linear-gradient(135deg, #00b09b, #96c93d);
  width: ${(props) => props.width || '0%'};
  transition: width 0.5s ease-in-out;
`;

// Modal Styled Components
const ModalOverlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  overflow-y: auto;
  cursor: pointer;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(to bottom right, #ff416c, #ff4b2b);
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 32rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  cursor: default;
  position: relative;
  overflow: hidden;

  .icon-background {
    color: rgba(255, 255, 255, 0.1);
    transform: rotate(12deg);
    font-size: 250px;
    position: absolute;
    z-index: 0;
    top: -6rem;
    left: -6rem;
  }

  .modal-body {
    position: relative;
    z-index: 10;
    text-align: center;

    .icon-wrapper {
      background-color: white;
      width: 4rem;
      height: 4rem;
      margin: 0 auto 0.5rem;
      border-radius: 9999px;
      display: grid;
      place-items: center;
      color: #ff416c;
      font-size: 1.875rem;
    }

    h3 {
      font-size: 1.875rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 1.5rem;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;

      button {
        flex: 1;
        padding: 0.5rem;
        border-radius: 0.375rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;
        border: none;

        &:first-child {
          background-color: transparent;
          color: white;
          &:hover {
            opacity: 0.9;
          }
        }

        &:last-child {
          background-color: white;
          color: #ff416c;
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }
`;

// Lottie Animation Component (decreased size)
const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={200} width={200} />;
};

// SpringModal Component
const SpringModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <ModalContent
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FiAlertCircle className="icon-background" />
            <div className="modal-body">
              <div className="icon-wrapper">
                <FiAlertCircle />
              </div>
              <h3>Complete Your Profile</h3>
              <p>
                Complete your profile to get a 10% discount on our premium advertisement plans!
              </p>
              <div className="button-group">
                <button onClick={() => setIsOpen(false)}>Later</button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/ProfileView');
                  }}
                >
                  Complete Now
                </button>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState({ role: 'agent', profileCompletion: 0 });
  const [weather, setWeather] = useState({ temp: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  // Check profile completion and show modal if less than 100%
  useEffect(() => {
    if (user.profileCompletion < 100) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [user.profileCompletion]);

  // Authentication and token validation
  useEffect(() => {
    if (hasRedirected.current) return;

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authentication Required. Redirecting to login...');
      hasRedirected.current = true;
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        alert('Session has expired. Redirecting to login...');
        hasRedirected.current = true;
        navigate('/login');
      }
    } catch (error) {
      alert('Authentication Required. Redirecting to login...');
      hasRedirected.current = true;
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user data from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          userId: decoded.userId,
          role: decoded.role,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          agencyId: decoded.agencyId,
          profilePic: decoded.profilePicture,
          profileCompletion: decoded.profileCompletion || 0,
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'b7a87b8e467a4d8ef91c459741fd0a08';
      const lat = '51.5074';
      const lon = '-0.1278';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:5000/api/auth/profile/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser((prevState) => ({
            ...prevState,
            profilePic: data.profilePicture,
            profileCompletion: data.profileCompletion,
          }));
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    if (user.userId) {
      fetchUserProfile();
    }
  }, [user.userId]);

  return (
    <DashboardContainer>
      <UserInfoWidget>
        <UserImage
          src={
            user.profilePic
              ? `http://localhost:5000/${user.profilePic}`
              : 'https://via.placeholder.com/200'
          }
          alt="Profile"
        />
        <UserName>
          {user.firstName} {user.lastName}
        </UserName>
        <UserRole>{user.role}</UserRole>
        <ProfileCompletion>
          <ProgressBar width={`${user.profileCompletion}%`} />
        </ProfileCompletion>
      </UserInfoWidget>
      <FloatingWeatherWidget />
      <AnimationContainer>
        <LottieAnimation />
      </AnimationContainer>
      <ButtonContainer>
        <Link to="/CRM" style={{ textDecoration: 'none' }}>
          <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Icon>
              <FiHome />
            </Icon>
            <Label>Dashboard</Label>
          </NavButton>
        </Link>
        <Link to="/PropertyBank" style={{ textDecoration: 'none' }}>
          <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Icon>
              <FiHome />
            </Icon>
            <Label>Property Bank</Label>
          </NavButton>
        </Link>
        <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
          <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Icon>
              <FiUsers />
            </Icon>
            <Label>Customers</Label>
          </NavButton>
        </Link>
        <Link to="/businessAssociatesPage" style={{ textDecoration: 'none' }}>
          <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Icon>
              <FiBriefcase />
            </Icon>
            <Label>Business Associates</Label>
          </NavButton>
        </Link>
        <Link to="/leadMenu" style={{ textDecoration: 'none' }}>
          <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Icon>
              <FiBarChart2 />
            </Icon>
            <Label>Business Status</Label>
          </NavButton>
        </Link>
        <Link to="/profileView" style={{ textDecoration: 'none' }}>
          <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Icon>
              <FiUsers />
            </Icon>
            <Label>My Profile</Label>
            <ProfileCompletion>
              <ProgressBar width={`${user.profileCompletion}%`} />
            </ProfileCompletion>
          </NavButton>
        </Link>
        {user.role === 'agency' && (
          <>
            <Link to="/Agent" style={{ textDecoration: 'none' }}>
              <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Icon>
                  <FiUsers />
                </Icon>
                <Label>Agents</Label>
              </NavButton>
            </Link>
            <Link to="/AttendanceViewer" style={{ textDecoration: 'none' }}>
              <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Icon>
                  <FiBriefcase />
                </Icon>
                <Label>Attendance Report</Label>
              </NavButton>
            </Link>
          </>
        )}
        {user.role === 'agent' && user.agencyId && (
          <Link to="/AttendanceModule" style={{ textDecoration: 'none' }}>
            <NavButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Icon>
                <FiClock />
              </Icon>
              <Label>Mark Attendance</Label>
            </NavButton>
          </Link>
        )}
      </ButtonContainer>
      {/* Adjusted position of the sticky button */}
      <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
        <NavButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            left: '20px',
            bottom: '100px', /* Increased bottom margin */
            width: 'auto',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #00b09b, #96c93d)',
            zIndex: 10,
          }}
        >
          <Icon>
            <FiBriefcase />
          </Icon>
          <Label>Submit an Inquiry</Label>
        </NavButton>
      </Link>
      <SpringModal isOpen={showModal} setIsOpen={setShowModal} />
    </DashboardContainer>
  );
};

export default Dashboard;
