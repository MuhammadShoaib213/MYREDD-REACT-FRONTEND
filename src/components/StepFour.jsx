// import React from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const Form = styled.form`
//   width: 100%;
//   max-width: 800px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 5px 0;
//   border: 2px solid #D3D3D3;
//   border-radius: 5px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin: 5px 0;
//   border: 2px solid #D3D3D3;
//   border-radius: 5px;
// `;

// const Checkbox = styled.input`
//   margin-right: 10px;
// `;

// const Label = styled.label`
//   font-size: 16px;
//   margin-bottom: 5px;
//   display: flex;
//   align-items: center;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #FF0000;
//   color: white;
//   border: none;
//   border-radius: 10px;
//   margin-top: 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: #D3D3D3;
//   }
// `;

// const StepFour = ({ formData, handleChange, handleSubmit }) => {
//   const { inquiryType } = formData;

//   const handleFileChange = (e) => {
//     const { files, name } = e.target;
//     handleChange(name)({ target: { name, value: files } });
//   };
//   const renderForPurchaseFields = () => (
//     <>
//       <Label htmlFor="city">City</Label>
//       <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
//         <option value="">Select City</option>
//         <option value="">Lahore</option>
//         <option value="">Karachi</option>
//         <option value="">Islamabad</option>
//         {/* Add more city options as necessary */}
//       </Select>

//       <Label htmlFor="area">Area/Society</Label>
//       <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

//       <Label htmlFor="phaseBlock">Phase/Block</Label>
//       <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />


//       <Label htmlFor="category">Category</Label>
//       <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
//         <option value="">Select Category</option>
//         {/* Add more category options as necessary */}
//       </Select>

//       <Label htmlFor="bedrooms">Bedrooms</Label>
//       <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />

//       <Label htmlFor="budget">Budget</Label>
//       <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

//       <Label htmlFor="advancePayment">Advance Payment</Label>
//       <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

//       <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
//       <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />


//       {/* Checkbox Features */}
//       <div>
//         <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
//         <Label htmlFor="garage">Garage</Label>
//       </div>
//       <div>
//         <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
//         <Label htmlFor="garden">Garden</Label>
//       </div>
//       <div>
//         <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
//         <Label htmlFor="mainRoad">Main Road</Label>
//       </div>
//       <div>
//         <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
//         <Label htmlFor="nearMasjid">Near Masjid</Label>
//       </div>
//     </>
//   );

//   const renderForSaleFields = () => (
//     <>
//       <Label htmlFor="city">City</Label>
//       <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
//         <option value="">Select City</option>
//         <option value="">Lahore</option>
//         <option value="">Karachi</option>
//         <option value="">Islamabad</option>
//         {/* Add more city options as necessary */}
//       </Select>
  
//       <Label htmlFor="area">Area/Society</Label>
//       <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
//       <Label htmlFor="phaseBlock">Phase/Block</Label>
//       <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
//       <Label htmlFor="category">Category</Label>
//       <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
//         <option value="">Select Category</option>
//         {/* Add more category options as necessary */}
//       </Select>
  
//       <Label htmlFor="houseNumber">House Number</Label>
//       <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
//       <Label htmlFor="streetNumber">Street Number</Label>
//       <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
//       <Label htmlFor="coordinates">Coordinates</Label>
//       <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
//       <Label htmlFor="searchMap">Search on Map</Label>
//       {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
//       <Label htmlFor="dimensions">Dimensions</Label>
//       <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
//       <Label htmlFor="specialFeatures">Special Features</Label>
//       <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
//       <Label htmlFor="images">Images</Label>
//       <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
//       <Label htmlFor="status">Status</Label>
//       <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
//         <option value="">Select Status</option>
//         <option value="Active">Active</option>
//         <option value="Pending">Pending</option>
//         <option value="Sold">Sold</option>
//       </Select>
  
//       <Label htmlFor="actualDemand">Actual Demand</Label>
//       <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
//       <Label htmlFor="dealerDemand">Dealer Demand</Label>
//       <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
//     </>
//   );
  

//   const renderForRentFields = () => (
//     <>
//       <Label htmlFor="city">City</Label>
//       <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
//         <option value="">Select City</option>
//         {/* Add more city options as necessary */}
//       </Select>
  
