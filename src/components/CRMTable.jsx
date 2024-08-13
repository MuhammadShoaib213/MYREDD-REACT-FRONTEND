// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; // Correct import statement assuming jwtDecode is the default export
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg';

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
//   color: white;
//   padding: 20px;
//   overflow: auto;
// `;

// const Sidebar = styled.div`
//   position: fixed;
//   left: 0;
//   top: 100px;
//   bottom: 80px;
//   width: 200px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
//   color: #333;
//   box-shadow: 0 8px 16px rgba(0,0,0,0.25);
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const SidebarTitle = styled.h3`
//   margin-bottom: 10px;
// `;

// const SidebarItem = styled.div`
//   margin-bottom: 10px;
//   cursor: pointer;
//   padding: 10px;
//   border-radius: 5px;
//   &:hover {
//     background-color: red;
//     color: white;
//   }
// `;

// const Container = styled.div`
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   background-color: white;
//   color: #333;
//   border-radius: 8px;
//   padding: 20px;
//   box-shadow: 0 8px 16px rgba(0,0,0,0.25);
//   overflow-x: auto;
//   margin-left: 220px;
//   margin-top: 20px;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const Th = styled.th`
//   background-color: red;
//   color: white;
//   border: 1px solid #ddd;
//   padding: 12px 15px;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 12px 15px;
// `;

// const CRMTable = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found. Please log in.');
//           return;
//         }

//         const decoded = jwtDecode(token);
//         if (!decoded.userId) {
//           setError('Invalid token. Please log in again.');
//           return;
//         }

//         const response = await axios.get(`http://195.179.231.102:6003/api/properties/lead/user/${decoded.userId}`);
//         setData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch data. Please check your connection and try again.');
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <PageContainer>
      // <Sidebar>
      //   <SidebarTitle>Leads</SidebarTitle>
      //   <SidebarItem>Category A</SidebarItem>
      //   <SidebarItem>Category B</SidebarItem>
      //   <SidebarTitle>Schedule</SidebarTitle>
      //   <SidebarItem>Appointments</SidebarItem>
      //   <SidebarItem>Visits</SidebarItem>
      //   <SidebarItem>Meetings</SidebarItem>
      //   <SidebarTitle>Leads Status</SidebarTitle>
      //   <SidebarItem>Deal (Hit)</SidebarItem>
      //   <SidebarItem>Sold</SidebarItem>
      //   <SidebarItem>Rented</SidebarItem>
      //   <SidebarItem>Rejections (Miss)</SidebarItem>
      // </Sidebar>
//       <Container>
//         <h2>Leads</h2>
//         <Table>
//           <thead>
//             <tr>
//               <Th>#</Th>
//               <Th>Date In</Th>
//               <Th>From</Th>
//               <Th>Category</Th>
//               <Th>Property Sub Type</Th>
//               <Th>Closing Date</Th>
//               <Th>Budget</Th>
//               <Th>Requirements</Th>
//               <Th>Expected %</Th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => {
              // const features = Object.entries(item.features || {}).filter(([_, value]) => value).map(([key]) => key).join(', ');
              // const size = item.length && item.width ? `${item.length}ft x ${item.width}ft` : '';
              // const requirements = `${size} ${features ? '- ' + features : ''}`.trim();
              // const propertySubType = Object.keys(item.propertySubType).find(key => item.propertySubType[key]) || '';
              // const dateInFormatted = new Date(item.dateAdded).toLocaleDateString("en-US");
              // const closingDateFormatted = item.closingDate ? new Date(item.closingDate).toLocaleDateString("en-US") : '';

//               return (
//                 <tr key={index}>
//                   <Td>{index + 1}</Td>
//                   <Td>{dateInFormatted}</Td>
//                   <Td>{item.customerName || 'Unknown'}</Td>
//                   <Td>{Object.keys(item.propertyType).find(key => item.propertyType[key]) || ''}</Td>
//                   <Td>{propertySubType}</Td>
//                   <Td>{closingDateFormatted}</Td>
//                   <Td>{item.advancePayment || ''}</Td>
//                   <Td>{requirements || 'N/A'}</Td>
//                   <Td>{item.expected || ''}</Td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Container>
//     </PageContainer>
//   );
// }

// export default CRMTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure correct import
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import {jwtDecode} from 'jwt-decode'; 
import ShareLeadModal from './ShareLeadModal';

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
  color: white;
  padding: 20px;
  padding-top: 80px;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  color: white;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 200px;
  bottom: 80px;
  width: 200px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  color: #333;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  color: #333;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
  overflow-x: auto;
  margin-left: 220px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
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
//   color: white;
//   padding: 20px;
//   padding-top: 80px;
//   overflow: auto;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 20px;
//   color: white;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const Sidebar = styled.div`
//   position: fixed;
//   left: 0;
//   top: 200px;
//   bottom: 80px;
//   width: 200px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
//   color: #333;
//   box-shadow: 0 8px 16px rgba(0,0,0,0.25);
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

