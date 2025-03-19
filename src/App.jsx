import React from 'react'
import {useState} from 'react'
import {jwtDecode} from 'jwt-decode'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import clientid from './environmentalVariables/googleClientId'
import axios from 'axios'
import { Routes,Route } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import AppRoutes from './routes'
import { useAuth } from './AuthContext';

function App() { 
  // console.log(window.location.origin)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate(); 
  const { login, isLoggedIn, logout } = useAuth();
  
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.error('Google login Successful');
    const decoded = jwtDecode(credentialResponse.credential);
    const given_name=decoded.name
    const email=decoded.email

    // navigate('/welcome',{state:{given_name,email}})
    login(credentialResponse.credential);
    
    try {
      
      const response = await axios.post('/checkUsers', {
          email: email,
      });
      if(response.data.exists){
        console.log('emailExists')
        navigate('/welcome',{state:{given_name,email}})
      }
      if(!response.data.exists){
        console.log('doesnt exist')
      }
       
    } 
    catch (error) {
      console.error('Error checking email:', err);
    }

  //   try {
  //     const response = await axios.post('/users', {
  //         name: given_name,
  //         email: email,
  //     });
      
      
  //     console.log('User data saved to MongoDB', response.data);
  // } catch (error) {
  //     console.error('Failed to save user data', error);
  // }

  };

  const handleUserCheck = async () => {
    
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(null);
    const [error, setError] = useState(null);
    
    try {
      
      const response = await axios.post('/checkUsers', {
          email: email,
      });
      setEmailExists(response.data.exists);
      setError(null);  
    } 
    catch (error) {
      console.error('Error checking email:', err);
      setError('An error occurred. Please try again.');
      setEmailExists(null);
    }

  };
  
  const handleGoogleLoginError = () => {
    console.error('Google login failed');
  };

  

  return (
    <>
    <GoogleOAuthProvider clientId={clientid}>
      <h1>hi,hello</h1>
      
      <Routes>
            <Route
              path="/*" 
              element={
                isLoggedIn ? (
                  <AppRoutes />
                ): 
                (
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                  />
                )
              }
            />
          </Routes>
    </GoogleOAuthProvider>
        
    </>
  )
}

export default App
