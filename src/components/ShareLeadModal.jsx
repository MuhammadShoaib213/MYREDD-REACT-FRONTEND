import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// Fade-in animation for the modal content
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalContent = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  padding: 30px;
  background: #ffffff;
  color: #333;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  border: 1px solid #eaeaea;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ModalHeader = styled.h2`
  margin-bottom: 25px;
  font-size: 1.8em;
  text-align: center;
  color: #e74c3c;
`;

/* 
  Update the FriendsList to display friend items in a row with horizontal scrolling.
  The scrollbars are hidden using vendor prefixes and standard properties.
*/
const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 25px;

  /* Hide scrollbars for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FriendItem = styled.li`
  min-width: 200px;
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: #fefefe;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #f5f5f5;
    transform: scale(1.02);
  }
`;

const Checkbox = styled.input`
  margin-right: 15px;
  width: 18px;
  height: 18px;
  accent-color: #e74c3c;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: 600;
    font-size: 1.1em;
  }

  small {
    color: #888;
    font-size: 0.9em;
  }
`;

const ShareButton = styled.button`
  background-color: #ff4500;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s;
  width: 100%;
  margin-bottom: 10px;

  &:hover {
    background-color: #e03e00;
    transform: scale(1.02);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(255, 69, 0, 0.6);
  }

  &:active {
    background-color: #c63600;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s;
  width: 100%;

  &:hover {
    background-color: #bbb;
    transform: scale(1.02);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(204, 204, 204, 0.6);
  }

  &:active {
    background-color: #aaa;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 25px;

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      margin-bottom: 10px;
    }
  }
`;

/*
  Custom modal styles for react-modal:
  - The overlay uses a semi-transparent black background with a blur effect.
  - The content is centered using top, left, and transform properties.
*/
const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'transparent',
    padding: '0',
    overflow: 'visible',
  },
};

const ShareLeadModal = ({ isOpen, onRequestClose, leadId }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        try {
          const response = await axios.get(`/friend/list?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (Array.isArray(response.data)) {
            const fetchedFriends = response.data.filter(
              (friend) => friend._id !== userId
            );
            setFriends(fetchedFriends);
          } else {
            console.error('Unexpected data structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      }
    };

    if (isOpen) {
      fetchFriends();
    }
  }, [isOpen]);

  const handleFriendSelection = (friendId) => {
    setSelectedFriends((prev) => {
      if (prev.includes(friendId)) {
        return prev.filter((id) => id !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };

  const handleShareWithAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://195.179.231.102:6003/api/shared-leads/share-lead',
        {
          leadId: leadId,
          shareWithAll: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Lead shared with all users!');
      onRequestClose();
    } catch (error) {
      console.error('Error sharing lead with all users:', error);
    }
  };

  const shareLead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://195.179.231.102:6003/api/shared-leads/share-lead',
        {
          leadId: leadId,
          friendIds: selectedFriends,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Lead shared successfully!');
      onRequestClose();
    } catch (error) {
      console.error('Error sharing lead:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Share Lead"
      style={customModalStyles}
    >
      <ModalContent>
        <ModalHeader>Share Lead</ModalHeader>
        <FriendsList>
          {friends.map((friend) => (
            <FriendItem key={friend._id}>
              <Checkbox
                type="checkbox"
                value={friend._id}
                checked={selectedFriends.includes(friend._id)}
                onChange={() => handleFriendSelection(friend._id)}
              />
              <FriendInfo>
                <span>
                  {friend.firstName} {friend.lastName}
                </span>
                <small>{friend.email}</small>
              </FriendInfo>
            </FriendItem>
          ))}
        </FriendsList>
        <ButtonContainer>
          <ShareButton onClick={handleShareWithAll}>
            Share with All Users
          </ShareButton>
          <ShareButton onClick={shareLead}>Share</ShareButton>
          <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default ShareLeadModal;
