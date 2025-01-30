import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  // background-color: rgba(0, 0, 0, 0.5);
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  padding-top: 80px;
`;

const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 20px;
  color: #000000;
  cursor: pointer;
`;

const Radio = styled.input`
  accent-color: #ff0000;
  cursor: pointer;
  transform: scale(2.0);
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #d3d3d3;
  }
  margin-top: 20px;
`;

const StepTwo = React.memo(({ nextStep, prevStep, handleChange, formData }) => {
  const handleRadioChange = (event) => {
    const { value } = event.target;
    handleChange({
      target: {
        name: 'propertyType',
        value: value,
      },
    });
  };

  return (
    <Container>
      <ContentContainer>
        <h2 style={{ fontSize: '30px', textAlign: 'center' }}>
          Step 2: Select Property Type
        </h2>
        <Form>
          <FormField>
            <Radio
              type="radio"
              name="propertyType"
              value="residential"
              checked={formData.propertyType === 'residential'}
              onChange={handleRadioChange}
            />
            <Label>Residential</Label>
          </FormField>
          <FormField>
            <Radio
              type="radio"
              name="propertyType"
              value="commercial"
              checked={formData.propertyType === 'commercial'}
              onChange={handleRadioChange}
            />
            <Label>Commercial</Label>
          </FormField>
          <FormField>
            <Radio
              type="radio"
              name="propertyType"
              value="industrial"
              checked={formData.propertyType === 'industrial'}
              onChange={handleRadioChange}
            />
            <Label>Industrial</Label>
          </FormField>
          <FormField>
            <Radio
              type="radio"
              name="propertyType"
              value="land"
              checked={formData.propertyType === 'land'}
              onChange={handleRadioChange}
            />
            <Label>Land</Label>
          </FormField>
          <div>
            <Button type="button" onClick={prevStep}>
              Back
            </Button>
            <Button type="button" onClick={nextStep}>
              Save and Next
            </Button>
          </div>
        </Form>
      </ContentContainer>
    </Container>
  );
});

export default StepTwo;