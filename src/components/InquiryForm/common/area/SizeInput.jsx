// src/components/InquiryForm/common/area/SizeInput.jsx
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 10px 0; // Adding consistent padding similar to other components
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px; // Increased padding for greater height
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; // Ensures padding doesn't affect the overall width
  font-size: 16px; // Ensuring consistent font size across inputs
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 12px; // Consistent with the input field
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px; // Ensuring consistent font size across selects
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px; // Adjusted margin for consistency
  font-size: 16px;
  color: #333;
`;

const SizeInput = ({ value, sizeUnit, onValueChange, onUnitChange, isRequired = false  }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    // Check the value as a string to allow backspace and empty values
    if (!value || value.match(/^\d*$/)) { // Allows only non-negative integers
      onValueChange(event);
    }
  };

  return (
    <div>
      <Label htmlFor="size">Size</Label>
      <StyledWrapper>
        <Input
          type="number"
          id="size"
          name="size"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter size"
          min="0" // Retain min attribute for HTML5 validation on form submission
          required={isRequired}
        />
      </StyledWrapper>
      <Label htmlFor="unit">Unit</Label>
      <StyledWrapper>
        <Select id="sizeUnit" name="sizeUnit" value={sizeUnit} onChange={onUnitChange}>
          <option value="marla">Marla</option>
          <option value="yard">Yard</option>
        </Select>
      </StyledWrapper>
    </div>
  );
};

export default SizeInput;
