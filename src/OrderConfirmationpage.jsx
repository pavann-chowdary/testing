import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios'
import { useAuth } from './AuthContext';


const OrderConfirmationpage = () => {
  //const navigate = useNavigate();
  const location = useLocation();
  const {selectedItems,email} = location.state;
  const totalPrice = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const { logout } = useAuth();
  
  const HandleSignout = () => {
    logout();
    window.location.href = '/';
  };

  const HandlePlaceOrder= async() => {

    console.log(selectedItems)
    try {
      const now = new Date();
      const orderDate = now.toISOString().split('T')[0]; // Extract date (YYYY-MM-DD)
      const orderTime = now.toISOString().split('T')[1].split('.')[0];
      console.log(orderDate)

      const orderData = {
          items: selectedItems,
          email: email,
          orderDate: orderDate,
          orderTime:orderTime,
      }
      const response = await axios.post("/api/orders", orderData);
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    }
    catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place !");
    }

  };
  

  return (
    <div>
      <Typography variant="h5" gutterBottom align="center">
        This is the order confirmation page!
      </Typography>

      <Button
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          zIndex: 100,
        }}
        onClick={HandlePlaceOrder}
      >
        Place Order
      </Button>
      <Button
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 100,
        }}
        onClick={HandleSignout}
      >
        Sign Out
      </Button>

      {selectedItems && selectedItems.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "calc(100vh - 10px)",
            border: "1px solid grey", // Border for the Box
            padding: "20px", // Padding for the Box
            width: '80%', // Adjust width as needed
            marginLeft:'50px',
            "& .item-container": {
              marginBottom: "10px",
              width: "100%", // Adjust width as needed
            },
            "& .item-header": {
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px solid lightgrey",
              paddingBottom: "10px",
            },
            "& .item-details": {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          {selectedItems.map((sitem, index) => (
            <div className="item-container" key={sitem.id}>
              <div className="item-header">
                <Typography variant="h6">{sitem.name}</Typography>
                <Typography variant="subtitle1">
                  Item No. {index + 1}
                </Typography>
              </div>
              <div className="item-details">
                <Typography variant="body1">
                  Price: {sitem.price}
                </Typography>
                <Typography variant="body1">
                  Quantity: {sitem.quantity}
                </Typography>
                <Typography variant="body1">
                  Unit: {sitem.unit}
                </Typography>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <Typography variant="subtitle1" gutterBottom>
              Total Price: {totalPrice}
            </Typography>
          </div>
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          No items selected.
        </Typography>
      )}
    </div>
  );
};

export default OrderConfirmationpage;