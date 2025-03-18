import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
    name: String,
    id: Number,
    unit: String,
    quantity: Number,
    price: Number,
    email:String,
    time:String,
    date:String,

  });
  
  const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

  export default Order;