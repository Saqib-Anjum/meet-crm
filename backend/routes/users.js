import express from 'express';
import { 
    getUsers, 
  createUser,
  updateUser,
  deleteUser 
} from '../controllers/users.js';
import User from '../models/User.js';
const router = express.Router();
router.get('/get', getUsers);
router.post('/', createUser);
router.put('/update', updateUser)
router.delete('/delete', deleteUser)



router.get('/get', async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
