import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext';  // Ensure this context provides the necessary auth tokens
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledLeftSidebar = styled.div`
  width: 240px;
  background-color: #F8F8F8;
  padding: 20px;
  min-height: 60vh;
  height: 50vh; 
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 10px;
  padding-top: 80px;

  @media (max-width: 768px) {
    display: none; // Hide sidebar on mobile views
  }
`;

const SidebarHeading = styled.h2`
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const SidebarItem = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item-label {
    font-size: 16px;
    color: #555;
  }

  .badge {
    background-color: #0073B1;
    color: white;
    border-radius: 12px;
    padding: 4px 8px;
    font-size: 14px;
  }
`;

const LeftSidebar = () => {
  const [cities, setCities] = useState({});
  const { token } = useAuth();  // Ensure this context provides `token`
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchFriendsByCity = async () => {
      try {
        const response = await axios.get('/api/friend/friends-by-city', { headers: { Authorization: `Bearer ${token}` }});
        setCities(response.data);
      } catch (error) {
        console.error('Failed to fetch friends by city:', error);
      }
    };

    fetchFriendsByCity();
  }, [token]);

  const handleCityClick = (cityName) => {
    navigate(`/friends/${cityName}`); // Navigate to the friends page of the clicked city
  };

  // Calculate total friends count
  const totalFriends = Object.values(cities).reduce((total, city) => total + city.count, 0);

  return (
    <StyledLeftSidebar>
      <SidebarHeading>Manage my network</SidebarHeading>
      <SidebarItem onClick={() => handleCityClick('All')}>
        <span className="item-label">Connections</span>
        <span className="badge">{totalFriends}</span>
      </SidebarItem>
      {Object.entries(cities).map(([city, info]) => (
        <SidebarItem key={city} onClick={() => handleCityClick(city)}>
          <span className="item-label">{city}</span>
          <span className="badge">{info.count}</span>
        </SidebarItem>
      ))}
    </StyledLeftSidebar>
  );
};

export default LeftSidebar;
