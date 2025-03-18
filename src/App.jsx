import React from 'react'
import {useState} from 'react'
import {jwtDecode} from 'jwt-decode'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import clientid from './environmentalVariables/googleClientId'
import axios from 'axios'
import { Routes,Route } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import AppRoutes from './routes'

function App() { 
  console.log(window.location.origin)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 
  
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.error('Google login Successful');
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      setIsLoggedIn(true);
      
      
      const response = await axios.post('/users', {
          name: decoded.name,
          email: decoded.email,
      });
      const given_name=decoded.name
      const email=decoded.email
      navigate('/welcome',{state:{given_name,email}})
      console.log('Navigated to profile')
      console.log('User data saved to MongoDB', response.data);
  } catch (error) {
      console.error('Failed to save user data', error);
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
