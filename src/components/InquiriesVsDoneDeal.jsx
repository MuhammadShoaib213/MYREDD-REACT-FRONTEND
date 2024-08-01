// // // import React from 'react';
// // // import styled from 'styled-components';
// // // import bgImage from '../images/bg.jpg';  // Ensure the correct path

// // // const PageContainer = styled.div`
// // //   background-image: url(${bgImage});
// // //   background-size: cover;
// // //   background-position: center;
// // //   background-blend-mode: overlay;
// // //   background-color: rgba(0, 0, 0, 0.7);
// // //   height: 100vh;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   color: white;
// // //   padding: 20px;
// // //   overflow: auto;
// // // `;

// // // const Header = styled.div`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   width: 100%;
// // //   font-size: 2rem;
// // //   padding: 20px 0;
// // // `;

// // // const CategoryContainer = styled.div`
// // //   display: flex;
// // //   justify-content: space-around;
// // //   flex-wrap: wrap;
// // //   width: 100%;
// // // `;

// // // const CategoryBlock = styled.div`
// // //   background: rgba(255, 255, 255, 0.1);
// // //   border-radius: 10px;
// // //   margin: 20px;
// // //   padding: 20px;
// // //   width: 300px;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // // `;

// // // const Button = styled.button`
// // //   background-color: ${props => props.color};
// // //   color: white;
// // //   padding: 10px 20px;
// // //   border: none;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   width: 100%;
// // //   margin-bottom: 20px;
// // // `;

// // // const DataGroup = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   width: 100%;
// // // `;

// // // const DataRow = styled.div`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   margin: 5px 0;
// // // `;

// // // const DataLabel = styled.div`
// // //   flex: 1;
// // //   text-align: left;
// // // `;

// // // const DataValue = styled.div`
// // //   background-color: #ff6347;
// // //   padding: 5px 10px;
// // //   border-radius: 5px;
// // //   width: 50px;
// // //   text-align: center;
// // // `;

// // // const inquiryData = [
// // //   { type: 'For Sale', color: '#4169e1', data: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] } },
// // //   { type: 'For Purchase', color: '#6a5acd', data: { residential: [1, 1, 0], commercial: [1, 1, 0], land: [0, 0, 0] } },
// // //   { type: 'On Rent (Tenant)', color: '#4682b4', data: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] } },
// // //   { type: 'For Rent (Owner)', color: '#32cd32', data: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] } }
// // // ];

// // // function InquiriesStatus() {
// // //   return (
// // //     <PageContainer>
// // //       <Header>
// // //         {/* <h1>Dashboard</h1> */}
// // //         <h1>Inquiries Status</h1>
// // //       </Header>
// // //       <CategoryContainer>
// // //         {inquiryData.map((item, index) => (
// // //           <CategoryBlock key={index}>
// // //             <Button color={item.color}>{item.type}</Button>
// // //             <DataGroup>
// // //               {Object.keys(item.data).map((category) => (
// // //                 <DataRow key={category}>
// // //                   <DataLabel>{category.charAt(0).toUpperCase() + category.slice(1)}</DataLabel>
// // //                   {item.data[category].map((value, i) => (
// // //                     <DataValue key={i}>{value}</DataValue>
// // //                   ))}
// // //                 </DataRow>
// // //               ))}
// // //             </DataGroup>
// // //           </CategoryBlock>
// // //         ))}
// // //       </CategoryContainer>
// // //     </PageContainer>
// // //   );
// // // }

// // // export default InquiriesStatus;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import {jwtDecode} from 'jwt-decode';
// // import styled from 'styled-components';
// // import bgImage from '../images/bg.jpg';  // Ensure this path points to your actual background image

// // const PageContainer = styled.div`
// //   background-image: url(${bgImage});
// //   background-size: cover;
// //   background-position: center;
// //   background-blend-mode: overlay;
// //   background-color: rgba(0, 0, 0, 0.7); // This creates a dark overlay effect
// //   height: 100vh;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   padding: 20px;
// //   overflow: auto;  // Ensures content can scroll if it exceeds the viewport height
// // `;

// // const Header = styled.h1`
// //   color: white;
// //   margin-bottom: 20px;
// // `;

// // const CategoryContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   flex-wrap: wrap;
// //   width: 100%;
// // `;

// // const CategoryBlock = styled.div`
// //   background: rgba(255, 255, 255, 0.2);
// //   border-radius: 10px;
// //   margin: 10px;
// //   padding: 20px;
// //   width: 280px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// // `;

// // const InquiryHeader = styled.h2`
// //   background-color: ${props => props.color};
// //   color: white;
// //   text-align: center;
// //   padding: 10px;
// //   border-radius: 5px;
// //   width: 100%;
// // `;

// // const Table = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(4, 1fr);
// //   gap: 10px;
// //   width: 100%;
// //   background-color: #f8f9fa;
// //   padding: 10px;
// //   border-radius: 5px;
// //   margin-top: 10px;
// // `;

// // const TableRow = styled.div`
// //   display: contents;
// // `;

// // const TableHeader = styled.div`
// //   font-weight: bold;
// //   text-align: center;
// // `;