//       <Label htmlFor="area">Area/Society</Label>
//       <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
//       <Label htmlFor="phaseBlock">Phase/Block</Label>
//       <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
//       <Label htmlFor="category">Category</Label>
//       <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
//         <option value="">Select Category</option>
//         {/* Add more category options as necessary */}
//       </Select>
  
//       <Label htmlFor="bedrooms">Bedrooms</Label>
//       <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
  
//       {/* Checkbox Features */}
//       <div>
//         <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
//         <Label htmlFor="garage">Garage</Label>
//       </div>
//       <div>
//         <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
//         <Label htmlFor="garden">Garden</Label>
//       </div>
//       <div>
//         <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
//         <Label htmlFor="mainRoad">Main Road</Label>
//       </div>
//       <div>
//         <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
//         <Label htmlFor="nearMasjid">Near Masjid</Label>
//       </div>
  
//       <Label htmlFor="rentOutTime">When to Rent Out</Label>
//       <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
//       <Label htmlFor="budgetPerMonth">Budget per Month</Label>
//       <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
//       <Label htmlFor="advancePayment">Advance Payment</Label>
//       <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
//       <Label htmlFor="contractTime">Contract Time for Rental</Label>
//       <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
//     </>
//   );
  

//   const renderOnRentFields = () => (
//     <>
//       <Label htmlFor="city">City</Label>
//       <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
//         <option value="">Select City</option>
//         {/* Add more city options as necessary */}
//       </Select>
  
//       <Label htmlFor="area">Area/Society</Label>
//       <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
//       <Label htmlFor="phaseBlock">Phase/Block</Label>
//       <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
//       <Label htmlFor="category">Category</Label>
//       <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
//         <option value="">Select Category</option>
//         {/* Add more category options as necessary */}
//       </Select>
  
//       <Label htmlFor="houseNumber">House Number</Label>
//       <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
//       <Label htmlFor="streetNumber">Street Number</Label>
//       <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
//       <Label htmlFor="coordinates">Coordinates</Label>
//       <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
//       <Label htmlFor="searchMap">Search on Map</Label>
//       {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
//       <Label htmlFor="dimensions">Dimensions</Label>
//       <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
//       <Label htmlFor="specialFeatures">Special Features</Label>
//       <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
//       <Label htmlFor="images">Images</Label>
//       <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
//       <Label htmlFor="status">Status</Label>
//       <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
//         <option value="">Select Status</option>
//         <option value="Active">Active</option>
//         <option value="Pending">Pending</option>
//         <option value="Rented Out">Rented Out</option>
//       </Select>
  
//       <Label htmlFor="actualDemand">Actual Demand</Label>
//       <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
//       <Label htmlFor="dealerDemand">Dealer Demand</Label>
//       <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
//     </>
//   );
  

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <h2>Step 4: Detailed Inquiry Information</h2>
//         {inquiryType.forPurchase && renderForPurchaseFields()}
//         {inquiryType.forSale && renderForSaleFields()}
//         {inquiryType.forRent && renderForRentFields()}
//         {inquiryType.onRent && renderOnRentFields()}
//         <Button type="submit">Submit Inquiry</Button>
//       </Form>
//     </Container>
//   );
// };

// export default StepFour;






import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { getCountryCallingCode } from 'libphonenumber-js';
import axios from 'axios';

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
  max-width: 800px;  // Adjust width if needed
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
  accent-color: #FF0000;
  margin-right: 10px;
  transform: scale(1.5);
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid #D3D3D3;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid #D3D3D3;
  border-radius: 5px;
