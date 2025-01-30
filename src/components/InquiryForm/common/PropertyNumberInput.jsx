import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 10px 0; // Adding consistent padding similar to other components
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
  margin-bottom: 8px; // Adjusted margin for consistency
  font-size: 16px;
  color: #333;
`;

const Container = styled.div`
  margin-bottom: 5px; // Ensures proper spacing between form elements
  margin-top: 15px;
  `;

const PropertyNumberInput = ({ label, name, value, onChange, isRequired = false  }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <StyledWrapper>
        <Input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter property/plot/house number"
          required={isRequired}
        />
      </StyledWrapper>
    </Container>
  );
};

export default PropertyNumberInput;
