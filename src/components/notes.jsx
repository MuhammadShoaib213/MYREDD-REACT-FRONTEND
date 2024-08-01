import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';

const Container = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 600px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: red;
  color: white;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px;

  &:hover {
    background-color: darkred;
  }
`;

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

function NoteManager() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSaveNote = () => {
    if (note || audioURL) {
      const datetime = new Date().toISOString();
      setNotes([...notes, { text: note, datetime, audioURL }]);
      setNote('');
      setAudioURL('');
    }
  };

  const handleDeleteNote = index => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
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

  return (
    <Container>
      <ContentContainer>
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
            <NoteItem key={index}>
              {note.text}
              {note.audioURL && <AudioPlayer controls src={note.audioURL} />}
              <DeleteButton onClick={() => handleDeleteNote(index)}>Delete</DeleteButton>
              <Timestamp>{new Date(note.datetime).toLocaleString()}</Timestamp>
            </NoteItem>
          ))}
        </NotesList>
      </ContentContainer>
    </Container>
  );
}

export default NoteManager;
