// HomeForSale.jsx
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CountrySelect from "../../common/CountrySelect";
import CitySelect from "../../common/CitySelect";
import DistrictSelect from "../../common/DistrictSelect";
import AreaSocietySelect from "../../common/AreaSocietySelect";
import PhaseBlockSelect from "../../common/PhaseBlockSelect";
import SizeInput from "../../common/area/SizeInput";
import LandAreaDimensionsInput from "../../common/area/LandAreaDimensionsInput";
import FileUploadComponent from "../../common/FileUpload";
import FloorFeatureSelector from "../../common/FloorFeatureSelector";
import FacilitySelector from "../../common/FacilitySelector";
import BudgetRangeInput from "../../common/financial/BudgetRangeInput";
import AdvanceAmountInput from "../../common/financial/AdvanceAmountInput";
import PrioritySelect from "../../common/PrioritySelect";
import PropertyNumberInput from "../../common/PropertyNumberInput";
import StreetInput from "../../common/StreetInput";
import StreetWidthInput from "../../common/StreetWidthInput";
import PropertyConditionSelect from "../../common/PropertyConditionSelect";
import DemandInput from "../../common/financial/DemandInput";
import CommissionInput from "../../common/financial/CommissionInput";
import AddedValueInput from "../../common/financial/AddedValueInput";

const FormContainer = styled.div`
  /* styles... */
`;
const Title = styled.h2`
  /* styles... */
`;

const HomeForSale = ({
  formData,
  handleChange,
  handleFilesChange,
  handleFloorChange,
  handleFacilitiesChange,
  handleBudgetChange,
  handleAdvanceChange,
  handlePriorityChange,
  handlePropertyConditionChange,
  handleDemandChange,
  handleCommissionChange,
  handleAddedValueChange,
  handlePropertyImagesChange,
  handleChangeDistrict,
  handleSubmit,
}) => {
  console.log("HomeForSale received props:", {
    formData,
    handleChange,
    handleFilesChange,
    handleFloorChange,
    handleFacilitiesChange,
    handleBudgetChange,
    handleAdvanceChange,
    handlePriorityChange,
    handleSubmit,
  });

  return (
    <FormContainer>
      <Title>Home For Sale</Title>
      {/* No <form> tag here at all */}

      {/* For location */}
      <CountrySelect
        selectedCountry={formData.selectedCountry}
        onCountryChange={handleChange}
        isRequired={true}
      />
      <CitySelect
        selectedCountry={formData.selectedCountry}
        city={formData.city}
        onCityChange={handleChange}
        isRequired={true}
      />
      <DistrictSelect
        selectedCityName={formData.city}
        district={formData.district}
        onAreaChange={handleChangeDistrict}
        isRequired={true}
      />

      <AreaSocietySelect
        selectedMunicipality={formData.district}
        selectedCityName={formData.city}
        onAreaSocietyChange={(selectedAreaSociety) =>
          handleChange({
            target: { name: "areaSociety", value: selectedAreaSociety },
          })
        }
        isRequired={true}
      />
      <PhaseBlockSelect
        selectedSubMunicipality={formData.areaSociety}
        selectedCityName={formData.city}
        onChange={(selectedPhaseBlock) =>
          handleChange({
            target: { name: "phaseBlock", value: selectedPhaseBlock },
          })
        }
        isRequired={true}
      />

      <PropertyNumberInput
        label="Property Number"
        name="propertyNumber"
        value={formData.propertyNumber}
        onChange={handleChange}
        isRequired={true}
      />

      <StreetInput
        label="Street Name/Number"
        name="streetName"
        value={formData.streetName}
        onChange={handleChange}
        isRequired={true}
      />

      <StreetWidthInput
        value={formData.Streetwidth}
        unit={formData.StreetwidthUnit}
        onValueChange={(event) =>
          handleChange({
            target: { name: "Streetwidth", value: event.target.value },
          })
        }
        onUnitChange={(event) =>
          handleChange({
            target: { name: "StreetwidthUnit", value: event.target.value },
          })
        }
        isRequired={true}
      />

      {/* Property Details */}
      <SizeInput
        value={formData.size}
        unit={formData.sizeUnit}
        onValueChange={handleChange}
        onUnitChange={handleChange}
        isRequired={true}
      />
      <LandAreaDimensionsInput
        dimensions={{
          width: formData.landWidth,
          length: formData.landLength,
          depth: formData.landDepth,
          unit: formData.landUnit,
        }}
        onChange={handleChange}
      />

      <PropertyConditionSelect
        condition={formData.propertyCondition}
        onConditionChange={handlePropertyConditionChange}
      />

      {/* Media/Files */}
      <FileUploadComponent
        label="Upload Front Pictures"
        name="frontPictures"
        multiple
        maxFiles={10}
        onFilesChange={handleFilesChange}
        isRequired={true}
      />

      <FileUploadComponent
        label="Upload Property Pictures"
        name="propertyPictures"
        multiple
        maxFiles={10}
        onFilesChange={handlePropertyImagesChange}
        isRequired={true}
      />

      {/* Features & Facilities */}
      <FloorFeatureSelector
        floors={formData.floors}
        onFloorChange={handleFloorChange}
        isRequired={true}
      />
      <FacilitySelector
        facilities={formData.facilities}
        onFacilitiesChange={handleFacilitiesChange}
      />

      {/* Financial Details */}
      <DemandInput
        demand={formData.demand}
        onDemandChange={handleDemandChange}
        isRequired={true}
      />

      <AdvanceAmountInput
        advanceAmount={formData.advanceAmount}
        onAdvanceChange={handleAdvanceChange}
        isRequired={true}
      />

      <CommissionInput
        commission={formData.commission}
        onCommissionChange={handleCommissionChange}
      />

      <AddedValueInput
        addedValue={formData.addedValue}
        onAddedValueChange={handleAddedValueChange}
      />

      <PrioritySelect
        priority={formData.priority}
        onPriorityChange={handlePriorityChange}
        isRequired={true}
      />

      {/* No button here—submit is in StepFour */}
    </FormContainer>
  );
};

