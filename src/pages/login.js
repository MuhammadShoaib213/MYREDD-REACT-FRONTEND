// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useAuth } from '../components/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   margin: 50px auto;
//   padding: 20px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledLabel = styled.label`
//   margin-bottom: 5px;
//   color: #333;
// `;

// const ErrorMessage = styled.div`
//   color: #b82b24;
//   margin-bottom: 10px;
// `;

// const StyledInput = styled.input`
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const StyledButton = styled.button`
//   padding: 10px;
//   background-color: red;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: darkred;
//   }
// `;

// const PasswordContainer = styled.div`
//   position: relative;
// `;

// const ToggleButton = styled.button`
//   position: absolute;
//   right: 10px;
//   top: 10px;
//   background: none;
//   border: none;
//   cursor: pointer;
// `;


// function LoginForm() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.token); // Store the token
//         toast.success('Login successful!'); // Display success message
//         navigate('/dashboard'); // Navigate to dashboard
//       } else {
//         toast.error(data.message); // Display error message from server
//       }
//     } catch (error) {
//       toast.error('Failed to connect to the server.'); // Handle network errors
//     }
//   };

//   return (
//     <FormContainer>
//       <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//       <StyledForm onSubmit={handleSubmit}>
//         <StyledLabel>Email:</StyledLabel>
//         <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} required />

//         <StyledLabel>Password:</StyledLabel>
//         <PasswordContainer>
//           <StyledInput 
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required 
//           />
//           <ToggleButton onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? 'Hide' : 'Show'}
//           </ToggleButton>
//         </PasswordContainer>
        
//         <StyledButton type="submit">Login</StyledButton>
//         <br/>
//         <StyledLabel>Don't have an account? Signup Now</StyledLabel>
//         <br/>
//         <StyledButton type="button" onClick={() => navigate('/signup')}>Signup</StyledButton>
//       </StyledForm>
//     </FormContainer>
//   );
// }

// export default LoginForm;


import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: #b82b24;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkred;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;


function LoginForm({ onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token
        toast.success('Login successful!'); // Display success message
        onLoginSuccess();
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        toast.error(data.message); // Display error message from server
      }
    } catch (error) {
      toast.error('Failed to connect to the server.'); // Handle network errors
    }
  };

  return (
    <FormContainer>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Email:</StyledLabel>
        <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <StyledLabel>Password:</StyledLabel>
        <PasswordContainer>
          <StyledInput 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <ToggleButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </ToggleButton>
        </PasswordContainer>
        
        <StyledButton type="submit">Login</StyledButton>
        <br/>
        <StyledLabel>Don't have an account? Signup Now</StyledLabel>
        <br/>
        <StyledButton type="button" onClick={() => navigate('/signup')}>Signup</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default LoginForm;