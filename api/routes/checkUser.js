import connectToDatabase from '../db.js';
import express from 'express';
import User from '../models/user.js';

const router = express.Router();
router.post('/', async (req, res) => {
    try {
      await connectToDatabase();
      const { email } = req.body;
      const user = User.findOne({email});
      if(user){
        res.json({ exists: true });
      }
      else{
        res.json({ exists: false });
      }
    }
    catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

export default router;