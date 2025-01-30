import React, { useMemo, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './components/HomePage';
import LoginPage from './pages/login';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import AddCustomerForm from './components/CustomerInquiryForm';
import CustomerView from './components/CustomerView';
import PropertyView from './components/PropertyView';
import InquiryForm from './components/InquiryForm';
import ChatComponent from './components/chat';
import { SocketProvider } from './components/SocketContext';
import axios from 'axios';
import AgencyAgentSignup from './components/NewAgentForm';
import AgentList from './components/AgentList';
import AttendanceModule from './components/AttendanceModule';
import AttendanceViewer from './components/AttendanceViewer';
import Membership from './components/membership';
import SubscriptionForm from './components/SubscriptionForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Agent from './components/Agent';
import CheckCustomer from './components/CheckCustomer';
import CustomerInquiryForm from './components/CustomerInquiryForm';
import DriveComponent from './components/DriveComponent';
import FloatingChat from './components/FloatingChat';
import VerifyOtpPage from './components/VerifyOtpPage';
import FriendsList from './components/friends';
import ProfileView from './components/ProfileView';
import CustomerDetail from './components/CustomerDetail';
import BusinessAssociatesPage from './components/BusinessAssociatesPage';
import UserSearch from './components/UserSearch';
import FriendRequests from './components/FriendRequests';
import FriendDetail from './components/FriendDetail';
import FriendsByCity from './components/FriendsByCity';
import PropertyDetailsPage from './components/PropertyDetails';
import CRM from './components/CRM';
import InquiriesStatus from './components/InquiriesStatus';
import CRMTable from './components/CRMTable';
import ContractForm from './components/ContractForm';
import FeedbackComponent from './components/FeedbackComponent';
import InquiriesVsDoneDeal from './components/InquiriesVsDoneDeal';
import BusinessVolume from './components/BusinessVolume';
import NoteManager from './components/notes';
import BusinessVolumeDetail from './components/BusinessVolumeDetail';
import InquiryDealDetail from './components/InquiryvsDealDoneDetail';
import InquiriesStatusDetail from './components/InquiriesStatusDetail';
import LeadMenu from './components/leadMenu';
import LeadDetailPage from './components/LeadDetail';
import SchedulePage from './components/LeadSchedule';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import OTPVerificationForm from './components/forgetPasswordOtp';
import ResetPasswordForm from './components/ResetPasswordForm';
import LeadTracker from './components/LeadTracker';
import ProtectedRoute from './components/ProtectedRoute';
import PropertyAd from './components/PropertyAd';
import PropertyMatches from './components/PropertyMatches';
import PropertyBank from './components/PropertyBank';
import PropertyBankDetails from './components/PropertyBankDetails';
import PropertyList from './components/PropertyList';
import MainForm from './components/InquiryForm/InquiryForm';
import LocationAutocomplete from './components/InquiryForm/common/area/LocationAutocomplete';
import StepOne from './components/InquiryForm/steps/StepOne';
const stripePromise = loadStripe('pk_test_51NPVZGJSiT0U6CqFk8KzITi5LilCEfscsbsUCIUxpDiEdMx2DOMzatnUPHdCiFhQXoorpP4yA6UaNaLKSt7sF06400gjhlHI8y');


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useMemo(() => stripePromise, []);

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


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you could add additional validation logic for the token if needed
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthProvider> {/* Ensure this wraps Router and all child routes */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/StepOne" element={<StepOne />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addCustomer" element={<AddCustomerForm />} />
          <Route path="/LocationAutocomplete" element={<LocationAutocomplete />} />
          <Route path="/CustomerView" element={<CustomerView />} />
          <Route path="/PropertyView" element={<PropertyView />} />
          <Route path="/InquiryForm" element={<MainForm />} />
          <Route path="/PropertyBank" element={<PropertyBank />} />
          <Route path="/properties/:inquiryType/:propertyType" element={<PropertyBankDetails />} />
          <Route path="/property-list/:inquiryType/:propertyType/:propertySubType" element={<PropertyList />} />
          <Route path="/InquiryFormOld" element={<InquiryForm />} />
          <Route path="/ChatComponent" element={<ChatComponent />} />
          <Route path="/AttendanceModule" element={<AttendanceModule />} />
          <Route path="/AgencyAgentSignup" element={<AgencyAgentSignup />} />
          <Route path="/AgentList" element={<AgentList />} />
          <Route path="/AttendanceViewer" element={<AttendanceViewer />} />
          <Route path="/Agent" element={<Agent />} />
          <Route path="/CheckCustomer" element={<CheckCustomer />} />
          <Route path="/CustomerInquiryForm" element={<CustomerInquiryForm />} />
          <Route path="/VerifyOtpPage" element={<VerifyOtpPage />} />
          <Route path="/FriendsList" element={<FriendsList />} />
          <Route path="/ProfileView" element={<ProfileView/>} />
          <Route path="/customer/:id" element={<CustomerDetail/>} />
          <Route path="/BusinessAssociatesPage" element={<BusinessAssociatesPage/>} />
          <Route path="/UserSearch" element={<UserSearch/>} />
          <Route path="/FriendRequests" element={<FriendRequests/>} />
          <Route path="/FriendDetail/:id" element={<FriendDetail/>} />
          <Route path="/friends/:cityName" element={<FriendsByCity />} />
          <Route path="/property/:id" element={<PropertyDetailsPage/>} />
          <Route path="/CRM" element={<CRM/>} />
          <Route path="/InquiriesStatus" element={<InquiriesStatus/>} />
          <Route path="/CRMTable" element={<CRMTable/>} />
          <Route path="/ContractForm" element={<ContractForm/>} />
          <Route path="/FeedbackComponent" element={<FeedbackComponent/>} />
          <Route path="/InquiriesVsDoneDeal" element={<InquiriesVsDoneDeal/>} />
          <Route path="/BusinessVolume" element={<BusinessVolume/>} />
          <Route path="/BusinessVolumeDetail" element={<BusinessVolumeDetail/>} />
          <Route path="/InquiryDealDetail" element={<InquiryDealDetail/>} />
          <Route path="/InquiriesStatusDetail" element={<InquiriesStatusDetail/>} />
          <Route path="/NoteManagers" element={<NoteManager/>} />
          <Route path="/LeadMenu" element={<LeadMenu/>} />
          <Route path="/LeadTracker" element={<LeadTracker/>} />
          <Route path="/LeadDetailPage/:id" element={<LeadDetailPage/>} />
          <Route path="/SchedulePage" element={<SchedulePage/>} />
          <Route path="/ForgotPasswordForm" element={<ForgotPasswordForm/>} />
          <Route path="/OTPVerificationForm" element={<OTPVerificationForm/>} />
          <Route path="/ResetPasswordForm" element={<ResetPasswordForm/>} />
          <Route path="/Membership" element={<Membership />} />
          <Route path="/DriveComponent" element={<DriveComponent />} />
          <Route path="/PropertyAd/:id" element={<PropertyAd/>} />
          <Route path="/PropertyMatches/:id" element={<PropertyMatches/>} />
          <Route path="/subscribe/:planTitle" element={
            <Elements stripe={stripePromise}>
              <SubscriptionForm />
            </Elements>
          } />
        </Routes>
        {/* <SocketProvider>
          <div className="App">
             <ChatComponent /> 
          </div>
        </SocketProvider> */}
        {/* <FloatingChat /> */}
        {/* {isLoggedIn && <FloatingChat />} */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
