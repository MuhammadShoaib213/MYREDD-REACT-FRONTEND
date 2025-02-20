import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationAutocomplete = () => {
  // -------------------- City Level --------------------
  const [cityInput, setCityInput] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState(''); // e.g., "Lahore, Punjab, Pakistan"
  const [selectedCityPlaceId, setSelectedCityPlaceId] = useState('');
  const [cityDetails, setCityDetails] = useState(null); // geometry, etc.

  // -------------------- Municipality Level (Level 1) --------------------
  const [municipalities, setMunicipalities] = useState([]); // from /municipalities
  const [selectedMunicipality, setSelectedMunicipality] = useState(null); // user picks

  // -------------------- Sub-Municipality Level (Level 2) --------------------
  const [subMunicipalities, setSubMunicipalities] = useState([]);
  const [selectedSubMunicipality, setSelectedSubMunicipality] = useState(null);

  // -------------------- Drilldown Level (Level 3) --------------------
  const [drilldownResults, setDrilldownResults] = useState([]); // from /drilldown

  // ========================================================
  // 1) City Autocomplete
  // ========================================================
  useEffect(() => {
    const fetchCitySuggestions = async () => {
      if (cityInput.length < 3) {
        setCitySuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          ` http://localhost:6003/api/places/autocomplete/${cityInput}`
        );
        setCitySuggestions(res.data);
      } catch (error) {
        console.error('Error fetching city autocomplete:', error);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (cityInput) {
        fetchCitySuggestions();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [cityInput]);

  const handleSelectCity = (prediction) => {
    setCityInput(prediction.description);
    setSelectedCityName(prediction.description);
    setSelectedCityPlaceId(prediction.place_id);
    setCitySuggestions([]);
  };

  // ========================================================
  // 2) Once city selected -> fetch city details + municipalities
  // ========================================================
  useEffect(() => {
    const fetchCityDetailsAndMunicipalities = async () => {
      if (!selectedCityPlaceId) return;
      try {
        // (A) optional: city details for lat/lng
        const detailsRes = await axios.get(
          ` http://localhost:6003/api/places/details/${selectedCityPlaceId}`
        );
        setCityDetails(detailsRes.data);

        // (B) fetch municipality areas: "towns in <city>"
        //   or you can pass query=societies in the params if you want
        const muniRes = await axios.get(
          ` http://localhost:6003/api/places/municipalities`,
          {
            params: {
              city: selectedCityName,
              // query: 'societies' // optional override
            },
          }
        );
        setMunicipalities(muniRes.data);
        setSelectedMunicipality(null);
        setSubMunicipalities([]);
        setSelectedSubMunicipality(null);
        setDrilldownResults([]);
      } catch (error) {
        console.error('Error fetching city details/municipalities:', error);
      }
    };

    fetchCityDetailsAndMunicipalities();
  }, [selectedCityPlaceId, selectedCityName]);

  // ========================================================
  // 3) User picks a municipality -> fetch submunicipalities
  // ========================================================
  const handleSelectMunicipality = (municipality) => {
    setSelectedMunicipality(municipality);
    setSubMunicipalities([]);
    setSelectedSubMunicipality(null);
    setDrilldownResults([]);
  };

  useEffect(() => {
    const fetchSubMunicipalities = async () => {
      if (!selectedMunicipality) return;

      // e.g. "Johar Town Lahore, Punjab, Pakistan"
      // If the municipality has a .name, combine it with the city name
      const parentName = `${selectedMunicipality.name || selectedMunicipality.formatted_address} ${selectedCityName}`.trim();

      try {
        const res = await axios.get(` http://localhost:6003/api/places/submunicipalities`, {
          params: {
            parent: parentName,
            // query: 'phases' or 'blocks' etc. (default = "blocks")
          },
        });
        setSubMunicipalities(res.data);
      } catch (error) {
        console.error('Error fetching submunicipalities:', error);
      }
    };

    fetchSubMunicipalities();
  }, [selectedMunicipality, selectedCityName]);

  // ========================================================
  // 4) User picks a subMunicipality -> fetch deeper level (drilldown)
  // ========================================================
  const handleSelectSubMunicipality = (sub) => {
    setSelectedSubMunicipality(sub);
    setDrilldownResults([]);
  };

  useEffect(() => {
    const fetchDrilldown = async () => {
      if (!selectedSubMunicipality) return;

      // e.g. "Block A Johar Town Lahore"
      const parentName = `${selectedSubMunicipality.name || selectedSubMunicipality.formatted_address} ${selectedCityName}`.trim();

      try {
        const res = await axios.get(` http://localhost:6003/api/places/drilldown`, {
          params: {
            parent: parentName,
            // query: 'streets' or 'sub-blocks' etc. (default = "streets")
          },
        });
        setDrilldownResults(res.data);
      } catch (error) {
        console.error('Error fetching drilldown:', error);
      }
    };

    fetchDrilldown();
  }, [selectedSubMunicipality, selectedCityName]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>3-Level Hierarchy: City - Municipality - SubMunicipality - Drilldown</h2>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {/* City Input + Autocomplete */}
      <div>
        <input
          type="text"
          placeholder="Type a city, e.g. Lahore"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          style={{ width: '300px', padding: '8px' }}
        />
        {citySuggestions.length > 0 && (
          <ul
            style={{
              width: '300px',
              border: '1px solid #ccc',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              cursor: 'pointer',
            }}
          >
            {citySuggestions.map((sug, idx) => (
              <li
                key={idx}
                style={{ padding: '8px' }}
                onClick={() => handleSelectCity(sug)}
              >
                {sug.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Optional: City Details (lat/lng) */}
      {cityDetails && cityDetails.geometry && (
        <div style={{ marginTop: '20px' }}>
          <h4>City Details</h4>
          <p>
            lat: {cityDetails.geometry.location.lat}, lng: {cityDetails.geometry.location.lng}
          </p>
        </div>
      )}

      {/* Level 1: Municipalities in City */}
      {municipalities.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Municipalities in {selectedCityName}</h3>
          <p>Total: {municipalities.length}</p>
          <ul style={{ cursor: 'pointer' }}>
            {municipalities.map((m, i) => (
              <li key={i} onClick={() => handleSelectMunicipality(m)}>
                {m.name || m.formatted_address}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Level 2: Sub-Municipalities */}
      {subMunicipalities.length > 0 && selectedMunicipality && (
        <div style={{ marginTop: '20px' }}>
          <h3>Sub-Municipalities in {selectedMunicipality.name || selectedMunicipality.formatted_address}</h3>
          <p>Total: {subMunicipalities.length}</p>
          <ul style={{ cursor: 'pointer' }}>
            {subMunicipalities.map((sub, idx) => (
              <li key={idx} onClick={() => handleSelectSubMunicipality(sub)}>
                {sub.name || sub.formatted_address}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Level 3: Drilldown results */}
      {drilldownResults.length > 0 && selectedSubMunicipality && (
        <div style={{ marginTop: '20px' }}>
          <h3>Deeper areas in {selectedSubMunicipality.name || selectedSubMunicipality.formatted_address}</h3>
          <p>Total: {drilldownResults.length}</p>
          <ul>
            {drilldownResults.map((item, index) => (
              <li key={index}>{item.name || item.formatted_address}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
