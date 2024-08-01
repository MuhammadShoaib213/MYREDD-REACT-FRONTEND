import React from 'react';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';


const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;
// Styled Components
const FeedbackContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const EmojiButton = styled.button`
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  margin: 0 10px;
`;

// FeedbackComponent definition
const FeedbackComponent = ({ feedbackId, agentId, customerId, propertyId, leadId }) => {
  // Function to send feedback using emojis
  const sendFeedback = (category, sentiment) => {
    const feedbackUrl = `https://yourdomain.com/feedback?uid=${feedbackId}&category=${encodeURIComponent(category)}&sentiment=${sentiment}&agentId=${agentId}&customerId=${customerId}&propertyId=${propertyId}&leadId=${leadId}`;
    window.open(feedbackUrl, '_blank');
  };

  return (
    <Container>
    <FeedbackContainer>
      <div>
        <Title>Agent Services Feedback</Title>
        <EmojiButton onClick={() => sendFeedback('Agent Services', 'happy')}>😊</EmojiButton>
        <EmojiButton onClick={() => sendFeedback('Agent Services', 'sad')}>😞</EmojiButton>
      </div>
      <div>
        <Title>Property Feedback</Title>
        <EmojiButton onClick={() => sendFeedback('Property', 'happy')}>😊</EmojiButton>
        <EmojiButton onClick={() => sendFeedback('Property', 'sad')}>😞</EmojiButton>
      </div>
    </FeedbackContainer>
    </Container>
  );
};

export default FeedbackComponent;
