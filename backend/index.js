import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import usersRouter from './routes/users.js';
import { connectDB } from './db.js';
import { userSignup, signin } from './controllers/auth.js';
import { getPatient, createPatient, updatePatient, deletePatient  } from './controllers/patients.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = 3060 

app.use('/users', usersRouter);
app.use('/media', express.static(path.resolve('media')));
app.get('/', (_req, res) => res.send('API is running'));
app.post('/signin', signin)
app.post('/signup', userSignup)
app.get('/patients', getPatient)
app.post('/add-patient', createPatient)
app.put('/update-patient/:id', updatePatient)
app.delete('/del-patient/:id', deletePatient)


connectDB()
  .then(() => {
    app.listen(PORT, () => 
      console.log(`🚀 Server listening on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('DB connection failed:', err);
  });
