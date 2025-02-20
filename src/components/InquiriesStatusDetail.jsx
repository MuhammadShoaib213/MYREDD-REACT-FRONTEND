import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

// ----------------------
// Styled Components
// ----------------------

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  padding: 20px;
  padding-top: 135px;
  overflow: auto;
  text-align: center;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TableContainer = styled.div`
  width: 50%;
  height: 370px;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ChartContainer = styled.div`
  width: 50%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  margin: auto;
  text-align: center;
`;

const TableTitle = styled.h2`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
`;

const Th = styled.th`
  background-color: #f3f3f3;
  color: #333;
  padding: 12px 15px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const SubtypeRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff;
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

const ChartToggleButton = styled.button`
  margin: 10px 0;
  padding: 8px 16px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const SummaryContainer = styled.div`
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`;

// ----------------------
// Helper Functions
// ----------------------

const aggregateData = (data, inquiryType) => {
  const structure = {
    Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse', 'Others'],
    Commercial: ['Office', 'Shop', 'Warehouse', 'Factory', 'Others'],
    Land: ['Others']
  };

  let results = {};
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  Object.keys(structure).forEach(type => {
    results[type] = {};
    structure[type].forEach(subtype => {
      results[type][subtype] = { thisMonth: 0, thisYear: 0, lastYear: 0 };
    });
  });

  data.forEach(item => {
    if (
      item.inquiryType &&
      inquiryType &&
      item.inquiryType.toLowerCase() === inquiryType.toLowerCase()
    ) {
      Object.keys(structure).forEach(type => {
        if (
          item.propertyType &&
          item.propertyType.toLowerCase() === type.toLowerCase()
        ) {
          structure[type].forEach(subtype => {
            if (
              item.propertySubType &&
              item.propertySubType.toLowerCase() === subtype.toLowerCase()
            ) {
              const itemDate = new Date(item.dateAdded);
                                  const itemMonth = itemDate.getMonth();
              const itemYear = itemDate.getFullYear();
              if (itemYear === currentYear) {
                if (itemMonth === currentMonth) {
                  results[type][subtype].thisMonth++;
                }
                results[type][subtype].thisYear++;
              }
              if (itemYear === currentYear - 1) {
                results[type][subtype].lastYear++;
              }
            }
          });
        }
      });
    }
  });
  return results;
};

const getColor = (type) => {
  const normalized = type.replace(/\s/g, '').toLowerCase();
  switch (normalized) {
    case 'forsale':
      return '#007bff';
    case 'forpurchase':
      return '#6f42c1';
    case 'forrent':
      return '#28a745';
    case 'onrent':
      return '#dc3545';
    default:
      return '#6c757d';
  }
};

const renderGraphData = (subtypes) => {
  return Object.keys(subtypes).map(subtype => ({
    name: subtype,
    thisMonth: subtypes[subtype].thisMonth,
    thisYear: subtypes[subtype].thisYear,
    lastYear: subtypes[subtype].lastYear
  }));
};

const computeSummary = (data) => {
  let totalThisMonth = 0,
    totalThisYear = 0,
    totalLastYear = 0;
  Object.values(data).forEach(subtypes => {
    Object.values(subtypes).forEach(counts => {
      totalThisMonth += counts.thisMonth;
      totalThisYear += counts.thisYear;
      totalLastYear += counts.lastYear;
    });
  });
  return { totalThisMonth, totalThisYear, totalLastYear };
};

// ----------------------
// Main Component: InquiriesStatus
// ----------------------

function InquiriesStatus() {
  const [aggregatedData, setAggregatedData] = useState({});
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  const [summary, setSummary] = useState({ totalThisMonth: 0, totalThisYear: 0, totalLastYear: 0 });
  const token = localStorage.getItem('token');
  const location = useLocation();
  const inquiryType = location.state?.inquiryType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://195.179.231.102:6003/api/properties/user/${decoded.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const aggregated = aggregateData(response.data, inquiryType);
        setAggregatedData(aggregated);
        setSummary(computeSummary(aggregated));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, inquiryType]);

  const handleNavigate = (type) => {
    navigate('/InquiriesStatusDetail', { state: { inquiryType: type } });
  };

  const toggleChartType = () => {
    setChartType(chartType === 'bar' ? 'pie' : 'bar');
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Inquiries Status - {inquiryType}</Header>
      
      {/* Summary Metrics */}
      <SummaryContainer>
        <div>
          <strong>This Month:</strong> {summary.totalThisMonth}
        </div>
        <div>
          <strong>This Year:</strong> {summary.totalThisYear}
        </div>
        <div>
          <strong>Last Year:</strong> {summary.totalLastYear}
        </div>
      </SummaryContainer>
      
      {/* Toggle Chart Type Button */}
      <ChartToggleButton onClick={toggleChartType}>
        Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
      </ChartToggleButton>

      {/* For each property type, display table and chart */}
      {Object.entries(aggregatedData).map(([type, subtypes]) => (
        <ContentContainer key={type}>
          <TableContainer>
            <TableTitle>{type}</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>This Month</Th>
                  <Th>This Year</Th>
                  <Th>Last Year</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subtypes).map(([subtype, values]) => (
                  <SubtypeRow key={subtype}>
                    <Td>{subtype}</Td>
                    <Td>{values.thisMonth}</Td>
                    <Td>{values.thisYear}</Td>
                    <Td>{values.lastYear}</Td>
                  </SubtypeRow>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={renderGraphData(subtypes)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="thisMonth" fill="#8884d8" />
                  <Bar dataKey="thisYear" fill="#82ca9d" />
                  <Bar dataKey="lastYear" fill="#ffc658" />
                </BarChart>
              ) : (
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={renderGraphData(subtypes)}
                    dataKey="thisYear"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    isAnimationActive={true}
                  >
                    {renderGraphData(subtypes).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </ContentContainer>
      ))}
    </PageContainer>
  );
}

export default InquiriesStatus;
