// CommercialOnRent.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CountrySelect from '../../common/CountrySelect';
import CitySelect from '../../common/CitySelect';
import DistrictSelect from '../../common/DistrictSelect';
import AreaSocietySelect from '../../common/AreaSocietySelect';
import PhaseBlockSelect from '../../common/PhaseBlockSelect';
import SizeInput from '../../common/area/SizeInput';
import LandAreaDimensionsInput from '../../common/area/LandAreaDimensionsInput';
import FileUploadComponent from '../../common/FileUpload';
import FloorFeatureSelector from '../../common/FloorFeatureSelector';
import FacilitySelector from '../../common/FacilitySelector';
import BudgetRangeInput from '../../common/financial/BudgetRangeInput';
import AdvanceAmountInput from '../../common/financial/AdvanceAmountInput';
import PrioritySelect from '../../common/PrioritySelect';
import PropertyNumberInput from '../../common/PropertyNumberInput';
import StreetInput from '../../common/StreetInput';
import StreetWidthInput from '../../common/StreetWidthInput';
import PropertyConditionSelect from '../../common/PropertyConditionSelect';
import DemandInput from '../../common/financial/DemandInput';
import CommissionInput from '../../common/financial/CommissionInput';
import AddedValueInput from '../../common/financial/AddedValueInput';
import BudgetRangePerMonth from '../../common/financial/BudgetRangePerMonth';
import ContractTermSelect from '../../common/ContractTermSelect';

const FormContainer = styled.div`
  /* styles... */
`;
const Title = styled.h2`
  /* styles... */
`;

const CommercialOnRent = ({
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
  handleContractTermChange,
  handleChangeDistrict,
  handleSubmit,
}) => {
  console.log('CommercialOnRent received props:', {
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
      <Title>Commercial Land On Rent</Title>
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
          handleChange({ target: { name: 'areaSociety', value: selectedAreaSociety } })
        }
      />
      <PhaseBlockSelect
        selectedSubMunicipality={formData.areaSociety}
        selectedCityName={formData.city}
        onChange={(selectedPhaseBlock) =>
          handleChange({ target: { name: 'phaseBlock', value: selectedPhaseBlock } })
        }
      />

      {/* Property Details */}
      <SizeInput
        value={formData.size}
        unit={formData.sizeUnit}
        onValueChange={handleChange}
        onUnitChange={handleChange}
      />

    <PropertyConditionSelect
        condition={formData.propertyCondition}
        onConditionChange={handlePropertyConditionChange}
      />


      {/* Features & Facilities */}
      <FloorFeatureSelector
        floors={formData.floors}
        onFloorChange={handleFloorChange}
      />
      <FacilitySelector
        facilities={formData.facilities}
        onFacilitiesChange={handleFacilitiesChange}
      />

      {/* Financial Details */}
       <BudgetRangePerMonth
           min={formData.budget.min}
           max={formData.budget.max}
           onBudgetChange={handleBudgetChange}
         />

      <AdvanceAmountInput
        advanceAmount={formData.advanceAmount}
        onAdvanceChange={handleAdvanceChange}
      />

    <PrioritySelect
        priority={formData.priority}
        onPriorityChange={handlePriorityChange}
      />

      <CommissionInput
           commission={formData.commission}
           onCommissionChange={handleCommissionChange}
      />
      
    <ContractTermSelect
        term={formData.contractTerm}
        onTermChange={handleContractTermChange}
      />


      {/* No button here—submit is in StepFour */}
    </FormContainer>
  );
};

CommercialOnRent.propTypes = {
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
    Pictures: PropTypes.array,
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
  handleDemandChange : PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CommercialOnRent;