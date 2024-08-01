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
//   background-color: rgba(0, 0, 0, 0.7); // This creates a dark overlay effect
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   padding: 20px;
//   overflow: auto;  // Ensures content can scroll if it exceeds the viewport height
// `;


// const Header = styled.h1`
//   margin-bottom: 20px;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   max-width: 1200px;  // Adjust based on your layout needs
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

// function BusinessVolumeDetail() {
//   const [data, setData] = useState({});
//   const token = localStorage.getItem('token');
//   const location = useLocation(); // Access location
//   const inquiryType = location.state?.inquiryType; // Get the inquiry type from state

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       const decoded = jwtDecode(token);
//       const response = await axios.get(`http://localhost:5000/api/properties/user/${decoded.userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setData(aggregateData(response.data));
//     };
//     fetchData();
//   }, [token]);

//   const aggregateData = (rawData) => {
//     const structure = {
//       Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse'],
//       Commercial: ['Office', 'Shop', 'Warehouse', 'Factory'],
//       Land: ['Others']
//     };
  
//     let results = {};
//     Object.keys(structure).forEach(type => {
//       results[type] = {};
//       structure[type].forEach(subtype => {
//         results[type][subtype] = { qty: 0, commission: 0, profit: 0 };
//       });
//     });
  
//     rawData.forEach(item => {
//       if (item.inquiryType[inquiryType]) { // Filter based on the inquiry type
//         Object.keys(structure).forEach(type => {
//           if (item.propertyType[type.toLowerCase()]) {
//             structure[type].forEach(subtype => {
//               if (item.propertySubType[subtype.toLowerCase()]) {
//                 const count = item.status === "Sold" ? 1 : 0;
//                 results[type][subtype].qty += count;
//                 if (count) {
//                   results[type][subtype].commission += item.advancePayment;
//                   results[type][subtype].profit += item.advancePayment * 0.1; // Assume profit is 10% of commission
//                 }
//               }
//             });
//           }
//         });
//       }
//     });
  
//     return results;
//   };
  

//   return (
//     <PageContainer>
//       <Header>Business Volume Detail for {inquiryType}</Header>
//       {Object.entries(data).map(([type, subtypes]) => (
//         <ContentContainer key={type}>
//           <TableContainer>
//             <TableTitle>{type}</TableTitle>
//             <StyledTable>
//               <thead>
//                 <tr>
//                   <Th>Type</Th>
//                   <Th>QTY</Th>
//                   <Th>Commission</Th>
//                   <Th>Profit</Th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(subtypes).map(([subtype, values]) => (
//                   <SubtypeRow key={subtype}>
//                     <Td>{subtype}</Td>
//                     <Td>{values.qty}</Td>
//                     <Td>$ {values.commission.toFixed(2)}</Td>
//                     <Td>$ {values.profit.toFixed(2)}</Td>
//                   </SubtypeRow>
//                 ))}
//               </tbody>
//             </StyledTable>
//             <br/>
//             <br/>
//           </TableContainer>
//           <ResponsiveContainer width="50%" height={300}>
//             <BarChart data={renderGraphData(subtypes)}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="QTY" fill="#8884d8" />
//               <Bar dataKey="Commission" fill="#82ca9d" />
//               <Bar dataKey="Profit" fill="#ffc658" />
//             </BarChart>
//           </ResponsiveContainer>
//         </ContentContainer>
//       ))}
//     </PageContainer>
//   );
// }

// export default BusinessVolumeDetail;


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

function BusinessVolumeDetail() {
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');
  const location = useLocation();
  const inquiryType = location.state?.inquiryType;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const decoded = jwtDecode(token);
      const response = await axios.get(`http://localhost:5000/api/properties/user/${decoded.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(aggregateData(response.data));
    };
    fetchData();
  }, [token]);

  const aggregateData = (rawData) => {
    const structure = {
      Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse'],
      Commercial: ['Office', 'Shop', 'Warehouse', 'Factory'],
      Land: ['Others']
    };

    let results = {};
    Object.keys(structure).forEach(type => {
      results[type] = {};
      structure[type].forEach(subtype => {
        results[type][subtype] = { qty: 0, commission: 0, profit: 0 };
      });
    });

    rawData.forEach(item => {
      if (item.inquiryType[inquiryType]) {
        Object.keys(structure).forEach(type => {
          if (item.propertyType[type.toLowerCase()]) {
            structure[type].forEach(subtype => {
              if (item.propertySubType[subtype.toLowerCase()]) {
                const count = item.status === "Sold" ? 1 : 0;
                results[type][subtype].qty += count;
                if (count) {
                  results[type][subtype].commission += item.advancePayment;
                  results[type][subtype].profit += item.advancePayment * 0.1;
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
      QTY: subtypes[subtype].qty,
      Commission: subtypes[subtype].commission,
      Profit: subtypes[subtype].profit
    }));
  };

  return (
    <PageContainer>
      <Header>Business Volume Detail for {inquiryType}</Header>
      {Object.entries(data).map(([type, subtypes]) => (
        <ContentContainer key={type}>
          <TableContainer>
            <TableTitle>{type}</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>QTY</Th>
                  <Th>Commission</Th>
                  <Th>Profit</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subtypes).map(([subtype, values]) => (
                  <SubtypeRow key={subtype}>
                    <Td>{subtype}</Td>
                    <Td>{values.qty}</Td>
                    <Td>$ {values.commission.toFixed(2)}</Td>
                    <Td>$ {values.profit.toFixed(2)}</Td>
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
              <Bar dataKey="QTY" fill="#8884d8" />
              <Bar dataKey="Commission" fill="#82ca9d" />
              <Bar dataKey="Profit" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </ContentContainer>
      ))}
    </PageContainer>
  );
}

export default BusinessVolumeDetail;
