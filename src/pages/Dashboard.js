// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { FiUsers, FiHome, FiBriefcase, FiSun, FiClock } from 'react-icons/fi';
// import {jwtDecode} from 'jwt-decode'; // Correct the import statement
// import { Link } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import animationData from '../animation/3.json';
// import WeatherWidget from '../components/WeatherWidget';
// import bgImage from '../images/bg.jpg';

// const DashboardContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5); // This creates the 50% opacity effect over the image
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column; // Buttons aligned vertically
//   gap: 20px; // Space between buttons
//   align-self: flex-end; // Aligns the container to the right
//   margin-right: 100px;
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
// `;

// const Icon = styled.span`
//   margin-right: 10px;
//   font-size: 30px;
// `;

// const Label = styled.span`
//   font-size: 26px;
// `;


// // const UserInfoWidget = styled.div`
// //   position: fixed;
// //   top: 250px;  // Adjust this as needed based on the height of the WeatherTimeWidget
// //   left: 20px;
// //   padding: 20px;
// //   background: rgba(255, 255, 255, 0.8);  // Semi-transparent white background for visibility
// //   color: #333;  // Dark text for readability
// //   border-radius: 10px;
// //   width: 300px;  // Set a fixed width
// //   font-size: 16px;  // Font size for readability
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: space-between;
// //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  // Subtle shadow for depth
// // `;
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


// const UserInfoItem = styled.div`
//   margin-bottom: 8px;  // Spacing between items
// `;


// const FloatingWeatherWidget = styled(WeatherWidget)`
//   position: fixed;  // Use fixed to keep it in view even on scroll
//   top: 20px;
//   left: 20px;
//   z-index: 10;  // Higher z-index ensures it stays on top
// `;


// const AnimationContainer = styled.div`
//   position: fixed;  // Makes the container float over other content
//   bottom: 20px;  // Positions the container at the bottom of the viewport
//   left: 600px;  // Positions the container from the left side of the viewport
//   display: flex;
//   justify-content: flex-start; // Aligns items to the left
//   align-items: center; // Vertically centers the items in the container
//   width: 300px;  // Specifies the width of the container
//   padding: 20px; // Adds padding inside the container
//   z-index: 5;  // Ensures it does not overlap more important floating elements
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
//   const [user, setUser] = useState({ role: 'agent' });
//   const [weather, setWeather] = useState({ temp: '', description: '' });

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
//           agencyId: decoded.agencyId // Include agencyId if present
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

//   const profilePic = 'https://img.freepik.com/free-photo/3d-illustration-hipster-man-with-mustache-eyeglasses_1142-42006.jpg?t=st=1719521581~exp=1719525181~hmac=56cf45c62c59b3d5af2251f15439de55e3a79f29222cd2d162270c6e92a72437&w=740';

//   return (
//     <DashboardContainer>
//       <br/>
//       <UserInfoWidget>
//       <UserImage src={profilePic} alt="Profile" />
//       <UserName>{user.firstName} {user.lastName}</UserName>
//       <UserRole>{user.role}</UserRole>
//         {/* <UserInfoItem><strong>Name:</strong> {user.firstName} {user.lastName}</UserInfoItem>
//         <UserInfoItem><strong>Role:</strong> {user.role}</UserInfoItem> */}
//         {/* <UserInfoItem><strong>Email:</strong> {user.email}</UserInfoItem> */}
//       </UserInfoWidget>
//       <ButtonContainer>
//         <Link to="/CRM" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiHome /></Icon>
//             <Label>Dashboard</Label>
//           </NavButton>
//         </Link>
//         <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiUsers /></Icon>
//             <Label>Customers</Label>
//           </NavButton>
//         </Link>
//         <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiUsers /></Icon>
//             <Label>Property Bank</Label>
//           </NavButton>
//         </Link>
//         <Link to="/FriendsList" style={{ textDecoration: 'none' }}>
//           <NavButton>
//             <Icon><FiUsers /></Icon>
//             <Label>Business Associates</Label>
//           </NavButton>
//         </Link>
//         <NavButton>
//           <Icon><FiUsers /></Icon>
//           <Label>My Profile</Label>
//         </NavButton>
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
//           <NavButton>
//             <Icon><FiClock /></Icon>
//             <Label>Mark Attendance</Label>
//           </NavButton>
//           </Link>
//         )}
//       </ButtonContainer>
//       <AnimationContainer>
//         <LottieAnimation />
//       </AnimationContainer>
//        <FloatingWeatherWidget />
//     </DashboardContainer>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiUsers, FiHome, FiBriefcase, FiClock, FiBarChart2, FaBuildingColumns } from 'react-icons/fi';
import {jwtDecode} from 'jwt-decode'; // Correct the import statement
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animation/3.json';
import WeatherWidget from '../components/WeatherWidget';
import bgImage from '../images/bg.jpg';

