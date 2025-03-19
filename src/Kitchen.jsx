import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const Kitchen = () => {
    const [checkEmail, setCheckEmail] = useState('');
    const location = useLocation();
    const { given_name, email } = location.state || {};
    const handleGetOrder = async () => {
        const response = await axios.get('/getOrders?email=${checkEmail}')
        console.log(response.data)
    }
  return (
    <div>
        <h1>this is kitchen page {given_name} {email}</h1>
        <input type='text' placeholder='enter the email to find the orders' onChange={(e)=>setCheckEmail(e.target.value)}></input>
        <button onClick={handleGetOrder}>Get orders by email</button>
    </div>
  )
}

export default Kitchen