import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: calc(33% - 4px);
  padding: 8px;
  margin-right: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;


const CoveredAreaDimensionsInput = ({ onChange, dimensions, isRequired = false  }) => {
  const [unit, setUnit] = useState('feet');

  // Pass the whole event object to the parent handler
  const handleDimensionChange = (e) => {
    onChange(e);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
    onChange(event);  // Ensure the whole event is passed
  };

  return (
    <Container>
      <Label>Covered Area Dimensions  {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <Input
        type="number"
        name="coveredWidth"
        value={dimensions.width}
        onChange={handleDimensionChange}
        placeholder="Width"
        required={isRequired}
      />
      <Input
        type="number"
        name="coveredLength"
        value={dimensions.length}
        onChange={handleDimensionChange}
        placeholder="Length"
        required={isRequired}
      />
      <Select name="coveredUnit" value={unit} onChange={handleUnitChange}>
        <option value="feet">Feet</option>
        <option value="yards">Yards</option>
      </Select>
    </Container>
  );
};

export default CoveredAreaDimensionsInput;
