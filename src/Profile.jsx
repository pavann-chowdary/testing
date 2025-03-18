import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {useNavigate} from 'react-router-dom'
import img1 from './Images/testimg1.jpeg'
import img2 from './Images/testimg2.jpeg'

import data from './Data/data.jsx'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useLocation } from 'react-router-dom'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'space-between'
}));

const Orderpage = () => {

    const location = useLocation();
    const { given_name, email } = location.state || {}; //if location.state is undefined, it becomes an empty object.
    if(given_name && email)
    {
      console.log(given_name, email);
    } 
    else {
      console.log("State was not properly set");
    }
    const navigate=useNavigate();
    const [quantities, setQuantities] = useState({});
    const [search,setSearch]=useState("");
    const HandleSignout=()=>{
      
      // localStorage.removeItem('googleToken');
      window.location.href = '/';
      //navigate("/");
    }

    const handleQuantityChange = (id, change) => { // Use name to identify the item
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        
        newQuantities[id] = Math.max(
          0,
          Math.min(15, (newQuantities[id] || 0) + change)
        );
        return newQuantities;
      });
    };

    const Handlesearch=(event)=>{
      setSearch(event.target.value);
    };

    const HandleOrder=()=>{
      // navigate("/confirm",{state:{selectedItems,email}});
    }

    const filterData=data.filter((dat)=>
      dat.name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedItems = data.map((dat, index) => ({
      "name": dat.name,
      "id":dat.id,
      "unit":dat.quantity,
      "quantity": quantities[dat.id] || 0,
      "price": (quantities[dat.id] || 0) * 100,
    })).filter((item) => item.quantity > 0);

  return (
    <Box>
      <h4
      style={{
          position:'fixed',
          top:'10px',
          right:'10px',
          zIndex:100
        }}>
        Hello, {given_name}<br/>
        {email}      
      </h4>
      <Button 
        style={{
          position:'fixed',
          marginTop:'10px',
          right:'10px',
          zIndex:100
        }}
        onClick={HandleSignout}
      >
        Sign Out
      </Button>

      <Grid container spacing={1}>
        <Grid size={8} style={{ position: 'fixed', top: 0, left: 0, zIndex: 99 }}> 
            <Item>
              <h4>Image</h4>
              <h4>Name</h4>
              <h4>Price</h4>
              <h4>Quantity</h4>
              <h4>-</h4>
              <h4>count</h4>
              <h4>+</h4>
            </Item>
        </Grid>
        
        <TextField 
          label='Search...' 
          id="search"
          variant="standard"
          style={{ position: 'fixed',top:10,marginLeft:'70%',zIndex: 99 }}
          value={search}
          onChange={Handlesearch}
        />

        {!search? 
        (
          <Grid item size={8} style={{ paddingTop: "20px" }}>
            <Grid container spacing={1}>
              {data.map((dat)=>(
                <Grid size={12}>
                  <Item>
                    <img alt='sweet' src={img1} width='50px' height='50px'/>
                    <p>{dat.name}</p>
                    <p alignItems='center'>Price:{
                      quantities[dat.id] * 100 || 0
                    }</p>
                    <p>{dat.quantity}</p>
                    <>
                    <Button onClick={() => handleQuantityChange(dat.id, -1)}>-</Button>
                      <p>{quantities[dat.id] || 0}</p> {/* Display quantity */}
                      <Button onClick={() => handleQuantityChange(dat.id, 1)}>+</Button>
                    </>
                    {/* <input type="number" id="quantity" name="quantity" min="1" max="15" style={{width:'60px', height:'70px'}}/> */}
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ): 

        filterData.length>0?(
          <Grid item size={8} style={{ paddingTop: "20px" }}>
            <Grid container spacing={1}>
              {filterData.map((dat)=>(
                <Grid size={12}>
                  <Item>
                    <img alt='sweet' src={img1} width='50px' height='50px'/>
                    <p>{dat.name}</p>
                    <p alignItems='center'>Price:{
                      quantities[dat.id] * 100 || 0
                    }</p>
                    <p>{dat.quantity}</p>
                    <>
                      <Button onClick={() => handleQuantityChange(dat.id, -1)}>-</Button>
                      <p>{quantities[dat.id] || 0}</p> {/* Display quantity */}
                      <Button onClick={() => handleQuantityChange(dat.id, 1)}>+</Button>
                    </>
                    {/* <input type="number" id="quantity" name="quantity" min="1" max="15" style={{width:'60px', height:'70px'}}/> */}
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ):

        (
          <Grid 
            container 
            size={12}  // Take up full width
            style={{ 
              paddingTop: "20px", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              minHeight: "calc(100vh - 10px)" // Ensure minimum height to center vertically
            }}
          >
            <img alt='Dog' src={img2} width='350px' height='350px'/>
            {/* <p>No results found.</p> */}
          </Grid>
        )

        }
        {selectedItems.length>0?(
          <Grid item size={4} style={{ paddingTop: "20px" }}>
            <Grid container spacing={1} style={{maxHeight: '400px', overflowY: 'auto'}}>
              {selectedItems.map((sitem)=>(
                <Grid size={12}>
                  <Item>
                    {/* <img alt='sweet' src={img1} width='50px' height='50px'/> */}
                    <p>{sitem.name}</p>
                    <p alignItems='center'>Price:{sitem.price}</p>
                    <p>{sitem.unit}</p>
                    <>
                      <Button onClick={() => handleQuantityChange(sitem.id, -1)}>-</Button>
                      <p>{sitem.quantity}</p> {/*Display quantity */}
                      <Button onClick={() => handleQuantityChange(sitem.id, 1)}>+</Button>
                    </>
                     {/* <input type="number" id="quantity" name="quantity" min="1" max="15" style={{width:'60px', height:'70px'}}/> */}
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ):
        (
          <div style={{position:'fixed', marginTop:10,right:'200px'}}>
            <p>No Items Selected....</p>
          </div>
        )}

        <Grid item size={4} style={{ position: 'fixed',bottom:10,right:'10px',zIndex: 99 }}>
          <Grid container spacing={1}>
            <Button 
              style={{
                position:'fixed',
                bottom:'10px',
                right:'10px',
                zIndex:100
              }}
              onClick={HandleOrder}
            >
              Confirm order
            </Button>
          
          </Grid>
        </Grid>

      </Grid> 
    </Box>
  )
}

export default Orderpage