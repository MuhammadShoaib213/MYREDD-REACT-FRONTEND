import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import styled, { createGlobalStyle } from 'styled-components';
import bgImage from '../images/bg.jpg';
import { useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f4f4f4;
  }
`;

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.75);
  min-height: 100vh;
  padding: 20px;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #e74c3c; /* Red color for the table header */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
  &:hover {
    background-color: #e6f7ff;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  color: #fff;
  font-weight: 600;
`;

const TableDataCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #e74c3c;
    color: #ffffff;
  }
`;

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      try {
        const { userId } = jwtDecode(token);
        const response = await axios.get(` http://localhost:6003/api/schedules/user/all/${userId}`);
        setSchedules(response.data);
      } catch (err) {
        setError('Failed to fetch schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <ContentContainer>
          <p>Loading...</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentContainer>
          <p>Error: {error}</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (schedules.length === 0) {
    return (
      <PageContainer>
        <ContentContainer>
          <p>No schedules available at the moment.</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ContentContainer>
          <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
          <Header>Schedule</Header>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Customer Name</TableHeaderCell>
                <TableHeaderCell>Date &amp; Time</TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody>
              {schedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableDataCell>{schedule.scheduleType}</TableDataCell>
                  <TableDataCell>{schedule.customerName}</TableDataCell>
                  <TableDataCell>{new Date(schedule.date).toLocaleString()}</TableDataCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default SchedulePage;
