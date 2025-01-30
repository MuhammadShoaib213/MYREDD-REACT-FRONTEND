import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

// Styled wrapper to add padding
const StyledSelectWrapper = styled.div`
  padding: 10px 0; // Suitable top and bottom padding
`;

const CountrySelect = ({ selectedCountry, onCountryChange, isRequired = false }) => {
  const [countries, setCountries] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetch("http://api.geonames.org/countryInfoJSON?username=shoaib1")
      .then(response => response.json())
      .then(data => {
        const countryOptions = data.geonames.map(country => ({
          value: country.countryCode,
          label: country.countryName
        }));
        setCountries(countryOptions);
        setSelectedOption(countryOptions.find(c => c.value === selectedCountry));
      })
      .catch(error => console.error("Failed to fetch countries:", error));
  }, [selectedCountry]);

  const handleChange = (option) => {
    setSelectedOption(option);
    onCountryChange({
      target: {
        name: 'country',
        value: option.value
      }
    });
  };

  return (
    <StyledSelectWrapper>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={countries}
        placeholder="Select Country"
        required={isRequired}
      />
    </StyledSelectWrapper>
  );
};

export default CountrySelect;
