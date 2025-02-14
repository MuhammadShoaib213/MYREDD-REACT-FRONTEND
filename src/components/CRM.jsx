import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChartBar, FaHandshake, FaBusinessTime } from 'react-icons/fa'; // Import icons
import bgImage from '../images/bg.jpg';

const DashboardContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 84vh;
  width: 100vw;
  padding-top: 92px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
    background-attachment: scroll;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e74c3c;
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    left: 10px;
    width: 100%;
    text-align: center;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  // padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Card = styled.div`
  perspective: 1000px;
  width: 200px;
  height: 250px;
  @media (max-width: 768px) {
    width: 80%;
    height: 220px;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
  ${(props) =>
    props.isFlipped &&
    `
    transform: rotateY(180deg);
  `}
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, ${(props) => props.color1}, ${(props) => props.color2});
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, ${(props) => props.color2}, ${(props) => props.color1});
  transform: rotateY(180deg);
`;

const CardButton = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

function CRM() {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = React.useState({});

  const handleMouseEnter = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: false }));
  };

  const cards = [
    {
      id: 1,
      title: 'Inquiries Status',
      link: '/InquiriesStatus',
      icon: <FaChartBar size={50} />,
      colors: ['#8a2be2', '#5d3fd3'],
    },
    {
      id: 2,
      title: 'Inquiry Vs Done Deal',
      link: '/InquiriesVsDoneDeal',
      icon: <FaHandshake size={50} />,
      colors: ['#008080', '#20b2aa'],
    },
    {
      id: 3,
      title: 'Business Volume',
      link: '/BusinessVolume',
      icon: <FaBusinessTime size={50} />,
      colors: ['#0000ff', '#1e90ff'],
    },
  ];

  return (
    <DashboardContainer>
      <Header>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Title>Dashboard</Title>
      </Header>
      <CardsContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            onMouseEnter={() => handleMouseEnter(card.id)}
            onMouseLeave={() => handleMouseLeave(card.id)}
            onClick={() => navigate(card.link)}
          >
            <CardInner isFlipped={flippedCards[card.id]}>
              <CardFront color1={card.colors[0]} color2={card.colors[1]}>
                {card.icon}
                <h3>{card.title}</h3>
              </CardFront>
              <CardBack color1={card.colors[0]} color2={card.colors[1]}>
                <h3>{card.title}</h3>
                <CardButton>Open</CardButton>
              </CardBack>
            </CardInner>
          </Card>
        ))}
      </CardsContainer>
    </DashboardContainer>
  );
}

export default CRM;