// // const TableCell = styled.div`
// //   text-align: center;
// //   padding: 5px 10px;
// //   background-color: #ddd;
// //   border-radius: 5px;
// // `;

// // function InquiriesStatus() {
// //   const [inquiryData, setInquiryData] = useState({});
// //   const token = localStorage.getItem('token');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!token) return;
// //       try {
// //         const decoded = jwtDecode(token);
// //         const response = await axios.get(`http://195.179.231.102:6003/api/properties/user/${decoded.userId}`, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setInquiryData(aggregateData(response.data));
// //         console.log(response.data);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };
// //     fetchData();
// //   }, [token]);

// //   const aggregateData = (data) => {
// //     const counts = {
// //       forSale: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
// //       forPurchase: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
// //       forRent: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] },
// //       onRent: { residential: [0, 0, 0], commercial: [0, 0, 0], land: [0, 0, 0] }
// //     };

// //     data.forEach(item => {
// //       Object.entries(item.inquiryType).forEach(([type, active]) => {
// //         if (active) {
// //           ['residential', 'commercial', 'land'].forEach((propType) => {
// //             const dateAdded = new Date(item.dateAdded);
// //             const now = new Date();
// //             const thisMonth = dateAdded.getMonth() === now.getMonth() && dateAdded.getFullYear() === now.getFullYear();
// //             const thisYear = dateAdded.getFullYear() === now.getFullYear();
// //             const lastYear = dateAdded.getFullYear() === now.getFullYear() - 1;
// //             const timeIndexes = [thisMonth, thisYear, lastYear];
// //             timeIndexes.forEach((isActive, index) => {
// //               if (isActive && item.propertyType[propType]) {
// //                 counts[type][propType][index]++;
// //               }
// //             });
// //           });
// //         }
// //       });
// //     });
// //     return counts;
// //   };

// //   return (
// //     <PageContainer>
// //       <Header>Inquiries Status</Header>
// //       <CategoryContainer>
// //         {Object.entries(inquiryData).map(([type, details], index) => (
// //           <CategoryBlock key={index}>
// //             <InquiryHeader color={getColor(type)}>{type.replace('for', 'For ')}</InquiryHeader>
// //             <Table>
// //               <TableRow>
// //                 <TableHeader></TableHeader>
// //                 <TableHeader>This Month</TableHeader>
// //                 <TableHeader>This Year</TableHeader>
// //                 <TableHeader>Last Year</TableHeader>
// //               </TableRow>
// //               {Object.entries(details).map(([subtype, counts]) => (
// //                 <TableRow key={subtype}>
// //                   <TableCell>{subtype.charAt(0).toUpperCase() + subtype.slice(1)}</TableCell>
// //                   <TableCell>{counts[0]}</TableCell>
// //                   <TableCell>{counts[1]}</TableCell>
// //                   <TableCell>{counts[2]}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </Table>
// //           </CategoryBlock>
// //         ))}
// //       </CategoryContainer>
// //     </PageContainer>
// //   );
// // }

// // const getColor = (type) => {
// //   switch (type) {
// //     case 'forSale': return '#007bff'; // Blue
// //     case 'forPurchase': return '#6f42c1'; // Purple
// //     case 'forRent': return '#28a745'; // Green
// //     case 'onRent': return '#dc3545'; // Red
// //     default: return '#6c757d'; // Default grey
// //   }
// // };

// // export default InquiriesStatus;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; 
// import styled from 'styled-components';
// import bgImage from '../images/bg.jpg';
// import { Link } from 'react-router-dom';

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

// const CategoryContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   width: 100%;
// `;

// const CategoryBlock = styled.div`
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 10px;
//   margin: 10px;
//   padding: 20px;
//   width: 280px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const InquiryHeader = styled.h2`
//   background-color: ${props => props.color};
//   color: white;
//   text-align: center;
//   padding: 10px;
//   border-radius: 5px;
//   width: 100%;
// `;

// const Table = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 10px;
//   width: 100%;
//   background-color: #f8f9fa;
//   padding: 10px;
//   border-radius: 5px;
//   margin-top: 10px;
// `;

// const TableRow = styled.div`
//   display: contents;
// `;

// const TableCell = styled.div`
//   text-align: center;
//   padding: 5px 10px;
//   background-color: #ddd;
//   border-radius: 5px;
// `;

// const LearnMoreButton = styled(Link)`
//   margin-top: 10px;
//   padding: 10px 20px;
//   background-color: #4caf50;
//   text-decoration: none;
//   color: white;
//   border-radius: 5px;
//   text-align: center;
// `;

