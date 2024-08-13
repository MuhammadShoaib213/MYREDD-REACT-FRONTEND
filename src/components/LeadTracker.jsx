import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {jwtDecode} from 'jwt-decode';
import bgImage from '../images/bg.jpg';
import { useNavigate } from 'react-router-dom';

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

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionHeader = styled.h2`
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

const LeadList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LeadItem = styled.li`
  background-color: #fafafa;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const LeadDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
    color: #2c3e50;
  }
`;

const LeadDate = styled.small`
  color: #999;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  background-color: #f9d6d5;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
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
          const sharedResponse = await axios.get(`/shared-leads/shared?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setSharedLeads(sharedResponse.data);
          console.log(sharedResponse.data);

          // Fetch received leads
          const receivedResponse = await axios.get(`/shared-leads/received?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setReceivedLeads(receivedResponse.data);
          console.log(receivedResponse.data);

        } catch (error) {
        //   console.error('Error fetching leads:', error);
        //   setError('Failed to fetch leads. Please try again later.');
        }
      }
    };

    fetchLeads();
  }, []);

  const handleRowClick = (id) => {
    console.log('Navigating to LeadDetailPage with ID:', id); // Log to verify the ID before navigation
    navigate(`/LeadDetailPage/${id}`);
};

  return (
    <FullScreenContainer>
    <PageWrapper>
      <Container>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Section>
          <SectionHeader>Leads You Shared</SectionHeader>
          {sharedLeads.length > 0 ? (
            <LeadList>
              {sharedLeads.map(lead => (
                <LeadItem key={lead._id} onClick={() => handleRowClick(lead.leadId)}>
                  <LeadDetails>
                    <span>{lead.title}</span>
                    <LeadDate>{new Date(lead.sharedDate).toLocaleDateString()}</LeadDate>
                  </LeadDetails>
                  <p>Shared with: {lead.sharedWithNames.join(', ')}</p>
                </LeadItem>
              ))}
            </LeadList>
          ) : (
            <p>You haven't shared any leads yet.</p>
          )}
        </Section>

        <Section>
          <SectionHeader>Leads You Received</SectionHeader>
          {receivedLeads.length > 0 ? (
            <LeadList>
              {receivedLeads.map(lead => (
                <LeadItem key={lead._id}>
                  <LeadDetails>
                    <span>{lead.title}</span>
                    <LeadDate>{new Date(lead.receivedDate).toLocaleDateString()}</LeadDate>
                  </LeadDetails>
                  <p>Received from: {lead.sharedByName}</p>
                </LeadItem>
              ))}
            </LeadList>
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
