import React from 'react'
import { useLocation } from 'react-router-dom'

const Request = () => {
    const location = useLocation();
    const { given_name, email } = location.state || {};
  return (
    <div>
        <h1>Not Authorized to login {given_name}, {email}</h1>

        
    </div>
  )
}

export default Request