// function InquiriesVsDeals() {
//   const [inquiryData, setInquiryData] = useState({});
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       try {
//         const decoded = jwtDecode(token);
//         const response = await axios.get(`http://195.179.231.102:6003/api/properties/user/${decoded.userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setInquiryData(aggregateData(response.data));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [token]);

//   const aggregateData = (data) => {
//     const counts = {
//       forSale: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
//       forPurchase: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
//       onRent: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
//       forRent: { residential: [0, 0], commercial: [0, 0], land: [0, 0] }
//     };

//     data.forEach(item => {
//       Object.entries(item.inquiryType).forEach(([type, active]) => {
//         if (active) {
//           ['residential', 'commercial', 'land'].forEach((propType) => {
//             if (item.propertyType[propType]) {
//               const index = item.status === "Sold" ? 1 : 0;
//               counts[type][propType][index]++;
//             }
//           });
//         }
//       });
//     });
//     return counts;
//   };

//   return (
//     <PageContainer>
//       <Header>Inquiries vs Deal Done</Header>
//       <CategoryContainer>
//         {Object.entries(inquiryData).map(([type, details], index) => (
//           <CategoryBlock key={index}>
//             <InquiryHeader color={getColor(type)}>{type.replace('for', 'For ')}</InquiryHeader>
//             <Table>
//               <TableRow>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Inquiry</TableCell>
//                 <TableCell>Done Deal</TableCell>
//               </TableRow>
//               {Object.entries(details).map(([category, counts]) => (
//                 <TableRow key={category}>
//                   <TableCell>{category}</TableCell>
//                   <TableCell>{counts[0]}</TableCell>
//                   <TableCell>{counts[1]}</TableCell>
//                 </TableRow>
//               ))}
//             </Table>
//             <LearnMoreButton to="/more-info">Learn More</LearnMoreButton>
//           </CategoryBlock>
//         ))}
//       </CategoryContainer>
//     </PageContainer>
//   );
// }

// const getColor = (type) => {
//   switch (type) {
//     case 'forSale': return '#007bff';
//     case 'forPurchase': return '#6f42c1';
//     case 'onRent': return '#28a745';
//     case 'forRent': return '#dc3545';
//     default: return '#6c757d';
//   }
// };

// export default InquiriesVsDeals;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import bgImage from '../images/bg.jpg';
import { Link, useNavigate } from 'react-router-dom';

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

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const CategoryBlock = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InquiryHeader = styled.h2`
  background-color: ${props => props.color};
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const TableRow = styled.div`
  display: contents;
`;

const TableCell = styled.div`
  text-align: center;
  padding: 5px 10px;
  background-color: #ddd;
  border-radius: 5px;
`;

const LearnMoreButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;

function InquiriesVsDeals() {
  const [inquiryData, setInquiryData] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const response = await axios.get(`http://195.179.231.102:6003/api/properties/user/${decoded.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInquiryData(aggregateData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

//   const aggregateData = (data) => {
//     const counts = {
//       forSale: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
//       forPurchase: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
//       onRent: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
//       forRent: { residential: [0, 0], commercial: [0, 0], land: [0, 0] }
//     };

//     data.forEach(item => {
//       Object.entries(item.inquiryType).forEach(([type, active]) => {
//         if (active) {
//           ['residential', 'commercial', 'land'].forEach((propType) => {
//             if (item.propertyType[propType]) {
//               const index = item.status === "Sold" ? 1 : 0;
//               counts[type][propType][index]++;
//             }
//           });
//         }
//       });
//     });
//     return counts;
//   };

const aggregateData = (data) => {
    // Initialize counts for each type and property type with two counters: inquiries and deals
    const counts = {
      forSale: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
      forPurchase: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
      onRent: { residential: [0, 0], commercial: [0, 0], land: [0, 0] },
      forRent: { residential: [0, 0], commercial: [0, 0], land: [0, 0] }
    };
  
    // Iterate over each property item
    data.forEach(item => {
      // Process each inquiry type that is active
      Object.entries(item.inquiryType).forEach(([type, active]) => {
        if (active) {
          // Increment the inquiry count for each property type that exists for the item
          ['residential', 'commercial', 'land'].forEach(propType => {
            if (item.propertyType[propType]) {
              counts[type][propType][0]++; // Increment inquiry count
              if (item.status === "Sold") {
                counts[type][propType][1]++; // Increment deal count if sold
              }
            }
          });
        }
      });
    });
  
    return counts;
  };
  

  const handleNavigate = (type) => {
    navigate('/InquiryDealDetail', { state: { inquiryType: type } });
  };

  return (
    <PageContainer>
      <Header>Inquiries vs Deal Done</Header>
      <CategoryContainer>
        {Object.entries(inquiryData).map(([type, details], index) => (
          <CategoryBlock key={index}>
            <InquiryHeader color={getColor(type)}>{type.replace('for', 'For ')}</InquiryHeader>
            <Table>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Inquiry</TableCell>
                <TableCell>Done Deal</TableCell>
              </TableRow>
              {Object.entries(details).map(([category, counts]) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>{counts[0]}</TableCell>
                  <TableCell>{counts[1]}</TableCell>
                </TableRow>
              ))}
            </Table>
            <LearnMoreButton onClick={() => handleNavigate(type)}>Learn More</LearnMoreButton>
          </CategoryBlock>
        ))}
      </CategoryContainer>
    </PageContainer>
  );
}

const getColor = (type) => {
  switch (type) {
    case 'forSale': return '#007bff';
    case 'forPurchase': return '#6f42c1';
    case 'onRent': return '#28a745';
    case 'forRent': return '#dc3545';
    default: return '#6c757d';
  }
};

export default InquiriesVsDeals;