`;

const StepFour = ({ formData, handleChange, handleSubmit }) => {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);


  const handleFileChange = (e) => {
    const { files, name } = e.target;
    handleChange(name)({ target: { name, value: files } });
  };


   // Fetch countries on component mount
   useEffect(() => {
    fetch('http://api.geonames.org/countryInfoJSON?username=shoaib1')
      .then(response => response.json())
      .then(data => setCountries(data.geonames))
      .catch(error => console.error('Failed to fetch countries:', error));
  }, []);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    handleChange('country')({ target: { name: 'country', value: countryCode } });
    if (countryCode) {
      fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=shoaib1&cities=cities1000`)
        .then(response => response.json())
        .then(data => {
          setCities(data.geonames);
          setNeighborhoods([]);
        })
        .catch(error => console.error('Failed to fetch cities', error));
    } else {
      setCities([]);
      setNeighborhoods([]);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    handleChange('city')({ target: { name: 'city', value: city } });
    const selectedCity = cities.find(c => c.name === city);
    if (selectedCity) {
      const latitude = selectedCity.lat;
      const longitude = selectedCity.lng;
      axios.get('http://195.179.231.102:6003/api/neighborhoods', {
        params: {
          latitude: latitude,
          longitude: longitude
        }
      })
      .then(response => {
        const data = response.data;
        console.log(response.data);
        if (data.results) {
          setNeighborhoods(data.results.map(neighborhood => ({ name: neighborhood.name, placeId: neighborhood.place_id })));
        }
      })
      .catch(error => console.error('Failed to fetch neighborhoods', error));
    } else {
      setNeighborhoods([]);
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

        {inquiryType.forPurchase && propertySubType.home && renderForPurchaseHomeFields()}
        {inquiryType.forPurchase && propertySubType.apartment && renderForPurchaseApartmentFields()}
        {inquiryType.forPurchase && propertySubType.villas && renderForPurchaseVillasFields()}
        {inquiryType.forPurchase && propertySubType.farmHouse && renderForPurchaseFarmHouseFields()}
        {inquiryType.forPurchase && propertySubType.office && renderForPurchaseOfficeFields()}
        {inquiryType.forPurchase && propertySubType.shop && renderForPurchaseShopFields()}
        {inquiryType.forPurchase && propertySubType.warehouse && renderForPurchaseWarehouseFields()}
        {inquiryType.forPurchase && propertySubType.factory && renderForPurchaseFactoryFields()}


        {inquiryType.forSale && propertySubType.home && renderForSaleHomeFields()}
        {inquiryType.forSale && propertySubType.apartment && renderForSaleApartmentFields()}
        {inquiryType.forSale && propertySubType.villas && renderForSaleVillasFields()}
        {inquiryType.forSale && propertySubType.farmHouse && renderForSaleFarmHouseFields()}
        {inquiryType.forSale && propertySubType.office && renderForSaleOfficeFields()}
        {inquiryType.forSale && propertySubType.shop && renderForSaleShopFields()}
        {inquiryType.forSale && propertySubType.warehouse && renderForSaleWarehouseFields()}
        {inquiryType.forSale && propertySubType.factory && renderForSaleFactoryFields()}


        {inquiryType.forRent && propertySubType.home && renderForRentHomeFields()}
        {inquiryType.forRent && propertySubType.apartment && renderForRentApartmentFields()}
        {inquiryType.forRent && propertySubType.villas && renderForRentVillasFields()}
        {inquiryType.forRent && propertySubType.farmHouse && renderForRentFarmHouseFields()}
        {inquiryType.forRent && propertySubType.office && renderForRentOfficeFields()}
        {inquiryType.forRent && propertySubType.shop && renderForRentShopFields()}
        {inquiryType.forRent && propertySubType.warehouse && renderForRentWarehouseFields()}
        {inquiryType.forRent && propertySubType.factory && renderForRentFactoryFields()}


        {inquiryType.onRent && propertySubType.home && renderOnRentHomeFields()}
        {inquiryType.onRent && propertySubType.apartment && renderOnRentApartmentFields()}
        {inquiryType.onRent && propertySubType.villas && renderOnRentVillasFields()}
        {inquiryType.onRent && propertySubType.farmHouse && renderOnRentFarmHouseFields()}
        {inquiryType.onRent && propertySubType.office && renderOnRentOfficeFields()}
        {inquiryType.onRent && propertySubType.shop && renderOnRentShopFields()}
        {inquiryType.onRent && propertySubType.warehouse && renderOnRentWarehouseFields()}
        {inquiryType.onRent && propertySubType.factory && renderOnRentFactoryFields()}


            {inquiryType.forPurchase && propertySubType.residential && renderForPurchaseResidentialFields()}
            {inquiryType.forSale && propertySubType.residential && renderForSaleResidentialFields()}
            {inquiryType.forRent && propertySubType.residential && renderForRentResidentialFields()}
            {inquiryType.onRent && propertySubType.residential && renderOnRentResidentialFields()}


            {inquiryType.forPurchase && propertySubType.commercial && renderForPurchaseCommercialFields()}
            {inquiryType.forSale && propertySubType.commercial && renderForSaleCommercialFields()}
            {inquiryType.forRent && propertySubType.commercial && renderForRentCommercialFields()}
            {inquiryType.onRent && propertySubType.commercial && renderOnRentCommercialFields()}

     
            {inquiryType.forPurchase && propertySubType.industrial && renderForPurchaseIndustrialFields()}
            {inquiryType.forSale && propertySubType.industrial && renderForSaleIndustrialFields()}
            {inquiryType.forRent && propertySubType.industrial && renderForRentIndustrialFields()}
            {inquiryType.onRent && propertySubType.industrial && renderOnRentIndustrialFields()}


            {inquiryType.forPurchase && propertySubType.agriculture && renderForPurchaseAgricultureFields()}
            {inquiryType.forSale && propertySubType.agriculture && renderForSaleAgricultureFields()}
            {inquiryType.forRent && propertySubType.agriculture && renderForRentAgricultureFields()}
            {inquiryType.onRent && propertySubType.agriculture && renderOnRentAgricultureFields()}
      </>
    );
};

  // Render functions for each property type
  const renderForPurchaseHomeFields = () => (
    <>

            <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>

      {/* <Label htmlFor="city">City</Label>
      <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
  <option value="">Select City</option>
  <option value="Lahore">Lahore</option>
  <option value="Karachi">Karachi</option>
  <option value="Islamabad">Islamabad</option>
</Select> */}

      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
      <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
         Add more category options as necessary 
      </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
    <option value="">Select Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
</Select>

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />


      <Label htmlFor="length">Length (ft)</Label>
        <Input
            id="length"
            name="length"
            type="text"
            value={formData.length}
            onChange={handleChange('length')}
        />

        <Label htmlFor="width">Width (ft)</Label>
        <Input
            id="width"
            name="width"
            type="text"
            value={formData.width}
            onChange={handleChange('width')}
        />

      <Label htmlFor="budget">Budget</Label>
      <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

      <Label htmlFor="closingDate">Closing Date</Label>
        <Input
            id="closingDate"
            name="closingDate"
            type="date"
            value={formData.closingDate}
            onChange={handleChange('closingDate')}
        />

      <Label htmlFor="expected">Expected %</Label>
      <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

      <Label htmlFor="commission">Commission%</Label>
      <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

      {/* Checkbox Features */}
      <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );


  // Render functions for each property type
  const renderForPurchaseApartmentFields = () => (
    <>

            <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>

      {/* <Label htmlFor="city">City</Label>
      <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
  <option value="">Select City</option>
  <option value="Lahore">Lahore</option>
  <option value="Karachi">Karachi</option>
  <option value="Islamabad">Islamabad</option>
</Select> */}

      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
      <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
         Add more category options as necessary 
      </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
    <option value="">Select Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
</Select>

      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />


      <Label htmlFor="length">Length (ft)</Label>
        <Input
            id="length"
            name="length"
            type="text"
            value={formData.length}
            onChange={handleChange('length')}
        />

        <Label htmlFor="width">Width (ft)</Label>
        <Input
            id="width"
            name="width"
            type="text"
            value={formData.width}
            onChange={handleChange('width')}
        />

      <Label htmlFor="budget">Budget</Label>
      <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

      <Label htmlFor="closingDate">Closing Date</Label>
        <Input
            id="closingDate"
            name="closingDate"
            type="date"
            value={formData.closingDate}
            onChange={handleChange('closingDate')}
        />

      <Label htmlFor="expected">Expected %</Label>
      <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

      <Label htmlFor="commission">Commission%</Label>
      <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

      {/* Checkbox Features */}
      <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
    </>
  );

