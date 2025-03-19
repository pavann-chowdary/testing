// api/index.js
import express from 'express';
import cors from 'cors';

import usersRouter from './routes/user.js';
import orderRouter from './routes/order.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter); // Mount the user routes
app.use('/api/orders', orderRouter);
export default app;