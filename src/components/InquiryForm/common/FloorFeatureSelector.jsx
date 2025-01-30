import React, { useState } from 'react';
import styled from 'styled-components';

/* --- STYLED COMPONENTS --- */
const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const FloorCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FloorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FloorTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const RemoveFloorButton = styled.button`
  background: transparent;
  border: none;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  type: button;

  &:hover {
    color: #666;
  }
`;

const FloorNameInput = styled.input`
  display: block;
  width: 100%;
  max-width: 300px;
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const FeatureLabel = styled.h4`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px; /* Feature name + feature value */
  grid-gap: 8px 16px;
  margin-top: 12px;
`;

const FeatureName = styled.div`
  font-size: 14px;
  align-self: center;
`;

const FeatureInput = styled.input`
  width: 90%;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const CardButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

const PrimaryButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  type: button;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: #f7f7f7;
  color: #333;
  cursor: pointer;
  type: button;

  &:hover {
    background-color: #e2e2e2;
  }
`;

/* --- COMPONENT --- */
const FloorFeatureSelector = ({ floors = [], onFloorChange }) => {
  const [localFloors, setLocalFloors] = useState(floors);

  const predefinedFeatures = [
    'Bedroom',
    'Kids Room',
    'Guest Room',
    'Study Room',
    'Dining',
    'Sitting',
    'Lounge',
    'Servant Quarter',
    'Driver Room',
    'Maid Room',
    'Lawn',
    'Basement',
    'Cinema',
    'Garage',
    'Elevator',
    'Combined Entrance',
    'Separate Entrance',
  ];

  const addFloor = (event) => {
    event.preventDefault(); // Prevent form submission
    const newFloor = {
      name: '',
      features: predefinedFeatures.reduce((acc, feature) => ({
        ...acc,
        [feature]: 0,
      }), {})
    };
    const updatedFloors = [...localFloors, newFloor];
    setLocalFloors(updatedFloors);
    onFloorChange(updatedFloors);
  };

  const removeFloor = (index, event) => {
    event.preventDefault(); // Prevent form submission
    const updatedFloors = localFloors.filter((_, i) => i !== index);
    setLocalFloors(updatedFloors);
    onFloorChange(updatedFloors);
  };

  const updateFloorName = (index, name) => {
    const updatedFloors = [...localFloors];
    updatedFloors[index].name = name;
    setLocalFloors(updatedFloors);
    onFloorChange(updatedFloors);
  };

  const updateFeature = (floorIndex, featureName, value) => {
    const updatedFloors = [...localFloors];
    updatedFloors[floorIndex].features[featureName] = value;
    setLocalFloors(updatedFloors);
    onFloorChange(updatedFloors);
  };

  const addCustomFeature = (floorIndex, event) => {
    event.preventDefault(); // Prevent form submission
    const customFeature = prompt('Enter custom feature name:');
    if (!customFeature) return;

    const updatedFloors = [...localFloors];
    updatedFloors[floorIndex].features[customFeature] = 0;
    setLocalFloors(updatedFloors);
    onFloorChange(updatedFloors);
  };

  return (
    <Container>
      {localFloors.map((floor, index) => (
        <FloorCard key={index}>
          <FloorHeader>
            <FloorTitle>Floor {index + 1}</FloorTitle>
            <RemoveFloorButton
              type="button"
              onClick={(event) => removeFloor(index, event)}
            >
              Remove
            </RemoveFloorButton>
          </FloorHeader>

          <label style={{ fontSize: '14px', color: '#555' }}>
            Floor Name:
            <FloorNameInput
              type="text"
              value={floor.name}
              onChange={(e) => updateFloorName(index, e.target.value)}
              placeholder="e.g., Ground Floor"
            />
          </label>

          <FeatureLabel>Features</FeatureLabel>
          <FeatureList>
            {Object.keys(floor.features).map((featureName) => (
              <React.Fragment key={featureName}>
                <FeatureName>{featureName}</FeatureName>
                <FeatureInput
                  type="text"
                  value={floor.features[featureName]}
                  onChange={(e) =>
                    updateFeature(index, featureName, e.target.value)
                  }
                  placeholder="e.g., 1, Y, N"
                />
              </React.Fragment>
            ))}
          </FeatureList>

          <CardButtonRow>
            <SecondaryButton
              type="button"
              onClick={(event) => addCustomFeature(index, event)}
            >
              + Add Custom Feature
            </SecondaryButton>
          </CardButtonRow>
        </FloorCard>
      ))}

      <PrimaryButton type="button" onClick={addFloor}>
        + Add Floor
      </PrimaryButton>
    </Container>
  );
};

export default FloorFeatureSelector;
