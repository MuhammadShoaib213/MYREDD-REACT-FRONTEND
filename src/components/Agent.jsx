import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AgentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5; // Light background for better contrast
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  background-color: red; // Primary button color
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred; // Darker red on hover
  }
`;

const Agent = () => {
  return (
    <AgentContainer>
      <Title>Agent Management</Title>
      <Button to="/AgencyAgentSignup">Add Agent</Button>
      <Button to="/AgentList">View Agents</Button>
    </AgentContainer>
  );
};

export default Agent;