HomeForSale.propTypes = {
  formData: PropTypes.shape({
    selectedCountry: PropTypes.string,
    city: PropTypes.string,
    district: PropTypes.string,
    areaSociety: PropTypes.string,
    phaseBlock: PropTypes.string,
    size: PropTypes.string,
    sizeUnit: PropTypes.string,
    landWidth: PropTypes.string,
    landLength: PropTypes.string,
    landDepth: PropTypes.string,
    landUnit: PropTypes.string,
    homePics: PropTypes.array,
    floors: PropTypes.array,
    facilities: PropTypes.array,
    budget: PropTypes.shape({
      min: PropTypes.string,
      max: PropTypes.string,
    }),
    advanceAmount: PropTypes.string,
    priority: PropTypes.string,
    commission: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string,
    }),
    addedValue: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string,
    }),
    detectedAddress: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFilesChange: PropTypes.func.isRequired,
  handleFloorChange: PropTypes.func.isRequired,
  handleFacilitiesChange: PropTypes.func.isRequired,
  handleBudgetChange: PropTypes.func.isRequired,
  handleAdvanceChange: PropTypes.func.isRequired,
  handlePriorityChange: PropTypes.func.isRequired,
  handleDemandChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default HomeForSale;

// // HomeForSale.jsx
// import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import CountrySelect from '../../common/CountrySelect';
// import CitySelect from '../../common/CitySelect';
// import DistrictSelect from '../../common/DistrictSelect';
// import AreaSocietySelect from '../../common/AreaSocietySelect';
// import PhaseBlockSelect from '../../common/PhaseBlockSelect';
// import SizeInput from '../../common/area/SizeInput';
// import LandAreaDimensionsInput from '../../common/area/LandAreaDimensionsInput';
// import FileUploadComponent from '../../common/FileUpload';
// import FloorFeatureSelector from '../../common/FloorFeatureSelector';
// import FacilitySelector from '../../common/FacilitySelector';
// import BudgetRangeInput from '../../common/financial/BudgetRangeInput';
// import AdvanceAmountInput from '../../common/financial/AdvanceAmountInput';
// import PrioritySelect from '../../common/PrioritySelect';
// import PropertyNumberInput from '../../common/PropertyNumberInput';
// import StreetInput from '../../common/StreetInput';
// import StreetWidthInput from '../../common/StreetWidthInput';
// import PropertyConditionSelect from '../../common/PropertyConditionSelect';
// import DemandInput from '../../common/financial/DemandInput';
// import CommissionInput from '../../common/financial/CommissionInput';
// import AddedValueInput from '../../common/financial/AddedValueInput';

