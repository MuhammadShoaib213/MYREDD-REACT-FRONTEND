import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import bgImage from '../images/bg.jpg';
import ShareLeadModal from './ShareLeadModal';
import { FaShareAlt } from 'react-icons/fa';

// Define a theme to centralize colors and fonts.
const theme = {
  colors: {
    primary: '#e74c3c',
    secondary: '#ff4500',
    accent: '#28a745',
    background: '#ffffff',
    headerBg: 'red',
    overlay: 'rgba(0, 0, 0, 0.7)',
    tableRowHover: '#f1f1f1',
    zebraEven: '#f9f9f9',
  },
  fonts: {
    main: "'Roboto', sans-serif",
  },
};

// Updated helper function to format the budget field.
// It checks if budget has nonzero min or max values. If not, it falls back to demand.
const formatBudget = (budget, demand) => {
  if (budget && typeof budget === 'object') {
    const { min, max } = budget;
    // Check if either min or max is defined and nonzero.
    if ((min !== undefined && min !== null && min !== 0) ||
        (max !== undefined && max !== null && max !== 0)) {
      if (min && max && min !== 0 && max !== 0) {
        return `${Number(min).toLocaleString()} - ${Number(max).toLocaleString()}`;
      } else if (min !== 0) {
        return Number(min).toLocaleString();
      } else if (max !== 0) {
        return Number(max).toLocaleString();
      }
    }
  }
  // If no valid budget value, check demand.
  if (demand !== undefined && demand !== null && demand !== 0) {
    return Number(demand).toLocaleString();
  }
  return 'N/A';
};

// Helper function to format the commission field.
// If type is 'percentage', append a '%' sign; otherwise, return the value.
const formatCommission = (commission) => {
  if (!commission) return '';
  if (typeof commission === 'object') {
    const { type, value } = commission;
    return type === 'percentage' ? `${value}%` : value;
  }
  return commission;
};

// ----------------------
// Styled Components
// ----------------------
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: ${(props) => props.theme.colors.overlay};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 135px;
  overflow: auto;
`;

const Container = styled.div`
  font-family: ${(props) => props.theme.fonts.main};
  background-color: ${(props) => props.theme.colors.background};
  color: #333;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 1200px;
  margin-top: 20px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: 1px solid #ddd;
  padding: 12px 15px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px 15px;
`;

const TableRow = styled.tr`
  background-color: ${(props) =>
    props.index % 2 === 0 ? props.theme.colors.zebraEven : 'white'};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.tableRowHover};
    cursor: pointer;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
  background-color: #ffffff;
  border: 2px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: #ffffff;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    left: 10px;
    width: auto;
    text-align: center;
  }
`;

const ShareButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #e03e00;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px ${(props) => props.theme.colors.secondary};
  }
  &:active {
    background-color: #c63600;
  }
`;

const LeadTrackerButton = styled.button`
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #218838;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px ${(props) => props.theme.colors.accent};
  }
  &:active {
    background-color: #1e7e34;
  }
`;

const LeadCard = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;

// Custom Hook to detect mobile screens
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

