import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientId = '605502297350-ichgllqq133b269dftksg9hpkfvt497d.apps.googleusercontent.com';  // Replace with your actual client ID

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileItem = styled.li`
  padding: 5px 0;
`;

const DriveComponent = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        function initClient() {
            gapi.client.init({
                apiKey: 'Your API Key Here', // Replace with actual API key
                clientId: clientId,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                scope: 'https://www.googleapis.com/auth/drive.file',
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                authInstance.isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(authInstance.isSignedIn.get());
            }, error => {
                toast.error(`Error loading Google API: ${error.error}`);
                console.error('API Error:', error);
            });
        }

        gapi.load('client:auth2', initClient);
    }, []);

    const updateSigninStatus = (isSignedIn) => {
        setIsSignedIn(isSignedIn);
        if (isSignedIn) {
            loadFiles();
        }
    };

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignoutClick = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    const loadFiles = () => {
        gapi.client.drive.files.list({
            'pageSize': 10,
            'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
            setFiles(response.result.files);
            console.log('Files:', response.result.files);
        }, error => {
            toast.error(`Failed to load files: ${error.message}`);
            console.error('Files Load Error:', error);
        });
    };

    return (
        <Container>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {!isSignedIn ? (
                <Button onClick={handleAuthClick}>Sign In</Button>
            ) : (
                <div>
                    <Button onClick={handleSignoutClick}>Sign Out</Button>
                    <h1>Google Drive Files</h1>
                    <FileList>
                        {files.map(file => (
                            <FileItem key={file.id}>{file.name}</FileItem>
                        ))}
                    </FileList>
                </div>
            )}
        </Container>
    );
};

export default DriveComponent;
