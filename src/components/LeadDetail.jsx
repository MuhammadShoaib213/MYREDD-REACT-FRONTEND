import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import bgImage from '../images/bg.jpg'; 
import { useParams, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import ContractForm from './ContractForm';

// ----------------------
// Theme Definition
// ----------------------
const theme = {
  primary: '#e74c3c',           // Primary color for headers and buttons
  secondary: '#ff4500',         // Secondary button color (used on hover)
  background: '#ffffff',        // Card/background color
  overlay: 'rgba(0, 0, 0, 0.7)',  // Overlay background color
  inputBorder: '#ddd',          // Input border color
  inputFocus: '#e74c3c',         // Input focus border color
};

// ----------------------
// Styled Components
// ----------------------
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: ${(props) => props.theme.overlay};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  overflow: auto;
  padding-top: 100px;
`;

const Header = styled.h1`
  color: ${(props) => props.theme.background};
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Section = styled.div`
  width: 100%;
  max-width: 800px;
  background: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  padding: 30px;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.primary};
  margin-bottom: 15px;
  font-size: 1.8rem;
`;

const Button = styled.button`
  background: ${(props) => props.theme.primary};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  margin: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, transform 0.3s;
  &:hover {
    background: ${(props) => props.theme.secondary};
    transform: translateY(-2px);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 1rem;
  transition: border 0.3s;
  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 1rem;
  transition: border 0.3s;
  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 1rem;
  transition: border 0.3s;
  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    outline: none;
  }
`;

const NotesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoteItem = styled.li`
  background: #f1f1f1;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: #666;
  display: block;
  text-align: right;
  margin-top: 8px;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background: #d9534f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
  &:hover {
    background: #c9302c;
  }
`;

// Update BackButton to use the theme keys directly (without the "colors" property)
const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
  background-color: #ffffff;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: #ffffff;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    left: 10px;
    width: auto;
    text-align: center;
  }
