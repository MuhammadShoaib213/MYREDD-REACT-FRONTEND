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

const AddedValueInput = ({ addedValue = { type: 'percentage', value: '' }, onAddedValueChange }) => {
  const [addedValueData, setAddedValueData] = useState(addedValue);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const updatedAddedValue = { ...addedValueData, type: newType, value: '' };
    setAddedValueData(updatedAddedValue);

    if (onAddedValueChange) {
      onAddedValueChange(updatedAddedValue);
    }
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;

    // Ensure the value is numeric or empty
    if (newValue === '' || /^[0-9\b]+$/.test(newValue)) {
      const updatedAddedValue = { ...addedValueData, value: newValue };
      setAddedValueData(updatedAddedValue);

      if (onAddedValueChange) {
        onAddedValueChange(updatedAddedValue);
      }
    }
  };

  return (
    <Container>
      <Label>Added Value</Label>
      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            name="addedValueType"
            value="percentage"
            checked={addedValueData.type === 'percentage'}
            onChange={handleTypeChange}
          />
          Percentage
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="addedValueType"
            value="value"
            checked={addedValueData.type === 'value'}
            onChange={handleTypeChange}
          />
          Fixed Value
        </RadioLabel>
      </RadioGroup>
      <Input
        type="text"
        placeholder={`Enter added value ${addedValueData.type === 'percentage' ? '(%)' : '(Value)'}`}
        value={addedValueData.value}
        onChange={handleValueChange}
      />
    </Container>
  );
};

export default AddedValueInput;
