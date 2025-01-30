import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

const DemandInput = ({ demand, onDemandChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    // Allow only numeric input or an empty string
    if (value === '' || /^\d*$/.test(value)) {
      onDemandChange(value); // Call the parent handler with the updated value
    }
  };

  return (
    <Container>
      <Label htmlFor="demand">Demand (Price)</Label>
      <Input
        type="text" // Keep the input type as text for flexible validation
        id="demand"
        value={demand || ''} // Ensure the value is never undefined
        onChange={handleChange}
        placeholder="Enter demand (price)"
      />
    </Container>
  );
};

export default DemandInput;
