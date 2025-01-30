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
  width: 95%;
  padding: 8px 12px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
`;

const AdvanceAmountInput = ({ advanceAmount = '', onAdvanceChange }) => {
  const [amount, setAmount] = useState(advanceAmount);

  const handleChange = (e) => {
    const value = e.target.value;

    // Ensure the input is a valid number or empty
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setAmount(value);

      // Notify the parent of the change
      if (onAdvanceChange) {
        onAdvanceChange(value);
      }
    }
  };

  return (
    <Container>
      <Label htmlFor="advanceAmount">Advance Amount</Label>
      <Input
        type="text"
        id="advanceAmount"
        value={amount}
        onChange={handleChange}
        placeholder="Enter advance amount"
      />
    </Container>
  );
};

export default AdvanceAmountInput;
