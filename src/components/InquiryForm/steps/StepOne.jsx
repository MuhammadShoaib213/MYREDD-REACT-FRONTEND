import React, { useState } from 'react';
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

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #000;
  cursor: pointer;

  input {
    margin-right: 8px;
    transform: scale(1.5);
    accent-color: red;
  }
`;


const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
  margin-top: 20px;
`;

const StepOne = React.memo(({ nextStep, handleChange, formData }) => {

  const [mainOption, setMainOption] = useState('');

  const handleMainOptionChange = (e) => {
    const selectedOption = e.target.value;
    setMainOption(selectedOption);
    handleChange({
      target: {
        name: 'mainOption',
        value: selectedOption,
      },
    });
    handleChange({
      target: {
        name: 'inquiryType',
        value: '',
      },
    });
  };

  const handleSubOptionChange = (e) => {
    handleChange({
      target: {
        name: 'inquiryType',
        value: e.target.value,
      },
    });
  };

  const handleNext = () => {
    if (!formData.inquiryType) {
      alert('Please select an inquiry type to proceed.');
    } else {
      nextStep();
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Step 1: What are you looking for?</Title>
        <Form>
          <LeftColumn>
            <Label>
              <input
                type="radio"
                name="mainOption"
                value="lookingFor"
                checked={mainOption === 'lookingFor'}
                onChange={handleMainOptionChange}
              />
              Looking for
            </Label>
            <Label>
              <input
                type="radio"
                name="mainOption"
                value="offering"
                checked={mainOption === 'offering'}
                onChange={handleMainOptionChange}
              />
              Offering
            </Label>
          </LeftColumn>

          <RightColumn>
            {mainOption === 'lookingFor' && (
              <>
                <Label>
                  <input
                    type="radio"
                    name="subOption"
                    value="For Purchase"
                    checked={formData.inquiryType === 'For Purchase'}
                    onChange={handleSubOptionChange}
                  />
                  For Purchase
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="subOption"
                    value="On Rent"
                    checked={formData.inquiryType === 'On Rent'}
                    onChange={handleSubOptionChange}
                  />
                  On Rent
                </Label>
              </>
            )}

            {mainOption === 'offering' && (
              <>
                <Label>
                  <input
                    type="radio"
                    name="subOption"
                    value="For Sale"
                    checked={formData.inquiryType === 'For Sale'}
                    onChange={handleSubOptionChange}
                  />
                  For Sale
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="subOption"
                    value="For Rent"
                    checked={formData.inquiryType === 'For Rent'}
                    onChange={handleSubOptionChange}
                  />
                  For Rent
                </Label>
              </>
            )}
          </RightColumn>
        </Form>
        <Button type="button" onClick={handleNext}>
          Save and Next
        </Button>
      </ContentContainer>
    </Container>
  );
});

export default StepOne;
