// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import { connectDB } from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.get('/', (_, res) => res.send('API is running'));

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server up on this port ${PORT}`)
  );
});
