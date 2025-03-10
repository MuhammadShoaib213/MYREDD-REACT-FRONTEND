// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import bgImage from '../images/bg.jpg';
// import { API_CONFIG } from '../config/api.config';
// // Styled components
// const PageContainer = styled.div`
//   background-image: url(${bgImage});
//   background-size: cover;
//   background-position: center;
//   background-blend-mode: overlay;
//   background-color: rgba(0, 0, 0, 0.5);
//   min-height: 100vh; /* Ensure it covers the whole viewport height */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   padding-top: 100px;
// `;

// const HeadingContainer = styled.div`
//   background-color: red;
//   color: white;
//   padding: 10px 40px; /* Decreased height and increased width */
//   text-align: center;
//   border-radius: 8px;
//   margin-bottom: 20px;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 18px;
//   text-align: center;
//   margin-top: 10px; /* Adjusted gap */
//   margin-bottom: 20px; /* Adjusted gap */
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
//   padding: 20px;
// `;

// const Card = styled.div`
//   width: 240px;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//   border-radius: 8px;
//   overflow: hidden;
//   background: white;
// `;

// const CardImage = styled.img`
//   width: 100%;
//   height: 180px;
//   object-fit: cover;
// `;

// const CardBody = styled.div`
//   padding: 10px;
// `;

// const CardTitle = styled.h3`
//   margin: 0;
//   color: #333;
//   font-size: 1.1em;
// `;

// const CardSubtitle = styled.p`
//   margin: 0;
//   color: #555;
//   font-size: 0.9em;
// `;

// const ViewDetailButton = styled.button`
//   background-color: red;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   margin-top: 10px;
//   border-radius: 20px;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #8B0000;
//   }
// `;

// const ModalBackdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0,0,0,0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
// `;

// const Modal = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0,0,0,0.3);
//   width: 90%;
//   max-width: 500px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow-y: auto;
//   max-height: 90%;
// `;

// const ModalTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   box-shadow: none;
// `;

// const ModalTh = styled.th`
//   background-color: #00796b;
//   color: #ffffff;
//   padding: 10px;
//   text-align: left;
// `;

// const ModalTd = styled.td`
//   padding: 10px;
//   border-bottom: 1px solid #eeeeee;
// `;

// const ModalTr = styled.tr`
//   &:nth-of-type(even) {
//     background-color: #f9f9f9;
//   }
// `;

// const CloseButton = styled.button`
//   padding: 5px 10px;
//   background-color: #ccc;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 10px;

//   &:hover {
//     background-color: #bbb;
//   }
// `;

// const AddCustomerButton = styled.button`
//   padding: 20px;
//   border: none;
//   color: white;
//   font-size: 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: red;
//   width: 100%;
//   height: 60px; // Set a fixed height for all buttons
//   &:hover {
//     background-color: darkred;
//   @media (max-width: 768px) {
//     padding: 15px 0;
//     font-size: 14px;
//     height: auto; // Adjust height for smaller screens
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   width: 100%;
//   padding: 20px;
//   color: white;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const BackButton = styled.button`
//   position: absolute;
//   left: 20px;
//   top: 150px;
//   background-color: #ffffff;
//   border: 2px solid #e74c3c;
//   color: #e74c3c;
//   font-size: 14px;
//   cursor: pointer;
//   padding: 10px 15px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s, color 0.3s, transform 0.3s;
//   z-index: 1000;

//   &:hover {
//     background-color: #e74c3c;
//     color: #ffffff;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     left: 10px;
//     width: 100%;
//     text-align: center;
//   }
// `;


// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toISOString().split('T')[0];  // This will format the date as "YYYY-MM-DD"
// };

