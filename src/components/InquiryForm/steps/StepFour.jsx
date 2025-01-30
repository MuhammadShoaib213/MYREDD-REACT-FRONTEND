import React, { Suspense, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* --- COPIED STYLES FROM StepOne --- */
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

/* 
  Buttons share the same styling (size, color, hover effect).
  We remove any top margin and let ButtonRow handle layout spacing.
*/
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
`;

/*
  ButtonRow ensures both Back and Submit buttons are on the same line,
  sharing the same size and styling, with consistent spacing.
*/
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const StepFour = memo(({ prevStep, formData, handlers }) => {
  const { inquiryType, propertyType, propertySubType } = formData;
  const formName =
    propertySubType.charAt(0).toUpperCase() +
    propertySubType.slice(1).toLowerCase() +
    inquiryType.replace(/\s+/g, '');

  const [FormComponent, setFormComponent] = useState(null);

  useEffect(() => {
    const loadFormComponent = async () => {
      try {
        const ImportedComponent = await import(`./forms/${formName}.jsx`);
        setFormComponent(() => ImportedComponent.default);
      } catch (error) {
        console.error(`Form not found: ${formName}`, error);
        setFormComponent(() => () => <p>Form not available for the selected type.{formName} </p>);
      }
    };

    loadFormComponent();
  }, [formName]);

  const handleKeyDown = (e) => {
    // Prevent submitting the form when pressing Enter
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Step 4: Review and Complete</Title>

        {/* <p><strong>Inquiry Type:</strong> {inquiryType}</p>
        <p><strong>Property Type:</strong> {propertyType}</p>
        <p><strong>Property Sub-Type:</strong> {propertySubType}</p> */}

        <Suspense fallback={<div>Loading form...</div>}>
          <form onSubmit={handlers.handleSubmit} onKeyDown={handleKeyDown}>
            {FormComponent && (
              <FormComponent
                formData={formData}
                handleChange={handlers.handleChange}
                handleFilesChange={handlers.handleFilesChange}
                handleFloorChange={handlers.handleFloorChange}
                handleFacilitiesChange={handlers.handleFacilitiesChange}
                handleBudgetChange={handlers.handleBudgetChange}
                handleAdvanceChange={handlers.handleAdvanceChange}
                handlePriorityChange={handlers.handlePriorityChange}
                handleCommissionChange={handlers.handleCommissionChange}
                handleAddedValueChange={handlers.handleAddedValueChange}
                handleAddressChange={handlers.handleAddressChange}
                handlePropertyConditionChange ={handlers.handlePropertyConditionChange}
                handleDemandChange = {handlers.handleDemandChange}
                handleContractTermChange = {handlers.handleContractTermChange}
                handlePropertyImagesChange = {handlers.handlePropertyImagesChange}
                handleChangeDistrict = {handlers.handleChangeDistrict}
              />
            )}

            <ButtonRow>
              {/* BACK BUTTON (same styling, size as Submit) */}
              <Button type="button" onClick={prevStep}>
                Back
              </Button>
              {/* SUBMIT BUTTON (same styling, size as Back) */}
              <Button type="submit">
                Submit
              </Button>
            </ButtonRow>
          </form>
        </Suspense>
      </ContentContainer>
    </Container>
  );
});

StepFour.propTypes = {
  prevStep: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    inquiryType: PropTypes.string,
    propertyType: PropTypes.string,
    propertySubType: PropTypes.string,
  }).isRequired,
    handlers: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleFilesChange: PropTypes.func.isRequired,
    handleFloorChange: PropTypes.func.isRequired,
    handleFacilitiesChange: PropTypes.func.isRequired,
    handleBudgetChange: PropTypes.func.isRequired,
    handleAdvanceChange: PropTypes.func.isRequired,
    handlePriorityChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCommissionChange: PropTypes.func.isRequired,
    handleAddedValueChange: PropTypes.func.isRequired,
    handleAddressChange: PropTypes.func.isRequired,
    handlePropertyConditionChange: PropTypes.func.isRequired,
    handleDemandChange : PropTypes.func.isRequired,
    handleCommissionChange: PropTypes.func.isRequired,
    handleAddedValueChange: PropTypes.func.isRequired,
    handleContractTermChange: PropTypes.func.isRequired,
    handlePropertyImagesChange : PropTypes.func.isRequired,
    handleChangeDistrict: PropTypes.func.isRequired,
  }).isRequired,
};

export default StepFour;
