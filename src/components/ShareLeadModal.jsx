import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure jwtDecode is imported

const ModalContent = styled.div`
  padding: 20px;
  background-color: white;
  color: #333;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  margin: 5% auto; /* Center the modal and provide space around it */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  text-align: center;
`;

const FriendsList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 300px; /* Limit the height to make it scrollable */
  overflow-y: auto;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-height: 200px; /* Reduce the height for smaller screens */
  }
`;

const FriendItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Checkbox = styled.input`
  margin-right: 15px;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: bold;
    font-size: 1em;
  }

  small {
    color: #666;
    font-size: 0.9em;
  }
`;

const ShareButton = styled.button`
  background-color: #ff4500;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-right: 10px;
  width: 100%;
  
  &:hover {
    background-color: #e03e00;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff4500;
  }

  &:active {
    background-color: #c63600;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
  
  &:hover {
    background-color: #bbb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ccc;
  }

  &:active {
    background-color: #aaa;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      margin-bottom: 10px;
    }
  }
`;

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
            headers: { Authorization: `Bearer ${token}` }
          });

          if (Array.isArray(response.data)) {
            const fetchedFriends = response.data.filter(friend => friend._id !== userId);
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
    setSelectedFriends(prev => {
      if (prev.includes(friendId)) {
        return prev.filter(id => id !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };

  const handleShareWithAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://195.179.231.102:6003/api/shared-leads/share-lead', {
        leadId: leadId,
        shareWithAll: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Lead shared with all users!');
      onRequestClose();
    } catch (error) {
      console.error('Error sharing lead with all users:', error);
    }
  };

  const shareLead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://195.179.231.102:6003/api/shared-leads/share-lead', {
        leadId: leadId,
        friendIds: selectedFriends
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Lead shared successfully!');
      onRequestClose();
    } catch (error) {
      console.error('Error sharing lead:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Share Lead">
      <ModalContent>
        <ModalHeader>Share Lead</ModalHeader>
        <FriendsList>
          {friends.map(friend => (
            <FriendItem key={friend._id}>
              <Checkbox
                type="checkbox"
                value={friend._id}
                checked={selectedFriends.includes(friend._id)}
                onChange={() => handleFriendSelection(friend._id)}
              />
              <FriendInfo>
                <span>{friend.firstName} {friend.lastName}</span>
                <small>{friend.email}</small>
              </FriendInfo>
            </FriendItem>
          ))}
        </FriendsList>
        <ButtonContainer>
          <ShareButton onClick={handleShareWithAll}>Share with All Users</ShareButton>
          <ShareButton onClick={shareLead}>Share</ShareButton>
          <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default ShareLeadModal;
