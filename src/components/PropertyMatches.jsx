import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import bgImage from '../images/bg.jpg'; // Make sure this path is correct

const FullScreenContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Container = styled.div`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
`;

const MatchesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MatchItem = styled.li`
  padding: 8px;
  margin-top: 5px;
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 130px;
  background-color: #333;
  border: 2px solid #ff0000;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
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



function PropertyMatches() {
    const { id } = useParams(); // Retrieve the ID from the URL
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (id) {
        findMatches(id); // Fetch matches when component mounts and ID is available
      }
    }, [id]);
  
    const findMatches = async (propertyId) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties/findMatches/${propertyId}`);
        setMatches(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching property matches:', err);
        setError('Failed to fetch matches. Please try again later.');
        setMatches([]);
      }
    };
  
    return (
      <FullScreenContainer>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        <Container>
          <Header>Find Property Matches</Header>
          <div>
            <h2>Matches:</h2>
            <MatchesList>
              {matches.length > 0 ? (
                matches.map(match => (
                  <MatchItem key={match._id}>
                    {match.city}, {match.area} - {match.inquiryType}
                  </MatchItem>
                ))
              ) : (
                <p>No matches found.</p>
              )}
            </MatchesList>
          </div>
        </Container>
      </FullScreenContainer>
    );
  }
  
  export default PropertyMatches;