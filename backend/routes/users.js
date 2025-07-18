// routes/users.js
import express from 'express';
import { getUsers, createUser } from '../controllers/users.js';
const router = express.Router();
router.get('/get', getUsers);
router.post('/', createUser);
export default router;
