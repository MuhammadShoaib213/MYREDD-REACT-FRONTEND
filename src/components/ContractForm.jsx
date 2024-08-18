// // // import React, { useState } from 'react';
// // // import styled from 'styled-components';
// // import bgImage from '../images/bg.jpg';  // Ensure the path is correct

// // // Styled components as provided
// // const Container = styled.div`
// //   background-image: url(${bgImage});
// //   background-size: cover;
// //   background-position: center;
// //   background-blend-mode: overlay;
// //   background-color: rgba(0, 0, 0, 0.5);
// //   min-height: 70vh;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   padding: 10px 20px;
// // `;

// // // const ContentContainer = styled.div`
// // //   background: rgba(255, 255, 255, 0.8);
// // //   padding: 40px;
// // //   border-radius: 10px;
// // //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// // //   width: 100%;
// // //   max-width: 800px;
// // //   display: flex;
// // //   flex-direction: column;
// // // `;

// // // const Form = styled.form`
// // //   width: 100%;
// // // `;

// // // const FormField = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   margin: 10px 0;
// // // `;

// // // const Label = styled.label`
// // //   margin-bottom: 5px;
// // //   font-size: 16px;
// // //   cursor: pointer;
// // // `;

// // // const Input = styled.input`
// // //   width: 100%;
// // //   padding: 10px;
// // //   margin: 5px 0;
// // //   border: 2px solid #D3D3D3;
// // //   border-radius: 5px;
// // // `;

// // // const Button = styled.button`
// // //   padding: 10px 20px;
// // //   background-color: #FF0000;
// // //   color: white;
// // //   border: none;
// // //   border-radius: 20px;
// // //   cursor: pointer;
// // //   &:hover {
// // //     background-color: darkred;
// // //   }
// // //   margin-top: 20px;
// // // `;

// // // const ContractForm = () => {
// // //   const [formData, setFormData] = useState({
// // //     customerName: '',
// // //     date: '',
// // //     inquiryType: '',
// // //     commission: ''
// // //   });

// // //   const [contract, setContract] = useState('');

