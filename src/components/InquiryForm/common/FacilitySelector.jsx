import React, { useState } from 'react';
import styled from 'styled-components';

/* --- STYLED COMPONENTS --- */
const Container = styled.div`
  margin: 10px auto;
  max-width: 800px;
`;

const FacilityCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const FacilityList = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 12px;
`;

const FacilityName = styled.span`
  font-size: 14px;
  color: #444;
  align-self: center;
`;

const ToggleButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#28a745' : '#dc3545')};
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  type: button; /* Explicitly set type to avoid form submission */

  &:hover {
    background-color: ${(props) => (props.active ? '#218838' : '#c82333')};
    transform: translateY(-1px);
  }
`;

const AddFacilityRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  type: button; 
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #218838;
  }
`;

/* --- COMPONENT --- */
const FacilitySelector = ({ facilities = [], onFacilitiesChange }) => {
  const predefinedFacilities = [
    'Water',
    'Gas',
    'Electricity',
    '24/7 Electricity',
    'Telephone',
    'Mobile Coverage',
    '24/7 Security',
  ];

  // Build initial local facilities from props or use defaults
  const [localFacilities, setLocalFacilities] = useState(
    facilities.length > 0
      ? facilities
      : predefinedFacilities.map((facility) => ({
          name: facility,
          value: 'N', // Default value
        }))
  );

  const toggleFacility = (index, event) => {
    event.preventDefault(); // Prevent default form submission
    const updated = [...localFacilities];
    updated[index].value = updated[index].value === 'Y' ? 'N' : 'Y';
    setLocalFacilities(updated);
    onFacilitiesChange(updated);
  };

  const addCustomFacility = () => {
    const customFacility = prompt('Enter custom facility name:');
    if (!customFacility) return;

    const updated = [...localFacilities, { name: customFacility, value: 'N' }];
    setLocalFacilities(updated);
    onFacilitiesChange(updated);
  };

  return (
    <Container>
      <FacilityCard>
        <CardHeader>
          <Title>Facilities</Title>
        </CardHeader>

        <FacilityList>
          {localFacilities.map((facility, index) => (
            <React.Fragment key={index}>
              <FacilityName>{facility.name}</FacilityName>
              <ToggleButton
                type="button" // Prevents default form submission behavior
                active={facility.value === 'Y'}
                onClick={(event) => toggleFacility(index, event)} // Pass the event
              >
                {facility.value === 'Y' ? 'Yes' : 'No'}
              </ToggleButton>
            </React.Fragment>
          ))}
        </FacilityList>

        <AddFacilityRow>
          <AddButton type="button" onClick={addCustomFacility}>
            + Add Custom Facility
          </AddButton>
        </AddFacilityRow>
      </FacilityCard>
    </Container>
  );
};

export default FacilitySelector;