const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5); // This creates the 50% opacity effect over the image
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; // Buttons aligned vertically
  gap: 15px; // Space between buttons
  align-self: flex-end; // Aligns the container to the right
  margin-right: 100px;
  @media (max-width: 768px) {
    align-self: center;
    margin-right: 0;
    margin-top: 20px;
  }
`;

const NavButton = styled.button`
  padding: 40px;
  width: 400px; // Ensures all buttons have the same width
  border: none;
  border-radius: 10px;
  background: red; // Default background is now red
  color: white; // Set text color to white for better contrast
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: darkred; // A darker red on hover
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;


const StickyButton = styled(NavButton)` // Now correctly extends NavButton which is already defined
  position: fixed;
  left: 20px;
  bottom: 60px;
  width: auto; // Automatically adjust width to fit content

  @media (max-width: 768px) {
    position: static;
    margin: 14px auto;
    width: 55%;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  font-size: 30px;
`;

const Label = styled.span`
  font-size: 26px;
`;

const UserInfoWidget = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  padding: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  position: fixed;  // Keeps the widget visible and in a fixed position
  top: 250px;  // Adjust this value so it doesn't overlap with the WeatherWidget
  left: 20px;
  z-index: 5;  // A lower z-index than WeatherWidget if it should appear beneath it
  @media (max-width: 768px) {
    position: static;
    margin: 20px auto;
    width: 90%;
  }
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;

const UserRole = styled.div`
  color: #666;
  font-size: 16px;
  margin-bottom: 10px;
`;

const FloatingWeatherWidget = styled(WeatherWidget)`
  position: fixed;  // Use fixed to keep it in view even on scroll
  top: 20px;
  left: 20px;
  z-index: 10;  // Higher z-index ensures it stays on top
  @media (max-width: 768px) {
    position: static;
    margin: 20px auto;
    width: 90%;
  }
`;

const AnimationContainer = styled.div`
  position: fixed;  // Makes the container float over other content
  bottom: 20px;  // Positions the container at the bottom of the viewport
  left: 600px;  // Positions the container from the left side of the viewport
  display: flex;
  justify-content: flex-start; // Aligns items to the left
  align-items: center; // Vertically centers the items in the container
  width: 300px;  // Specifies the width of the container
  padding: 20px; // Adds padding inside the container
  z-index: 5;  // Ensures it does not overlap more important floating elements
  @media (max-width: 768px) {
    position: static;
    margin: 20px auto;
    width: 90%;
  }
`;


const ProgressBarContainer = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: 20px;
  width: 100%;
`;

const ProgressBar = styled.div`
  background: green;
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