// // Styled Components
// const FormContainer = styled.div`
//   /* styles... */
// `;
// const Title = styled.h2`
//   /* styles... */
// `;
// const Label = styled.label`
//   display: block;
//   margin-bottom: 8px;
//   font-weight: bold;
// `;
// const Asterisk = styled.span`
//   color: red;
//   margin-left: 2px;
// `;
// const ErrorText = styled.span`
//   color: red;
//   font-size: 12px;
//   margin-top: 4px;
//   display: block;
// `;

// const HomeForSale = forwardRef(({
//   formData,
//   handleChange,
//   handleFilesChange,
//   handleFloorChange,
//   handleFacilitiesChange,
//   handleBudgetChange,
//   handleAdvanceChange,
//   handlePriorityChange,
//   handlePropertyConditionChange,
//   handleDemandChange,
//   handleCommissionChange,
//   handleAddedValueChange,
//   handleSubmit, // If needed internally
// }, ref) => {
//   const [errors, setErrors] = useState({});

//   const requiredFields = [
//     { name: 'selectedCountry', label: 'Country' },
//     { name: 'city', label: 'City' },
//     { name: 'district', label: 'District' },
//     { name: 'areaSociety', label: 'Area' },
//     { name: 'phaseBlock', label: 'Phase' },
//     { name: 'streetName', label: 'Street Name/Number' },
//     { name: 'propertyNumber', label: 'Property Number' },
//     { name: 'streetWidth', label: 'Street Width' },
//     { name: 'size', label: 'Size' },
//     { name: 'homePics', label: 'Files' },
//     { name: 'floors', label: 'Features' },
//     { name: 'demand', label: 'Demand' },
//     { name: 'advanceAmount', label: 'Advance' },
//     { name: 'priority', label: 'Priority' },
//     { name: 'commission', label: 'Commission' },
//   ];

//   const validate = () => {
//     const newErrors = {};

//     requiredFields.forEach((field) => {
//       const value = formData[field.name];

//       if (
//         value === undefined ||
//         value === null ||
//         (typeof value === 'string' && value.trim() === '') ||
//         (Array.isArray(value) && value.length === 0) ||
//         (typeof value === 'object' && Object.keys(value).length === 0) // For objects like commission
//       ) {
//       }
//     });

//     setErrors(newErrors);

//     // Return true if no errors
//     return Object.keys(newErrors).length === 0;
//   };

//   // Expose validation methods to parent via ref
//   useImperativeHandle(ref, () => ({
//     isValid: () => validate(),
//     getErrors: () => errors,
//   }));

//   // Run validation whenever formData changes
//   useEffect(() => {
//     validate();
//   }, [formData]);

//   return (
//     <FormContainer>
//       <Title>Home For Sale</Title>

//       {/* Country */}
//       <Label htmlFor="selectedCountry">
//         Country<Asterisk>*</Asterisk>
//       </Label>
//       <CountrySelect
//         id="selectedCountry"
//         selectedCountry={formData.selectedCountry}
//         onCountryChange={handleChange}
//       />
//       {errors.selectedCountry && <ErrorText>{errors.selectedCountry}</ErrorText>}

