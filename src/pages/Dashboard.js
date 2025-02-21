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
import {  FaChartBar } from 'react-icons/fa'; 
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animation/3.json';
import WeatherWidget from '../components/WeatherWidget';
import bgImage from '../images/bg.jpg';
import { AnimatePresence, motion } from 'framer-motion';
import { API_CONFIG } from '../config/api.config';

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
          `${API_CONFIG.API_URL}/auth/profile/${user.userId}`,
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
              ? `${user.profilePic}`
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
              <FaChartBar />
            </Icon>
            <Label>Business Status</Label>
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
