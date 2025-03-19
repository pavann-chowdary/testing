import React from 'react'
import { useLocation } from 'react-router-dom';
const Kitchen = () => {
    const location = useLocation();
    const { given_name, email } = location.state || {};
  return (
    <div>
        <h1>this is kitchen page {given_name} {email}</h1>
    </div>
  )
}

export default Kitchen