`;

// ----------------------
// Helper Functions
// ----------------------

// Format the commission based on its type.
// If type is 'percentage', append a '%' sign; otherwise, return the value as is.
const formatCommission = (commission) => {
  if (!commission) return '';
  if (typeof commission === 'object') {
    const { type, value } = commission;
    return type === 'percentage' ? `${value}%` : value;
  }
  return commission;
};

// Updated formatRequirement function to use available fields and avoid errors
const formatRequirement = (property) => {
  const length = property.landLength || property.coveredLength || '';
  const width = property.landWidth || property.coveredWidth || '';
  const unit = property.landUnit || property.coveredUnit || 'feet';
  
  let formattedFeatures = '';
  if (property.facilities && Array.isArray(property.facilities) && property.facilities.length > 0) {
    formattedFeatures = property.facilities
      .map(facility => facility.name || '')
      .filter(name => name)
      .join(", ");
  }
  
  if (!length && !width) {
    return formattedFeatures ? `Features: ${formattedFeatures}` : 'No requirement details available';
  }
  
  let requirementString = `${length} x ${width} ${unit}`;
  if (formattedFeatures) {
    requirementString += ` - Features: ${formattedFeatures}`;
  }
  return requirementString;
};

// ----------------------
// Main Component: LeadDetailPage
// ----------------------
const LeadDetailPage = () => {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [scheduleType, setScheduleType] = useState('call');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [status, setStatus] = useState(propertyData.status);
  const navigate = useNavigate(); 

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      let propertyResponse;
      try {
        propertyResponse = await axios.get(`/api/properties/propertybyid/${id}`, { headers });
        setPropertyData(propertyResponse.data);
      } catch (err) {
        setError(`Error fetching property data: ${err.response ? err.response.data.message : err.message}`);
      }
      if (propertyResponse && propertyResponse.data.customerId && token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const notesResponse = await axios.get(`/api/notes/${userId}/${id}/${propertyResponse.data.customerId}`, { headers });
          setNotes(notesResponse.data);
        } catch (err) {
          console.error(`Error fetching notes: ${err.response ? err.response.data.message : err.message}`);
        }
      }
    } catch (err) {
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSchedules = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const response = await axios.get(`/api/schedules/user/${userId}`, { headers });
      setSchedules(response.data);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setError(`Failed to fetch schedules: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.patch(`/api/properties/updateStatus/${id}`, { status: newStatus }, { headers });
      alert('Status updated successfully!');
      console.log(response.data);
    } catch (error) {
      alert(`Failed to update status: ${error.response ? error.response.data.message : error.message}`);
      console.error('Failed to update status:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSchedules();
    setStatus(propertyData.status);
  }, [id, token, propertyData.status]);

  const handleSaveNote = async () => {
    if (!note && !audioURL) {
      console.error('No note or audio URL provided.');
      return;
    }
    if (!propertyData || !propertyData._id || !propertyData.cnicNumber) {
      console.error('Property data is not fully loaded.');
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const datetime = new Date().toISOString();
    const formData = new FormData();
    formData.append('propertyId', propertyData._id);
    formData.append('customerId', propertyData.customerId);
    formData.append('text', note);
    formData.append('datetime', datetime);
    if (audioURL) {
      const response = await fetch(audioURL);
      const blob = await response.blob();
      formData.append('audio', new File([blob], 'audioNote.webm', { type: 'audio/webm' }));
    }
    try {
      const response = await axios.post('/api/notes', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes([...notes, response.data]);
      setNote('');
      setAudioURL('');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };
  
  const handleDeleteNote = async (noteId, index) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/api/notes/${noteId}`, { headers });
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to delete note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };
  
  const handleRecordAudio = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();
        audioChunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };
        setIsRecording(true);
      });
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
        };
        setIsRecording(false);
      }
    }
  };

  const handleSaveSchedule = async () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please fill in all schedule fields.");
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const headers = { Authorization: `Bearer ${token}` };
    const scheduleData = {
      userId,
      propertyId: id,
      customerId: propertyData.customerId,
      scheduleType,
      date: new Date(scheduleDate + 'T' + scheduleTime).toISOString(),
      time: scheduleTime
    };
    try {
      const response = await axios.post('/api/schedules/add', scheduleData, { headers });
      alert('Schedule saved successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to save schedule:', error);
      alert(`Failed to save schedule: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Header>Lead Details</Header>
        
        {propertyData && (
          <>
            <Section>
              <SectionTitle>Lead Information</SectionTitle>
              <Label>Lead #:</Label>
              <Input type="text" value={propertyData._id} readOnly />
              
              <Label>Name:</Label>
              <Input type="text" value={propertyData.customerName} readOnly />
              
              <Label>Requirement:</Label>
              <Input type="text" value={formatRequirement(propertyData)} readOnly />
            </Section>
  
            <Section>
              <SectionTitle>Schedule Interaction</SectionTitle>
              <div>
                <h3>Existing Schedules</h3>
                <ul>
                  {schedules.map((schedule, index) => (
                    <li key={index}>
                      <p><strong>Type:</strong> {schedule.scheduleType}</p>
                      <p><strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {schedule.time}</p>
                    </li>
                  ))}
                </ul>
              </div>
  
              <div>
                <h3>Add New Schedule</h3>
                <Label>Type:</Label>
                <Select value={scheduleType} onChange={e => setScheduleType(e.target.value)}>
                  <option value="call">Call</option>
                  <option value="meet">Meet</option>
                </Select>
  
                <Label>Date:</Label>
                <Input
                  type="date"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                />
  
                <Label>Time:</Label>
                <Input
                  type="time"
                  value={scheduleTime}
                  onChange={e => setScheduleTime(e.target.value)}
                />
  
                <Button onClick={handleSaveSchedule}>Save Schedule</Button>
              </div>
            </Section>
  
            <Section>
              <SectionTitle>Notes</SectionTitle>
              <Input
                type="text"
                placeholder="Write your note here..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              <Button onClick={handleSaveNote}>Save Note</Button>
              <Button onClick={handleRecordAudio}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              <Button onClick={() => { if (audioURL) handleSaveNote(); }} disabled={!audioURL}>
                Save Recording
              </Button>
              <NotesList>
                {notes.map((note, index) => (
                  <NoteItem key={note._id}>
                    {note.text}
                    {note.audioURL && <AudioPlayer controls src={note.audioURL} />}
                    <DeleteButton onClick={() => handleDeleteNote(note._id, index)}>Delete</DeleteButton>
                    <Timestamp>{new Date(note.datetime).toLocaleString()}</Timestamp>
                  </NoteItem>
                ))}
              </NotesList>
            </Section>
  
            <Section>
              <SectionTitle>Priority and Commission</SectionTitle>
              <Label>Set Priority:</Label>
              <Input type="text" value={propertyData.priority} readOnly />
  
              <Label>Commission:</Label>
              <Input type="text" value={formatCommission(propertyData.commission)} readOnly />
            </Section>
  
            <Section>
              <SectionTitle>Update Status</SectionTitle>
              <Label>Lead Status:</Label>
              <Input type="text" value={propertyData.status} readOnly />
              <Label>Update Lead Status:</Label>
              <Select value={status || 'pending'} onChange={e => handleStatusChange(e.target.value)}>
                <option value="active">Select Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </Select>
            </Section>
          </>
        )}
      </PageContainer>
    </ThemeProvider>
  );
};

export default LeadDetailPage;