const SidebarTitle = styled.h3`
  margin-bottom: 10px;
`;

const SidebarItem = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background-color: red;
    color: white;
  }
`;

// const Container = styled.div`
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   background-color: white;
//   color: #333;
//   border-radius: 8px;
//   padding: 20px;
//   box-shadow: 0 8px 16px rgba(0,0,0,0.25);
//   overflow-x: auto;
//   margin-left: 220px;
//   margin-top: 20px;
// `;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Th = styled.th`
  background-color: red;
  color: white;
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px 15px;
  white-space: nowrap; /* Prevent long text from breaking the table layout */
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

// Add this wrapper to make the table responsive
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const Th = styled.th`
//   background-color: red;
//   color: white;
//   border: 1px solid #ddd;
//   padding: 12px 15px;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 12px 15px;
// `;

// const TableRow = styled.tr`
//   &:hover {
//     background-color: #f5f5f5;
//     cursor: pointer;
//   }
// `;

const ShareButton = styled.button`
  background-color: #ff4500; /* Bright orange color */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e03e00; /* Slightly darker shade on hover */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff4500; /* Add a subtle glow on focus */
  }

  &:active {
    background-color: #c63600; /* Even darker shade when clicked */
  }
`;


const LeadTrackerButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #28a745;
  }

  &:active {
    background-color: #1e7e34;
  }
`;

const CRMTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const decoded = jwtDecode(token);
        if (!decoded.userId) {
          setError('Invalid token. Please log in again.');
          return;
        }

        const response = await axios.get(`http://195.179.231.102:6003/api/properties/lead/user/${decoded.userId}`);
        setData(response.data);
        console.log(response.data._id);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please check your connection and try again.');
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/LeadDetailPage/${id}`);
  };

  const handleShareClick = (id) => {
    setSelectedLead(id);
    setModalIsOpen(true); // Open the modal when "Share" is clicked
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLead(null);
  };

  const navigateToLeadTracker = () => {
    navigate('/LeadTracker'); // Change '/lead-tracker' to your actual tracker route
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContainer>
              <Header>
          <h1>Leads</h1>
          {/* <Logo>Logo</Logo> */}
        </Header>
      {/* <Sidebar>
        <SidebarTitle>Leads</SidebarTitle>
        <SidebarItem>Category A</SidebarItem>
        <SidebarItem>Category B</SidebarItem>
        <SidebarTitle>Schedule</SidebarTitle>
        <SidebarItem>Appointments</SidebarItem>
        <SidebarItem>Visits</SidebarItem>
        <SidebarItem>Meetings</SidebarItem>
        <SidebarTitle>Leads Status</SidebarTitle>
        <SidebarItem>Deal (Hit)</SidebarItem>
        <SidebarItem>Sold</SidebarItem>
        <SidebarItem>Rented</SidebarItem>
        <SidebarItem>Rejections (Miss)</SidebarItem>
      </Sidebar> */}
      <Container>
        <h2>Leads</h2>
        <LeadTrackerButton onClick={navigateToLeadTracker}>
          View Shared/Received Leads
        </LeadTrackerButton>
        <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Date In</Th>
              <Th>From</Th>
              <Th>Category</Th>
              <Th>Property Sub Type</Th>
              <Th>Closing Date</Th>
              <Th>Budget</Th>
              <Th>Requirements</Th>
              <Th>Expected %</Th>
              <Th>Actions</Th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              console.log(item._id);
              const features = Object.entries(item.features || {}).filter(([_, value]) => value).map(([key]) => key).join(', ');
              const size = item.length && item.width ? `${item.length}ft x ${item.width}ft` : '';
              const requirements = `${size} ${features ? '- ' + features : ''}`.trim();
              const propertySubType = Object.keys(item.propertySubType).find(key => item.propertySubType[key]) || '';
              const dateInFormatted = new Date(item.dateAdded).toLocaleDateString("en-US");
              const closingDateFormatted = item.closingDate ? new Date(item.closingDate).toLocaleDateString("en-US") : '';

              return (
                <TableRow key={index} onClick={() => handleRowClick(item._id)}>
                  <Td>{index + 1}</Td>
                  <Td>{dateInFormatted}</Td>
                  <Td>{item.customerName || 'Unknown'}</Td>
                  <Td>{Object.keys(item.propertyType).find(key => item.propertyType[key]) || ''}</Td>
                  <Td>{propertySubType}</Td>
                  <Td>{closingDateFormatted}</Td>
                  <Td>{item.budget || ''}</Td>
                  <Td>{requirements}</Td>
                  <Td>{item.expected || ''}</Td>
                  <Td>
                  <ShareButton onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleShareClick(item._id);
                      }}>
                        Share
                      </ShareButton>
                    </Td> {/* Share button */}
                </TableRow>
              );
            })}
          </tbody>
        </Table>
        </TableWrapper>
      </Container>
      <ShareLeadModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        leadId={selectedLead}
      />
    </PageContainer>
  );
};

export default CRMTable;
