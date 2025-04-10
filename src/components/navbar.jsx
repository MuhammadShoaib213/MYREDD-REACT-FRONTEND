import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '../images/logo.png';
import FormModal from '../components/FormModal';
import LoginForm from '../pages/login.js';
import SignupPage from '../pages/SignupPage.js';
import NotificationBell from './Notification.jsx';

// const Nav = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 5%;
//   background: white;
//   z-index: 1000;
//   position: relative;

//   @media (max-width: 768px) {
//     justify-content: space-around;
//   }
// `;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  z-index: 1000;
  position: fixed; /* Updated from relative to fixed */
  top: 0;           /* Ensures the navbar stays at the top */
  left: 0;          /* Stretch the navbar across the full width */
  right: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional: adds shadow for better visibility */

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;


const Logo = styled.img`
  height: 3.5rem;
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    align-items: center;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    padding: 20px 0;
    transition: all 0.3s ease;
  }
`;

// const MenuItem = styled.a`
//   color: black;
//   text-decoration: none;
//   cursor: pointer;
//   &:hover {
//     color: red;
//   }
// `;

const MenuItem = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const StyledLink = styled(ScrollLink)`
  color: black;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    font-size: 2rem;
  }
`;

const AuthButton = styled(MenuItem)`
  @media (max-width: 768px) {
    display: block;
    padding: 10px 0;
  }
`;

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignupOpen, setIsSignupOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   return (
//     <Nav>
//       <Logo src={logoImage} alt="Logo" />
//       <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         {isMenuOpen ? <FaTimes /> : <FaBars />}
//       </MenuIcon>
//       <Menu isOpen={isMenuOpen}>
//         <MenuItem href="/">Home</MenuItem>
//         {isLoggedIn && <MenuItem as={Link} to="/dashboard">Dashboard</MenuItem>}
//         <StyledLink to="AboutUs" smooth={true} duration={500}>About</StyledLink>
//         <StyledLink to="Tab" smooth={true} duration={500}>Features</StyledLink>
//         <StyledLink to="ContactUs" smooth={true} duration={500}>Contact Us</StyledLink>
//       </Menu>
//       {isLoggedIn ? (
//         <AuthButton onClick={handleLogout}>Logout</AuthButton>
//       ) : (
//         <AuthButton onClick={() => setIsLoginOpen(true)}>Login</AuthButton>
//       )}

//       <FormModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)}>
//         <LoginForm onLoginSuccess={() => {
//           setIsLoginOpen(false);
//           setIsLoggedIn(true);
//         }} onClose={() => setIsLoginOpen(false)} /> {/* Pass onClose prop */}
//       </FormModal>
//       <FormModal isOpen={isSignupOpen} onRequestClose={() => setIsSignupOpen(false)}>
//         <SignupPage />
//       </FormModal>
//     </Nav>
//   );
// };

// export default Navbar;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Nav>
      <Logo src={logoImage} alt="Logo" />
      <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MenuIcon>
      <Menu isOpen={isMenuOpen}>
        <MenuItem href="/" onClick={closeMenu}>Home</MenuItem>
        {isLoggedIn && <MenuItem as={Link} to="/dashboard" onClick={closeMenu}>Dashboard</MenuItem>}
        <StyledLink to="AboutUs" smooth={true} duration={500} onClick={closeMenu}>About</StyledLink>
        <StyledLink to="Tab" smooth={true} duration={500} onClick={closeMenu}>Features</StyledLink>
        <StyledLink to="ContactUs" smooth={true} duration={500} onClick={closeMenu}>Contact Us</StyledLink>
        <NotificationBell />
      </Menu>
      {isLoggedIn ? (
        <AuthButton onClick={handleLogout}>Logout</AuthButton>
      ) : (
        <AuthButton onClick={() => { setIsLoginOpen(true); closeMenu(); }}>Login</AuthButton>
      )}

      <FormModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)}>
        <LoginForm onLoginSuccess={() => {
          setIsLoginOpen(false);
          setIsLoggedIn(true);
        }} onClose={() => setIsLoginOpen(false)} />
      </FormModal>
      <FormModal isOpen={isSignupOpen} onRequestClose={() => setIsSignupOpen(false)}>
        <SignupPage />
      </FormModal>
    </Nav>
  );
};

export default Navbar;

