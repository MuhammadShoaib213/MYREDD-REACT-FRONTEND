// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg'; 
// import { useParams } from 'react-router-dom';

// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7);
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   overflow: auto;
// `;

// const Header = styled.h1`
//   color: red;
//   margin-bottom: 20px;
// `;

// const Section = styled.div`
//   width: 100%;
//   max-width: 800px;
//   margin-bottom: 20px;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
// `;

// const SectionTitle = styled.h2`
//   color: red;
//   margin-bottom: 10px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   width: calc(100% - 22px);
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   margin-bottom: 10px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   margin-bottom: 10px;
// `;

// const Textarea = styled.textarea`
//   width: 100%;
//   height: 100px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   margin-bottom: 10px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   background-color: red;
//   color: white;
//   cursor: pointer;
//   margin-right: 10px;
//   &:hover {
//     background-color: darkred;
//   }
// `;

// const LeadDetailPage = () => {
//   const { id } = useParams();
//   const [propertyData, setPropertyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPropertyData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/properties/propertybyid/${id}`);
//         setPropertyData(response.data);
//         console.log(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyData();
//   }, [id]);

//   if (loading) return <PageContainer>Loading...</PageContainer>;
//   if (error) return <PageContainer>Error: {error}</PageContainer>;

//   const formatRequirement = (property) => {
//     const { length, width, features } = property;
//     const formattedFeatures = Object.entries(features)
//       .filter(([key, value]) => value)
//       .map(([key]) => key)
//       .join(", ");
//       return `${length} x ${width} feet - Features: ${formattedFeatures}`;
//   };

//   return (
//     <PageContainer>
//       <Header>Lead Details</Header>
      
//       {propertyData && (
//         <>
//           <Section>
//             <SectionTitle>Lead Information</SectionTitle>
//             <Label>Lead #:</Label>
//             <Input type="text" value={propertyData._id} readOnly />
            
//             <Label>Name:</Label>
//             <Input type="text" value={propertyData.customerName} readOnly />
            
//             <Label>Requirement:</Label>
//             <Input type="text" value={formatRequirement(propertyData)} readOnly />
//           </Section>

//           <Section>
//             <SectionTitle>Interaction</SectionTitle>
//             <Label>Call/Meet:</Label>
//             <Select defaultValue={propertyData.interactionType}>
//               <option value="call">Call</option>
//               <option value="meet">Meet</option>
//             </Select>

//             <Label>Table Format (One Line):</Label>
//             <Select defaultValue={propertyData.tableFormat}>
//               <option value="format1">Format 1</option>
//               <option value="format2">Format 2</option>
//             </Select>
//           </Section>

//           <Section>
//             <SectionTitle>Notes</SectionTitle>
//             <Label>Voice Notes:</Label>
//             <Button>Record</Button>
//             <Button>Send (Email/WhatsApp)</Button>
//             <Button>Share with Associates</Button>
            
//             <Label>Text Notes:</Label>
//             <Textarea placeholder="Write notes here"></Textarea>
//           </Section>

//           <Section>
//             <SectionTitle>Priority and Commission</SectionTitle>
//             <Label>Set Priority:</Label>
//             <Select defaultValue={propertyData.priority}>
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//               <option value="low">Low</option>
//             </Select>

//             <Label>Commission Percentage:</Label>
//             <Input type="text" value={propertyData.commissionPercentage} readOnly />
//           </Section>

//           <Section>
//             <SectionTitle>Generate Contract</SectionTitle>
//             <Button>Send (Email/WhatsApp)</Button>
//             <Button>Share with Associates</Button>
//             <Button>Share Contract</Button>
//           </Section>

//           <Section>
//             <SectionTitle>Update Status</SectionTitle>
//             <Label>Lead Status:</Label>
//             <Select defaultValue={propertyData.status}>
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//               <option value="sold">Sold</option>
//             </Select>
//           </Section>

//           <Section>
//             <SectionTitle>Generate Contract</SectionTitle>
//             <Button>Generate Contract</Button>
//           </Section>
//         </>
//       )}
//     </PageContainer>
//   );
// };

// export default LeadDetailPage;




import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg'; 
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import ContractForm from './ContractForm';
import {  useNavigate } from 'react-router-dom';


const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: auto;
  padding-top: 135px;
`;

const Header = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  color: white;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Section = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: darkred;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7);
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   overflow: auto;
//   padding-top: 80px;
// `;

// const Header = styled.h1`
//   color: white;
//   margin-bottom: 20px;
// `;

// const Section = styled.div`
//   width: 100%;
//   max-width: 800px;
//   margin-bottom: 20px;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
// `;

// const SectionTitle = styled.h2`
//   color: red;
//   margin-bottom: 10px;
// `;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   background-color: red;
//   color: white;
//   cursor: pointer;
//   margin-right: 10px;
//   &:hover {
//     background-color: darkred;
//   }
// `;

const NotesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoteItem = styled.li`
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;  // Organize content in columns
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #666;
  align-self: flex-end;  // Position at the end of the flex container
  margin-top: 5px;  // Give some space from the main content
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  align-self: flex-end;
  border-radius: 4px;
  margin-top: 5px;  // Ensure some space from the audio player

  &:hover {
    background-color: darkred;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 135px;
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 60px;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 10; // Bring the button above other elements
  
  &:hover {
    background-color: #ff0000;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    height: auto;
    left: 10px;
  }
`;


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
  const [scheduleType, setScheduleType] = useState('call'); // Default to 'call'
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [status, setStatus] = useState(propertyData.status);
  const navigate = useNavigate(); 


  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchPropertyData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/properties/propertybyid/${id}`);
  //       setPropertyData(response.data);
  //       console.log(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPropertyData();
  // }, [id]);
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
  
      // Fetch property details first to get customerId
      let propertyResponse;
      try {
        propertyResponse = await axios.get(`http://localhost:5000/api/properties/propertybyid/${id}`, { headers });
        setPropertyData(propertyResponse.data);
        console.log(propertyResponse.data);
      } catch (err) {
        setError(`Error fetching property data: ${err.response ? err.response.data.message : err.message}`);
      }
  
      // Fetch notes using userId, propertyId, and customerId
      if (propertyResponse && propertyResponse.data.customerId && token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const notesResponse = await axios.get(`http://localhost:5000/api/notes/${userId}/${id}/${propertyResponse.data.customerId}`, { headers });
          setNotes(notesResponse.data);
        } catch (err) {
          console.error(`Error fetching notes: ${err.response ? err.response.data.message : err.message}`);
          // Optionally set a less critical error state or log this error without setting a main error
        }
      }
    } catch (err) {
      // Catch any unexpected errors
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchSchedules = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const response = await axios.get(`http://localhost:5000/api/schedules/user/${userId}`, { headers });
      setSchedules(response.data); // Assuming the API returns an array of schedules
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setError(`Failed to fetch schedules: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  
  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.patch(`http://localhost:5000/api/properties/updateStatus/${id}`, { status: newStatus }, { headers });
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
  }, [id, token,propertyData.status]);  // Ensuring useEffect dependency array is correct
  

  const handleSaveNote = async () => {
    if (!note && !audioURL) {
      console.error('No note or audio URL provided.');
      return;
    }
    if (!propertyData || !propertyData._id || !propertyData.cnicNumber) {
      console.error('Property data is not fully loaded.');
      return;
    }
    const token = localStorage.getItem('token');
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
      const response = await axios.post('http://localhost:5000/api/notes', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
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
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, { headers });
  
      // If the DELETE request is successful, update the UI by removing the note from the list
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to delete note:', error);
      // Optionally set an error state here to notify the user
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

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;

  const formatRequirement = (property) => {
    const { length, width, features } = property;
    const formattedFeatures = Object.entries(features)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(", ");
    return `${length} x ${width} feet - Features: ${formattedFeatures}`;
  };

  const handleSaveSchedule = async () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please fill in all schedule fields.");
      return;
    }
  
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const headers = { Authorization: `Bearer ${token}` };
  
    const scheduleData = {
      userId,
      propertyId: id,
      customerId: propertyData.customerId, // Assuming this is stored in propertyData
      scheduleType,
      date: new Date(scheduleDate + 'T' + scheduleTime).toISOString(), // Combining date and time
      time: scheduleTime
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/schedules/add', scheduleData, { headers });
      alert('Schedule saved successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to save schedule:', error);
      alert(`Failed to save schedule: ${error.response ? error.response.data.message : error.message}`);
    }
  };


  

  return (
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

  {/* Display Existing Schedules */}
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

  {/* Form to Add New Schedule */}
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
                <NoteItem key={note._id}> {/* Use note._id as the key if available */}
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

            <Label>Commission Percentage %:</Label>
            <Input type="text" value={propertyData.commission} readOnly />
          </Section>

          <Section>
            <SectionTitle>Update Status</SectionTitle>
            <Label>Lead Status:</Label>
            <Input type="text" value={propertyData.status} readOnly />
            <Label> Update Lead Status:</Label>
  <Select value={status || 'pending'} onChange={e => handleStatusChange(e.target.value)}>
  <option value="active">Select Status</option>
    <option value="active">Active</option>
    <option value="pending">Pending</option>
    <option value="sold">Sold</option>
  </Select>
          </Section>

          <Section>
            <SectionTitle>Generate Contract</SectionTitle>
            <Button>Send (Email/WhatsApp)</Button>
            <Button>Share with Associates</Button>
            <Button>Share Contract</Button>
          </Section>
          <ContractForm/>
        </>
      )}
    </PageContainer>
  );
};

export default LeadDetailPage;
 