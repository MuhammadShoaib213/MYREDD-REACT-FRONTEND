// PhaseBlockSelect.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
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

function PhaseBlockSelect({ onChange, isRequired = false  }) {
  const [typedPhaseBlock, setTypedPhaseBlock] = useState('');

  // Handle user typing in the text field
  const handleChange = (e) => {
    const { value } = e.target;
    setTypedPhaseBlock(value);

    // Notify parent
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      <Label htmlFor="phaseBlockInput">Phase/Block  {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <Input
        id="phaseBlockInput"
        name="phaseBlock"
        value={typedPhaseBlock}
        onChange={handleChange}
        placeholder="Enter Phase/Block"
        required={isRequired}
      />
    </div>
  );
}

export default PhaseBlockSelect;
