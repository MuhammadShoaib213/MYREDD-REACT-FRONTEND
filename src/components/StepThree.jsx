
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
//   align-items: center;
//   margin: 10px 0;
// `;

// const Label = styled.label`
//   margin-left: 10px;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const Checkbox = styled.input`
//   accent-color: #FF0000;
//   margin-right: 10px;
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

// const StepThree = ({ nextStep, prevStep, handleChange, formData }) => {
//     const { propertyType, propertySubType } = formData;

//     const renderCheckboxes = () => {
//         const types = [];
//         if (propertyType.residential) {
//             types.push('Home', 'Apartment', 'Villas', 'Farm House', 'All');
//         }
//         if (propertyType.commercial) {
//             types.push('Office', 'Shop', 'Warehouse', 'Factory', 'All');
//         }
//         if (propertyType.land) {
//             types.push('Residential', 'Commercial', 'Industrial', 'Agriculture', 'All');
//         }

//         return types.map((type, index) => (
//             <FormField key={type}> {/* Proper use of key */}
//                 <Checkbox
//                     type="checkbox"
//                     name={type.toLowerCase().replace(/\s+/g, '')}
//                     checked={propertySubType[type.toLowerCase().replace(/\s+/g, '')] || false}
//                     onChange={handleChange('propertySubType')}
//                 />
//                 <Label>{type}</Label>
//             </FormField>
//         ));
//     };

//     return (
//         <Container>
//             <h2>Step 3: Select Specific Property Type</h2>
//             <Form>
//                 {renderCheckboxes()}
//                 <div>
//                     <Button type="button" onClick={prevStep}>Back</Button>
//                     <Button type="button" onClick={nextStep}>Save and Next</Button>
//                 </div>
//             </Form>
//         </Container>
//     );
// };

// export default StepThree;


import React from 'react';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

// Main background container
const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  padding-top: 80px;
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
  cursor: pointer;
`;

// Checkbox input styling
const Checkbox = styled.input`
  accent-color: #FF0000;
  margin-right: 10px;
  transform: scale(2.0);
`;

// Button styling
const Button = styled.button`
  padding: 10px 20px;
  background-color: #FF0000;
    margin-left:10px;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
  margin-top: 20px;
`;

const StepThree = ({ nextStep, prevStep, handleChange, formData }) => {
    const { propertyType, propertySubType } = formData;

    const renderCheckboxes = () => {
        const types = [];
        if (propertyType.residential) {
            types.push('Home', 'Apartment', 'Villas', 'Farm House', 'All');
        }
        if (propertyType.commercial) {
            types.push('Office', 'Shop', 'Warehouse', 'Factory', 'All');
        }
        if (propertyType.land) {
            types.push('Residential', 'Commercial', 'Industrial', 'Agriculture', 'All');
        }

        return types.map((type, index) => (
            <FormField key={type}>
                <Checkbox
                    type="checkbox"
                    name={type.toLowerCase().replace(/\s+/g, '')}
                    checked={propertySubType[type.toLowerCase().replace(/\s+/g, '')] || false}
                    onChange={handleChange('propertySubType')}
                />
                <Label>{type}</Label>
            </FormField>
        ));
    };

    return (
      <Container>
        <ContentContainer>
          <h2 style={{ fontSize: '30px', textAlign: 'center' }}>Step 3: Select Specific Property Type</h2>
          <Form>
              {renderCheckboxes()}
              <div>
                  <Button type="button" onClick={prevStep}>Back</Button>
                  <Button type="button" onClick={nextStep}>Save and Next</Button>
              </div>
          </Form>
        </ContentContainer>
      </Container>
    );
};

export default StepThree;
