import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ArrowDatePicker from './ArrowDatePicker';
import KitchenOrderDisplay from './KitchenOrderDisplay'
const Kitchen = () => {

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [dateA, setDateA] = useState(new Date());
    const [orders, setOrders] = useState('');
    const location = useLocation();
    const { given_name, email } = location.state || {};
    const handleGetOrder = async () => {
        const date=formatDate(dateA)
        const response = await axios.get(`/getOrders?date=${date}`) // use `` not ''
        setOrders(response.data)
    }
  return (
    <div>
        <h1>this is kitchen page {given_name} {email}</h1>
        {/* <input type='text' placeholder='enter the email to find the orders' onChange={(e)=>setCheckEmail(e.target.value)}></input> */}
        <ArrowDatePicker value={dateA} onChange={setDateA} />
        <button onClick={handleGetOrder}>Get orders</button>
        <KitchenOrderDisplay orders={orders?.order || []}/>
    </div>
  )
}

export default Kitchen