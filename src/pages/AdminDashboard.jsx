import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { API_CONFIG } from '../config/api.config';
import { useAuth } from '../components/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
  background: #f5f6fa;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  height: 400px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
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

  return (
    <DashboardContainer>
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

      <ChartContainer>
        <h3>User Growth</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
            <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <h3>Revenue Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
            <Bar dataKey="profit" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  );
}

export default AdminDashboard;