import connectToDatabase from '../db.js';
import express from 'express';
import Order from '../models/order.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        const { date } = req.query;


        console.log({date})
        const order = await Order.find({ date:date });

        
        // console.log({user})
        if(order.length>0){
        console.log({order})
        res.json({ order:order })}
        else{
            console.log("no orders for given date", {date})
            res.json({order:null})
        }
    }
    catch(error){
        console.error('Error checking orders on dat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;