// Render functions for each property type
const renderForPurchaseVillasFields = () => (
  <>

          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />


    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div>
  </>
);


// Render functions for each property type
const renderForPurchaseFarmHouseFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />


    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div>
  </>
);


// Render functions for each property type
const renderForPurchaseOfficeFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    {/* <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
 */}

    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    {/* <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div> */}
  </>
);


// Render functions for each property type
const renderForPurchaseWarehouseFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    {/* <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} /> */}


    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    {/* <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div> */}
  </>
);


const renderForPurchaseResidentialFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    {/* <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} /> */}

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    {/* <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} /> */}


    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    {/* <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div> */}
  </>
);


const renderForPurchaseCommercialFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    {/* <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} /> */}

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    {/* <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} /> */}


    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    {/* <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div> */}
  </>
);


const renderForPurchaseIndustrialFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select>

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    {/* <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} /> */}

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    {/* <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} /> */}


    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    {/* <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div> */}
  </>
);


const renderForPurchaseAgricultureFields = () => (
  <>
          <Label htmlFor="country">Country</Label>
          <Select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
            ))}
          </Select>

          <Label htmlFor="city">City</Label>
          <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.geonameId} value={city.name}>{city.name}</option>
            ))}
          </Select>

          {/* <Label htmlFor="neighborhood">Neighborhood</Label>
          <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
            <option value="">Select Neighborhood</option>
            {neighborhoods.map(n => (
              <option key={n.placeId} value={n.name}>{n.name}</option>
            ))}
          </Select> */}

    {/* <Label htmlFor="city">City</Label>
    <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
<option value="">Select City</option>
<option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
</Select> */}

    <Label htmlFor="area">Area/Society</Label>
    <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

    <Label htmlFor="phaseBlock">Phase/Block</Label>
    <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
    <Label htmlFor="category">Category</Label>
    <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
      <option value="">Select Category</option>
       Add more category options as necessary 
    </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
  <option value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
  <option value="">Select Priority</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</Select>

    {/* <Label htmlFor="bedrooms">Bedrooms</Label>
    <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
 */}

    <Label htmlFor="length">Length (ft)</Label>
      <Input
          id="length"
          name="length"
          type="text"
          value={formData.length}
          onChange={handleChange('length')}
      />

      <Label htmlFor="width">Width (ft)</Label>
      <Input
          id="width"
          name="width"
          type="text"
          value={formData.width}
          onChange={handleChange('width')}
      />

    <Label htmlFor="budget">Budget</Label>
    <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

    <Label htmlFor="advancePayment">Advance Payment</Label>
    <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

    <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
    <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

    <Label htmlFor="closingDate">Closing Date</Label>
      <Input
          id="closingDate"
          name="closingDate"
          type="date"
          value={formData.closingDate}
          onChange={handleChange('closingDate')}
      />

    <Label htmlFor="expected">Expected %</Label>
    <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

    <Label htmlFor="commission">Commission%</Label>
    <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

    {/* Checkbox Features */}
    {/* <div>
      <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
      <Label htmlFor="garage">Garage</Label>
    </div>
    <div>
      <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
      <Label htmlFor="garden">Garden</Label>
    </div>
    <div>
      <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
      <Label htmlFor="mainRoad">Main Road</Label>
    </div>
    <div>
      <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
      <Label htmlFor="nearMasjid">Near Masjid</Label>
    </div> */}
  </>
);





  const renderForSaleHomeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleApartmentFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleVillasFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleFarmHouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleOfficeFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Building Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleShopFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Shop Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleWarehouseFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Building Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleFactoryFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Building Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );
  

  const renderForSaleCommercialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
   */}
      {/* <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );


  const renderForSaleIndustrialFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );


  const renderForSaleAgricultureFields = () => (
    <>
      <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      {/* <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Sold">Sold</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemand')} />
    </>
  );

  // Render functions for each property type
  const renderForPurchaseShopFields = () => (
    <>
            <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>

      {/* <Label htmlFor="city">City</Label>
      <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
  <option value="">Select City</option>
  <option value="Lahore">Lahore</option>
  <option value="Karachi">Karachi</option>
  <option value="Islamabad">Islamabad</option>
</Select> */}

      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />

      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />

