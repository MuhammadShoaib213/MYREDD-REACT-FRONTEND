import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

// Styled wrapper to add padding similar to the StyledSelectWrapper
const StyledInputWrapper = styled.div`
  padding: 10px 0; // Suitable top and bottom padding to match Select component
`;

const Input = styled.input`
  width: 100%; // Ensures the input stretches to the width of its container
  padding: 9px 12px; // Increased padding for greater height
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  box-sizing: border-box; // Ensures padding doesn't affect the overall width
  font-size: 16px; // Ensures text size matches that of the select
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

function AreaSocietySelect({ onAreaSocietyChange, isRequired = false  }) {
  const [typedArea, setTypedArea] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setTypedArea(value);

    if (onAreaSocietyChange) {
      onAreaSocietyChange(value);
    }
  };

  return (
    <div>
      <Label htmlFor="areaSocietyInput">Area/Society {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <StyledInputWrapper>
        <Input
          id="areaSocietyInput"
          name="areaSociety"
          value={typedArea}
          onChange={handleChange}
          placeholder="Enter area or society"
          required={isRequired}
        />
      </StyledInputWrapper>
    </div>
  );
}

export default AreaSocietySelect;
