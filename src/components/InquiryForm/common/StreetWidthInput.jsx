import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex; // Enables flexbox for aligning items side by side
  gap: 10px; // Adds spacing between the input and dropdown
  padding: 10px 0; // Consistent padding
`;

const Input = styled.input`
  flex: 7; // Takes 70% of the width
  padding: 12px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
`;

const Select = styled.select`
  flex: 3; // Takes 30% of the width
  padding: 12px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  margin-top: 15px;
  font-size: 16px;
  color: #333;
`;

const StreetWidthInput = ({ value, unit, onValueChange, onUnitChange }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    // Allow only non-negative integers or decimal numbers
    if (!value || value.match(/^\d*\.?\d*$/)) {
      onValueChange(event);
    }
  };

  return (
    <div>
      <Label htmlFor="streetWidth">Street Width</Label>
      <StyledWrapper>
        <Input
          type="text"
          id="streetWidth"
          name="streetWidth"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter street width"
          required
        />
        <Select id="unit" name="unit" value={unit} onChange={onUnitChange}>
          <option value="feet">Feet</option>
          <option value="meters">Meters</option>
        </Select>
      </StyledWrapper>
    </div>
  );
};

export default StreetWidthInput;