{/*
      <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
         Add more category options as necessary 
      </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
    <option value="">Select Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
</Select>

      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} /> */}


      <Label htmlFor="length">Length (ft)</Label>
        <Input
            id="length"
            name="length"
            type="text"
            value={formData.length}
            onChange={handleChange('length')}
        />

        <Label htmlFor="width">Width (ft)</Label>
        <Input
            id="width"
            name="width"
            type="text"
            value={formData.width}
            onChange={handleChange('width')}
        />

      <Label htmlFor="budget">Budget</Label>
      <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

      <Label htmlFor="closingDate">Closing Date</Label>
        <Input
            id="closingDate"
            name="closingDate"
            type="date"
            value={formData.closingDate}
            onChange={handleChange('closingDate')}
        />

      <Label htmlFor="expected">Expected %</Label>
      <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

      <Label htmlFor="commission">Commission%</Label>
      <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
    </>
  );


  // Render functions for each property type
  const renderForPurchaseFactoryFields = () => (
    <>
            <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>

      {/* <Label htmlFor="city">City</Label>
      <Select id="city" name="city" value={formData.city} onChange={handleChange('city')}>
  <option value="">Select City</option>
  <option value="Lahore">Lahore</option>
  <option value="Karachi">Karachi</option>
  <option value="Islamabad">Islamabad</option>
</Select> */}

      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
{/* 
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} /> */}

{/*
      <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
         Add more category options as necessary 
      </Select>
*/}

<Label htmlFor="status">Status</Label>
<Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Sold">Sold</option>
</Select>

<Label htmlFor="priority">Priority</Label>
<Select id="priority" name="priority" value={formData.priority} onChange={handleChange('priority')}>
    <option value="">Select Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
</Select>

      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
 */}

      <Label htmlFor="length">Length (ft)</Label>
        <Input
            id="length"
            name="length"
            type="text"
            value={formData.length}
            onChange={handleChange('length')}
        />

        <Label htmlFor="width">Width (ft)</Label>
        <Input
            id="width"
            name="width"
            type="text"
            value={formData.width}
            onChange={handleChange('width')}
        />

      <Label htmlFor="budget">Budget</Label>
      <Input id="budget" name="budget" value={formData.budget} onChange={handleChange('budget')} />

      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" value={formData.advancePayment} onChange={handleChange('advancePayment')} />

      <Label htmlFor="timeForPayment">Time for Balance Payment</Label>
      <Input id="timeForPayment" name="timeForPayment" value={formData.timeForPayment} onChange={handleChange('timeForPayment')} />

      <Label htmlFor="closingDate">Closing Date</Label>
        <Input
            id="closingDate"
            name="closingDate"
            type="date"
            value={formData.closingDate}
            onChange={handleChange('closingDate')}
        />

      <Label htmlFor="expected">Expected %</Label>
      <Input id="expected" name="expected" value={formData.expected} onChange={handleChange('expected')} />

      <Label htmlFor="commission">Commission%</Label>
      <Input id="commission" name="commission" value={formData.commission} onChange={handleChange('commission')} />

      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
    </>
  );


  


  const renderForRentHomeFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
  
      {/* Checkbox Features */}
      <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForRentApartmentFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
  
      {/* Checkbox Features */}
      <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForRentVillasFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
  
      {/* Checkbox Features */}
      <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForRentFarmHouseFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
  
      {/* Checkbox Features */}
      <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div>
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForRentOfficeFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForRentShopFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
{/*   
      <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForRentWarehouseFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  
  const renderForRentFactoryFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );
  

  const renderForSaleResidentialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );


  const renderForRentResidentialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      {/* <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );


  const renderForRentCommercialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );


  const renderForRentIndustrialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      {/* <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );


  const renderForRentAgricultureFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      {/* <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="bedrooms">Bedrooms</Label>
      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange('bedrooms')} />
   */}
      {/* Checkbox Features */}
      {/* <div>
        <Checkbox id="garage" name="garage" type="checkbox" checked={formData.features.garage} onChange={(e) => handleChange('features', 'garage')(e)} />
        <Label htmlFor="garage">Garage</Label>
      </div>
      <div>
        <Checkbox id="garden" name="garden" type="checkbox" checked={formData.features.garden} onChange={(e) => handleChange('features', 'garden')(e)} />
        <Label htmlFor="garden">Garden</Label>
      </div>
      <div>
        <Checkbox id="mainRoad" name="mainRoad" type="checkbox" checked={formData.features.mainRoad}   onChange={(e) => handleChange('features', 'mainRoad')(e)} />
        <Label htmlFor="mainRoad">Main Road</Label>
      </div>
      <div>
        <Checkbox id="nearMasjid" name="nearMasjid" type="checkbox" checked={formData.features.nearMasjid} onChange={handleChange('nearMasjid')} />
        <Label htmlFor="nearMasjid">Near Masjid</Label>
      </div> */}
  
      <Label htmlFor="rentOutTime">When to Rent Out</Label>
      <Input id="rentOutTime" name="rentOutTime" type="date" value={formData.rentOutTime} onChange={handleChange('rentOutTime')} />
  
      <Label htmlFor="budgetPerMonth">Budget per Month</Label>
      <Input id="budgetPerMonth" name="budgetPerMonth" type="text" value={formData.budgetPerMonth} onChange={handleChange('budgetPerMonth')} />
  
      <Label htmlFor="advancePayment">Advance Payment</Label>
      <Input id="advancePayment" name="advancePayment" type="text" value={formData.advancePayment} onChange={handleChange('advancePayment')} />
  
      <Label htmlFor="contractTime">Contract Time for Rental</Label>
      <Input id="contractTime" name="contractTime" type="text" value={formData.contractTime} onChange={handleChange('contractTime')} />
    </>
  );


  const renderOnRentHomeFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );


  const renderOnRentApartmentFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );

  const renderOnRentVillasFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );
  

  const renderOnRentFarmHouseFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );


  const renderOnRentOfficeFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Office Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );

  const renderOnRentShopFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Shop Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );

  const renderOnRentWarehouseFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Building Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );

  const renderOnRentFactoryFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      <Label htmlFor="houseNumber">Building Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
  
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );


  const renderOnRentResidentialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      {/* <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
{/*   
      <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );
  


  const renderOnRentCommercialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
  
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      <Label htmlFor="searchMap">Search on Map</Label>
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );


  const renderOnRentIndustrialFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      {/* <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );


  const renderOnRentAgricultureFields = () => (
    <>
       <Label htmlFor="country">Country</Label>
            <Select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>
              ))}
            </Select>

            <Label htmlFor="city">City</Label>
            <Select id="city" name="city" value={formData.city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.geonameId} value={city.name}>{city.name}</option>
              ))}
            </Select>

            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Select id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange('neighborhood')} required>
              <option value="">Select Neighborhood</option>
              {neighborhoods.map(n => (
                <option key={n.placeId} value={n.name}>{n.name}</option>
              ))}
            </Select>
  
      {/* <Label htmlFor="area">Area/Society</Label>
      <Input id="area" name="area" value={formData.area} onChange={handleChange('area')} />
  
      <Label htmlFor="phaseBlock">Phase/Block</Label>
      <Input id="phaseBlock" name="phaseBlock" value={formData.phaseBlock} onChange={handleChange('phaseBlock')} />
   */}
      {/* <Label htmlFor="category">Category</Label>
      <Select id="category" name="category" value={formData.category} onChange={handleChange('category')}>
        <option value="">Select Category</option>
      </Select> */}
  
      {/* <Label htmlFor="houseNumber">House Number</Label>
      <Input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange('houseNumber')} />
  
      <Label htmlFor="streetNumber">Street Number</Label>
      <Input id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange('streetNumber')} />
   */}
      <Label htmlFor="coordinates">Coordinates</Label>
      <Input id="coordinates" name="coordinates" value={formData.coordinates} onChange={handleChange('coordinates')} />
  
      {/* <Label htmlFor="searchMap">Search on Map</Label> */}
      {/* Implement map search functionality here, perhaps with a button or embedded map */}
  
      <Label htmlFor="dimensions">Dimensions</Label>
      <Input id="dimensions" name="dimensions" placeholder="Size, Front, Depth" value={formData.dimensions} onChange={handleChange('dimensions')} />
  
      <Label htmlFor="specialFeatures">Special Features</Label>
      <Input id="specialFeatures" name="specialFeatures" value={formData.specialFeatures} onChange={handleChange('specialFeatures')} />
  
      <Label htmlFor="images">Images</Label>
      <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
  
      <Label htmlFor="status">Status</Label>
      <Select id="status" name="status" value={formData.status} onChange={handleChange('status')}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Rented Out">Rented Out</option>
      </Select>
  
      <Label htmlFor="actualDemand">Actual Demand</Label>
      <Input id="actualDemand" name="actualDemand" type="text" value={formData.actualDemand} onChange={handleChange('actualDemand')} />
  
      <Label htmlFor="dealerDemand">Dealer Demand</Label>
      <Input id="dealerDemand" name="dealerDemand" type="text" value={formData.dealerDemand} onChange={handleChange('dealerDemands')} />
    </>
  );



  return (
    <Container>
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '30px', textAlign: 'center' }}>Step 4: Detailed Inquiry Information</h2>
          {renderFields()}
          <Button type="submit">Submit Inquiry</Button>
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default StepFour;
