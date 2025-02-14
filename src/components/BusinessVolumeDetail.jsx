import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';

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
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TableContainer = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
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

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const CategoryBlock = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InquiryHeader = styled.h2`
  background-color: ${props => props.color};
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

// ----------------------
// Helper Functions
// ----------------------

// Normalize a string: lowercase and remove spaces.
const normalize = (str) => str.toLowerCase().replace(/\s/g, '');

// Aggregates business volume data from rawData for a given inquiryType.
// Assumes that item.inquiryType, item.propertyType, and item.propertySubType are strings.
const aggregateData = (rawData, inquiryType) => {
  // Define the expected structure with display names.
  const structure = {
    Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse'],
    Commercial: ['Office', 'Shop', 'Warehouse', 'Factory'],
    Land: ['Others']
  };

  let results = {};
  Object.keys(structure).forEach(type => {
    results[type] = {};
    structure[type].forEach(subtype => {
      results[type][subtype] = { qty: 0, commission: 0, profit: 0 };
    });
  });

  rawData.forEach(item => {
    if (
      item.inquiryType &&
      inquiryType &&
      item.inquiryType.toLowerCase() === inquiryType.toLowerCase() &&
      item.propertyType &&
      item.propertySubType
    ) {
      Object.keys(structure).forEach(type => {
        if (item.propertyType.toLowerCase() === type.toLowerCase()) {
          structure[type].forEach(subtype => {
            if (item.propertySubType.toLowerCase() === subtype.toLowerCase()) {
              // Only count if the property is sold.
              const count = (item.status && item.status.toLowerCase() === "sold") ? 1 : 0;
              results[type][subtype].qty += count;
              if (count) {
                const payment = Number(item.advancePayment) || 0;
                results[type][subtype].commission += payment;
                results[type][subtype].profit += payment * 0.1;
              }
            }
          });
        }
      });
    }
  });

  return results;
};

const renderGraphData = (subtypes) => {
  return Object.keys(subtypes).map(subtype => ({
    name: subtype,
    QTY: subtypes[subtype].qty,
    Commission: subtypes[subtype].commission,
    Profit: subtypes[subtype].profit
  }));
};

const computeSummary = (data) => {
  let totalQty = 0, totalCommission = 0, totalProfit = 0;
  Object.values(data).forEach(subtypes => {
    Object.values(subtypes).forEach(counts => {
      totalQty += counts.qty;
      totalCommission += counts.commission;
      totalProfit += counts.profit;
    });
  });
  return { totalQty, totalCommission, totalProfit };
};

const getColor = (type) => {
  const normalizedType = normalize(type);
  switch (normalizedType) {
    case 'forsale':
      return '#007bff';
    case 'forpurchase':
      return '#6f42c1';
    case 'onrent':
      return '#28a745';
    case 'forrent':
      return '#dc3545';
    default:
      return '#6c757d';
  }
};

// ----------------------
// Main Component: BusinessVolumeDetail
// ----------------------

function BusinessVolumeDetail() {
  const [data, setData] = useState({});
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  const [summary, setSummary] = useState({ totalQty: 0, totalCommission: 0, totalProfit: 0 });
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
        setData(aggregated);
        setSummary(computeSummary(aggregated));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, inquiryType]);

  const toggleChartType = () => {
    setChartType(prevType => (prevType === 'bar' ? 'pie' : 'bar'));
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Business Volume Detail for {inquiryType}</Header>
      
      {/* Summary Metrics */}
      <SummaryContainer>
        <div><strong>Total QTY:</strong> {summary.totalQty}</div>
        <div><strong>Total Commission:</strong> $ {summary.totalCommission.toFixed(2)}</div>
        <div><strong>Total Profit:</strong> $ {summary.totalProfit.toFixed(2)}</div>
      </SummaryContainer>
      
      {/* Chart Toggle Button */}
      <ChartToggleButton onClick={toggleChartType}>
        Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
      </ChartToggleButton>
      
      {Object.entries(data).map(([type, subtypes]) => (
        <ContentContainer key={type}>
          <TableContainer>
            <TableTitle>{type}</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>QTY</Th>
                  <Th>Commission</Th>
                  <Th>Profit</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subtypes).map(([subtype, values]) => (
                  <SubtypeRow key={subtype}>
                    <Td>{subtype}</Td>
                    <Td>{values.qty}</Td>
                    <Td>PKR {values.commission.toFixed(2)}</Td>
                    <Td>PKR {values.profit.toFixed(2)}</Td>
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
                <Bar dataKey="QTY" fill="#8884d8" />
                <Bar dataKey="Commission" fill="#82ca9d" />
                <Bar dataKey="Profit" fill="#ffc658" />
              </BarChart>
            ) : (
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={renderGraphData(subtypes)}
                  dataKey="QTY" // You can change this to Commission or Profit as needed.
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
        </ContentContainer>
      ))}
    </PageContainer>
  );
}

export default BusinessVolumeDetail;
