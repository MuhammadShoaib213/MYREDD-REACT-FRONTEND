// import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import bgImage from '../images/bg.jpg';

// const DashboardContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7); // This creates the 50% opacity effect over the image
//   min-height: 100vh;
//   padding-top: 80px;
//   display: flex;
//   flex-direction: column;
//   @media (max-width: 768px) {
//     height: auto;
//   }
// `;

// const Dashboard = styled.div`
//   background: url('your-background-image-url.jpg') no-repeat center center;
//   background-size: cover;
//   color: white;
//   min-height: 20vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   @media (max-width: 768px) {
//     padding: 10px;
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 20px;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const Logo = styled.div`
//   font-size: 2rem;
//   @media (max-width: 768px) {
//     font-size: 1.5rem;
//   }
// `;

// const Buttons = styled.div`
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   width: 100%;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 10px;
//   }
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   width: 200px; // Set a fixed width for each button
//   @media (max-width: 768px) {
//     width: 100%; // Make buttons full width on smaller screens
//   }
// `;

// const Button = styled.button`
//   padding: 20px;
//   border: none;
//   color: white;
//   font-size: 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: ${props => props.color};
//   width: 100%;
//   height: 60px; // Set a fixed height for all buttons
//   @media (max-width: 768px) {
//     padding: 15px 0;
//     font-size: 14px;
//     height: auto; // Adjust height for smaller screens
//   }
// `;

// function CRM() {
//   return (
//     <DashboardContainer>
//       <Dashboard>
//         <Header>
//           <h1>Dashboard</h1>
//           {/* <Logo>Logo</Logo> */}
//         </Header>
//         <Buttons>
//           <StyledLink to="/InquiriesStatus">
//             <Button color="#8a2be2">Inquiries Status</Button>
//           </StyledLink>
//           <StyledLink to="/InquiriesVsDoneDeal">
//             <Button color="#008080">Inquiry Vs Done Deal</Button>
//           </StyledLink>
//           <StyledLink to="/BusinessVolume">
//             <Button color="#0000ff">Business Volume</Button>
//           </StyledLink>
//         </Buttons>
//       </Dashboard>
//     </DashboardContainer>
//   );
// }

// export default CRM;


import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import bgImage from '../images/bg.jpg';

const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); // This creates the 50% opacity effect over the image
  min-height: 100vh;
  padding-top: 92px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Dashboard = styled.div`
  background: url('your-background-image-url.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background-color: #333; // Subtle dark background
  border: 2px solid #ff0000; // Border to match red theme
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px; // Adjusted padding for better appearance
  border-radius: 10px; // More rounded corners
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for depth
  width: 200px; // Match the width of other buttons
  height: 60px; // Match the height of other buttons
  transition: background-color 0.3s, transform 0.3s; // Smooth transition effects

  &:hover {
    background-color: #ff0000; // Match hover effect with the red theme
    transform: translateY(-2px); // Slight lift on hover
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 200px; // Set a fixed width for each button
  @media (max-width: 768px) {
    width: 100%; // Make buttons full width on smaller screens
  }
`;

const Button = styled.button`
  padding: 20px;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.color};
  width: 100%;
  height: 60px; // Set a fixed height for all buttons
  @media (max-width: 768px) {
    padding: 15px 0;
    font-size: 14px;
    height: auto; // Adjust height for smaller screens
  }
`;

function CRM() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <DashboardContainer>
      <Dashboard>
        <Header>
          <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
          <h1>Dashboard</h1>
        </Header>
        <Buttons>
          <StyledLink to="/InquiriesStatus">
            <Button color="#8a2be2">Inquiries Status</Button>
          </StyledLink>
          <StyledLink to="/InquiriesVsDoneDeal">
            <Button color="#008080">Inquiry Vs Done Deal</Button>
          </StyledLink>
          <StyledLink to="/BusinessVolume">
            <Button color="#0000ff">Business Volume</Button>
          </StyledLink>
        </Buttons>
      </Dashboard>
    </DashboardContainer>
  );
}

export default CRM;
