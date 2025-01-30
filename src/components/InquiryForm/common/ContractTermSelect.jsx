import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
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

const ContractTermSelect = ({ term = '', onTermChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    // Notify the parent of the selected contract term
    if (onTermChange) {
      onTermChange(value);
    }
  };

  return (
    <Container>
      <Label htmlFor="contractTerm">Select Contract Term</Label>
      <Select
        id="contractTerm"
        value={term}
        onChange={handleChange}
      >
        <option value="">-- Select Term --</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Select>
    </Container>
  );
};

export default ContractTermSelect;