//       {/* City */}
//       <Label htmlFor="city">
//         City<Asterisk>*</Asterisk>
//       </Label>
//       <CitySelect
//         id="city"
//         selectedCountry={formData.selectedCountry}
//         city={formData.city}
//         onCityChange={handleChange}
//       />
//       {errors.city && <ErrorText>{errors.city}</ErrorText>}

//       {/* District */}
//       <Label htmlFor="district">
//         District<Asterisk>*</Asterisk>
//       </Label>
//       <DistrictSelect
//         id="district"
//         selectedCityName={formData.city}
//         area={formData.district}
//         onAreaChange={(selectedArea) =>
//           handleChange({ target: { name: 'district', value: selectedArea } })
//         }
//       />
//       {errors.district && <ErrorText>{errors.district}</ErrorText>}

//       {/* Area */}
//       <Label htmlFor="areaSociety">
//         Area<Asterisk>*</Asterisk>
//       </Label>
//       <AreaSocietySelect
//         id="areaSociety"
//         selectedMunicipality={formData.district}
//         selectedCityName={formData.city}
//         onAreaSocietyChange={(selectedAreaSociety) =>
//           handleChange({ target: { name: 'areaSociety', value: selectedAreaSociety } })
//         }
//       />
//       {errors.areaSociety && <ErrorText>{errors.areaSociety}</ErrorText>}

//       {/* Phase */}
//       <Label htmlFor="phaseBlock">
//         Phase<Asterisk>*</Asterisk>
//       </Label>
//       <PhaseBlockSelect
//         id="phaseBlock"
//         selectedSubMunicipality={formData.areaSociety}
//         selectedCityName={formData.city}
//         onChange={(selectedPhaseBlock) =>
//           handleChange({ target: { name: 'phaseBlock', value: selectedPhaseBlock } })
//         }
//       />
//       {errors.phaseBlock && <ErrorText>{errors.phaseBlock}</ErrorText>}

//       {/* Property Number */}
//       <Label htmlFor="propertyNumber">
//         Property Number<Asterisk>*</Asterisk>
//       </Label>
//       <PropertyNumberInput
//         id="propertyNumber"
//         label=""
//         name="propertyNumber"
//         value={formData.propertyNumber}
//         onChange={handleChange}
//       />
//       {errors.propertyNumber && <ErrorText>{errors.propertyNumber}</ErrorText>}

//       {/* Street Name/Number */}
//       <Label htmlFor="streetName">
//         Street Name/Number<Asterisk>*</Asterisk>
//       </Label>
//       <StreetInput
//         id="streetName"
//         label=""
//         name="streetName"
//         value={formData.streetName}
//         onChange={handleChange}
//       />
//       {errors.streetName && <ErrorText>{errors.streetName}</ErrorText>}

//       {/* Street Width */}
//       <Label htmlFor="streetWidth">
//         Street Width<Asterisk>*</Asterisk>
//       </Label>
//       <StreetWidthInput
//         id="streetWidth"
//         value={formData.streetWidth}
//         unit={formData.streetWidthUnit}
//         onValueChange={(event) =>
//           handleChange({ target: { name: 'streetWidth', value: event.target.value } })
//         }
//         onUnitChange={(event) =>
//           handleChange({ target: { name: 'streetWidthUnit', value: event.target.value } })
//         }
//       />
//       {errors.streetWidth && <ErrorText>{errors.streetWidth}</ErrorText>}

//       {/* Size */}
//       <Label htmlFor="size">
//         Size<Asterisk>*</Asterisk>
//       </Label>
//       <SizeInput
//         id="size"
//         value={formData.size}
//         unit={formData.sizeUnit}
//         onValueChange={handleChange}
//         onUnitChange={handleChange}
//       />
//       {errors.size && <ErrorText>{errors.size}</ErrorText>}

//       {/* Files */}
//       <Label htmlFor="homePics">
//         Upload Home Pics<Asterisk>*</Asterisk>
//       </Label>
//       <FileUploadComponent
//         id="homePics"
//         label=""
//         name="homePics"
//         multiple
//         maxFiles={10}
//         onFilesChange={handleFilesChange}
//       />
//       {errors.homePics && <ErrorText>{errors.homePics}</ErrorText>}

