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
  cursor: pointer;
`;

const Radio = styled.input`
  accent-color: #ff0000;
  margin-right: 10px;
  transform: scale(2.0);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff0000;
  margin-left: 10px;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
  margin-top: 20px;
`;

const StepThree = React.memo(({ nextStep, prevStep, handleChange, formData }) => {
  const { propertyType } = formData;

  const renderRadioButtons = () => {
    let types = [];
    if (propertyType === 'residential') {
      types = ['Home', 'Apartment', 'Villas', 'Duplex', 'Condos','Studio'];
    } else if (propertyType === 'commercial') {
      types = ['Office', 'Shop', 'Chalet','Building','Hotel'];
    } else if (propertyType === 'industrial') {
      types = ['Warehouse', 'Light Manufacturing', 'Heavy Manufacturing', 'Cold Storage','Factory'];
    } else if (propertyType === 'land') {
      types = ['Residential', 'Commercial', 'Industrial', 'Agriculture','Education','Farm','Raw'];
    }

    return types.map((type) => (
      <FormField key={type}>
        <Radio
          type="radio"
          name="propertySubType"
          value={type.toLowerCase()}
          checked={formData.propertySubType === type.toLowerCase()}
          onChange={(event) =>
            handleChange({
              target: {
                name: 'propertySubType',
                value: event.target.value,
              },
            })
          }
        />
        <Label>{type}</Label>
      </FormField>
    ));
  };

  return (
    <Container>
      <ContentContainer>
        <h2 style={{ fontSize: '30px', textAlign: 'center' }}>
          Step 3: Select Specific Property Type
        </h2>
        <Form>
          {renderRadioButtons()}
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

export default StepThree;
