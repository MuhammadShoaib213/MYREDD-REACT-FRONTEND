import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

const StyledSelectWrapper = styled.div`
  padding: 10px 0;
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

function CitySelect({ selectedCountry, city, onCityChange, isRequired = false }) {
  const [cities, setCities] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Only fetch if the selectedCountry is PK
    if (selectedCountry === 'PK') {
      fetch('/api/places/cities')
        .then((response) => response.json())
        .then((data) => {
          // Map the data into React-Select options
          const cityOptions = data.map((cityName) => ({
            value: cityName,
            label: cityName,
          }));

          // If there's already a city set from the parent,
          // ensure it is included in the local cityOptions
          if (city) {
            const matchedOption = cityOptions.find((opt) => opt.value === city);
            // If not found, add it
            if (!matchedOption) {
              cityOptions.push({ value: city, label: city });
            }
          }

          // Update the local list of cities
          setCities(cityOptions);

          // Set the selected option based on the `city` prop
          const finalOption = cityOptions.find((opt) => opt.value === city);
          setSelectedOption(finalOption || null);
        })
        .catch((error) => console.error('Failed to fetch cities:', error));
    } else {
      // If a different country is selected, clear everything
      setCities([]);
      setSelectedOption(null);
    }
    // Rerun if `selectedCountry` or `city` changes
  }, [selectedCountry, city]);

  // Handle selection of a city from the dropdown
  const handleChange = (option) => {
    setSelectedOption(option);
    onCityChange({
      target: {
        name: 'city',
        value: option ? option.value : '',
      },
    });
  };

  // Handle creation of a new city option
  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    // Add this new option to our city list
    setCities((prevCities) => [...prevCities, newOption]);
    // Select it immediately
    setSelectedOption(newOption);

    // Notify the parent
    onCityChange({
      target: {
        name: 'city',
        value: inputValue,
      },
    });
  };

  return (
    <>
      <Label htmlFor="cityInput"> City{isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <StyledSelectWrapper>
        <CreatableSelect
          id="cityInput"
          value={selectedOption}
          onChange={handleChange}
          onCreateOption={handleCreateOption}
          options={cities}
          placeholder="Type or select a city"
          isClearable
          isSearchable
          required={isRequired}
        />
      </StyledSelectWrapper>
    </>
  );
}

export default CitySelect;
