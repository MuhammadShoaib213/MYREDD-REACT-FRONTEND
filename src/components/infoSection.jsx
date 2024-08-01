import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 50px 20px;
  background: #ffffff;
  text-align: center;
`;

const Heading = styled.h2`
  color: black;
  margin-bottom: 20px;
`;
const Heading2 = styled.h1`
  color: black;
  margin-bottom: 20px;
`;

const Content = styled.p`
  color: gray;
`;

const InfoSection = ({ title, text }) => (
  <Section id="AboutUs">
    <br/>
    <br/>
    <Heading></Heading>
    <Heading2>What we do - Find everything you need to lead in real Estate</Heading2>
    <br/>
    <Content>End to end, lead to close – we bring the top software you need to run a successful real estate business. Our products cover every step of entire real estate experience in one connected platform, so you can work from start to finish without fail.</Content>
    <br/>
    <br/>
  </Section>
);

export default InfoSection;