import connectToDatabase from '../db.js';
import express from 'express';
import Order from '../models/order.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        const { email } = req.query;
        const order = await Order.find({ email:email });
        // console.log({user})
        if(order.length>0){
        const orderObj=order.toJSON();
        console.log({orderObj})
        res.json({ order:orderObj })}
        else{
            console.log("couldnt find email")
            res.json({order:null})
        }
    }
    catch(error){
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;