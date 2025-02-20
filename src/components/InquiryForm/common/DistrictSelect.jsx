// DistrictSelect.js
import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import axios from 'axios';

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

// Styled wrapper to add padding
const StyledSelectWrapper = styled.div`
  padding: 10px 0; // Suitable top and bottom padding
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

function DistrictSelect({ selectedCityName, area, onAreaChange, isRequired = false }) {
  const [areas, setAreas] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!selectedCityName) {
      setAreas([]);
      setSelectedOption(null);
      return;
    }

    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          `api/places/cities/${selectedCityName}/areas`
        );
        
        let areaOptions = [];
        // Check if the data is directly an array or nested under a key
        if (Array.isArray(response.data)) {
          areaOptions = response.data.map(areaName => ({
            value: areaName,
            label: areaName
          }));
        } else if (response.data.areas && Array.isArray(response.data.areas)) {
          areaOptions = response.data.areas.map(areaName => ({
            value: areaName,
            label: areaName
          }));
        }

        setAreas(areaOptions);

        // Update selectedOption if there's an initial area value
        if (area) {
          const matchedOption = areaOptions.find(a => a.value === area);
          setSelectedOption(matchedOption);
        } else {
          setSelectedOption(null);
        }
      } catch (error) {
        console.error('Failed to fetch areas:', error);
        setAreas([]);
        setSelectedOption(null);
      }
    };

    fetchAreas();
  }, [selectedCityName, area]);

  // If user selects from dropdown or clears selection
  const handleChange = (option) => {
    setSelectedOption(option);
    if (onAreaChange) {
      onAreaChange(option ? option.value : ''); // Pass only the selected value
    }
  };
  

  // If user types a new (custom) area
  const handleCreateOption = (inputValue) => {
    // Create a new option
    const newOption = { value: inputValue, label: inputValue };
    // Add it to the list of areas
    setAreas(prev => [...prev, newOption]);
    // Select it right away
    setSelectedOption(newOption);

    // Notify parent
    if (onAreaChange) {
      onAreaChange(inputValue);
    }
  };

  return (
    <>
      <Label htmlFor="area-select">District / Area  {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <StyledSelectWrapper>
        <CreatableSelect
          id="area-select"
          value={selectedOption}
          onChange={handleChange}
          onCreateOption={handleCreateOption}
          options={areas}
          placeholder="Type or select a district/area"
          isClearable={true}
          isSearchable={true}
          required={isRequired}
        />
      </StyledSelectWrapper>
    </>
  );
}

export default DistrictSelect;
