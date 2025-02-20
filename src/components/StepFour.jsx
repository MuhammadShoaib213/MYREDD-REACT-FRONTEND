import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bgImage from "../images/bg.jpg";
import { getCountryCallingCode } from "libphonenumber-js";
import axios from "axios";

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
  max-width: 800px; // Adjust width if needed
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
  font-size: 16px;
  cursor: pointer;
`;

// Radio and Checkbox input styling
const Checkbox = styled.input`
  accent-color: #ff0000;
  margin-right: 10px;
  transform: scale(1.5);
`;

// Button styling
const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid #d3d3d3;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid #d3d3d3;
  border-radius: 5px;
`;

const BoldLabel = styled.h4`
  font-size: 1rem; /* Small font size */
  font-weight: bold; /* Bold text */
  color: #333; /* Dark text color, adjust as needed */
  margin: 0 0 10px 0; /* Spacing below the heading */
`;

const StepFour = ({ formData, prevStep, handleChange, handleSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [unit, setUnit] = useState("feet"); // Default to feet
  const [totalSize, setTotalSize] = useState(0);
  const [coveredTotalSize, setCoveredTotalSize] = useState(0);
  const [landTotalSize, setLandTotalSize] = useState(0);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotalSize = () => {
    const length = parseFloat(formData.length || 0);
    const width = parseFloat(formData.width || 0);

    let total = length * width;

    // Convert based on selected unit
    switch (unit) {
      case "meters":
        total = total * 0.092903; // Conversion from square feet to square meters
        break;
      case "yards":
        total = total * 0.111111; // Conversion from square feet to square yards
        break;
      default:
        // No conversion needed for feet
        break;
    }

    setTotalSize(total.toFixed(2)); // Set the calculated total size
  };

  // Use useEffect to recalculate whenever necessary fields change
  useEffect(() => {
    calculateTotalSize();
  }, [formData.length, formData.width, unit]);

  // Function to calculate total size for Covered Area
  const calculateCoveredTotalSize = () => {
    const length = parseFloat(formData.length || 0);
    const width = parseFloat(formData.width || 0);

    let total = length * width;

    switch (unit) {
      case "meters":
        total *= 0.092903;
        break;
      case "yards":
        total *= 0.111111;
        break;
      default:
        break;
    }

    setCoveredTotalSize(total.toFixed(2));
  };

  // Function to calculate total size for Land Area
  const calculateLandTotalSize = () => {
    const length = parseFloat(formData.landlength || 0);
    const width = parseFloat(formData.landwidth || 0);

    let total = length * width;

    switch (unit) {
      case "meters":
        total *= 0.092903;
        break;
      case "yards":
        total *= 0.111111;
        break;
      default:
        break;
    }

    setLandTotalSize(total.toFixed(2));
  };

  // Recalculate on formData or unit change
  React.useEffect(() => {
    calculateCoveredTotalSize();
    calculateLandTotalSize();
  }, [formData, unit]);

  const handleFileChange = (e) => {
    const { files, name } = e.target;

    // Convert FileList to array
    const fileArray = Array.from(files);

    // Use handleChange to update the form data with the file array
    handleChange(name)({ target: { name, value: fileArray } });

    console.log(`Files for ${name} updated:`, fileArray); // Debugging to ensure files are correctly captured
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetch("http://api.geonames.org/countryInfoJSON?username=shoaib1")
      .then((response) => response.json())
      .then((data) => setCountries(data.geonames))
      .catch((error) => console.error("Failed to fetch countries:", error));
  }, []);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    handleChange("country")({
      target: { name: "country", value: countryCode },
    });
    if (countryCode) {
      fetch(
        `http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`
      )
        .then((response) => response.json())
        .then((data) => {
          setCities(data.geonames);
          setNeighborhoods([]);
        })
        .catch((error) => console.error("Failed to fetch cities", error));
    } else {
      setCities([]);
      setNeighborhoods([]);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    handleChange("city")({ target: { name: "city", value: city } });
    const selectedCity = cities.find((c) => c.name === city);
    if (selectedCity) {
      const latitude = selectedCity.lat;
      const longitude = selectedCity.lng;
      axios
        .get(" http://localhost:6003/api/neighborhoods", {
          params: {
            latitude: latitude,
            longitude: longitude,
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(response.data);
          if (data.results) {
            setNeighborhoods(
              data.results.map((neighborhood) => ({
                name: neighborhood.name,
                placeId: neighborhood.place_id,
              }))
            );
          }
        })
        .catch((error) =>
          console.error("Failed to fetch neighborhoods", error)
        );
    } else {
      setNeighborhoods([]);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              ` http://localhost:6003/api/address/reverse-geocode?lat=${latitude}&lng=${longitude}`
            );
            const data = await response.json();

            if (response.ok) {
              const detectedAddress = data.address;
              setAddress(detectedAddress);
            } else {
              setError(data.error || "Error fetching address");
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setError("Error fetching address");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
          setError("Error obtaining location");
          setLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  };

  // // Render fields based on inquiry type selected in previous steps
  // const renderFields = () => {
  //   const { inquiryType } = formData;
  //   const { propertySubType } = formData;
  //   return (
  //     <>
  //       {inquiryType.forPurchase && renderForPurchaseFields()}
  //       {inquiryType.forSale && renderForSaleFields()}
  //       {inquiryType.forRent && renderForRentFields()}
  //       {inquiryType.onRent && renderOnRentFields()}
  //     </>
  //   );
  // };

  const renderFields = () => {
    const { inquiryType, propertySubType } = formData;

    return (
      <>
        {inquiryType.forPurchase &&
          propertySubType.home &&
          renderForPurchaseHomeFields()}
        {inquiryType.forPurchase &&
          propertySubType.apartment &&
          renderForPurchaseApartmentFields()}
        {inquiryType.forPurchase &&
          propertySubType.villas &&
          renderForPurchaseVillasFields()}
        {inquiryType.forPurchase &&
          propertySubType.farmHouse &&
          renderForPurchaseFarmHouseFields()}
        {inquiryType.forPurchase &&
          propertySubType.office &&
          renderForPurchaseOfficeFields()}
        {inquiryType.forPurchase &&
          propertySubType.shop &&
          renderForPurchaseShopFields()}
        {inquiryType.forPurchase &&
          propertySubType.warehouse &&
          renderForPurchaseWarehouseFields()}
        {inquiryType.forPurchase &&
          propertySubType.factory &&
          renderForPurchaseFactoryFields()}

        {inquiryType.forSale &&
          propertySubType.home &&
          renderForSaleHomeFields()}
        {inquiryType.forSale &&
          propertySubType.apartment &&
          renderForSaleApartmentFields()}
        {inquiryType.forSale &&
          propertySubType.villas &&
          renderForSaleVillasFields()}
        {inquiryType.forSale &&
          propertySubType.farmHouse &&
          renderForSaleFarmHouseFields()}
        {inquiryType.forSale &&
          propertySubType.office &&
          renderForSaleOfficeFields()}
        {inquiryType.forSale &&
          propertySubType.shop &&
          renderForSaleShopFields()}
        {inquiryType.forSale &&
          propertySubType.warehouse &&
          renderForSaleWarehouseFields()}
        {inquiryType.forSale &&
          propertySubType.factory &&
          renderForSaleFactoryFields()}

        {inquiryType.forRent &&
          propertySubType.home &&
          renderForRentHomeFields()}
        {inquiryType.forRent &&
          propertySubType.apartment &&
          renderForRentApartmentFields()}
        {inquiryType.forRent &&
          propertySubType.villas &&
          renderForRentVillasFields()}
        {inquiryType.forRent &&
          propertySubType.farmHouse &&
          renderForRentFarmHouseFields()}
        {inquiryType.forRent &&
          propertySubType.office &&
          renderForRentOfficeFields()}
        {inquiryType.forRent &&
          propertySubType.shop &&
          renderForRentShopFields()}
        {inquiryType.forRent &&
          propertySubType.warehouse &&
          renderForRentWarehouseFields()}
        {inquiryType.forRent &&
          propertySubType.factory &&
          renderForRentFactoryFields()}

        {inquiryType.onRent && propertySubType.home && renderOnRentHomeFields()}
        {inquiryType.onRent &&
          propertySubType.apartment &&
          renderOnRentApartmentFields()}
        {inquiryType.onRent &&
          propertySubType.villas &&
          renderOnRentVillasFields()}
        {inquiryType.onRent &&
          propertySubType.farmHouse &&
          renderOnRentFarmHouseFields()}
        {inquiryType.onRent &&
          propertySubType.office &&
          renderOnRentOfficeFields()}
        {inquiryType.onRent && propertySubType.shop && renderOnRentShopFields()}
        {inquiryType.onRent &&
          propertySubType.warehouse &&
          renderOnRentWarehouseFields()}
        {inquiryType.onRent &&
          propertySubType.factory &&
          renderOnRentFactoryFields()}

        {inquiryType.forPurchase &&
          propertySubType.residential &&
          renderForPurchaseResidentialFields()}
        {inquiryType.forSale &&
          propertySubType.residential &&
          renderForSaleResidentialFields()}
        {inquiryType.forRent &&
          propertySubType.residential &&
          renderForRentResidentialFields()}
        {inquiryType.onRent &&
          propertySubType.residential &&
          renderOnRentResidentialFields()}

        {inquiryType.forPurchase &&
          propertySubType.commercial &&
          renderForPurchaseCommercialFields()}
        {inquiryType.forSale &&
          propertySubType.commercial &&
          renderForSaleCommercialFields()}
        {inquiryType.forRent &&
          propertySubType.commercial &&
          renderForRentCommercialFields()}
        {inquiryType.onRent &&
          propertySubType.commercial &&
          renderOnRentCommercialFields()}

        {inquiryType.forPurchase &&
          propertySubType.industrial &&
          renderForPurchaseIndustrialFields()}
        {inquiryType.forSale &&
          propertySubType.industrial &&
          renderForSaleIndustrialFields()}
        {inquiryType.forRent &&
          propertySubType.industrial &&
          renderForRentIndustrialFields()}
        {inquiryType.onRent &&
          propertySubType.industrial &&
          renderOnRentIndustrialFields()}

        {inquiryType.forPurchase &&
          propertySubType.agriculture &&
          renderForPurchaseAgricultureFields()}
        {inquiryType.forSale &&
          propertySubType.agriculture &&
          renderForSaleAgricultureFields()}
        {inquiryType.forRent &&
          propertySubType.agriculture &&
          renderForRentAgricultureFields()}
        {inquiryType.onRent &&
          propertySubType.agriculture &&
          renderOnRentAgricultureFields()}
      </>
    );
  };

  // Render functions for each property type
  const renderForPurchaseHomeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        // required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="number"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="number"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="number"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
        min={new Date().toISOString().split("T")[0]} // This restricts past dates
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
        min={new Date().toISOString().split("T")[0]} // This restricts past dates
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  // Render functions for each property type
  const renderForPurchaseApartmentFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  // Render functions for each property type
  const renderForPurchaseVillasFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  // Render functions for each property type
  const renderForPurchaseFarmHouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  // Render functions for each property type
  const renderForPurchaseOfficeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  // Render functions for each property type
  const renderForPurchaseWarehouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
    </>
  );

  const renderForPurchaseResidentialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />
    </>
  );

  const renderForPurchaseCommercialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />
    </>
  );

  const renderForPurchaseIndustrialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />
    </>
  );

  const renderForPurchaseAgricultureFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />
    </>
  );

  // Render functions for each property type
  const renderForPurchaseShopFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  // Render functions for each property type
  const renderForPurchaseFactoryFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange("budget")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input
        id="timeForPayment"
        name="timeForPayment"
        type="date"
        value={formData.timeForPayment}
        onChange={handleChange("timeForPayment")}
      />

      <Label htmlFor="closingDate">Closing Date</Label>
      <Input
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate}
        onChange={handleChange("closingDate")}
      />

      <Label htmlFor="expected">Expected %</Label>
      <Input
        id="expected"
        name="expected"
        value={formData.expected}
        onChange={handleChange("expected")}
      />

      <Label htmlFor="commission">Commission%</Label>
      <Input
        id="commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange("commission")}
      />
    </>
  );

  const renderForSaleHomeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>
      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  const renderForSaleApartmentFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  const renderForSaleVillasFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  const renderForSaleFarmHouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  const renderForSaleOfficeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  const renderForSaleShopFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

  const renderForSaleWarehouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />
      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
    </>
  );

  const renderForSaleFactoryFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
    </>
  );

  const renderForSaleCommercialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
    </>
  );

  const renderForSaleIndustrialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
    </>
  );

  const renderForSaleAgricultureFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      {/* <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange("status")}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select> */}

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemand")}
      />
    </>
  );

  const renderForRentHomeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentApartmentFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentVillasFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentFarmHouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentOfficeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>

      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentShopFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentWarehouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>

      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentFactoryFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>

      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForSaleResidentialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentResidentialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentCommercialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentIndustrialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderForRentAgricultureFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      {/* New unit dropdown */}
      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      {/* Display calculated total size */}
      <Label htmlFor="totalSize">Total Size ({unit})</Label>
      <Input
        id="totalSize"
        name="totalSize"
        type="text"
        value={totalSize}
        readOnly // This field is read-only as it displays calculated value
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input
        id="rentOutTime"
        name="rentOutTime"
        type="date"
        value={formData.rentOutTime}
        onChange={handleChange("rentOutTime")}
      />

      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input
        id="budgetPerMonth"
        name="budgetPerMonth"
        type="text"
        value={formData.budgetPerMonth}
        onChange={handleChange("budgetPerMonth")}
      />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input
        id="advancePayment"
        name="advancePayment"
        type="text"
        value={formData.advancePayment}
        onChange={handleChange("advancePayment")}
      />

      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input
        id="contractTime"
        name="contractTime"
        type="date"
        value={formData.contractTime}
        onChange={handleChange("contractTime")}
      />
    </>
  );

  const renderOnRentHomeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentApartmentFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentVillasFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentFarmHouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={handleChange("bedrooms")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox
          id="garden"
          name="garden"
          type="checkbox"
          checked={formData.features.garden}
          onChange={(e) => handleChange("features", "garden")(e)}
        />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox
          id="nearMasjid"
          name="nearMasjid"
          type="checkbox"
          checked={formData.features.nearMasjid}
          onChange={handleChange("nearMasjid")}
        />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentOfficeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentShopFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentWarehouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      {/* Checkbox Features */}
      <div>
        <Checkbox
          id="garage"
          name="garage"
          type="checkbox"
          checked={formData.features.garage}
          onChange={(e) => handleChange("features", "garage")(e)}
        />
        <Label htmlFor="garage">Parking</Label>
      </div>
      <div>
        <Checkbox
          id="mainRoad"
          name="mainRoad"
          type="checkbox"
          checked={formData.features.mainRoad}
          onChange={(e) => handleChange("features", "mainRoad")(e)}
        />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentFactoryFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentResidentialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentCommercialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentIndustrialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="streetNumber">Street Name/Number</Label>
      <Input
        id="streetNumber"
        name="streetNumber"
        value={formData.streetNumber}
        onChange={handleChange("streetNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  const renderOnRentAgricultureFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
      <Select
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </option>
        ))}
      </Select>

      <Label htmlFor="city">City</Label>
      <Select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="neighborhood">Dstricts/Towns</Label>
      <Select
        id="neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange("neighborhood")}
        required
      >
        <option value="">Select Dstricts/Towns</option>
        {neighborhoods.map((n) => (
          <option key={n.placeId} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="area">Area/Society</Label>
      <Input
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange("area")}
      />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input
        id="phaseBlock"
        name="phaseBlock"
        value={formData.phaseBlock}
        onChange={handleChange("phaseBlock")}
      />

      <div>
        <Button onClick={getCurrentLocation}>Detect Address</Button>
        {loading && <p>Detecting your location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && <p>Your Address: {address}</p>}
      </div>

      <Label htmlFor="houseNumber">Property Number</Label>
      <Input
        id="houseNumber"
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange("houseNumber")}
      />

      <Label htmlFor="coordinates">Coordinates</Label>
      <Input
        id="coordinates"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleChange("coordinates")}
      />

      <Label htmlFor="priority">Priority</Label>
      <Select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange("priority")}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <br />
      <br />
      <BoldLabel>Covered Area</BoldLabel>
      <Label htmlFor="length">Depth</Label>
      <Input
        id="length"
        name="length"
        type="text"
        value={formData.length}
        onChange={handleChange("length")}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        id="width"
        name="width"
        type="text"
        value={formData.width}
        onChange={handleChange("width")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="coveredTotalSize">
        Total Size (Covered Area - {unit})
      </Label>
      <Input
        id="coveredTotalSize"
        name="coveredTotalSize"
        type="text"
        value={coveredTotalSize}
        readOnly
      />

      <br />
      <br />

      <BoldLabel>Land Area</BoldLabel>
      <Label htmlFor="landlength">Depth</Label>
      <Input
        id="landlength"
        name="landlength"
        type="text"
        value={formData.landlength}
        onChange={handleChange("landlength")}
      />

      <Label htmlFor="landwidth">Width</Label>
      <Input
        id="landwidth"
        name="landwidth"
        type="text"
        value={formData.landwidth}
        onChange={handleChange("landwidth")}
      />

      <Label htmlFor="unit">Unit</Label>
      <Select
        id="unit"
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="meters">Meters</option>
        <option value="yards">Yards</option>
      </Select>

      <Label htmlFor="landTotalSize">Total Size (Land Area - {unit})</Label>
      <Input
        id="landTotalSize"
        name="landTotalSize"
        type="text"
        value={landTotalSize}
        readOnly
      />

      <Label htmlFor="images">
        Upload a photos of property Front (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="images">
        Upload atleast 3 photos of property (JPG/PNG)
      </Label>
      <Input
        id="images"
        name="images"
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input
        id="actualDemand"
        name="actualDemand"
        type="text"
        value={formData.actualDemand}
        onChange={handleChange("actualDemand")}
      />

      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input
        id="dealerDemand"
        name="dealerDemand"
        type="text"
        value={formData.dealerDemand}
        onChange={handleChange("dealerDemands")}
      />
    </>
  );

  return (
    <Container>
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "30px", textAlign: "center" }}>
            Step 4: Detailed Inquiry Information
          </h2>
          {renderFields()}
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Submit Inquiry</Button>
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default StepFour;
