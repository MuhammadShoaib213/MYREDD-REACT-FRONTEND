import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;  // Uniform font size for labels
  color: #333;  // Adding color for better visibility
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledInput = styled.input`
  width: calc(33% - 4px);  // Maintain the width as per your design
  padding: 12px;  // Increased padding for better usability
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;  // Ensuring font size is consistent
`;

const StyledSelect = styled.select`
  width: calc(33% - 4px);  // Adjusted to match input width for inline layout
  padding: 12px;  // Increased padding to match input fields
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;  // Matching font size with inputs
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

const LandAreaDimensionsInput = ({ onChange, dimensions, isRequired = false }) => {
  const [unit, setUnit] = useState('feet');

  const handleDimensionChange = (e) => {
    onChange(e);  // Pass the whole event directly
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
    onChange(event);  // Pass the whole event directly
  };

  return (
    <Container>
      <Label>
        Land Area Dimensions {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}
      </Label>
      <FlexContainer>
        <StyledInput
          type="number"
          name="landWidth"
          value={dimensions.width}
          onChange={handleDimensionChange}
          placeholder="Width"
          required={isRequired}
        />
        <StyledInput
          type="number"
          name="landLength"
          value={dimensions.length}
          onChange={handleDimensionChange}
          placeholder="Length"
          required={isRequired}
        />
        <StyledSelect name="landUnit" value={unit} onChange={handleUnitChange}>
          <option value="feet">Marla</option>
          <option value="yards">Yards</option>
          <option value="feet">Feet</option>
          <option value="meter">Meter</option>
        </StyledSelect>
      </FlexContainer>
    </Container>
  );
};

export default LandAreaDimensionsInput;
