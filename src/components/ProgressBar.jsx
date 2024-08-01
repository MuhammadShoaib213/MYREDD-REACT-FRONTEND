
// import React from 'react';

// const ProgressBar = ({ currentStep }) => {
//     const stepPercentage = ((currentStep - 1) / 3) * 100;

//     return (
//         <div style={{ width: '100%', backgroundColor: '#D3D3D3' }}>
//             <div style={{
//                 height: '20px',
//                 width: `${stepPercentage}%`,
//                 backgroundColor: currentStep === 4 ? '#FF0000' : '#007BFF'
//             }}></div>
//         </div>
//     );
// };

// export default ProgressBar;


import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: calc(100% - 80px);  // Increased padding for more space
  background-color: #f0f0f0;  // Lighter background to make the red pop
  padding: 15px 40px;  // More padding on the sides
  border-radius: 10px;  // Increased radius for softer corners
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);  // Subtle shadow for depth
  margin: 20px auto;  // Centering and adding vertical space
`;

const Progress = styled.div`
  height: 24px;  // Increased height for a thicker bar
  width: ${props => props.width}%;
  background-color: #FF0000;  // Consistent red color
  background-image: linear-gradient(135deg, #ff6347, #ff0000);  // Gradient for depth
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;  // Larger text for better readability
  font-weight: bold;  // Bold font for impact
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);  // Text shadow for better visibility
  transition: width 0.3s ease-in-out;  // Smooth transition for width change
  border-radius: 8px;  // Rounded inner bar
`;

const ProgressBar = ({ currentStep }) => {
    const stepPercentage = ((currentStep - 1) / 4) * 100;  // Calculating the step percentage

    return (
        <ProgressBarContainer>
            <Progress width={stepPercentage}>
                {Math.round(stepPercentage)}%  
            </Progress>
        </ProgressBarContainer>
    );
};

export default ProgressBar;
