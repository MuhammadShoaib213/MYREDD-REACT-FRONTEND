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

const StyledInput = styled.input`
  width: calc(33% - 4px);  // Maintain the width as per your design
  padding: 12px;  // Increased padding for better usability
  margin-right: 4px;  // Keep the right margin for spacing between inline elements
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;  // Ensuring font size is consistent
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;  // Increased padding to match input fields
  margin-top: 8px;  // Providing sufficient space above the select
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;  // Matching font size with inputs
`;

const LandAreaDimensionsInput = ({ onChange, dimensions, isRequired = false  }) => {
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
      <Label>Land Area Dimensions</Label>
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
        <option value="feet">Feet</option>
        <option value="yards">Yards</option>
      </StyledSelect>
    </Container>
  );
};

export default LandAreaDimensionsInput;
