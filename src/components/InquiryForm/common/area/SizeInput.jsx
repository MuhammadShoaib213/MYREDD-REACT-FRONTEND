// src/components/InquiryForm/common/area/SizeInput.jsx
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 10px 0; // Adding consistent padding similar to other components
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  width: 150px; /* Fixed width for the input */
  padding: 12px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; 
  font-size: 16px; 
`;

const Select = styled.select`
  flex: 1;         /* Let the select fill the remaining space */
  padding: 12px 12px; 
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px; // Adjusted margin for consistency
  font-size: 16px;
  color: #333;
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

const SizeInput = ({ value, sizeUnit, onValueChange, onUnitChange, isRequired = false }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    // Check the value as a string to allow backspace and empty values
    if (!value || value.match(/^\d*$/)) { // Allows only non-negative integers
      onValueChange(event);
    }
  };

  return (
    <div>
      <Label htmlFor="size">
        <br/>
        Property Size {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}
      </Label>
      <StyledWrapper>
        <FlexContainer>
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
          <Select id="sizeUnit" name="sizeUnit" value={sizeUnit} onChange={onUnitChange}>
            <option value="marla">Marla</option>
            <option value="yard">Yard</option>
            <option value="feet">Feet</option>
            <option value="meter">Meter</option>
          </Select>
        </FlexContainer>
      </StyledWrapper>
    </div>
  );
};

export default SizeInput;
