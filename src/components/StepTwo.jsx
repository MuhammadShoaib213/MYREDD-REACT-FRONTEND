
// import React from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
// `;

// const Form = styled.form`
//   width: 100%;
//   max-width: 600px;
// `;

// const FormField = styled.div`
//   display: flex;
//   align-items: center; // Center alignment for checkbox and label
//   margin: 10px 0; // Adds margin to each form field
// `;

// const Label = styled.label`
//   margin-left: 10px; // Space between checkbox and label text
//   font-size: 16px; // Readable font size
// `;

// const Checkbox = styled.input`
//   accent-color: #FF0000; // Use theme red for checkbox color
//   cursor: pointer;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 15px;
//   margin: 10px 0;
//   border: 2px solid #D3D3D3;
//   border-radius: 20px;
//   box-sizing: border-box;
// `;

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
// const StepTwo = ({ nextStep, prevStep, handleChange, formData }) => {
//     const { propertyType } = formData;

//     return (
//       <Container>
//         <h2>Step 2: Select Property Type</h2>
//         <Form>
//             <FormField>
//                 <Checkbox
//                     type="checkbox"
//                     name="residential"
//                     checked={propertyType.residential || false}
//                     onChange={handleChange('propertyType')}
//                 />
//                 <Label>Residential</Label>
//             </FormField>
//             <FormField>
//                 <Checkbox
//                     type="checkbox"
//                     name="commercial"
//                     checked={propertyType.commercial || false}
//                     onChange={handleChange('propertyType')}
//                 />
//                 <Label>Commercial</Label>
//             </FormField>
//             <FormField>
//                 <Checkbox
//                     type="checkbox"
//                     name="land"
//                     checked={propertyType.land || false}
//                     onChange={handleChange('propertyType')}
//                 />
//                 <Label>Land</Label>
//             </FormField>
//             <div>
//                 <Button type="button" onClick={prevStep}>Back</Button>
//                 <Button type="button" onClick={nextStep}>Save and Next</Button>
//             </div>
//         </Form>
//       </Container>
//     );
// };

// export default StepTwo;


import React from 'react';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';  // Assuming the same background image is used

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
`;

// Content container with a white semi-transparent background
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

// Form styling
const Form = styled.form`
  width: 100%;
`;

// Field grouping styling
const FormField = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// Label styling
const Label = styled.label`
  margin-left: 10px;
  font-size: 20px;
  color: #000000;
  cursor: pointer;
`;

// Checkbox input styling
const Checkbox = styled.input`
  accent-color: #FF0000;
  cursor: pointer;
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
    background-color: #D3D3D3;
  }
  margin-top: 20px;
`;

const StepTwo = ({ nextStep, prevStep, handleChange, formData }) => {
    const { propertyType } = formData;

    return (
      <Container>
        <ContentContainer>
          <h2 style={{ fontSize: '30px', textAlign: 'center' }}>Step 2: Select Property Type</h2>
          <Form>
              <FormField>
                  <Checkbox
                      type="checkbox"
                      name="residential"
                      checked={propertyType.residential || false}
                      onChange={handleChange('propertyType')}
                  />
                  <Label>Residential</Label>
              </FormField>
              <FormField>
                  <Checkbox
                      type="checkbox"
                      name="commercial"
                      checked={propertyType.commercial || false}
                      onChange={handleChange('propertyType')}
                  />
                  <Label>Commercial</Label>
              </FormField>
              <FormField>
                  <Checkbox
                      type="checkbox"
                      name="land"
                      checked={propertyType.land || false}
                      onChange={handleChange('propertyType')}
                  />
                  <Label>Land</Label>
              </FormField>
              <div>
                  <Button type="button" onClick={prevStep}>Back</Button>
                  <Button type="button" onClick={nextStep}>Save and Next</Button>
              </div>
          </Form>
        </ContentContainer>
      </Container>
    );
};

export default StepTwo;
