// api/index.js
import express from 'express';
import cors from 'cors';

import usersRouter from './routes/user.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter); // Mount the user routes

export default app;