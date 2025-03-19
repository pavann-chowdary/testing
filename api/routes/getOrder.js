import connectToDatabase from '../db.js';
import express from 'express';
import Order from '../models/order.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        const { date } = req.query;


        if (!date) {
            return res.status(400).json({ error: 'Date parameter is required' });
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const startOfDayUTC = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 0, 0, 0));
        const endOfDayUTC = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 23, 59, 59));

        const order = await Order.find({
            date: {
                $gte: startOfDayUTC,
                $lte: endOfDayUTC,
            },
        });

        
        // console.log({user})
        if(order.length>0){
        console.log({order})
        res.json({ order:order })}
        else{
            console.log("no orders for given date", {parsedDate})
            res.json({order:null})
        }
    }
    catch(error){
        console.error('Error checking orders on dat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;