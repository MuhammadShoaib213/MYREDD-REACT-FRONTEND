import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #ffffff;
  width: 300px;
  margin: auto;
`;

const FormContainer = styled.div`
  /* Add styling for the form container if needed */
`;


const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const Heading = styled.h2`
  color: black;
  margin-bottom: 20px;
`;

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('api/contact/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, message }),
    });
    if (response.ok)

 {
      // Handle success
      alert('Message sent successfully!');
    } else {
      // Handle error
      alert('Failed to send message.');
    }
  };

  return (
    <FormContainer id="ContactUs">
      <br/>
    <Form onSubmit={handleSubmit}>
      <Heading>{'Contact Us'}</Heading>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
      <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
      <TextArea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" required />
      <SubmitButton type="submit">Send</SubmitButton>
    </Form>
    <br/>
    <br/>
    <br/>
    </FormContainer>
  );
};

export default ContactForm;