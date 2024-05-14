import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import AddCustomerForm from './components/AddCustomerForm';
import CustomerView from './components/CustomerView';
import PropertyForm from './components/PropertyForm';
import PropertyView from './components/PropertyView';
import InquiryForm from './components/InquiryForm';
import ChatComponent from './components/chat';
import { SocketProvider } from './components/SocketContext';
import axios from 'axios';
import AgencyAgentSingup from './components/agencyAgent';
import AgentList from './components/AgentList';
import AttendanceModule from './components/attendance';
import AttendanceViewer from './components/AttendanceViewer';
import Membership from './components/membership';
import SubscriptionForm from './components/SubscriptionForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InquiriesTable from './components/InquiriesTable';
import Reports from './components/Reports';
import CRM from './components/CRM';
import Agent from './components/Agent';
import CheckCustomer from './components/CheckCustomer';
import CustomerInquiryForm from './components/CustomerInquiryForm';
import DriveComponent from './components/drive';
import FloatingChat from './components/FloatingChat';
import VerifyOtpPage from './components/VerifyOtpPage Component';
import FriendsList from './components/friends';


function App() {

  const stripePromise = useMemo(() => loadStripe('pk_test_51NPVZGJSiT0U6CqFk8KzITi5LilCEfscsbsUCIUxpDiEdMx2DOMzatnUPHdCiFhQXoorpP4yA6UaNaLKSt7sF06400gjhlHI8y'), []);

  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return (
    <AuthProvider>  {/* Ensure this wraps Router and all child routes */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addCusomer" element={<AddCustomerForm />} />
          <Route path="/CustomerView" element={<CustomerView />} />
          <Route path="/PropertyForm" element={<PropertyForm />} />
          <Route path="/PropertyView" element={<PropertyView />} />
          <Route path="/InquiryForm" element={<InquiryForm />} />
          <Route path="/ChatComponent" element={<ChatComponent />} />
          <Route path="/AttendanceModule" element={<AttendanceModule />} />
          <Route path="/AgencyAgentSingup" element={<AgencyAgentSingup />} />
          <Route path="/AgentList" element={<AgentList />} />
          <Route path="/AttendanceViewer" element={<AttendanceViewer />} />
          <Route path="/InquiriesTable" element={<InquiriesTable />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/CRM" element={<CRM />} />
          <Route path="/Agent" element={<Agent />} />
          <Route path="/CheckCustomer" element={<CheckCustomer />} />
          <Route path="/CustomerInquiryForm" element={<CustomerInquiryForm />} />
          <Route path="/VerifyOtpPage" element={<VerifyOtpPage />} />
          <Route path="/FriendsList" element={<FriendsList />} />
          <Route path="/Membership" element={<Membership/>} />

          <Route path="/DriveComponent" element={<DriveComponent/>} />

          <Route path="/subscribe/:planTitle" element={
        <Elements stripe={stripePromise}>
          <SubscriptionForm />
        </Elements>
      } />

        </Routes>
        <SocketProvider>
            <div className="App">
                {/* <ChatComponent /> */}
            </div>
        </SocketProvider>
        <FloatingChat/>
        <Footer />
      </Router>
    </AuthProvider>
    
  );
}

export default App;
