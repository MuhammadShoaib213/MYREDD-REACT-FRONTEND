import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 20%;
  background: #ddd;
  padding: 10px;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(-100%)'};
  @media (max-width: 500px) {
    width: 100%;
    position: absolute;
    z-index: 10;
  }
`;

const ChatWindow = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  @media (max-width: 500px) {
    height: 300px;
  }
`;

const InputArea = styled.form`
  display: flex;
  padding: 5px;
  background: #ccc;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  margin-right: 5px;
  border: 1px solid #bbb;
  font-size: 0.8rem;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
`;


const Badge = styled.span`
  background-color: #ff0000;
  color: white;
  padding: 2px 6px;
  font-size: 0.75rem;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
`;






const Message = styled.div`
  padding: 8px 12px;
  margin: 5px;
  background-color: ${({ sentByMe }) => (sentByMe ? '#aaf' : '#faa')};
  align-self: ${({ sentByMe }) => (sentByMe ? 'flex-end' : 'flex-start')};
  border-radius: 15px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  max-width: 70%;
  word-wrap: break-word;
`;






const FriendRequestList = styled.div`
  padding: 5px; // Reduced padding
`;

const FriendRequestItem = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px; // Reduced padding
  margin-bottom: 3px; // Reduced margin
  font-size: 0.8rem;
`;

const ContactItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #f0f0f0;  // Light grey background on hover
    border-color: #aaa;         // Darker border on hover
  }
`;


// Setup axios instance with token
axios.defaults.baseURL = 'api';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const ChatComponent = () => {



const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);


const [isSidebarVisible, setSidebarVisible] = useState(true);
const [showAddModal, setShowAddModal] = useState(false);
const [showRequestsModal, setShowRequestsModal] = useState(false);

  const [currentChat, setCurrentChat] = useState({ messages: [] });
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [message, setMessage] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [sender, setSenderId] = useState(null);  // Global sender ID
  const [receiver, setReceiverId] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get('/friends/list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Fetched contacts:', data); // Check what the data actually looks like
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };
  
    fetchContacts();
  }, []);
  
  
  

  const handleAddContact = async (event) => {
    event.preventDefault();
    if (!newContact.trim()) return;
  
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      console.log("Retrieved token:", token);
      
      const response = await axios.post('/friends/add', { email: newContact}, {
        headers: {
          'Authorization': `Bearer ${token}` // Correctly passing the token
        }
      });
      setContacts(prevContacts => [...prevContacts, response.data]);
      setNewContact('');
    } catch (error) {
      console.error('Failed to add contact:', error);
      alert('Failed to add contact. Please try again.');
    }
  };
  
  useEffect(() => {
    axios.get('/friends/requests')
      .then(response => {
        if (response.data.length > 0) {
          toast.info(`You have ${response.data.length} new friend request(s)`);
        }
        console.log("Friend Requests:", response.data);  // Check what is actually being received
        setFriendRequests(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch friend requests:', error);
      });
}, []);

  
  
  const acceptFriendRequest = async (requestId) => {
    try {
      const response = await axios.post(`/friends/accept`, { requestId });
      if (response.status === 200) {
        setFriendRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
        alert('Friend request accepted.');
      } else {
        throw new Error('Failed to accept friend request due to server error.');
      }
    } catch (error) {
      console.error('Failed to accept friend request:', error);
      alert(error.response ? error.response.data.message : error.message);
    }
  };
  
const handleSelectContact = async (contact) => {
    const senderId = contact.users[0].id; // Assuming the first user is always the sender
    const receiverId = contact.users[1].id; // Assuming the second user is always the receiver

    setSenderId(senderId); // Set global sender ID
    setReceiverId(receiverId); 


    try {
        // Fetch the chatId from the backend
        const response = await axios.get(`/messages/chat/${senderId}/${receiverId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
        });

        console.log("contact data:", contact);
        const chatId = response.data.chatId;

        setCurrentChat({
            id: chatId,
            name: contact.users[1].name, // Assuming the second user is the one you're chatting with
            messages: [],
            recipientId: receiverId
        });

        // Fetch messages for the newly set chat
        fetchMessages(chatId);
    } catch (error) {
        console.error('Failed to select contact:', error);
        alert('Failed to load chat. Please try again.');
    }
};

const fetchMessages = async (chatId) => {
    try {
        const response = await axios.get(`/messages/fetch/${chatId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCurrentChat(prevChat => ({
            ...prevChat,
            messages: response.data
        }));



    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }
};

  

const handleSendMessage = async (event) => {
    console.log("senderId",sender);
    console.log("receiverId",receiver);
    event.preventDefault();
    if (!message.trim()) return;

    try {
        const { data } = await axios.post('/messages/send', {
            content: message,
            receiver, // Send this along with the message content
            sender,

        });
        const updatedMessages = [...currentChat.messages, data];
        setCurrentChat(prev => ({ ...prev, messages: updatedMessages }));
        setMessage('');
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};


  return (
  <Container>
     <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <Sidebar className={isSidebarVisible ? 'active' : ''} isVisible={isSidebarVisible}>
    <h3>Contacts</h3>
  {contacts.map(contact => contact.users && contact.users[0] && (
    <ContactItem key={contact.id} onClick={() => handleSelectContact(contact)}>
      {contact.users[0].name}
    </ContactItem>
  ))}
  <br/>
      <br/>
      <Button onClick={() => setShowAddModal(true)}>Add New Contact</Button>
      <br/>
      <br/>
      <Button onClick={() => setShowRequestsModal(true)}>
        Friend Requests ({friendRequests.length})
      </Button>
    </Sidebar>

    <Modal show={showAddModal}>
      <ModalContent>
        <h4>Add New Contact</h4>
        <InputArea onSubmit={handleAddContact}>
          <Input
            type="text"
            placeholder="Enter contact email"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </InputArea>
        <Button onClick={() => setShowAddModal(false)}>Close</Button>
      </ModalContent>
    </Modal>

    <Modal show={showRequestsModal}>
      <ModalContent>
        <h4>Friend Requests</h4>
        {friendRequests.map(request => (
          <div key={request._id}>
            {request.requester.email}
            <Button onClick={() => acceptFriendRequest(request._id)}>Accept</Button>
          </div>
        ))}
        <Button onClick={() => setShowRequestsModal(false)}>Close</Button>
      </ModalContent>
    </Modal>

    <ChatWindow>
        {currentChat ? (
          <>
            <h2>Chat with {currentChat.name}</h2>
            <div>
              {currentChat.messages.map((msg, index) => (
                <Message key={index} sentByMe={msg.sentByMe}>
                  {msg.content}
                </Message>
              ))}
            </div>
            <InputArea onSubmit={handleSendMessage}>
              <Input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button type="submit">Send</Button>
            </InputArea>
          </>
        ) : (
          <div>Please select a contact to start chatting.</div>
        )}
      </ChatWindow>
  </Container>
  );
};

export default ChatComponent;
