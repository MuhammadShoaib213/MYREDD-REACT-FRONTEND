
// import React from 'react';
// import styled from 'styled-components';

// // Container styles
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 20px;
// `;

// // Form styling
// const Form = styled.form`
//   width: 100%;
//   max-width: 600px;
// `;

// // Field grouping styling
// const FormField = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
//   margin-bottom: 20px;
// `;

// // Label styling
// const Label = styled.label`
//   display: flex;
//   align-items: center; // Centers the checkbox and label text vertically
//   font-size: 16px;
//   color: #000000;
//   cursor: pointer;
//   margin-bottom: 10px; // Space between each label
// `;

// // Checkbox input styling
// const Checkbox = styled.input`
//   accent-color: #FF0000;
//   margin-right: 10px; // Space between the checkbox and the label text
// `;

// // Button styling
// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #FF0000;
//   color: white;
//   border: none;
//   border-radius: 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: #D3D3D3;
//   }
//   // Margin on the right for spacing between multiple buttons
//   &:not(:last-child) {
//     margin-right: 10px;
//   }
//   // Common top margin for all buttons
//   margin-top: 20px;
// `;
// const StepOne = ({ nextStep, handleChange, formData }) => {
//     const { inquiryType } = formData;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         nextStep();
//     };

//     return (
//       <Container>
//         <Form onSubmit={handleSubmit}>
//             <h2>Step 1: Select Property Type</h2>
//             <FormField>
//                 <Label>
//                     <Checkbox
//                         type="checkbox"
//                         name="forPurchase"
//                         checked={inquiryType.forPurchase || false}
//                         onChange={handleChange('inquiryType')}
//                     />
//                     For Purchase
//                 </Label>
//                 <Label>
//                     <Checkbox
//                         type="checkbox"
//                         name="forSale"
//                         checked={inquiryType.forSale || false}
//                         onChange={handleChange('inquiryType')}
//                     />
//                     For Sale
//                 </Label>
//                 <Label>
//                     <Checkbox
//                         type="checkbox"
//                         name="onRent"
//                         checked={inquiryType.onRent || false}
//                         onChange={handleChange('inquiryType')}
//                     />
//                     On Rent
//                 </Label>
//                 <Label>
//                     <Checkbox
//                         type="checkbox"
//                         name="forRent"
//                         checked={inquiryType.forRent || false}
//                         onChange={handleChange('inquiryType')}
//                     />
//                     For Rent
//                 </Label>
//             </FormField>
//             <Button type="submit">Save and Next</Button>
//         </Form>
//       </Container>
//     );
// };

// export default StepOne;


import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

// Main background container
const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 70vh; // Reduced from 100vh
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px; // Reduced top padding
  padding-top: 80px;
`;
// Content container with a white semi-transparent background
const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;  // Adjust width if needed
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// Form styling
const Form = styled.form`
  width: 100%;
`;

// Field grouping styling, modified for flex row layout
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 70%;
  margin-bottom: 10px;
`;

// Sub options container
const SubOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1px;  // Space between main options and sub options
`;

// Label styling
const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #000000;
  cursor: pointer;
  margin-bottom: 10px;  // Space between options
`;

// Radio and Checkbox input styling
const RadioCheckbox = styled.input`
  accent-color: #FF0000;
  margin-right: 10px;
  transform: scale(2.0);
`;

// Button styling
const Button = styled.button`
  padding: 10px 20px;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
  margin-top: 20px;
`;

const StepOne = ({ nextStep, handleChange, formData }) => {
    const [selection, setSelection] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
      <Container>
        <ContentContainer>
          <Form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '30px', textAlign: 'center' }}>Step 1: What are you looking for?</h2>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormField>
                    <Label>
                        <RadioCheckbox
                            type="radio"
                            name="selectionType"
                            value="lookingFor"
                            checked={selection === 'lookingFor'}
                            onChange={() => setSelection('lookingFor')}
                        />
                        Looking for
                    </Label>
                    <Label>
                        <RadioCheckbox
                            type="radio"
                            name="selectionType"
                            value="offering"
                            checked={selection === 'offering'}
                            onChange={() => setSelection('offering')}
                        />
                        Offering
                    </Label>
                </FormField>
                {selection && (
                  <SubOptions>
                    {selection === 'lookingFor' ? (
                      <>
                        <Label>
                            <RadioCheckbox
                                type="checkbox"
                                name="forPurchase"
                                checked={formData.inquiryType.forPurchase || false}
                                onChange={handleChange('inquiryType')}
                            />
                            For Purchase
                        </Label>
                        <Label>
                            <RadioCheckbox
                                type="checkbox"
                                name="forRent"
                                checked={formData.inquiryType.forRent || false}
                                onChange={handleChange('inquiryType')}
                            />
                            For Rent
                        </Label>
                      </>
                    ) : (
                      <>
                        <Label>
                            <RadioCheckbox
                                type="checkbox"
                                name="forSale"
                                checked={formData.inquiryType.forSale || false}
                                onChange={handleChange('inquiryType')}
                            />
                            For Sale
                        </Label>
                        <Label>
                            <RadioCheckbox
                                type="checkbox"
                                name="onRent"
                                checked={formData.inquiryType.onRent || false}
                                onChange={handleChange('inquiryType')}
                            />
                            On Rent
                        </Label>
                      </>
                    )}
                  </SubOptions>
                )}
              </div>
              <Button type="submit">Save and Next</Button>
          </Form>
        </ContentContainer>
      </Container>
    );
};

export default StepOne;
