import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DetectAddressComponent = ({ onUpdate }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `/api/address/reverse-geocode?lat=${latitude}&lng=${longitude}`
            );
            const data = response.data;  // Access response data directly

            setAddress(data.address);
            onUpdate(data.address); // Call onUpdate to update parent component state
          } catch (error) {
            console.error("Error fetching address:", error);
            setError("Error fetching address");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
          setError("Error obtaining location");
          setLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <Button onClick={getCurrentLocation}>Detect Address</Button>
      {loading && <p>Detecting your location...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {address && <p>Your Address: {address}</p>}
    </div>
  );
};

export default DetectAddressComponent;
