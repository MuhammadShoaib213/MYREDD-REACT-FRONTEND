// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useLocation } from 'react-router-dom';

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
//   margin-bottom: 20px;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   max-width: 1200px;
//   margin-bottom: 30px;
// `;

// const TableContainer = styled.div`
//   width: 50%;
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   border-radius: 10px;
// `;

// const TableTitle = styled.h2`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 15px;
// `;

// const Th = styled.th`
//   background-color: #f3f3f3;
//   color: #333;
//   padding: 12px 15px;
//   text-align: left;
// `;

// const Td = styled.td`
//   padding: 12px 15px;
//   border-bottom: 1px solid #ddd;
// `;

// const SubtypeRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #fff;
//   }
// `;

// function InquiriesStatus() {
//   const [data, setData] = useState({});
//   const token = localStorage.getItem('token');
//   const location = useLocation();
//   const inquiryType = location.state?.inquiryType;

//   console.log(inquiryType);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       const decoded = jwtDecode(token);
//       const response = await axios.get(`http://195.179.231.102:6003/api/properties/user/${decoded.userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setData(aggregateData(response.data));
//     };
//     fetchData();
//   }, [token]);

//   const aggregateData = (data) => {
//     const structure = {
//       Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse', 'Others'],
//       Commercial: ['Office', 'Shop', 'Warehouse', 'Factory', 'Others'],
//       Land: ['Others']
//     };

//     let results = {};
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     Object.keys(structure).forEach(type => {
//       results[type] = {};
//       structure[type].forEach(subtype => {
//         results[type][subtype] = { thisMonth: 0, thisYear: 0, lastYear: 0 };
//       });
//     });

//     data.forEach(item => {
//       Object.keys(structure).forEach(type => {
//         if (item.propertyType[type.toLowerCase()]) {
//           structure[type].forEach(subtype => {
//             if (item.propertySubType[subtype.toLowerCase()]) {
//               const itemDate = new Date(item.dateAdded);
//               const itemMonth = itemDate.getMonth();
//               const itemYear = itemDate.getFullYear();

//               if (itemYear === currentYear) {
//                 if (itemMonth === currentMonth) {
//                   results[type][subtype].thisMonth++;
//                 }
//                 results[type][subtype].thisYear++;
//               }
//               if (itemYear === currentYear - 1) {
//                 results[type][subtype].lastYear++;
//               }
//             }
//           });
//         }
//       });
//     });

//     return results;
//   };

//   const renderGraphData = (subtypes) => {
//     return Object.keys(subtypes).map(subtype => ({
//       name: subtype,
//       thisMonth: subtypes[subtype].thisMonth,
//       thisYear: subtypes[subtype].thisYear,
//       lastYear: subtypes[subtype].lastYear
//     }));
//   };

//   return (
//     <PageContainer>
//       <Header>Inquiries Status</Header>
//       {Object.entries(data).map(([type, subtypes]) => (
//         <ContentContainer key={type}>
//           <TableContainer>
//             <TableTitle>{type}</TableTitle>
//             <StyledTable>
//               <thead>
//                 <tr>
//                   <Th>Type</Th>
//                   <Th>This Month</Th>
//                   <Th>This Year</Th>
//                   <Th>Last Year</Th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(subtypes).map(([subtype, values]) => (
//                   <SubtypeRow key={subtype}>
//                     <Td>{subtype}</Td>
//                     <Td>{values.thisMonth}</Td>
//                     <Td>{values.thisYear}</Td>
//                     <Td>{values.lastYear}</Td>
//                   </SubtypeRow>
//                 ))}
//               </tbody>
//             </StyledTable>
//           </TableContainer>
//           <ResponsiveContainer width="50%" height={300}>
//             <BarChart data={renderGraphData(subtypes)}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="thisMonth" fill="#8884d8" />
//               <Bar dataKey="thisYear" fill="#82ca9d" />
//               <Bar dataKey="lastYear" fill="#ffc658" />
//             </BarChart>
//           </ResponsiveContainer>
//         </ContentContainer>
//       ))}
//     </PageContainer>
//   );
// }

// export default InquiriesStatus;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom';

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
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
`;

const TableContainer = styled.div`
  width: 50%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
`;

const TableTitle = styled.h2`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
`;

const Th = styled.th`
  background-color: #f3f3f3;
  color: #333;
  padding: 12px 15px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const SubtypeRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff;
  }
`;

function InquiriesStatus() {
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');
  const location = useLocation();
  const inquiryType = location.state?.inquiryType;

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    const fetchData = async () => {
      const response = await axios.get(`http://195.179.231.102:6003/api/properties/user/${decoded.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(aggregateData(response.data));
    };
    fetchData();
  }, [token]);

  const aggregateData = (data) => {
    const structure = {
      Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse', 'Others'],
      Commercial: ['Office', 'Shop', 'Warehouse', 'Factory', 'Others'],
      Land: ['Others']
    };

    let results = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    Object.keys(structure).forEach(type => {
      results[type] = {};
      structure[type].forEach(subtype => {
        results[type][subtype] = { thisMonth: 0, thisYear: 0, lastYear: 0 };
      });
    });

    data.forEach(item => {
      if (item.inquiryType[inquiryType]) {  // Filter by the passed inquiry type
        Object.keys(structure).forEach(type => {
          if (item.propertyType[type.toLowerCase()]) {
            structure[type].forEach(subtype => {
              if (item.propertySubType[subtype.toLowerCase()]) {
                const itemDate = new Date(item.dateAdded);
                const itemMonth = itemDate.getMonth();
                const itemYear = itemDate.getFullYear();

                if (itemYear === currentYear) {
                  if (itemMonth === currentMonth) {
                    results[type][subtype].thisMonth++;
                  }
                  results[type][subtype].thisYear++;
                }
                if (itemYear === currentYear - 1) {
                  results[type][subtype].lastYear++;
                }
              }
            });
          }
        });
      }
    });

    return results;
  };

  const renderGraphData = (subtypes) => {
    return Object.keys(subtypes).map(subtype => ({
      name: subtype,
      thisMonth: subtypes[subtype].thisMonth,
      thisYear: subtypes[subtype].thisYear,
      lastYear: subtypes[subtype].lastYear
    }));
  };

  return (
    <PageContainer>
      <Header>Inquiries Status - {inquiryType}</Header>
      {Object.entries(data).map(([type, subtypes]) => (
        <ContentContainer key={type}>
          <TableContainer>
            <TableTitle>{type}</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>This Month</Th>
                  <Th>This Year</Th>
                  <Th>Last Year</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subtypes).map(([subtype, values]) => (
                  <SubtypeRow key={subtype}>
                    <Td>{subtype}</Td>
                    <Td>{values.thisMonth}</Td>
                    <Td>{values.thisYear}</Td>
                    <Td>{values.lastYear}</Td>
                  </SubtypeRow>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
          <ResponsiveContainer width="50%" height={300}>
            <BarChart data={renderGraphData(subtypes)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="thisMonth" fill="#8884d8" />
              <Bar dataKey="thisYear" fill="#82ca9d" />
              <Bar dataKey="lastYear" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </ContentContainer>
      ))}
    </PageContainer>
  );
}

export default InquiriesStatus;
