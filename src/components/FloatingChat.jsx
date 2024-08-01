import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatComponent from './chat'; // Import your existing ChatComponent

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1100;
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: darkred;
  }
`;

const FloatingChatContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 600px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
`;

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoggedIn) {
    return null; // Don't render the component if the user is not logged in
  }

  return (
    <>
      <FloatingButton onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </FloatingButton>
      {isOpen && (
        <FloatingChatContainer>
          <ChatComponent />
        </FloatingChatContainer>
      )}
    </>
  );
};

export default FloatingChat;