// const CustomerCard = ({ customer, onViewDetail }) => (
//   <Card>
//    <CardImage 
//       src={customer.profilePicture 
//         ? `${API_CONFIG.API_URL}/${customer.profilePicture}` 
//         : 'https://via.placeholder.com/200'} 
//       alt={customer.fullName} 
//     />
//     <CardBody>
//       <CardTitle>{customer.fullName}</CardTitle>
//       <CardSubtitle>{customer.currentAddress}</CardSubtitle>
//       <CardSubtitle>{customer.personalMobile}</CardSubtitle>
//       <CardSubtitle><strong>Joined since: </strong>{formatDate(customer.updatedAt)}</CardSubtitle>
//       <ViewDetailButton onClick={() => onViewDetail(customer)}>View Detail</ViewDetailButton>
//     </CardBody>
//   </Card>
// );


// const CustomerView = (customer) => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No token found');
//         }

//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.userId;

//         const response = await fetch(`http://195.179.231.102:6003/api/customers?userId=${userId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch customers');
//         }
//         const data = await response.json();
//         setCustomers(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching customers:', error.message);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // const handleViewDetail = (customer) => {
//   //   setSelectedCustomer(customer);
//   //   setIsModalOpen(true);
//   // };
// const handleViewDetail = (customer) => {
//   navigate(`/customer/${customer._id}`); // Correct usage of navigate with dynamic route
// };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <PageContainer>
//       <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//               <Header>
//           <h1>Customer Database</h1>
//           {/* <Logo>Logo</Logo> */}
//         </Header>
//       {customers.length === 0 ? (
//         <ErrorMessage>No customers available</ErrorMessage>
//       ) : null}
//       <Link to="/CustomerInquiryForm" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginBottom: '20px' }}>
//         <AddCustomerButton>Add New Customer</AddCustomerButton>
//       </Link>
//       {customers.length > 0 && (
//         <CardContainer>
//           {customers.map((customer, index) => (
//             <CustomerCard key={index} customer={customer} onViewDetail={handleViewDetail} />
//           ))}
//         </CardContainer>
//       )}
//       {isModalOpen && (
//         <ModalBackdrop onClick={handleCloseModal}>
//           <Modal onClick={e => e.stopPropagation()}>
//             {selectedCustomer && (
//               <ModalTable>
//                 <tbody>
//                   <ModalTr>
//                     <ModalTh>Full Name</ModalTh>
//                     <ModalTd>{selectedCustomer.fullName}</ModalTd>
//                   </ModalTr>
//                   <ModalTr>
//                     <ModalTh>Profession</ModalTh>
//                     <ModalTd>{selectedCustomer.profession}</ModalTd>
//                   </ModalTr>
//                   <ModalTr>
//                     <ModalTh>Contact Number</ModalTh>
//                     <ModalTd>{selectedCustomer.mobileNumber}</ModalTd>
//                   </ModalTr>
//                   <ModalTr>
//                     <ModalTh>Email</ModalTh>
//                     <ModalTd>{selectedCustomer.personalEmail}</ModalTd>
//                   </ModalTr>
//                   <ModalTr>
//                     <ModalTh>Address</ModalTh>
//                     <ModalTd>{selectedCustomer.currentAddress}</ModalTd>
//                   </ModalTr>
//                   <ModalTr>
//                     <ModalTh>Joined Since</ModalTh>
//                     <ModalTd>{formatDate(selectedCustomer.createdAt)}</ModalTd>
//                   </ModalTr>
//                 </tbody>
//               </ModalTable>
//             )}
//             <CloseButton onClick={handleCloseModal}>Close</CloseButton>
//           </Modal>
//         </ModalBackdrop>
//       )}
//     </PageContainer>
//   );
// };

// export default CustomerView;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import bgImage from '../images/bg.jpg';
import { API_CONFIG } from '../config/api.config';

// --- Helper Functions for URL Normalization ---
function normalizePath(filePath) {
  if (!filePath) return '';
  return filePath.replace(/\\/g, '/');
}

function getFullUrl(filePath) {
  if (!filePath) return '';
  // If already absolute, return as is.
  if (/^https?:\/\//i.test(filePath)) {
    return filePath;
  }
  return `${API_CONFIG.BASE_URL}/${normalizePath(filePath)}`;
}

