// BusinessVolumeDetail.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// If you installed the jwt-decode package, typically import like this:
import {jwtDecode} from 'jwt-decode';

import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
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
  align-items: start;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TableContainer = styled.div`
  width: 50%;
  max-height: 370px;
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
  margin: 0;
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
    position: static;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
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
  display: flex;
  justify-content: center;
  gap: 30px;

  div {
    margin: 0 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// ----------------------
// Helper / Aggregation Functions
// ----------------------

// Normalize string: lowercases and removes spaces
const normalize = (str) => (str || "").toLowerCase().replace(/\s/g, "");

/**
 * Break down profit by propertyType -> propertySubType -> { allTime, thisYear, thisMonth }
 * We only count items where:
 *   1) status === 'sold' (case-insensitive)
 *   2) inquiryType matches the targetInquiryType (after normalization)
 * 
 * Profit logic:
 *   - base = demand (if present) else budget.max
 *   - If both commission & addedValue are type "value", profit = sum of those values
 *   - If both are type "percentage", profit = base * (sum of those percentages) / 100
 */
const aggregateDataBySubType = (data, targetInquiryType) => {
  // Adjust these sub-types to your actual ones
  const structure = {
    residential: ["home", "apartment", "villas", "farmhouse", "others"],
    commercial: ["office", "shop", "warehouse", "factory", "others"],
    land: ["agricultural", "plot", "industrial", "others"]
  };

  // Initialize results with zero
  let results = {};
  Object.keys(structure).forEach((propType) => {
    results[propType] = {};
    structure[propType].forEach((subType) => {
      results[propType][subType] = {
        allTime: 0,
        thisYear: 0,
        thisMonth: 0
      };
    });
  });

  // Get current year/month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Normalize the target inquiry type
  const normalizedTarget = normalize(targetInquiryType);

  data.forEach((item) => {
    // Must be sold
    if ((item.status || "").toLowerCase() !== "sold") return;

    // Must match inquiryType
    const itemInquiry = normalize(item.inquiryType);
    if (itemInquiry !== normalizedTarget) return;

    // Determine base
    let base = 0;
    if (item.demand) {
      base = Number(item.demand) || 0;
    } else if (item.budget?.max) {
      base = Number(item.budget.max) || 0;
    }

    // Compute profit
    let profit = 0;
    if (item.commission && item.addedValue) {
      const { type: commType, value: commVal } = item.commission;
      const { type: addType, value: addVal } = item.addedValue;

      if (commType === "value" && addType === "value") {
        profit = (Number(commVal) || 0) + (Number(addVal) || 0);
      } else if (commType === "percentage" && addType === "percentage") {
        const totalPct = (Number(commVal) || 0) + (Number(addVal) || 0);
        profit = base * (totalPct / 100);
      }
      // If you want to handle "mixed" type logic (one value, one percentage), add more conditions here.
    }

    // Identify property type & subType
    const pType = normalize(item.propertyType);
    const pSubType = normalize(item.propertySubType);

    // If the aggregator structure includes pType...
    if (results[pType]) {
      // Use the subType if it exists in the structure, otherwise fallback to "others"
      const subTypeArray = structure[pType];
      const chosenSubType = subTypeArray.includes(pSubType) ? pSubType : "others";

      // Sum up in allTime, thisYear, thisMonth
      const date = new Date(item.dateAdded);
      const year = date.getFullYear();
      const month = date.getMonth();

      results[pType][chosenSubType].allTime += profit;

      if (year === currentYear) {
        results[pType][chosenSubType].thisYear += profit;
        if (month === currentMonth) {
          results[pType][chosenSubType].thisMonth += profit;
        }
      }
    }
  });

  return results;
};

// Convert subtypes object -> array for Recharts
const renderGraphData = (subtypeObj) => {
  // e.g. subtypeObj = { home: {allTime, thisYear, thisMonth}, apartment: {...}, ... }
  return Object.keys(subtypeObj).map((subtype) => ({
    name: subtype,
    allTime: subtypeObj[subtype].allTime,
    thisYear: subtypeObj[subtype].thisYear,
    thisMonth: subtypeObj[subtype].thisMonth
  }));
};

// Summarize everything for the page's header
const computeSummary = (aggregatedData) => {
  let totalAllTime = 0,
    totalThisYear = 0,
    totalThisMonth = 0;

  Object.values(aggregatedData).forEach((subtypes) => {
    Object.values(subtypes).forEach(({ allTime, thisYear, thisMonth }) => {
      totalAllTime += allTime;
      totalThisYear += thisYear;
      totalThisMonth += thisMonth;
    });
  });

  return { totalAllTime, totalThisYear, totalThisMonth };
};

// Colors for the Pie Chart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f91", "#ffb347", "#a1cfff"];

// ----------------------
// Main Component
// ----------------------
function BusinessVolumeDetail() {
  const [aggregatedData, setAggregatedData] = useState({});
  const [chartType, setChartType] = useState('bar'); // bar or pie
  const [summary, setSummary] = useState({
    totalAllTime: 0,
    totalThisYear: 0,
    totalThisMonth: 0
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();

  // The inquiryType passed from the parent, e.g. "For Sale" or "For Rent"
  const inquiryType = location.state?.inquiryType || ''; 

  useEffect(() => {
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Error decoding token:", err);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user's properties from your API
        const response = await axios.get(
          `api/properties/user/${decoded.userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Aggregate data using the updated function
        const aggregated = aggregateDataBySubType(response.data, inquiryType);
        setAggregatedData(aggregated);

        // Compute overall summary
        const sums = computeSummary(aggregated);
        setSummary(sums);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token, inquiryType]);

  // Toggle bar/pie chart
  const toggleChartType = () => {
    setChartType(chartType === 'bar' ? 'pie' : 'bar');
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Header>Business Volume Detail - {inquiryType}</Header>
      
      {/* Summary of all propertyTypes combined */}
      <SummaryContainer>
        <div>
          <strong>All Time (PKR):</strong>{" "}
          {Math.round(summary.totalAllTime).toLocaleString()}
        </div>
        <div>
          <strong>This Year (PKR):</strong>{" "}
          {Math.round(summary.totalThisYear).toLocaleString()}
        </div>
        <div>
          <strong>This Month (PKR):</strong>{" "}
          {Math.round(summary.totalThisMonth).toLocaleString()}
        </div>
      </SummaryContainer>

      {/* Button to switch bar/pie */}
      <ChartToggleButton onClick={toggleChartType}>
        Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
      </ChartToggleButton>

      {/* For each property type (residential, commercial, land) */}
      {Object.entries(aggregatedData).map(([propType, subtypes]) => {
        const graphData = renderGraphData(subtypes);

        return (
          <ContentContainer key={propType}>
            {/* Table */}
            <TableContainer>
              <TableTitle>
                {propType.charAt(0).toUpperCase() + propType.slice(1)}
              </TableTitle>
              <StyledTable>
                <thead>
                  <tr>
                    <Th>Sub-Type</Th>
                    <Th>All Time (PKR)</Th>
                    <Th>This Year (PKR)</Th>
                    <Th>This Month (PKR)</Th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(subtypes).map(([subtype, values]) => (
                    <SubtypeRow key={subtype}>
                      <Td>{subtype}</Td>
                      <Td>{Math.round(values.allTime).toLocaleString()}</Td>
                      <Td>{Math.round(values.thisYear).toLocaleString()}</Td>
                      <Td>{Math.round(values.thisMonth).toLocaleString()}</Td>
                    </SubtypeRow>
                  ))}
                </tbody>
              </StyledTable>
            </TableContainer>

            {/* Chart */}
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="allTime" fill="#8884d8" />
                    <Bar dataKey="thisYear" fill="#82ca9d" />
                    <Bar dataKey="thisMonth" fill="#ffc658" />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    {/* 
                      For the Pie chart, we choose which dataKey to visualize.
                      You can pick "allTime", "thisYear", or "thisMonth" 
                    */}
                    <Pie
                      data={graphData}
                      dataKey="thisYear"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                      isAnimationActive
                    >
                      {graphData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          </ContentContainer>
        );
      })}
    </PageContainer>
  );
}

export default BusinessVolumeDetail;
