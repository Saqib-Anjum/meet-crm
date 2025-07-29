// controllers/users.js
import User from '../models/User.js';

// GET /users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST /users
export const createUser = async (req, res) => {
  try {
    const payload = {
      fullName:    req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email:       req.body.email,
      dob:         req.body.dob ? new Date(req.body.dob) : undefined,
      gender:      req.body.gender,
      city:        req.body.city,
      insurance:     req.body.insurance,
      therapy:     req.body.therapy,
      therapyDate: req.body.therapyDate ? new Date(req.body.therapyDate) : undefined
    };

    const user = new User(payload);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    // handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};




// PUT /users/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {
      fullName:    req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email:       req.body.email,
      dob:         req.body.dob ? new Date(req.body.dob) : undefined,
      gender:      req.body.gender,
      city:        req.body.city,
      insurance:     req.body.insurance,
      therapy:     req.body.therapy,
      therapyDate: req.body.therapyDate ? new Date(req.body.therapyDate) : undefined
    };

    const updated = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      context: 'query',
    }).lean();

    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error in updateUser:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error in deleteUser:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

