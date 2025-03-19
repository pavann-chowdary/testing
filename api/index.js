// api/index.js
import express from 'express';
import cors from 'cors';

import usersRouter from './routes/user.js';
import orderRouter from './routes/order.js'
import checkUsersRouter from './routes/checkUser.js'
import getOrderRouter from './routes/getOrder.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter); // Mount the user routes
app.use('/orders', orderRouter);
app.use('/checkUsers',checkUsersRouter);
app.use('/getOrders',getOrderRouter);
export default app;