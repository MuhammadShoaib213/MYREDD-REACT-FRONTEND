import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {jwtDecode} from 'jwt-decode';
import bgImage from '../images/bg.jpg';
import { useNavigate } from 'react-router-dom';

// Full screen background and container styling
const FullScreenContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Main white container for content
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

// Section container
const Section = styled.div`
  margin-bottom: 40px;
`;

// Section header styling
const SectionHeader = styled.h2`
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

// Error message styling
const ErrorMessage = styled.p`
  color: #e74c3c;
  background-color: #f9d6d5;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

// Table container for responsive behavior and shadow
const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

// Styled table elements
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #3498db;
  color: #fff;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const LeadTracker = () => {
  const [sharedLeads, setSharedLeads] = useState([]);
  const [receivedLeads, setReceivedLeads] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        try {
          // Fetch shared leads
          const sharedResponse = await axios.get(`api/shared-leads/shared?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setSharedLeads(sharedResponse.data);
          console.log('Shared Leads:', sharedResponse.data);

          // Fetch received leads
          const receivedResponse = await axios.get(`api/shared-leads/received?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setReceivedLeads(receivedResponse.data);
          console.log('Received Leads:', receivedResponse.data);
        } catch (error) {
          console.error('Error fetching leads:', error);
          setError('No received leads available. Please try again later.');
        }
      }
    };

    fetchLeads();
  }, []);

  const handleRowClick = (id) => {
    console.log('Navigating to LeadDetailPage with ID:', id);
    navigate(`/LeadDetailPage/${id}`);
  };

  return (
    <FullScreenContainer>
      <PageWrapper>
        <Container>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* Shared Leads Section */}
          <Section>
            <SectionHeader>Leads You Shared</SectionHeader>
            {sharedLeads.length > 0 ? (
              <TableContainer>
                <StyledTable>
                  <thead>
                    <tr>
                      <TableHeader>Title</TableHeader>
                      <TableHeader>Shared Date</TableHeader>
                      <TableHeader>Shared With</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {sharedLeads.map(lead => (
                      <TableRow key={lead._id} onClick={() => handleRowClick(lead.leadId)}>
                        <TableData>{lead.title}</TableData>
                        <TableData>{new Date(lead.sharedDate).toLocaleDateString()}</TableData>
                        <TableData>{lead.sharedWithNames.join(', ')}</TableData>
                      </TableRow>
                    ))}
                  </tbody>
                </StyledTable>
              </TableContainer>
            ) : (
              <p>You haven't shared any leads yet.</p>
            )}
          </Section>

          {/* Received Leads Section */}
          <Section>
            <SectionHeader>Leads You Received</SectionHeader>
            {receivedLeads.length > 0 ? (
              <TableContainer>
                <StyledTable>
                  <thead>
                    <tr>
                      <TableHeader>Title</TableHeader>
                      <TableHeader>Received Date</TableHeader>
                      <TableHeader>Received From</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {receivedLeads.map(lead => (
                      <TableRow key={lead._id} onClick={() => handleRowClick(lead.leadId)}>
                        <TableData>{lead.title}</TableData>
                        <TableData>{new Date(lead.receivedDate).toLocaleDateString()}</TableData>
                        <TableData>{lead.sharedByName}</TableData>
                      </TableRow>
                    ))}
                  </tbody>
                </StyledTable>
              </TableContainer>
            ) : (
              <p>You haven't received any leads yet.</p>
            )}
          </Section>
        </Container>
      </PageWrapper>
    </FullScreenContainer>
  );
};

export default LeadTracker;