// // //   // Template for the contract
// // //   const contractTemplate = `
// // //     Contract Agreement
// // //     ------------------
// // //     Customer Name: ${formData.customerName}
// // //     Date: ${formData.date}
// // //     Inquiry Type: ${formData.inquiryType}
// // //     Commission: ${formData.commission}
// // //   `;

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prevState => ({
// // //       ...prevState,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     setContract(contractTemplate);
// // //   };

// // //   return (
// // //     <Container>
// // //       <ContentContainer>
// // //         <h1>Contract Form</h1>
// // //         <Form onSubmit={handleSubmit}>
// // //           <FormField>
// // //             <Label>Customer Name:</Label>
// // //             <Input
// // //               type="text"
// // //               name="customerName"
// // //               value={formData.customerName}
// // //               onChange={handleChange}
// // //             />
// // //           </FormField>
// // //           <FormField>
// // //             <Label>Date:</Label>
// // //             <Input
// // //               type="date"
// // //               name="date"
// // //               value={formData.date}
// // //               onChange={handleChange}
// // //             />
// // //           </FormField>
// // //           <FormField>
// // //             <Label>Inquiry Type:</Label>
// // //             <Input
// // //               type="text"
// // //               name="inquiryType"
// // //               value={formData.inquiryType}
// // //               onChange={handleChange}
// // //             />
// // //           </FormField>
// // //           <FormField>
// // //             <Label>Commission:</Label>
// // //             <Input
// // //               type="text"
// // //               name="commission"
// // //               value={formData.commission}
// // //               onChange={handleChange}
// // //             />
// // //           </FormField>
// // //           <Button type="submit">Generate Contract</Button>
// // //         </Form>
// // //         {contract && <div><h2>Contract</h2><pre>{contract}</pre></div>}
// // //       </ContentContainer>
// // //     </Container>
// // //   );
// // // };

// // // export default ContractForm;




// import React, { useState } from 'react';
// import styled, { createGlobalStyle } from 'styled-components';
// import bgImage from '../images/bg.jpg';

// // Global style for hiding non-essential elements from printing
// const GlobalStyle = createGlobalStyle`
//   @media print {
//     body * {
//       visibility: hidden;
//     }
//     #printable, #printable * {
//       visibility: visible;
//     }
//     #printable {
//       position: absolute;
//       left: 0;
//       top: 0;
//     }
//   }
// `;

// // Styled components as provided
// const Container = styled.div`
//   // background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   // background-color: rgba(0, 0, 0, 0.5);
//   min-height: 70vh;
//   padding-top: 80px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px 20px;
// `;

// const FormContainer = styled.div`
//   background: rgba(255, 255, 255, 0.8);
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   width: 500px;
//   margin: 20px auto;
// `;

// const FormLabel = styled.label`
//   display: block;
//   margin: 10px 0 5px;
//   color: #333;
//   font-size: 16px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-sizing: border-box;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: red; // You can adjust this to fit your site's theme
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   margin-top: 10px;

//   &:hover {
//     background-color: darkred;
//   }
// `;

// const PageContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-top: 20px;
// `;

// const Page = styled.div`
//   background: white;
//   width: 100%;
//   max-width: 768px;
//   min-height: 1024px;
//   padding: 1in;
//   margin: 20px;
//   border: 10px solid red;
//   box-shadow: 0 0 10px rgba(0,0,0,0.1);
//   font-family: 'Times New Roman', serif;
//   @media print {
//     box-shadow: none;
//     margin: 0;
//     border: initial;
//   }
// `;

// const Title = styled.h1`
//   text-align: center;
//   font-size: 28px;
//   margin-top: 0;
//   margin-bottom: 20px;
// `;

// const Section = styled.section`
//   margin-bottom: 16px;
// `;

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   font-size: 16px;
//   margin-bottom: 5px;
//   padding-left: 20px; // Indent for items
// `;

// const Bold = styled.span`
//   font-weight: bold;
// `;

// const PrintButton = styled.button`
//   background-color: red;
//   color: white;
//   padding: 8px 16px;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   margin-top: 20px;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   &:hover {
//     background-color: darkred;
//   }
// `;

// const ContractForm = () => {
//   const [formData, setFormData] = useState({
//     effectiveDate: '',
//     principal: '',
//     principalAddress: '',
//     agent: '',
//     agentAddress: '',
//     terms: '',
//     geography: ''
//   });
//   const [showContract, setShowContract] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowContract(true); // Set to true to show the contract upon form submission
//   };
  

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div>
//       <GlobalStyle />
//       <Container>
//       <FormContainer>
//         {/* <form onSubmit={(e) => e.preventDefault()}> */}
//         <form onSubmit={handleSubmit}>
//           <FormLabel>Effective Date:</FormLabel>
//           <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
//           <FormLabel>Principal Name:</FormLabel>
//           <Input type="text" name="principal" value={formData.principal} onChange={handleChange} />
//           <FormLabel>Principal Address:</FormLabel>
//           <Input type="text" name="principalAddress" value={formData.principalAddress} onChange={handleChange} />
//           <FormLabel>Agent Name:</FormLabel>
//           <Input type="text" name="agent" value={formData.agent} onChange={handleChange} />
//           <FormLabel>Agent Address:</FormLabel>
//           <Input type="text" name="agentAddress" value={formData.agentAddress} onChange={handleChange} />
//           <FormLabel>Sale Terms:</FormLabel>
//           <Input type="text" name="terms" value={formData.terms} onChange={handleChange} />
//           <FormLabel>Geography:</FormLabel>
//           <Input type="text" name="geography" value={formData.geography} onChange={handleChange} />
//           <SubmitButton type="submit">Generate Contract</SubmitButton>
//         </form>
//       </FormContainer>
//       {showContract && ( // Conditionally render the contract based on showContract state
//           <PageContainer id="printable">
//       {/* <PageContainer id="printable"> */}
//         <Page>
//           <Title>COMMISSION AGREEMENT</Title>
//           <Section>
//           <List>
//               <ListItem><Bold>PARTIES</Bold> <br/> <br/>- This Commission Agreement (hereinafter referred to as the "Agreement") is entered into on <Bold>{formData.effectiveDate}</Bold>, by and between <Bold>{formData.principal}</Bold> with an address of <Bold>{formData.principalAddress}</Bold> (hereinafter referred to as the "Principal") and <Bold>{formData.agent}</Bold> with an address of <Bold>{formData.agentAddress}</Bold> (hereinafter referred to as the "Agent").</ListItem>
//               <ListItem>Whereas, the Agent agrees not to pursue the selling of a competing product for any competitor during the term of this Agreement.</ListItem>
//               <br/><br/>
//               <ListItem><Bold>AGREEMENT</Bold> <br/><br/> - The Parties hereby agree that the Principal authorizes the Agent to sell on behalf of the Principal and the Agent agrees to indemnify himself/herself as the authorized agent of the Principal for such sale.</ListItem>
//               <br/><br/>
//               <ListItem><Bold>THE SALE</Bold> -<br/><br/> The Parties agree that the prices of the product will be set by the Principal, that the Principal will obtain and provide the promotional materials (if any) for the Agent to use and to obtain sales, and the Principal will provide a Sales Agreement to the Agent for the Agent to use in the sale of the product.</ListItem>
//               <br/><br/>
//               <ListItem><Bold>TERM</Bold> - <br/><br/>This Agreement shall be effective on the date of signing this Agreement (hereinafter referred to as the "Effective Date") and will end on <Bold>{formData.terms}</Bold>.</ListItem>
//               <br/><br/>
//               <ListItem><Bold>GEOGRAPHY</Bold> - <br/><br/>The Parties agree that the Agent will sell the product in the following geographical area/territory <Bold>{formData.geography}</Bold> and will not sell the product anywhere else.</ListItem>
//               <br/><br/><br/><br/>
//               <ListItem><Bold>Signature</Bold> __________ <br/><br/></ListItem>
//             </List>
//           </Section>
//           <PrintButton onClick={handlePrint}>Print Contract</PrintButton>
//         </Page>
//       </PageContainer>
//               )}
//       </Container>
//     </div>
//   );
// };

// export default ContractForm;


import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import bgImage from '../images/bg.jpg';

// Global style for hiding non-essential elements from printing
const GlobalStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    #printable, #printable * {
      visibility: visible;
    }
    #printable {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

// Styled components adjusted for responsiveness
const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 10px;
    padding: 15px;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px;
  color: #333;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Page = styled.div`
  background: white;
  width: 100%;
  max-width: 768px;
  min-height: 1024px;
  padding: 1in;
  margin: 20px;
  border: 10px solid red;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: 'Times New Roman', serif;

  @media print {
    box-shadow: none;
    margin: 0;
    border: initial;
  }

  @media (max-width: 768px) {
    margin: 10px;
    padding: 0.5in;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px; // Smaller font for smaller screens
  margin-top: 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Section = styled.section`
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 20px; // Indent for items
`;

const Bold = styled.span`
  font-weight: bold;
`;

const PrintButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: darkred;
  }
`;

const ContractForm = () => {
  const [formData, setFormData] = useState({
    effectiveDate: '',
    principal: '',
    principalAddress: '',
    agent: '',
    agentAddress: '',
    terms: '',
    geography: ''
  });
  const [showContract, setShowContract] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowContract(true); // Set to true to show the contract upon form submission
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <GlobalStyle />
      <Container>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormLabel>Effective Date:</FormLabel>
            <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
            <FormLabel>Principal Name:</FormLabel>
            <Input type="text" name="principal" value={formData.principal} onChange={handleChange} />
            <FormLabel>Principal Address:</FormLabel>
            <Input type="text" name="principalAddress" value={formData.principalAddress} onChange={handleChange} />
            <FormLabel>Agent Name:</FormLabel>
            <Input type="text" name="agent" value={formData.agent} onChange={handleChange} />
            <FormLabel>Agent Address:</FormLabel>
            <Input type="text" name="agentAddress" value={formData.agentAddress} onChange={handleChange} />
            <FormLabel>Sale Terms:</FormLabel>
            <Input type="text" name="terms" value={formData.terms} onChange={handleChange} />
            <FormLabel>Geography:</FormLabel>
            <Input type="text" name="geography" value={formData.geography} onChange={handleChange} />
            <SubmitButton type="submit">Generate Contract</SubmitButton>
          </form>
        </FormContainer>
        {showContract && (
          <PageContainer id="printable">
            <Page>
              <Title>COMMISSION AGREEMENT</Title>
              <Section>
                <List>
                  <ListItem><Bold>PARTIES</Bold> <br/> <br/>- This Commission Agreement (hereinafter referred to as the "Agreement") is entered into on <Bold>{formData.effectiveDate}</Bold>, by and between <Bold>{formData.principal}</Bold> with an address of <Bold>{formData.principalAddress}</Bold> (hereinafter referred to as the "Principal") and <Bold>{formData.agent}</Bold> with an address of <Bold>{formData.agentAddress}</Bold> (hereinafter referred to as the "Agent").</ListItem>
                  <ListItem>Whereas, the Agent agrees not to pursue the selling of a competing product for any competitor during the term of this Agreement.</ListItem>
                  <br/><br/>
                  <ListItem><Bold>AGREEMENT</Bold> <br/><br/> - The Parties hereby agree that the Principal authorizes the Agent to sell on behalf of the Principal and the Agent agrees to indemnify himself/herself as the authorized agent of the Principal for such sale.</ListItem>
                  <br/><br/>
                  <ListItem><Bold>THE SALE</Bold> -<br/><br/> The Parties agree that the prices of the product will be set by the Principal, that the Principal will obtain and provide the promotional materials (if any) for the Agent to use and to obtain sales, and the Principal will provide a Sales Agreement to the Agent for the Agent to use in the sale of the product.</ListItem>
                  <br/><br/>
                  <ListItem><Bold>TERM</Bold> - <br/><br/>This Agreement shall be effective on the date of signing this Agreement (hereinafter referred to as the "Effective Date") and will end on <Bold>{formData.terms}</Bold>.</ListItem>
                  <br/><br/>
                  <ListItem><Bold>GEOGRAPHY</Bold> - <br/><br/>The Parties agree that the Agent will sell the product in the following geographical area/territory <Bold>{formData.geography}</Bold> and will not sell the product anywhere else.</ListItem>
                  <br/><br/><br/><br/>
                  <ListItem><Bold>Signature</Bold> __________ <br/><br/></ListItem>
                </List>
              </Section>
              <PrintButton onClick={handlePrint}>Print Contract</PrintButton>
            </Page>
          </PageContainer>
        )}
      </Container>
    </div>
  );
};

export default ContractForm;
