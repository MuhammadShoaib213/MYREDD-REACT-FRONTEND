import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 5px;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px; // Increased padding for a better user experience
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; // Ensures padding doesn't affect the overall width
  font-size: 16px; // Consistent font size across inputs
`;

const Label = styled.label`
  display: block;
  margin-bottom: 15px; // Adjusted margin for consistency
  font-size: 16px;
  color: #333;
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

const StreetInput = ({ label, name, value, onChange, placeholder, isRequired = false  }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label} {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <Input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter street name/number"}
        required={isRequired}
      />
    </Container>
  );
};

export default StreetInput;
