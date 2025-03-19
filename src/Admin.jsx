import React from 'react'
import { useLocation } from 'react-router-dom';

const Admin = () => {
    const location = useLocation();
    const { given_name, email } = location.state || {};
  return (
    <div>
       <h1>
        This is admin page {given_name} {email}
       </h1>
    </div>
  )
}

export default Admin