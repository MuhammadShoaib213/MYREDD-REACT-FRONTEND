import React, { useState } from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Tab = styled.button`
  padding: 10px;
  border: none;
  background-color: ${(props) => (props.active ? 'red' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  font-size: 1rem;
  cursor: pointer;
  margin: 5px 0;

  &:hover {
    background-color: #b82b24;
    color: white;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
  color: gray;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const features = [
  { name: 'Property Bank', description: 'Effortlessly manage and organize your properties.' },
  { name: 'Contact List', description: 'Keep all your contacts in one convenient place.' },
  { name: 'CRM', description: 'Streamline customer relationships and interactions.' },
  { name: 'Built-in Chat Feature', description: 'Seamlessly communicate with team members in real-time.' },
  { name: 'Built-in Drive to Store Documents', description: 'Store and access documents with ease using our integrated drive.' }
];

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(features[0].name);

  return (
    <TabsContainer id="Tab">
      <TabList>
        {features.map(feature => (
          <Tab
            key={feature.name}
            active={activeTab === feature.name}
            onClick={() => setActiveTab(feature.name)}
          >
            {feature.name}
          </Tab>
        ))}
      </TabList>
      <Content>
        {features.find(feature => feature.name === activeTab).description}
      </Content>
    </TabsContainer>
  );
};

export default FeatureTabs;
