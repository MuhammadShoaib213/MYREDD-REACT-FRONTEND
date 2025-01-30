import React from 'react';
import styled from 'styled-components';

// Styled components for styling the file upload component
const FileInputContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9; // Light grey background for the container
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px; // Increased font size for better readability
  font-weight: bold; // Bold label for emphasis
  color: #333; // Dark grey for high contrast text
`;

const StyledInput = styled.input`
  width: 97%; // Full width to utilize container space
  padding: 8px; // Padding for better user interaction
  margin-top: 5px; // Margin top for spacing from the label
  border-radius: 4px; // Rounded corners for modern look
  border: 1px solid #aaa; // Slightly darker border for definition
  cursor: pointer; // Pointer cursor on hover to indicate interactivity
`;

const InfoText = styled.p`
  margin-top: 10px;
  font-size: 14px; // Slightly smaller font size for secondary information
  color: #666; // Grey text for subtle info display
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

const FileUploadComponent = ({ label, name, multiple, maxFiles, onFilesChange, isRequired = false  }) => {
  const handleFileChange = (event) => {
    if (event.target.files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`); // Alert if more than max files attempted
      event.target.value = ''; // Reset the input if too many files
    } else {
      onFilesChange(name, event.target.files); // Pass the files along with the name to the handler
    }
  };

  return (
    <FileInputContainer>
      <Label htmlFor={name}>{label}  {isRequired && <RequiredAsterisk>*</RequiredAsterisk>}</Label>
      <StyledInput
        type="file"
        id={name}
        name={name}
        multiple={multiple}
        onChange={handleFileChange}
        accept="image/*" // Accept only images (adjust according to need)
        required={isRequired}
      />
      <InfoText>Upload up to {maxFiles} images. </InfoText> 
    </FileInputContainer>
  );
};

export default FileUploadComponent;
