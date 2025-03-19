import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ArrowDatePicker from './ArrowDatePicker';
const Kitchen = () => {
    const [dateA, setDateA] = useState(new Date());
    const [checkEmail, setCheckEmail] = useState('');
    const location = useLocation();
    const { given_name, email } = location.state || {};
    const handleGetOrder = async () => {
        const date=dateA.toDateString()
        const response = await axios.get(`/getOrders?date=${date}`) // use `` not ''
        console.log(response.data)
    }
  return (
    <div>
        <h1>this is kitchen page {given_name} {email}</h1>
        {/* <input type='text' placeholder='enter the email to find the orders' onChange={(e)=>setCheckEmail(e.target.value)}></input> */}
        <ArrowDatePicker value={dateA} onChange={setDateA} />
        <button onClick={handleGetOrder}>Get orders</button>
    </div>
  )
}

export default Kitchen