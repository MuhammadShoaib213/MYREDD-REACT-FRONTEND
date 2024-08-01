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

function InquiryDealDetail() {
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');
  const location = useLocation();
  const inquiryType = location.state?.inquiryType;

  console.log(inquiryType);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const decoded = jwtDecode(token);
      const response = await axios.get(`http://195.179.231.102:6003/api/properties/user/${decoded.userId}`, {
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
        results[type][subtype] = { inquiries: 0, sold: 0 };
      });
    });

    rawData.forEach(item => {
      if (item.inquiryType[inquiryType]) {
        Object.keys(structure).forEach(type => {
          if (item.propertyType[type.toLowerCase()]) {
            structure[type].forEach(subtype => {
              if (item.propertySubType[subtype.toLowerCase()]) {
                results[type][subtype].inquiries++;
                if (item.status === "Sold") {
                  results[type][subtype].sold++;
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
      Inquiries: subtypes[subtype].inquiries,
      Sold: subtypes[subtype].sold
    }));
  };

  return (
    <PageContainer>
      <Header>Inquiry vs Deal Done for {inquiryType}</Header>
      {Object.entries(data).map(([type, subtypes]) => (
        <ContentContainer key={type}>
          <TableContainer>
            <TableTitle>{type}</TableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>Inquiries</Th>
                  <Th>Deals Done</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subtypes).map(([subtype, values]) => (
                  <SubtypeRow key={subtype}>
                    <Td>{subtype}</Td>
                    <Td>{values.inquiries}</Td>
                    <Td>{values.sold}</Td>
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
              <Bar dataKey="Inquiries" fill="#8884d8" />
              <Bar dataKey="Sold" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ContentContainer>
      ))}
    </PageContainer>
  );
}

export default InquiryDealDetail;
