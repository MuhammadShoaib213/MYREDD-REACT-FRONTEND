// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import { API_CONFIG } from '../config/api.config';
// import { useAuth } from '../components/AuthContext';

// const DashboardContainer = styled.div`
//   padding: 2rem;
//   background: #f5f6fa;
//   min-height: 100vh;
// `;

// const Header = styled.div`
//   margin-bottom: 2rem;
// `;

// const Title = styled.h1`
//   color: #2c3e50;
//   margin-bottom: 1rem;
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// const StatCard = styled.div`
//   background: white;
//   padding: 1.5rem;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const ChartContainer = styled.div`
//   background: white;
//   padding: 1.5rem;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   margin-bottom: 1.5rem;
//   height: 400px;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
// `;

// const Select = styled.select`
//   padding: 0.5rem;
//   border-radius: 4px;
//   border: 1px solid #ddd;
// `;

// function AdminDashboard() {
//   const { token } = useAuth();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     totalCustomers: 0,
//     totalProperties: 0,
//     totalRevenue: 0,
//     totalProfit: 0
//   });
//   const [timeRange, setTimeRange] = useState('week');
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [timeRange]);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch(`${API_CONFIG.API_URL}/admin/dashboard?timeRange=${timeRange}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       setStats(data.stats);
//       setChartData(data.chartData);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   };

//   return (
//     <DashboardContainer>
//       <Header>
//         <Title>Admin Dashboard</Title>
//         <FilterContainer>
//           <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
//             <option value="week">Last Week</option>
//             <option value="month">Last Month</option>
//             <option value="year">Last Year</option>
//           </Select>
//         </FilterContainer>
//       </Header>

//       <StatsGrid>
//         <StatCard>
//           <h3>Total Users</h3>
//           <p>{stats.totalUsers}</p>
//         </StatCard>
//         <StatCard>
//           <h3>Active Users</h3>
//           <p>{stats.activeUsers}</p>
//         </StatCard>
//         <StatCard>
//           <h3>Total Customers</h3>
//           <p>{stats.totalCustomers}</p>
//         </StatCard>
//         <StatCard>
//           <h3>Property Listings</h3>
//           <p>{stats.totalProperties}</p>
//         </StatCard>
//         <StatCard>
//           <h3>Total Revenue</h3>
//           <p>${stats.totalRevenue.toLocaleString()}</p>
//         </StatCard>
//         <StatCard>
//           <h3>Total Profit</h3>
//           <p>${stats.totalProfit.toLocaleString()}</p>
//         </StatCard>
//       </StatsGrid>

//       <ChartContainer>
//         <h3>User Growth</h3>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="users" stroke="#8884d8" />
//             <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartContainer>

//       <ChartContainer>
//         <h3>Revenue Overview</h3>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="revenue" fill="#8884d8" />
//             <Bar dataKey="profit" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartContainer>
//     </DashboardContainer>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { API_CONFIG } from '../config/api.config';
import { useAuth } from '../components/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff, #cbebff);
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  h3 {
    font-size: 1.2rem;
    color: #34495e;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.5rem;
    color: #16a085;
    font-weight: bold;
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  height: 400px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCustomers: 0,
    totalProperties: 0,
    totalRevenue: 0,
    totalProfit: 0
  });
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_CONFIG.API_URL}/admin/dashboard?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStats(data.stats);
      setChartData(data.chartData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Prepare data for a pie chart: Profit vs. Remaining Revenue (i.e. Revenue - Profit)
  const pieData = [
    { name: 'Profit', value: stats.totalProfit },
    { name: 'Remaining Revenue', value: stats.totalRevenue - stats.totalProfit }
  ];

  return (
    <DashboardContainer>
        <br/>
        <br/>
        <br/>
        <br/>
      <Header>
        <Title>Admin Dashboard</Title>
        <FilterContainer>
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </Select>
        </FilterContainer>
      </Header>

      <StatsGrid>
        <StatCard>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </StatCard>
        <StatCard>
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </StatCard>
        <StatCard>
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers}</p>
        </StatCard>
        <StatCard>
          <h3>Property Listings</h3>
          <p>{stats.totalProperties}</p>
        </StatCard>
        <StatCard>
          <h3>Total Revenue</h3>
          <p>${stats.totalRevenue.toLocaleString()}</p>
        </StatCard>
        <StatCard>
          <h3>Total Profit</h3>
          <p>${stats.totalProfit.toLocaleString()}</p>
        </StatCard>
      </StatsGrid>

      <ChartGrid>
        <ChartContainer>
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
              <XAxis dataKey="date" stroke="#34495e"/>
              <YAxis stroke="#34495e"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#e74c3c" strokeWidth={2} />
              <Line type="monotone" dataKey="activeUsers" stroke="#27ae60" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer>
          <h3>Revenue & Profit Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
              <XAxis dataKey="date" stroke="#34495e"/>
              <YAxis stroke="#34495e"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#2980b9" />
              <Bar dataKey="profit" fill="#8e44ad" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer>
          <h3>Profit Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#2ecc71"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer>
          <h3>Combined Analytics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
              <XAxis dataKey="date" stroke="#34495e"/>
              <YAxis stroke="#34495e"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#d35400" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#c0392b" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#27ae60" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartGrid>
    </DashboardContainer>
  );
}

export default AdminDashboard;
