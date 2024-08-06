import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import bgImage from '../images/bg.jpg';

const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7); // This creates the 50% opacity effect over the image
  height: 100vh;
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Dashboard = styled.div`
  background: url('your-background-image-url.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  padding: 20px 40px;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.color};
  width: 100%; // Ensure button fills link area
`;

function LeadMenu() {
  return (
    <DashboardContainer>
      <Dashboard>
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