//       {/* Features */}
//       <Label htmlFor="floors">
//         Features<Asterisk>*</Asterisk>
//       </Label>
//       <FloorFeatureSelector
//         id="floors"
//         floors={formData.floors}
//         onFloorChange={handleFloorChange}
//       />
//       {errors.floors && <ErrorText>{errors.floors}</ErrorText>}

//       {/* Demand */}
//       <Label htmlFor="demand">
//         Demand<Asterisk>*</Asterisk>
//       </Label>
//       <DemandInput
//         id="demand"
//         demand={formData.demand}
//         onDemandChange={handleDemandChange}
//       />
//       {errors.demand && <ErrorText>{errors.demand}</ErrorText>}

//       {/* Advance */}
//       <Label htmlFor="advanceAmount">
//         Advance<Asterisk>*</Asterisk>
//       </Label>
//       <AdvanceAmountInput
//         id="advanceAmount"
//         advanceAmount={formData.advanceAmount}
//         onAdvanceChange={handleAdvanceChange}
//       />
//       {errors.advanceAmount && <ErrorText>{errors.advanceAmount}</ErrorText>}

//       {/* Priority */}
//       <Label htmlFor="priority">
//         Priority<Asterisk>*</Asterisk>
//       </Label>
//       <PrioritySelect
//         id="priority"
//         priority={formData.priority}
//         onPriorityChange={handlePriorityChange}
//       />
//       {errors.priority && <ErrorText>{errors.priority}</ErrorText>}

//       {/* Commission */}
//       <Label htmlFor="commission">
//         Commission<Asterisk>*</Asterisk>
//       </Label>
//       <CommissionInput
//         id="commission"
//         commission={formData.commission}
//         onCommissionChange={handleCommissionChange}
//       />
//       {errors.commission && <ErrorText>{errors.commission}</ErrorText>}

//       {/* No submit button here—submit is in StepFour */}
//     </FormContainer>
//   );
// });

// HomeForSale.propTypes = {
//   formData: PropTypes.shape({
//     selectedCountry: PropTypes.string,
//     city: PropTypes.string,
//     district: PropTypes.string,
//     areaSociety: PropTypes.string,
//     phaseBlock: PropTypes.string,
//     size: PropTypes.string,
//     sizeUnit: PropTypes.string,
//     streetWidth: PropTypes.string,
//     streetWidthUnit: PropTypes.string,
//     landWidth: PropTypes.string,
//     landLength: PropTypes.string,
//     landDepth: PropTypes.string,
//     landUnit: PropTypes.string,
//     homePics: PropTypes.array,
//     floors: PropTypes.array,
//     facilities: PropTypes.array,
//     budget: PropTypes.shape({
//       min: PropTypes.string,
//       max: PropTypes.string,
//     }),
//     advanceAmount: PropTypes.string,
//     priority: PropTypes.string,
//     commission: PropTypes.shape({
//       type: PropTypes.string,
//       value: PropTypes.string,
//     }),
//     addedValue: PropTypes.shape({
//       type: PropTypes.string,
//       value: PropTypes.string,
//     }),
//     detectedAddress: PropTypes.string,
//     streetName: PropTypes.string,
//     propertyNumber: PropTypes.string,
//   }).isRequired,
//   handleChange: PropTypes.func.isRequired,
//   handleFilesChange: PropTypes.func.isRequired,
//   handleFloorChange: PropTypes.func.isRequired,
//   handleFacilitiesChange: PropTypes.func.isRequired,
//   handleBudgetChange: PropTypes.func.isRequired,
//   handleAdvanceChange: PropTypes.func.isRequired,
//   handlePriorityChange: PropTypes.func.isRequired,
//   handleDemandChange: PropTypes.func.isRequired,
//   handlePropertyConditionChange: PropTypes.func.isRequired,
//   handleCommissionChange: PropTypes.func.isRequired,
//   handleAddedValueChange: PropTypes.func.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
// };

// export default HomeForSale;
