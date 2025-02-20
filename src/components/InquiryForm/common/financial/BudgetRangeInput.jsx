import React, { useState } from 'react';
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

const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  width: calc(50% - 10px);
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

const BudgetRangeInput = ({ min = '', max = '', onBudgetChange, isRequired = false }) => {
  const [budget, setBudget] = useState({ min, max });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedBudget = { ...budget, [name]: value };
    setBudget(updatedBudget);
    if (onBudgetChange) {
      onBudgetChange(updatedBudget);
    }
  };

  return (
    <Container>
      <Label>
        Budget Range {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}
      </Label>
      <FlexContainer>
        <Input
          type="number"
          name="min"
          value={budget.min}
          onChange={handleChange}
          placeholder="Min Budget"
          min="0"
          required={isRequired}
        />
        <Input
          type="number"
          name="max"
          value={budget.max}
          onChange={handleChange}
          placeholder="Max Budget"
          min="0"
          required={isRequired}
        />
      </FlexContainer>
    </Container>
  );
};

export default BudgetRangeInput;
