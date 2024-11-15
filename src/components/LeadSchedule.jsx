// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import styled from 'styled-components';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import bgImage from '../images/bg.jpg';

// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.7);
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   padding-top: 80px;
//   overflow: auto;

//   @media (max-width: 768px) {
//     height: auto;
//   }
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   max-width: 800px;
// `;

// const Header = styled.h1`
//   color: white;
//   margin-bottom: 20px;
// `;

// const FiltersContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
//   width: 100%;
// `;

// const SearchBar = styled.input`
//   padding: 10px;
//   width: 200px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const FilterSelect = styled.select`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   margin-left: 10px;
// `;

// const CalendarContainer = styled.div`
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   margin-bottom: 20px;
//   width: 100%;
// `;

// const AppointmentListContainer = styled.div`
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   width: 100%;
// `;

// const AppointmentItem = styled.div`
//   padding: 10px;
//   border-bottom: 1px solid #ddd;
//   &:last-child {
//     border-bottom: none;
//   }
// `;

// const AddButton = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   background-color: red;
//   color: white;
//   cursor: pointer;
//   margin-top: 20px;
//   &:hover {
//     background-color: darkred;
//   }
// `;

// // const SchedulePage = () => {
// //   const [schedules, setSchedules] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchSchedules = async () => {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         setError('No token found');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const { userId } = jwtDecode(token);
// //         const response = await axios.get(`http://localhost:5000/api/schedules/user/all/${userId}`);
// //         setSchedules(response.data);
// //         console.log(response.data);
// //       } catch (err) {
// //         setError('Failed to fetch schedules');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSchedules();
// //   }, []);

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <PageContainer>
// //       <ContentContainer>
// //         <Header>Schedule</Header>
// //         <FiltersContainer>
// //           <SearchBar placeholder="Search appointments..." />
// //           <div>
// //             <FilterSelect>
// //               <option value="all">All Statuses</option>
// //               <option value="upcoming">Upcoming</option>
// //               <option value="completed">Completed</option>
// //               <option value="canceled">Canceled</option>
// //             </FilterSelect>
// //             <FilterSelect>
// //               <option value="all">All Types</option>
// //               <option value="meetings">Meetings</option>
// //               <option value="calls">Calls</option>
// //               <option value="tasks">Tasks</option>
// //             </FilterSelect>
// //           </div>
// //         </FiltersContainer>
// //         <AppointmentListContainer>
// //           <h2>Upcoming Appointments</h2>
// //           {schedules.map((schedule, index) => (
// //             <AppointmentItem key={index}>
// //              <p><strong>{schedule.scheduleType}</strong> with <strong>{schedule.customerName}</strong></p>

// //               <p>{new Date(schedule.date).toLocaleString()}</p>
// //             </AppointmentItem>
// //           ))}
// //         </AppointmentListContainer>
// //         {/* <AddButton>Add Appointment</AddButton> */}
// //       </ContentContainer>
// //     </PageContainer>
// //   );
// // };

// // export default SchedulePage;

// const SchedulePage = () => {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found');
//         setLoading(false);
//         return;
//       }

//       try {
//         const { userId } = jwtDecode(token);
//         const response = await axios.get(`http://localhost:5000/api/schedules/user/all/${userId}`);
//         setSchedules(response.data);
//         console.log(response.data);
//       } catch (err) {
//         setError('Failed to fetch schedules');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchedules();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <PageContainer>
//       <ContentContainer>
//         <Header>Schedule</Header>
//         <FiltersContainer>
//           <SearchBar placeholder="Search appointments..." />
//           <div>
//             <FilterSelect>
//               <option value="all">All Statuses</option>
//               <option value="upcoming">Upcoming</option>
//               <option value="completed">Completed</option>
//               <option value="canceled">Canceled</option>
//             </FilterSelect>
//             <FilterSelect>
//               <option value="all">All Types</option>
//               <option value="meetings">Meetings</option>
//               <option value="calls">Calls</option>
//               <option value="tasks">Tasks</option>
//             </FilterSelect>
//           </div>
//         </FiltersContainer>
//         <AppointmentListContainer>
//           <h2>Upcoming Appointments</h2>
//           {schedules.length === 0 ? (
//             <p>No schedules available at the moment.</p>
//           ) : (
//             schedules.map((schedule, index) => (
//               <AppointmentItem key={index}>
//                 <p><strong>{schedule.scheduleType}</strong> with <strong>{schedule.customerName}</strong></p>
//                 <p>{new Date(schedule.date).toLocaleString()}</p>
//               </AppointmentItem>
//             ))
//           )}
//         </AppointmentListContainer>
//         {/* <AddButton>Add Appointment</AddButton> */}
//       </ContentContainer>
//     </PageContainer>
//   );
// };

// export default SchedulePage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled, { createGlobalStyle } from 'styled-components';
import bgImage from '../images/bg.jpg';
import {  useNavigate } from 'react-router-dom';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.75);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;  /* Align content to the top instead of center */
  padding: 20px;
  padding-top: 200px;  /* Decrease the top padding to reduce the space from the top */
  overflow: auto;

  @media (max-width: 768px) {
    height: auto;
    padding-top: 80px;
  }
`;


const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h1`
  color: #333;
`;

const AppointmentListContainer = styled.div`
  width: 100%;
`;

const AppointmentItem = styled.div`
  background-color: white;
  margin-top: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
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


const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const { userId } = jwtDecode(token);
        const response = await axios.get(`http://localhost:5000/api/schedules/user/all/${userId}`);
        setSchedules(response.data);
      } catch (err) {
        setError('Failed to fetch schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (schedules.length === 0) return <p>No schedules available at the moment.</p>;

  return (
    <>
      <GlobalStyle />
      <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <ContentContainer>
          <Header>Schedule</Header>
          <AppointmentListContainer>
            {schedules.map((schedule, index) => (
              <AppointmentItem key={index}>
                <p><strong>{schedule.scheduleType}</strong> with <strong>{schedule.customerName}</strong></p>
                <p>{new Date(schedule.date).toLocaleString()}</p>
              </AppointmentItem>
            ))}
          </AppointmentListContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default SchedulePage;