const ProfileButton = styled(NavButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileCompletion = styled.span`
  color: white;
  margin-left: 10px;
  font-size: 16px;
`;

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

const fetchWeather = async (setWeather) => {
  const apiKey = 'b7a87b8e467a4d8ef91c459741fd0a08'; // Your API key
  const lat = '51.5074'; // Latitude for London
  const lon = '-0.1278'; // Longitude for London
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Log the data to see what's being returned
    const weather = {
      temp: Math.round(data.current.temp),
      description: data.current.weather[0].description
    };
    setWeather(weather);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
};

const calculateProfileCompletion = (user) => {
  const fields = ['email', 'firstName', 'lastName', 'address', 'phone', 'biography'];  // Add more fields as needed
  const filledCount = fields.reduce((count, field) => count + (user[field] ? 1 : 0), 0);
  return Math.round((filledCount / fields.length) * 100);
};


const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState({ role: 'agent' });
  const [weather, setWeather] = useState({ temp: '', description: '' });
  const profileCompletion = calculateProfileCompletion(user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUser({
          userId: decoded.userId,
          role: decoded.role,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          agencyId: decoded.agencyId, // Include agencyId if present
          profilePic: decoded.profilePicture,
        });
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Handle token decode error, e.g., by redirecting to login
      }
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeather(setWeather);
  }, []);

  const profilePic = 'https://cdn-icons-png.freepik.com/512/147/147144.png';

  return (
    <DashboardContainer>
      <br/>
      <UserInfoWidget>
        {/* <UserImage src={user.profilePic} alt="Profile" /> */}
        <UserImage src={user.profilePic || profilePic} />
        <UserName>{user.firstName} {user.lastName}</UserName>
        <UserRole>{user.role}</UserRole>
      </UserInfoWidget>
      <FloatingWeatherWidget />
      <AnimationContainer>
        <LottieAnimation />
      </AnimationContainer>
      <ButtonContainer>
        <Link to="/CRM" style={{ textDecoration: 'none' }}>
          <NavButton>
            <Icon><FiHome /></Icon>
            <Label>Dashboard</Label>
          </NavButton>
        </Link>
        <Link to="/CustomerView" style={{ textDecoration: 'none' }}>
          <NavButton>
            <Icon><FiUsers /></Icon>
            <Label>Customers</Label>
          </NavButton>
        </Link>
        <Link to="/PropertyView" style={{ textDecoration: 'none' }}>
          <NavButton>
            <Icon><FiHome /></Icon>
            <Label>Property Bank</Label>
          </NavButton>
        </Link>
        <Link to="/leadMenu" style={{ textDecoration: 'none' }}>
          <NavButton>
            <Icon><FiBarChart2 /></Icon>
            <Label>Business Status</Label>
          </NavButton>
        </Link>
        <Link to="/businessAssociatesPage" style={{ textDecoration: 'none' }}>
          <NavButton>
            <Icon><FiBriefcase /></Icon>
            <Label>Business Associates</Label>
          </NavButton>
        </Link>
        {/* <NavButton>
          <Icon><FiUsers /></Icon>
          <Label>My Profile</Label>
        </NavButton> */}
        <Link to="/profileView" style={{ textDecoration: 'none' }}>
        <ProfileButton>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon><FiUsers /></Icon>
            <Label>My Profile</Label>
          </div>
          <ProfileCompletion>{profileCompletion}%</ProfileCompletion>
          <ProgressBarContainer>
            <ProgressBar style={{ width: `${profileCompletion}%` }} />
          </ProgressBarContainer>
        </ProfileButton>
      </Link>
        {user.role === 'agency' && (
          <>
            <Link to="/Agent" style={{ textDecoration: 'none' }}>
              <NavButton>
                <Icon><FiUsers /></Icon>
                <Label>Agents</Label>
              </NavButton>
            </Link>
            <Link to="/AttendanceViewer" style={{ textDecoration: 'none' }}>
              <NavButton>
                <Icon><FiBriefcase /></Icon>
                <Label>Attendance Report</Label>
              </NavButton>
            </Link>
          </>
        )}
        {user.role === 'agent' && user.agencyId && (
          <Link to="/AttendanceModule" style={{ textDecoration: 'none' }}>
            <NavButton>
              <Icon><FiClock /></Icon>
              <Label>Mark Attendance</Label>
            </NavButton>
          </Link>
        )}
      </ButtonContainer>
      <br/>
      <Link to="/CheckCustomer" style={{ textDecoration: 'none' }}>
        <StickyButton>
          <Icon><FiBriefcase /></Icon>
          <Label>Submit an Inquiry</Label>
        </StickyButton>
      </Link>
    </DashboardContainer>
  );
};

export default Dashboard;
