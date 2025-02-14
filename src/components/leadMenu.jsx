import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import bgImage from '../images/bg.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f4f4f4;
  }
`;

const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  padding-top: 135px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e74c3c;
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    left: 10px;
    width: 100%;
    text-align: center;
  }
`;

const Dashboard = styled.div`
  color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

// Simple fade-in animation for the cards
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  background-color: ${props => props.color || '#fff'};
  width: 250px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: white;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: white;
`;

const StyledCardLink = styled(Link)`
  text-decoration: none;
`;

function LeadMenu() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <DashboardContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Dashboard>
          <Header>
            <Title>Business Status Menu</Title>
          </Header>
          <CardContainer>
            <StyledCardLink to="/CRMTable">
              <Card color="#8a2be2">
                <CardIcon>
                  <FaUserAlt />
                </CardIcon>
                <CardTitle>Leads</CardTitle>
              </Card>
            </StyledCardLink>
            <StyledCardLink to="/SchedulePage">
              <Card color="#008080">
                <CardIcon>
                  <FaCalendarAlt />
                </CardIcon>
                <CardTitle>Schedules</CardTitle>
              </Card>
            </StyledCardLink>
            {/* Uncomment or adjust the third card as needed */}
            <StyledCardLink to="/BusinessVolume">
              <Card color="#e74c3c">
                <CardIcon>
                  <FaChartLine />
                </CardIcon>
                <CardTitle>Business Volume</CardTitle>
              </Card>
            </StyledCardLink>
          </CardContainer>
        </Dashboard>
      </DashboardContainer>
    </>
  );
}

export default LeadMenu;
