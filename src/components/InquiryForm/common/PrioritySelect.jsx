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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 16px;
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

const PrioritySelect = ({ priority = '', onPriorityChange, isRequired = false }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    // Notify the parent of the selected priority
    if (onPriorityChange) {
      onPriorityChange(value);
    }
  };

  return (
    <Container>
      <Label htmlFor="priority">Select Priority  {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <Select id="priority" value={priority} onChange={handleChange}  required={isRequired}>
        <option value="">-- Select Priority --</option>
        <option value="thisMonth">This Month</option>
        <option value="thisQuarter">This Quarter</option>
        <option value="thisYear">This Year</option>
      </Select>
    </Container>
  );
};

export default PrioritySelect;