// --- Styled Components ---
const PageContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh; /* Ensure it covers the whole viewport height */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
`;

const HeadingContainer = styled.div`
  background-color: red;
  color: white;
  padding: 10px 40px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 240px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.1em;
`;

const CardSubtitle = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9em;
`;

const ViewDetailButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  margin-top: 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8B0000;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 90%;
`;

const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: none;
`;

const ModalTh = styled.th`
  background-color: #00796b;
  color: #ffffff;
  padding: 10px;
  text-align: left;
`;

const ModalTd = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
`;

const ModalTr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const CloseButton = styled.button`
  padding: 5px 10px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #bbb;
  }
`;

const AddCustomerButton = styled.button`
  padding: 20px;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: red;
  width: 100%;
  height: 60px; /* Fixed height */
  
  &:hover {
    background-color: darkred;
  }

  @media (max-width: 768px) {
    padding: 15px 0;
    font-size: 14px;
    height: auto;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 150px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  z-index: 1000;

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

// A simple date formatter to "YYYY-MM-DD"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const CustomerCard = ({ customer, onViewDetail }) => (
  <Card>
    <CardImage 
      src={
        customer.profilePicture 
          ? getFullUrl(customer.profilePicture)
          : 'https://via.placeholder.com/200'
      }
      alt={customer.fullName} 
    />
    <CardBody>
      <CardTitle>{customer.fullName}</CardTitle>
      <CardSubtitle>{customer.currentAddress}</CardSubtitle>
      <CardSubtitle>{customer.personalMobile}</CardSubtitle>
      <CardSubtitle>
        <strong>Joined since: </strong>
        {formatDate(customer.updatedAt)}
      </CardSubtitle>
      <ViewDetailButton onClick={() => onViewDetail(customer)}>View Detail</ViewDetailButton>
    </CardBody>
  </Card>
);

const CustomerView = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Updated fetch URL using API_CONFIG.API_URL
        const response = await fetch(`${API_CONFIG.API_URL}/customers?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching customers:', error.message);
      }
    };

    fetchCustomers();
  }, []);

  // Use navigate to go to the dynamic route for customer details
  const handleViewDetail = (customer) => {
    navigate(`/customer/${customer._id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <HeaderContainer>
        <h1>Customer Database</h1>
      </HeaderContainer>
      {customers.length === 0 ? (
        <ErrorMessage>No customers available</ErrorMessage>
      ) : null}
      <Link
        to="/CustomerInquiryForm"
        style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginBottom: '20px' }}
      >
        <AddCustomerButton>Add New Customer</AddCustomerButton>
      </Link>
      {customers.length > 0 && (
        <CardContainer>
          {customers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} onViewDetail={handleViewDetail} />
          ))}
        </CardContainer>
      )}
      {isModalOpen && (
        <ModalBackdrop onClick={handleCloseModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            {selectedCustomer && (
              <ModalTable>
                <tbody>
                  <ModalTr>
                    <ModalTh>Full Name</ModalTh>
                    <ModalTd>{selectedCustomer.fullName}</ModalTd>
                  </ModalTr>
                  <ModalTr>
                    <ModalTh>Profession</ModalTh>
                    <ModalTd>{selectedCustomer.profession}</ModalTd>
                  </ModalTr>
                  <ModalTr>
                    <ModalTh>Contact Number</ModalTh>
                    <ModalTd>{selectedCustomer.mobileNumber}</ModalTd>
                  </ModalTr>
                  <ModalTr>
                    <ModalTh>Email</ModalTh>
                    <ModalTd>{selectedCustomer.personalEmail}</ModalTd>
                  </ModalTr>
                  <ModalTr>
                    <ModalTh>Address</ModalTh>
                    <ModalTd>{selectedCustomer.currentAddress}</ModalTd>
                  </ModalTr>
                  <ModalTr>
                    <ModalTh>Joined Since</ModalTh>
                    <ModalTd>{formatDate(selectedCustomer.createdAt)}</ModalTd>
                  </ModalTr>
                </tbody>
              </ModalTable>
            )}
            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          </Modal>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default CustomerView;
