import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement

const Container = styled.div`
  padding: 20px;
  background: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const AgentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const AgentItem = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AgentInfo = styled.div`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: red; // Primary button color
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: darkred; // Darker red on hover
  }
`;

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decoded = jwtDecode(token);
    const agencyId = decoded.userId;  // Assuming 'userId' is being used as 'agencyId'

    try {
      const response = await axios.get(`api/auth/agents/${agencyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(response.data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  };

  const deleteAgent = async (agentId) => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const agencyId = decoded.userId;

    try {
      await axios.delete(`api/auth/agents/${agencyId}/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAgents();  // Refresh the list after deleting
    } catch (error) {
      console.error('Failed to delete agent:', error);
    }
  };

  const updateAgent = async (agentId) => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const agencyId = decoded.userId;

    const agent = agents.find(a => a._id === agentId);
    const updatedName = prompt('Update the agent name:', agent.firstName);
    if (!updatedName) return;  // Do nothing if no name is entered

    try {
      await axios.put(`api/auth/agents/${agencyId}/${agentId}`, { firstName: updatedName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAgents();  // Refresh the list after updating
    } catch (error) {
      console.error('Failed to update agent:', error);
    }
  };

  return (
    <Container>
      <Title>Agent Management</Title>
      <AgentGrid>
        {agents.map(agent => (
          <AgentItem key={agent._id}>
            <AgentInfo>
              <div><strong>Name:</strong> {agent.firstName} {agent.lastName}</div>
              <div><strong>Email:</strong> {agent.email}</div>
            </AgentInfo>
            <ButtonContainer>
              <Button onClick={() => updateAgent(agent._id)}>Update</Button>
              <Button onClick={() => deleteAgent(agent._id)} >Delete</Button>
            </ButtonContainer>
          </AgentItem>
        ))}
      </AgentGrid>
    </Container>
  );
};

export default AgentList;
