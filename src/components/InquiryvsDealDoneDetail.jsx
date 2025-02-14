import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
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
`;

const Header = styled.h1`
  margin-bottom: 20px;
  color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row; /* Default to row */
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack vertically on small screens */
    align-items: center;
  }
`;

const TableContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%; /* Full width on small screens */
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
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

// Aggregates data by property type and subtype, counting inquiries and deals.
// Assumes updated data structure: inquiryType, propertyType, and propertySubType are strings.
const aggregateData = (rawData, inquiryType) => {
  // Define the expected structure (display names)
  const structure = {
    Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse'],
    Commercial: ['Office', 'Shop', 'Warehouse', 'Factory'],
    Land: ['Others']
  };

  let results = {};
  // Initialize results for each property type and its subtypes.
  Object.keys(structure).forEach(type => {
    results[type] = {};
    structure[type].forEach(subtype => {
      results[type][subtype] = { inquiries: 0, sold: 0 };
    });
  });

  rawData.forEach(item => {
    // Compare inquiryType as strings (case-insensitive)
    if (
      item.inquiryType &&
      inquiryType &&
      item.inquiryType.toLowerCase() === inquiryType.toLowerCase()
    ) {
      // Check propertyType (string comparison)
      Object.keys(structure).forEach(type => {
        if (
          item.propertyType &&
          item.propertyType.toLowerCase() === type.toLowerCase()
        ) {
          structure[type].forEach(subtype => {
            // Check propertySubType (string comparison)
            if (
              item.propertySubType &&
              item.propertySubType.toLowerCase() === subtype.toLowerCase()
            ) {
              results[type][subtype].inquiries++;
              if (
                item.status &&
                item.status.toLowerCase() === "sold"
              ) {
                results[type][subtype].sold++;
              }
            }
          });
        }
      });
    }
  });

  return results;
};

// Computes overall totals across all types.
const computeSummary = (data) => {
  let totalInquiries = 0;
  let totalSold = 0;
  Object.values(data).forEach(subtypes => {
    Object.values(subtypes).forEach(counts => {
      totalInquiries += counts.inquiries;
      totalSold += counts.sold;
    });
  });
  return { totalInquiries, totalSold };
};

// Normalize inquiry type (remove spaces, lowercase) for header color.
const getColor = (type) => {
  const normalized = type.replace(/\s/g, '').toLowerCase();
  switch (normalized) {
    case 'forsale':
      return '#007bff'; // Blue
    case 'forpurchase':
      return '#6f42c1'; // Purple
    case 'onrent':
      return '#28a745'; // Green
    case 'forrent':
      return '#dc3545'; // Red
    default:
      return '#6c757d'; // Grey
  }
};

// Prepare data for the chart from the subtypes object.
const renderGraphData = (subtypes) => {
  return Object.keys(subtypes).map(subtype => ({
    name: subtype,
    Inquiries: subtypes[subtype].inquiries,
    Sold: subtypes[subtype].sold
  }));
};

// ----------------------
// Main Component: InquiryDealDetail
// ----------------------

function InquiryDealDetail() {
  const [aggregatedData, setAggregatedData] = useState({});
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  const [summary, setSummary] = useState({ totalInquiries: 0, totalSold: 0 });
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

  const toggleChartType = () => {
    setChartType(chartType === 'bar' ? 'pie' : 'bar');
  };

  const handleNavigate = (type) => {
    navigate('/InquiryDealDetail', { state: { inquiryType: type } });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Inquiry vs Deal Done for {inquiryType}</Header>
      
      {/* Summary Metrics */}
      <SummaryContainer>
        <div><strong>Total Inquiries:</strong> {summary.totalInquiries}</div>
        <div><strong>Total Deals:</strong> {summary.totalSold}</div>
      </SummaryContainer>
      
      {/* Chart Type Toggle */}
      <ChartToggleButton onClick={toggleChartType}>
        Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
      </ChartToggleButton>
      
      {Object.entries(aggregatedData).map(([type, subtypes]) => (
        <ContentContainer key={type}>
          <TableContainer>
            <TableTitle>{type}</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>Inquiries</Th>
                  <Th>Deals Done</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subtypes).map(([subtype, values]) => (
                  <SubtypeRow key={subtype}>
                    <Td>{subtype}</Td>
                    <Td>{values.inquiries}</Td>
                    <Td>{values.sold}</Td>
                  </SubtypeRow>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
          <ResponsiveContainer width="50%" height={300}>
            {chartType === 'bar' ? (
              <BarChart data={renderGraphData(subtypes)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Inquiries" fill="#8884d8" />
                <Bar dataKey="Sold" fill="#82ca9d" />
              </BarChart>
            ) : (
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={renderGraphData(subtypes)}
                  dataKey="Inquiries" // Example: using Inquiries as value
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  isAnimationActive={true}
                >
                  {renderGraphData(subtypes).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d'][index % 2]} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </ContentContainer>
      ))}
    </PageContainer>
  );
}

export default InquiryDealDetail;
