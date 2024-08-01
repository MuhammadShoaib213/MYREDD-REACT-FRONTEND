// // import React from 'react';
// // import styled from 'styled-components';
// // import backgroundImage from '../images/hero.png';
// // import InfoSection from './infoSection';
// // import FeatureTabs from './FeatureTabs';
// // import ContactForm from './ContactForm';

// // const Header = styled.header`
// //   text-align: left; /* Align text to the left */
// //   padding: 100px 20px 100px 50px; /* Add padding from the left */
// //   background: url(${backgroundImage}) center/cover no-repeat; /* Set background image */
// // `;

// // const Headline = styled.h1`
// //   font-size: 2.5rem;
// //   color: black; /* Change text color to black */
// // `;

// // const Subheadline = styled.h2`
// //   font-size: 1.5rem;
// //   color: black; /* Change text color to black */
// // `;

// // const Button = styled.button`
// //   padding: 10px 20px;
// //   background-color: red;
// //   border: none;
// //   color: white;
// //   font-size: 1rem;
// //   cursor: pointer;
// //   &:hover {
// //     background-color: darkred;
// //   }
// // `;

// // const HomePage = () => {
// //   return (
// //     <>
// //       {/* <Navbar /> */}
// //       <Header>
// //         <Headline>Your Oasis for Real Estate Growth</Headline>
// //         <Subheadline>Discover your potential in properties with us.</Subheadline>
// //         <Button>Sign Up</Button>
// //       </Header>
// //       <InfoSection/>
// //       <FeatureTabs/>
// //       <ContactForm/>
// //       {/* <Footer /> */}
// //     </>
// //   );
// // };

// // export default HomePage;


// import React from 'react';
// import styled from 'styled-components';
// import backgroundImage from '../images/hero.png';
// import InfoSection from './infoSection';
// import FeatureTabs from './FeatureTabs';
// import ContactForm from './ContactForm';

// const Header = styled.header`
//   text-align: left; /* Align text to the left */
//   padding: 100px 20px 100px 50px; /* Add padding from the left */
//   background: url(${backgroundImage}) center/cover no-repeat; /* Set background image */

//   @media (max-width: 768px) {
//     background-position: left; /* Change background position for mobile view */
//   }
// `;

// const Headline = styled.h1`
//   font-size: 2.5rem;
//   color: black; /* Change text color to black */
// `;

// const Subheadline = styled.h2`
//   font-size: 1.5rem;
//   color: black; /* Change text color to black */
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: red;
//   border: none;
//   color: white;
//   font-size: 1rem;
//   cursor: pointer;
//   &:hover {
//     background-color: darkred;
//   }
// `;

// const HomePage = () => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <Header>
//         <Headline>Your Oasis for Real Estate Growth</Headline>
//         <Subheadline>Discover your potential in properties with us.</Subheadline>
//         <Button>Sign Up</Button>
//       </Header>
//       <InfoSection />
//       <FeatureTabs />
//       <ContactForm />
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default HomePage;


import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/hero.png';
import InfoSection from './infoSection';
import FeatureTabs from './FeatureTabs';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

const Header = styled.header`
  text-align: left; /* Align text to the left */
  padding: 100px 20px 100px 50px; /* Add padding from the left */
  background: url(${backgroundImage}) center/cover no-repeat; /* Set background image */
  @media (max-width: 768px) {
    background-position: left; /* Change background position for mobile view */
  }
`;

const Headline = styled.h1`
  font-size: 2.5rem;
  color: black; /* Change text color to black */
`;

const Subheadline = styled.h2`
  font-size: 1.5rem;
  color: black; /* Change text color to black */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: red;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  justify-content: center; /* Center children horizontally */
  align-items: flex-start; /* Align items at the start of the flex container */
  padding: 50px; /* Padding around the sections */
  gap: 20px; /* Space between the tabs and contact form */

  @media (max-width: 1024px) {
    flex-direction: column; /* Stack vertically on smaller screens */
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: red;
  height: auto;
  min-height: 300px;
  align-self: stretch;
  margin-left: 300px;

  @media (max-width: 768px) {
    display: none; // Hide the divider on mobile screens
  }
`;


const HomePage = () => {
  return (
    <>
      <Header>
        <Headline>Your Oasis for Real Estate Growth</Headline>
        <Subheadline>Discover your potential in properties with us.</Subheadline>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
        <Button>Sign Up</Button>
        </Link>
      </Header>
      <InfoSection />
      <SectionsContainer>
        <FeatureTabs />
        <Divider />
        <ContactForm />
      </SectionsContainer>
    </>
  );
};

export default HomePage;
