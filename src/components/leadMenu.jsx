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
//   height: 100vh;
//   display: flex;
//   padding-top: 80px;
//   flex-direction: column;
//   @media (max-width: 768px) {
//     height: auto;
//   }
// `;

// const Dashboard = styled.div`
//   background: url('your-background-image-url.jpg') no-repeat center center;
//   background-size: cover;
//   color: white;
//   height: 20vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 20px;
// `;

// const Logo = styled.div`
//   font-size: 2rem;
// `;

// const Buttons = styled.div`
//   display: flex;
//   gap: 20px;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
// `;

// const Button = styled.button`
//   padding: 20px 40px;
//   border: none;
//   color: white;
//   font-size: 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: ${props => props.color};
//   width: 100%; // Ensure button fills link area
// `;

// function LeadMenu() {
//   return (
//     <DashboardContainer>
//       <Dashboard>
//         <Header>
//           <h1>Business Status Menu</h1>
//           <Logo></Logo>
//         </Header>
//         <Buttons>
//           <StyledLink to="/CRMTable">
//             <Button color="#8a2be2">Leads</Button>
//           </StyledLink>
//           <StyledLink to="/SchedulePage">
//             <Button color="#008080">Schedules</Button>
//           </StyledLink>
//           {/* <StyledLink to="/BusinessVolume">
//             <Button color="#0000ff"></Button>
//           </StyledLink> */}
//         </Buttons>
//       </Dashboard>
//     </DashboardContainer>
//   );
// }

// export default LeadMenu;


import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import bgImage from '../images/bg.jpg';

const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); // This creates the 50% opacity effect over the image
  min-height: 100vh; // Ensure it covers the whole viewport height
  display: flex;
  padding-top: 135px;
  flex-direction: column;

  @media (max-width: 768px) {
    min-height: 100vh; // Ensure full height on mobile as well
    padding-top: 60px;
  }
`;

const Dashboard = styled.div`
  color: white;
  flex-grow: 1; // Allow the dashboard to take up remaining space
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 1px;
  color: white;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Logo = styled.div`
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 200px; // Set a fixed width for each button
  margin: 0 auto; // This centers the buttons if they're in a flex container

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
  width: 100%; // Ensure button fills link area
  height: 60px; // Set a fixed height for all buttons

  @media (max-width: 768px) {
    padding: 15px 0;
    font-size: 14px;
    height: auto; // Adjust height for smaller screens
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 135px;
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
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



function LeadMenu() {

  const navigate = useNavigate(); 

  return (
    <DashboardContainer>
      <Dashboard>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Header>
          <h1>Business Status Menu</h1>
          <Logo></Logo>
        </Header>
        <Buttons>
          <StyledLink to="/CRMTable">
            <Button color="#8a2be2">Leads</Button>
          </StyledLink>
          <StyledLink to="/SchedulePage">
            <Button color="#008080">Schedules</Button>
          </StyledLink>
          {/* <StyledLink to="/BusinessVolume">
            <Button color="#0000ff"></Button>
          </StyledLink> */}
        </Buttons>
      </Dashboard>
    </DashboardContainer>
  );
}

export default LeadMenu;
