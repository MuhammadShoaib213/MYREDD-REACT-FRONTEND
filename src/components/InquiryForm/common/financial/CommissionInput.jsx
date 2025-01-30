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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;

  input {
    margin-right: 5px;
  }
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;


const CommissionInput = ({ commission = { type: 'percentage', value: '' }, onCommissionChange, isRequired = false }) => {
  const [commissionData, setCommissionData] = useState(commission);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const updatedCommission = { ...commissionData, type: newType, value: '' };
    setCommissionData(updatedCommission);

    if (onCommissionChange) {
      onCommissionChange(updatedCommission);
    }
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;

    // Ensure the value is numeric or empty
    if (newValue === '' || /^[0-9\b]+$/.test(newValue)) {
      const updatedCommission = { ...commissionData, value: newValue };
      setCommissionData(updatedCommission);

      if (onCommissionChange) {
        onCommissionChange(updatedCommission);
      }
    }
  };

  return (
    <Container>
      <Label>Commission {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            name="commissionType"
            value="percentage"
            checked={commissionData.type === 'percentage'}
            onChange={handleTypeChange}
          />
          Percentage
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="commissionType"
            value="value"
            checked={commissionData.type === 'value'}
            onChange={handleTypeChange}
          />
          Fixed Value
        </RadioLabel>
      </RadioGroup>
      <Input
        type="text"
        placeholder={`Enter commission ${commissionData.type === 'percentage' ? '(%)' : '(Value)'}`}
        value={commissionData.value}
        onChange={handleValueChange}
        required={isRequired}
      />
    </Container>
  );
};

export default CommissionInput;