// ----------------------
// Main Component: CRMTable
// ----------------------
const CRMTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const decoded = jwtDecode(token);
        if (!decoded.userId) {
          setError('Invalid token. Please log in again.');
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `/api/properties/lead/user/${decoded.userId}`
        );
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/LeadDetailPage/${id}`);
  };

  const handleShareClick = (id, e) => {
    e.stopPropagation();
    setSelectedLead(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLead(null);
  };

  const navigateToLeadTracker = () => {
    navigate('/LeadTracker');
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <PageContainer>
          <LoadingMessage>Loading...</LoadingMessage>
        </PageContainer>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <PageContainer>
          <Container>
            <ErrorMessage>{error}</ErrorMessage>
          </Container>
        </PageContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Container>
          <h2>Leads</h2>
          <LeadTrackerButton onClick={navigateToLeadTracker}>
            View Shared/Received Leads
          </LeadTrackerButton>
          {isMobile ? (
            // Mobile view: Card layout
            data.map((item, index) => {
              const propertySubType =
                typeof item.propertySubType === 'string'
                  ? item.propertySubType
                  : (Object.keys(item.propertySubType).find(
                      (key) => item.propertySubType[key]
                    ) || '');
              const dateInFormatted = new Date(item.dateAdded).toLocaleDateString('en-US');
              const priority = item.priority || '';
              const budgetValue = formatBudget(item.budget, item.demand);
              return (
                <LeadCard key={index} onClick={() => handleRowClick(item._id)}>
                  <p>
                    <strong>#:</strong> {index + 1}
                  </p>
                  <p>
                    <strong>Date In:</strong> {dateInFormatted}
                  </p>
                  <p>
                    <strong>Customer:</strong> {item.customerName || 'Unknown'}
                  </p>
                  <p>
                    <strong>Inquiry Type:</strong> {item.inquiryType || ''}
                  </p>
                  <p>
                    <strong>Category:</strong>{' '}
                    {typeof item.propertyType === 'string'
                      ? item.propertyType
                      : (Object.keys(item.propertyType).find(
                          (key) => item.propertyType[key]
                        ) || '')}
                  </p>
                  <p>
                    <strong>Property Sub Type:</strong> {propertySubType}
                  </p>
                  <p>
                    <strong>Priority:</strong> {priority}
                  </p>
                  <p>
                    <strong>Budget:</strong> {budgetValue}
                  </p>
                  <p>
                    <strong>Commission:</strong> {formatCommission(item.commission)}
                  </p>
                  <ShareButton onClick={(e) => handleShareClick(item._id, e)}>
                    <FaShareAlt style={{ marginRight: '8px' }} /> Share
                  </ShareButton>
                </LeadCard>
              );
            })
          ) : (
            // Desktop view: Table layout
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>#</Th>
                    <Th>Date In</Th>
                    <Th>Customer</Th>
                    <Th>Inquiry Type</Th>
                    <Th>Category</Th>
                    <Th>Property Sub Type</Th>
                    <Th>Priority</Th>
                    <Th>Budget</Th>
                    <Th>Commission</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const propertySubType =
                      typeof item.propertySubType === 'string'
                        ? item.propertySubType
                        : (Object.keys(item.propertySubType).find(
                            (key) => item.propertySubType[key]
                          ) || '');
                    const dateInFormatted = new Date(item.dateAdded).toLocaleDateString('en-US');
                    const priority = item.priority || '';
                    const budgetValue = formatBudget(item.budget, item.demand);
                    return (
                      <TableRow
                        key={index}
                        index={index}
                        onClick={() => handleRowClick(item._id)}
                      >
                        <Td>{index + 1}</Td>
                        <Td>{dateInFormatted}</Td>
                        <Td>{item.customerName || 'Unknown'}</Td>
                        <Td>{item.inquiryType || ''}</Td>
                        <Td>
                          {typeof item.propertyType === 'string'
                            ? item.propertyType
                            : (Object.keys(item.propertyType).find(
                                (key) => item.propertyType[key]
                              ) || '')}
                        </Td>
                        <Td>{propertySubType}</Td>
                        <Td>{priority}</Td>
                        <Td>{budgetValue}</Td>
                        <Td>{formatCommission(item.commission)}</Td>
                        <Td>
                          <ShareButton onClick={(e) => handleShareClick(item._id, e)}>
                            <FaShareAlt style={{ marginRight: '8px' }} /> Share
                          </ShareButton>
                        </Td>
                      </TableRow>
                    );
                  })}
                </tbody>
              </Table>
            </TableWrapper>
          )}
        </Container>
        <ShareLeadModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          leadId={selectedLead}
        />
      </PageContainer>
    </ThemeProvider>
  );
};

export default CRMTable;
