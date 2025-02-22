// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   background: #ffffff;
//   width: 100%;
//   max-width: 500px; /* Adjust the max-width as needed */
//   margin: auto;

//   @media (max-width: 600px) {
//     padding: 10px;
//   }
// `;

// const FormContainer = styled.div`
//   width: 100%;
//   padding: 0 10px;

//   @media (min-width: 601px) {
//     padding: 0;
//   }
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const TextArea = styled.textarea`
//   margin-bottom: 10px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const SubmitButton = styled.button`
//   padding: 10px;
//   background-color: red;
//   color: white;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     background-color: darkred;
//   }

//   width: 100%;
// `;

// const Heading = styled.h2`
//   color: black;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const ContactForm = () => {
//   const [senderEmail, setSenderEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('http://195.179.231.102:6003/api/contact/send', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ senderEmail, subject, message }),
//     });
//     if (response.ok) {
//       // Handle success
//       alert('Message sent successfully!');
//     } else {
//       // Handle error
//       alert('Failed to send message.');
//     }
//   };

//   return (
//     <FormContainer id="ContactUs">
//       <br />
//       <Form onSubmit={handleSubmit}>
//         <Heading>Contact Us</Heading>
//         <Input
//           type="email"
//           value={senderEmail}
//           onChange={(e) => setSenderEmail(e.target.value)}
//           placeholder="Your email"
//           required
//         />
//         <Input
//           type="text"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           placeholder="Subject"
//           required
//         />
//         <TextArea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Message"
//           required
//         />
//         <SubmitButton type="submit">Send</SubmitButton>
//       </Form>
//       <br />
//       <br />
//       <br />
//     </FormContainer>
//   );
// };

// export default ContactForm;


import React, { useState } from 'react';
import styled from 'styled-components';
import { API_CONFIG } from '../config/api.config';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #ffffff;
  width: 100%;
  max-width: 500px; /* Adjust the max-width as needed */
  margin: auto;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 0 10px;

  @media (min-width: 601px) {
    padding: 0;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: darkred;
  }
`;

const Heading = styled.h2`
  color: black;
  margin-bottom: 20px;
  text-align: center;
`;

const ContactForm = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_CONFIG.API_URL}/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail, subject, message }),
      });
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <FormContainer id="ContactUs">
      <br />
      <Form onSubmit={handleSubmit}>
        <Heading>Contact Us</Heading>
        <Input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          placeholder="Your email"
          required
        />
        <Input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <SubmitButton type="submit">Send</SubmitButton>
      </Form>
      <br />
      <br />
      <br />
    </FormContainer>
  );
};

export default ContactForm;
